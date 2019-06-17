<template>

  <imp-panel>
    <h3 class="box-title" slot="header" style="width: 100%;">
      <el-button type="primary" icon="plus" @click="newAdd">新增</el-button>
      <el-button type="danger" icon="delete" @click="batchDelete">删除</el-button>

    </h3>
    <el-row slot="body" :gutter="24" style="margin-bottom: 20px;">
      <el-col :span="6" :xs="24" :sm="24" :md="6" :lg="6" style="margin-bottom: 20px;">
        <el-tree v-if="deptTree"
                 :data="deptTree"
                 ref="deptTree"
                 show-checkbox
                 highlight-current
                 :render-content="renderContent"
                 @node-click="handleNodeClick" clearable node-key="id"></el-tree>
      </el-col>
      <el-col :span="18" :xs="24" :sm="24" :md="18" :lg="18">
        <el-card class="box-card">
          <div class="text item">
            <el-form :model="form" ref="form">
              <el-form-item label="父级" :label-width="formLabelWidth">
                <!--<el-input v-model="form.parentId" auto-complete="off"></el-input>-->
                <!-- <el-select-tree v-model="form.parentId" :treeData="roleTree" :propNames="defaultProps" clearable
                                placeholder="请选择父级">
                </el-select-tree> -->
                  <el-select-tree v-model="form.parentId" :treeData="deptTree" clearable
                                placeholder="请选择上级部门">
                </el-select-tree>

              </el-form-item>
              <el-form-item label="名称" :label-width="formLabelWidth">
                <el-input v-model="form.name" auto-complete="off"></el-input>
              </el-form-item>
              <el-form-item label="部长" :label-width="formLabelWidth">
                <el-input v-model="form.deptLead" auto-complete="off"></el-input>
              </el-form-item>
              <el-form-item label="是否删除" :label-width="formLabelWidth">
                <el-radio class="radio" v-model="form.delFlag" label="1">是</el-radio>
                <el-radio class="radio" v-model="form.delFlag" label="0">否</el-radio>
              </el-form-item>
              <el-form-item label="排序" :label-width="formLabelWidth">
                <el-slider v-model="form.orderNum"></el-slider>
              </el-form-item>
              <el-form-item label="备注" :label-width="formLabelWidth">
                <el-input v-model="form.remark" auto-complete="off"></el-input>
              </el-form-item>

              
              <el-form-item label="" :label-width="formLabelWidth">
                <el-button type="primary" @click="onSubmit" v-text="form.deptId?'修改':'新增'"></el-button>
                <el-button type="info" @click="settingResource($event,form.deptId)" icon="setting" v-show="form.deptId && form.deptId!=null">配置资源
                </el-button>
                <el-button type="danger" @click="deleteSelected" icon="delete" v-show="form.deptId && form.deptId!=null">删除
                </el-button>
              </el-form-item>
            </el-form>
          </div>
        </el-card>

        <el-dialog title="配置资源" v-model="dialogVisible" size="tiny">
          <div class="select-tree">
          <el-scrollbar
            tag="div"
            class='is-empty'
            wrap-class="el-select-dropdown__wrap"
            view-class="el-select-dropdown__list">
          <el-tree
            :data="resourceTree"
            ref="resourceTree"
            show-checkbox
            check-strictly
            node-key="id"
            v-loading="dialogLoading"
            :props="defaultProps">
          </el-tree>
          </el-scrollbar>
          </div>
          <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="configRoleResources">确 定</el-button>
          </span>
        </el-dialog>
      </el-col>
    </el-row>
  </imp-panel>

