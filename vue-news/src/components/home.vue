<template>
  <div class="mian">
    <div class="userInfo" v-if="userDialog">
      <div class="close" @click="closeUsermessage"><span>X</span></div>
      <div class="userImg">
        <p>个人信息</p>
        <img :src="userMessageForm.avatarUrl" alt="用户头像">
      </div>
      <div class="userDetail">
        <el-form label-width="80px">
          <el-form-item label="用户名">
            <el-input v-model="userMessageForm.name" disabled></el-input>
          </el-form-item>
          <el-form-item label="邮箱地址">
            <el-input v-model="userMessageForm.email" disabled></el-input>
          </el-form-item>
          <el-form-item label="性别">
            <el-tag>{{userMessageForm.sex}}</el-tag>
          </el-form-item>
          <el-form-item class="button-out">
            <el-button type="primary" @click="userLoginOut">退出登录</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <div class="header">
      <el-dialog
        title="修改密码"
        :visible.sync="editPassDialog"
        width="30%">
        <el-form ref="editPassRuleForm" label-width="150px" class="demo-ruleForm">
          <el-form-item label="请输入原始密码">
            <el-input v-model="editPassRuleForm.oldPassword" show-password></el-input>
          </el-form-item>
          <el-form-item label="请输入新密码">
            <el-input v-model="editPassRuleForm.newPassword" show-password>
            </el-input>
          </el-form-item>
          <el-form-item label="请再次输入密码">
            <el-input v-model="editPassRuleForm.newPassword2" show-password></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="editPassDialog=false">取 消</el-button>
          <el-button type="primary" @click="editPassword">确 定</el-button>
        </span>
      </el-dialog>
      <div class="logo w">
        <div class="pic">
          <img src="../../images/logo.png" alt="">
        </div>
          <span>新闻管理系统</span>
          <div class="headerRight">
            <ul v-if="userStatus">
              <li @click="showDialog">注册</li>
              <li @click="dialogVisibleV2=true">登录</li>
            </ul>
           <div class="userSelect" v-else>
             <el-dropdown>
              <span class="el-dropdown-link">
                个人设置中心<i class="el-icon-arrow-down el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item @click.native="openUserMessage">个人信息</el-dropdown-item>
                <el-dropdown-item @click.native="openEditPassDialog">修改密码</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
           </div>
            <div @click="toLogin" class="toLogin">后台管理</div>
          </div>
      </div>
      <el-dialog
        title="用户注册"
        :visible.sync="dialogVisible"
        width="30%">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="80px" class="demo-ruleForm">
          <el-form-item label="用户名" prop="name">
            <el-input v-model="ruleForm.name" name="username" clearable></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input v-model="ruleForm.password" name="password" show-password clearable autocomplete="on"></el-input>
          </el-form-item>
          <el-form-item label="邮箱" prop="email">
            <el-input v-model="ruleForm.email" name="email" clearable autocomplete="on"></el-input>
          </el-form-item>
          <el-form-item label="选择性别">
            <el-radio-group v-model="ruleForm.sex">
              <el-radio label="男"></el-radio>
              <el-radio label="女"></el-radio>
            </el-radio-group>
          </el-form-item>
        </el-form>
        <el-upload
          class="upload-demo"
          action="http://localhost:3000/userAvatar/avatarUpload/"
          multiple
          :limit="1"
          :file-list="fileList"
          :on-success="userAvatarSuccess"
          name="img">
          <el-button size="small" type="primary">点击上传头像</el-button>
          <div slot="tip" class="el-upload__tip">只能上传jpg/png/jpeg文件，且不超过500kb</div>
        </el-upload>
        <span slot="footer" class="dialog-footer">
          <el-button @click="hideDialog">取 消</el-button>
          <el-button type="primary" @click="userRegister">确 定</el-button>
        </span>
      </el-dialog>
      <el-dialog
        title="用户登录"
        :visible.sync="dialogVisibleV2"
        width="30%">
        <el-form :model="ruleForm2" :rules="rules" ref="ruleForm2" label-width="80px" class="demo-ruleForm">
          <el-form-item label="用户名" prop="name">
            <el-input v-model="ruleForm2.name"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input v-model="ruleForm2.password" show-password></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="hideDialogV2">取 消</el-button>
          <el-button type="primary" @click="userLogin">确 定</el-button>
        </span>
      </el-dialog>
    </div>
    <div class="nav">
      <div class="w">
          <div class="newsNav">
            <ul>
              <li v-for="(item,index) in classifyList" :key="index" @click="handleSelect(item)" :class="{navActiveColor:item===selectTitle}">{{item}}</li>
            </ul>
          </div>
          <div class="find">
            <input type="text" v-model="keyWord">
            <img src="../../images/find.png" alt="" @click="findNews">
          </div>
      </div>
    </div>
    <div class="mainHeader" v-show="selectTitle=='首页'">
      <div class="w">
          <div class="slider">
            <slider></slider>
          </div>
          <div class="announcement">
            <div class="noticeTitle">公告</div>
            <div class="noticeContent">
              <ul>
                <li v-for="(item,index) in announcementList" :key="index"><span class="annuonceContent">{{item.announcementContent}}</span><span class="noticeTime">{{item.time}}</span></li>
              </ul>
            </div>
          </div>
      </div>
    </div>
    <first-page v-if="selectTitle=='首页'" :newsDetailList="newsList" :searchList="searchList"></first-page>
    <search-news v-else-if="selectTitle=='查找'" :searchList="searchList" :keyWord="keyWord"></search-news>
    <domestic v-else :selectClassify="selectTitle" :newsList="selectList"></domestic>
    <div class="footer">
      <div class="w">
        Copyright © 1996-2022 SINA Corporation, All Rights Reserved
      </div>
    </div>
  </div>
