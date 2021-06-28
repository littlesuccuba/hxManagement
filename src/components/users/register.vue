<template>
  <div>
      <el-row type="flex" justify="center" align="middle" style="margin-top: 8%;">
          <el-col :span="6">
                <div class="form-bg">
                    <!-- logo -->
                    <el-row>
                        <el-col>
                            <el-avatar class="logo" :size="100" src="/static/img/海星.png"></el-avatar>
                        </el-col>
                    </el-row>
                    <!-- 登陆表单 -->
                    <el-row type="flex" justify="center" style="margin-top: 4%;">
                        <el-col :span="16">
                            <el-form :model="form" :rules="rule" ref="reform" label-width="20px" :status-icon="true">
                                <el-form-item prop="name" label=" ">
                                    <el-input prefix-icon="el-icon-user-solid" v-model="form.name" placeholder="用户名"></el-input>
                                </el-form-item>
                                <el-form-item prop="password" label=" ">
                                    <el-input prefix-icon="el-icon-lock" v-model="form.password" placeholder="密码" show-password></el-input>
                                </el-form-item>
                                <el-form-item prop="phone" label=" ">
                                    <el-input prefix-icon="el-icon-phone" v-model="form.phone" placeholder="手机号"></el-input>
                                </el-form-item>
                                <el-form-item prop="code" label=" ">
                                    <el-row type="flex" align="middle" justify="space-between">
                                        <el-col :span="6">
                                            <el-button plain @click="getCode" :disabled="isGetCode">{{ getcode }}</el-button>
                                        </el-col>
                                        <el-col :span="14">
                                            <el-input prefix-icon="el-icon-key" v-model="form.code" placeholder="请输入验证码"></el-input>
                                        </el-col>
                                    </el-row>
                                </el-form-item>
                                <el-form-item>
                                    <el-row>
                                        <el-col>
                                            <el-button type="primary" style="width: 100%;" @click="submita('reform')">注册</el-button>
                                        </el-col>
                                    </el-row>
                                    <el-row style="margin-top:10px;">
                                        <el-col>
                                            <router-link class="links-color" to="/login">
                                                <el-button class="register" plain style="width: 100%;">去登陆</el-button>
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
import axiosConf from '@/components/utils/axiosConf'
export default {
    name:'register',
    data: ()=>{
        return {
            isGetCode:false,
            getcode:'获取验证码',
            // 表单数据
            form: {
                name: '',
                password: '',
                phone: '',
                code: ''
            },
            confirmSuccess: false,
            // 表单验证规则
            rule:{
                name:[
                    {required:true,message:'请输入用户名',trigger:'blur'},
                    {min:4,max:16,message:'用户名长度在4~16个字符',trigger:'blur'}
                ],
                password:[
                    {required:true,message:'请输入密码',trigger:'blur'},
                    {min:8,max:16,message:'密码长度在8~16个字符',trigger:'blur'}
                ],
                phone:[
                    {required:true,message:'请输入手机号',trigger:'blur'},
                    {min:11,max:11,message:'手机号长度在11个字符',trigger:'blur'}
                ],
                code:[
                    {required:true,message:'请输入验证码',trigger:'blur'}
                ]
            }
        }
    },
    methods: {
        submita(formName) {
            this.$refs[formName].validate((valid) => {
            if (valid) {
                // 向服务器请求注册
                let url = axiosConf.BASE_URL + 'users/register/'
                var data = {
                    username: this.form.name,
                    password: this.form.password,
                    phone:this.form.phone,
                    code:this.form.code
                }
                this.$axios.post(url,data).then(res =>{
                    let $this = this
                    this.$message({
                        type:'success',
                        message :'注册成功！3秒后前往登陆',
                        duration: 3000,
                        onClose:()=>{
                            console.log(this.$router,1)
                            $this.$router.push('/login')
                        }
                    });
                }).catch(err =>{
                    // console.log(err.config,err.request,err.response,err.isAxiosError,err.toJSON)
                    // for(let i in err){
                    //     console.log(err[i])
                    // }
                    let $this = this
                    var errFun = (msg)=>{
                        $this.$message.error(msg);
                    }
                    switch (err.response.status){
                        case 401:
                            errFun('用户未认证')
                            break
                        case 403:
                            errFun('验证码错误')
                            break
                    }
                    
                })
            } else {
                // console.log('error submit!!');
                this.$message.error('表单未填写完整，请继续填写表单');
                return false;
            }
            });
        },
        getCode(){
            if(this.form.phone!==''){
                this.isGetCode = !this.isGetCode
                var i = 60
                const $this = this
                var count = setInterval(function(){
                    $this.getcode = `${--i}秒可获取`
                    if(i===0){
                        $this.isGetCode = !$this.isGetCode
                        $this.getcode = '获取验证码'
                        clearInterval(count)
                    }
                },1000)
                let url = axiosConf.BASE_URL + `users/getcode/?phone=${this.form.phone}`
                this.$axios.get(url).then(res =>{
                    if(res.data == '发送成功'){
                        // 19127757869
                        this.$message({
                            type:'success',
                            message:res.data
                        })
                    }else if(res.data == '发送失败'){
                        this.$message.error(res.data)
                    }
                }).catch(err =>{
                    console.log(err)
                    this.$message.error(err)
                })
            }else{
                this.$message.error('手机号不能为空！')
            }
        },
        
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
        height: 500px;
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