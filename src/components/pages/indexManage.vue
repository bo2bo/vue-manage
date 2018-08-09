<template>
  <div class="table index-manage" id="index-manage">
    <div class="allDataTable">
      <h4>原始指标表</h4>
      <el-table :data="allIndexData" border stripe height='689' ref="multipleTableOfAll" @selection-change="handleSelectionChangeOfAll">
        <el-table-column type="selection" fixed width="40">
        </el-table-column>
        <el-table-column prop="itemName" label="指标详细名称" fixed width="150">
        </el-table-column>
        <el-table-column prop="itemUnit" label="指标单位" width="90">
        </el-table-column>
        <el-table-column prop="datatypeName" label="指标数据类型" width="110">
        </el-table-column>
        <el-table-column prop="frequencyName" label="更新频率" width="90">
        </el-table-column>
        <el-table-column prop="indusName" label="行业名称" width="150">
        </el-table-column>
        <el-table-column prop="indexName" label="指标指数类型" width="120">
        </el-table-column>
        <el-table-column prop="sourceName" label="数据来源" width="90">
        </el-table-column>
        <el-table-column prop="enddate" label="最后更新日期" width="120">
        </el-table-column>
        <el-table-column fixed="right" label="操作" width="120">
          <template slot-scope="scope">
            <el-button v-if="scope.row.choiceYn === 'Y'" type="info" size="small" disabled>禁用</el-button>
            <el-button v-else type="primary" size="small" @click.native.prevent="handleAdd2Right(scope.$index, scope.row)">添加到右表</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination background layout="prev, pager, next" :total="totalOfAll" :page-size="pageSize" :current-page.sync="currentPageOfAll" @current-change="handleCurrentChangeOfAll"></el-pagination>
    </div>
    <div class="btns">
      <el-button type="primary" class="toRight" @click.native.prevent="handleAdd2Rights()" icon="el-icon-d-arrow-right" circle></el-button>
      <el-button type="danger" class="toLeft" @click.native.prevent="handleDeletes()" icon="el-icon-d-arrow-left" circle></el-button>
    </div>
    <div class="partDataTable">
      <h4>腾景H5指标表</h4>
      <el-table :data="chooseIndexData" border stripe height='689' ref="multipleTableOfChoose" @selection-change="handleSelectionChangeOfChoose">
        <el-table-column type="selection" fixed width="40">
        </el-table-column>
        <el-table-column prop="itemName" label="指标详细名称" fixed width="150">
        </el-table-column>
        <el-table-column prop="itemUnit" label="指标单位" width="90">
        </el-table-column>
        <el-table-column prop="datatypeName" label="指标数据类型" width="110">
        </el-table-column>
        <el-table-column prop="frequencyName" label="更新频率" width="90">
        </el-table-column>
        <el-table-column prop="indusName" label="行业名称" width="150">
        </el-table-column>
        <el-table-column prop="indexName" label="指标指数类型" width="120">
        </el-table-column>
        <el-table-column prop="sourceName" label="数据来源" width="90">
        </el-table-column>
        <el-table-column prop="enddate" label="最后更新日期" width="120">
        </el-table-column>
        <el-table-column fixed="right" label="操作" width="150">
          <template slot-scope="scope">
            <el-button @click.native.prevent="handleDelete(scope.$index, chooseIndexData)" type="danger" size="small">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination background layout="prev, pager, next" :total="totalOfChoose" :page-size="pageSize" :current-page.sync="currentPageOfChoose" @current-change="handleCurrentChangeOfChoose"></el-pagination>
    </div>
  </div>
</template>

