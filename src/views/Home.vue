<template>
  <div class="blog">

      <div v-if="haslist" style="padding:10px">

        <!-- <el-card class="box-card" v-for="item in list" :key="item.id">
          <div slot="header" class="clearfix">
            <span style="float: left;">{{item.title}}</span>
            <el-button style="float: right; padding: 3px 0" type="text">{{item.fdate}}</el-button>
          </div>
          <div v-html="item.container" class="text item">
            {{item.container}}
          </div>
        </el-card> -->
        <el-collapse class="box-card" v-model="activeName" accordion  v-for="item in list" :key="item.id">
           
          <el-collapse-item>
            <template slot="title">
              <p style="width:100%;display:flex;justify-content:space-between">
                <span>{{item.title}}</span>
                <span>{{item.fdate}}</span>
              </p>
              
              
            </template>
            <div  v-html="item.container"> {{item.container}}</div>           
          </el-collapse-item>
          
        </el-collapse>
      </div> 
      <ul v-else>
          <p>暂无数据</p>
          
      </ul>
      <!--分页-->
      <el-col class="pagelist">
       
        <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
        
            :page-sizes="[10, 20, 30, 40]"
            :page-size="10"
            layout="total, sizes, prev, pager, next, jumper"
            :total="this.pages.total">
        </el-pagination>
      </el-col>
      
  </div>
  
</template>

<script>
import {fwblist} from "@/api/api";
//import TinymceEditor from '@/components/Tinymce';
export default {
  components:{
      //TinymceEditor
  },
  data() {
    return {
      activeName:"1",
      showTinymc:false,
      listLoading:false,
      haslist:false,
      list:[],
      pages: {
        page: 1,
        total: 0,
        pagesize: 10,
        
      },
      editData:{
        title:"",
        container:"",
        id:""
      }
    }
  },
  methods: {
    
    //切换每页显示条数
    handleSizeChange(val) {
      //console.log(`每页 ${val} 条`);
      this.pages.pagesize = val;
      this.getList();
    },
    //翻页
    handleCurrentChange(val) {
      //console.log(`当前页: ${val}`);
      this.pages.page = val;
      this.getList();
    },

    toggleSelection(rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row);
        });
      } else {
        this.$refs.multipleTable.clearSelection();
      }
    },
    //选中某行
    handleSelectionChange(val) {
      this.multipleSelection = val;
      
      //this.sels = sels;
    },
   
   
    
    
    //获取列表
    getList() {
      let data = {
        
        page: this.pages.page,
        pagesize: this.pages.pagesize
      };
      this.listLoading = true;
      
      fwblist(data).then(res => {
         
        if(res.data.data==""){
            this.haslist=false;
            this.listLoading = false;
            return
        }
        this.haslist=true;
        this.list = res.data.data;
        this.listLoading = false;
       
        this.pages.total = res.data.total;
        
      }).catch(err=>{
        this.listLoading = false;
      });
    },
    
  
    
    
    
  },
  mounted() {
    this.getList();
  },
};
</script>

<style>
body{
  background-color:#f1f1f1;
}
.clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both
  }
.box-card {
    margin-bottom: 18px;
    box-shadow: 0 0 5px #EBEEF5;
  }

.blog{
  padding: 1rem 0;
  width: 80%;
  
  background-color:white;
}
.item{
  text-align: left;
}
.pagelist{
  float: none !important;
}
@media (max-width: 860px) {
    .waifu {
        display: none;
    }
}
</style>
