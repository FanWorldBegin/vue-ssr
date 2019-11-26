<template>
  <section class="real-app">
    <input
      type="text"
      class="add-input"
      autofocus="autofocus"
      placeholder="接下去要做什么?"
      @keyup.enter="addTodo"
    >
    <Item
      v-for="todo in filteredTodos"
      :key="todo.id"
      :todo="todo"
      @del="deleteTodo"
    />
    <Tabs
      :filter="filter"
      :todos="todos"
      @togole="togoleFilter"
      @clearAllCompleted="clearAllCompleted"
    />
    <router-view />
  </section>
</template>

<script>
import Item from './item.vue'
import Tabs from './tabs.vue'
let id = 0

export default {
  beforeRouteEnter (to, from, next) {
    console.log('【todo】 before enter')
    // vm可以访问组件this
    next(vm => {
      console.log('after enter this.id', vm.id)
    })
  },
  beforeRouteUpdate (to, from, next) {
    console.log('【todo】 before Update')
    next()
  },
  beforeRouteLeave (to, from, next) {
    // 判断表单修改，弹确认框
    console.log('【todo】 before leave')
    if (global.confirm('are you sure')) {
      next()
    }
  },
  components: {
    Item,
    Tabs
  },
  props: ['id'],
  data () {
    return {
      todos: [],
      filter: 'all'
    }
  },
  computed: {
    filteredTodos () {
      if (this.filter === 'all') {
        return this.todos
      }
      const completed = this.filter === 'completed'
      return this.todos.filter(todo => completed === todo.completed)
    }
  },
  mounted () {
    console.log(this.id)
  },
  methods: {
    addTodo (e) {
      this.todos.unshift({
        id: id++,
        content: e.target.value.trim(),
        completed: false
      })
      e.target.value = ''
    },
    deleteTodo (id) {
      this.todos.splice(this.todos.findIndex(todo => todo.id === id), 1)
    },
    togoleFilter (state) {
      this.filter = state
    },
    clearAllCompleted () {
      this.todos = this.todos.filter(todo => !todo.completed)
    }
  }
}
</script>

<style lang="stylus" scoped>
.real-app
    width 600px
    margin 0 auto
    box-shadow 0 0 5px #666

.add-input
    position relative
    margin 0
    width 100%
    font-size 24px
    font-family inherit
    font-weight inherit
    line-height 1.4em
    border none
    outline none
    color inherit
    box-sizing border-box
    font-smoothing antialiased
    padding 16px 16px 16px 36px
    border none
    box-shadow inset 0 -2px 1px rgba(0, 0, 0, 0.03)

</style>
