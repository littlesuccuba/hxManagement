import Vue from 'vue'
import Router from 'vue-router'
import login from '@/components/users/login'
import slider from '@/components/utils/slider'
import register from '@/components/users/register'
import home from '@/components/home'
import userlist from '@/components/management/user'
import roleList from '@/components/management/roleList'
import goodsQuery from '@/components/management/goodsQuery'
import addgoods from '@/components/management/addgoods'
import orderInfo from '@/components/management/orderInfo'

Vue.use(Router)

export default new Router({
  mode:'bash',
  routes: [
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/home',
      name: 'home',
      component: home,
      meta: {
        name: '首页',
        comp: 'index'
      },
      children: [
        {
          path: '/userlist',
          name: 'userlist',
          component: userlist,
          meta: {
            name: '用户列表',
            comp: 'userlist'
          }
        },
        {
          path: '/rolelist',
          name: 'roleList',
          component: roleList,
          meta: {
            name: '角色列表',
            comp: 'roleList'
          }
        },
        {
          path: '/goodsquery',
          name: 'goodsquery',
          component: goodsQuery,
          meta: {
            name: '商品查询',
            comp: 'goodsQuery'
          }
        },
        {
          path: '/addgoods',
          name: 'addgoods',
          component: addgoods,
          meta: {
            name: '商品上架',
            comp: 'addgoods'
          }
        },
        {
          path: '/orderInfo',
          name: 'orderInfo',
          component: orderInfo,
          meta: {
            name: '订单查询',
            comp: 'orderInfo'
          }
        }
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: login
    },
    {
      path: '/slider',
      name: 'slider',
      component: slider
    },
    {
      path: '/register',
      name: 'register',
      component: register
    }
  ]
})
