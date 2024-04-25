function excessiveWork ({ rules, reservedRules }) {
  const finalRules = []
  rules.forEach((key) => {
    if (typeof key !== 'string') {
      finalRules.push(key)
    }

    const parsedReservedRules = JSON.parse(reservedRules)
    if (key in parsedReservedRules) {
      finalRules.push(parsedReservedRules[key])
    }
  })
  self.postMessage(finalRules)
}

self.addEventListener('message', ({ data }) => {
  const { rules, reservedRules } = data
  excessiveWork({ rules, reservedRules })
})
