<template>
    <div>
        <div class="title">
                <span>公告信息</span>
                <span>会员信息  /  会员信息表</span>
            </div>
            <el-dialog
                title="公告详情"
                :visible.sync="announceDialogVisible"
                width="30%" append-to-body>
                <el-form label-width="80px" :model="editAnnouncementDetail">
                    
                    <el-form-item label="内容">
                        <el-input v-model="editAnnouncementDetail.announcementContent" type="textarea" :rows="4" placeholder="请输入内容"></el-input>
                    </el-form-item>
                    <el-form-item label="发布时间">
                        <el-input v-model="editAnnouncementDetail.time"></el-input>
                    </el-form-item>
                </el-form>
                <span slot="footer">
                    <el-button @click="announceDialogVisible = false">取 消</el-button>
                    <el-button type="primary" @click="updateAnnouncement">确 定</el-button>
                </span>
            </el-dialog>
            <div class="rightTable">
                <el-table
                    :data="announcementContentList"
                    border class="table" height="500" stripe>
                    <el-table-column
                    type="index"
                    label="序号"
                    width="180">
                    </el-table-column>
                    <el-table-column
                    prop="announcementContent"
                    label="公告内容">
                    </el-table-column>
                    <el-table-column
                    prop="time"
                    label="发布时间"
                    width="200">
                    </el-table-column>
                    <el-table-column
                    label="操作"
                    width="160">
                    <template slot-scope="scope">
                        <el-tooltip class="item" effect="light" content="修改" placement="top">
                            <el-button type="primary" icon="el-icon-edit" size="mini" @click="updateAnnouncementContent(scope.row)"></el-button>
                        </el-tooltip>
                        <el-tooltip class="item" effect="light" content="删除" placement="top">
                            <el-button type="danger" icon="el-icon-delete" size="mini" @click="deleteAnnouncement(scope.row)"></el-button>
                        </el-tooltip>
                    </template>
                    </el-table-column>
                </el-table>
            </div>
    </div>
</template>

<script>
import request from '../../../network/request'
export default {
    name: 'User',

    data() {
        return {
             announcementContentList: [],//所有公告列表数据
             editAnnouncementDetail:'',//修改公告对话框的数据
             announceDialogVisible:false//控制对话框的显隐
        };
    },

    mounted() {
        this.showAnnouncementsList();
    },

    methods: {
       //调用接口，获取所有公告数据
        showAnnouncementsList() {
            request({
                method:'post',
                url:'/announcement/showAnnouncement',
            }).then(res => {
                console.log(res)
                this.announcementContentList = res.data.map(item => item)
                }).catch(err => {
                this.$message.error("获取公告失败！")
            })
      },
       //修改新闻内容弹窗
        updateAnnouncementContent(detail){
            this.announceDialogVisible = true;
            console.log(detail)
            this.editAnnouncementDetail = detail;
        },
        //修改公告
        updateAnnouncement(){
             request({
                method:'post',
                url:`/announcement/updateAnnouncement`,
                data:this.editAnnouncementDetail
            }).then( res => {
                console.log(res)
                this.$message.success("修改成功！")
                this.showAnnouncementsList();
            }).catch( err => {
                this.$message.error("修改失败！")
                console.log(err)
            })
            this.announceDialogVisible = false;
        },
        //删除某一条公告
        deleteAnnouncement(data){
            let announceId = data._id
            this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
                }).then(() => {
                request({
                    method:'delete',
                    url:`/announcement/deleteAnnouncement/${announceId}`
                }).then( res => {
                    console.log(res)
                    this.$message.success("删除成功！")
                    this.showAnnouncementsList();
                }).catch( err => {
                    console.log(err)
                })
                }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });          
            });
        }
    },
};
</script>

<style scoped>
    .rightTable .table {
        width: 100%;
    }
    .title {
        margin-top: 50px;
        width: 1400px;
        overflow: hidden;
    }
    .title span:nth-child(1) {
        color: #202b3d;
        font-size: 18px;
        font-weight: 800;
    }
    .title span:nth-child(2) {
        color: #202b3d;
        float: right;
    }
    
    .rightTable {
        padding: 50px;
        width: 1400px;
        margin: 40px 0;
        overflow: hidden;
        background-color: #fff;
    }
</style>