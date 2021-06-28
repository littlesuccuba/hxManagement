<template>
    <div>
        <!-- 搜索框 -->
        <el-row :gutter="20">
            <el-col :span="6">
                <el-input placeholder="请输入搜索内容">
                    <el-button slot="append" icon="el-icon-search"></el-button>
                </el-input>
            </el-col>
            <el-col :span="18">
                <el-button type="primary" icon="el-icon-plus" @click="addUser">添加用户</el-button>
            </el-col>
        </el-row>
        <!-- 用户信息表 -->
        <el-row style="margin-top: 20px;">
            <el-col>
                <el-table v-loading="loading" :data="tableData.slice((currentPage-1)*pageSize,currentPage*pageSize)" border stripe>
                    <el-table-column prop="id" label="ID" align="center"></el-table-column>
                    <el-table-column prop="username" label="用户名" align="center"></el-table-column>
                    <el-table-column prop="phone" label="手机号" align="center"></el-table-column>
                    <!-- <el-table-column prop="sex" label="性别" align="center"></el-table-column> -->
                    <el-table-column prop="password" label="密码" align="center">
                        <template slot-scope="scope">
                            <el-input show-password disabled v-model="scope.row.password"></el-input>
                        </template>
                    </el-table-column>
                    <el-table-column prop="email" label="邮箱" align="center"></el-table-column>
                    <el-table-column label="是否允许登陆" align="center">
                        <template slot-scope="scope">
                            <el-switch active-icon-class="el-icon-success" inactive-icon-class="el-icon-error" v-model="scope.row.is_active" @change="changeActive(scope.row)"></el-switch>
                        </template>
                    </el-table-column>
                    <el-table-column label="操作" align="center">
                        <template slot-scope="scope">
                            <el-button type="info" size="mini" plain circle icon="el-icon-edit" @click="editInfo(scope.row)"></el-button>
                            <!-- <el-button type="danger" size="mini" plain circle icon="el-icon-delete" @click="removeRow(scope.$index,scope.row)"></el-button> -->
                            <el-popconfirm confirm-button-text='确定' cancel-button-text='取消' icon="el-icon-warning-outline" icon-color="red" title="确定删除吗？" @confirm="removeRow(scope.$index,scope.row)">
                                <el-button slot="reference" type="danger" size="mini" circle icon="el-icon-delete"></el-button>
                            </el-popconfirm>
                        </template>
                    </el-table-column>
                </el-table>
            </el-col>
        </el-row>
        <el-row :gutter="20" style="margin-top:20px;" type="flex" justify="center">
            <el-pagination background :current-page="currentPage" :page-size="pageSize" layout="total, prev, pager, next, jumper" :total="tableData.length"></el-pagination>
        </el-row>
        <!-- dialog对话框 -->
        <el-dialog :title="dialogTitle" :visible.sync="dialogFormVisible" width="30%" center>
            <el-form :model="form" ref="form" :rules="rules">
                <el-row :gutter="20">
                    <el-col :span="12" :offset="0">
                        <el-form-item label="ID:">
                            <el-input v-model="form.id" disabled></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12" :offset="0">
                        <el-form-item label="用户名:" prop="username">
                            <el-input v-model="form.username"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="20">
                    <el-col :span="12" :offset="0">
                        <el-form-item label="手机号:" prop="phone">
                            <el-input v-model="form.phone"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12" :offset="0">
                        <el-form-item label="密码:" prop="password">
                            <el-input v-model="form.password" show-password></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="20">
                    <el-col :span="12" :offset="0">
                        <el-form-item label="邮箱:" prop="email">
                            <el-input v-model="form.email"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12" :offset="0">
                        <el-form-item label="是否允许登陆:">
                            <el-switch active-icon-class="el-icon-success" inactive-icon-class="el-icon-error" v-model="form.is_active"></el-switch>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="submitForm('form')">确 定</el-button>
                <el-button @click="dialogFormVisible = false">取 消</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import axiosConf from '@/components/utils/axiosConf'
