<template>
    <self-table :tableData="tableData" :columns="columns" :totalPage="totalPage" @currentChange="currentChange"></self-table>
</template>
<script>
import SelfTable from "./../common/SelfTable.vue";
// import vFooter from './../common/Footer.vue';
export default {
  components: {
    SelfTable
  },
  data() {
    return {
      columns: [
        { prop: "title", label: "标题" },
        { prop: "create_name", label: "发布人" },
        { prop: "item_name", label: "栏目" },
        { prop: "create_time", label: "创建时间" },
        { prop: "weight", label: "权重" },
        {
          prop: "isoriginal",
          label: "原创",
          render: function(h, param) {
            let html = "";
            if (param.row.isoriginal == "201") {
              html = "原创";
            } else {
              html = "非原创";
            }
            return html;
          }
        },
        {
          prop: "",
          label: "操作",
          render: (h, param) => {
            const dropDownData = {
              label: "操作",
              items: [
                {
                  label: "修改",
                  func: { func: "update", uuid: param.row.uuid }
                },
                { label: "删除", func: { func: "del", uuid: param.row.uuid } }
              ]
            };
            // 触发MyDropDown的update和del事件
            return h(MyDropDown, {
              props: { dropDownData: dropDownData },
              on: { update: this.update, del: this.del }
            });
          }
        }
      ]
    };
  }
};
</script>