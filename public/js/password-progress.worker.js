/**
 * @function excessiveWork
 * placed heavy logic in here
 */

function excessiveWork ({ rulesLength, errs }) {
    const perRule = 100 / rulesLength
    const progress = Math.min(100, 100 - ((errs.length) * perRule))
    self.postMessage(progress)
}

self.addEventListener('message', ({ data }) => {
    const { rulesLength, errs } = data
    excessiveWork({ rulesLength, errs })
})
