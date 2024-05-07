type AuthFormContext = {
  email: string
  errors: any
  formType: string
  name: string
  password: string
  confirmPassword: string
  surveyValue: any
}

type AuthFormEvent =
  | { type: 'FILL_NAME', value: string }
  | { type: 'FILL_EMAIL', value: string }
  | { type: 'FILL_PASSWORD', value: string }
  | { type: 'submit', value: string }


export default createMachine<AuthFormContext, AuthFormEvent>({
  predictableActionArguments: true,
  context: {
    email: "",
    errors: {},
    formType: "login",
    name: "",
    password: "",
    confirmPassword: "",
    surveyValue: { id: null, data: null }
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
