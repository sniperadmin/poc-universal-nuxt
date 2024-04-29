export type IGetAll = () => Promise<any>

export function useRestJournalists() {
  const getAll: IGetAll = async () => {
    return useAsyncData('journalists', () => $fetch('/api/rest/users/all', {method: 'get'}))
  }

  return {
    getAll
  }
}
