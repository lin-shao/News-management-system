<template>
    <div>
        <div class="title">
            <span class="titleContent">添加新闻分类</span>
            <el-breadcrumb separator-class="el-icon-arrow-right" class="breadcrumb">
                <el-breadcrumb-item>添加新闻分类</el-breadcrumb-item>
                <el-breadcrumb-item>新闻分类</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="mainContent">
            <el-form ref="addClassifyForm" :model="addClassifyForm" label-width="80px" label-position="top" class="spHeight">
                <el-form-item label="分类ID" prop="classifyId">
                    <el-input v-model="addClassifyForm.classifyId" placeholder="请输入新闻分类Id"></el-input>
                </el-form-item>
                <el-form-item label="新闻分类" prop="classifyContent">
                    <el-input v-model="addClassifyForm.classifyContent" placeholder="请输入新闻分类" type="textarea" :rows="4"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submitClassifyForm">立即创建</el-button>
                    <el-button @click="resetClassifyForm">重置</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>
<script>
import request from '../../../network/request';
export default {
    name: 'addCategory',

    data() {
        return {
            
           addClassifyForm:{
               classifyId:'jsxw',
               classifyContent:'军事新闻'
           },
        };
    },

    mounted() {
        
    },

    methods: {
    //创建新闻分类，添加数据到数据库
    submitClassifyForm() {
            request({
                method:'post',
                url:'/classify/addNewsClassify',
                data:this.addClassifyForm
            }).then(res => {
                console.log(res);
                if(res.data.status === 2100){
                    this.$message.success("创建新闻分类成功！")
                    this.$refs.addClassifyForm.resetFields();
                }else{
                    this.$message.error("创建新闻分类失败！")
                }
            }).catch(err => {
                console.log(err)
            })
      },
      //重置表单
      resetClassifyForm() {
        this.$refs.addClassifyForm.resetFields();
      },
      
    },
};
</script>

<style scoped>
    .title {
        margin-top: 50px;
        width: 1400px;
        overflow: hidden;
    }
    .titleContent {
        color: #202b3d;
        font-size: 20px;
        font-weight: 800;
    }
    .title .breadcrumb {
        float: right;
        font-size: 15px;
    }
    .mainContent {
        width: 1400px;
        height: 800px;
        margin: 40px 0;
        padding: 20px 40px;
        background-color: #fff;
        overflow: hidden;
    }
    .spHeight>>>label {
        line-height: 16px;
    }
</style>