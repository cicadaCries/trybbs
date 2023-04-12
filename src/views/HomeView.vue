<template>
  <hello-world />
</template>

<script>
  import Axios from 'axios';
  import HelloWorld from '../components/HelloWorld'

  export default {
    name: 'Home',
    mounted() {
      Axios.get("http://localhost:8080/captchaImage").then(response => {
          // 处理响应数据
          console.log(response.data.uuid);
        })
        .catch(error => {
          // 处理错误
        })
    },
    components: {
      HelloWorld,
    },
  }
</script>
 