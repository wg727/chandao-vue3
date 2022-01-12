<template>
	<div style="padding: 10px;  position: relative">
		<!-- 执行-工时统计 -->
		<div>
			<el-tabs v-model="activeName" @tab-click="handleClick">
				<el-tab-pane label="每日成员工时统计" name="first" >
					<!-- card卡片 -->
					<el-row class="header_card">
						<div>
							<el-card class="card">
								<div class="grid-cont-right">
									<div class="grid-num">{{regisHours}}</div>
									<div class="font">登记工时</div>
								</div>
							</el-card>
						</div>
						<div>
							<el-card class="card">
								<div class="grid-cont-right">
									<div class="grid-num">{{regisNums}}</div>
									<div class="font">登记次数</div>
								</div>
							</el-card>
						</div>
						<div>
							<el-card class="card">
								<div class="grid-cont-right">
									<div class="grid-num">{{regisNum}}</div>
									<div class="font">登记人数</div>
								</div>
							</el-card>
						</div>
						<div>
							<el-card class="card">
								<div class="grid-cont-right">
									<div class="grid-num">{{PerHours}}</div>
									<div class="font">人均工时</div>
								</div>
							</el-card>
						</div>
					</el-row>
					<!-- 表格 -->
					<el-row style="margin-top: 20px;">
						<el-table
							:data="lists.memberTableList"
							border
							width="700"
							:header-cell-style="{
								background: '#611ddf',
								color: '#606266',
								'text-align': 'center',
							}"
							:cell-style="{ 'text-align': 'center' }"
						>
							<el-table-column prop="userName" label="成员" ></el-table-column>
							<el-table-column prop="totalHour" label="合计登记工时" ></el-table-column>

							<el-table-column v-for="(item,index) in betweenDate.betweenDateList" :key="index" :label="item">
								<template v-slot="scope">
									<span>{{scope.row.hourList[index]}}</span>
								</template>
							</el-table-column>
						</el-table>
					</el-row>

				</el-tab-pane>
				<el-tab-pane label="每日项目工时统计" name="second" >
					<!-- card卡片 -->
					<el-row class="header_card">
						<div>
							<el-card class="card">
								<div class="grid-cont-right">
									<div class="grid-num">{{proRegisHours}}</div>
									<div class="font">登记工时</div>
								</div>
							</el-card>
						</div>
						<div>
							<el-card class="card">
								<div class="grid-cont-right">
									<div class="grid-num">{{regisHoursNum}}</div>
									<div class="font">登记次数</div>
								</div>
							</el-card>
						</div>
						<div>
							<el-card class="card">
								<div class="grid-cont-right">
									<div class="grid-num">{{proRegisNum}}</div>
									<div class="font">登记项目</div>
								</div>
							</el-card>
						</div>
						<div>
							<el-card class="card">
								<div class="grid-cont-right">
									<div class="grid-num">{{proPerHours}}</div>
									<div class="font">项目平均工时</div>
								</div>
							</el-card>
						</div>
					</el-row>
						<el-row style="margin-top: 20px">
						<el-table
							:data="dayTableList.proList"
							border
							height="700"
							:header-cell-style="{
								background: '#611ddf',
								color: '#606266',
								'text-align': 'center',
							}"
							:cell-style="{ 'text-align': 'center' }"
							:span-method="dayTableMerge"
						>
							<el-table-column prop="projectName" label="项目" ></el-table-column>
							<el-table-column prop="totalHour" label="合计登记工时"   >
								<template v-slot="scope">
									<span v-if="scope.row.totalHour ==null">0</span>
								</template>
							</el-table-column>
							<el-table-column prop="moduleName" label="模块" ></el-table-column>
							<el-table-column prop="moduleTotalHour" label="合计模块登记工时" ></el-table-column>
							<el-table-column v-for="(item,index) in betweenDate.betweenDateList" :key="item" :label="item">
								<template v-slot="scope">
									<span >{{scope.row.hourList[index]}}</span>
								</template>
							</el-table-column>
						</el-table>
					</el-row>
				</el-tab-pane>
				<el-tab-pane label="项目成员工时统计" name="third">
					<!-- card卡片 -->
					<el-row class="header_card">
						<div>
							<el-card class="card">
								<div class="grid-cont-right">
									<div class="grid-num">{{proPeopleList.proPeoHours}}</div>
									<div class="font">登记工时</div>
								</div>
							</el-card>
						</div>
						<div>
							<el-card class="card">
								<div class="grid-cont-right">
									<div class="grid-num">{{proPeopleList.proPeoNum}}</div>
									<div class="font">登记次数</div>
								</div>
							</el-card>
						</div>
						<div>
							<el-card class="card">
								<div class="grid-cont-right">
									<div class="grid-num">{{proPeopleList.proPeoNumber}}</div>
									<div class="font">登记项目</div>
								</div>
							</el-card>
						</div>
						<div>
							<el-card class="card">
								<div class="grid-cont-right">
									<div class="grid-num">{{proPeopleList.proPeoPHours}}</div>
									<div class="font">项目平均工时</div>
								</div>
							</el-card>
						</div>
					</el-row>
					<el-row style="margin-top: 20px">
						<el-table
							:data="proPeopleList.proPeoList"
							border
							height="700"
							:header-cell-style="{
								background: '#611ddf',
								color: '#606266',
								'text-align': 'center',
							}"
							:cell-style="{ 'text-align': 'center' }"
						>
							<el-table-column prop="userName" label="成员" ></el-table-column>
							<el-table-column prop="totalHour" label="合计登记工时" ></el-table-column>
							<el-table-column v-for="(item,index) in proPeopleList.dateList" :key="index" :label="item">
								<template v-slot="scope">
									<span>{{scope.row.hourList[index]}}</span>
								</template>
							</el-table-column>
							
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
							type="week"
							:format="startTimeStamp + ' 至 ' + endTimeStamp"
							placeholder="选择周"
							:picker-options="onPicker"
							@change="dateChange"
							style="width:250px"
							>
						</el-date-picker>


					</el-form-item>
				</el-form>
			</div>
			<div>
				<el-button class="tableExport" @click="exportFile"  icon="el-icon-s-data" v-loading.fullscreen.lock="fullscreenLoading">报表下载</el-button>
			</div>
		</div>
	</div>
