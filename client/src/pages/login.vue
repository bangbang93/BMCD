<template>
    <div>
        <h1>登录到BMCD</h1>
        <hr>
        <el-form v-model="user">
            <el-form-item label="用户名">
                <el-input v-model="user.username"></el-input>
            </el-form-item>
            <el-form-item label="密码">
                <el-input type="password" v-model="user.password"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="login()">登录</el-button>
                <el-button type="text">忘记密码</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>
<style>
    body {
        width: 400px;
        margin: 200px auto;
    }
</style>
<script>
  export default{
    data(){
      return {
        user: {
          username: '',
          password: '',
        }
      }
    },
    methods: {
      async login(){
        let res = await this.$fetch.post('/api/user/login', this.user);
        if (res.status == 200){
          window.location = '/';
        } else {
          this.$alert('用户名或密码错误', '登录失败', {
            callback: ()=>{
              this.user.password = '';
            }
          })
        }
      }
    }
  }
</script>
