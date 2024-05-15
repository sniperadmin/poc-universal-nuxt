type VerifyEmailContext = {
  sentAt: number
  emailSent: boolean
  resendWindow: number
}

type VerifyEmailEvent =
  | { type: 'SEND_EMAIL', value: string }
  | { type: 'RESEND_EMAIL', value: string }

export default createMachine<VerifyEmailContext, VerifyEmailEvent>({
  predictableActionArguments: true,
  context: {
    sentAt: 0,
    emailSent: false,
    resendWindow: 60000,
  },
  id: "emailVerification",
  initial: "pending",
  states: {
    pending: {
      on: {
        SEND_EMAIL: {
          target: "sending",
        },
        RESEND_EMAIL: {
          target: "sending",
          cond: {
            type: "canResend",
          },
        },
      },
    },
    sending: {
      invoke: {
        id: "sendEmail",
        onDone: {
          target: "verified",
        },
        onError: {
          target: "failed",
        },
        src: "sendEmail",
      },
    },
    verified: {},
    failed: {
      on: {
        RESEND_EMAIL: {
          target: "sending",
          cond: {
            type: "canResend",
          },
        },
      },
    },
  },
}).withConfig({
  guards: {
    canResend: function (context, event) {
      const now = Date.now();
      return !context.emailSent || now - context.sentAt >= context.resendWindow;
    },
  },
  // NOTE: The following service will be handled through the component
  // services: {
  //   sendEmail: sendEmail,
  // },
});
