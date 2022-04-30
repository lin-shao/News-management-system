<template>
    <div id="background">
        <!-- <div class="background">
            <img src="../../../images/background.jpeg" alt="">
        </div> -->
        <div class="login">
            <el-form :model="ruleForm" :rules="rules2"
                status-icon
                ref="ruleForm" 
                label-position="left" 
                label-width="0px" 
                class="demo-ruleForm">
                <h2>欢迎登录</h2>
                    <el-form-item prop="username">
                        <el-input type="text" 
                            v-model="ruleForm.username" 
                            auto-complete="off" 
                            placeholder="用户名"
                        ></el-input>
                    </el-form-item>
                        <el-form-item prop="password">
                            <el-input type="password" 
                                v-model="ruleForm.password" 
                                auto-complete="off" 
                                placeholder="密码"
                            ></el-input>
                        </el-form-item>
                    <!-- <el-checkbox 
                        v-model="checked"
                        class="rememberme"
                    >记住密码</el-checkbox> -->
                    <el-form-item>
                        <el-input v-model="identify" placeholder="请输入验证码" class="codeInput"></el-input>
                        <div class="coderight" @click="refreshCode">
                            <SIdentify :identifyCode="identifyCode"></SIdentify>
                        </div>
                    </el-form-item>
                    <el-form-item style="width:100%;" class="elbtu">
                        <el-button type="primary" style="width:100%;" @click="handleSubmit" :loading="logining">登录</el-button>
                    </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
import request from '../../network/request';
import SIdentify from '../../components/login/SIdentify/SIdentify.vue'
import md5 from 'js-md5'
export default {
  components: { SIdentify },
    name: 'Login',

    data() {
        return {
            logining: false,
            identify:'',//登录验证
            identifyCode:'',
            identifyCodes:'1234567890',
            ruleForm: {
                username: 'administrator',
                password: '666888',
            },
            rules2: {
                username: [{required: true, message: 'please enter your account', trigger: 'blur'}],
                password: [{required: true, message: 'enter your password', trigger: 'blur'}]
            },
            checked: false
        };
    },

    mounted() {
        this.identifyCode = "";
        this.makeCode(this.identifyCodes, 4);
    },

    methods: {
        handleSubmit() {
             this.$refs.ruleForm.validate((valid) => {
                if(valid){
                    if(this.identify !== this.identifyCode){
                        this.$message.error("验证码输入错误！");
                        this.refreshCode();
                    }else{
                    this.logining = true;
                    request({
                        method:'post',
                        url:'/admin/login',
                        data:this.ruleForm
                    }).then(res => {
                        console.log(res)
                        if(res.data.status === 2000){
                            this.logining = false;
                            this.$message.success("登录成功！")
                            this.$store.commit('saveToken',res.data.token)
                            this.$router.push({path: '/management'});
                        }else{
                            this.logining = false;
                            this.$alert('username or password wrong!', 'info', {
                            confirmButtonText: 'ok'
                        })
                        }
                        
                    }).catch(err => {
                         
                    })
                    }
                    }else{
                    console.log('error submit!');
                    return false;
                }
            })
        },
    randomNum(min, max) {
      return Math.floor(Math.random() * (max - min) + min);
    },
    refreshCode() {
      this.identifyCode = "";
      this.makeCode(this.identifyCodes, 4);
    },
    makeCode(o, l) {
      for (let i = 0; i < l; i++) {
        this.identifyCode += this.identifyCodes[
          this.randomNum(0, this.identifyCodes.length)
        ];
      }
      console.log(this.identifyCode);
    },
    },
};
</script>
<style scoped>
/* * {
    padding: 0;
    margin: 0;
} */
#background {
    background: url("../../../images/background.jpeg");
    background-size: 100% 100%;
    height: 100%;
    width: 100%;
    position: fixed;
}
.demo-ruleForm h2 {
    text-align: center;
    padding-bottom: 30px;
    color: #007de9;
}
.demo-ruleForm {
    -webkit-border-radius: 5px;
    border-radius: 5px;
    margin: 180px auto;
    width: 350px;
    padding: 35px 35px 15px;
    background: #fff;
    border: 1px solid #eaeaea;
    box-shadow: 0 0 15px #cac6c6;
} 
.elbtu {
    margin-top: 30px;
}
.codeInput {
    width: 180px;
    float: left;
}
.rememberme {
    margin-left: 10px;
}
.login-code {
    width: 100px;
    height: 30px;
}
.coderight {
    float: right;
}
</style>