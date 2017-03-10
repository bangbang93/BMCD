<template>
    <div>
        <h1>title</h1>
        <router-link to="1">first</router-link>
        <router-link to="2">second</router-link>
        <router-view></router-view>
    </div>
</template>
<style>
    body {
        background-color: #66ccff;
    }
</style>
<script>
  export default{
    data(){
      return {
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

    }
  }
</script>
