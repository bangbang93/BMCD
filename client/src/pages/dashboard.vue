<template>
    <div>
        <el-row>
            <el-col :span="7" class="card">
                <el-card :body-style="bodyStyle">
                    <div slot="header">
                        服务器数量
                    </div>
                    <div class="card-body">
                        <span class="data">{{dashboard.serverCount}}</span>
                        台
                    </div>
                </el-card>
            </el-col>
            <el-col :span="7" :offset="1" class="card">
                <el-card :body-style="bodyStyle">
                    <div slot="header">
                        开机时间
                    </div>
                    <div class="card-body">
                        {{dashboard.os.uptime * 1000 | ms}}
                    </div>
                </el-card>
            </el-col>
            <el-col :span="7" :offset="1" class="card">
                <el-card :body-style="bodyStyle">
                    <div slot="header">
                        主机名
                    </div>
                    <div class="card-body">
                        {{dashboard.os.hostname}}
                    </div>
                </el-card>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="7" class="card">
                <el-card :body-style="bodyStyle">
                    <div slot="header">
                        内存
                    </div>
                    <div class="card-body">
                        <el-progress type="circle" :percentage="memPercentage"></el-progress>
                    </div>
                </el-card>
            </el-col>
            <el-col :span="7" :offset="1" class="card">
                <el-card :body-style="bodyStyle">
                    <div slot="header">
                        CPU
                    </div>
                    <div class="card-body">
                        <el-progress type="circle" :percentage="cpuPercent"></el-progress>
                    </div>
                </el-card>
            </el-col>
        </el-row>
    </div>
</template>
<style scoped>
    .card {
        height: 250px;
    }
    .card-body {
        margin: auto;
    }
    span.data {
        font-size: 500%;
    }
</style>
<script>
    import prettyByte from 'pretty-bytes'
    import prettyMs from 'pretty-ms'
    import io from '../helper/socket'
    import namespace from '../etc/namespace'

    export default {
      data() {
        return {
          bodyStyle: {
          },
          dashboard: {
            serverCount: 0,
            os: {
              uptime: 0,
              freemem: 0,
              totalmem: 1,
              hostname: '',
              cpus: [],
              cpuPercent: 0,
            }
          }
        }
      },
      computed: {
        usedmem () {
          return this.dashboard.os.totalmem - this.dashboard.os.freemem;
        },
        cpuModel () {
          let cpus = this.dashboard.os.cpus;
          if (cpus.length == 0){
            return 'unknown';
          }
          return cpus[0].model;
        },
        memPercentage () {
          return ~~(this.usedmem / this.dashboard.os.totalmem * 100);
        },
        cpuPercent () {
          return ~~this.dashboard.os.cpuPercent;
        }
      },
      async created(){
        let res = await this.$fetch.get('/api/user/dashboard');
        this.dashboard = await res.json();

        io(namespace.dashboard, this);
        this.$on('osStat', (data)=>{
          this.dashboard.os = data;
        })
      },
      async destroyed(){
        this.$emit('destroyed');
      },
      filters: {
        byte (value) {
          return prettyByte(value);
        },
        ms (value) {
          return prettyMs(value);
        }
      }
    };
</script>