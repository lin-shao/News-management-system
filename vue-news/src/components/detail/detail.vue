<template>
    <div id="main">
        <div :class="{activeColor:active}"></div>
        <div class="loginDialog" v-show="isShowDialog">
            <div class="closeIcon" @click="hideDialog"><i class="el-icon-close"></i></div>
            <div class="dialog">
                <h3>请先登录</h3>
            </div>
        <el-form ref="ruleForm2" class="demo-ruleForm">
          <el-form-item>
            <el-input v-model="ruleForm2.name" placeholder="用户名" prefix-icon="el-icon-user"></el-input>
          </el-form-item>
          <el-form-item>
            <el-input v-model="ruleForm2.password" show-password placeholder="密码" prefix-icon="el-icon-unlock"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" round style="width:100%" @click="userLogin">登录</el-button>
          </el-form-item>
        </el-form>
        </div>
        <div class="w">
            <div class="newsTitle">
                <el-breadcrumb separator-class="el-icon-arrow-right" class="el-bre">
                <el-breadcrumb-item :to="{ path: '/' }">返回</el-breadcrumb-item>
                <el-breadcrumb-item>{{newDetail.classify}}</el-breadcrumb-item>
                <el-breadcrumb-item>新闻详情</el-breadcrumb-item>
                </el-breadcrumb>
            </div>
            <div class="detail">
                <h1>{{newDetail.title}}</h1>
                <div class="newsAuthor">
                    <span>责任编辑：{{newDetail.author}}</span>
                    <span>发布时间：{{newDetail.newsDate}}</span>
                </div>
                <div class="detailImg"><img :src="newDetail.imgUrl" alt=""></div>
                <p v-html="newDetail.content">{{newDetail.content}}</p>
            </div>
            <div class="comment">
                <h4>评论：</h4>
                <el-input
                    type="textarea"
                    :rows="8"
                    placeholder="请输入内容"
                    v-model="commentMessage.comment" :disabled="editor" @click.native="showDialog">
                </el-input>
                <el-button type="primary" class="sendComment" @click="addComments" :disabled="editor">发表评论</el-button>
            </div>
            <div class="allCommentMseeage">
                <div class="allComment">
                    <!-- <el-badge :value="userComment.length" class="item">
                        <el-button size="max">评论</el-button>
                    </el-badge> -->
                <h3>全部评论({{userComment.length}})</h3>
                </div>
                <div class="userComment" v-for="(item,i) in userComment" :key="i">
                    <div class="userImg"><img :src="item.userAvatar" alt="用户头像"></div>
                    <div>
                        <h5>{{item.username}}</h5>
                        <p>{{item.comment}}</p>
                    </div>
                    <div class="commentTime">{{item.commentDate}}</div>
                </div>
                </div>
            </div>
        <div class="footer">
            <div class="middle">
                Copyright © 1996-2022 SINA Corporation, All Rights Reserved
            </div>
        </div>
    </div>
</template>

