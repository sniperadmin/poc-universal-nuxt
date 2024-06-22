type VerifyEmailContext = {
  sentAt: number
  emailSent: boolean
  resendWindow: number
  coolDown: boolean
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
    coolDown: false
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
          cond: "canResend",
        },
      },
    },
    sending: {
      invoke: {
        id: "sendEmail",
        onDone: {
          target: "cooldown",
        },
        onError: {
          target: "failed",
        },
        src: "sendEmail",
      },
    },
    failed: {
      on: {
        RESEND_EMAIL: {
          target: "sending",
          cond: "canResend"
        }
      }
    },
    cooldown: {
      invoke: {
        id: "setCoolDown",
        src: "setCoolDown"
      },
      after: {
        60000: { target: "pending", actions: "resetCoolDown" }
      }
    }
  }
}).withConfig({
  actions: {
    updateEmailSent: assign({ emailSent: true }),
    setCoolDown: assign({ coolDown: true }),
    resetCoolDown: assign({ coolDown: false })
  },
  guards: {
    canResend: function (context, event) {
      const now = Date.now();
      const cooldownEndTime = context.sentAt + context.resendWindow;
      return !(context.emailSent || now < cooldownEndTime || context.coolDown);
    }
  }
});
