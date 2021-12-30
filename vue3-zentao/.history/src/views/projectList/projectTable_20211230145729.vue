<template>
	<div>
		<!--项目集- 项目集报表 -->
		<el-row class="mgb20">
			<div>
				<el-card class="card" :body-style="{ padding: '0px' }">
					<div class="grid-content grid-con-1">
						<i class="el-icon-menu grid-con-icon"></i>
						<div class="grid-cont-right">
							<div class="grid-num">{{ data.itemSet }}</div>
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
							<div class="grid-num">{{ data.project }}</div>
							<div class="font">项目</div>
						</div>
					</div>
				</el-card>
			</div>
			<div>
				<el-card class="card" :body-style="{ padding: '0px' }">
					<div class="grid-content grid-con-3">
						<i class="el-icon-notebook-2 grid-con-icon"></i>
						<div class="grid-cont-right">
							<div class="grid-num">{{ data.pendingTasks }}</div>
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
							<div class="grid-num">{{ data.notStarted }}</div>
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
							<div class="grid-num">{{ data.inProgresst }}</div>
							<div class="font">进行中</div>
						</div>
					</div>
				</el-card>
			</div>
			<div>
				<el-card class="card" :body-style="{ padding: '0px' }">
					<div class="grid-content grid-con-6">
						<i class="el-icon-circle-close grid-con-icon"></i>
						<div class="grid-cont-right">
							<div class="grid-num">{{ data.noFinish }}</div>
							<div class="font">延期未完成</div>
						</div>
					</div>
				</el-card>
			</div>
			<div class="delayRate">
				<div class="postpone_msg">
					<div class="num">{{ data.delayRate }}</div>
					<div class="font">延期率</div>
				</div>
			</div>
		</el-row>
		<div class="tableList">
			<el-button class="tableExport" icon="el-icon-s-data" @click="exportDialog = true">报表下载</el-button>
		</div>
		<!-- 表格 -->
		<el-row style="padding: 10px">
			<el-table
				:data="tableList"
				border
				ref="tableDataRef"
				:header-cell-style="{
					background: '#add8e6',
					color: '#606266',
					'text-align': 'center',
				}"
				:cell-style="{ 'text-align': 'center' }"
				:span-method="cellMerge"
			>
				<el-table-column prop="tname" label="项目集" width="200" fixed="left"></el-table-column>
				<el-table-column prop="name" label="项目" width="250" fixed="left"></el-table-column>
				<el-table-column prop="status" label="项目状态" fixed="left"></el-table-column>
				<el-table-column prop="num1" label="待处理任务" fixed="left"></el-table-column>
				<el-table-column prop="num2" label="未开始" fixed="left"></el-table-column>
				<el-table-column prop="num3" label="进行中" fixed="left"></el-table-column>
				<el-table-column prop="num4" label="延期未完成" fixed="left"></el-table-column>
				<el-table-column prop="num5" label="延期已完成" fixed="left"></el-table-column>
				<el-table-column prop="num6" label="延期率" fixed="left"></el-table-column>
			</el-table>
		</el-row>
		<!-- 分页 -->
		<el-pagination
			@size-change="handleSizeChange"
			@current-change="handleCurrentChange"
			:page-size="100"
			layout="total, prev, pager, next"
			:total="1000"
		>
		</el-pagination>

		<!-- 报表下载的对话框 -->
		<el-dialog v-model="exportDialog" title="报表下载" width="30%">
			<span>是否下载当前报表数据?</span>
			<template #footer>
				<span class="dialog-footer">
					<el-button @click="exportDialog = false">取消</el-button>
					<el-button type="primary" @click="exportDialog = false">确定</el-button>
				</span>
			</template>
		</el-dialog>
	</div>
</template>

