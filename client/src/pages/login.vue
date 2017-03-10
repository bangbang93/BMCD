<template>
    <div>
        <h1>登录到BMCD</h1>
        <hr>
        <el-form :model="user" ref="login" @submit.native.prevent="login">
            <el-form-item label="用户名" prop="username" :rules="[{required: true, message: '用户名不能为空'}]">
                <el-input v-model="user.username"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password" :rules="[{required: true, message: '密码不能为空'}]">
                <el-input type="password" v-model="user.password" @keydown.enter="login"></el-input>
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
      login(){
        this.$refs['login'].validate(async (valid)=>{
          if (!valid) return false;
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
        })
      }
    }
  }
</script>
