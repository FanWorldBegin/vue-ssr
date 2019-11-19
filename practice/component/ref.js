import Vue from 'vue'

const ChildComponent = {
  template: '<div>ChildComponent{{data.value}}</div>',
  inject: ['grandParent', 'data'],
  mounted () {
    console.log(this.$parent.$options.name)
    console.log(this.grandParent, this.data)
  }
}

// 布局组件

const component = {
  name: 'comp',
  template: `
    <div :style="style">
      <slot></slot>
      <ChildComponent></ChildComponent>
    </div>
  `,
  components: {
    ChildComponent
  },
  data () {
    return {
      style: {
        width: '200px',
        height: '200px',
        border: '1px solid #aaa'
      },
      name: 'component',
      user: {
        lastName: 'lastName',
        firstName: 'firstName'
      }
    }
  }
}

new Vue({
  el: '#root',
  components: {
    compOne: component
  },
  provide () {
    // 注意一定要通过函数返回，在vue对象初始化后调用，得到相应的值
    const data = {}
    Object.defineProperty(data, 'value', {
      get: () => this.value,
      enumerable: true // 可以被读取
    })
    return {
      grandParent: this,
      data
    }
  },
  data () {
    return {
      value: '123'
    }
  },
  mounted () {
    console.log(this.$refs.comp)
    console.log(this.$refs.span)
    console.log(this.$refs.comp.name)
  },
  template: `
    <div>
      <comp-one ref='comp'>
        <span ref='span'>slot 插槽</span>
      </comp-one>
      <input type='text' v-model='value'/>
    </div>
  `

})
