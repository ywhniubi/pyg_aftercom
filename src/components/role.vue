<template>
  <div class="role">
    <el-breadcrumb separator-class="el-icon-arrow-right">
    <el-breadcrumb-item >角色管理</el-breadcrumb-item>
    <el-breadcrumb-item>角色列表</el-breadcrumb-item>
    </el-breadcrumb>
     <el-button type="success"  plain class="addlist"  @click="dialogFormVisible = true" >添加角色</el-button>
    <el-table
      :data="rolelist"
      style="width: 100% ">
       <el-table-column type="expand">
         <template slot-scope="scope">
           <el-row v-if="scope.row.children.length==0">
             <el-tag type="warning">暂无权限</el-tag>
             </el-row> 
          <el-row  v-for="level1 in scope.row.children" :key="level1.id">
            <el-col :span="10">
              <el-tag >{{level1.authName}}</el-tag>
            </el-col>
            <el-col :span=14>
                 <el-row  class="level2" v-for="level2 in level1.children" :key="level2.id">
                 <el-col :span="14">
                  <el-tag type="success">{{level2.authName}}</el-tag>
                 </el-col>
                 <el-col :span="8">
                  <el-tag type="danger" v-for="level3 in level2.children"  :key="level3.id" class="level3"> 
                     {{level3.authName}}   
                  </el-tag>
                 </el-col>
                  </el-row>
            </el-col>
        </el-row>
         </template>
       </el-table-column>
      <el-table-column
      type="index"
      width="50">
    </el-table-column>
      <el-table-column
        prop="roleName"
        label="角色名称"
        width="600"
        >
      </el-table-column>
      <el-table-column
        prop="roleDesc"
        label="角色描述"
        width="600">
      </el-table-column>
      <el-table-column
        label="角色操作">
         <template slot-scope="scope">
          <el-button type="primary" plain icon="el-icon-edit"  ></el-button>
          <el-button type="danger" plain icon="el-icon-delete"></el-button>
            <el-button type="success" plain icon="el-icon-check"   @click="showpwdg(scope.row)">分配权限</el-button>
      </template>
      </el-table-column>
    </el-table>

    <el-dialog
      title="分配权限"
      :visible.sync="dialogVisible"
      width="30%"
      >

      <el-tree
      ref="tree"
      :data="powerlist"
      show-checkbox
      :props="defaultProps"
      node-key="id"
      default-expand-all
     >
    </el-tree>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="takepower">确 定</el-button>
      </span>
    </el-dialog>




     </div>
</template>

<script>
export default {
  data() {
    return {
      rolelist: [],
      powerlist: [],
      dialogVisible: false,
      roleId: '',
      defaultProps: {
        children: 'children',
        // 设置用于显示的名字对应的属性名
        label: 'authName'
      }
    }
  },
  methods: {
    async getrole() {
      let res = await this.axios.get('roles')
      let { meta: { status }, data } = res
      if (status === 200) {
        this.rolelist = data
      }
    },
    async showpwdg(role) {
      this.dialogVisible = true
      console.log(role.id)
      this.roleId = role.id
      let res = await this.axios.get('rights/tree')
      console.log(res)
      let { meta: { status }, data } = res
      if (res === 200) {
      }
      ;(this.powerlist = data),
        this.$nextTick(() => {
          let temp = []
          console.log(role.children)
          role.children.forEach(f => {
            f.children.forEach(s => {
              s.children.forEach(t => {
                temp.push(t.id)
              })
            })
          })
          this.$refs.tree.setCheckedKeys(temp)
        })
    },
    async takepower() {
      // 获取选中的权限
      let checked = this.$refs.tree.getCheckedKeys()
      // 获取半选选中的权限
      let halfchecked = this.$refs.tree.getHalfCheckedKeys()
      // 合并两个数组

      let all = [...checked, ...halfchecked]
      let res = await this.axios.post(`roles/${this.roleId}/rights `, {
        rids: all.join()
      })
      let { data } = res
      this.powerlist = data
      this.getrole()
      this.dialogVisible = false
    }
  },
  created() {
    this.getrole()
  }
}
</script>

<style scoped>
.addlist {
  margin-top: 10px;
}
.level2 {
  margin-bottom: 10px;
}

.level3 {
  margin-right: 10px;
  margin-bottom: 5px;
}
</style>
