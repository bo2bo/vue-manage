<template>
  <div class="meeting-list">
    <el-button class="successBtn" type="success" @click.native.prevent="handleAdd()">新增会议</el-button>
    <el-table :data="tableData" border style="width: 100%">
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
          <el-button type="primary" size="small" @click.native.prevent="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button @click.native.prevent="handleDelete(scope.$index, tableData)" type="danger" size="small">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination background layout="prev, pager, next" :total="20">
    </el-pagination>
    <el-dialog v-bind:title="tableDialogTitle" :visible.sync="tableDialog" width="30%">
      <el-form :model="tableDialogForm">
        <el-form-item label="会议日期" :label-width="tableDialogFormLabelWidth">
          <el-input v-model="tableDialogForm.meeting_date" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="会议主题" :label-width="tableDialogFormLabelWidth">
          <el-input v-model="tableDialogForm.meeting_title" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="会议内容" :label-width="tableDialogFormLabelWidth">
          <el-input v-model="tableDialogForm.meeting_content" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="会议地点" :label-width="tableDialogFormLabelWidth">
          <el-input v-model="tableDialogForm.meeting_location" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="会议状态" :label-width="tableDialogFormLabelWidth">
          <el-select v-model="tableDialogForm.meeting_status" placeholder="请选择会议状态">
            <el-option label="未开始" value="未开始"></el-option>
            <el-option label="已开始" value="已开始"></el-option>
            <el-option label="已截止" value="已截止"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="是否开放报名" :label-width="tableDialogFormLabelWidth">
          <el-select v-model="tableDialogForm.meeting_enroll" placeholder="是否开放报名">
            <el-option label="开放" value="开放"></el-option>
            <el-option label="否" value="否"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="tableDialog = false">取 消</el-button>
        <el-button type="primary" @click="tableDialog = false">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data: function() {
    return {
      tableData: [
        {
          meeting_date: "2016-05-02",
          meeting_title: "hhhhhh",
          meeting_content: "jjjjjjj",
          meeting_location: "444444",
          meeting_status: "未开始",
          meeting_enroll: "开放"
        },
        {
          meeting_date: "2016-05-02",
          meeting_title: "hhhhhh",
          meeting_content: "jjjjjjj",
          meeting_location: "444444",
          meeting_status: "未开始",
          meeting_enroll: "否"
        },
        {
          meeting_date: "2016-05-02",
          meeting_title: "hhhhhh",
          meeting_content: "jjjjjjj",
          meeting_location: "444444",
          meeting_status: "未开始",
          meeting_enroll: "否"
        },
        {
          meeting_date: "2016-05-02",
          meeting_title: "hhhhhh",
          meeting_content: "jjjjjjj",
          meeting_location: "444444",
          meeting_status: "未开始",
          meeting_enroll: "否"
        }
      ],
      tableDialog: false,
      tableDialogTitle: "编辑会议",
      tableDialogForm: {
        meeting_date: "",
        meeting_title: "",
        meeting_content: "",
        meeting_location: "",
        meeting_status: "未开始",
        meeting_enroll: "开放"
      },
      tableDialogFormLabelWidth: "120px"
    };
  },
  methods: {
    handleAdd() {
      var _this = this;
      _this.tableDialogTitle = "新增会议";
      _this.tableDialog = true;
    },
    handleEdit(index, row) {
      var _this = this;
      _this.tableDialogTitle = "编辑会议";
      _this.tableDialogForm = row;
      _this.tableDialog = true;
    },
    handleDelete(index, rows) {
      var _this = this;
      _this
        .$confirm("此操作将永久删除该会议, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
        .then(() => {
          _this.$message({
            type: "success",
            message: "删除成功!"
          });
          rows.splice(index, 1);
        })
        .catch(() => {
          _this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    }
  },
  mounted() {}
};
</script>
<style scoped>
</style>
