<template>
    <div>
        <!-- 搜索框 -->
        <el-row :gutter="20">
            <el-col :span="8">
                <el-input placeholder="请输入搜索内容" v-model="searchInfo">
                    <el-select v-model="searchField" slot="prepend" placeholder="用户名" style="width:100px;">
                        <el-option label="订单号" value="order_id"></el-option>
                        <el-option label="商品类别" value="goods_type"></el-option>
                        <el-option label="用户名" value="username"></el-option>
                        <el-option label="手机号" value="phone"></el-option>
                        <el-option label="状态" value="state"></el-option>
                    </el-select>
                    <el-button slot="append" icon="el-icon-search" @click="searchOrder"></el-button>
                </el-input>
            </el-col>
        </el-row>
        <el-row style="margin-top: 20px;">
            <el-col>
                <el-table v-loading="loading" :data="tableData.slice((currentPage-1)*pageSize,currentPage*pageSize)" stripe>
                    <el-table-column prop="id" label="订单id" align="center" width="100"></el-table-column>
                    <el-table-column prop="order_id" label="订单号" align="center" width="260"></el-table-column>
                    <el-table-column prop="goods_type" label="商品类别" align="center" width="120"></el-table-column>
                    <el-table-column prop="goods_price" label="单价" align="center" width="100">
                        <template slot-scope="scope">
                            <i class="iconfont icon-rmb"></i>
                            <span>{{scope.row.goods_price}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="quantity" label="购买数量" align="center" width="80"></el-table-column>
                    <el-table-column prop="user" label="购买用户" align="center" width="160"></el-table-column>
                    <el-table-column prop="phone" label="联系电话" align="center" width="160"></el-table-column>
                    <el-table-column prop="address" label="地址" align="center">    
                    </el-table-column>
                    <el-table-column prop="state" label="状态" align="center" width="160">
                        <template slot-scope="scope">
                            <el-select v-model="scope.row.state" placeholder="请选择" @change="updateStatus(scope.row)">
                                <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.label"></el-option>
                            </el-select>
                        </template>
                    </el-table-column>
                    <el-table-column label="操作" align="center" width="60">
                        <template slot-scope="scope">
                            <!-- <el-button type="info" size="mini" plain circle icon="el-icon-edit" @click="editInfo(scope.$index,scope.row)"></el-button> -->
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
    </div>
</template>

<script>
import axiosConf from '@/components/utils/axiosConf'
export default {
    name: 'orderInfo',
    data: ()=>{
        return {
            searchInfo:'',
            searchField:'order_id',
            loading:true,
            pageSize: 8,
            currentPage:1,
            tableData:[
                {
                    id:'1',
                    order_id:'xyjxx0066611',
                    goods_type:'电器',
                    goods_price:'999',
                    quantity:'1',
                    state:'已发货',
                    user:'小魔女',
                    phone:'13977726785',
                    address:'广西钦州市钦南区··············'
                }
            ],
            options:[
                {
                    value:'1',
                    label:'未付款'
                },
                {
                    value:'2',
                    label:'未发货'
                },
                {
                    value:'3',
                    label:'已发货'
                },
                {
                    value:'4',
                    label:'已签收'
                },
            ]
        }
    },
    mounted(){
        this.getData()
    },
    methods:{
        getData(){
            let url = `${axiosConf.BASE_URL}orders/order/`
            this.$axios.get(url).then(res =>{
                // console.log(res.data)
                this.loading = !this.loading
                this.tableData = res.data
            }).catch(err =>{
                console.log(err)
            })
        },
        searchOrder(){
            let url = axiosConf.BASE_URL + `orders/order/?${this.searchField}=${this.searchInfo}`
            this.$axios.get(url).then(res =>{
                // console.log(typeof res.data)
                this.$message({
                    type:'success',
                    message:`搜索到${res.data.length}条数据`
                })
                this.tableData = res.data
            }).catch(err =>{
                // console.log(err)
                this.message.error('搜索失败！')
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
            let url = axiosConf.BASE_URL + `orders/order/${row.id}/`
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
        updateStatus(row){
            let url = `${axiosConf.BASE_URL}orders/order/${row.id}/`
            this.$axios.patch(url,{state:row.state}).then(res =>{
                this.$message({
                    type: 'success',
                    message: '修改成功！'
                })
            }).catch(err =>{
                this.$message.error('修改失败!')
            })
        }
        // // 编辑一行数据
        // editInfo(index,row){
        //     this.form = row
        //     console.log(this.form)
        //     this.dialogTitle = '正在编辑角色："'+row.role+'"的信息'
        //     this.dialogFormVisible = true
        //     this.isEdit = true
        // },
    }
}
</script>

<style>

</style>