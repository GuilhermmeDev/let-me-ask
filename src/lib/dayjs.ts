import dayjsLib from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import 'dayjs/locale/pt-br'

dayjsLib.extend(relativeTime)
dayjsLib.locale('pt-br')

export const dayjs = dayjsLib
