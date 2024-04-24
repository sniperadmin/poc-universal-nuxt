export default defineEventHandler(async (event) => {
  try {
    const { strapiToken, serverBaseUrl } = useRuntimeConfig()
    return await event.$fetch(`${serverBaseUrl}/users`, {
      headers: {
        'Authorization': `Bearer ${strapiToken}`
      }
    })
  } catch(error) {
    throw error
  }
})
