<template>
    <div class="manage">
        <el-dialog
            title="修改密码"
            :visible.sync="editPassDialog"
            width="30%" :modal-append-to-body = "false">
            <el-form ref="editPassRuleForm" label-width="150px" class="demo-ruleForm">
            <el-form-item label="请输入原始密码">
                <el-input v-model="editPassRuleForm.password" show-password></el-input>
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
        <div class="header">
            <img src="../../../images/newLogo.png" alt="">
            <h3>新闻管理系统</h3>
            <div class="operate">
                <span @click="backHome">回到首页</span>
                <span><i class="el-icon-user-solid"></i>{{adminInfo.username}}</span>
                <span @click="openDialog"><i class="el-icon-edit"></i>修改密码</span>
                <span @click="backLogin"><i class="el-icon-d-caret"></i>退出</span>
            </div>
        </div>
        <div class="aside"> 
            <el-drawer
            title="我是标题"
            :visible.sync="drawer"
            size="20%"
            :modal="false"
            :before-close="handleClose">
            <span>我来啦!</span>
            </el-drawer>
            <div class="manger" @click="drawer = true">
                <div class="adminImg"><img :src="adminInfo.url" alt=""></div>
                <span>{{adminInfo.username}}</span>
                <p>管理员</p>
            </div>
            <div class="menu">
                <el-menu router :default-active="$route.path" :unique-opened="true">
                    <el-submenu index="1">
                        <template slot="title">
                        <i class="el-icon-s-unfold"></i>
                        <span slot="title">会员管理</span>
                        </template>
                        <el-menu-item-group>
                        <el-menu-item index="/management/user"><i class="el-icon-right"></i>会员列表</el-menu-item>
                        </el-menu-item-group>
                    </el-submenu>
                    <el-submenu index="2">
                        <template slot="title">
                        <i class="el-icon-s-unfold"></i>
                        <span slot="title">公告管理</span>
                        </template>
                        <el-menu-item-group>
                        <el-menu-item index='/management/announcement'><i class="el-icon-right"></i>公告列表</el-menu-item>
                        <el-menu-item index='/management/addAnnouncement'><i class="el-icon-right"></i>添加公告</el-menu-item>
                        </el-menu-item-group>
                    </el-submenu>
                    <el-submenu index="3">
                        <template slot="title">
                        <i class="el-icon-s-unfold"></i>
                        <span slot="title">新闻分类管理</span>
                        </template>
                        <el-menu-item-group>
                        <el-menu-item index="/management/category"><i class="el-icon-right"></i>新闻分类列表</el-menu-item>
                        <el-menu-item index="/management/addCategory"><i class="el-icon-right"></i>添加新闻分类</el-menu-item>
                        </el-menu-item-group>
                    </el-submenu>
                    <el-submenu index="4">
                        <template slot="title">
                        <i class="el-icon-s-unfold"></i>
                        <span slot="title">新闻管理</span>
                        </template>
                        <el-menu-item-group>
                        <el-menu-item index="/management/newsList"><i class="el-icon-right"></i>新闻内容列表</el-menu-item>
                        <el-menu-item index="/management/addNew"><i class="el-icon-right"></i>添加新闻</el-menu-item>
                        </el-menu-item-group>
                    </el-submenu>
                    <el-submenu index="5">
                        <template slot="title">
                        <i class="el-icon-s-unfold"></i>
                        <span slot="title">评论管理</span>
                        </template>
                        <el-menu-item-group>
                        <el-menu-item index="/management/comments"><i class="el-icon-right"></i>评论列表</el-menu-item>
                        </el-menu-item-group>
                    </el-submenu>
                </el-menu>
            </div>
        </div>
        <div>
            <router-view></router-view>
        </div>
    </div>
</template>

<script>
import request from '../../network/request'
export default {
    name: 'NewsManagementManagement',

    data() {
        return {
            drawer:false,
            adminInfo:'',
            editPassDialog:false,
            editPassRuleForm:{
                password:'',
                newPassword:'',
                newPassword2:''
            }
        };
    },

    mounted() {
        this.getAdministratorInfo();
    },

    methods: {
        //跳转到新闻首页
        backHome() {
            this.$router.replace('/')
        },
        //退出到登录界面
        backLogin() {
            this.$router.replace('/login')
            window.sessionStorage.removeItem("token")
        },
         handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {});
      },
      //获取管理员信息
      getAdministratorInfo(){
          request({
              method:'get',
              url:'/admin/getUserInfo'
          }).then(res => {
              console.log(res)
              this.adminInfo = res.data.map(item => item)[0]
          }).catch(err => {
              consloe.log(err)
          })
      },
      openDialog(){
          this.editPassDialog = true;
      },
      //修改管理员密码
      editPassword(){
          if(this.editPassRuleForm.newPassword !== this.editPassRuleForm.newPassword2){
          this.$message.warning("两次输入的密码不一致")
        }else if(this.editPassRuleForm.password !== this.adminInfo.password){
          this.$message.warning("原始密码输入不正确，请重新输入！")
        } else{
           request({
              method:'post',
              url:'/admin/updatePassword',
              data:this.editPassRuleForm
          }).then(res => {
              this.editPassDialog = false;
              console.log(res)
              this.$message.success("修改密码成功！")
          }).catch(err => {
              consloe.log(err)
          }) 
        }
          
      }
    }
};
</script>

<style scoped>
    .manage {
        height: 100%;
        width: 100%;
        position: fixed;
        background-color: #f2edf3;
    }
    .header {
        height: 80px;
        background-color: #ffffff;
        line-height: 80px;
    }
    .header img{
        vertical-align: middle;
        padding-left: 40px;
    }
    .header h3 {
        display: inline-block;
    }
    .aside {
        width: 300px;
        height: 100%;
        margin-right: 30px;
        float: left;
        background-color: #fff;
    }
    /* .fold {
        height: 30px;
        text-align: center;
        line-height: 30px;
    } */
    .manger {
        margin: 20px 0 40px 30px;
    }
    .adminImg {
        width: 60px;
        height: 60px;
        float: left;
        margin: 0 20px;
        overflow: hidden;
    }
    .adminImg img {
        width: 100%;
        height: 100%;
        border-radius: 50%;
    }
    .itemGroup {
        margin-left: 20px;
    }
    .operate {
        float: right;
        font-size: 14px;
        margin-right: 100px;
    }
    .operate span {
        padding: 0 15px;
        cursor: pointer;
    }
    .activeColor {
        position: fixed;
        width: 100%;
        height: 0;
        background-color: #fff;
        opacity: 0;
        z-index: 3000;
    }
</style>