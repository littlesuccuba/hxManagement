<template>
  <div style="overflow: hidden;">
      <el-row type="flex" justify="center" align="middle" style="margin-top: 8%;">
          <el-col :span="6">
                <div class="form-bg">
                    <!-- logo -->
                    <el-row>
                        <el-col>
                            <el-avatar class="logo" :size="120" src="/static/img/海星.png"></el-avatar>
                        </el-col>
                    </el-row>
                    <!-- 登陆表单 -->
                    <el-row type="flex" justify="center" style="margin-top: 4%;">
                        <el-col :span="14">
                            <el-form :model="form">
                                <el-form-item>
                                    <!-- <el-icon-user slot="user"></el-icon-user> -->
                                    <el-input prefix-icon="el-icon-user-solid" v-model="form.name" placeholder="用户名/手机"></el-input>
                                </el-form-item>
                                <el-form-item>
                                    <el-input prefix-icon="el-icon-lock" v-model="form.password" placeholder="密码" show-password></el-input>
                                </el-form-item>
                                <el-form-item>
                                    <el-row type="flex" align="middle" justify="space-between">
                                        <el-col :span="6">
                                            <el-button size="medium" plain @click="elementToggle">点击验证</el-button>
                                        </el-col>
                                        <el-col :span="16">
                                            <slider v-if="is_show_slider" @success="getsuccess"></slider>
                                        </el-col>
                                    </el-row>
                                </el-form-item>
                                <el-form-item>
                                    <el-row>
                                        <el-col>
                                            <el-button type="primary" style="width: 100%;" :disabled="confirmSuccess" @click="login">登陆</el-button>
                                        </el-col>
                                    </el-row>
                                    <el-row style="margin-top:10px;">
                                        <el-col>
                                            <router-link class="links-color" to="/register">
                                                <el-button class="register" plain style="width: 100%;">注册</el-button>
                                            </router-link>
                                        </el-col>
                                    </el-row>
                                </el-form-item>
                            </el-form>
                        </el-col>
                    </el-row>
                </div>
          </el-col>
      </el-row>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
    name:'login',
    data: ()=>{
        return {
            // centerDialogVisible: false
            form: {
                name: '',
                password: ''
            },
            confirmSuccess: true,
            is_show_slider: false
        }
    },
    methods: {
        ...mapActions({
            'LoginAsync': 'users/LoginAsync'
        }),
        login(){
            window.vue = this
            const url = 'users/login/'
            const form = {
                username:this.form.name,
                password:this.form.password
            }
            // console.log(form)
            this.LoginAsync({url, form})
            // this.$axios.post('aaa').then().catch()
        },
        getsuccess(data){
            if(this.form.name!=''&&this.form.password!=''){
                this.confirmSuccess = !data
            }else{
                // alert()
                this.$message.error('用户名或密码未输入');
            }
            // console.log(!data)
        },
        elementToggle(){
            if(this.form.name!=''&&this.form.password!=''){
                this.is_show_slider = true
            }else{
                // alert()
                this.$message.error('用户名或密码未输入');
            }
        }
    },
}
</script>

<style scoped>
    *{
        text-align: center;
    }
    .form-bg{
        background: #fff;
        border-radius: 15px;
        border: 1px solid #eee;
        height: 450px;
        padding-top: 2%;
        box-shadow: #f3f3f3 0px 1px 10px;
    }
    .logo{
        background: none;
        border: #eee 1px solid;
        box-shadow: #f3f3f3 0px 1px 10px;
    }
    .logo:hover{
        animation: logo-border 2s infinite;
    }
    .links-color{
        color: #606266;
        text-decoration: none;
    }
    .register:hover .links-color{
        color: #FF40A9;
    }
    @keyframes logo-border {
        0%{
            border: #eee 1px solid;
        }
        30%{
            border: #ff63b9 1px solid;
        }
        100%{
            border: #FF40A9 1px solid;
        }
    }
</style>