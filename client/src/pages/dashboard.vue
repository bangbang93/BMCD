<template>
    <div>
        <p>{{dashboard.serverCount}}</p>
        <p>{{dashboard.os.uptime * 1000 | ms}}</p>
        <p>{{dashboard.os.freemem | byte}}</p>
        <p>{{dashboard.os.totalmem| byte}}</p>
        <p>{{dashboard.os.hostname}}</p>
        <p>{{dashboard.os.cpus[0].model}} * {{dashboard.os.cpus.length}}</p>
    </div>
</template>
<script>
    import prettyByte from 'pretty-bytes'
    import prettyMs from 'pretty-ms'
    export default {
      data() {
        return {
          dashboard: {
            serverCount: 0,
            os: {
              uptime: 0,
              freemem: 0,
              totalmem: 0,
              release: '',
              hostname: '',
              cpus: [],
            }
          }
        }
      },
      async created(){
        let res = await this.$fetch.get('/api/user/dashboard');
        this.dashboard = await res.json();
      },
      filters: {
        byte: function (value) {
          return prettyByte(value);
        },
        ms: function (value) {
          return prettyMs(value);
        }
      }
    }
</script>