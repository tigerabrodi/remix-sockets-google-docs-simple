import * as React from 'react'
import { Socket } from 'socket.io-client'
import { DefaultEventsMap } from 'socket.io/dist/typed-events'

type Props<DataType> = {
  event: 'receive-client'
  socket: Socket<DefaultEventsMap, DefaultEventsMap> | undefined
  setData: React.Dispatch<React.SetStateAction<DataType>>
}

export const useSocketListen = <DataType>({
  socket,
  setData,
  event,
}: Props<DataType>) => {
  React.useEffect(() => {
    if (!socket) return

    socket.on(event, (data) => {
      setData(data)
    })
  }, [socket])
}
