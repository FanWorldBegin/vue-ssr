import Vue from 'vue'
import APP from './app.vue'
import './assets/image/a.png'
import './assets/styles/test.css'
import './assets/styles/test.scss'

const root = document.createElement('div');
document.body.appendChild(root)
new Vue({
    render: (h) => h(APP)
}).$mount(root)