<template>
    <div>
        <div class="title">
            <span class="titleContent">添加公告信息</span>
            <el-breadcrumb separator-class="el-icon-arrow-right" class="breadcrumb">
                <el-breadcrumb-item>公告信息</el-breadcrumb-item>
                <el-breadcrumb-item>添加公告信息</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="mainContent">
            <el-form ref="addAnnouncementForm" :model="addAnnouncementForm" label-width="80px" label-position="top" class="spHeight">
                <el-form-item label="选择日期" prop="time">
                    <el-date-picker
                        v-model="addAnnouncementForm.time"
                        align="left"
                        type="date"
                        placeholder="选择日期"
                        :picker-options="pickerOptions" value-format="yyyy-MM-dd">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="内容" prop="announcementContent">
                    <el-input v-model="addAnnouncementForm.announcementContent" placeholder="请输入公告内容" type="textarea" :rows="4"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submitAnnouncementForm">立即发布</el-button>
                    <el-button @click="resetAnnouncementForm">重置</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>
<script>
import request from '../../../network/request';
export default {
    name: 'addAnnouncement',

    data() {
        return {
            pickerOptions: {
          disabledDate(time) {
            return time.getTime() > Date.now();
          },
          shortcuts: [{
            text: '今天',
            onClick(picker) {
              picker.$emit('pick', new Date());
            }
          }, {
            text: '昨天',
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24);
              picker.$emit('pick', date);
            }
          }, {
            text: '一周前',
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', date);
            }
          }]
        },
           addAnnouncementForm:{
               time:'',
               announcementContent:'众志成城战疫情 共克时艰守家园'
           },
        };
    },

    mounted() {
        
    },

    methods: {
    //发布公告，添加数据到数据库
    submitAnnouncementForm() {
            request({
                method:'post',
                url:'/announcement/addAnnouncement',
                data:this.addAnnouncementForm
            }).then(res => {
                console.log(res);
                if(res.data.status === 210){
                    this.$message.success("发布公告成功！")
                    this.$refs.addAnnouncementForm.resetFields();
                }else{
                    this.$message.error("发布公告失败！")
                }
            }).catch(err => {
                console.log(err)
            })
            console.log(this.addNewForm)
      },
      //重置表单
      resetAnnouncementForm() {
        this.$refs.addAnnouncementForm.resetFields();
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