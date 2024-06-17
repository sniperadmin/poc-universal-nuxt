import nodemailer from 'nodemailer'
import firebaseServer from '@/server/utils/firebase-server'
import { getAuth } from 'firebase-admin/auth'

export default defineEventHandler(async (event) => {
  firebaseServer()
  const { email } = await readBody(event)
  if (email) {
    const transport = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: "bd59b7b77e07a4",
        pass: "65045b7b3cf08d"
      },
      debug: true,
    });
    const actionCodeSettings = {
      url: `https://staging.egab.co/auth/journalist`,
      handleCodeInApp: true
    }

    const actionLink = await getAuth().generateEmailVerificationLink(email, actionCodeSettings)

    const msg = {
      to: email,
      from: 'clientsupport@egab.co',
      subject: "Welcome to Egab's community portal",
      html: `verification link => ${actionLink}`
    } as any;

    try {
      await transport.sendMail(msg)
      return true
    } catch (error) {
      throw createError({ statusCode: 401, statusMessage: error.message })
    }
  } else {
    throw createError({ statusCode: 401, statusMessage: 'Email is not there!' })
  }
})
