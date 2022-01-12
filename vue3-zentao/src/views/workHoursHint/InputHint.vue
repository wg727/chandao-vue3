<template>
	<!-- 工时统计-工时录入提醒设置 -->
	<div>
		<div style="text-align: center" class="edit_dev">
			<el-transfer
				v-model="defaultList.listMsg"
				style="text-align: left; display: inline-block"
				filterable
				:render-content="renderFunc"
				:titles="['人员列表', '已勾选']"
				:button-texts="['删除', '添加']"
				:format="{
					noChecked: '${total}',
					hasChecked: '${checked}/${total}',
				}"
				:data="data.dataList"
				@change="handleChange"
			>
				<!-- <el-tree :data="data" :props="defaultProps" @node-click="handleNodeClick" /> -->

			</el-transfer>
		</div>
	</div>
</template>

<script>
import { ref,reactive,onMounted,onBeforeMount } from "vue";
import { searchAll,addPeople,deletePeople,getPeople} from "../../request/api";
import { ElMessage } from 'element-plus'
export default {
	name: "InputHint",
	setup() {

    onMounted(() => {
      getSearchAll()
      getSearch()

		});

		function generateData (list) {
			let data = []
			for (let i = 0; i < list.length; i++) {
				data.push({
					key: list[i].id,
					label: list[i].realname,
				})
			}
			return data
      data=[]
		}

    function filterByKey (arr1 = [], arr2 = []){
      let res = [];
      res = arr2.filter(el => {
          const { id } = el;
          const index = arr1.indexOf(id);
          return index !== -1;
      });
      return res;
      res=[]
    }

      //数组去重
      function newArr(arr){
          return Array.from(new Set(arr))
      }



		let data = reactive({
      dataList:[]
    });
    let list=reactive({
      searchAllList:[]
    })
		const rightValue = ref([]);
		const leftValue = ref([]);

		const renderFunc = (h, option) => {
			return h("span", null, option.label);
		};

    //添加-删除
		const handleChange = (value, direction, movedKeys) => {
			console.log(value, direction, movedKeys);
      // console.log(filterByKey(value,list.searchAllList));
      let addinterfaceList=filterByKey(movedKeys,list.searchAllList)
      console.log(movedKeys);
      if(direction=='right'){
        addPeople(addinterfaceList).then(res=>{
          console.log(res);
          if(res.code==200){
            ElMessage({
							message: '添加成功',
							type: 'success',
						})
            addinterfaceList=[]
          } 
        })
      }else if(direction=='left'){
        deletePeople(movedKeys).then(res=>{
          if(res.code==200){
            ElMessage({
							message: '删除成功',
							type: 'success',
						})
          } 
        })
      }
		};

    //获取全部人员列表
    function getSearchAll(){
      searchAll().then(res=>{
        list.searchAllList=res.data
        console.log(generateData(list.searchAllList));
        data.dataList=generateData(list.searchAllList)

        
      })
    }

    //获取人员列表
    let defaultList=reactive({
      listMsg:[]
    })
    function getSearch(){
      getPeople().then(res=>{
        console.log(res.data);
        let list=[]
        res.data.forEach(item=>{
          list.push(item.id)
        })
        console.log(list);
        // defaultList.listMsg=newArr(list)
        defaultList.listMsg=list
        console.log(defaultList.listMsg);
      })
    }

		return {
			data,
      list,
			rightValue,
			leftValue,
			renderFunc,
			handleChange,

      getSearchAll,
      getSearch,
      defaultList,
      generateData,
      filterByKey,
      newArr
		};
	},
};
</script>

<style lang="less" scoped>
.edit_dev{
  width: 800px;
  height: 500px;
}
 .el-transfer-panel{
        width: 500px!important;
        height: 500px;
    }
  .el-transfer-panel__list.is-filterable{
        height: 400px;
    }
</style>
