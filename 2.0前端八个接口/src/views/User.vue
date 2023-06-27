<template>
  <div class="manage">
    <el-dialog
      title="编辑"
      :visible.sync="dialogVisible2"
      width="50%"
    >
      <!-- 用户的表单信息 -->
      <el-form
        ref="form"
        :rules="rules"
        :inline="true"
        :model="form1"
        label-width="80px"
      >
        <el-form-item label="书名" prop="bookname">
          <el-input placeholder="请输入书名" v-model="form1.bookname"></el-input>
        </el-form-item>
        <el-form-item label="作者" prop="writer">
          <el-input placeholder="请输入作者" v-model="form1.writer"></el-input>
        </el-form-item>
        <el-form-item label="出版社" prop="xiangqing">
          <el-input
            placeholder="请输入出版社"
            v-model="form1.xiangqing"
          ></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible2 = false">取 消</el-button>
        <el-button type="primary" @click="submit2">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog :visible.sync="dialogVisible1" width="30%" title="刪除">
      <span>是否刪除</span>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submit1">确认</el-button>
        <el-button @click="dialogVisible1 = false">取消</el-button>
      </span>
    </el-dialog>
    <el-dialog
      title="添加"
      :visible.sync="dialogVisible"
      width="50%"
      :before-close="handleClose"
    >
      <!-- 用户的表单信息 -->
      <el-form
        ref="form"
        :rules="rules"
        :inline="true"
        :model="form"
        label-width="80px"
      >
        <el-form-item label="书名" prop="bookname">
          <el-input placeholder="请输入书名" v-model="form.bookname"></el-input>
        </el-form-item>
        <el-form-item label="作者" prop="writer">
          <el-input placeholder="请输入作者" v-model="form.writer"></el-input>
        </el-form-item>
        <el-form-item label="出版社" prop="xiangqing">
          <el-input
            placeholder="请输入出版社"
            v-model="form.xiangqing"
          ></el-input>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="submit">确 定</el-button>
      </span>
    </el-dialog>
    <div class="manage-header">
      <el-button @click="handleAdd" type="primary"> + 添加 </el-button>
      <!-- form搜索区域 -->
      <el-form :inline="true" :model="userForm">
        <el-form-item>
          <el-input
            placeholder="请输入书名"
            v-model="search"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">查询</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="common-tabel">
      <el-table stripe height="90%" :data="tableData" style="width: 100%">
        <el-table-column prop="bookname" label="书名"> </el-table-column>
        <el-table-column prop="writer" label="作者"> </el-table-column>
        <el-table-column prop="xiangqing" label="出版社"> </el-table-column>
        <el-table-column prop="state" label="状态"> </el-table-column>
        <el-table-column  label="操作" width="250px">
          <template slot-scope="scope">
            <el-button type="primary" icon="el-icon-edit" circle @click="handleEdit(scope.row)"></el-button>
           <el-button type="danger" icon="el-icon-delete" circle @click="handleDelete(scope.row)"></el-button>
            <el-button round size="mini" @click="borbook(scope.row)"
              >借书</el-button
            >
            <el-button round size="mini" @click="returnbook(scope.row)"
              >还书</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <div class="pager">
        <el-pagination
          layout="prev, pager, next"
          :total="total"
          @current-change="handlePage"
        >
        </el-pagination>
      </div>
    </div>
  </div>
</template>
<script>
// import console from 'console'
import { addBook, deleteBook, getBook, findBook, updataBook ,reBook,borrowBook} from "@/api/data";
export default {
  data() {
    return {
        search:'',//查询名字
      dialogVisible: false,
      dialogVisible1: false,
      dialogVisible2: false,
      row: {},
      form: {
        bookname: "",
        writer: "",
        xiangqing: "",
        state: "新",
      },
      //编辑的表
      form1: {
        
      },
      rules: {
        bookname: [{ required: true, message: "请输入书名" }],
        writer: [{ required: true, message: "请输入作者" }],
        xiangqing: [{ required: true, message: "请输入出版社" }],
      },
      tableData:[],
      modalType: 0, // 0表示新增的弹窗， 1表示编辑
      total: 0, //当前的总条数
      pageData: {
        page: 1,
        limit: 10,
      },
      userForm: {
        bookname: "",
      },
    };
  },
  mounted() {
    this.getBookList();
  },
  methods: {
    //借书
    borbook(row){
      const params = row;
      borrowBook(params).then((res) => {
        console.log("res4", res);
        if (res.data.code == "200") {
          this.$message.success("借书成功");
          this.getBookList();
        } else {
          this.$message.warning("借书失败");
        }
      });
    },
    //还书
    returnbook(row){
      const params = row;
      reBook(params).then((res) => {
        console.log("res5", res);
        if (res.data.code == "200") {
          this.$message.success("还书成功");
          this.getBookList();
        } else {
          this.$message.warning("还书失败");
        }
      });
    },
    //查询
    onSubmit() {
      //this.getBookList();
      //this.findBook();
      const params = {
        bookname:this.search
      }

      findBook(params).then((res) => {
        // console.log("res4", res);
        if(res.data.code=='200') {
          this.$message.success("查询成功");
          //console.log("212",res.data.correct)
          this.tableData=[];
        } else {
          this.$message.warning("查询失败");
        }
        this.tableData = res.data.correct;
        console.log(this.tableData);
      });
    },
    //编辑
    handleEdit(row) {
      this.row = row;
      this.dialogVisible2 = true;
      // this.form1=row;
      this.form1 = JSON.parse(JSON.stringify(row))
      
    },
    submit2() {
      const params = this.form1;
      updataBook(params).then((res) => {
        console.log("res3", res);
        if (res.data == "200") {
          this.$message.success("编辑成功");
          this.getBookList();
        } else {
          this.$message.warning("编辑失败");
        }
        this.dialogVisible2 = false
      });
    },
    //删除
    handleDelete(row) {
      this.row = row;
      this.dialogVisible1 = true;
      
    },
    submit1() {
      const params = this.row;
      deleteBook(params).then((res) => {
        console.log("res2", res);

        if (res.data == "200") {
          this.$message.success("删除成功");
          this.getBookList();
          this.dialogVisible1 = false;
        } else {
          this.$message.warning("删除失败");
          this.dialogVisible1 = false;
        }
      });
    },
    //添加
    handleAdd() {
      this.modalType = 0;
      this.dialogVisible = true;
    },
    submit() {
      const params = this.form;
      addBook(params).then((res) => {
        console.log("res", res);
        this.dialogVisible = false;
        if (res.status == "200") {
          this.$message.success("添加成功");
          this.getBookList();
        } else {
          this.$message.warning("添加失败");
        }
      });
    },
    //得到所有图书
    getBookList() {
      getBook().then((res) => {
        console.log("res1", res);
        this.tableData = res.data;
      });
    },

    // 弹窗关闭的时候
    cancel() {
      this.handleClose();
    },
    handleClose() {
      //this.$refs.form.resetFields();
      this.dialogVisible = false;
      this.form={};
      //this.dialogVisible1 = false;
      //this.dialogVisible2 = false;
    },

    // 选择页码的回调函数
    handlePage(val) {
      // console.log(val, 'val')
      this.pageData.page = val;
      this.getBookList();
    },
  },
};
</script>
<style lang="less" scoped>
.manage {
  height: 90%;
  .manage-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .common-tabel {
    position: relative;
    height: calc(100% - 62px);
    .pager {
      position: absolute;
      bottom: 0;
      right: 20px;
    }
  }
}
</style>
