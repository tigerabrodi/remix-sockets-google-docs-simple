import io from 'socket.io-client'

export function connect() {
  if (!window.ENV.BASE_URL_DEV) {
    throw 'error: no port'
  }

  return io(window.ENV.BASE_URL_DEV)
}