</template>
<script>

  import panel from "../../components/panel.vue"
  import selectTree from "../../components/selectTree.vue"
  import treeter from "../../components/treeter"
  import * as sysApi from '../../services/sys'


  import * as api from "../../api"

  export default {
    mixins: [treeter],
    components: {
      'imp-panel': panel,
      'el-select-tree': selectTree,
    },
    data(){
      return {
        dialogLoading:false,
        dialogVisible:false,
        formLabelWidth: '100px',
        defaultProps: {
          children: 'children',
          label: 'name',
          id: "id",
        },
        deptTree: [],
        resourceTree:[],
        maxId:700000,
        form: {
          deptId: null,
          parentId: null,
          name: '',
          deptLead: '',
          orderNum: 0,
          delFlag: '1',
          remark:''
        }
      }
    },
    methods: {
      configRoleResources(){
        let checkedKeys = this.$refs.resourceTree.getCheckedKeys();
        this.$http.get(api.SYS_SET_ROLE_RESOURCE + "?roleId=" + this.form.id + "&resourceIds="+checkedKeys.join(','))
          .then(res => {
            this.$message('修改成功');
            this.dialogVisible = false;
          })
      },
      handleNodeClick(data){
        this.form = data;
      },
      newAdd(){
        this.form = {
          deptId: null,
          parentId: null,
          name: '',
          deptLead: '',
          orderNum: 0,
          delFlag: '1',
          remark:''
        };
      },
      batchDelete(){
        var checkKeys = this.$refs.roleTree.getCheckedKeys();
        if (checkKeys == null || checkKeys.length <= 0) {
          this.$message.warning('请选择要删除的资源');
          return;
        }
        this.$confirm('确定删除?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$http.get(api.SYS_ROLE_DELETE + "?roleIds=" + checkKeys.join(','))
            .then(res => {
              this.$message('操作成功');
              this.load();
            }).catch(e => {
            this.$message('操作成功');
            console.log(checkKeys);
            this.batchDeleteFromTree(this.roleTree, checkKeys);
          })
        });

      },
      onSubmit(){
        this.form.parentId = this.form.parentId;
        this.$http.post(api.SYS_DEPT_ADD, this.form)
          .then(res => {
            this.form.deptId = res.data.deptId;
            this.appendTreeNode(this.deptTree, res.data.data);
          }).catch(e => {
          this.maxId += 1;
          this.$message('操作成功');
          this.form.deptId = this.maxId;
          var  ddd = {
            deptId: this.form.deptId,
            name: this.form.name,
            orderNum: this.form.orderNum,
            deptLead:this.form.deptLead,
            parentId: this.form.parentId,
            orderNum: this.form.orderNum,
            remark: this.form.remark,
            children:[]
          }
          this.appendTreeNode(this.deptTree, ddd);
          this.deptTree.push({});
          this.deptTree.pop();
        })
      },
      deleteSelected(id){
        this.$http.post(api.SYS_ROLE_DELETE + "?deptId=" + id)
          .then(res => {
            this.$message('操作成功');
            this.deleteFromTree(this.deptTree, id);
            this.newAdd();
          }).catch(e =>{
          this.$message('操作成功');
          this.deleteFromTree(this.roleTree, id);
          this.newAdd();
        })
      },
      load(){
        sysApi.deptList().then(res => {
            this.deptTree = [];
            this.deptTree.push(...res.data)
          })
      },
      renderContent(h, {node, data, store}) {
        return (
          <span>
            <span>
              <span>{node.label}</span>
            </span>
            <span class="render-content">
              <i class="fa fa-wrench" title="配置资源" on-click={(e)=>this.settingResource(e,data.id)}></i>
              <i class="fa fa-trash" on-click={ () => this.deleteSelected(data.id) }></i>
            </span>
          </span>);
      },
      settingResource(event,id){
          event.stopPropagation();
          this.dialogVisible = true;
          if(this.resourceTree==null||this.resourceTree.length<=0){
            this.dialogLoading = true;
            sysApi.resourceList()
              .then(res => {
                this.dialogLoading = false;
                this.resourceTree = res;
              })
          }
        this.$http.get(api.SYS_ROLE_RESOURCE + "?id=" + id)
          .then(res => {
            this.$refs.resourceTree.setCheckedKeys(res.data);
          }).catch(err=> {

        })
      }
    },
    created(){
      this.load();
    }
  }
</script>

<style>
  .render-content {
    float: right;
    margin-right: 20px
  }

  .render-content i.fa {
    margin-left: 10px;
  }

  .render-content i.fa:hover{
    color: #e6000f;
  }

  .select-tree .el-scrollbar.is-empty .el-select-dropdown__list {
    padding: 0;
  }

  .select-tree .el-scrollbar {
    border: 1px solid #d1dbe5;
  }

  .select-tree .el-tree{
    border:0;
  }

</style>
