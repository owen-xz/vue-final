export default {
  strict: true,
  state: {
    messages: [],
  },
  actions: {
    updateMessage(context, payload) {
      const timestamp = Math.floor(new Date() / 1000);
      const content = payload;
      content.timestamp = timestamp;
      context.commit('ALERTMESSAGE', content);
      setTimeout(() => {
        context.commit('REMOVEALERTWITHTIMIMG', content.timestamp);
      }, 5000);
    },
    removeMessage(context, payload) {
      context.commit('REMOVEALERT', payload);
    },
  },
  mutations: {
    ALERTMESSAGE(state, payload) {
      state.messages.push(payload);
    },
    REMOVEALERT(state, payload) {
      state.messages.splice(payload, 1);
    },
    REMOVEALERTWITHTIMIMG(state, timestamp) {
      state.messages.forEach((item, index) => {
        if (item.timestamp === timestamp) {
          state.messages.splice(index, 1);
        }
      });
    },
  },
  getters: {
    messages(state) {
      return state.messages;
    },
  },
};
