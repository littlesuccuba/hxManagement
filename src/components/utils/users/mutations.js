export default {
    Login(state, Authorization){
        state.token = Authorization.token
        state.username = Authorization.username
    },
    LogOut(state){
        state.token = null
        state.username = ''
        localStorage.clear('token')
        localStorage.clear('username')
        window.vue.$router.push('/login')
    }
}