<script>
import qs from "qs";
export default {
  data: function() {
    return {
      url: {
        allIndexDataUrl:
          "http://192.168.1.5:8768/indexcListCnfig/findIndexList",
        chooseIndexDataUrl:
          "http://192.168.1.5:8768/indexcListCnfig/findIndexListInfoForChoiced",
        removeToRightUrl:
          "http://192.168.1.5:8768/indexcListCnfig/modifyIndexListInfoChoiced",
        removeToLeftUrl:
          "http://192.168.1.5:8768/indexcListCnfig/modifyIndexListChoicedInfoToDelete"
      },
      pageSize: 10,
      // 所有指标
      allIndexData: [],
      currentPageOfAll: 1,
      totalOfAll: 10,
      multipleTableOfAll: [],
      // 所选指标
      chooseIndexData: [],
      currentPageOfChoose: 1,
      totalOfChoose: 10,
      multipleTableOfChoose: []
    };
  },
  methods: {
    // 右侧表操作
    handleCurrentChangeOfAll(val) {
      var self = this;
      self.currentPageOfAll = val;
      self.getTableData({
        url: self.url.allIndexDataUrl,
        page: self.currentPageOfAll,
        size: self.pageSize,
        type: "all"
      });
    },
    handleSelectionChangeOfAll(val) {
      var self = this;
      self.multipleTableOfAll = val;
    },
    handleAdd2Right(index, row) {
      var self = this;
      self.operate({
        url: self.url.removeToRightUrl,
        list: [row.itemId]
      });
    },
    handleAdd2Rights() {
      var self = this,
        list = [];
      self.multipleTableOfAll.forEach(function(v) {
        list.push(v.itemId);
      });
      if (list.length == 0) {
        alert("请选择指标！");
      } else {
        self.operate({
          url: self.url.removeToRightUrl,
          list: list
        });
      }
    },
    // 左侧表操作
    handleCurrentChangeOfChoose(val) {
      var self = this;
      self.currentPageOfChoose = val;
      self.getTableData({
        url: self.url.chooseIndexDataUrl,
        page: self.currentPageOfChoose,
        size: self.pageSize,
        type: "part"
      });
    },
    handleSelectionChangeOfChoose(val) {
      var self = this;
      self.multipleTableOfChoose = val;
    },
    handleDelete(index, rows) {
      var self = this;
      this.$confirm("是否确定删除?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$message({
            type: "success",
            message: "删除成功!"
          });
          self.operate({
            url: self.url.removeToLeftUrl,
            list: [rows[index].itemId]
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    handleDeletes() {
      var self = this,
        list = [];
      self.multipleTableOfChoose.forEach(function(v) {
        list.push(v.itemId);
      });
      if (list.length == 0) {
        alert("请选择指标！");
      } else {
        self.operate({
          url: self.url.removeToLeftUrl,
          list: list
        });
      }
    },
    operate(param) {
      var self = this;
      self.$axios
        .post(
          param.url,
          qs.stringify({
            itemList: param.list.join(",")
          })
        )
        .then(function(res) {
          if (res.data.resultCode == "200") {
            self.getTableData({
              url: self.url.allIndexDataUrl,
              page: self.currentPageOfAll,
              size: self.pageSize,
              type: "all"
            });
            self.getTableData({
              url: self.url.chooseIndexDataUrl,
              page: self.currentPageOfChoose,
              size: self.pageSize,
              type: "part"
            });
          }
        })
        .catch(function(err) {
          console.log(err);
        });
    },
    getTableData(param) {
      var self = this;
      self.$axios
        .post(
          param.url,
          qs.stringify({
            page: param.page,
            size: param.size
          })
        )
        .then(function(res) {
          if (res.data.resultCode == "200") {
            if (param.type == "all") {
              self.allIndexData = res.data.resultBody.list;
              self.totalOfAll = res.data.resultBody.total;
            } else {
              self.chooseIndexData = res.data.resultBody.list;
              self.totalOfChoose = res.data.resultBody.total;
            }
          } else if (res.data.resultCode == "201") {
            alert("暂时没有数据！");
          }
        })
        .catch(function(err) {
          console.log(err);
        });
    }
  },
  mounted() {
    var self = this;
    if (localStorage.username == undefined) {
      self.$router.push("/login");
    }
    self.getTableData({
      url: self.url.allIndexDataUrl,
      page: self.currentPageOfAll,
      size: self.pageSize,
      type: "all"
    });
    self.getTableData({
      url: self.url.chooseIndexDataUrl,
      page: self.currentPageOfChoose,
      size: self.pageSize,
      type: "part"
    });
  }
};
</script>
<style>
.allDataTable,
.partDataTable {
  width: 47%;
  display: inline-block;
}
.btns {
  width: 6%;
  display: inline-block;
}
.allDataTable {
  float: left;
}
.partDataTable {
  float: right;
}
h4 {
  margin-bottom: 20px;
}
.btns .toRight {
  margin: 270px auto 0 auto;
  display: block;
}
.btns .toLeft {
  margin-left: -20px;
  left: 50%;
  position: absolute;
  top: 380px;
}
#index-manage .el-table .cell {
  height: 36px !important;
  line-height: 18px !important;
}
</style>