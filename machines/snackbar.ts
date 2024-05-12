export default createMachine({
  context: {
    queue: [],
  },
  id: "notifications",
  initial: "idle",
  states: {
    idle: {
      on: {
        SHOW_NOTIFICATION: {
          target: "showing",
          actions: {
            type: "addNotificationToQueue",
          },
        },
      },
    },
    showing: {
      on: {
        HIDE_CURRENT_NOTIFICATION: {
          target: "showing",
          actions: {
            type: "removeCurrentNotification",
          },
        },
        SHOW_NOTIFICATION: {
          target: "showing",
          actions: {
            type: "addNotificationToQueue",
          },
        },
      },
      after: {
        "5000": {
          target: "showing",
          actions: {
            type: "removeCurrentNotification",
          },
        },
      },
    },
  },
}).withConfig({
  actions: {
    addNotificationToQueue: function (context, event) {
      // Add your action code here
      // ...
      context.queue.push(event.value)
    },
    removeCurrentNotification: function (context, event) {
      // Add your action code here
      // ...
      context.queue.shift()
    },
  },
});
