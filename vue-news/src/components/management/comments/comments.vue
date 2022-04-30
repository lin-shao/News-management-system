<template>
    <div>
        <div class="title">
                <span class="titleContent">评论信息</span>
                <el-breadcrumb separator-class="el-icon-arrow-right" class="breadcrumb">
                    <el-breadcrumb-item>评论信息</el-breadcrumb-item>
                    <el-breadcrumb-item>评论信息表</el-breadcrumb-item>
                </el-breadcrumb>
            </div>
            <div class="rightTable">
                <el-table
                    :data="allUserComments"
                    border class="table" stripe height="500">
                    <el-table-column
                    type="index"
                    label="序号"
                    width="80">
                    </el-table-column>
                    <el-table-column
                    prop="username"
                    label="用户名"
                    width="180">
                    </el-table-column>
                    <el-table-column
                    prop="articleTitle"
                    label="新闻标题">
                    </el-table-column>
                    <el-table-column
                    prop="comment"
                    label="评论内容">
                    </el-table-column>
                    <el-table-column
                    prop="commentDate"
                    label="创建时间"
                    width="200">
                    </el-table-column>
                    <el-table-column
                    prop="operate"
                    label="操作"
                    width="100">
                    <template slot-scope="scope">
                        <el-tooltip class="item" effect="light" content="删除" placement="top">
                            <el-button type="danger" icon="el-icon-delete" size="mini" @click="deleteComment(scope.row)"></el-button>
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
    name: 'Comment',

    data() {
        return {
             allUserComments: []
        };
    },

    mounted() {
           this.getAllComments()
    },

    methods: {
         //返回数据库所有评论
        getAllComments() {
            request({
                method:'post',
                url:'comment/showComment',
            }).then(res => {
                this.allUserComments = res.data.filter(item => item)
            }).catch(err => {
                console.log(err)
            })
        },
        deleteComment(data){
            let userId = data
            this.$confirm('此操作将永久删除该评论, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
                }).then(() => {
                request({
                        method:'delete',
                        url:`/comment/deleteComment/${userId._id}`
                    }).then( res => {
                        console.log(res)
                        this.$message.success("删除成功！")
                        this.getAllComments();
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