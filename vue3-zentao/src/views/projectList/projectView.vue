<template>
	<div>
		<el-row style="margin-top: 20px">
			<el-form :model="form" label-width="100px">
				<el-col :span="6">
					<el-form-item label="项目名称:">
						<el-select v-model="form.projectName" style="width: 100%" clearable filterable>
							<el-option v-for="(item,index) in tableList.projectName" :key="index" :label="item" :value="item"></el-option>
						</el-select>
					</el-form-item>
				</el-col>
				<el-col :span="6">
					<el-form-item label="状态:">
						<el-select style="width: 100%" v-model="form.status" clearable placeholder="请选择状态">
								<el-option label="正常" value="正常"></el-option>
								<el-option label="延期" value="延期"></el-option>
								<el-option label="已完成" value="已完成"></el-option>
							</el-select>
					</el-form-item>
				</el-col>
				<el-col :span="6">
					<el-form-item label="提交时间:">
						<el-date-picker
							v-model="timer"
							type="daterange"
							range-separator="至"
							start-placeholder="开始"
							end-placeholder="结束"
							@change="dateChangebirthday"
							style="width: 100%"
						>
						</el-date-picker>
					</el-form-item>
				</el-col>
				<el-col :span="6">
					<el-form-item label="是否提交:">
						<el-select style="width: 100%" v-model="form.isCommit" clearable placeholder="请选择是否提交">
								<el-option label="全部" value=""></el-option>
								<el-option label="已提交" value="1"></el-option>
								<el-option label="未提交" value="0"></el-option>
							</el-select>
					</el-form-item>
				</el-col>
				<el-col :span="6" style="margin-left:20px">
					<el-button @click="search">搜索</el-button>
					<el-button @click="reset">重置</el-button>
				</el-col>
			</el-form>
		</el-row>
		<!-- 添加-下载 -->
		<div class="tableList">
			<el-button class="tableExport" icon="el-icon-plus" @click="addDialog = true">新增</el-button>
			<el-button class="tableExport" icon="el-icon-s-data" @click="exportDialog = true">报表下载</el-button>
		</div>

		<!-- 表格 -->
		<el-row style="padding: 10px">
			<el-table
				:data="tableList.list"
				border
				height="600"
				:header-cell-style="{
					background: '#611ddf',
					color: '#606266',
					'text-align': 'center',
				}"
				:cell-style="{ 'text-align': 'center' }"
				:span-method="cellMerge"
			>
				<el-table-column prop="projectName" label="项目名称" width="200"></el-table-column>
				<el-table-column prop="version" label="版本号" width="250"></el-table-column>
				<el-table-column prop="status" label="状态"></el-table-column>
				<el-table-column prop="achievement" label="成果" :show-overflow-tooltip="true"></el-table-column>
				<el-table-column  label="进展">
					<template v-slot="scope">
							<span>{{scope.row.progress + "%"}}</span>
					</template>
				</el-table-column>
				<el-table-column prop="issue" label="问题" :show-overflow-tooltip="true"></el-table-column>
				<el-table-column prop="risk" label="风险" :show-overflow-tooltip="true"></el-table-column>
				<el-table-column prop="createdBy" label="负责人"></el-table-column>
				<el-table-column prop="commitTime" label="提交时间"></el-table-column>
				<el-table-column  label="提交状态">
					<template v-slot="scope">
						<span v-if="scope.row.isCommit===0">未提交</span>
						<span v-if="scope.row.isCommit===1">已提交</span>
					</template>
				</el-table-column>
				<el-table-column label="操作" width="150">
					<template v-slot="scope">
						<el-tooltip class="item" :disabled="scope.row.isCommit==1" effect="dark" content="编辑" placement="top" :enterable="false">
							<i class="el-icon-edit"  @click="editButton(scope.row)"></i>
						</el-tooltip>
					</template>
				</el-table-column>
			</el-table>
		</el-row>
		<el-pagination
      v-model="form.p"
      :page-sizes="[10, 20, 30, 50]"
      :page-size="form.s"
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
				<span>
					<el-button @click="exportDialog = false">取消</el-button>
					<el-button type="primary" @click="fileExport">确定</el-button>
				</span>
			</template>
		</el-dialog>

		<!-- 新增的对话框 -->
		<el-dialog title="新增项目概况" v-model="addDialog" width="45%">
			<el-form :model="addForm" ref="ruleForm"  label-width="100px">
				<el-row>
					<el-col :span="14">
						<el-form-item label="项目名称:" prop="projectName"
						:rules="[
									{
										required: true,
										message: '请选择项目名称',
										trigger: ['blur', 'change'],
									},
								]">
							<el-select style="width: 100%" v-model="addForm.projectName" clearable placeholder="请选择项目名称">
								<el-option v-for="(item,index) in tableList.projectName" :key="index" :label="item" :value="item"></el-option>
							</el-select>
						</el-form-item>
					</el-col>
					<el-col :span="14">
						<el-form-item label="版本号:" prop="version"
						:rules="[
                      {
                        required: true,
                        message: '请输入版本号',
                        trigger: 'blur',
                      },
                    ]">
							<el-input style="width: 100%" v-model="addForm.version"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="14">
						<el-form-item label="状态:" prop="status"
						:rules="[
									{
										required: true,
										message: '请选择状态',
										trigger: ['blur', 'change'],
									},
								]">
							<el-select style="width: 100%" v-model="addForm.status" clearable placeholder="请选择状态">
								<el-option label="正常" value="正常"></el-option>
								<el-option label="延期" value="延期"></el-option>
								<el-option label="已完成" value="已完成"></el-option>
							</el-select>
						</el-form-item>
					</el-col>
					
					<el-col :span="14">
						<el-form-item label="进展:"  prop="progress"
						:rules="[
									{
										required: true,
										message: '请选择进展',
										trigger: ['blur', 'change'],
									},
								]"
						>
							<el-select style="width: 100%" v-model="addForm.progress" clearable placeholder="请选择进展">
								<el-option label="0%" value="0"></el-option>
								<el-option label="5%" value="5"></el-option>
								<el-option label="10%" value="10"></el-option>
								<el-option label="15%" value="15"></el-option>
								<el-option label="20%" value="20"></el-option>
								<el-option label="25%" value="25"></el-option>
								<el-option label="30%" value="30"></el-option>
								<el-option label="35%" value="35"></el-option>
								<el-option label="40%" value="40"></el-option>
								<el-option label="45%" value="45"></el-option>
								<el-option label="50%" value="50"></el-option>
								<el-option label="55%" value="55"></el-option>
								<el-option label="60%" value="60"></el-option>
								<el-option label="65%" value="65"></el-option>
								<el-option label="70%" value="70"></el-option>
								<el-option label="75%" value="75"></el-option>
								<el-option label="80%" value="80"></el-option>
								<el-option label="85%" value="85"></el-option>
								<el-option label="90%" value="90"></el-option>
								<el-option label="95%" value="95"></el-option>
								<el-option label="100%" value="100"></el-option>
							</el-select>
						</el-form-item>
					</el-col>
					<el-col :span="24">
						<el-form-item label="成果:">
							<el-input type="textarea" v-model="addForm.achievement"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="24">
						<el-form-item label="问题:">
							<el-input type="textarea" v-model="addForm.issue"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="24">
						<el-form-item label="风险:">
							<el-input type="textarea" v-model="addForm.risk"></el-input>
						</el-form-item>
					</el-col>
				</el-row>
			</el-form>
			<span style="margin-left: 100px" slot="footer" class="dialog-footer">
				<el-button @click="addCancel">取消</el-button>
				<el-button type="primary" @click="addSave">保存</el-button>
				<el-button type="primary" @click="addSubmit">提交</el-button>
			</span>
		</el-dialog>

    <!-- 编辑的对话框 -->
		<el-dialog title="编辑项目概况" v-model="editDialog" width="45%">
			<el-form :model="editForm" ref="ruleForm" label-width="100px">
				<el-row>
					<el-col :span="14">
						<el-form-item label="项目名称:" prop="projectName"
						:rules="[
									{
										required: true,
										message: '请选择项目名称',
										trigger: ['blur', 'change'],
									},
								]">
							<el-select style="width: 100%" v-model="editForm.projectName" clearable placeholder="请选择项目名称">
								<el-option v-for="(item,index) in tableList.projectName" :key="index" :label="item" :value="item"></el-option>
							</el-select>
						</el-form-item>
					</el-col>
					<el-col :span="14">
						<el-form-item label="版本号:" prop="version"
						:rules="[
                      {
                        required: true,
                        message: '请输入版本号',
                        trigger: 'blur',
                      },
                    ]">
							<el-input style="width: 100%" v-model="editForm.version"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="14">
						<el-form-item label="状态:" prop="status" 
						:rules="[
									{
										required: true,
										message: '请选择状态',
										trigger: ['blur', 'change'],
									},
								]">
							<el-select style="width: 100%" v-model="editForm.status" clearable placeholder="请选择状态">
								<el-option label="正常" value="1"></el-option>
								<el-option label="延期" value="2"></el-option>
								<el-option label="已完成" value="3"></el-option>
							</el-select>
						</el-form-item>
					</el-col>
					<el-col :span="14">
						<el-form-item label="进展:"  prop="progress"
						:rules="[
									{
										required: true,
										message: '请选择进展',
										trigger: ['blur', 'change'],
									},
								]"
						>
							<el-select style="width: 100%" v-model="editForm.progress" clearable placeholder="请选择进展">
								<el-option label="0%" value="0"></el-option>
								<el-option label="5%" value="5"></el-option>
								<el-option label="10%" value="10"></el-option>
								<el-option label="15%" value="15"></el-option>
								<el-option label="20%" value="20"></el-option>
								<el-option label="25%" value="25"></el-option>
								<el-option label="30%" value="30"></el-option>
								<el-option label="35%" value="35"></el-option>
								<el-option label="40%" value="40"></el-option>
								<el-option label="45%" value="45"></el-option>
								<el-option label="50%" value="50"></el-option>
								<el-option label="55%" value="55"></el-option>
								<el-option label="60%" value="60"></el-option>
								<el-option label="65%" value="65"></el-option>
								<el-option label="70%" value="70"></el-option>
								<el-option label="75%" value="75"></el-option>
								<el-option label="80%" value="80"></el-option>
								<el-option label="85%" value="85"></el-option>
								<el-option label="90%" value="90"></el-option>
								<el-option label="95%" value="95"></el-option>
								<el-option label="100%" value="100"></el-option>
							</el-select>
						</el-form-item>
					</el-col>
					<el-col :span="24">
						<el-form-item label="成果:">
							<el-input type="textarea" v-model="editForm.achievement"></el-input>
						</el-form-item>
					</el-col>
					
					<el-col :span="24">
						<el-form-item label="问题:">
							<el-input type="textarea" v-model="editForm.issue"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="24">
						<el-form-item label="风险:">
							<el-input type="textarea" v-model="editForm.risk"></el-input>
						</el-form-item>
					</el-col>
				</el-row>
			</el-form>
			<span style="margin-left: 100px" slot="footer" class="dialog-footer">
				<el-button @click="editDialog=false">取消</el-button>
				<el-button type="primary" @click="editSave">保存</el-button>
				<el-button type="primary" @click="editSubmit">提交</el-button>
			</span>
		</el-dialog>
	</div>
