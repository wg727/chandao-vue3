<template>
	<div>
		<!--项目集- 项目集报表 -->
		<el-row class="mgb20">
			<div>
				<el-card class="card" :body-style="{ padding: '0px' }">
					<div class="grid-content grid-con-1">
						<i class="el-icon-menu grid-con-icon"></i>
						<div class="grid-cont-right">
							<div class="grid-num">{{ totalNum.parentCount }}</div>
							<div class="font">项目集</div>
						</div>
					</div>
				</el-card>
			</div>
			<div>
				<el-card class="card" :body-style="{ padding: '0px' }">
					<div class="grid-content grid-con-2">
						<i class="el-icon-files grid-con-icon"></i>
						<div class="grid-cont-right">
							<div class="grid-num">{{ totalNum.projectCount }}</div>
							<div class="font">项目</div>
						</div>
					</div>
				</el-card>
			</div>
			<div>
				<el-card class="card" :body-style="{ padding: '0px' }">
					<div class="grid-content grid-con-7">
						<i class="el-icon-s-order grid-con-icon"></i>
						<div class="grid-cont-right">
							<div class="grid-num">{{ totalNum.taskCount }}</div>
							<div class="font">总任务</div>
						</div>
					</div>
				</el-card>
			</div>
			<div>
				<el-card class="card" :body-style="{ padding: '0px' }">
					<div class="grid-content grid-con-3">
						<i class="el-icon-notebook-2 grid-con-icon"></i>
						<div class="grid-cont-right">
							<div class="grid-num">{{ totalNum.taskPending }}</div>
							<div class="font">待处理任务</div>
						</div>
					</div>
				</el-card>
			</div>
			<div>
				<el-card class="card" :body-style="{ padding: '0px' }">
					<div class="grid-content grid-con-4">
						<i class="el-icon-time grid-con-icon"></i>
						<div class="grid-cont-right">
							<div class="grid-num">{{ totalNum.taskWait }}</div>
							<div class="font">未开始</div>
						</div>
					</div>
				</el-card>
			</div>
			<div>
				<el-card class="card" :body-style="{ padding: '0px' }">
					<div class="grid-content grid-con-5">
						<i class="el-icon-edit grid-con-icon"></i>
						<div class="grid-cont-right">
							<div class="grid-num">{{ totalNum.taskDoing }}</div>
							<div class="font">进行中</div>
						</div>
					</div>
				</el-card>
			</div>
			<div>
				<el-card class="card" :body-style="{ padding: '0px' }">
					<div class="grid-content grid-con-8">
						<i class="el-icon-document-checked grid-con-icon"></i>
						<div class="grid-cont-right">
							<div class="grid-num">{{ totalNum.taskDone }}</div>
							<div class="font">已完成</div>
						</div>
					</div>
				</el-card>
			</div>
			<div>
				<el-card class="card" :body-style="{ padding: '0px' }">
					<div class="grid-content grid-con-6">
						<i class="el-icon-circle-close grid-con-icon"></i>
						<div class="grid-cont-right">
							<div class="grid-num">{{ totalNum.taskDelayNoDone }}</div>
							<div class="font">延期未完成</div>
						</div>
					</div>
				</el-card>
			</div>
			<div class="delayRate">
				<div class="postpone_msg">
					<div class="num">{{ totalNum.donePercentage +'%'  }}</div>
					<div class="font">完成率</div>
				</div>
			</div>
			<div class="delayRate">
				<div class="postpone_msg">
					<div class="num">{{ totalNum.delayPercentage +'%'}}</div>
					<div class="font">延期率</div>
				</div>
			</div>
		</el-row>
		<div class="tableList">
			<el-button class="tableExport" icon="el-icon-s-data" @click="exportDialog = true">报表下载</el-button>
		</div>
		<!-- 表格 -->
		<div style="padding: 10px">
			<el-table
				:data="lists.sliceList"
				border
				height="530"
				:header-cell-style="{
					background: '#add8e6',
					color: '#606266',
					'text-align': 'center',
				}"
				:cell-style="{ 'text-align': 'center' }"
				:span-method="cellMerge"
			>
				<el-table-column prop="parentName" label="项目集" width="200"></el-table-column>
				<el-table-column prop="projectName" label="项目" width="250"></el-table-column>
				<el-table-column prop="status" label="项目状态">

				</el-table-column>
				<el-table-column prop="taskCount" label="总任务"></el-table-column>
				<el-table-column prop="taskPending" label="待处理任务"></el-table-column>
				<el-table-column prop="taskWait" label="未开始"></el-table-column>
				<el-table-column prop="taskDoing" label="进行中"></el-table-column>
				<el-table-column prop="taskDone" label="已完成"></el-table-column>
				<el-table-column prop="taskDonePercentage" label="完成率"></el-table-column>
				<el-table-column prop="taskDelayNoDone" label="延期未完成"></el-table-column>
				<el-table-column prop="taskDelayDone" label="延期已完成"></el-table-column>
				<el-table-column prop="taskDelayPercentage" label="延期率"></el-table-column>
			</el-table>
			
		</div>
		<!-- 分页 -->
		<el-pagination
      v-model="p"
      :page-sizes="[10, 20, 30, 50]"
      :page-size="s"
      layout="total, sizes, prev, pager, next, jumper"
      :total="totals"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    >
    </el-pagination>
		
		<!-- 报表下载的对话框 -->
		<el-dialog v-model="exportDialog" title="报表下载" width="30%">
			<span>是否下载当前报表数据?</span>
			<template #footer>
				<span class="dialog-footer">
					<el-button @click="exportDialog = false">取消</el-button>
					<el-button type="primary" @click="exportFile">确定</el-button>
				</span>
			</template>
		</el-dialog>
	</div>
