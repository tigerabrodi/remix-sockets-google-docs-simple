import {
  Links,
  LinksFunction,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "remix";
import React from "react";
import type { MetaFunction } from "remix";
import { connect } from "./ws-client";
import { Socket } from "socket.io-client";
import { wsContext } from "./ws-context";
import { DefaultEventsMap } from "socket.io/dist/typed-events";
import styles from "./styles.css";

export const meta: MetaFunction = () => {
  return { title: "Simple Google Docs" };
};

export const links: LinksFunction = () => {
  return [{ rel: "stylesheet", href: styles }];
};

export default function App() {
  const [socket, setSocket] =
    React.useState<Socket<DefaultEventsMap, DefaultEventsMap>>();

  React.useEffect(() => {
    const connection = connect();
    setSocket(connection);
    return () => {
      connection.close();
    };
  }, []);

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <wsContext.Provider value={socket}>
          <Outlet />
        </wsContext.Provider>
        <ScrollRestoration />
        <Scripts />
        {process.env.NODE_ENV === "development" && <LiveReload />}
      </body>
    </html>
  );
}
