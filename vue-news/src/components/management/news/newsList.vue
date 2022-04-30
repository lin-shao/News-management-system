<template>
    <div>
        <div class="title">
                <span class="titleContent">新闻信息列表</span>
                <el-breadcrumb separator-class="el-icon-arrow-right" class="breadcrumb">
                    <el-breadcrumb-item>新闻信息</el-breadcrumb-item>
                    <el-breadcrumb-item>新闻信息列表</el-breadcrumb-item>
                </el-breadcrumb>
            </div>
            <el-dialog
                title="新闻详情"
                :visible.sync="dialogVisible"
                width="50%" append-to-body>
                <el-form label-width="80px" :model="editNewDetail">
                    <el-form-item label="标题">
                        <el-input v-model="editNewDetail.title"></el-input>
                    </el-form-item>
                    <el-form-item label="分类">
                        <el-input v-model="editNewDetail.classify"></el-input>
                    </el-form-item>
                    <el-form-item label="作者">
                        <el-input v-model="editNewDetail.author"></el-input>
                    </el-form-item>
                    <el-form-item label="发布时间">
                        <el-input v-model="editNewDetail.newsDate"></el-input>
                    </el-form-item>
                    <el-form-item label="内容">
                        <el-input v-model="editNewDetail.content" type="textarea" :rows="10" placeholder="请输入内容"></el-input>
                    </el-form-item>
                </el-form>
                <span slot="footer">
                    <el-button @click="dialogVisible = false">取 消</el-button>
                    <el-button type="primary" @click="updateNews">确 定</el-button>
                </span>
            </el-dialog>
            <div class="rightTable">
                <el-table
                    :data="tableData"
                    border class="table" stripe height="500">
                    <el-table-column
                    type="index"
                    label="序号"
                    width="80">
                    </el-table-column>
                    <el-table-column
                    prop="title"
                    label="标题">
                    </el-table-column>
                    <el-table-column
                    prop="classify"
                    label="分类"
                    width="180">
                    </el-table-column>
                    <el-table-column
                    prop="author"
                    label="作者"
                    width="120">
                    </el-table-column>
                    <el-table-column
                    prop="newsDate"
                    label="发布时间"
                    width="250">
                    </el-table-column>
                    <el-table-column
                    prop="operate"
                    label="操作"
                    width="150">
                    <template slot-scope="scope">
                        <el-tooltip class="item" effect="light" content="修改" placement="top">
                            <el-button type="primary" icon="el-icon-edit" size="mini" @click="editDetail(scope.row)"></el-button>
                        </el-tooltip>
                        <el-tooltip class="item" effect="light" content="删除" placement="top">
                            <el-button type="danger" icon="el-icon-delete" size="mini" @click="deleteNew(scope.row)"></el-button>
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
    name: 'newsList',

    data() {
        return {
            dialogVisible:false,
             tableData: [],
             editNewDetail:''
        };
    },

    mounted() {
           this.newsList()
    },

    methods: {
        newsList() {
            request({
                method:'post',
                url:'/news/showNews'
            }).then( res => {
                // console.log(res.data)
                this.tableData = res.data.map(item => {
                    return item;
                })
            }).catch( err => {
                console.log(err)
            })
        },
        //修改新闻内容弹窗
        editDetail(detail){
            this.dialogVisible = true;
            console.log(detail)
            this.editNewDetail = detail;
        },
        //修改新闻
        updateNews(){
             request({
                method:'post',
                url:`/news/updateNews`,
                data:this.editNewDetail
            }).then( res => {
                console.log(res)
                this.$message.success("修改成功！")
                this.newsList();
            }).catch( err => {
                this.$message.error("修改失败！")
                console.log(err)
            })
            this.dialogVisible = false;
        },
        //删除某一条新闻
        deleteNew(data){
            let newsId = data._id
            this.$confirm('此操作将永久该新闻, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                request({
                method:'delete',
                url:`/news/deleteNews/${newsId}`
            }).then( res => {
                console.log(res)
                this.$message.success("删除成功！")
                this.newsList();
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
</style>