</template>

<script>
import { reactive, ref, onMounted,toRefs } from "vue";
import { tableListMsg,tableListTotalMsg } from "../../request/api";
import { countTotal } from "../../components/common/mixin.js";
import fileDownload from "js-file-download";
import axios from "axios";
export default {
	name: "projectTable",
	setup(props,context) {

		onMounted(() => {
			getTableList()
			getTotalNum()
		});
		let filterInfo = reactive({
			p: 1,
			s: 10,
		});
		//总条数
		let totals = ref(0);

		
		let itemSet=ref(''); //项目集

		let exportDialog = ref(false); //报表下载的对话框

		//表格数据
		let lists=reactive({
			tableList:[],
			sliceList:[]
		})

		let p=ref(1)
		let s=ref(10)




		//1.分页方法
		const handleCurrentChange = (val) => {
		p.value = val;
			getTableList()
		};
		const handleSizeChange = (val) => {
			s.value = val;
			getTableList()
		}
		//2.1 获取项目集报表统计数据
		let totalNum=reactive({
		})
		function getTotalNum(){
			tableListTotalMsg().then(res=>{
				const {parentCount,projectCount,taskCount,taskPending,taskWait,taskDoing,taskDone,taskDelayNoDone,donePercentage,delayPercentage}=res.data
				totalNum.parentCount=parentCount
				totalNum.projectCount=projectCount
				totalNum.taskCount=taskCount
				totalNum.taskPending=taskPending
				totalNum.taskWait=taskWait
				totalNum.taskDoing=taskDoing
				totalNum.taskDone=taskDone
				totalNum.taskDelayNoDone=taskDelayNoDone
				totalNum.donePercentage=donePercentage
				totalNum.delayPercentage=delayPercentage
			})
		}
		//2.2 获取表报数据
		function getTableList() {
			tableListMsg().then((res) => {
				console.log(res);
				let {data}=res
				lists.tableList=data
				lists.sliceList=lists.tableList.slice((p.value-1)*s.value,(p.value*s.value))
				totals.value=data.length

				//调用合并方法
				getSpanArr(lists.tableList, "parentName");
			});
		}

		//3.项目集合并
		let spanArr = reactive([]); // 合并的数组
		//  获取合并行的位置和合并长度
		function groupBy(data, params) {
			let dataP = JSON.parse(JSON.stringify(data));
			const groups = {};
			dataP.forEach((v) => {
				const group = JSON.stringify(v[params]);
				groups[group] = groups[group] || [];
				groups[group].push(v);
			});
			return Object.values(groups);
		}

		// 4.计算 数据合并 索引
		function getSpanArr(data, params) {
			let arr = []; // 接收重构数组
			let pos = 0; // 设置索引
			spanArr = []; // 控制合并的数组
			let dataP = JSON.parse(JSON.stringify(data));
			//计算项目集
			itemSet.value=groupBy(dataP, params).length


			groupBy(dataP, params).map((v) => (arr = arr.concat(v)));
			arr.map((res) => {
				dataP.shift();
				dataP.push(res);
			});
			const redata = arr.map((v) => v[params]);
			redata.reduce((old, cur, i) => {
				if (i === 0) {
					spanArr.push(1);
					pos = 0;
				} else {
					if (cur === old) {
						spanArr[pos] += 1;
						spanArr.push(0);
					} else {
						spanArr.push(1);
						pos = i;
					}
				}
				return cur;
			}, {});
		}
		// // 5.合并 tableData 数据
		function cellMerge({ row, column, rowIndex, columnIndex }) {
			if (columnIndex === 0) {
				const _row = spanArr[rowIndex];
				const _col = _row > 0 ? 1 : 0;
				return {
					rowspan: _row,
					colspan: _col,
				};
			}
		}

		//6.报表下载
		function exportFile() {
		
			axios({
				method: "get",
				url: `${axios.defaults.baseURL}zentao/ztProjectsReport/downloadReport`,
				responseType: "blob",
				headers: {
					"Content-Type": "application/x-www-form-urlencoded",
				},
			}).then((res) => {
				fileDownload(res.data, "项目集报表.xlsx");
				context.emit("after-download");
			});
			exportDialog = false;
		}

		return {
			itemSet,//项目集
			filterInfo,
			totals,
			p,
			s,
			handleCurrentChange,
			handleSizeChange,
			spanArr,
			groupBy,
			getSpanArr,
			cellMerge,	
			exportFile,
			totalNum,	
			getTotalNum,//获取项目集报表统计数据
			getTableList,
			exportDialog,
			lists,

		
			
		};
	},
};
</script>

