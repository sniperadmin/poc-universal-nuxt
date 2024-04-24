export function useFirebaseJournalists() {
  async function getAllUsers() {
    const resPayload = await useAsyncData('journalists', () => $fetch(`/api/firebase/users/all`, { method: 'get' }))
    return resPayload
  }

  return {
    getAllFirebaseJournalists: getAllUsers
  }
}
