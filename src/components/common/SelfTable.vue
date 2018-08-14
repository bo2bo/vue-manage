<template>
  <div class="self-table">
    <el-row>
      <el-row>
        <el-table :data="tableData" border stripe :header-cell-style="headerStyle">
          <div v-for="(column, index) in columns" :key="index">
            <div v-if="column.render">
              <el-table-column :prop="column.prop" :label="column.label" fixed="right">
                <template slot-scope="scope">
                  <span v-for="(column, index) in column.render.items" :key="index">
                    <el-button v-if="column.func == 'update'" :type="column.type" size="small" @click.native.prevent="handleEdit(scope.$index, scope.row)">{{column.label}}</el-button>
                    <el-button v-else-if="column.func == 'delete'" :type="column.type" size="small" @click.native.prevent="handleDelete(scope.$index, chooseIndexData)">{{column.label}}</el-button>
                  </span>
                </template>
              </el-table-column>
            </div>
            <div v-else>
              <el-table-column :prop="column.prop" :key="index" :label="column.label">
                <template slot-scope="scope">
                  <span>
                    {{scope.row[column.prop]}}
                  </span>
                </template>
              </el-table-column>
            </div>
          </div>
        </el-table>
      </el-row>
      <el-row>
        <div class="block">
          <el-pagination background layout="prev, pager, next" :total="totalPage" :page-size="pageSize" :current-page.sync="currentPage" @current-change="currentChange">
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
    currentPage: { type: Number, default: 1 },
    pageSize: { type: Number, default: 10 },
    totalPage: { type: Number, default: 0 }
  },
  methods: {
    headerStyle() {
      return {
        "text-align": "left",
        width: "100%"
      };
    },
    currentChange(val) {
      this.$emit("currentChange", val);
    },
    handleDelete(index, rows) {
      this.$emit("handleDelete", index, rows);
    },
    handleEdit(index, rows) {
      this.$emit("handleEdit", index, rows);
    }
  }
};
</script>

<style>
.self-table span button {
  margin: 0 10px 0 20px;
}
</style>
