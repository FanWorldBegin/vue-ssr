import Vue from 'vue'

new Vue({
  el: '#root',
  data: {
    isActive: false,
    arr: [1, 2, 3],
    html: '<span>123</span>',
    aaa: 'main',
    styles: {
      color: 'red',
      appearance: 'none'
    },
    styles2: {
      color: 'green'
    }
  },
  // template: `
  //   <div :id="aaa" @click="handleClick">
  //     <p v-html="html"></p>
  //   </div>
  // `,
  template: `
    <div
      :class="[{ active: isActive }]"
      :style="[styles, styles2]"
      v-on:click="handleClick"
    >
      <p>{{getJoinedArr(arr)}}</p>
    </div>
  `,
  computed: {
    classNames () {
      return 'active'
    }
  },
  methods: {
    handleClick () {
      alert('clicked') // eslint-disable-line
    },
    getJoinedArr (arr) {
      return arr.join(' ')
    }
  }
})
