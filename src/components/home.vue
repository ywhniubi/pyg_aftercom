<template>
 
  <el-container>
  <el-header>
<div class="logo"></div>
<div class="desc">{{msg}}<a  @click="exit" href="#">退出</a></div>
<h1 class="title">电商后台管理系统</h1>

  </el-header>
  <el-container>
    <el-aside width="200px"><el-row class="tac">
  <el-col :span="24" >
    <el-menu
      router
      collapse-transition
      default-active="users"
      class="el-menu-vertical-demo"
      @open="handleOpen"
      unique-opened
      @close="handleClose"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b">
      <el-submenu index="1">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>用户管理</span>
        </template>
          <el-menu-item index="users"><i class="el-icon-menu"></i>用户列表 </el-menu-item>
      </el-submenu>
         <el-submenu index="2">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>权限管理</span>
        </template>
            <el-menu-item index="2-1"><i class="el-icon-menu"></i>角色列表</el-menu-item>
           <el-menu-item index="2-2"><i class="el-icon-menu"></i>权限列表</el-menu-item>
      </el-submenu>
          <el-submenu index="3">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>商品管理</span>
        </template>
         <el-menu-item index="3-1"><i class="el-icon-menu"></i>商品列表</el-menu-item>
        <el-menu-item index="3-2"><i class="el-icon-menu"></i>分类参数</el-menu-item>
          <el-menu-item index="3-3"><i class="el-icon-menu"></i>商品分类</el-menu-item>
      </el-submenu>
          <el-submenu index="4">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>订单管理</span>
        </template>
         <el-menu-item-group>
             <el-menu-item index="4-1"><i class="el-icon-menu"></i>订单列表</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
          <el-submenu index="5">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>数据统计</span>
        </template>
         <el-menu-item index="4-1"><i class="el-icon-menu"></i>数据报表</el-menu-item>
      </el-submenu>
    </el-menu>
  </el-col>
</el-row></el-aside>
    <el-main><router-view>Maindd</router-view></el-main>
  </el-container>
</el-container>
 

</template>

<script>
export default {
  data() {
    return {
      msg: '欢迎光临'
    }
  },
  methods: {
    exit() {
      // 清除token
      localStorage.removeItem('token')
      //跳转到登录页
      this.$router.push('/login')
    },
    handleOpen(key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath)
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
.el-col {
  height: 100%;
}
.el-col ul {
  height: 100%;
}
.el-col ul li {
  padding-top: 20px;
}
.el-row {
  height: 100%;
}
</style>
