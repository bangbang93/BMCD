<template>
    <div>
        <el-row>
            <el-col :span="8" class="menu">
                <h2>BMCD {{bmcd.version}}</h2>
                <el-menu @select="selectMenu">
                    <el-menu-item index="index">
                        首页
                    </el-menu-item>
                    <el-menu-item index="server">
                        服务器
                    </el-menu-item>
                </el-menu>
            </el-col>
            <el-col :span="16" :offset="8">
                <router-view></router-view>
            </el-col>
        </el-row>
    </div>
</template>
<style>
    body {
        max-width: 980px;
        margin: 50px auto auto;
    }
    .menu {
        position: fixed;
        top: 0;
        left: 0;
        bottom: 0;
        background-color: #eef1f6;
    }
    .menu>h2 {
        margin: 10px auto;
        text-align: center;
    }
</style>
<script>
  export default{
    data(){
      const pkg = require('../../../package.json');
      return {
        bmcd: {
          version: pkg.version
        },
        user: {
          username: '',
          uid     : '',
        }
      }
    },
    created: async function () {
      let res = await this.$fetch.get('/api/user/login');
      if (res.status == 200){
        this.user = await res.json();
      } else {
        window.location = '/login.html';
      }
    },
    methods: {
      selectMenu(index){
        this.$router.push({name: index});
      }
    }
  }
</script>