<script>
import request from '../../network/request'
import { mapGetters } from 'vuex'
import md5 from 'js-md5'
export default {
    name: 'Detail',

    data() {
        return {
            newDetail:'',
            editor:true,
            commentMessage:{
                comment:'',
                articleTitle:'',
                username:'',
                userAvatar:''
            },
            ruleForm2:{
                name:'',
                password:''
            },
            userComment:[],
            isShowDialog:false,
            //背景半透明
            active:false
        };
    },

    created() {
        this.getDetail()
        console.log(this.$store.state.allNewsList);
        this.findAllComments()
        if(this.loginUserInfo){
            this.editor = false;
            this.commentMessage.username = this.loginUserInfo.name
            this.commentMessage.userAvatar = this.loginUserInfo.avatarUrl
        }else{
            console.log("按钮不可编辑")
            this.editor = true;
        }
    },
    computed:{
        ...mapGetters(["loginUserInfo"])
    },
    methods: {
        getDetail() {
            const id = this.$route.params.id
            request({
                method:"post",
                url:"/news/showNews"
            }).then(res => {
                    this.newDetail = res.data.filter(item => item._id == id)[0]
                    this.commentMessage.articleTitle = this.newDetail.title
                    console.log(this.commentMessage)
            }).catch(err => {
                console.log(err)
            })
        },
        //添加评论
        addComments (){
            if(this.commentMessage.comment === ''){
                this.$message.warning("不能发表空的内容！")
                return;
            }
            request({
                method:'post',
                url:'comment/addComment',
                data:this.commentMessage
            }).then(res => {
                if(res.data.status == 220){
                    this.$message.success("评论成功！")
                    this.findAllComments();
                    this.commentMessage.comment = ''
                }else{
                    this.$message.error("评论失败！")
                }
            }).catch(err => {
                console.log(err)
            })
        },
        //返回数据库所有评论
        findAllComments() {
            request({
                method:'post',
                url:'comment/showComment',
            }).then(res => {
                this.userComment = res.data.filter(item => this.newDetail.title == item.articleTitle)
            }).catch(err => {
                console.log(err)
            })
        },
        showDialog(){
            if(this.editor === true){
                this.isShowDialog = true;
                this.active = true;
            }
        },
        hideDialog(){
            this.isShowDialog = false;
            this.active = false;
        },
        //用户登录
     userLogin() {
       request({
         method:'post',
         url:'/users/login',
         data:{
             name:this.ruleForm2.name,
             password:md5(this.ruleForm2.password)
         }
       }).then(res => {
         if(res.data.status === 200){
           this.$message.success("登录成功！")
           res.data.data.map(item => {
            this.userMessageForm = item;
           })
          this.$store.commit('saveUser',this.userMessageForm)
          this.commentMessage.username = this.loginUserInfo.name
          this.commentMessage.userAvatar = this.loginUserInfo.avatarUrl
         }else{
           this.$message.error("用户名或密码错误！")
         }
       })
       this.isShowDialog = false;
       this.active = false;
       this.editor = false;
     },
    },
};
</script>

<style scoped>
    #main {
        position: relative;
        width: 100%;
        height: 100%;
        background: #f5f5f5;
    }
    .activeColor {
        position: fixed;
        width: 100%;
        height: 100%;
        background-color: #000;
        opacity: .5;
        z-index: 2;
    }
    .w {
        width: 1200px;
        height: 100%;
        margin: 0 auto;
        background-color: #ffffff;
    }
    .loginDialog {
        position: fixed;
        width: 500px;
        height: 300px;
        left: 50%;
        top: 50%;
        transform: translate(-50%,-50%);
        background-color: #fff;
        z-index: 3;
    }
    .closeIcon {
        float: right;
        margin: 10px 15px 0 0;
        cursor: pointer;
    }
    .dialog {
        text-align: center;
        margin: 20px;
    }
    .demo-ruleForm {
        padding: 20px 60px;
    }
    .newsTitle {
        height: 80px;
        line-height: 80px;
        border-bottom: 1px dashed gainsboro;
    }
    .el-bre {
        font-size: 18px;
        line-height: 80px;
        margin-left: 20px;
    }
    .detail {
        padding: 30px 100px 0 100px;
        text-align: center;
    }
    .detail h1 {
        margin-bottom: 20px;
    }
    .detail p {
        text-align: left;
        text-indent: 35px;
    }
    .detailImg {
        margin: 30px 0;
        width: 700px;
        height: 400px;
    } 
    .detailImg img {
        width: 100%;
        height: 100%;
        padding-left: 150px;
    }
    .detail .newsAuthor span {
        padding: 20px;
        color: darkgray;
        font-size: 14px;
    }
    .comment {
        padding: 20px 0 0 100px;
        width: 600px;
    }
    .comment h4 {
        margin-bottom: 5px;
    }
    .footer {
        height: 80px;
        text-align: center;
        line-height: 80px;
        color: #fff;
        background-color: #2e3c4b;
    }
    .middle {
        width: 1200px;
        margin: 0 auto;
    }
    .sendComment {
        margin-top: 15px;
        margin-bottom: 50px;
    }
    .allCommentMseeage {
        width: 900px;
        margin-left: 100px;
    }
    .allComment {
        padding-bottom: 10px;
        border-bottom: 1px solid #f0f0f0;
    }
    .userComment {
        padding: 20px 0;
        border-bottom: 1px dotted #a0a0a0;
    }
    .userComment .userImg {
        width: 60px;
        height: 60px;
        float: left;
        margin: 0 30px 0 0;
    }
    .userImg img {
        width: 100%;
        height: 100%;
        border-radius: 50%;
    }
    .userComment h5 {
        color: #004276;
    }
    .userComment p{
        padding: 15px 0;
        overflow: hidden;
    }
    .commentTime {
        margin-left: 90px;
        font-size: 12px;
        color: #999999;
    }
</style>