import Notification from './notification.vue'

export default {
  // extends 新声明的属性可以直接覆盖
  extends: Notification,
  computed: {
    style () {
      return {
        position: 'fixed',
        right: '20px',
        bottom: `${this.verticalOffset}px`
      }
    }
  },
  mounted () {
    this.createTimer()
  },
  methods: {
    createTimer () {
      if (this.autoClose) {
        this.timer = setTimeout(() => {
          this.visible = false
        }, this.autoClose)
      }
    },
    clearTimer () {
      if (this.timer) {
        clearTimeout(this.timer)
      }
    }
  },
  beforeDestory () {
    // 清除定时器
    this.createTimer()
  },
  data () {
    return {
      verticalOffset: 0,
      autoClose: 3000
    }
  }
}