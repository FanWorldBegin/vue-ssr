<template>
  <div id="app">
    <div id="cover" />
    <p>{{ fullName }} {{ count }}</p>
    <p>{{ textA }}</p>
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
    <button @click="notify">
      notify 触发
    </button>
    <!-- <notification content="ssss" /> -->
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
  // metaInfo: {
  //   title: "这是一个title"
  // },
  components: {
    Header,
    Footer
  },
  data () {
    return {
      text: 'abc'
    }
  },
  methods: {
    // textActions 为 模块B的，B没有nameSpace
    ...mapActions(['updateCountAsync', 'a/add', 'textAction']),
    ...mapMutations(['updateCount', 'a/updateText']),
    notify () {
      this.$notify({
        content: 'test $notify',
        btn: 'close'
      })
    }
  },
  computed: {
    textA () {
      return this.$store.state.a.text
    },
    // ...mapState(['count']),
    ...mapState({
      count: 'count',
      counter: (state) => state.count, // 可以进行计算
      textC: state => state.c.text
    }),
    // ...mapGetters(['fullName', 'a/textPlus'])
    ...mapGetters({
      fullName: 'fullName',
      textPlus: 'a/textPlus'
    })
    // count () {
    //   return this.$store.state.count
    // },
    // fullName () {
    //   return this.$store.getters.fullName
    // }
  },
  mounted () {
    // this.$notify({
    //   content: 'test $notify',
    //   btn: 'close'
    // })
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
