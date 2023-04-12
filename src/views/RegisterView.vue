<template>
    <v-container class="fill-height" fluid>
      <!-- 一整个容器框，设置居中，中屏4/12 -->
      <v-row align="center" justify="center">
        <v-col class="mx-auto" cols="12" sm="8" md="4">
          <v-card class="elevation-12">
            <!-- 卡片标题 -->
            <v-toolbar color="primary" dark flat>
              <v-toolbar-title>用户注册页</v-toolbar-title>
              <!-- <v-spacer></v-spacer> -->
              <!-- <svg-icon type="mdi" :path=mdiAutorenew></svg-icon> -->
            </v-toolbar>
            <!-- 卡片正文，内容是表单 -->
            <v-card-text>
              <v-form>
                <!-- 用户账号输入框 -->
                <v-text-field
                  v-model="username"
                  label="用户名"
                  outlined
                  dense
                  class="mt-3"
                ></v-text-field>
                <!-- 密码和确认密码输入框 -->
                <v-text-field
                  v-model="password"
                  label="密码"
                  outlined
                  dense
                  type="password"
                  class="mt-3"
                ></v-text-field>
                <v-text-field
                  v-model="confirmPassword"
                  label="确认密码"
                  outlined
                  dense
                  type="password"
                  class="mt-3"
                ></v-text-field>
                <!-- 验证码输入框和验证码图片，验证码图片设置为输入框等高 -->
                <v-row>
                  <v-col cols="6" sm="9">
                    <v-text-field
                      v-model="code"
                      label="验证码"
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
                <!-- 用户注册按钮，绑定事件register -->
                <v-row>
                <v-col cols="6">
                  <v-btn color="primary" type="button" class="mt-3" @click="register">
                    注&ensp;册
                  </v-btn>
                </v-col>
                <v-col cols="6" class="text-right">
                  <v-btn color="primary" type="button" class="mt-3" @click="loginRouter">
                    登&ensp;录
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


  export default {
    name: "register",
    data() {
      return {
        username: "",
        password: "",
        confirmPassword: "",
        code: "",
        captchaImage: "",
        error: "",
        uuid: "",
        loading: false,
      };
    },
    mounted() {
      // 初始化获取验证码图片
      this.getCaptchaImage();
    },
    methods: {
      // 点击注册按钮触发
      register() {
        if (this.username.trim() === "") {
          this.error = "请填写用户名";
          return;
        }
        if (this.password.trim() === "") {
          this.error = "请填写密码";
          return;
        }
        if (this.password !== this.confirmPassword) {
          this.error = "两次输入的密码不一致";
          return;
        }
        if (this.code.trim() === "") {
          this.error = "请填写验证码";
          return;
        }
        // 发送注册请求
        this.loading = true;
        // TODO: 发送注册请求
        axios.post('http://localhost:8080/register', {
          username: this.username,
          password: this.password
        }).then(response => {
          // 注册成功，处理响应数据
          console.log(response.data);
          this.$router.push({ path: "/login" });
        })
        .catch(error => {
          // 注册失败，处理错误信息
          console.error(error);
        });
        // 注册成功后跳转到登录页
      },
      // 获取验证码图片
      getCaptchaImage() {
        axios.get("http://localhost:8080/captchaImage", {
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
      //  跳转页面路由到login
      loginRouter() {
        this.$router.push({ path: '/login' }); 
      },
    },
  };
</script>
  
   