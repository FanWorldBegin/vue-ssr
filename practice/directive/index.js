import Vue from 'vue'

new Vue({
  el: '#root',
  data: {
    text: 0,
    html: '<span>this is html</span>',
    active: false,
    arr: [1, 2, 3],
    obj: {
      a: '123',
      b: '456',
      c: '789'
    },
    picked: ''
  },
  template: `
    <div>
      <div pre></div>
      <div v-text='text' v-on:click=''></div>
      <div v-html='html'></div>
      <div v-show='active'></div>
      <div v-if='active'></div>
      <div v-else-if='text === 0'> else if content </div>
      <div v-else> else content </div>
      <ul>
        <li v-for='(item, index) in arr'>{{item}}</li>
      </ul>
      <ul>
        <li v-for="(val, key, index) in obj" :key='val'>{{val}}:{{key}}:{{index}}</li>
      </ul>

      <input text='text' v-model.number="text" /> <br>
      <input type="checkbox" v-model="active">
      <div>
        <input type="checkbox" :value="1" v-model="arr">
        <input type="checkbox" :value="2" v-model="arr">
        <input type="checkbox" :value="3" v-model="arr">
      </div>
      <div>
        <input type="radio" value="one" v-model="picked">
        <input type="radio" value="two" v-model="picked">
      </div>
    </div>
  `
})
