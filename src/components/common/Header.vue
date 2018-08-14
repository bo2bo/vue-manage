<template>
  <div class="header">
    <div class="logo">
      <img src="../../../static/img/logo.png" style="margin-top: 10px;">
    </div>
    <div class="tabbar">
      <el-menu :default-active="onRoutes" class="el-menu-demo" background-color="#242f42" text-color="#fff" unique-opened router mode="horizontal">
        <template v-for="item in items">
          <template v-if="item.subs">
            <el-submenu :index="item.index">
              <template slot="title">
                <!-- <i :class="item.icon"></i> -->
                {{ item.title }}</template>
              <el-menu-item v-for="(subItem,i) in item.subs" :key="i" :index="subItem.index">{{ subItem.title }}
              </el-menu-item>
            </el-submenu>
          </template>
          <template v-else>
            <el-menu-item :index="item.index">
              <i :class="item.icon"></i>{{ item.title }}
            </el-menu-item>
          </template>
        </template>
      </el-menu>
    </div>
    <div class="user-info">
      <el-dropdown trigger="click" @command="handleCommand">
        <span class="el-dropdown-link">
          <img class="user-logo" src="../../../static/img/img.jpg"> {{username}}
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="loginout">退出</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      name: "bo_oc",
      items: [
        {
          // icon: "el-icon-document",
          index: "meetinglist",
          title: "会议列表"
        },
        {
          // icon: "el-icon-star-on",
          index: "sendemails",
          title: "发送邮件"
        },
        {
          // icon: "el-icon-star-on",
          index: "1",
          title: "数据管理",
          subs: [
            {
              index: "indexmanage",
              title: "指标管理"
            },
            {
              index: "colormanage",
              title: "颜色管理"
            }
          ]
        },
        {
          // icon: "el-icon-menu",
          index: "2",
          title: "二级菜单",
          subs: [
            {
              index: "test1",
              title: "测试一"
            },
            {
              index: "test2",
              title: "测试二"
            },
            {
              index: "test3",
              title: "测试三"
            }
          ]
        },
        {
          index: "mytest",
          title: "测试"
        }
      ]
    };
  },
  computed: {
    username() {
      let username = localStorage.getItem("ms_username");
      return username ? username : this.name;
    },
    onRoutes() {
      return this.$route.path.replace("/", "");
    }
  },
  methods: {
    handleCommand(command) {
      if (command == "loginout") {
        localStorage.removeItem("ms_username");
        this.$router.push("/login");
      }
    }
  }
};
</script>
<style scoped>
.header {
  position: relative;
  box-sizing: border-box;
  width: 100%;
  height: 68px;
  color: #fff;
  line-height: 68px;
}
.header .logo {
  float: left;
  width: 250px;
  text-align: center;
  line-height: 0;
}
.user-info {
  float: right;
  padding-right: 40px;
  font-size: 16px;
  color: #fff;
}
.user-info .el-dropdown-link {
  position: relative;
  display: inline-block;
  padding-left: 50px;
  color: #fff;
  cursor: pointer;
  vertical-align: middle;
}
.user-info .user-logo {
  position: absolute;
  left: 0;
  top: 15px;
  width: 40px;
  height: 40px;
  border-radius: 50%;
}
.el-dropdown-menu__item {
  text-align: center;
  line-height: 20px !important;
}
.el-popper[x-placement^="bottom"] {
  margin-top: -1px !important;
}
.tabbar {
  display: block;
  position: absolute;
  left: 250px;
  bottom: 0px;
  background: #2e363f;
}
.tabbar > ul {
  height: 100%;
}
.tabbar .el-menu--horizontal {
  border-bottom: solid 1px transparent !important;
}
@media only screen and (max-width: 1920px) {
  .tabbar .el-submenu .el-menu-item {
    min-width: 0px;
    padding: 0 45px !important;
  }
}
</style>
