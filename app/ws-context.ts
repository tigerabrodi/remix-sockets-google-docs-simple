import { createContext } from 'react'
import { Socket } from 'socket.io-client'
import { DefaultEventsMap } from 'socket.io/dist/typed-events'

export const wsContext = createContext<
  Socket<DefaultEventsMap, DefaultEventsMap> | undefined
>(undefined)
