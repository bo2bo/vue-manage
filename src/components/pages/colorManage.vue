<template>
  <div class="color-manage" id="color-manage">
    <el-row>
      <el-col :xs="20" :sm="16" :md="12" :lg="9" :xl="8">
        <el-select v-model="selectData.value" placeholder="请选择" style="width:30%;" @change="handleIndexChange">
          <el-option v-for="item in selectData.options" :key="item.value" :label="item.label" :value="item.id" :disabled="item.disabled">
          </el-option>
        </el-select>
        <el-button type="primary" @click="search()">搜索</el-button>
      </el-col>
    </el-row>
    <div v-for="item in colorData" :key="item.id" class="block">
      <span class="demonstration">{{item.industryName}}</span>
      <el-color-picker v-model="item.colourCode" @change="handleColorChange" :id="item.choiceId" :popper-class="item.choiceId"></el-color-picker>
    </div>
  </div>
</template>
<script>
import qs from "qs";
export default {
  data: function() {
    return {
      url: {
        listUrl: this.GLOBAL.url2 + "colourConfig/findColourDropDownList",
        colorUrl: this.GLOBAL.url2 + "colourConfig/findColourListByType",
        updateUrl: this.GLOBAL.url2 + "colourConfig/updateColourInfo"
      },
      selectData: {
        options: [],
        value: "",
        selectId: ""
      },
      colorData: []
    };
  },
  methods: {
    search() {
      var self = this;
      self.getData({
        type: "color",
        url: self.url.colorUrl,
        data: self.selectData.selectId
      });
    },
    handleIndexChange(val) {
      var self = this;
      self.selectData.selectId = val;
    },
    handleColorChange(val) {
      var self = this;
      var choiceId;
      event.path.forEach(function(v) {
        if (
          v.className != undefined &&
          v.className != "" &&
          v.className.indexOf("el-color-picker__panel") != -1
        ) {
          choiceId = v.className.split(" ")[2];
        }
      });
      self.$axios
        .post(
          self.url.updateUrl,
          qs.stringify({
            choiceId: parseInt(choiceId),
            colourCode: val
          })
        )
        .then(function(res) {
          if (res.data.resultCode == "200") {
            self.$message({
              message: "修改成功",
              type: "success"
            });
          }
        })
        .catch(function(err) {
          console.log(err);
        });
    },
    getData(param) {
      var self = this;
      self.$axios
        .post(
          param.url,
          qs.stringify({
            type: parseInt(param.data)
          })
        )
        .then(function(res) {
          if (res.data.resultCode == "200") {
            if (param.type == "list") {
              self.selectData.options = res.data.resultBody;
              self.selectData.value = res.data.resultBody[0].label;
              self.selectData.selectId = res.data.resultBody[0].id;
            } else {
              self.colorData = res.data.resultBody;
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
    self.getData({
      type: "list",
      url: self.url.listUrl,
      data: 0
    });
  }
};
</script>
<style>
.color-manage .el-col {
  border-radius: 4px;
}
.color-manage .block {
  padding: 30px 0;
  text-align: center;
  border-right: 1px solid #eff2f6;
  display: inline-block;
  width: 20%;
  box-sizing: border-box;
}
.color-manage .demonstration {
  display: block;
  color: #8492a6;
  font-size: 14px;
  margin-bottom: 20px;
}
</style>