</template>

<script>
import { reactive, ref, onMounted } from "vue";
import { timeFun,getBetweenDate,countTotal,timeStr} from "../../components/common/mixin.js";
import { dayStafflList,dayProlList,proStaffList} from "../../request/api";
import fileDownload from "js-file-download";
import axios from "axios";
export default {
	name: "hoursStatistics",
	setup(props,context) {
		onMounted(() => {

			//每日成员工时-接口数据
			defaultDate()
			getTableList()

			//每日项目-接口数据
			getDayProMsg()

			//项目成员-接口数据
			getProStaffMsg()

		});

		
		

		//2.tab栏
		const activeName = ref("first");
		let elTabsName=ref('')  //// el-tabs切换获取name值
		function handleClick(tab) {
			timer.value=''
			startTimeStamp.value=''
			endTimeStamp.value=''
			elTabsName.value=tab.props.label

		}

		//3.日期选择
		let onPicker=reactive({
			firstDayOfWeek: 1,
		})
		let timer = ref("");
		let startTimeStamp = ref("");
		let endTimeStamp = ref("");
		let betweenDate=reactive({
			betweenDateList:[]
		})

		//默认日期
		 function defaultDate(){
			 var date=new Date()
				let defTime= date.getTime()
				startTimeStamp.value=timeFun(defTime-(24 * 60 * 60 * 1000) *6).slice(0,10)
				endTimeStamp.value=timeFun(defTime).slice(0,10)
				form.beginDateTime=timeFun(defTime-(24 * 60 * 60 * 1000) *6)
				form.endDateTime=timeFun(defTime)
				betweenDate.betweenDateList=getBetweenDate(startTimeStamp.value,endTimeStamp.value)
		 }
		//日期改变
		function dateChange(val) {
				if(val===null || val===undefined){
					return;
				}else if(elTabsName.value=='每日成员工时统计'|| elTabsName.value=='' || elTabsName.value==null){
					let timeStamp = val.getTime();
					console.log(timeStamp);
					startTimeStamp.value=timeFun(timeStamp).slice(0,10)
					endTimeStamp.value=timeFun(timeStamp + (24 * 60 * 60 * 1000) *6).slice(0,10)
					
					form.beginDateTime=''
					form.endDateTime=''
					form.beginDateTime=timeFun(timeStamp)
					form.endDateTime=timeFun(timeStamp + (24 * 60 * 60 * 1000) *6)
					betweenDate.betweenDateList=[]
					betweenDate.betweenDateList=getBetweenDate(startTimeStamp.value,endTimeStamp.value)
					getTableList()
					getDayProMsg()
				}else if(elTabsName.value=='每日项目工时统计'){
					let timeStamp = val.getTime();
					startTimeStamp.value=timeFun(timeStamp).slice(0,10)
					endTimeStamp.value=timeFun(timeStamp + (24 * 60 * 60 * 1000) *6).slice(0,10)
					
					form.beginDateTime=''
					form.endDateTime=''
					form.beginDateTime=timeFun(timeStamp)
					form.endDateTime=timeFun(timeStamp + (24 * 60 * 60 * 1000) *6)
					betweenDate.betweenDateList=[]
					betweenDate.betweenDateList=getBetweenDate(startTimeStamp.value,endTimeStamp.value)
					getTableList()
					getDayProMsg()
				}
		}
		
		//报表导出
		const fullscreenLoading=ref(false)
		function exportFile(){
			fullscreenLoading.value=true
			setTimeout(() => {

				if(elTabsName.value=='每日成员工时统计'|| elTabsName.value=='' || elTabsName.value==null){
				axios({
					method: "post",
					data: form,
					url: `${axios.defaults.baseURL}zentao/ztTaskestimate/downloadUserTaskHourReport`,
					responseType: "blob",
					headers: {
						"Content-Type": "application/json",
					},
				}).then((res) => {
					console.log(res);
					var date = new Date();
					let dTime = timeStr(date).slice(0,10);
					fileDownload(res.data, `每日成员工时统计报表${"-"+dTime}.xlsx`);
					context.emit("after-download");
					fullscreenLoading.value=false
				});
				}else if(elTabsName.value=='每日项目工时统计'){
					axios({
						method: "post",
						data: form,
						url: `${axios.defaults.baseURL}zentao/ztTaskestimate/downloadProjectTaskHourReport`,
						responseType: "blob",
						headers: {
							"Content-Type": "application/json",
						},
					}).then((res) => {
						console.log(res);
						var date = new Date();
						let dTime = timeStr(date).slice(0,10);
						fileDownload(res.data, `项目工时统计报表${"-"+dTime}.xlsx`);
						context.emit("after-download");
						fullscreenLoading.value=false
					});
				}else if(elTabsName.value=='项目成员工时统计'){
					axios({
						method: "post",
						data: form,
						url: `${axios.defaults.baseURL}zentao/ztTaskestimate/downloadUserProjectTaskHourReport`,
						responseType: "blob",
						headers: {
							"Content-Type": "application/json",
						},
					}).then((res) => {
						console.log(res);
						var date = new Date();
						let dTime = timeStr(date).slice(0,10);
						fileDownload(res.data, `项目成员工时统计报表${"-"+dTime}.xlsx`);
						context.emit("after-download");
						fullscreenLoading.value=false
					});
				}
			}, 3000);
		}


		//4.每日成员工时统计
		//4.1.请求列表数据
		let form = reactive({
			beginDateTime: "",
			endDateTime: "",
		});
		let lists = reactive({memberTableList:[]});

		let regisHours=ref('')//登记工时
		let regisNums=ref('')//登记次数
		let regisNum=ref('')//登记人数
		let PerHours=ref('')//人均工时

		//4.1获取每日成员工时统计
		function getTableList() {
			dayStafflList(form).then(res=>{
				console.log(res);
				let {list} =res.data
				lists.memberTableList=list

				regisHours.value = countTotal(list,'totalHour')  //登记工时计算
				regisNum.value = list.length  //登记人数计算
				PerHours.value = (regisHours.value / regisNum.value).toFixed(2)  //人均工时计算
				regisNums.value=res.data.registerCount  ////登记次数
			})
		}
		//.分页
		let dayStafftotals=ref(0)
		const dayStaffhandleCurrentChange = (val) => {
			form.p = val;
			getTableList()
		};

		// 成员工时统计报表Excel导出dayStaffFileExport

		

// ===============================================================================================
		//5.每日项目工时统计
		const dayTableList = reactive({
			proList:[]
		});

		let proRegisHours=ref('')//登记工时
		let regisHoursNum=ref('')//登记次数
		let proRegisNum=ref('')//登记项目
		let proPerHours=ref('')//项目平均工时

		// 5.0 请求接口数据
		function getDayProMsg(){
			dayProlList(form).then(res=>{
				console.log(res);
				let {list}=res.data
				dayTableList.proList=list
				//表格合并
				getSpanArr(dayTableList.proList, "projectId");
				// getSpanArr(dayTableList.proList, "totalHour");

			proRegisHours.value=countTotal(list,'totalHour') //计算登记工时
			regisHoursNum.value=res.data.registerCount  //计算登记次数
			console.log(proRegisHours.value/proRegisNum.value);
			proPerHours.value=(proRegisHours.value/proRegisNum.value).toFixed(2)

			})
		}

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

		
		// 5.3.计算 数据合并 索引
		function getSpanArr(data, params) {
			let arr = []; // 接收重构数组
			let pos = 0; // 设置索引
			spanArr = []; // 控制合并的数组
			let dataP = JSON.parse(JSON.stringify(data));

			//计算登记项目
			proRegisNum.value=groupBy(data, params).length

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

		
// ===============================================================================================

		//6.项目成员工时统计


		let proPeopleList=reactive({
				dateList:[],
				proPeoList:[],
				 proPeoHours:'',//登记工时
				 proPeoNum:'',//登记次数
	 			 proPeoNumber:'',//登记项目
	 			 proPeoPHours:'',//项目平均工时
		})
		//6.1请求接口数据
		function getProStaffMsg(){
			proStaffList(form).then(res=>{
				console.log(res);
				let {list,projectNames}=res.data
				proPeopleList.proPeoList=list
				proPeopleList.dateList=projectNames

				proPeopleList.proPeoHours=countTotal(list,'totalHour')
				proPeopleList.proPeoNum=res.data.registerCount
				proPeopleList.proPeoNumber=projectNames.length
				proPeopleList.proPeoPHours=(proPeopleList.proPeoHours/proPeopleList.proPeoNumber).toFixed(2)
			})
		}



		return {
			//请求列表数据
			form,

			//tab栏
			activeName,
			handleClick,
			elTabsName,

			fullscreenLoading,
			exportFile,//报表导出

			//日期选择
			onPicker,
			timer,
			startTimeStamp,
			endTimeStamp,
			dateChange,	
			betweenDate,
			// defaultDate,

			//每日成员工时统计
			lists,
			...lists,
			getTableList,
			regisHours,
			regisNum,
			regisNums,
			PerHours,
			// dayStafftotals,	
			// dayStaffhandleCurrentChange,

			//每日项目工时统计
			dayTableList,
			spanArr,
			groupBy,
			getSpanArr,
			dayTableMerge,
			getDayProMsg,
			// totals,
			// handleCurrentChange,
			proRegisHours,
			proRegisNum,
			regisHoursNum,
			proPerHours,
			
			

			//项目成员工时统计
			proPeopleList,
			getProStaffMsg,
			// proPeopletotals,
			// proPeopleCurrentChange

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


.el-table {
  overflow-y: auto !important;
}
</style>

