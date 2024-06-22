import { FirebaseServer, sgMail } from '@/server/utils/firebase-server'
import { getAuth } from 'firebase-admin/auth'

export default defineEventHandler(async (event) => {
  FirebaseServer()
  console.log('getting email...')
  const { email, locale } = await readBody(event)

  console.log('email value is => ', email)
  if (email) {
    // const client = new MailtrapClient({ token: TOKEN });
    console.log('generating ver link...')
    const actionCodeSettings = {
      url: `https://staging.egab.co/auth/journalist`,
      handleCodeInApp: true
    }

    const actionLink = await getAuth().generateEmailVerificationLink(email, actionCodeSettings)
    console.log('action link is => ', actionLink)

    const msg = {
      to: email,
      from: 'clientsupport@egab.co',
      subject: "Welcome to Egab's community portal",
      templateId: 'd-50e19c53eca241ac8c094dd97d68b8a8',
      dynamicTemplateData: {
        username: email,
        actionLink,
        english: locale === 'en'
      }
    };

    console.log('sending msg...')
    await sgMail.send(msg).then(() => {
      console.log('sent email successfully')
      return true
    }).catch((error) => {
      console.log('error')
      throw createError({ statusCode: error.code, statusMessage: error.message })
    })
  } else {
    throw createError({ statusCode: 401, statusMessage: 'Email is not there!' })
  }
})
