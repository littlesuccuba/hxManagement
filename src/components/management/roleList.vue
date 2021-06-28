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
                <el-button type="primary" icon="el-icon-plus" @click="addRole">添加角色</el-button>
            </el-col>
        </el-row>
        <!-- 角色信息表 -->
        <el-row style="margin-top: 20px;">
            <el-col>
                <el-table :data="tableData.slice((currentPage-1)*pageSize,currentPage*pageSize)" border stripe>
                    <el-table-column prop="id" label="ID" align="center"></el-table-column>
                    <el-table-column prop="role" label="角色名" align="center"></el-table-column>
                    <el-table-column prop="group" label="所属用户组" align="center"></el-table-column>
                    <el-table-column prop="type" label="用户类型" align="center"></el-table-column>
                    <el-table-column label="操作" align="center">
                        <template slot-scope="scope">
                            <el-button type="info" size="mini" plain circle icon="el-icon-edit" @click="editInfo(scope.$index,scope.row)"></el-button>
                            <el-popconfirm confirm-button-text='确定' cancel-button-text='取消' icon="el-icon-warning-outline" icon-color="red" title="确定删除吗？" @confirm="removeRow(scope.$index,scope.row)" @cancel="cancelDelete">
                                <el-button slot="reference" type="danger" size="mini" plain circle icon="el-icon-delete"></el-button>
                            </el-popconfirm>
                        </template>
                    </el-table-column>
                </el-table>
                
            </el-col>
        </el-row>
        <!-- 分页器 -->
        <el-row :gutter="20" style="margin-top:20px;" type="flex" justify="center">
            <el-pagination background :current-page="currentPage" :page-size="pageSize" layout="total, prev, pager, next, jumper" :total="tableData.length"></el-pagination>
        </el-row>
        <!-- dialog对话框 -->
        <el-dialog :title="dialogTitle" :visible.sync="dialogFormVisible" center width="30%">
            <el-form :model="form" ref="form" :rules="rules">
                <el-row :gutter="20">
                    <el-col :span="12" :offset="0">
                        <el-form-item label="ID:">
                            <el-input v-model="form.id" disabled></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12" :offset="0">
                        <el-form-item label="角色名:" prop="role">
                            <el-input v-model="form.role"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="20">
                    <el-col :span="12" :offset="0">
                        <el-form-item label="所属用户组:" prop="group">
                            <!-- <el-input v-model="form.group"></el-input> -->
                            <el-select v-model="form.group" placeholder="请选择所属用户组">
                                <el-option v-for="item in group" :key="item.index" :label="item.label" :value="item.value"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12" :offset="0">
                        <el-form-item label="用户类型:" prop="type">
                            <el-input v-model="form.type" disabled></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="submitForm('form')">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
export default {
    name: 'roleList',
    data: ()=>{
        return {
            isEdit: false,
            dialogTitle: '',
            dialogFormVisible: false,
            currentPage: 1,
            pageSize: 8,
            tableData:[
                {
                    id: '1',
                    role: '管理员',
                    group: '管理员用户组',
                    type: '管理员用户'
                },
                {
                    id: '2',
                    role: '买家',
                    group: '买家用户组',
                    type: '普通用户'
                },
                {
                    id: '3',
                    role: '商家',
                    group: '商家用户组',
                    type: '普通用户'
                }
            ],
            form: {
                id: '',
                role: '',
                type: '',
                group: ''
            },
            group: [
                {
                    index:'1',
                    value:'管理员用户组',
                    label:'管理员用户组'
                },
                {
                    index:'2',
                    value:'买家用户组',
                    label:'买家用户组'
                },
                {
                    index:'3',
                    value:'商家用户组',
                    label:'商家用户组'
                },
            ],
            rules: {
                role: [
                    { required: true, message: '请输入用户名', trigger: 'blur' }
                ],
            }
        }
    },
    methods: {
        cancelDelete(){
            this.$message({
                type: 'info',
                message: '已取消删除'
            })
        },
        // 删除一行数据
        removeRow(index,row){
            this.tableData.splice(index,1)
            this.$message({
                type: 'success',
                message: '删除成功'
            })
        },
        // 编辑一行数据
        editInfo(index,row){
            this.form = row
            console.log(this.form)
            this.dialogTitle = '正在编辑角色："'+row.role+'"的信息'
            this.dialogFormVisible = true
            this.isEdit = true
        },
        addRole(){
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
                        this.dialogFormVisible = false
                        this.$message({
                            type: 'success',
                            message: '修改成功！'
                        })
                    }else{
                        this.dialogFormVisible = false
                        this.form.id = (this.tableData.length+1)+''
                        this.tableData.push(this.form)
                        this.$message({
                            type: 'success',
                            message: '添加成功！'
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

<style>

</style>