</template>

<script>
import { reactive, ref,onMounted } from "vue";
import { timeStr } from "../../components/common/mixin.js";
import {proNameMsg,proViewListMsg,addproView,editproView } from "../../request/api";
import fileDownload from "js-file-download";
import { ElMessage } from 'element-plus'
import axios from "axios";
export default {
	name: "projectView",
	setup(props,context) {

		onMounted(() => {
			getProName()
			getTableList()
		});

		let form = reactive({
			//筛选数据
			projectName: "",
			status:"",
			startTime: "",
			endTime: "",
			isCommit:"",
			p: "1",
			s: "10",
		});
		let timer = ref(""); //提交时间

		let tableList = reactive({
			list:[],//报表数据
			projectName:[] //项目名称
		});

		// 0.获取项目名称
		function getProName(){
			proNameMsg().then(res=>{
			tableList.projectName=res.data
			})
		}

		//1.提交时间-日期转换
		function dateChangebirthday(val) {
			if (val == null) {
			} else {
				let timers = JSON.parse(JSON.stringify(val));
				form.startTime = timeStr(timers[0]);
				form.endTime = timeStr(timers[1]);
			}
		}

		//2.分页方法
		let totals=ref(0)
		const handleCurrentChange = (val) => {
			form.p = val;
			getTableList()
		};
		const handleSizeChange = (val) => {
			form.s = val;
			getTableList()
		};

		//搜索
		function search(){
			getTableList()
		}
		//重置
		function reset(){
			form.projectName=''
			form.status=''
			form.startTime=''
			form.endTime=''
			form.isCommit=''
			timer.value=''
			getTableList()
		}

		//3.获取表报数据
		function getTableList() {
			proViewListMsg(form).then((res) => {
				console.log(res);
				let {list,total} =res.data
				tableList.list=list
				totals.value=total
				console.log(tableList.list);
			});
		}

		//4.报表下载
		let exportDialog = ref(false); //报表下载的对话框
		function fileExport() {
			form.p = "";
			form.s = "";
			axios({
				method: "post",
				url: `${axios.defaults.baseURL}zentao/ztProjectsReport/getGeneralSituationExcel`,
				data: form,
				responseType: "blob",
				headers: {
					"Content-Type": "application/json",
				},
			}).then((res) => {
				fileDownload(res.data, "项目集报表.xlsx");
				context.emit("after-download");
				form.p = 1;
				form.s = 10;
				getTableList();
			});
			exportDialog.value = false;
		}

		//5.新增

		let addDialog = ref(false) //新增对话框
		let addForm = reactive({
			projectName: "",
			version: "",
			status: "",
			achievement: "",
			progress: "",
			issue: "",
			risk: "",
			isCommit:"",
		})
    //新增对话框取消
    function addCancel(){
      addDialog.value=false
      addForm.proName= "",
      addForm.versionNum= "",
      addForm.status= "",
      addForm.result= "",
      addForm.progress= "",
      addForm.problem= "",
      addForm.risk= ""
    }
    //保存
		const ruleForm = ref(null)
    function addSave(){
			ruleForm.value.validate(vaild => {
				if(!vaild){
					ElMessage({
						message: '请输入必要的表单项',
						type: 'warning',
					})
				}else{
					//发送请求
					addproView(addForm).then(res=>{
				  console.log(res);
					if(res.code!==200){
						ElMessage.error('保存项目概况失败')
					}else{
						ElMessage({
							message: '保存项目概况成功',
							type: 'success',
						})
						addDialog.value=false
						getTableList()
						addForm.projectName=''
						addForm.version=''
						addForm.status=''
						addForm.achievement=''
						addForm.progress=''
						addForm.issue=''
						addForm.risk=''
						addForm.isCommit=''
					}
				})
				}
			})


      
    }
		//提交
		function addSubmit(){
			ruleForm.value.validate(vaild => {
				if(!vaild){
					ElMessage({
						message: '请输入必要的表单项',
						type: 'warning',
					})
				}else{
					//发送请求
					addForm.isCommit='1'
					addproView(addForm).then(res=>{
				  console.log(res);
					if(res.code!==200){
						ElMessage.error('提交项目概况失败')
					}else{
						ElMessage({
							message: '提交项目概况成功',
							type: 'success',
						})
						addDialog.value=false
						getTableList()
						addForm.projectName=''
						addForm.version=''
						addForm.status=''
						addForm.achievement=''
						addForm.progress=''
						addForm.issue=''
						addForm.risk=''
						addForm.isCommit=''
					}
				})
				}
			})


      
    }

    //6.编辑
    let editDialog = ref(false); //新增对话框
    let editForm = reactive({
			id:'',
			projectName: "",
			version: "",
			status: "",
			achievement: "",
			progress: "",
			issue: "",
			risk: "",
			isCommit:''
		})
    //编辑按钮
    function editButton(row){
			if(row.isCommit==1){
				return false
			}else{
				editDialog.value=true,
				editForm.id= row.id,
				editForm.projectName= row.projectName,
				editForm.version= row.version,
				editForm.status= row.status,
				editForm.achievement= row.achievement,
				editForm.progress= row.progress,
				editForm.issue= row.issue,
				editForm.risk= row.risk
			}
      
    }
    //编辑保存
    function editSave(){
			ruleForm.value.validate(vaild => {
				if(!vaild){
					ElMessage({
						message: '请输入必要的表单项',
						type: 'warning',
					})
				}else{
					//发送请求
					editproView(editForm).then(res=>{
						if(res.code!==200){
							ElMessage.error('保存项目概况失败')
						}else{
							ElMessage({
								message: '保存项目概况成功',
								type: 'success',
							})
							editDialog.value=false
							getTableList()
							editForm.id=''
							editForm.projectName=''
							editForm.version=''
							editForm.status=''
							editForm.achievement=''
							editForm.progress=''
							editForm.issue=''
							editForm.risk=''
							editForm.isCommit=''
						}
				})
				}
			})
      
    }
    //编辑提交
    function editSubmit(){
			ruleForm.value.validate(vaild => {
				if(!vaild){
					ElMessage({
						message: '请输入必要的表单项',
						type: 'warning',
					})
				}else{
					//发送请求
					editForm.isCommit='1'
					editproView(editForm).then(res=>{
					if(res.code!==200){
						ElMessage.error('提交项目概况失败')
					}else{
						ElMessage({
							message: '提交项目概况成功',
							type: 'success',
						})
						editDialog.value=false
						getTableList()
						editForm.id=''
						editForm.projectName=''
						editForm.version=''
						editForm.status=''
						editForm.achievement=''
						editForm.progress=''
						editForm.issue=''
						editForm.risk=''
						editForm.isCommit=''
					}
				})
				}
			})
      
    }

		return {

			//获取项目名称
			getProName,

			form,
			timer,
			dateChangebirthday,
			tableList,
			search,//搜索
			reset,//重置
			handleCurrentChange, //分页
			totals,
			handleSizeChange,
			exportDialog,
			getTableList, //获取表报数据
			fileExport, //报表下载

			addDialog, //新增
			addForm,
      addCancel,//新增取消
			ruleForm,
			addSave,//保存
			addSubmit,//提交

      editDialog, //编辑对话框
      editForm,
      editButton,
			editSave,
			editSubmit
			
		};
	},
};
</script>

<style lang="less" scoped>
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
</style>
