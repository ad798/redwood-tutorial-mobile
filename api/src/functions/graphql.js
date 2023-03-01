import { authDecoder } from '@redwoodjs/auth-dbauth-api'
import { createGraphQLHandler } from '@redwoodjs/graphql-server'

import directives from 'src/directives/**/*.{js,ts}'
import sdls from 'src/graphql/**/*.sdl.{js,ts}'
import services from 'src/services/**/*.{js,ts}'

import { getCurrentUser } from 'src/lib/auth'
import { db } from 'src/lib/db'
import { logger } from 'src/lib/logger'

export const handler = createGraphQLHandler({
  authDecoder,
  loggerConfig: { logger, options: {} },
  getCurrentUser,
  directives,
  sdls,
  services,
  cors: {
    origin: 'http://localhost', // <-- android emulator dir
    credentials: true,
  },

  onException: () => {
    // Disconnect from your database with an unhandled exception.
    db.$disconnect()
  },
})
