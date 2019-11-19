import Vue from 'vue'

// 布局组件

const component = {
  name: 'comp',
  // template: `
  //   <div :style="style">
  //     <slot></slot>
  //   </div>
  // `,
  props: ['props1'],
  render (createELement) {
    return createELement('div', {
      style: this.style,
      on: {
        click: () => { this.$emit('click') }
      }
    }, [this.$slots.header, this.props1]) // 使用插槽名字
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
  data () {
    return {
      value: '123'
    }
  },
  mounted () {
  },
  methods: {
    handleClick: function () {
      console.log('aaa')
    },
    handleClick2: function () {
      console.log('bbb')
    }
  },
  // template: `
  //   <div>
  //     <comp-one ref='comp'>
  //       <span ref='span'>slot 插槽</span>
  //     </comp-one>
  //   </div>
  // `,
  render (createELement) {
    return createELement('comp-one', {
      ref: 'comp',
      props: {
        prop1: this.value
      },
      on: {
        click: this.handleClick
      },
      nativeOn: {
        click: this.handleClick2
      }
    }, [
      createELement('span', {
        ref: 'span',
        slot: 'header',
        domProps: {
          innerHTML: '<span>3u3883</span>'
        },
        attrs: {
          id: 'attrs-id'
        }
      }, this.value)
    ])
  }

})
