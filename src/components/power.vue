<template>
<div class="power">
    <el-breadcrumb separator-class="el-icon-arrow-right">
    <el-breadcrumb-item >权限管理</el-breadcrumb-item>
    <el-breadcrumb-item>权限列表</el-breadcrumb-item>
    </el-breadcrumb>

   <el-button type="success"  plain id="addpower"  @click="dialogFormVisible = true" >添加权限</el-button>
<el-table
      :data="powerlist"
      style="width: 100%">
       <el-table-column
      type="index"
      width="50">
    </el-table-column>
      <el-table-column
        prop="authName"
        label="权限名称"
        width="600">
      </el-table-column>
      <el-table-column
        prop="path"
        label="路径"
        width="600">
      </el-table-column>
      <el-table-column
        prop="level"
        label="层级">
         <template slot-scope="scope">
          <span v-if="scope.row.level === '0'">一级</span>
          <span v-else-if="scope.row.level === '1'">二级</span>
          <span v-else>三级</span>
        </template>
      </el-table-column>
    </el-table>
</div>
</template>

<script>
export default {
  data() {
    return {
      powerlist: [
        {
          date: '',
          name: '',
          adress: ''
        }
      ]
    }
  },
  methods: {
    async getpower() {
      let res = await this.axios.get('rights/list')
      console.log(res)
      let { meta: { status }, data } = res
      if (res === 200) {
      }
      this.powerlist = data
    }
  },
  created() {
    this.getpower()
  }
}
</script>

<style scoped>
#addpower {
  margin-top: 30px;
}
</style>
