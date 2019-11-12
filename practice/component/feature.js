import Vue from 'vue'

const component = {
  // template: `
  //   <div :style='style'>
  //     <div class='header'>
  //       <slot name='header'></slot>
  //     </div>
  //     <div class='footer'>
  //       <slot name='footer'></slot>
  //     </div>
  //   </div>
  // `,
  template: `
    <div :style="style">
      <slot v-build:user='admon'></slot>
    </div>
  `,
  data () {
    return {
      style: {
        width: '200px',
        height: '200px',
        border: '1px solid #aaa'
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
      //  调用组件内的值
      <template v-slot:header>
        <h1>Here might be a page title</h1>
      </template>
      <template v-slot:footer>
        <p>Here's some contact info</p>
      </template>
      </comp-one>
    </div>
  `

})
