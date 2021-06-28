<template>
    <div>
        <!-- 搜索框 -->
        <el-row :gutter="20">
            <el-col :span="8">
                <el-input placeholder="请输入搜索的商品名称">
                    <el-button slot="append" icon="el-icon-search"></el-button>
                </el-input>
            </el-col>
        </el-row>
        <el-row style="margin-top: 20px;">
            <el-col>
                <el-table v-loading="loading" :data="tableData.slice((currentPage-1)*pageSize,currentPage*pageSize)" stripe>
                    <el-table-column prop="g_id" label="ID" align="center"></el-table-column>
                    <el-table-column prop="goods_id" label="商品编号" align="center"></el-table-column>
                    <el-table-column prop="goods_name" label="商品名称" align="center"></el-table-column>
                    <el-table-column prop="goods_type" label="商品类别" align="center"></el-table-column>
                    <el-table-column prop="goods_price" label="单价" align="center">
                        <template slot-scope="scope">
                            <i class="iconfont icon-rmb"></i>
                            <span>{{scope.row.goods_price}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="goods_num" label="数量" align="center"></el-table-column>
                    <el-table-column prop="goods_state" label="状态" align="center"></el-table-column>
                    <el-table-column prop="on_shelves" label="是否上架" align="center">
                        <template slot-scope="scope">
                            <el-switch v-model="scope.row.on_shelves" @change="changeState(scope.row,'on_shelves')"></el-switch>
                        </template>
                    </el-table-column>
                    <el-table-column prop="is_show" label="是否展示" align="center">
                        <template slot-scope="scope">
                            <el-switch v-model="scope.row.is_show" @change="changeState(scope.row,'is_show')"></el-switch>
                        </template>
                    </el-table-column>
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
        <el-dialog :title="dialogTitle" :visible.sync="dialogFormVisible" width="30%" center>
            <el-form :model="form" ref="form" :rules="rules">
                <el-row :gutter="20">
                    <el-col :span="12" :offset="0">
                        <el-form-item label="ID">
                            <el-input v-model="form.g_id" disabled></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12" :offset="0">
                        <el-form-item label="商品名称" prop="goods_name">
                            <el-input v-model="form.goods_name"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="20">
                    <el-col :span="12" :offset="0">
                        <el-form-item label="商品类别" prop="goods_type">
                            <!-- <el-input v-model="form.type"></el-input> -->
                            <el-select v-model="form.goods_type" placeholder="请选择">
                                <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.label"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12" :offset="0">
                        <el-form-item label="单价" prop="goods_price">
                            <el-input v-model="form.goods_price"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="20">
                    <el-col :span="12" :offset="0">
                        <el-form-item label="数量" prop="goods_num">
                            <el-input v-model="form.goods_num"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12" :offset="0">
                        <el-form-item label="商品编号" prop="goods_id">
                            <el-input v-model="form.goods_id"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="20">
                    <el-col :span="12" :offset="0">
                        <el-form-item label="是否上架">
                            <el-switch v-model="form.on_shelves"></el-switch>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12" :offset="0">
                        <el-form-item label="是否展示">
                            <el-switch v-model="form.is_show"></el-switch>
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
    name: 'goodsquery',
    data: ()=>{
        return {
            loading:true,
            pageSize: 8,
            currentPage:1,
            tableData:[
                {
                    g_id:'',
                    goods_id:'',
                    goods_name:'',
                    goods_type:'',
                    goods_price:'',
                    goods_num:'',
                    goods_state:'',
                    on_shelves:false,
                    is_show:false,
                }
            ],
            dialogFormVisible:false,
            dialogTitle:'',
            form: {
                g_id:'',
                goods_id:'',
                goods_name:'',
                goods_type:'',
                goods_price:'',
                goods_num:'',
                goods_state:'',
                on_shelves:false,
                is_show:false,
            },
            // 验证规则
            rules:{
                goods_name:[
                    { required: true, message: '请输入商品名称', trigger: 'blur' },
                ],
                goods_type:[
                    { required: true, message: '请输入商品名称', trigger: 'blur' },
                ],
                goods_price:[
                    { required: true, message: '请输入商品名称', trigger: 'blur' },
                ],
                goods_num:[
                    { required: true, message: '请输入商品名称', trigger: 'blur' },
                ],
            },
            options:[
                {
                    value:'1',
                    label:'电器'
                },
                {
                    value:'2',
                    label:'食品'
                },
                {
                    value:'3',
                    label:'生活用品'
                },
                {
                    value:'4',
                    label:'电子产品'
                },
            ]
        }
    },
    mounted(){
        this.getData()
    },
    methods:{
        changeState(row,item){
            let url = axiosConf.BASE_URL + `goods/good/${row.g_id}/`
            var data = {}
            if(item=='on_shelves'){
                data={on_shelves:row[item]}
            }else if(item == 'is_show'){
                data={on_shelves:row[item]}
            }
            this.$axios.patch(url,data).then(res =>{
                // console.log(res.data)
                this.dialogFormVisible = false
                this.$message({
                    type: 'success',
                    message: '修改成功！'
                })
            }).catch(err =>{
                // console.log(err)
                this.$message.error('修改失败!')
            })
        },
        getData(){
            let url = axiosConf.BASE_URL + 'goods/good/'
            this.$axios.get(url).then(res =>{
                this.tableData = res.data.results
                this.loading = !this.loading
            }).catch(err =>{
                console.log(err)
            })
        },
        cancelDelete(){
            this.$message({
                type: 'info',
                message: '已取消删除'
            })
        },
        // 删除一行数据
        removeRow(index,row){
            let url = axiosConf.BASE_URL + `goods/good/${row.g_id}/`
            this.$axios.delete(url).then(res =>{
                this.$message({
                    type: 'success',
                    message: '删除成功'
                })
                this.tableData.splice(index,1)
            }).catch(err =>{
                console.log(err)
                this.$message.error('删除失败！')
            })
        },
        // 编辑一行数据
        editInfo(index,row){
            this.form = row
            // console.log(this.form)
            this.dialogTitle = '正在编辑商品："'+row.goods_name+'"的信息'
            this.dialogFormVisible = true
            this.isEdit = true
        },
        submitForm(form){
            this.$refs[form].validate((valid) => {
                if (valid) {
                    if(this.isEdit){
                        let url = axiosConf.BASE_URL + `goods/good/${this.form.g_id}/`
                        this.$axios.patch(url,this.form).then(res =>{
                            console.log(res.data)
                            this.dialogFormVisible = false
                            this.$message({
                                type: 'success',
                                message: '修改成功！'
                            })
                        }).catch(err =>{
                            console.log(err)
                            this.$message.error('修改失败!')
                        })
                    }
                    // }else{
                    //     this.dialogFormVisible = false
                    //     this.form.id = (this.tableData.length+1)+''
                    //     this.tableData.push(this.form)
                    //     this.$message({
                    //         type: 'success',
                    //         message: '添加成功！'
                    //     })
                    // }
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