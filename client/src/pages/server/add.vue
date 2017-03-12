<template>
    <div>
        <el-row>
            <el-col :span="10">
                <el-form ref="serverForm" :model="server" class="form-server">
                    <el-form-item label="服务器名称">
                        <el-input v-model="server.name"></el-input>
                    </el-form-item>
                    <el-form-item label="使用的java">
                        <el-select v-model="server.java" placeholder="使用默认">
                            <el-option v-for="java in javas" :label="java" :value="java"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="服务器地址">
                        <el-input type="url" v-model="server.host"></el-input>
                    </el-form-item>
                    <el-form-item label="服务器端口">
                        <el-input type="number" v-model.number="server.port"></el-input>
                    </el-form-item>
                    <el-form-item label="服务端路径">
                        <el-input v-model="server.path"></el-input>
                    </el-form-item>
                    <el-form-item label="服务端本体名称">
                        <el-input v-model="server.jar"></el-input>
                    </el-form-item>
                    <el-form-item label="服务端参数">
                        <el-input v-model="argsInput" @keydown.enter.native="addArg" icon="plus" :on-icon-click="addArg"></el-input>
                        <el-tag v-for="arg in server.args" :closable="true" @close="removeArg(arg)">{{arg}}</el-tag>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary">保存</el-button>
                    </el-form-item>
                </el-form>
            </el-col>
        </el-row>
    </div>
</template>
<style scoped>
    .el-tag+.el-tag{
        margin-left: 10px;
    }
</style>
<script>
    export default {
      data(){

        return {
          server: {
            java: '',
            name: '',
            host: '',
            port: '',
            path: '',
            jar: '',
            args: ['-Xmx4G'],
          },
          argsInput: '',
          javas: [],
        }
      },
      async created() {
        let res = await this.$fetch.get('/api/config/javas');
        this.javas = await res.json();
      },
      methods: {
        addArg(){
          this.server.args.push(this.argsInput);
          this.argsInput = '';
        },
        removeArg(arg){
          this.server.args.splice(this.server.args.indexOf(arg), 1);
        }
      }
    }
</script>