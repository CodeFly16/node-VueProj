<template>
  <a-layout id="components-layout-demo-side" style="min-height: 100vh">
    <a-layout-sider v-model="collapsed" collapsible>
      <router-link to="/main">
        <div>
          <img src="../assets/Logo.jpg" alt="" class="logo">
          <span style="color: #ffffff">
          数据库课设
        </span>
        </div>
      </router-link>


      <a-menu theme="dark"
              :default-selected-keys="defaultSelectedKeys"
              mode="inline"
              :default-open-keys="defaultOpenKeys"
              @click="select">
        <template v-for="item in menu">
          <a-sub-menu :key="item.path" v-if="item.children.length!==0">
            <span slot="title"><a-icon :type="item.icon"/><span>{{ item.title }}</span></span>
            <template v-for="childItem in item.children">
              <a-menu-item :key="childItem.path">
                {{ childItem.title }}
              </a-menu-item>
            </template>
          </a-sub-menu>
          <a-menu-item :key="item.path" v-else>
            {{ item.title }}
          </a-menu-item>
        </template>
      </a-menu>
    </a-layout-sider>
    <a-layout>
      <a-layout-header style="background: #fff; padding: 0">
        <div style="float: right;margin:auto 30px">用户名</div>
        <a-dropdown style="float: right">
          <a class=" ant-dropdown-link" @click="e => e.preventDefault()">
            <a-icon type="setting" theme="filled"/>
            设置
            <a-icon type="down"/>
          </a>
          <a-menu slot="overlay">
            <a-menu-item>
              <a @click="logOut">注销</a>
            </a-menu-item>
          </a-menu>
        </a-dropdown>
        <div>
        </div>
      </a-layout-header>
      <a-layout-content style="margin: 0 16px">
        <a-breadcrumb style="margin: 10px 0">
          <a-breadcrumb-item v-for="item in  breadData" :key="item">{{ item }}</a-breadcrumb-item>
        </a-breadcrumb>
        <router-view></router-view>
        <div :style="{ padding: '24px', background: '#fff', minHeight: '360px' }" v-if="$route.path === '/main'">
          Welcome
        </div>
      </a-layout-content>
      <a-layout-footer style="text-align: center">
        长江大学 ©2020 Created by 李逸飞
      </a-layout-footer>
    </a-layout>
  </a-layout>
</template>

<script>
export default {
  name: "Main",
  data() {
    return {
      menu: [
        {
          path: '/testSix',
          title: '上机六',
          icon: 'windows',
          children: [
            {
              title: '读者类别',
              path: '/readerCategory',
              children: []
            },
            {
              title: '图书管理',
              path: '/libraryManagement',
              children: []
            },
            {
              title: '读者管理',
              path: '/readerManagement',
              children: []
            }
          ]
        },
        {
          path: '/readerManagement',
          title: '读者管理',
          icon: 'user',
          children: [
            {
              title: '借书证管理',
              path: '/libraryCardManagement',
              children: []
            },
          ]
        },
        {
          path: '/bookManagement',
          title: '图书管理',
          icon: 'bank',
          children: [
            {
              title: '图书编目',
              path: '/bookCatalog',
              children: []
            },
            {
              title: '图书维护',
              path: '/bookMaintenance',
              children: []
            },
          ]
        },
        {
          path: '/borrowManagement',
          title: '借阅管理',
          icon: 'bulb',
          children: [
            {
              title: '借阅管理',
              path: '/borrowManagement',
              children: []
            },
          ]
        },
        {
          path: '/userManagement',
          title: '用户管理',
          icon: 'block',
          children: [
            {
              title: '用户权限管理',
              path: '/userAuthority',
              children: []
            },
          ]
        },
      ],
      collapsed: false,
      breadData: ['上机六', '读者类别'],
      defaultSelectedKeys: [],
      defaultOpenKeys: []
    }
  },
  created() {
    if (this.$route.path !== '/main') {

      let path = this.$route.path.split('/')
      this.defaultSelectedKeys = ['/' + path[2]]
      this.defaultOpenKeys = ['/' + path[1]]
    } else {
      this.defaultSelectedKeys = []
      this.defaultOpenKeys = []
    }

  },
  methods: {
    logOut() {
      this.$message.success("注销成功")
      localStorage.removeItem("token")
      console.log(localStorage.getItem("token"))
      this.$router.push("/login")
    },
    select(e) {
      let path = ''
      e.keyPath.reverse().forEach(item => {
        path += item
      })
      this.$router.push(path)
      console.log(e)
    },
  }
}
</script>

<style scoped>
#components-layout-demo-side .logo {
  height: 32px;
  background: rgba(255, 255, 255, 0.2);
  margin: 16px;
}
</style>