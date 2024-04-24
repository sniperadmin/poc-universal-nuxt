export function useRestJournalists() {
  async function getAllUsers() {
    return useAsyncData('journalists', () => $fetch('/api/rest/users/all', {method: 'get'}))
  }

  return {
    getAllRestJournalists: getAllUsers
  }
}
