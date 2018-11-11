
<template>
<div>
  <el-breadcrumb separator-class="el-icon-arrow-right">
  <el-breadcrumb-item :to="{ path: '/' }">用户管理</el-breadcrumb-item>
  <el-breadcrumb-item>用户列表</el-breadcrumb-item>
  </el-breadcrumb>
  <div>
  <el-input v-model="query" class="query"></el-input>
    <el-button icon="el-icon-search"  class="search" @click="search"></el-button>
      <el-button type="success" icon="el-icon-check" plain class="addlist"  @click="dialogFormVisible = true">添加用户</el-button>
  </div>
   <el-table
   :data="userlist"
    border
    style="width: 100%">
    <el-table-column
      
      prop="username"
      label="姓名"
      width="180">
    </el-table-column>
    <el-table-column
      prop="email"
      label="邮箱"
      width="180">
    </el-table-column>
        <el-table-column
      prop="mobile"
      label="电话"
      width="180">
    </el-table-column>
    <el-table-column
      label="用户状态">
      <template slot-scope="scope">
        <el-switch
            v-model="scope.row.mg_state"
            active-color="#13ce66"
            inactive-color="#ff4949" @change="userstateChange(scope.row)">
              <!-- 双向绑定状态 -->
            <!-- switch有change事件 -->
      </el-switch>
      </template>
    </el-table-column>
        <el-table-column
      label="操作">
      <template slot-scope="scope">
          <el-button type="primary" plain icon="el-icon-edit" ></el-button>
          <el-button type="danger" plain icon="el-icon-delete" @click="del(scope.row.id)"></el-button>
            <el-button type="success" plain icon="el-icon-check" >分配角色</el-button>
      </template>
    </el-table-column>
  </el-table>

  <div class="block">
    <span class="demonstration"></span>
    <el-pagination
      @size-change="handleSizeChange"
      background
      @current-change="handleCurrentChange"
      :current-page="currentpage"
      :page-sizes="[2, 4, 6, 8]"
      :page-size="2"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
  </div>

<el-dialog  :visible.sync="dialogFormVisible"  title="添加用户" class="el-headerss">
  <el-form :rules="rules" status-icon ref="addForm" :model="addForm">
    <el-form-item label="用户名" :label-width="formLabelWidth"  prop="username" >
      <el-input  v-model = 'addForm.username'></el-input>
    </el-form-item>
      <el-form-item label="密码" :label-width="formLabelWidth"  prop="password" v-model="addForm.password">
      <el-input  v-model = 'addForm.password' autocomplete="off"></el-input>
    </el-form-item>
      <el-form-item label="邮箱" :label-width="formLabelWidth" prop="email" v-model="addForm.email" >
      <el-input  autocomplete="off"></el-input>
    </el-form-item>
      <el-form-item label="手机" :label-width="formLabelWidth" prop="mobile" v-model="addForm.mobile">
      <el-input autocomplete="off"></el-input>
    </el-form-item>
  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="dialogFormVisible = false">取 消</el-button>
    <el-button type="primary" @click="adduserlist">确 定</el-button>
  </div>
</el-dialog>
</div>
  
</template>
 
<script>
import axios from 'axios'
export default {
  data() {
    return {
      userlist: [],
      query: '',
      currentpage: 1,
      pagesize: 2,
      total: 0,
      dialogVisible: false,
      dialogFormVisible: false,
      formLabelWidth: '120px',
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 3, max: 9, message: '长度在 3 到 9 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 12, message: '长度在 6 到 12 个字符', trigger: 'blur' }
        ],
        email: [
          { type: 'email', message: '请输入正确格式的邮箱', trigger: 'blur' }
        ],

        mobile: [
          {
            pattern: /^1\d{10}$/,
            message: '请输入正确的手机号',
            trigger: 'blur'
          }
        ]
      },
      editForm: {
        id: '',
        username: '',
        email: '',
        mobile: ''
      },
      addForm: {
        username: '',
        password: '',
        email: '',
        mobile: ''
      }
    }
  },
  methods: {
    getList() {
      this.axios({
        url: 'http://localhost:8888/api/private/v1/users',
        method: 'get',
        params: {
          query: this.query,
          pagesize: this.pagesize,
          pagenum: this.currentpage
        },
        headers: {
          Authorization: localStorage.getItem('token')
        }
      }).then(res => {
        this.userlist = res.data.users
        this.total = res.data.total
        console.log(this.userlist)
      })
    },

    handleCurrentChange(val) {
      //页面发生改变时
      // val就是当前页
      // console.log(val)
      // 修改当前页
      this.currentpage = val
      // 重新发送ajax请求获取数据
      this.getList()
    },
    // 每页条数发生改变
    handleSizeChange(val) {
      // console.log(val)
      // 改变每页条数的时候，需不需要把页码改成1
      this.currentpage = 1
      this.pagesize = val
      // 重新渲染
      this.getList()
    },
    search() {
      this.currentpage = 1
      this.getList()
    },
    del(id) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.axios({
            method: 'delete',
            url: `http://localhost:8888/api/private/v1/users/${id}`,
            headers: {
              Authorization: localStorage.getItem('token')
            }
          }).then(res => {
            if (res.meta.status === 200) {
              if (this.userlist.length === 1 && this.currentpage > 1) {
                this.currentpage--
              }
              this.getList()
              this.$message({
                type: 'success',
                message: '删除成功!'
              })
            } else {
              this.$message({
                type: 'false',
                message: '删除失败!'
              })
            }
          })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    },
    userstateChange(user) {
      axios({
        url: `http://localhost:8888/api/private/v1/users/${user.id}/state/${
          user.mg_state
        }`,
        method: 'put',
        headers: {
          Authorization: localStorage.getItem('token')
        }
      })
    },
    adduserlist() {
      this.$refs.addForm.validate(valid => {
        if (!valid) return false
        this.axios({
          method: 'post',
          url: 'users',
          data: this.addForm
        }).then(res => {
          console.log(res)
          let { meta: { status } } = res
          if (status == 201) {
            //重新渲染最后一页
            this.total++
            this.currentpage = Math.ceil(this.total / this.pagesize)

            // 重新渲染
            this.getList()

            // 隐藏模块框
            this.dialogFormVisible = false

            // 清空表单
            this.$refs.addForm.resetFields()
          }
        })
      })
    }
  },
  created() {
    this.getList()
  }
}
</script>

<style>
.el-table__header {
  line-height: 30px;
}
.el-pagination {
  margin-top: 40px;
}
.query {
  width: 320px;
  float: left;
  line-height: 40px;
}
.search {
  float: left;
}
.addlist {
  line-height: 16px;
  float: left;
}
.el-headerss {
  line-height: 0px;
}
</style>
