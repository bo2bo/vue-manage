<template>
    <div class="self-table">
        <el-table :data="tableData" border style="width: 100%" ref="multipleTable">
            <el-table-column type="selection" width="40">
            </el-table-column>
            <el-table-column prop="meeting_date" label="日期">
            </el-table-column>
            <el-table-column prop="meeting_title" label="主题">
            </el-table-column>
            <el-table-column prop="meeting_content" label="内容">
            </el-table-column>
            <el-table-column prop="meeting_location" label="地点">
            </el-table-column>
            <el-table-column prop="meeting_status" label="状态">
            </el-table-column>
            <el-table-column prop="meeting_enroll" label="是否开放报名">
            </el-table-column>
            <el-table-column fixed="right" label="操作" width="200">
                <template slot-scope="scope">
                    <el-button type="primary" size="small" @click="handleEdit(scope.$index, scope.row)">查看</el-button>
                    <el-button @click.native.prevent="handleDelete(scope.$index, tableData)" type="danger" size="small">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>
<script>
export default {
  props: {
    selectWidth: {
      type: Number,
      default: 100
    },
    subject: {
      type: Array,
      default: function() {
        return [];
      }
    },
    selectContent: {
      type: Object,
      default: function() {
        return { value: 0, text: "请选择" };
      }
    }
  },
  mounted() {
    document.querySelector(".selectWrap").style.width = this.selectWidth + "px";
  },
  methods: {
    choose(item) {
      this.selectContent.text = item.text;
      this.optionWrapper.style.display = "none";
    }
  }
};
</script>