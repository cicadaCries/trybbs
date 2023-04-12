<template>
  <v-app>
    <v-app-bar
      app
      :color="appBarColor"
      dark
      dense 
      outlined 
      class="border-bottom"
    >
      <div class="d-flex align-center">
        <span style="font-size: 24px; font-weight: bold; font-family: SimSun;">延&nbsp;大&nbsp;校&nbsp;园</span>
      </div>

      <v-spacer></v-spacer>

      <v-switch
          v-model="isDarkTheme"
          hide-details
          inset
          label="主题色"
        ></v-switch>
    </v-app-bar>

    <v-main>
      <router-view/>
    </v-main>
  </v-app>
</template>
 
<script>

export default {
  name: 'App',

  data: () => ({
    isDarkTheme: false,
    appBarColor: 'primary', // 保存原本的颜色
  }),
  watch: {
    isDarkTheme(value) {
      if (value && !this.$vuetify.theme.dark) {
        this.$vuetify.theme.dark = true;
        this.appBarColor = "#121212";
      } else if (!value && this.$vuetify.theme.dark) {
        this.$vuetify.theme.dark = false;
        this.appBarColor = "primary";
      }
    },
  },
};
</script>

<style>
  .border-bottom {
    border-bottom: 1px dashed #ddd;
  }
</style>
