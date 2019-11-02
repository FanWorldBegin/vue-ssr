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
  template: `
    <div>
      <span>Name: {{name}}</span>
      <p>Name: {{getName()}}</p>
      <p>Name: {{number}}</p>
      <p><input type="text" v-model="number"></p>
    </div>
  `,
  computed: {
    name () {
      console.log('new name')
      return `${this.firstName} ${this.lastName}`
    }
  },
  methods: {
    getName () {
      console.log('getName invoked')
      return `${this.firstName} ${this.lastName}`
    }
  }
})
