<template>
  <div id="app">
    <div id="cover" />
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
  mounted () {
    console.log(this.$route)
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
