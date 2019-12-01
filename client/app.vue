<template>
  <div id="app">
    <div id="cover" />
    <p>{{ fullName }} {{ count }}</p>
    <Header />
    <!-- <Todo /> -->
    <router-link to="/app/123">
      APP123
    </router-link>
    <router-link to="/app/456">
      APP456
    </router-link>
    <router-link to="/login">
      login
    </router-link>
    <router-link to="/login/exact">
      login Exact
    </router-link>
    <transition name="fade">
      <router-view />
    </transition>
    <Footer />
    <!-- <router-view name='a'/> -->
  </div>
</template>

<script>
import {
  mapState,
  mapGetters,
  mapActions,
  mapMutations
} from 'Vuex'
import Header from './layout/header.vue'
import Footer from './layout/footer.jsx'
// import Todo from './views/todo/todo.vue'
export default {
  components: {
    Header,
    Footer
    // Todo
  },
  data () {
    return {
      text: 'abc'
    }
  },
  methods: {
    ...mapActions(['updateCountAsync']),
    ...mapMutations(['updateCount'])
  },
  computed: {
    // ...mapState(['count']),
    ...mapState({
      count: 'count',
      counter: (state) => state.count // 可以进行计算
    }),
    ...mapGetters(['fullName'])
    // count () {
    //   return this.$store.state.count
    // },
    // fullName () {
    //   return this.$store.getters.fullName
    // }
  },
  mounted () {
    console.log(this.$route)
    console.log(this.$store)
    let i = 1
    // this.$store.state.count = 3

    // this.$store.dispatch('updateCountAsync', {
    //   num: 5,
    //   time: 2000
    // })
    this.updateCountAsync({
      num: 5,
      time: 2000
    })
    setInterval(() => {
      // 调用 mutations
      this.updateCount({
        num: i++,
        num2: 2
      })
    }, 1000)
  }
}

</script>

<style scoped lang="stylus">
#app
    position absolute
    left 0
    right 0
    top 0
    bottom 0
    #cover
        position absolute
        left 0
        right 0
        top 0
        bottom 0
        background-color #999
        opacity 0.2
        z-index -1

</style>
