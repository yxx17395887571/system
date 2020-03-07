<template>
  <div>
    <el-container>
      <el-header>
        <el-button type="warning" plain @click="add=true">新增用户</el-button>
        <div class="right">
          <el-input placeholder="请输入关键字" v-model="searchVal" clearable></el-input>
          <el-button type="warning" plain @click="search">搜索</el-button>
        </div>
      </el-header>
      <el-main>
        <el-breadcrumb separator="/">
          <el-breadcrumb-item
            :to="{ path: '/user',query: { name: this.$router.options.routes[3].children[0].meta.info } }"
          >首页</el-breadcrumb-item>
          <el-breadcrumb-item>{{this.$route.query.name}}</el-breadcrumb-item>
        </el-breadcrumb>

        <el-table :data="tableData" border style="width: 100%;margin-top:20px">
          <el-table-column prop="id" label="ID" width="80"></el-table-column>
          <el-table-column prop="name" label="姓名" width="100"></el-table-column>
          <el-table-column prop="age" label="年龄" width="100"></el-table-column>
          <el-table-column prop="sex" label="性别" width="100"></el-table-column>
          <el-table-column prop="statusnumber" label="身份证号码" width="240"></el-table-column>
          <el-table-column prop="phone" label="手机号码" width="215"></el-table-column>
          <el-table-column label="操作" width="160">
            <template slot-scope="scope">
              <el-button size="mini" type="primary" @click="amendUser(scope.$index, scope.row)">修改</el-button>
              <el-button size="mini" type="danger" @click="del(scope.$index, scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="page"
            :current-page.sync="currentPage2"
            :page-sizes="[5, 10, 15, 20]"
            :page-size="pageSize"
            layout="sizes, prev, pager, next"
            :total="total">
        </el-pagination>
      </el-main>
    </el-container>

    <!-- 添加用户 -->
    <div class="add" v-show="add">
      <div id="login">
        <div class="login">
          <header style="margin-bottom: 10px">
            <el-button style="border:none;border-bottom: 3px solid #4D5E70;border-radius: 0;">新增用户</el-button>
          </header>
          <el-form :model="addObj" :rules="rules" ref="ruleForm" class="demo-dynamic">
             <el-form-item prop="name">
              <el-input v-model="addObj.name" clearable placeholder="姓名" style="width:100%;"></el-input>
            </el-form-item>
            <el-form-item prop="age">
              <el-input v-model="addObj.age" clearable placeholder="年龄" style="width:100%;"></el-input>
            </el-form-item>
            <el-form-item prop="sex">
              <el-input v-model="addObj.sex" clearable placeholder="性别" style="width:100%;"></el-input>
            </el-form-item>
            <el-form-item prop="statusnumber">
              <el-input v-model="addObj.sex" clearable placeholder="身份证号" style="width:100%;"></el-input>
            </el-form-item>
            <el-form-item prop="phone">
              <el-input v-model="addObj.sex" clearable placeholder="手机号" style="width:100%;"></el-input>
            </el-form-item>
            <footer>
            <el-button
              @click="addUser('ruleForm')"
              type="success"
              style="background:#4D5E70;border:none;border-radius: 0"
            >确定</el-button>
            <el-button
              style="border:none;border: 1px solid #4D5E70;border-radius: 0;"
              @click="add=false"
            >取消</el-button>
            <el-button @click="resetForm('ruleForm')">重置</el-button>
          </footer>
          </el-form>
        </div>
      </div>
    </div>

    <!-- 修改用户 -->
    <div class="amend" v-show="amend">
      <div id="login">
        <div class="login">
          <header style="margin-bottom: 10px">
            <el-button style="border:none;border-bottom: 3px solid #4D5E70;border-radius: 0;">修改用户</el-button>
          </header>
          <el-input placeholder="姓名" v-model="amendObj.name" style="width:100%;margin-bottom:8px;"></el-input>
          <el-input placeholder="年龄" v-model="amendObj.age" style="width:100%;margin-bottom:8px;"></el-input>
          <el-input placeholder="性别" v-model="amendObj.sex" style="width:100%;margin-bottom:8px;"></el-input>
          <el-input
            placeholder="身份证号"
            v-model="amendObj.statusnumber"
            style="width:100%;margin-bottom:8px;"
          ></el-input>
          <el-input
            placeholder="手机号"
            v-model="amendObj.phone"
            style="width:100%;margin-bottom:8px;"
          ></el-input>
          <footer>
            <el-button
              @click="amendOk()"
              type="success"
              style="background:#4D5E70;border:none;border-radius: 0"
            >确定</el-button>
            <el-button
              style="border:none;border: 1px solid #4D5E70;border-radius: 0;"
              @click="amend=false"
            >取消</el-button>
          </footer>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      tableData: [],
      addObj: {},
      amendObj: { name: "", age: "", sex: "", statusnumber: "", phone: "" },
      add: false,
      amend: false,
      searchVal: "",
      pageSize: 5,
      num: 1,
      total: 0,
      flag: 0,
      info: 0,
      pageArr: [],
      currentPage2:1,
      rules:{
       name:[
         {required:true,message:"账号不能为空!",trigger:'blur'}
       ],
       age:[
          {required:true,message:"密码不能为空!",trigger:'blur'}
       ],
       sex:[
          {required:true,message:"邮箱不能为空!",trigger:'blur'}
       ],
       statusnumber:[
          {required:true,message:"邮箱不能为空!",trigger:'blur'}
       ],
       phone:[
          {required:true,message:"邮箱不能为空!",trigger:'blur'}
       ]
     }
    };
  },
  mounted() {
    this.getData();
    this.page();
  },
  methods: {
    handleSizeChange(newSize){
      console.log(newSize)
          this.pageSize = newSize;
          console.log(this.pageSize)
          this.page()
        },
        //重置
    resetForm(formName) {
        this.$refs[formName].resetFields();
      },
    //页面初始化
    getData() {
      this.$axios
        .get("loaduser/", {
          params: { account: sessionStorage.getItem("account") }
        })
        .then(res => {
          if (res.data == null) {
            this.total = 0;
          } else {
            this.total = res.data.length;
          }
        });
    },
    //分页
    page(num) {
      this.num = num || this.num;
      if (this.flag == 0) {
        this.$axios
          .get("Pagination/", {
            params: {
              account: sessionStorage.getItem("account"),
              pagenum: this.num,
              pagelen: this.pageSize
            }
          })
          .then(res => {
            this.tableData = res.data.list;
          });
      } else {
        this.info = Math.ceil(this.tableData.length / this.pageSize);
        for (var i = 0; i < this.info; i++) {
          this.pageArr.push(
            this.tableData.slice(i * this.pageSize, (i + 1) * this.pageSize)
          );
        }
        this.tableData = this.pageArr[this.num - 1];
      }
    },
    //删除
    del(i, obj) {
      if (confirm("确定删除吗？")) {
        this.$axios
          .get("deleteuser/", {
            params: {
              account: sessionStorage.getItem("account"),
              user_id: obj.id
            }
          })
          .then(res => {
            this.getData();
            this.page();
            this.$message({
              type: "success",
              message: "删除成功!"
            });
          });
      }
    },
    //新增
    addUser(formName) {
      this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$axios.get("newadduser/", {
            params: this.addObj
          })
          .then(res => {
            if (res.data.statusCode == 0) {
              this.getData();
              this.page();
              this.addObj = {};
              this.$message({
                type: "success",
                message: "添加成功!"
              });
            } else if (res.data.statusCode == 1) {
              this.$message({
                type: "success",
                message: "用户已存在!"
              });
            } else {
              this.$message({
                type: "success",
                message: "添加失败!"
              });
            }
          });
          this.add = false;
          } 
        })
    },
    //查询
    search() {
      this.flag = 1;
      this.$axios
        .get("searchuser/", {
          params: {
            value: this.searchVal
          }
        })
        .then(res => {
          this.tableData = res.data;
          this.total = res.data.length;
          this.page();
          this.searchVal = "";
        });
    },
    //修改
    amendUser(i, obj) {
      this.amend = true;
      this.amendObj.name = obj.name;
      this.amendObj.age = obj.age;
      this.amendObj.sex = obj.sex;
      this.amendObj.phone = obj.phone;
      this.amendObj.statusnumber = obj.statusnumber;
      this.amendObj.user_id = obj.id;
    },
    amendOk() {
      this.$confirm("此操作将永久修改该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$axios
            .get("/userupdate/", {
              params: this.amendObj
            })
            .then(res => {
              if (res.data.statusCode == 0) {
                this.getData();
                this.page();
                this.amend = false;
                this.$message({
                  type: "success",
                  message: "修改成功!"
                });
              } else {
                this.$message({
                  type: "success",
                  message: "修改失败!"
                });
              }
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消修改"
          });
        });
    }
  }
};
</script>
<style lang="less" scoped>
.el-container {
  width: 100%;
  height: 100%;
  .el-header {
    height: 60px;
    background: #fff;
    display: flex;
    justify-content: space-between;
    line-height: 60px;
    .right {
      display: flex;
      justify-content: space-between;
    }
    .el-button {
      height: 40px;
      padding: 0;
      line-height: 30px;
      text-align: center;
      width: 90px;
      display: inline-block;
      margin-top: 10px;
    }
  }
  .el-main {
    background: #eff3f6;
    width: 100%;
    height: 100%;
  }
}
#login {
  width: 100%;
  height: 100%;
  position: fixed;
  left: 0;
  top: 0;
  background: #4d5e70;
  background: rgba(0, 0, 0, 0.5);
  .login {
    width: 300px;
    height: 425px;
    margin: 120px auto;
    background: #fff;
    padding: 10px 15px;
    box-sizing: border-box;
  }
}
.el-table::before{
  height: 0;
}
.el-table--border::after{
  width: 0;
}
</style>