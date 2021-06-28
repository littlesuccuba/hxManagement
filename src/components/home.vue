<template>
    <el-container class="full-height">
        <!-- 头部 -->
        <el-header>
            <div>
                <img src="/static/img/海星.png" alt="">
                <span>海星商城后台管理</span>
            </div>
            <div>
                <el-avatar icon="el-icon-user-solid" class="avatar"></el-avatar>
                <p class="avatar" style="border:none;box-shadow:none;">{{$store.state.users.username}}</p>
                <el-button type="danger" @click="LogOut()">退出</el-button>
            </div>
        </el-header>
        <!-- 主体 -->
        <el-container>
            <!-- 左侧导航 -->
            <el-aside :width="asideWidth">
                <!-- <asideNav></asideNav> -->
                <el-menu :unique-opened="true" router :collapse="isCollapse" :default-active="$route.path" :collapse-transition="false" background-color="#606266" text-color="#ffffff" class="full-height">
                    <el-menu-item index="/home">
                        <i class="el-icon-house"></i>
                        <span slot="title">首页</span>
                    </el-menu-item>
                    <el-submenu v-for="item in navData" :key="item.index" :index="item.index+''">
                        <template slot="title">
                            <i :class="item.icon"></i>
                            <span>{{ item.title }}</span>
                        </template>
                        <el-menu-item v-for="i in item.children" :key="i.i" :index="i.router">
                            <template slot="title">
                                <i :class="i.icon"></i>
                                <span>{{ i.title }}</span>
                            </template>
                        </el-menu-item>
                    </el-submenu>
                </el-menu>
            </el-aside>
            <!-- 右侧内容 -->
            <el-main>
                <el-card class="full-height clear-border">
                    <div slot="header">
                        <el-button class="bigFont clear-border" plain size="mini" :icon="CollapseButtonIcon" @click="CollapseToggle"></el-button>
                    </div>
                    <div>
                        <el-tabs v-model="activeIndex" type="card" @tab-click="clickTab" @tab-remove="removeTab" closable>
                            <el-tab-pane v-for="item of openTab"  :key="item.name" :label="item.name" :name="item.route">
                                <component :is="item.content"></component>
                            </el-tab-pane>
                        </el-tabs>
                    </div>
                </el-card>
            </el-main>
        </el-container>
    </el-container>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex'
