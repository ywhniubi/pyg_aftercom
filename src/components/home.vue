<template>
  <el-container>
  <el-header>
<div class="logo"></div>
<div class="desc">{{msg}}<a href="">退出</a></div>
<h1 class="title">电商后台管理系统</h1>

  </el-header>
  <el-container>
    <el-aside width="200px">Aside</el-aside>
    <el-main>Main</el-main>
  </el-container>
</el-container>
</template>

<script>
export default {
  data() {
    return {
      msg: '欢迎光临'
    }
  }
}
</script>

<style>
.logo {
  height: 60px;
  width: 300px;
  float: left;
  background-image: url('../assets/logo.png');
  background-repeat: no-repeat;
}
.title {
  font-size: 30px;
  color: #fff;
  text-align: center;
}
.desc {
  height: 60px;
  width: 100px;
  float: right;
  font-weight: 900;
}
.desc a {
  color: darkorange;
  font-weight: 900;
}
body {
  background-color: #fff;
}
section {
  width: 100%;
  height: 100%;
}
.el-header,
.el-footer {
  background-color: #b3c0d1;
  color: #333;
  text-align: center;
  line-height: 60px;
  overflow: hidden;
}

.el-aside {
  background-color: #d3dce6;
  color: #333;
  text-align: center;
  line-height: 200px;
}

.el-main {
  background-color: #e9eef3;
  color: #333;
  text-align: center;
  line-height: 160px;
}

body > .el-container {
  width: 100%;
  height: 100%;
  margin-bottom: 40px;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}
#app {
  width: 100%;
  height: 100%;
}
</style>
