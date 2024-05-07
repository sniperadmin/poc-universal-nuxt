export default createMachine({
  predictableActionArguments: true,
  context: {
    error: {}
  },
  id: "authForm",
  initial: "idle",
  states: {
    idle: {
      on: {
        SUBMIT: {
          target: "pending"
        },
      },
      exit: 'clearErrors'
    },
    pending: {
      invoke: {
        // input: {},
        onDone: {
          target: "online",
        },
        onError: {
          target: "idle",
        },
        src: "submitForm",
      },
    },
    online: {
      type: "final",
    },
  },
}).withConfig({
  actions: {
    clearErrors: (context) => { context.error = {} }
  }
})
