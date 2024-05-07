export default createMachine({
  predictableActionArguments: true,
  context: {
    errors: {},
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    formType: 'login',
  },
  id: 'authForm',
  initial: 'idle',
  states: {
    idle: {
      on: {
        submit: {
          target: 'pending',
        },
      },
      entry: [
        {
          type: 'checkFormType',
        },
        {
          type: 'clearErrors',
          params: {
            errors: {},
          },
        },
      ],
      exit: {
        type: 'submitForm',
        params: {
          errors: {},
        },
      },
      description:
        'This is the idle state when loading the auth(login/signup) form\n\nIt checks the form type.',
    },
    pending: {
      invoke: {
        // input: {},
        onDone: {
          target: 'online',
        },
        onError: {
          target: 'idle',
        },
        src: 'submitForm',
      },
      description:
        'This is the loading state where\n\nthe form submission is taking place',
    },
    online: {
      type: 'final',
      description:
        'Nuxt auth handles the authentication\n\nfrom there. It has its own schemes and dynamics',
    },
  },
}).withConfig({
  actions: {
    clearErrors: (context) => { context.errors = {} },
  }
})
