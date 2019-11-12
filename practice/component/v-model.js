import Vue from 'vue'

const component = {
  model: {
    prop: 'value1', // 双向绑定修改的值
    event: 'change' // 双向绑定修改内部组件时触发的方法
  },
  props: ['value', 'value1'],
  template: `
    <div>
      <input type='text' @change='handleInput' :value='value1'>
    </div>
  `,
  methods: {
    handleInput (e) {
      // 将input 的值传递出去
      this.$emit('input', e.target.value)
    }
  }

}

// arguments[0] 是函数的参数列表，e.target.value
new Vue({
  el: '#root',
  components: {
    compOne: component
  },
  data () {
    return {
      value: '123'
    }
  },
  template: `
    <div>
    
      <comp-one :value1='value' @input='value = arguments[0]'></comp-one>
      <comp-one :value1='value' v-model="value"></comp-one>
    </div>
  `

})
