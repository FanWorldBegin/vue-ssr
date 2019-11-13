import Vue from 'vue'

const compoent = {
  props: {
    active: Boolean,
    propOne: String
  },
  template: `
    <div>
      <input type="text" v-model="text">
      <span @click="handleChange">{{propOne}}</span>
      <span v-show="active">see me if active</span>
    </div>
  `,
  data () {
    return {
      text: 0
    }
  },
  mounted () {
    console.log('comp mounted')
  },
  methods: {
    handleChange () {
      this.$emit('change')
    }
  }
}

const parent = new Vue({
  name: 'Parent'
})

// 继承组件component
const componet2 = {
  extends: compoent,
  data () {
    return {
      text: 1
    }
  },
  mounted () {
    console.log('componet2:' + this.$parent.$options.name)
  }
}

// const CompVue = Vue.extend(compoent)

// new CompVue({
//   el: '#root',
//   propsData: {
//     propOne: 'xxx'
//   },
//   data: {
//     text: '123'
//   },
//   mounted () {
//     console.log('instance mounted')
//   }
// })

// new Vue({
//   el: '#root',
//   components: {
//     Comp: componet2
//   },
//   mounted () {
//     console.log(this.$parent.$options.name)
//   },
//   data: {
//     text: 23333
//   },
//   template: `
//     <div>
//       <span>{{text}}</span>
//       <comp></comp>
//     </div>
//   `
// })

new Vue({
  name: 'Root',
  parent: parent,
  el: '#root',
  components: {
    Comp: componet2
  },
  mounted () {
    console.log('new Vue this.$parent.$options.name: ' + this.$parent.$options.name)
  },
  data: {
    text: 23333
  },
  template: `
    <div>
      <span>{{text}}</span>
      <Comp></Comp>
    </div>
  `
})
