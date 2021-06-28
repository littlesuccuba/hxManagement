<template>
    <div>
        <el-row :gutter="20">
            <el-col :span="12" :offset="6">
                <el-form :model="form" ref="form" :rules="rules" label-position="top">
                    <el-row :gutter="20">
                        <el-col :span="12" :offset="0">
                            <el-form-item label="图片">
                                <!-- <el-input v-model="form.id" disabled></el-input> -->
                                <el-upload ref="upload" action="1111" :limit="2" :auto-upload="false" list-type="picture-card" :on-preview="handlePictureCardPreview" :on-remove="handleRemove" :before-upload="()=>{return false}">
                                    <i class="el-icon-plus"></i>
                                </el-upload>
                                <el-dialog :visible.sync="dialogVisible">
                                    <img width="100%" :src="dialogImageUrl" alt="">
                                </el-dialog>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12" :offset="0">
                            <el-form-item label="商品名称" prop="name">
                                <el-input v-model="form.name"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row :gutter="20">
                        <el-col :span="12" :offset="0">
                            <el-form-item label="商品类别" prop="type">
                                <el-select v-model="form.type" placeholder="请选择">
                                    <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.label"></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12" :offset="0">
                            <el-form-item label="单价" prop="price">
                                <el-input v-model="form.price"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row :gutter="20">
                        <el-col :span="12" :offset="0">
                            <el-form-item label="数量" prop="number">
                                <el-input v-model="form.number"></el-input>
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
                                <el-switch v-model="form.isPut"></el-switch>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12" :offset="0">
                            <el-form-item label="是否展示">
                                <el-switch v-model="form.isShow"></el-switch>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row type="flex" justify="center">
                        <el-form-item>
                            <el-button type="primary" @click="submitForm('form')">上 架</el-button>
                            <el-button @click="reset('form')">重 置</el-button>
                        </el-form-item>
                    </el-row>
                </el-form>
            </el-col>
        </el-row>
    </div>
</template>

<script>
import axiosConf from '@/components/utils/axiosConf'
export default {
    name: 'addgoods',
    data: ()=>{
        return {
            dialogVisible:false,
            dialogImageUrl:'',
            form: {
                goods_id:'',
                name:'',
                type:'',
                price:'',
                number:'',
                state:'',
                isPut:true,
                isShow:true,
            },
            // 验证规则
            rules:{
                goods_id:[
                    { required: true, message: '请输入商品编号', trigger: 'blur' },
                ],
                name:[
                    { required: true, message: '请输入商品名称', trigger: 'blur' },
                ],
                type:[
                    { required: true, message: '请选择商品类别', trigger: 'blur' },
                ],
                price:[
                    { required: true, message: '请输入商品价格', trigger: 'blur' },
                ],
                number:[
                    { required: true, message: '请输入商品数量', trigger: 'blur' },
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
    methods:{
        submitForm(form){
            this.$refs[form].validate((valid) => {
                if(valid){
                    // this.$refs.upload.submit();
                    // 表单验证通过，发起添加商品请求
                    let url = axiosConf.BASE_URL + 'goods/good/'
                    var data = {
                        goods_id:this.form.goods_id,
                        goods_name:this.form.name,
                        goods_type:this.form.type,
                        goods_price:this.form.price,
                        goods_num:this.form.number,
                        on_shelves:this.form.isPut,
                        is_show:this.form.isShow
                    }
                    this.$axios.post(url,data).then(res =>{
                        console.log(res.data)
                        this.$message({
                            type: 'success',
                            message: '上架成功！'
                        })
                    }).catch(err =>{
                        console.log(err)
                    })
                    
                }else{
                    this.$message.error('上架失败!请检查表单')
                }
                
            });
            
        },
        reset(form){
            this.$refs[form].resetFields()
            this.$refs.upload.clearFiles()
        },
        // 删除图片
        handleRemove(file, fileList) {
            console.log(file, fileList);
        },
        // 图片预览
        handlePictureCardPreview(file) {
            this.dialogImageUrl = file.url;
            this.dialogVisible = true;
        },
    }
}
</script>

<style>

</style>