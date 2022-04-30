<template>
    <div>
        <div class="title">
                <span class="titleContent">会员信息</span>
                <el-breadcrumb separator-class="el-icon-arrow-right" class="breadcrumb">
                    <el-breadcrumb-item>会员信息</el-breadcrumb-item>
                    <el-breadcrumb-item>会员信息表</el-breadcrumb-item>
                </el-breadcrumb>
            </div>
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
                    prop="name"
                    label="用户名"
                    width="180">
                    </el-table-column>
                    <el-table-column
                    prop="email"
                    label="邮箱"
                    width="180">
                    </el-table-column>
                    <el-table-column
                    prop="sex"
                    label="性别"
                    width="80">
                    </el-table-column>
                    <el-table-column
                    prop="sta"
                    label="状态"
                    width="100">
                    </el-table-column>
                    <el-table-column
                    prop="time"
                    label="创建时间">
                    </el-table-column>
                    <el-table-column
                    prop="operate"
                    label="操作"
                    width="100">
                    <template slot-scope="scope">
                        <el-tooltip class="item" effect="light" content="删除" placement="top">
                            <el-button type="danger" icon="el-icon-delete" size="mini" @click="deleteUser(scope.row)"></el-button>
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
             tableData: []
        };
    },

    mounted() {
           this.usersList()
    },

    methods: {
        usersList() {
            request({
                method:'post',
                url:'/users/list'
            }).then( res => {
                // console.log(res.data)
                this.tableData = res.data.map(item => {
                    return item;
                })
            }).catch( err => {
                console.log(err)
            })
        },
        deleteUser(data){
            let userId = data
             this.$confirm('是否删除当前用户?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                request({
                    method:'delete',
                    url:`/users/delete/${userId._id}`
                }).then( res => {
                    this.usersList();
                }).catch( err => {
                    console.log(err)
                })
                this.$message({
                    type: 'success',
                    message: '删除成功!'
                });
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