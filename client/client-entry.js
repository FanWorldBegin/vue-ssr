import createAPP from './create-app'
const { app, router } = createAPP()

router.onReady(() => {
  app.$mount('#root')
})
