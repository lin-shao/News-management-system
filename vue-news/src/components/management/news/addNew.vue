<template>
    <div>
        <div class="title">
            <span class="titleContent">添加新闻信息</span>
            <el-breadcrumb separator-class="el-icon-arrow-right" class="breadcrumb">
                <el-breadcrumb-item>新闻信息</el-breadcrumb-item>
                <el-breadcrumb-item>添加新闻信息</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="mainContent">
            <el-form ref="addNewForm" :model="addNewForm" :rules="rules" label-width="80px" label-position="top" class="spHeight">
                <el-form-item label="标题" prop="title">
                    <el-input v-model="addNewForm.title" placeholder="请输入标题"></el-input>
                </el-form-item>
                    <el-form-item label="分类" prop="classify" class="classify">
                        <el-select v-model="addNewForm.classify" placeholder="请选择新闻分类">
                        <el-option
                            v-for="item in newClassify"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                        </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="作者" prop="author" class="author">
                        <el-input v-model="addNewForm.author" placeholder="请输入作者名"></el-input>
                    </el-form-item>
                <el-form-item label="新闻内容" prop="content" class="newsContent">
                    <!-- <el-input type="textarea" rows="18" v-model="addNewForm.content"></el-input> -->
                    <editor id="editor_id" height="350px" width="1000px" :content.sync="addNewForm.content"
                            :afterChange="afterChange()"
                            pluginsPath="../../../static/kindeditor/plugins/"
                            :loadStyleMode="false"
                            @on-content-change="onContentChange"></editor>
                    <!-- <div> editorTextCopy: {{ addNewForm.editorText }} </div> -->
                </el-form-item>
                <el-form-item label="图片上传" class="imgUpload">
                    <el-upload
                        action="http://localhost:3000/imgUpload/upload/"
                        list-type="picture-card"
                        :on-success="handleAvatarSuccess"
                        :show-file-list="false"
                        :before-upload="beforeAvatarUpload"
                        name="img"           
                        :headers="headers">
                        <!-- 如果上传成功，后端会传来一个路径，将这个路径动态绑定，便可以显示你上传的图片 -->
                        <img v-if="imageUrl" :src="imageUrl" class="avatar">
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submitNewsForm">立即发布</el-button>
                    <el-button @click="resetNewsForm">重置</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>
<script>
import request from '../../../network/request';
export default {
    name: 'addNew',

    data() {
        return {
           newClassify:[
               {
                   label:'国内新闻',
                   value:'国内新闻'
               },
               {
                   label:'国际新闻',
                   value:'国际新闻'
               },
               {
                   label:'教育新闻',
                   value:'教育新闻'
               },
               {
                   label:'体育新闻',
                   value:'体育新闻'
               },
               {
                   label:'娱乐新闻',
                   value:'娱乐新闻'
               },
           ],
           addNewForm:{
               title:'第三艘航母要来了 海军主题宣传片文末"彩蛋"有深意',
               classify:'',
               author:'小林',
               imgUrl:'',
               content:''
           },
           rules: {
          title: [
            { required: true, message: '请输入标题', trigger: 'blur' }
          ],
          classify: [
            { required: true, message: '请选择新闻分类', trigger: 'change' }
          ],
          author: [
            { required: true, message: '请输入作者名', trigger: 'blur' }
          ]
        },
      editorTextCopy: '', // content-change 事件回掉改变的对象
      imageUrl:'',
      headers:{ enctype: "multipart/form-data"}
        };
    },

    mounted() {
        
    },

    methods: {
         onContentChange (val) {
      this.editorTextCopy = val;
    },
    afterChange () {
    },
    //发布新闻，添加数据到数据库
    submitNewsForm() {
        this.$refs.addNewForm.validate((valid) => {
          if (valid) {
            request({
                method:'post',
                url:'/news/addNews',
                data:this.addNewForm
            }).then(res => {
                console.log(res);
                if(res.data.status === 1000){
                    this.$message.success("发布新闻成功！")
                    this.$refs.addNewForm.resetFields();
                }else{
                    this.$message.error("发布新闻失败！")
                }
            })
            console.log(this.addNewForm)
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      //重置表单
      resetNewsForm() {
        this.$refs.addNewForm.resetFields();
        this.addNewForm.editorText = ''
      },
       handleAvatarSuccess(res) {
      //res这个参数自己打印出来一看便知，在此不做解释     
      console.log(res);
      console.log(res.data.path)
     //将后端发送的地址赋值到我们需要显示的img中的src动态绑定的参数中
      this.imageUrl = res.data.path;
	 //将图片地址绑定到我们的form表单数据中 后期存入数据库中     
      this.addNewForm.imgUrl = res.data.path;
    },
    beforeAvatarUpload(file) {
        //  const isJPG = file.type === "image/jpeg";
        //    const isPNG = file.type === "image/png";
        //    const isLt3M = file.size / 1024 / 1024 / 1024 < 3;
        //    if (!isJPG && !isPNG) {
        //      this.$message.error("上传头像图片只能是 JPG 格式或 png 格式!");
        //    }
        //    if (!isLt3M) {
        //      this.$message.error("上传头像图片大小不能超过 3MB!");
        //    }
        //    return isJPG && isLt3M;
    }
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
    
    .rightTable {
        padding: 50px;
        width: 1400px;
        height: 500px;
        margin: 40px 0;
        background-color: #fff;
        overflow: hidden;
    }
    .mainContent {
        width: 1400px;
        height: 800px;
        margin: 40px 0;
        padding: 20px 40px;
        background-color: #fff;
        overflow: hidden;
    }
    .classify {
        float: left;
        margin-right: 100px;
    }
    .newsContent {
        float: left;
        margin-right: 150px;
    }
    .spHeight>>>label {
        line-height: 16px;
    }
     .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  /* .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  } */
  .avatar {
    width: 100%;
    height: 100%;
    display: block;
  }
    .author {
        width: 200px;
    }
    .imgUpload {
        margin: 100px 0 0 100px;
    }
</style>