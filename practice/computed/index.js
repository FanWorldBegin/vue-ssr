import Vue from 'vue'

new Vue({
  el: '#root',
  data: {
    firstName: 'Rose ',
    lastName: 'Pordack',
    number: 0,
    fullName: '',
    obj: {
      a: 0
    }
  },
  computed: {
    name: {
      get () {
        console.log('new name')
        return `${this.firstName} ${this.lastName}`
      },
      set (name) {
        const names = name.split(' ')
        this.firstName = names[0]
        this.lastName = names[1]
      }
    }
  },
  template: `
    <div>
      <span>firstName: {{firstName}}</span>
      <p>lastName: {{lastName}}</p>
      <p>getName: {{getName()}}</p>
      <p>number: {{number}}</p>
      <p>input number：<input type="text" v-model="number"></p>
      <p>Name: <input type="text" v-model="name"></p>
      <p>fullName: {{fullName}}</p>
      <p>obj.a: <input type="text" v-model="obj.a"></p>
    </div>
  `,
  watch: {
    firstName: {
      handler (newName, oldName) {
        this.fullName = newName + ' ' + this.lastName
      },
      immediate: true, // 立刻执行
      deep: true
    },
    obj: {
      handler (obj) {
        console.log(obj)
      },
      immediate: true, // 立刻执行
      deep: true
    },
    'obj.a': {
      handler (obj) {
        console.log(obj)
      },
      immediate: true // 立刻执行
    }
  },
  methods: {
    getName () {
      console.log('getName invoked')
      return `${this.firstName} ${this.lastName}`
    }
  },
  mounted () {
    this.obj = {
      a: '345'
    }
  }
})
