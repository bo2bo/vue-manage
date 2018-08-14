<template>
  <self-table :tableData="tableData" :columns="columns" :totalPage="totalPage" @currentChange="currentChange" @handleDelete="tableDelete" @handleEdit="tableEdit"></self-table>
</template>
<script>
import SelfTable from "./../common/SelfTable.vue";
export default {
  components: {
    SelfTable
  },
  data() {
    return {
      tableData: [
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1517 弄"
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄"
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄"
        },
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1517 弄"
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄"
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄"
        },
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1517 弄"
        }
      ],
      columns: [
        { prop: "date", label: "日期" },
        { prop: "name", label: "姓名" },
        { prop: "address", label: "地址" },
        {
          prop: "",
          label: "操作",
          render: (function() {
            const operate = {
              label: "操作",
              items: [
                {
                  label: "编辑",
                  func: "update",
                  type: "primary"
                },
                {
                  label: "删除",
                  func: "delete",
                  type: "danger"
                }
              ]
            };
            return operate;
          })()
        }
      ],
      totalPage: 12
    };
  },
  methods: {
    currentChange(val) {
      alert(val);
    },
    tableDelete(index, rows) {
      debugger;
      alert(index, rows);
    },
    tableEdit(index, rows) {
      debugger;
      alert(index, rows);
    }
  }
};
</script>