import Vue from 'vue'
// 布局组件
const component = {
  template: `
    <div :style="style">
      <div class='header'>
        <slot name='header'></slot>
      </div>
      <div class='footer'>
        <slot name='footer'></slot>
      </div>
      <slot v-bind:user="user">
        {{ user.lastName }}
      </slot>
    </div>
  `,
  data () {
    return {
      style: {
        width: '200px',
        height: '200px',
        border: '1px solid #aaa'
      },
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
  template: `
    <div>
      <comp-one>
        // 具名插槽
        <template v-slot:header>
          <p>Here might be a page title</p>
          </template>
          <template v-slot:footer>
            <p>Here's some contact info</p>
        </template>
        // 作用域插槽
        <template v-slot:default="slotProps">
          {{ slotProps.user.firstName }}
        </template>
      </comp-one>
    </div>
  `

})