</template>

<script>
import slider from "./slider/Carousel"

import firstPage from '../components/first/firstPage.vue'
import domestic from '../components/domestic/domestic'
import request from '../network/request'
import Domestic from './domestic/domestic.vue'
import { mapGetters} from 'vuex'
import SearchNews from './searchNews/searchNews.vue'
import md5 from 'js-md5'
export default {
  name: 'home',
  components:{ slider,firstPage,domestic, Domestic, SearchNews},
  data () {
    return {
        selectTitle:'首页',//控制新闻标题的显示与隐藏
        dialogVisible: false,  //控制注册框的形式与隐藏
        fileList: [],
        dialogVisibleV2: false,  //控制登录框的形式与隐藏
        userDialog:false,//控制用户信息对话框的显隐
        editPassDialog:false,
        userStatus:true,//控制用户是否登录所显示的信息
        username:'',//登录的用户名
        classifyList:[],//所有的新闻分类
        newsList:[],//所有的新闻数据列表
        selectList:[],//选中的新闻列表
        announcementList:[],//所有公告列表
        keyWord:'',//查找新闻关键词
        searchList:[],//模糊搜索法查找到的新闻信息
        //注册表单的数据
        ruleForm: {
          name: '小明',
          password:'123456',
          email:'182569280@qq.com',
          sex:'',
          avatarUrl:''
        },
        //登录表单的数据
        ruleForm2: {
          name: '小明',
          password:'123456'
        },
        //用户信息的表单数据
        userMessageForm:'',
        //修改密码的表单数据
        editPassRuleForm: {
          oldPassword:'123456',
          newPassword:'12345678',
          newPassword2:'12345678'
        },
        rules: {
          name: [
            { required: true, message: '请输入用户名', trigger: 'blur' },
            { min: 2, max: 4, message: '长度在 2 到 4 个字符', trigger: 'blur' }
          ],
          password: [
            { required: true, message: '请输入密码', trigger: 'blur' },
            { min: 4, max: 20, message: '长度在 4 到 20 个字符', trigger: 'blur' }
          ],
          email: [
            { required: true, message: '请输入邮箱', trigger: 'blur' }
          ],
        }
    }
  },
  mounted() {
    this.getNewsClassify();
    this.getAllAnnouncements();
    this.getNewsList();
    console.log(this.$store.state.allNewsList);
    if(this.loginUserInfo){
      this.userMessageForm = this.loginUserInfo;
      this.userStatus = false
    }
    
  },
  computed:{
    ...mapGetters(["loginUserInfo"])
  },
  methods: {
    //新闻导航栏切换
    handleSelect(value) {
      this.selectTitle = value
      this.selectList = this.newsList.filter(item => item.classify == this.selectTitle)
      console.log(value)
    },
    //跳转到管理员登录页面
    toLogin() {
      let routeUrl = this.$router.resolve({
          path: "/login"
     });
     window.open(routeUrl.href, '_self');
    },
    //控制用户信息的隐藏
    closeUsermessage (){
      this.userDialog = false;
    },
    //控制用户信息的显示
    openUserMessage (){
      this.userDialog = true;
    },
    //控制修改密码框的显示
    openEditPassDialog () {
      this.editPassDialog = true;
    },
    //隐藏注册框
    hideDialog () {
      this.dialogVisible = false;
      this.$refs.ruleForm.resetFields()
    },
    //隐藏登录框
    hideDialogV2 () {
      this.dialogVisibleV2 = false;
      this.$refs.ruleForm2.resetFields()
    },
    //显示注册框
    showDialog () {
      this.dialogVisible = true
    },
    //用户注册的方法
    userRegister () {
      request({
        method:'post',
        url:'/users/data',
        data:{
          name:this.ruleForm.name,
          password:md5(this.ruleForm.password),
          sex:this.ruleForm.sex,
          email:this.ruleForm.email,
          avatarUrl:this.ruleForm.avatarUrl
        }
      }).then(res => {
               console.log(res)
            if(res.data.status === 1000){
                this.$message.success("注册成功！")
            }else if(res.data.status === 1001){
                this.$message.warning("该用户名已注册！")
            }else {
                this.$message.error("注册失败！")
            }
      }).catch(
        err => {
          this.$message.error("注册失败")
        }
      )
      this.dialogVisible = false;
      //重置表单
      this.$refs.ruleForm.resetFields()
    },
    //用户上传头像成功回调
    userAvatarSuccess (res) {
      //res这个参数自己打印出来一看便知，在此不做解释     
      console.log(res);
      console.log(res.data.path)
      //传递参数，保存图片地址到数据库
      this.ruleForm.avatarUrl = res.data.path;
    },
    //获取当前时间
     getTime(){
       var date1=new Date();
       var year=date1.getFullYear();
       var month=date1.getMonth()+1;
       var day=date1.getDate();
       var hours=date1.getHours();
       var minutes=date1.getMinutes();
       var seconds=date1.getSeconds();
       return year+"年"+month+"月"+day+"日"+hours+":"+minutes+":"+seconds
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
           this.username = res.data.data[0].name
           res.data.data.map(item => {
            // return this.$store.commit('saveUser',item.avatarUrl,item.name,item.email,item.sex,item.password)
            this.userMessageForm = item;
           })
          this.$store.commit('saveUser',this.userMessageForm)
          this.userStatus = false;
         }else{
           this.$message.error("用户名或密码错误！")
         }
       })
       this.dialogVisibleV2 = false;
     },
     
     //用户退出登录
      userLoginOut() {
        this.$confirm('是否退出当前账号?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.userDialog = false;
          this.userStatus = true;
          window.sessionStorage.removeItem("loginUserInfo")
          this.$store.commit('clearLoginUserInfo')
          this.$message({
            type: 'success',
            message: '退出账号成功!'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消退出登录'
          });          
        });
      },
     //修改密码的方法
      editPassword (){
        if(this.editPassRuleForm.newPassword !== this.editPassRuleForm.newPassword2){
          this.$message.warning("两次输入的密码不一致")
        }else if(md5(this.editPassRuleForm.oldPassword) !== this.userMessageForm.password){
          this.$message.warning("原始密码输入不正确，请重新输入！")
        } else{
          request({
            method:'post',
            url:'/users/updatePassword',
            data:{
              oldPassword:md5(this.editPassRuleForm.oldPassword),
              newPassword:md5(this.editPassRuleForm.newPassword),
              newPassword2:md5(this.editPassRuleForm.newPassword2)
            }
          }).then(res => {
            if(res.data.status === 200){
              this.$message.success("修改成功！")
              this.editPassDialog = false;
            }else{
              this.$message.error("原始密码输入错误，请重新输入")
            }
          }).catch(err => {
            console.log(err)
          })
        } 
      },
      //获取所有新闻分类
      getNewsClassify(){
        request({
          method:'post',
          url:'/classify/showNewsClassify'
        }).then(res => {
          res.data.forEach(c => {
            this.classifyList.push(c.newsClassify)
          })
          // console.log(this.classifyList)
        }).catch(err => {
          console.log(err)
        })
      },
      //调用接口获取到所有新闻数据
      getNewsList(){
            request({
                method:"post",
                url:"/news/showNews"
            }).then(res => {
                if(res.data&&res.data.length>0){
                    this.newsList = res.data.map(item => item)
                    this.$store.commit("saveNewsList",this.newsList)
                }
                // console.log(res)
            }).catch(err => {
                console.log(err)
            })
        },
        //调用接口，获取所有公告数据
    getAllAnnouncements() {
            request({
                method:'post',
                url:'/announcement/showAnnouncement',
            }).then(res => {
                // console.log(res)
                var newAnnounceArr = res.data.map(item => item)
                this.announcementList = newAnnounceArr.slice(newAnnounceArr.length - 10)
                }).catch(err => {
                this.$message.error("获取公告失败！")
            })
      },
      findNews(){
        console.log(this.keyWord)
        request({
          method:'post',
          url:'/news/searchNews',
          data:{keyWord:this.keyWord}
        }).then(res => {
          console.log(res)
          this.searchList = res.data.allSearchNews.map(item => item)
        }).catch(err => {
          console.log(err)
        })
        this.selectTitle = "查找"
      }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .w {
    width: 1200px;
    margin: 0 auto;
  }
  a {
    text-decoration: none;
  }
  li {
    list-style: none;
  }
  .header {
    height: 100px;
    background-color: #2e3c4b;
  }
  .logo img {
    vertical-align: middle;
  }
  .logo span {
    margin-left: 20px;
    color: #fff;
    font-size: 20px;
    line-height: 100px;
  }
  .pic {
    line-height: 100px;
    float: left;
  }
  .headerRight {
    float: right;
    cursor: pointer;
    line-height: 100px;
  }
  .headerRight ul {
    height: 100px;
    float: left;
  }
  .headerRight ul li {
    float: left;
    padding:0 20px;
    list-style: none;
    font-size: 14px;
    color: #fff;
  }
  .userSelect {
    float: left;
    margin-right: 15px;
  }
  .userSelect .el-dropdown-link {
    font-size: 15px;
  }
  .headerRight .toLogin {
    font-size: 14px;
    color: #fff;
    display: inline-block;
    padding: 0 10px;
  }
  .userInfo {
    position: absolute;
    top: 165px;
    left: 50%;
    transform: translateX(-50%);
    width: 400px;
    height: 440px;
    background-color: #eeeeee;
    z-index: 1;
  }
  .close {
    float: right;
  }
  .close span {
    color: #fff;
    margin: 15px;
    cursor: pointer;
  }
  .userImg {
    height: 90px;
    text-align: center;
    background-color: #6eb4fa;
  }
  .userImg p {
    padding-top: 15px;
    margin-left: 40px;
    font-size: 20px;
    color: #fff;
  }
  .userImg img {
    position: absolute;
    top: 50px;
    left: 50%;
    transform: translateX(-50%);
    width: 80px;
    height: 80px;
    border-radius: 50%;
  }
  .userDetail {
    margin: 60px 25px 0 10px;
  }
  .button-out {
    position: absolute;
    bottom: 2px;
    left: 60px;
  }
  .nav {
    line-height: 60px;
    height: 60px;
    background-color: #eeeeee;
    border-bottom: 2px solid #eca478;
  }
  .newsNav ul li {
    float: left;
    list-style: none;
    display: block;
    cursor: pointer;
    padding: 0 35px;
    color: #5c5f5f;
    font-size: 18px;
  }
 .newsNav ul  .navActiveColor{
   font-weight: 800;
    color: #bf0614;
  }
  .find {
    float: right;
  }
  .find input {
    height: 20px;
  }
  .find img {
    vertical-align: middle;
    cursor: pointer;
  }
  .mainHeader {
    height: 400px;
    background-color: #2e3c4b;
  }
  .slider {
    position: relative;
    top: 20px;
    float: left;
  }
  .announcement {
    float: right;
    position: relative;
    right: 10px;
    top: 20px;
    width: 520px;
    height: 350px;
    border: 1px solid rgba(255, 255, 255, 0.171);
    /* background-color: #fff; */
  }
  .noticeTitle {
    width: 520px;
    height: 40px;
    background-color: rgba(226, 184, 47, 0.411);
    text-align: center;
    color: #fff;
    font-size: 18px;
    line-height: 40px;
  }
  .noticeContent ul li {
    height: 30px;
    list-style: none;
    line-height: 30px;
    font-size: 14px;
    padding-left: 15px;
    color: rgba(241, 235, 235, 0.822);
    border-bottom: 1px solid rgba(255, 255, 255, 0.171);
  }
  .noticeContent ul li .annuonceContent {
    width: 350px;
    display: inline-block;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }
  .noticeContent ul li .noticeTime {
    float: right;
    padding-right: 10px;
  }
  .newsTitle {
    margin-top: 10px;
  }
  .newsTitle span::after {
    display: block;
    content: '';
    width: 20px;
    height: 2px;
    background-color: #eca478;
  }
  .newsContent {
    height: 1050px;
    margin-top: 20px;
    background-color: #eeeeee;
  }
  .hotNewsLeft {
    width: 590px;
    height: 660px;
    float: left;
    position: relative;
    margin-top: 20px;
    background-color: #ffffff;
  }
  .hotNewsLeft img {
    width: 100%;
    height: 60%;
  }
  .hotNewsLeft h3 {
    padding: 0 0 10px 10px;
  }
  .hotNewsLeft p {
    margin: 0 10px 0 10px;
  }
  .newsContent .hotNewsRight ul {
    padding-top: 20px;
  }
  .hotNewsRight ul li {
    position: relative;
    width: 285px;
    height: 320px;
    float: left;
    margin-left: 20px;
    background-color: #ffffff;
  }
  .hotNewsBottom ul li {
    position: relative;
    width: 285px;
    height: 320px;
    float: left;
    margin-right: 20px;
    margin-top: 20px;
    background-color: #ffffff;
  }
  .hotNewsBottom ul li:nth-child(4){
    margin-right: 0px;
  }
  .sendTime {
    position: absolute;
    bottom: 10px;
    padding-left: 10px;
    font-size: 12px;
    color: #b5b5b5;
  }
  .hotNews {
    color: #eca478;
    padding: 10px;
  }
  .hotNews::after {
    display: block;
    content: '';
    width: 25px;
    height: 2px;
    background-color: #eca478;
  }
  .hotNewsContent {
    padding: 0 10px 0 10px;
    color: #5a595b;
  }
  .hotNewsRight ul li img {
    width: 100%;
    height: 50%;
  }
  .hotNewsBottom ul li img {
    width: 100%;
    height: 50%;
  }
  .footer {
    height: 80px;
    text-align: center;
    line-height: 80px;
    color: #fff;
    background-color: #2e3c4b;
  }
</style>