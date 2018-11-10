
<template>
<div>
  <el-breadcrumb separator-class="el-icon-arrow-right">
  <el-breadcrumb-item :to="{ path: '/' }">用户管理</el-breadcrumb-item>
  <el-breadcrumb-item>用户列表</el-breadcrumb-item>
  </el-breadcrumb>
  <div>
  <el-input v-model="query" class="query"></el-input>
    <el-button icon="el-icon-search"  class="search" @click="search"></el-button>
      <el-button type="success" icon="el-icon-check" plain class="addlist">添加用户</el-button>
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
            v-model="scope.row.mg_satate"
            active-color="#13ce66"
            inactive-color="#ff4949">
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
      total: 0
    }
  },
  methods: {
    getList() {
      axios({
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
        this.userlist = res.data.data.users
        this.total = res.data.data.total
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
      console.log(val)
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
          axios({
            method: 'delete',
            url: `http://localhost:8888/api/private/v1/users/${id}`,
            headers: {
              Authorization: localStorage.getItem('token')
            }
          }).then(res => {
            if (res.data.meta.status === 200) {
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
</style>
