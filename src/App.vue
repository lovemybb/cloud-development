<script lang="ts">
export default {
  onLaunch: function() {
    console.log('App Launch')
  },
  onShow: function() {
    console.log('App Show')
  },
  onHide: function() {
    console.log('App Hide')
  },
  computed: {
  },
  watch: {

  },
  methods: {
    // 获取消息数
  }

}
</script>

<style>
@import url("common/css/common.css");
@import url("common/scss/globalStyle.scss");
/*每个页面公共css */
.scroll-text .uni-noticebar {
  margin: 0 !important;
  padding: 0 !important;
}
</style>
