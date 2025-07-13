/** biome-ignore-all lint/suspicious/noConsole: dev purposes */
import { Send, Upload } from 'lucide-react'
import { useRef, useState } from 'react'
import { Navigate, useParams } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

const isRecordingSupported =
  Boolean(navigator.mediaDevices) &&
  typeof navigator.mediaDevices.getUserMedia === 'function' &&
  typeof window.MediaRecorder === 'function'

type RoomParams = {
  roomId: string
}

export function RecordRoomAudio() {
  const params = useParams<RoomParams>()
  const [isRecording, setRecording] = useState(false)
  const [isProcessingFile, setIsProcessingFile] = useState(false)
  const [uploadProgress, setUploadProgress] = useState('')
  const recorder = useRef<MediaRecorder | null>(null)
  const intervalRef = useRef<NodeJS.Timeout>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const { roomId } = useParams<RoomParams>()

  if (!roomId) {
    return <Navigate replace to="/" />
  }

  function stopRecording() {
    setRecording(false)
    if (recorder.current && recorder.current.state !== 'inactive') {
      recorder.current.stop()
    }
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
    }
  }

  async function uploadAudio(audio: Blob) {
    const formData = new FormData()
    formData.append('file', audio, 'audio.webm')

    const response = await fetch(
      `http://localhost:3333/rooms/${roomId}/audio`,
      {
        method: 'POST',
        body: formData,
      }
    )

    const result = await response.json()
    console.log(result)
  }

  function createRecorder(audio: MediaStream) {
    recorder.current = new MediaRecorder(audio, {
      mimeType: 'audio/webm',
      audioBitsPerSecond: 64_000,
    })

    recorder.current.ondataavailable = (event) => {
      if (event.data.size > 0) {
        uploadAudio(event.data)
      }
    }

    recorder.current.onstart = () => {
      console.log('gravação iniciada')
    }

    recorder.current.onstop = () => {
      console.log('gravação encerrada')
    }

    recorder.current.start()
  }

  async function startRecording() {
    if (!isRecordingSupported) {
      alert('Seu navegador não suporta gravação de áudio')
      return
    }

    setRecording(true)
    const audio = await navigator.mediaDevices.getUserMedia({
      audio: {
        echoCancellation: true,
        noiseSuppression: true,
        sampleRate: 44_100,
      },
    })

    createRecorder(audio)

    intervalRef.current = setInterval(() => {
      recorder.current?.stop()
      createRecorder(audio)
    }, 5000)
  }

  // Função para fazer chunk do áudio em partes de 5 segundos
  async function processAudioFile(audioBlob: Blob): Promise<void> {
    return new Promise((resolve, reject) => {
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)()
      const fileReader = new FileReader()

      fileReader.onload = async (event) => {
        try {
          const arrayBuffer = event.target?.result as ArrayBuffer
          
          // Decodificar o áudio (funciona com MP3, WAV, WebM, etc.)
          const audioBuffer = await audioContext.decodeAudioData(arrayBuffer)
          
          const sampleRate = audioBuffer.sampleRate
          const numberOfChannels = audioBuffer.numberOfChannels
          const chunkDuration = 5 // segundos
          const chunkSamples = sampleRate * chunkDuration
          const totalChunks = Math.ceil(audioBuffer.length / chunkSamples)

          console.log(`Processando ${totalChunks} chunks de 5 segundos cada`)
          console.log(`Arquivo original: ${audioBuffer.duration.toFixed(2)}s, ${sampleRate}Hz, ${numberOfChannels} canais`)

          for (let i = 0; i < totalChunks; i++) {
            const start = i * chunkSamples
            const end = Math.min(start + chunkSamples, audioBuffer.length)
            const chunkLength = end - start

            // Criar um novo AudioBuffer para o chunk
            const chunkBuffer = audioContext.createBuffer(numberOfChannels, chunkLength, sampleRate)
            
            // Copiar dados do buffer original para o chunk
            for (let channel = 0; channel < numberOfChannels; channel++) {
              const originalData = audioBuffer.getChannelData(channel)
              const chunkData = chunkBuffer.getChannelData(channel)
              for (let sample = 0; sample < chunkLength; sample++) {
                chunkData[sample] = originalData[start + sample]
              }
            }

            // Converter AudioBuffer para Blob WebM
            const chunkBlob = await audioBufferToBlob(chunkBuffer)
            
            // Upload do chunk
            setUploadProgress(`Enviando chunk ${i + 1} de ${totalChunks}`)
            await uploadAudio(chunkBlob)
          }

          setUploadProgress('Upload concluído!')
          setTimeout(() => setUploadProgress(''), 3000)
          resolve()
        } catch (error) {
          console.error('Erro ao processar áudio:', error)
          if (error instanceof Error && error.message.includes('Unable to decode audio data')) {
            reject(new Error('Formato de áudio não suportado ou arquivo corrompido'))
          } else {
            reject(error)
          }
        }
      }

      fileReader.onerror = () => {
        reject(new Error('Erro ao ler o arquivo'))
      }

      fileReader.readAsArrayBuffer(audioBlob)
    })
  }

  // Função para converter AudioBuffer em Blob WebM
  async function audioBufferToBlob(audioBuffer: AudioBuffer): Promise<Blob> {
    return new Promise((resolve) => {
      const offlineContext = new OfflineAudioContext(
        audioBuffer.numberOfChannels,
        audioBuffer.length,
        audioBuffer.sampleRate
      )

      const source = offlineContext.createBufferSource()
      source.buffer = audioBuffer
      source.connect(offlineContext.destination)
      source.start()

      offlineContext.startRendering().then((renderedBuffer) => {
        
        // Criar um MediaStreamAudioSourceNode
        const audioContext = new AudioContext()
        const mediaStreamDestination = audioContext.createMediaStreamDestination()
        
        const bufferSource = audioContext.createBufferSource()
        bufferSource.buffer = renderedBuffer
        bufferSource.connect(mediaStreamDestination)
        
        const mediaRecorder = new MediaRecorder(mediaStreamDestination.stream, {
          mimeType: 'audio/webm',
          audioBitsPerSecond: 64_000,
        })

        const chunks: Blob[] = []
        
        mediaRecorder.ondataavailable = (event) => {
          if (event.data.size > 0) {
            chunks.push(event.data)
          }
        }

        mediaRecorder.onstop = () => {
          const blob = new Blob(chunks, { type: 'audio/webm' })
          resolve(blob)
        }

        mediaRecorder.start()
        bufferSource.start()
        
        // Parar a gravação após a duração do buffer
        setTimeout(() => {
          mediaRecorder.stop()
          bufferSource.stop()
          audioContext.close()
        }, (renderedBuffer.duration * 1000) + 100)
      })
    })
  }

  async function handleFileUpload(event: React.FormEvent) {
    event.preventDefault()
    
    const file = fileInputRef.current?.files?.[0]
    if (!file) {
      alert('Por favor, selecione um arquivo de áudio')
      return
    }

    if (!file.type.includes('audio/')) {
      alert('Por favor, selecione um arquivo de áudio válido')
      return
    }

    setIsProcessingFile(true)
    setUploadProgress('Processando arquivo...')

    try {
      await processAudioFile(file)
      // Limpar o input após o upload
      if (fileInputRef.current) {
        fileInputRef.current.value = ''
      }
    } catch (error) {
      console.error('Erro no upload:', error)
      const errorMessage = error instanceof Error ? error.message : 'Erro no upload'
      setUploadProgress(errorMessage)
      setTimeout(() => setUploadProgress(''), 5000)
    } finally {
      setIsProcessingFile(false)
    }
  }

  if (!params.roomId) {
    return <Navigate replace to="/" />
  }

  return (
    <div className="flex h-screen flex-col items-center justify-center gap-3">
      {isRecording ? (
        <div className="flex flex-row gap-4">
          <Button onClick={stopRecording}>Pausar Áudio</Button>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          <Button onClick={startRecording}>Gravar Áudio</Button>
          {isRecording ? (
            <p className="text-center text-muted-foreground text-sm">
              Gravando...
            </p>
          ) : (
            <p className="text-center text-muted-foreground text-sm">
              Clique para gravar
            </p>
          )}
          <hr />
          <form className="flex flex-col gap-4" onSubmit={handleFileUpload}>
            <div className="flex flex-row gap-4">
              <Input 
                ref={fileInputRef}
                accept="audio/mp3,audio/webm,audio/wav,audio/mpeg" 
                type="file" 
                disabled={isProcessingFile}
              />
              <Button 
                size={'icon'} 
                type="submit"
                disabled={isProcessingFile}
              >
                {isProcessingFile ? <Upload className="animate-spin" /> : <Send />}
              </Button>
            </div>
            {uploadProgress && (
              <p className="text-center text-muted-foreground text-sm">
                {uploadProgress}
              </p>
            )}
          </form>
        </div>
      )}
    </div>
  )
}