<style lang="less" scoped>
.mgb20 {
	display: flex;
	flex-direction: row;
	flex-wrap: nowrap;
	justify-content: space-around;
	margin-bottom: 20px;
	margin-top: 20px;
}
.card {
	box-sizing: border-box;
	width: 150px;
	height: 130px;
	// margin-right: 100px;

	.grid-con-icon {
		box-sizing: border-box;
		font-size: 50px;
		width: 70px;
		height: 130px;
		text-align: center;
		line-height: 130px;
		color: #fff;
	}
	.grid-cont-right {
		flex: 1;
		font-size: 14px;
		color: #999;
		.font {
			font-size: 20x;
			font-weight: bold;
			color: rgb(2, 2, 26) !important;
			text-align: center;
		}
	}
	.grid-content {
		display: flex;
		align-items: center;
		width: 150px;
		height: 130px;
	}
}

.grid-num {
	font-size: 30px;
	font-weight: bold;
	text-align: center;
}
.grid-con-1 {
	.grid-con-icon {
		background: rgb(45, 140, 240);
	}
	.grid-num {
		color: rgb(45, 140, 240);
	}
}
.grid-con-2 {
	.grid-con-icon {
		background: rgb(100, 213, 114);
	}
	.grid-num {
		color: rgb(45, 140, 240);
	}
}
.grid-con-3 {
	.grid-con-icon {
		background: rgb(242, 94, 67);
	}
	.grid-num {
		color: rgb(45, 140, 240);
	}
}
.grid-con-4 {
	.grid-con-icon {
		background: rgb(49, 210, 238);
	}
	.grid-num {
		color: rgb(45, 140, 240);
	}
}
.grid-con-5 {
	.grid-con-icon {
		background: rgb(238, 101, 181);
	}
	.grid-num {
		color: rgb(45, 140, 240);
	}
}
.grid-con-6 {
	.grid-con-icon {
		background: rgb(56, 211, 172);
		text-align: center;
	}
	.grid-num {
		color: rgb(45, 140, 240);
	}
}
.grid-con-7 {
	.grid-con-icon {
		background: rgb(156, 151, 228);
		text-align: center;
	}
	.grid-num {
		color: rgb(45, 140, 240);
	}
}
.grid-con-8 {
	.grid-con-icon {
		background: rgb(243, 123, 119);
		text-align: center;
	}
	.grid-num {
		color: rgb(45, 140, 240);
	}
}
.delayRate {
	box-sizing: border-box;
	font-size: 10px;
	width: 130px;
	height: 130px;
	text-align: center;
	border-radius: 50%;
	background-color: rgb(118, 230, 215);
	.postpone_msg {
		margin-top: 40px;
		.num {
			font-size: 30px;
			font-weight: bold;
			color: rgb(45, 140, 240);
		}
		.font {
			font-size: 15px;
			font-weight: bold;
			
			color: rgb(2, 2, 26) !important;
		}
	}
}

//数据下载
.tableList {
	display: flex;
	justify-content: flex-end;
	margin-top: 10px;
	margin-right: 10px;
	.tableExport {
		border-radius: 5px;
	}
}
//分页
.el-pagination {
	margin-top: 20px;
	text-align: center;
}

.el-table {
  overflow-y: auto !important;
}
</style>
