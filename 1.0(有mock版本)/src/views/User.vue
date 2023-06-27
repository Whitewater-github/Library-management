<template>
  <div class="manage">
      <el-dialog
          title="提示"
          :visible.sync="dialogVisible"
          width="50%"
          :before-close="handleClose">
          <!-- 用户的表单信息 -->
          <el-form ref="form" :rules="rules" :inline="true" :model="form" label-width="80px">
              <el-form-item label="书名" prop="name">
                  <el-input placeholder="请输入书名" v-model="form.name"></el-input>
              </el-form-item>
              <el-form-item label="图书编码" prop="age">
                  <el-input placeholder="请输入图书编码" v-model="form.age"></el-input>
              </el-form-item>
              <el-form-item label="借或还" prop="sex">
                  <el-select v-model="form.sex" placeholder="请选择">
                      <el-option label="借" :value="1"></el-option>
                      <el-option label="还" :value="0"></el-option>
                  </el-select>
              </el-form-item>
              <el-form-item label="日期" prop="birth">
                  <el-date-picker
                      v-model="form.birth"
                      type="date"
                      placeholder="选择日期"
                      value-format="yyyy-MM-DD">
                  </el-date-picker>
              </el-form-item>
              <el-form-item label="出版社" prop="addr">
                  <el-input placeholder="请输入出版社" v-model="form.addr"></el-input>
              </el-form-item>
          </el-form>

          <span slot="footer" class="dialog-footer">
              <el-button @click="cancel">取 消</el-button>
              <el-button type="primary" @click="submit">确 定</el-button>
          </span>
      </el-dialog>
      <div class="manage-header">
          <el-button @click="handleAdd" type="primary">
              + 新增
          </el-button>
          <!-- form搜索区域 -->
          <el-form :inline="true" :model="userForm">
              <el-form-item>
                  <el-input placeholder="请输入书名" v-model="userForm.name"></el-input>
              </el-form-item>
              <el-form-item>
                  <el-button type="primary" @click="onSubmit">查询</el-button>
              </el-form-item>
          </el-form>
      </div>
      <div class="common-tabel">
          <el-table
              stripe
              height="90%"
              :data="tableData"
              style="width: 100%">
              <el-table-column
                  prop="name"
                  label="书名">
              </el-table-column>
              <el-table-column
                  prop="sex"
                  label="借或还">
                  <template slot-scope="scope">
                      <span>{{ scope.row.sex == 1 ? '借出' : '还入' }}</span>
                  </template>
              </el-table-column>
              <el-table-column
                  prop="age"
                  label="图书编码">
              </el-table-column>
              <el-table-column
                  prop="birth"
                  label="日期">
              </el-table-column>
              <el-table-column
                  prop="addr"
                  label="出版社">
              </el-table-column>
              <el-table-column
                  prop="addr"
                  label="操作">
                  <template slot-scope="scope">
                      <el-button size="mini" @click="handleEdit(scope.row)">编辑</el-button>
                      <el-button type="danger" size="mini" @click="handleDelete(scope.row)">删除</el-button>
                  </template>
              </el-table-column>
          </el-table>
          <div class="pager">
              <el-pagination
                  layout="prev, pager, next"
                  :total="total"
                  @current-change="handlePage">
              </el-pagination>
          </div>
      </div>
  </div>
</template>
<script>
import { getUser, addUser, editUser, delUser } from '../api'
export default {
  data() {
      return {
          dialogVisible: false,
          form: {
              name: '',
              age: '',
              sex: '',
              birth: '',
              addr: ''
          },
          rules: {
              name: [
                  { required: true, message: '请输入书名' }
              ],
              age: [
                  { required: true, message: '请输入借或者还' }
              ],
              sex: [
                  { required: true, message: '请选择图书编码' }
              ],
              birth: [
                  { required: true, message: '请选择日期' }
              ],
              addr: [
                  { required: true, message: '请输入出版社' }
              ]
          },
          tableData: [],
          modalType: 0, // 0表示新增的弹窗， 1表示编辑
          total: 0, //当前的总条数
          pageData: {
              page: 1,
              limit: 10
          },
          userForm: {
              name: ''
          }
      }
  },
  methods: {
      // 提交用户表单
      submit() {
          this.$refs.form.validate((valid) => {
              // console.log(valid, 'valid')
              if (valid) {
                  // 后续对表单数据的处理
                  if (this.modalType === 0) {
                      addUser(this.form).then(() => {
                          // 重新获取列表的接口
                          this.getList()
                      })
                  } else {
                      editUser(this.form).then(() => {
                          // 重新获取列表的接口
                          this.getList()
                      })
                  }

                  // 清空表单的数据
                  this.$refs.form.resetFields()
                  // 关闭弹窗
                  this.dialogVisible = false
              }
          })
      },
      // 弹窗关闭的时候
      handleClose() {
          this.$refs.form.resetFields()
          this.dialogVisible = false
      },
      cancel() {
          this.handleClose()
      },
      handleEdit(row) {
          this.modalType = 1
          this.dialogVisible = true
          // 注意需要对当前行数据进行深拷贝，否则会出错
          this.form = JSON.parse(JSON.stringify(row))
      },
      handleDelete(row) {
          this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
              }).then(() => {
                  delUser({ id: row.id }).then(() => {
                      this.$message({
                          type: 'success',
                          message: '删除成功!'
                      });
                      // 重新获取列表的接口
                      this.getList()
                  })
                  
              }).catch(() => {
                  this.$message({
                      type: 'info',
                      message: '已取消删除'
                  });          
          });
      },
      handleAdd() {
          this.modalType = 0
          this.dialogVisible = true
      },
      // 获取列表的数据
      getList() {
          // 获取的列表的数据
          getUser({params: {...this.userForm, ...this.pageData}}).then(({ data }) => {
              console.log(data)
              this.tableData = data.list

              this.total = data.count || 0
          })
      },
      // 选择页码的回调函数
      handlePage(val) {
          // console.log(val, 'val')
          this.pageData.page = val
          this.getList()
      },
      // 列表的查询
      onSubmit() {
          this.getList()
      }
  },
  mounted () {
      this.getList()
  }
}
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