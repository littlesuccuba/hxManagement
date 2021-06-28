<template>
    <div>
        <!-- 搜索框 -->
        <el-row :gutter="20">
            <el-col :span="8">
                <el-input placeholder="请输入搜索的订单号">
                    <el-button slot="append" icon="el-icon-search"></el-button>
                </el-input>
            </el-col>
        </el-row>
        <el-row style="margin-top: 20px;">
            <el-col>
                <el-table :data="tableData.slice((currentPage-1)*pageSize,currentPage*pageSize)" stripe>
                    <el-table-column prop="id" label="订单id" align="center" width="100"></el-table-column>
                    <el-table-column prop="orderNum" label="订单号" align="center" width="260"></el-table-column>
                    <el-table-column prop="type" label="商品类别" align="center" width="120"></el-table-column>
                    <el-table-column prop="price" label="单价" align="center" width="100">
                        <template slot-scope="scope">
                            <i class="iconfont icon-rmb"></i>
                            <span>{{scope.row.price}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="number" label="购买数量" align="center" width="80"></el-table-column>
                    <el-table-column prop="username" label="购买用户" align="center" width="160"></el-table-column>
                    <el-table-column prop="phone" label="联系电话" align="center" width="160"></el-table-column>
                    <el-table-column prop="address" label="地址" align="center">
                        
                    </el-table-column>
                    <el-table-column prop="status" label="状态" align="center" width="160">
                        <template slot-scope="scope">
                            <el-select v-model="scope.row.status" placeholder="请选择" @change="updateStatus(scope.row)">
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
export default {
    name: 'orderInfo',
    data: ()=>{
        return {
            pageSize: 8,
            currentPage:1,
            tableData:[
                {
                    id:'1',
                    orderNum:'xyjxx0066611',
                    type:'电器',
                    price:'999',
                    number:'1',
                    status:'已发货',
                    username:'小魔女',
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
    methods:{
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
        updateStatus(row){
            console.log(row.status)
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