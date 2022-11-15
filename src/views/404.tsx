import './404.scss';
import { defineComponent } from 'vue'
import router from '@/router'

export default defineComponent({
  setup() {
    const toHome = () => {
      router.push({ name: 'portal-home' })
    }
    const goBack = () => {
      router.go(-1)
    }
    return () => (
      <div class="site-wrapper site-page--not-found">
        <div class="site-content__wrapper">
          <div class="site-content">
            <h2 class="not-found-title">400</h2>
            <p class="not-found-desc">抱歉！您访问的页面<em>失联</em>啦 ...</p>
            <el-button onClick={goBack}>返回上一页</el-button>
            <el-button type="primary" class="not-found-btn-gohome" onClick={toHome}>进入首页</el-button>
          </div>
        </div>
      </div>
    )
  }
})