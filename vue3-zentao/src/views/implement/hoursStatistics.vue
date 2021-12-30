<template>
	<div style="padding: 10px; position: relative">
		<!-- 执行-工时统计 -->
		<div>
			<el-tabs v-model="activeName" @tab-click="handleClick">
				<el-tab-pane label="每日成员工时统计" name="first">
					<!-- card卡片 -->
					<el-row class="header_card">
						<div>
							<el-card class="card">
								<div class="grid-cont-right">
									<div class="grid-num">12121</div>
									<div class="font">登记工时</div>
								</div>
							</el-card>
						</div>
						<div>
							<el-card class="card">
								<div class="grid-cont-right">
									<div class="grid-num">12121</div>
									<div class="font">登记次数</div>
								</div>
							</el-card>
						</div>
						<div>
							<el-card class="card">
								<div class="grid-cont-right">
									<div class="grid-num">12121</div>
									<div class="font">登记人数</div>
								</div>
							</el-card>
						</div>
						<div>
							<el-card class="card">
								<div class="grid-cont-right">
									<div class="grid-num">12121</div>
									<div class="font">人均工时</div>
								</div>
							</el-card>
						</div>
					</el-row>
					<!-- 表格 -->
					<el-row style="margin-top: 20px">
						<el-table
							:data="memberTableList"
							border
							:header-cell-style="{
								background: '#611ddf',
								color: '#606266',
								'text-align': 'center',
							}"
							:cell-style="{ 'text-align': 'center' }"
						>
							<el-table-column prop="member" label="成员" fixed="left"></el-table-column>
							<el-table-column prop="totalNum" label="合计登记工时" fixed="left"></el-table-column>
							<el-table-column prop="day1" label="2021年12月27日" fixed="left"></el-table-column>
							<el-table-column prop="day2" label="2021年12月28日" fixed="left"></el-table-column>
							<el-table-column prop="day3" label="2021年12月29日" fixed="left"></el-table-column>
							<el-table-column prop="day4" label="2021年12月30日" fixed="left"></el-table-column>
							<el-table-column prop="day5" label="2021年12月31日" fixed="left"></el-table-column>
							<el-table-column prop="day6" label="2022年1月1日" fixed="left"></el-table-column>
							<el-table-column prop="day7" label="2022年1月2日" fixed="left"></el-table-column>
						</el-table>
					</el-row>
				</el-tab-pane>
				<el-tab-pane label="每日项目工时统计" name="second">
					<!-- card卡片 -->
					<el-row class="header_card">
						<div>
							<el-card class="card">
								<div class="grid-cont-right">
									<div class="grid-num">12121</div>
									<div class="font">登记工时</div>
								</div>
							</el-card>
						</div>
						<div>
							<el-card class="card">
								<div class="grid-cont-right">
									<div class="grid-num">12121</div>
									<div class="font">登记次数</div>
								</div>
							</el-card>
						</div>
						<div>
							<el-card class="card">
								<div class="grid-cont-right">
									<div class="grid-num">12121</div>
									<div class="font">登记项目</div>
								</div>
							</el-card>
						</div>
						<div>
							<el-card class="card">
								<div class="grid-cont-right">
									<div class="grid-num">12121</div>
									<div class="font">项目平均工时</div>
								</div>
							</el-card>
						</div>
					</el-row>
					<el-row style="margin-top: 20px">
						<el-table
							:data="dayTableList"
							border
							:header-cell-style="{
								background: '#611ddf',
								color: '#606266',
								'text-align': 'center',
							}"
							:cell-style="{ 'text-align': 'center' }"
							:span-method="dayTableMerge"
						>
							<el-table-column prop="proName" label="项目" fixed="left"></el-table-column>
							<el-table-column  label="合计登记工时" fixed="left">
								<span >{{list[0]}}</span>
							</el-table-column>
							<el-table-column prop="mokuai" label="模块" fixed="left"></el-table-column>
							<el-table-column prop="totalNum" label="合计模块登记工时" fixed="left"></el-table-column>
							<el-table-column prop="day1" label="2021年12月27日" fixed="left"></el-table-column>
							<el-table-column prop="day2" label="2021年12月28日" fixed="left"></el-table-column>
							<el-table-column prop="day3" label="2021年12月29日" fixed="left"></el-table-column>
							<el-table-column prop="day4" label="2021年12月30日" fixed="left"></el-table-column>
							<el-table-column prop="day5" label="2021年12月31日" fixed="left"></el-table-column>
							<el-table-column prop="day6" label="2022年1月1日" fixed="left"></el-table-column>
							<el-table-column prop="day7" label="2022年1月2日" fixed="left"></el-table-column>
						</el-table>
					</el-row>
				</el-tab-pane>
				<el-tab-pane label="项目成员工时统计" name="third">
					<!-- card卡片 -->
					<el-row class="header_card">
						<div>
							<el-card class="card">
								<div class="grid-cont-right">
									<div class="grid-num">12121</div>
									<div class="font">登记工时</div>
								</div>
							</el-card>
						</div>
						<div>
							<el-card class="card">
								<div class="grid-cont-right">
									<div class="grid-num">12121</div>
									<div class="font">登记次数</div>
								</div>
							</el-card>
						</div>
						<div>
							<el-card class="card">
								<div class="grid-cont-right">
									<div class="grid-num">12121</div>
									<div class="font">登记项目</div>
								</div>
							</el-card>
						</div>
						<div>
							<el-card class="card">
								<div class="grid-cont-right">
									<div class="grid-num">12121</div>
									<div class="font">项目平均工时</div>
								</div>
							</el-card>
						</div>
					</el-row>
					<el-row style="margin-top: 20px">
						<el-table
							:data="memberTableList"
							border
							:header-cell-style="{
								background: '#611ddf',
								color: '#606266',
								'text-align': 'center',
							}"
							:cell-style="{ 'text-align': 'center' }"
						>
							<el-table-column prop="member" label="成员" fixed="left"></el-table-column>
							<el-table-column prop="totalNum" label="合计登记工时" fixed="left"></el-table-column>
							<el-table-column prop="day1" label="2021年12月27日" fixed="left"></el-table-column>
							<el-table-column prop="day2" label="2021年12月28日" fixed="left"></el-table-column>
							<el-table-column prop="day3" label="2021年12月29日" fixed="left"></el-table-column>
							<el-table-column prop="day4" label="2021年12月30日" fixed="left"></el-table-column>
							<el-table-column prop="day5" label="2021年12月31日" fixed="left"></el-table-column>
							<el-table-column prop="day6" label="2022年1月1日" fixed="left"></el-table-column>
							<el-table-column prop="day7" label="2022年1月2日" fixed="left"></el-table-column>
						</el-table>
					</el-row>
				</el-tab-pane>
			</el-tabs>
		</div>

		<div class="datePicker">
			<div>
				<el-form>
					<el-form-item label="时间:">
						<el-date-picker
							v-model="timer"
							type="daterange"
							range-separator="至"
							start-placeholder="开始"
							end-placeholder="结束"
							@change="dateChange"
						>
						</el-date-picker>
					</el-form-item>
				</el-form>
			</div>
			<div>
				<el-button class="tableExport" icon="el-icon-s-data">报表下载</el-button>
			</div>
		</div>
	</div>
