import axios from 'axios'
import { Message } from 'element-ui'
export default {
    LoginAsync({state, commit}, {url, form}){
        let baseUrl='http://127.0.0.1:8000/'
        axios.post(baseUrl+url, form).then(res=>{
            let Authorization = {
                token:  `jwt ${res.data.token}`,
                username: res.data.username
            }
            commit('Login', Authorization)
            Message({
                type: 'success',
                message: `登陆成功！欢迎：${res.data.username}`
            })
            localStorage.setItem('username',res.data.username)
            localStorage.setItem('token',Authorization.token)
            window.vue.$router.push('/home')
        }).catch(err=>{
            Message.error('登陆失败！请检查用户名或密码')
        })
    }
}