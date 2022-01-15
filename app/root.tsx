import {
  Links,
  LinksFunction,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from 'remix'
import React from 'react'
import type { MetaFunction } from 'remix'
import { connect } from './ws-client'
import { Socket } from 'socket.io-client'
import { wsContext } from './ws-context'
import { DefaultEventsMap } from 'socket.io/dist/typed-events'
import styles from './styles.css'

declare global {
  interface Window {
    ENV: { BASE_URL_DEV: string | undefined }
  }
}

export const meta: MetaFunction = () => {
  return { title: 'Simple Google Docs' }
}

export const links: LinksFunction = () => {
  return [{ rel: 'stylesheet', href: styles }]
}

export default function App() {
  const [socket, setSocket] =
    React.useState<Socket<DefaultEventsMap, DefaultEventsMap>>()

  React.useEffect(() => {
    const connection = connect()
    setSocket(connection)
    return () => {
      connection.close()
    }
  }, [])

  return (
    <Document>
      <wsContext.Provider value={socket}>
        <Outlet />
      </wsContext.Provider>
    </Document>
  )
}

type LoaderData = {
  ENV: { BASE_URL_DEV: string | undefined }
}

export function loader(): LoaderData {
  return {
    ENV: {
      BASE_URL_DEV: process.env.BASE_URL_DEV,
    },
  }
}

function Document({
  children,
  title,
}: {
  children: React.ReactNode
  title?: string
}) {
  const data = useLoaderData<LoaderData>()
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        {title ? <title>{title}</title> : null}
        <Meta />
        <Links />
      </head>
      <body>
        <script
          dangerouslySetInnerHTML={{
            __html: `window.ENV = ${JSON.stringify(data.ENV)}`,
          }}
        />
        {children}
        <ScrollRestoration />
        <Scripts />
        {process.env.NODE_ENV === 'development' && <LiveReload />}
      </body>
    </html>
  )
}

export function ErrorBoundary({ error }: { error: Error }) {
  console.error(error)
  return (
    <Document title="Error!">
      <div>
        <h1 style={{ textAlign: 'center', fontWeight: 'bold', fontSize: 20 }}>
          There was an error
        </h1>
        <p>{error.message}</p>
      </div>
    </Document>
  )
}
