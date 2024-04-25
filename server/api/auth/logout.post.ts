export default eventHandler(async (event) => {
  const head = getRequestHeader(event, 'authorization')
  console.log('from logout endpoint / it does nothing at the moment', head)
})
