import FirebaseServer from '~/server/utils/firebase-server'
import { getAuth } from 'firebase-admin/auth'

export default eventHandler(async (event) => {
  FirebaseServer()
  const authHeaderValue = getRequestHeader(event, 'authorization')
  if (typeof authHeaderValue === 'undefined') {
    throw createError({ statusCode: 403, statusMessage: 'Need to pass valid Bearer-authorization header to access this endpoint' })
  }

  const token = authHeaderValue.split(' ')[1]

  try {
    const validatedToken = await getAuth().verifyIdToken(token)
    if (!validatedToken.email_verified) {
      // await sendRedirect(event, '/auth/verify-email')
    }
    return validatedToken
  } catch (error) {
    console.error('Login failed. Here\'s the raw error:', error)
    throw createError({ statusCode: 403, statusMessage: 'You must be logged in to use this endpoint' })
  }
})