<script>
import { reactive, ref, onMounted } from "vue";
// import { tableListMsg } from "@/request/api.js";
import fileDownload from "js-file-download";
import axios from "axios";
export default {
	name: "projectTable",
	setup() {
		onMounted(() => {
			getSpanArr(tableList, "tname");
		});
		const filterInfo = reactive({
			p: 1,
			s: 10,
		});
		//总条数
		const total = ref(100);

		const data = reactive({
			itemSet: "2", //项目集
			project: "12", //项目
			pendingTasks: "3", //待处理任务
			notStarted: "6", //未开始
			inProgresst: "8", //进行中
			noFinish: "1", //延期未完成
			delayRate: "50%", //延期率
		});
		const exportDialog = ref(false); //报表下载的对话框

		//表格数据
		const tableList = reactive([
			{ id: 0, tname: "研发项目", name: "灵机云运营管理平台", status: "正常", num1: 11, num2: 11, num3: 11, num4: 11, num5: "11", num6: "50%" },
			{
				id: 1,
				tname: "研发项目",
				name: "灵机云运营管理平台",
				status: "正常",
				num1: 11,
				num2: 11,
				num3: 11,
				num4: 11,
				num5: "11",
				num6: "50%",
			},
			{
				id: 2,
				tname: "研发项目",
				name: "灵机云运营管理平台",
				status: "正常",
				num1: 11,
				num2: 11,
				num3: 11,
				num4: 11,
				num5: "11",
				num6: "50%",
			},
			{
				id: 3,
				tname: "研发项目",
				name: "灵机云运营管理平台",
				status: "正常",
				num1: 11,
				num2: 11,
				num3: 11,
				num4: 11,
				num5: "11",
				num6: "50%",
			},
			{
				id: 4,
				tname: "研发项目",
				name: "灵机云运营管理平台",
				status: "正常",
				num1: 11,
				num2: 11,
				num3: 11,
				num4: 11,
				num5: "11",
				num6: "50%",
			},
			{
				id: 5,
				tname: "研发项目",
				name: "灵机云运营管理平台",
				status: "正常",
				num1: 11,
				num2: 11,
				num3: 11,
				num4: 11,
				num5: "11",
				num6: "50%",
			},
			{
				id: 6,
				tname: "研发项目",
				name: "灵机云运营管理平台",
				status: "正常",
				num1: 11,
				num2: 11,
				num3: 11,
				num4: 11,
				num5: "11",
				num6: "50%",
			},
			{
				id: 7,
				tname: "日常任务",
				name: "灵机云运营管理平台",
				status: "正常",
				num1: 11,
				num2: 11,
				num3: 11,
				num4: 11,
				num5: "11",
				num6: "50%",
			},
			{
				id: 8,
				tname: "日常任务",
				name: "灵机云运营管理平台",
				status: "正常",
				num1: 11,
				num2: 11,
				num3: 11,
				num4: 11,
				num5: "11",
				num6: "50%",
			},
			{
				id: 9,
				tname: "日常任务",
				name: "灵机云运营管理平台",
				status: "正常",
				num1: 11,
				num2: 11,
				num3: 11,
				num4: 11,
				num5: "11",
				num6: "50%",
			},
			{
				id: 10,
				tname: "日常任务",
				name: "灵机云运营管理平台",
				status: "正常",
				num1: 11,
				num2: 11,
				num3: 11,
				num4: 11,
				num5: "11",
				num6: "50%",
			},
			{
				id: 11,
				tname: "日常任务",
				name: "灵机云运营管理平台",
				status: "正常",
				num1: 11,
				num2: 11,
				num3: 11,
				num4: 11,
				num5: "11",
				num6: "50%",
			},
		]);

		//1.分页方法
		const handleCurrentChange = (val) => {
			filterInfo.p = val;
		};
		const handleSizeChange = (val) => {
			filterInfo.s = val;
		};

		//2.获取表报数据
		function getTableList() {
			tableListMsg(filterInfo).then((res) => {
				console.log(res);
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
		// 5.合并 tableData 数据
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
			filterInfo.p = "";
			filterInfo.s = "";
			axios({
				method: "post",
				url: `${axios.defaults.baseURL}neworder/deal/manager/contractListExport`,
				data: filterInfo,
				responseType: "blob",
				headers: {
					"Content-Type": "application/json",
				},
			}).then((res) => {
				//console.log(res);
				fileDownload(res.data, "项目集报表.xlsx");
				$emit("after-download");
				filterInfo.p = 1;
				filterInfo.s = 10;
				getTableList();
			});
			exportDialog = false;
		}

		return {
			data,
			tableList,
			filterInfo,
			total,
			handleCurrentChange,
			handleSizeChange,
			spanArr,
			groupBy,
			getSpanArr,
			cellMerge,
			exportFile,
			getTableList,
			exportDialog,
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
	width: 200px;
	height: 130px;
	// margin-right: 100px;

	.grid-con-icon {
		box-sizing: border-box;
		font-size: 50px;
		width: 100px;
		height: 130px;
		text-align: center;
		line-height: 130px;
		color: #fff;
	}
	.grid-cont-right {
		flex: 1;
		text-align: center;
		font-size: 14px;
		color: #999;
		.font {
			font-size: 20x;
			font-weight: bold;
			color: rgb(2, 2, 26) !important;
		}
	}
	.grid-content {
		display: flex;
		align-items: center;
		width: 180px;
		height: 130px;
	}
}

.grid-num {
	font-size: 30px;
	font-weight: bold;
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
	background-color: rgb(140, 223, 248);
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
	margin-left: 650px;
}
</style>