</template>

<script>
import { reactive, ref, onMounted } from "vue";
import { timeStr } from "../../components/common/mixin.js";
// import { proViewListMsg,addproView ,editproView} from "@/request/api.js";
import fileDownload from "js-file-download";
import axios from "axios";
export default {
	name: "hoursStatistics",
	setup() {
		onMounted(() => {
			getSpanArr(dayTableList, "proName");
			getSpanArr(dayTableList, "dengNum");
		});

		//1.请求列表数据
		const form = reactive({
			startTime: "",
			endTime: "",
			p: "1",
			s: "10",
		});
		//2.tab栏
		const activeName = ref("first");
		function handleClick(tab, event) {
			// console.log(tab, event);
		}

		//3.日期选择
		const timer = ref("");
		function dateChange(val) {
			if (val == null) {
			} else {
				let timers = JSON.parse(JSON.stringify(val));
				form.startTime = timeStr(timers[0]);
				form.endTime = timeStr(timers[1]);
				console.log(form.startTime, form.endTime);
			}
		}

		//4.每日成员工时统计
		const memberTableList = reactive([
			{
				member: "兰新宇",
				totalNum: "40",
				day1: "8",
				day2: "6",
				day3: "6",
				day4: "6",
				day5: "6",
				day6: "6",
				day7: "6",
			},
		]);

		//5.每日项目工时统计
		const dayTableList = reactive([
			{
				proName: "送餐机器人",
				dengNum: "送餐机器人",
				mokuai: "模块一",
				totalNum: 1,
				day1: "8",
				day2: "6",
				day3: "6",
				day4: "6",
				day5: "6",
				day6: "6",
				day7: "6",
			},
			{
				proName: "送餐机器人",
				dengNum: "送餐机器人",
				mokuai: "模块二",
				totalNum: 1,
				day1: "8",
				day2: "6",
				day3: "6",
				day4: "6",
				day5: "6",
				day6: "6",
				day7: "6",
			},
			{
				proName: "智能测温门岗机器人",
				dengNum: "智能测温门岗机器人",
				mokuai: "模块一",
				totalNum: 2,
				day1: "8",
				day2: "6",
				day3: "6",
				day4: "6",
				day5: "6",
				day6: "6",
				day7: "6",
			},
			{
				proName: "智能测温门岗机器人",
				dengNum: "智能测温门岗机器人",
				mokuai: "模块二",
				totalNum: 2,
				day1: "8",
				day2: "6",
				day3: "6",
				day4: "6",
				day5: "6",
				day6: "6",
				day7: "6",
			},
			{
				proName: "智能访客机器人（乐乐）",
				dengNum: "智能访客机器人（乐乐）",
				mokuai: "模块一",
				totalNum: 3,
				day1: "8",
				day2: "6",
				day3: "6",
				day4: "6",
				day5: "6",
				day6: "6",
				day7: "6",
			},
			{
				proName: "智能访客机器人（乐乐）",
				dengNum: "智能访客机器人（乐乐）",
				mokuai: "模块二",
				totalNum: 3,
				day1: "8",
				day2: "6",
				day3: "6",
				day4: "6",
				day5: "6",
				day6: "6",
				day7: "6",
			},
			{
				proName: "智能访客机器人（乐乐）",
				dengNum: "智能访客机器人（乐乐）",
				mokuai: "模块三",
				totalNum: 3,
				day1: "8",
				day2: "6",
				day3: "6",
				day4: "6",
				day5: "6",
				day6: "6",
				day7: "6",
			},
		]);
		//5.1每日项目工时统计报表合并
		let spanArr = reactive([]); // 合并的数组
		//5.2获取合并行的位置和合并长度
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
		console.log(groupBy(dayTableList, "proName"))
		// 5.3.计算 数据合并 索引
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
		// 5.4合并 tableData 数据
		function dayTableMerge({ row, column, rowIndex, columnIndex }) {
			if (columnIndex === 0) {
				const _row = spanArr[rowIndex];
				const _col = _row > 0 ? 1 : 0;
				return {
					rowspan: _row,
					colspan: _col,
				};
			} else if (columnIndex === 1) {
				const _row = spanArr[rowIndex];
				const _col = _row > 0 ? 1 : 0;
				return {
					rowspan: _row,
					colspan: _col,
				};
			}
		}
		//5.5 合计合并后的数据
		for (let i = 0; i < groupBy(dayTableList, "proName").length; i++) {
			let totalNum1= groupBy(dayTableList, "proName")[i].reduce(function (total, currentValue, currentIndex, arr) {
        return total + currentValue.totalNum;
    }, 0);
		console.log(totalNum1);//2,4,9



			// for (let j = 0; j < groupBy(dayTableList, "proName")[i].length; j++) {
			// 	if( groupBy(dayTableList, "proName")[i][j].){
			// 	}
			// }
			
		}

		const list=reactive([2,4,9])


		return {
			//请求列表数据
			form,

			//tab栏
			activeName,
			handleClick,

			//日期选择
			timer,
			dateChange,

			//每日成员工时统计
			memberTableList,

			//每日项目工时统计
			dayTableList,
			spanArr,
			groupBy,
			getSpanArr,
			dayTableMerge,

			list
		};
	},
};
</script>

<style lang="less" scoped>
.datePicker {
	display: flex;
	width: 600px;
	height: 30px;
	position: absolute;
	left: 1000px;
	top: 10px;
	.tableExport {
		margin-left: 20px;
	}
}
.header_card {
	display: flex;
	flex-direction: row;
	flex-wrap: nowrap;
	justify-content: space-between;
	margin-top: 5px;
	.card {
		box-sizing: border-box;
		width: 400px;
		height: 130px;
		border-radius: 20px;
		// background-color: rgb(114, 228, 142);
		background: linear-gradient(145deg, #81d2f1, #9a9bec);
		.grid-cont-right {
			margin-top: 10px;
			text-align: center;
			font-size: 14px;
			color: rgb(45, 140, 240);
			.font {
				font-size: 30x;
				font-weight: bold;
				color: rgb(2, 2, 26) !important;
			}
		}
	}
}
.grid-num {
	font-size: 30px;
	font-weight: bold;
}
</style>
