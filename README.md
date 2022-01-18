This is just a simple google docs thing, me playing around with Remix and sockets.

# Installation

After forking and cloning, run `npm install`, then you need two environment variables:

- `BASE_URL_DEV`: set to `http://localhost:3000/`

- `PORT`: set to `3000`

## Development

You'll need to run two terminals (or bring in a process manager like concurrently/pm2-dev if you like):

Start the Remix development asset server

```sh
npm run dev
```

In a new tab start your express app:

```sh
npm run start:dev
```

This starts your app in development mode, which will purge the server require cache when Remix rebuilds assets so you don't need a process manager restarting the express server.

# Tests

To run the tests: `npm run test`.

# Demo

https://user-images.githubusercontent.com/49603590/149983975-0139acfb-689b-4f23-8a59-447a3f145d81.mp4
