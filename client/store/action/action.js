export default {
  updateCountAsync (store, data) {
    setTimeout(() => {
      store.commit('updateCount', {
        num: data.num,
        num2: 2
      })
    }, data.time)
  }
}
