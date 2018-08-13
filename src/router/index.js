import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [{
      path: '/',
      redirect: '/login'
    },
    {
      path: '/meetinglist',
      component: resolve => require(['../components/common/Home.vue'], resolve),
      children: [{
          path: '/sendemails',
          component: resolve => require(['../components/pages/SendEmails.vue'], resolve)
        },
        {
          path: '/meetinglist',
          component: resolve => require(['../components/pages/MeetingList.vue'], resolve)
        },
        {
          path: '/indexmanage',
          component: resolve => require(['../components/pages/indexManage.vue'], resolve)
        },
        {
          path: '/test3',
          component: resolve => require(['../components/pages/test3.vue'], resolve)
        },
        {
          path: '/test1',
          component: resolve => require(['../components/pages/test1.vue'], resolve)
        },
        {
          path: '/test2',
          component: resolve => require(['../components/pages/test2.vue'], resolve)
        },
        {
          path: '/mytest',
          component: resolve => require(['../components/pages/mytest.vue'], resolve)
        }
      ]
    },
    {
      path: '/login',
      component: resolve => require(['../components/common/Login.vue'], resolve)
    }
  ]
})
