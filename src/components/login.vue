
<template>
<div class="login">
<el-form ref="form" status-icon :model="form" label-width="80px" :rules="rules">
<div class="user_icon"><img src="../assets/timg.jpg" alt=""></div>
  <el-form-item label="用户名"  prop="username" placeholder="请输入用户名" >
    <el-input v-model="form.username" ></el-input>
  </el-form-item>
<el-form-item label="密码" prop="password">
    <el-input v-model="form.password" type="password" placeholder="请输入密码"></el-input>
  </el-form-item>
  <el-form-item>
    <el-button type="primary" @click="login">登录</el-button>
    <el-button @click="resetForm('form')">重置</el-button>
  </el-form-item>
</el-form>
</div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        username: '',
        password: ''
      },
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '密码不能为空', trigger: 'blur' },
          // 校验长度
          {
            min: 6,
            max: 12,
            message: '长度在 6 到 12 个字符',
            trigger: 'change'
          }
        ]
      }
    }
  },
  methods: {
    login() {
      this.$refs.form.validate(valid => {
        if (valid) {
          console.log('请求通过')
          // 发送阿贾克斯请求
          this.axios({
            url: 'http://localhost:8888/api/private/v1/login',
            method: 'post',
            data: this.form
          }).then(res => {
            console.log(res.data)
            if (res.meta.status === 200) {
              this.$message.success('登录成功')
              localStorage.setItem('token', res.data.token)
              this.$router.push('/home')
            } else {
              this.$message.error('登录失败')
            }
          })
        } else {
          console.log('没通过')
          return false
        }
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    }
  }
}
</script>

<style>
#app {
  width: 100%;
  height: 100%;
}
.login {
  width: 100%;
  height: 100%;
  background-color: #2d434c;
  overflow: hidden;
  position: relative;
}
.user_icon {
  width: 140px;
  height: 140px;
  border: 3px solid #fff;
  border-radius: 999px;
  position: absolute;
  left: 50%;
  transform: translateX(-50%) translateY(-120%);
  overflow: hidden;
}
.user_icon img {
  width: 100%;
  height: 100%;
}
.el-form {
  width: 500px;
  height: 250px;
  background-color: #fff;
  margin: 280px auto;
  padding: 80px 15px 15px 15px;
  border-radius: 20px;
}
</style>
