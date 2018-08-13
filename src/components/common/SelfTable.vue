<template>
  <div class="self-table">
    <el-row>
      <el-row>
        <el-table :data="tableData" border stripe style="width: 100%;text-align:center" :header-cell-style="headerStyle">
          <el-table-column v-for="(column, index) in columns" :prop="column.prop" :key="index" :label="column.label">
            <template slot-scope="scope">
              <span>
                {{scope.row[column.prop]}}
              </span>
            </template>
          </el-table-column>
        </el-table>
      </el-row>
      <el-row>
        <div class="block">
          <el-pagination :current-page="pageNum" :page-size="pageSize" @current-change="currentChange" layout="total, sizes, prev, pager, next, jumper" :total="totalPage">
          </el-pagination>
        </div>
      </el-row>
    </el-row>
  </div>
</template>

<script>
export default {
  props: {
    tableData: Array,
    columns: Array,
    pageNum: { type: Number, default: 1 },
    pageSize: { type: Number, default: 10 },
    totalPage: { type: Number, default: 0 }
  },
  methods: {
    headerStyle() {
      return { "text-align": "center" };
    },
    currentChange(val) {
      this.$emit("currentChange", val);
    }
  }
};
</script>

<style>
</style>