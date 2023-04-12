<template>
  <v-container class="fill-height" fluid>
    <!-- 一整个容器框，设置居中，中屏4/12 -->
    <v-row align="center" justify="center">
      <v-col class="mx-auto" cols="12" sm="8" md="4">
        <v-card class="elevation-12">
          <!-- 卡片标题 -->
          <v-toolbar color="primary" dark flat>
            <v-toolbar-title>账号登录页</v-toolbar-title>
          </v-toolbar>
          <!-- 卡片正文，内容是表单 -->
          <v-card-text>
            <v-form>
              <!-- 密码和用户账号输入框 -->
              <v-text-field
                v-model="username"
                label="Username"
                outlined
                dense
              ></v-text-field>
              <v-text-field
                v-model="password"
                label="Password"
                outlined
                dense
                type="password"
              ></v-text-field>
              <!-- 验证码输入框和验证码图片，验证码图片设置为输入框等高 -->
              <v-row>
                <v-col cols="6" sm="9">
                  <v-text-field
                    v-model="code"
                    label="Code"
                    outlined
                    dense
                    class="mt-3"
                  ></v-text-field>
                </v-col>
                <v-col cols="6" sm="3">
                  <v-img
                    :src="captchaImage"
                    v-if="captchaImage"
                    height="$refs.codeField.$el.clientHeight"
                    class="mt-2"
                    :style="{ padding: '-7px' }"
                    @click="getCaptchaImage"
                  ></v-img>
                </v-col>
              </v-row>

              <!-- 用户登录按钮，绑定时间login -->
              <v-row>
                <v-col cols="6">
                  <v-btn color="primary" type="button" class="mt-3" @click="login">
                    登&ensp;录
                  </v-btn>
                </v-col>
                <v-col cols="6" class="text-right">
                  <v-btn color="primary" type="button" class="mt-3" @click="registRouter">
                    注&ensp;册
                  </v-btn>
                </v-col>
              </v-row>

            </v-form>
            <!-- 报错显示 -->
            <v-alert v-if="error" type="error" class="mt-3">
              {{ error }}
            </v-alert>
            <!-- token显示 -->
            <v-alert v-if="token" type="success" class="mt-3">
              Token: {{ token }}
            </v-alert>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import axios from "axios";

 
export default {
  // 定义本页面中的data方法，用来返回一个对象
  data() {
    return {
      username: "",
      password: "",
      code: "",
      captchaImage: "",
      token: "",
      error: "",
      uuid: "",
    };
  },
  // 生命周期函数，是页面创建的钩子函数，其中运行了getCaptchaImage获取验证码图片已经响应拦截器
  created() {
    this.getCaptchaImage();
  },
  // 用来存放生命周期中运行的钩子函数实体和事件已经绑定按钮的桉树实体
  methods: {
    login() {
      // 用axios库来用post方式访问服务器API，请求体(类似函数形参)为四个数据
      axios
        .post("http://localhost:8080/login", {
          username: this.username,
          password: this.password,
          code: this.code,
          uuid: this.uuid,
        })
        .then((response) => {
          // 访问成功之后对返回的josn数据校验，存储本地token或者进行报错信息提示
          console.log("访问loginAPI成功之后返回的数据" + response)
          if(response.data.code == 200){
            this.token = response.data.token;
            localStorage.setItem('token', this.token);  //  本地存储token
            this.$router.push({ path: '/thread' });   //  路由跳转到localhost:8080/#/thread（使浏览器的url路径变为这个路径来实现链接跳转：先请求HTTP成功获取数据之后再跳转页面）
            console.log("访问成功之后得到的token:" + this.token);
          }else{
            // 连接到服务器但是没成功获取数据之后提示错误信息再重新请求验证码图片清空输入框
            this.error = response.data.msg;
            this.getCaptchaImage();
            this.code = '';
          }
        })
        .catch((error) => {
          // 访问不成功的情况下的数据报错，一般都是服务器问题
          if (error.response && error.response.data && error.response.data.message) {
            this.error = error.response.data.message;
          } else {
            this.error = "服务器接口异常";
          };
          console.error(error);
            // 返回登录页面并提示错误
          this.$router.push({ path: '/login' });
        });
    },
    getCaptchaImage(){
      // 页面初始化的时候运行的事件
      axios
        .get("http://localhost:8080/captchaImage", {
          // get方式访问API并请求josn格式的数据
          headers: { "Content-Type": "application/json" },
        })
        .then((response) => {
          // 获取数据中的图片并且显示
          this.captchaImage = "data:image/gif;base64," + response.data.img;
          this.uuid = response.data.uuid;
        })
        .catch((error) => {
          console.error(error);
        });
    },
    registRouter() {
      // 存储输入框中的很数据并且跳转到注册页面
      this.$router.push({ path: '/register' }); 
    },
  },
};
</script>
