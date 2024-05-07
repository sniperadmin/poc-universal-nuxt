export default createMachine({
  predictableActionArguments: true,
  context: {
    email: "",
    errors: {},
    formType: "login",
    name: "",
    password: "",
    confirmPassword: "",
  },
  id: "authForm",
  initial: "idle",
  states: {
    idle: {
      initial: "fill",
      on: {
        submit: {
          target: "pending",
        },
      },
      entry: {
        type: "checkFormType",
      },
      description:
        "This is the idle state when loading\n\ntheauth(login/signup) form\n\nIt checks the form type.",
      states: {
        fill: {
          on: {
            FILL_NAME: {
              target: "fill",
              actions: {
                type: "updateName",
              },
            },
            FILL_EMAIL: {
              target: "fill",
              actions: {
                type: "updateEmail",
              },
            },
            FILL_PASSWORD: {
              target: "fill",
              actions: {
                type: "updatePassword",
              },
            },
          },
        },
      },
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
      description:
        "This is the loading state where\n\nthe form submission is taking place",
    },
    online: {
      type: "final",
      description:
        "Nuxt auth handles the authentication\n\nfrom there. It has its own schemes and dynamics",
    },
  },
}).withConfig({
  actions: {
    checkFormType: assign({ formType: (ctx, event) => event.value }),
    updateName: assign({ name: (ctx, event) => event.value }),
    updateEmail: assign({ email: (ctx, event) => event.value }),
    updatePassword: assign({ password: (ctx, event) => event.value }),
  }
})
