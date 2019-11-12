import Vue from 'vue'

const component = {
  props: {
    active: {
      required: true,
      default: true,
      // 当声明的是方法
      // default() {
      //   return {}
      // },
      validator (value) {
        return typeof value === 'boolean'
      }

    },
    propsOne: String
  },
  template: `<div>
    <input type="text" v-model="text">
    <p v-show='active'>see me if active</p>
    <p @click="handleChange">{{propsOne}}</p>
  </div>`,
  data () {
    return {
      text: 123
    }
  },
  methods: {
    handleChange () {
      this.onChange()
    }
  },
  mounted () {
    // this.propsOne = '修改props'
  }
}

const componentEmit = {
  props: {
    active: Boolean,
    propsOne: String
  },
  template: `<div>
    <p @click="handleChange">{{propsOne}}</p>
  </div>`,
  data () {
    return {
      text: 123
    }
  },
  methods: {
    handleChange () {
      // 触发父组件
      this.$emit('change')
    }
  },
  mounted () {
    // this.propsOne = '修改props'
  }
}

new Vue({
  el: '#root',
  components: {
    CompOne: component,
    CompEmit: componentEmit
  },
  data: {
    prop1: 'prop1'
  },
  mounted () {
    console.log(this.$refs.com1)
  },
  methods: {
    handleChange () {
      this.prop1 += 1
    }
  },
  template: `<div>
    <comp-one ref='com1' :active="true" :props-one='prop1' :on-change='handleChange'></comp-one>
    <comp-one :active="false" :propsOne='prop1' :on-change='handleChange'></comp-one>
    <comp-emit :active="false" :propsOne='prop1' @change='handleChange'></comp-emit>
  </div>`

})