import userlist from '@/components/management/user'
import index from '@/components/management/index'
import roleList from '@/components/management/roleList'
import goodsQuery from '@/components/management/goodsQuery'
import addgoods from '@/components/management/addgoods'
import orderInfo from '@/components/management/orderInfo'
export default {
    name: 'home',
    data: ()=>{
        return {
            asideWidth: '260px',
            CollapseButtonIcon: 'el-icon-s-fold',
            isCollapse: false,
            tabIndex: 1,
            navData: [
                {
                    index: 1,
                    title: '用户管理',
                    icon: 'el-icon-user-solid',
                    children: [
                        {
                            i: 1,
                            router: '/userlist',
                            title: '用户列表',
                            icon: 'el-icon-menu',
                        }
                    ]
                },
                {
                    index: 2,
                    title: '权限管理',
                    icon: 'el-icon-lock',
                    children: [
                        {
                            i: 1,
                            router: '/rolelist',
                            title: '角色列表',
                            icon: 'el-icon-s-custom',
                        },
                        {
                            i: 2,
                            router: '',
                            title: '权限列表',
                            icon: 'el-icon-key',
                        }
                    ]
                },
                {
                    index: 3,
                    title: '商品管理',
                    icon: 'el-icon-box',
                    children: [
                        {
                            i: 1,
                            router: '/goodsquery',
                            title: '商品查询',
                            icon: 'el-icon-shopping-bag-2',
                        },
                        {
                            i: 2,
                            router: '/addgoods',
                            title: '商品上架',
                            icon: 'el-icon-sell',
                        }
                    ]
                },
                {
                    index: 4,
                    title: '订单列表',
                    icon: 'el-icon-tickets',
                    children: [
                        {
                            i: 1,
                            router: '/orderInfo',
                            title: '订单查询',
                            icon: 'el-icon-document',
                        }
                    ]
                },
            ]
        }
    },
    methods: {
        ...mapMutations({
            'add_tabs':'tabs/add_tabs',
            'set_active_index':'tabs/set_active_index',
            'delete_tabs':'tabs/delete_tabs',
            'LogOut': 'users/LogOut'
        }),
        CollapseToggle(){
            this.isCollapse = !this.isCollapse
            if(this.isCollapse){
                this.CollapseButtonIcon = 'el-icon-s-grid'
                this.asideWidth = '65px'
            }else{
                this.CollapseButtonIcon = 'el-icon-s-fold'
                this.asideWidth = '260px'
            }
        },
        // 删除标签
        removeTab(target) {
            if(target == '/'||target == '/home'){
                return
            }
            this.delete_tabs(target)
            if (this.activeIndex === target) {
                // 设置当前激活的路由
                if (this.openTab && this.openTab.length >= 1) {
                // console.log('=============', this.openTab[this.openTab.length - 1].route)
                this.set_active_index(this.openTab[this.openTab.length - 1].route)
                this.$router.push({path: this.activeIndex})
                }
            }
        },
        clickTab(tab){
            this.$router.push({path: this.activeIndex})
        }
    },
    computed: {
        activeNav() { //当前激活的导航
            return this.$route.path
        },
        openTab () {
            return this.$store.state.tabs.openTab
        },
        activeIndex: {
            get () {
                return this.$store.state.tabs.activeIndex
            },
            set (val) {
                this.set_active_index(val)
            }
        },
    },
    mounted(){
        // 首次加载时需要获取登陆的token
        this.$axios.defaults.headers.Authorization = localStorage.getItem('token')
        window.vue = this
        // 刷新时以当前路由做为tab加入tabs
            // 当前路由不是首页时，添加首页以及另一页到store里，并设置激活状态
            // 当当前路由是首页时，添加首页到store，并设置激活状态
            if (this.$route.path !== '/' && this.$route.path !== '/home') {
                this.add_tabs({route: '/home' , name: '首页',content: 'index'})
                this.add_tabs({route: this.$route.path , name: this.$route.meta.name, content: this.$route.meta.comp})
                this.set_active_index(this.$route.path)
            
            } else {
                this.add_tabs({route: '/home', name: '首页',content: 'index'})
                this.set_active_index('/home')
            }
        // 判断当前是否登陆（依据state里的token来判断）
        if(this.$store.state.users.token){
            // 如果存在token，需要向服务器验证token是否已失效
        }else{
            // 如果token不存在，表示没有登陆，重定向到登陆页面
            this.$message.error('您未登陆，请先登陆！')
            this.$router.push('/login')
        }
    },
    watch: {
        '$route' (to, from) {
            let flag = false
            for (let item of this.openTab) {
                if (item.name === to.meta.name) {
                    this.set_active_index(to.path)
                    flag = true
                    break
                }
            }

            if (!flag) {
                this.add_tabs({route: to.path, name: to.meta.name, content: to.meta.comp})
                this.set_active_index(to.path)
            }
            
        }
    },
    components: {
        userlist,
        index,
        roleList,
        goodsQuery,
        addgoods,
        orderInfo
    }
}
</script>

<style scoped>
    .full-height{
        height: 100%;
    }
    .clear-border{
        border: none;
    }
    .el-header{
        background-color: #FF40A9;
        display: flex;
        justify-content: space-between;
        align-items: center;
        color: #fff;
    }
    .el-header>div{
        display: flex;
        align-items: center;
    }
    .el-header img{
        width: 3rem;
        height: 3rem;
        background-color: #fff;
        border-radius: 50%;
        box-shadow: #fff 0 0 12px;
    }
    .el-header span{
        margin-left: 10px;
        font-size: 1.5rem;
    }
    .el-main{
        background-color: rgb(241, 241, 241);
    }
    .bigFont{
        font-size: 1.6rem;
        padding: 0;
    }
    .avatar{
        margin-right: 20px;
        border: 1px solid #fff;
        box-shadow: rgb(255, 255, 255) 0px 0px 8px;
    }
</style>