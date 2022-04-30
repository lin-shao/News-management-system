<template>
    <div>
        <div class="title">
                <span>新闻分类</span>
                <span>新闻分类  /  分类信息表</span>
            </div>
            <el-dialog
                title="分类详情"
                :visible.sync="classifyDialogVisible"
                width="30%" append-to-body>
                <el-form label-width="80px" :model="editClassifyDetail">
                    
                    <el-form-item label="分类Id">
                        <el-input v-model="editClassifyDetail.classifyId"></el-input>
                    </el-form-item>
                    <el-form-item label="新闻分类">
                        <el-input v-model="editClassifyDetail.newsClassify" type="textarea" :rows="4" placeholder="请输入内容"></el-input>
                    </el-form-item>
                </el-form>
                <span slot="footer">
                    <el-button @click="classifyDialogVisible = false">取 消</el-button>
                    <el-button type="primary" @click="updateNewsClassify">确 定</el-button>
                </span>
            </el-dialog>
            <div class="rightTable">
                <el-table
                    :data="newsClassifyList"
                    border class="table" stripe>
                    <el-table-column
                    type="index"
                    label="序号"
                    width="180">
                    </el-table-column>
                    <el-table-column
                    prop="classifyId"
                    label="分类Id"
                    width="200">
                    </el-table-column>
                    <el-table-column
                    prop="newsClassify"
                    label="新闻分类">
                    </el-table-column>
                    <el-table-column
                    label="操作"
                    width="200">
                    <template slot-scope="scope">
                        <el-tooltip class="item" effect="light" content="修改" placement="top">
                            <el-button type="primary" icon="el-icon-edit" size="mini" @click="updateNewsClassifyContent(scope.row)"></el-button>
                        </el-tooltip>
                        <el-tooltip class="item" effect="light" content="删除" placement="top">
                            <el-button type="danger" icon="el-icon-delete" size="mini" @click="deleteNewsClassify(scope.row)"></el-button>
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
    name: 'Category',

    data() {
        return {
             newsClassifyList: [],//所有新闻分类数据
             editClassifyDetail:'',//修改公告对话框的数据
             classifyDialogVisible:false//控制对话框的显隐
        };
    },

    mounted() {
        this.showClassifyList();
    },

    methods: {
       //调用接口，获取所有公告数据
        showClassifyList() {
            request({
                method:'post',
                url:'/classify/showNewsClassify',
            }).then(res => {
                console.log(res)
                this.newsClassifyList = res.data.map(item => item) 
                }).catch(err => {
                this.$message.error("获取新闻分类失败！")
            })
      },
       //修改新闻内容弹窗
        updateNewsClassifyContent(detail){
            this.classifyDialogVisible = true;
            console.log(detail)
            this.editClassifyDetail = detail;
        },
        //修改公告
        updateNewsClassify(){
             request({
                method:'post',
                url:`/classify/updateNewsClassify`,
                data:this.editClassifyDetail
            }).then( res => {
                console.log(res)
                this.$message.success("修改成功！")
                this.showClassifyList();
            }).catch( err => {
                this.$message.error("修改失败！")
                console.log(err)
            })
            this.classifyDialogVisible = false;
        },
        //删除某一条新闻
        deleteNewsClassify(data){
            let id = data._id
            this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
                }).then(() => {
                request({
                        method:'delete',
                        url:`/classify/deleteNewsClassify/${id}`
                    }).then( res => {
                        console.log(res)
                        this.$message.success("删除成功！")
                        this.showClassifyList();
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
    .table {
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
        background-color: #fff;
        overflow: hidden;
    }
</style>