export default {
    name: 'userList',
    data: ()=>{
        return {
            loading:true,
            isEdit: false,
            dialogTitle: '',
            dialogFormVisible: false,
            currentPage: 1,
            pageSize: 8,
            tableData:[
                {
                    id: '1',
                    username: 'succuba',
                    phone: '13977726785',
                    sex:'',
                    is_active: true,
                    email: '1394756803@qq.com'
                },
                {
                    id: '2',
                    username: 'succuba1',
                    phone: '13977726785',
                    sex:'',
                    is_active: false,
                    email: '1394756803@qq.com'
                }
            ],
            form: {
                id: '',
                username: '',
                phone: '',
                sex:'',
                is_active: false,
                email: ''
            },
            rules: {
                username: [
                    { required: true, message: '请输入用户名', trigger: 'blur' },
                    { min: 4, max: 16, message: '长度在 4 到 16 个字符', trigger: 'blur' }
                ],
                password:[
                    {required: true, message: '请输入密码', trigger: 'blur'},
                    {min: 8,message: '密码至少需要8个字符', trigger: 'blur'}
                ],
                phone: [
                    { required: true, message: '请输入手机号', trigger: 'blur' },
                    {pattern: /^[1][3,4,5,7,8][0-9]{9}$/,message:'手机号不合法'},
                ],
                email: [
                    { required: false, message: '请输入邮箱', trigger: 'blur' },
                    {pattern: /^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,5}$/,message:'邮箱不合法'},
                ],
            }
        }
    },
    mounted(){
        // 组件加载时调用获取用户数据
        this.getAllUsers()
    },
    methods: {
        // 获取用户数据
        getAllUsers(){
            let url = axiosConf.BASE_URL + 'users/user/'
            this.$axios.get(url).then(res =>{
                // console.log(res.data)
                this.tableData = res.data.results
                this.loading = !this.loading
            }).catch(err =>{
                console.log(err)
            })
        },
        // 删除一行数据
        removeRow(index,row){
            // console.log(index,row,row.id)
            let url = axiosConf.BASE_URL + `users/user/${row.id}/`
            console.log(url)
            this.$axios.delete(url).then(res =>{
                this.tableData.splice(index,1)
                this.$message({
                    type: 'success',
                    message: '删除成功！'
                })
            }).catch(err =>{
                this.$message.error('删除失败!')
            })
        },
        // 编辑一行数据
        editInfo(row){
            this.form = row
            this.dialogTitle = '正在编辑用户：'+row.username+'的信息'
            this.dialogFormVisible = true
            this.isEdit = true
        },
        // 修改是否允许登陆状态
        changeActive(row){
            let url = axiosConf.BASE_URL + `users/user/${row.id}/`
            this.$axios.patch(url,{is_active:row.is_active}).then(res =>{
                this.$message({
                    type: 'success',
                    message: '修改成功！'
                })
            }).catch(err =>{
                this.$message.error('修改失败!')
            })
        },
        addUser(){
            this.dialogTitle = '添加用户'
            this.dialogFormVisible = true
            this.form = {}
            this.isEdit = false
        },
        // 提交表单
        submitForm(form){
            this.$refs[form].validate((valid) => {
                if (valid) {
                    if(this.isEdit){
                        // 修改用户信息
                        let url = axiosConf.BASE_URL + `users/user/${this.form.id}/`
                        this.$axios.patch(url,this.form).then(res =>{
                            this.$axios.get(axiosConf.BASE_URL+'users/user/').then(res =>{
                                this.tableData = res.data.results
                            }).catch(err =>{
                                
                            })
                            this.dialogFormVisible = false
                            this.$message({
                                type: 'success',
                                message: '修改成功！'
                            })
                        }).catch(err =>{
                            this.$message.error('修改失败!')
                        })
                        
                    }else{
                        // 添加用户
                        let url = axiosConf.BASE_URL + 'users/user/'
                        console.log(this.form)
                        this.$axios.post(url,this.form).then(res =>{
                            // console.log(res.data)
                            this.tableData.push(res.data)
                            this.dialogFormVisible = false
                            this.$message({
                                type: 'success',
                                message: '添加成功！'
                            })
                        }).catch(err =>{
                            this.$message.error('添加失败!')
                        })
                        
                    }
                } else {
                    if(this.isEdit){
                        this.$message.error('修改失败!')
                    }else {
                        this.$message.error('添加失败!')
                    }
                    return false;
                }
            });
            
        }
    }
}
</script>

<style scoped>
    .pagenation{
        display: flex;
        justify-items: center;
    }
</style>