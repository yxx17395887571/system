<template>
  <div>
    <el-row>
      <el-container>
        <el-col :span="4">
          <el-aside>
            <div class="logo">LOGO</div>
            <div class="msg">
              <p>
                {{account}}
                <br />
                <span>{{usermail}}</span>
              </p>
              <p @click="goLogin">退出登录</p>
            </div>
            <!-- <div class="msg">
              <p>
                {{$store.state.account}}
                <br />
                <span>{{$store.state.usermail}}</span>
              </p>
              <p @click="goLogin">退出登录</p>
            </div> -->
            <ul>
              <li v-for="(item,i) in arr" :key="i">
                <router-link :to="{path:item.path,query:{name:item.meta.info}}">
                  <i :class=item.meta.icon></i>
                  {{item.meta.info}}
                  </router-link>
              </li>
            </ul>
          </el-aside>
        </el-col>
        <el-col :span="20">
          <router-view></router-view>
        </el-col>
      </el-container>
    </el-row>
  </div>
</template>
<script>
export default {
  data() {
    return {
      arr: [],
      account:sessionStorage.getItem('account'),
      usermail:sessionStorage.getItem('usermail')
    };
  },
  mounted() {
    this.arr = this.$router.options.routes[3].children;
    this.$router.push({
      path: "/user",
      query: { name: this.$router.options.routes[3].children[0].meta.info }
    });
  },
  methods: {
    goLogin() {
      this.$router.push("/login");
    }
  }
};
</script>
<style lang="less" scoped>
.el-row {
  width: 100%;
  height: 100%;
}
.el-container {
  width: 100%;
  height: 100%;
}
.el-col > div {
  width: 100%;
  height: 100%;
}
.el-aside {
  width: 100% !important;
  height: 100%;
  background: #4d5e70;
  .logo {
    width: 100%;
    height: 60px;
    text-align: center;
    line-height: 60px;
    background: #354457;
    color: #fff;
    font-weight: bold;
    font-size: 16px;
  }
  .msg {
    width: 100%;
    height: 110px;
    padding: 20px 0 0 20px;
    box-sizing: border-box;
    font-size: 12px;
    color: #cccccc;
    border-bottom: 1px solid #354457;
    & > p:last-of-type {
      margin-top: 23px;
      text-decoration: underline;
    }
  }
  ul {
    width: 100%;
    margin-top: 40px;
    li {
      width: 100%;
      height: 40px;
      line-height: 40px;
      a {
        display: block;
        width: 100%;
        height: 100%;
        text-decoration: none;
        font-size: 12px;
        color: #fff;
        text-indent: 15px;
      }
      .router-link-exact-active {
        color: yellowgreen;
        background: #3d4e60;
      }
    }
  }
}
</style>