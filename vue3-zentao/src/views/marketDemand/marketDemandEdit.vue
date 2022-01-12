<template>
	<div class="main">
		<!-- 市场需求管理编辑 -->
		<div class="header">基础信息</div>
		<div class="title">
			<div style="margin-top: 10px">
				<el-row>
					<el-col :span="8">需求标题：乐乐学校项目百科问答对接</el-col>
					<el-col :span="8">需求类型：研发需求</el-col>
					<el-col :span="8">状态：已解决</el-col>
				</el-row>
				<el-row style="margin-top: 20px">
					<el-col :span="8">创建人：张三</el-col>
					<el-col :span="8">创建时间：2022/01/05</el-col>
				</el-row>
				<el-row>
					<div style="height: 80px" class="dia_bottom login-body">
						<span class="record">状态记录：</span>
						<el-steps :active="statusList.length" finish-status="success" size="medium" :space="150" :align-center="true" style="width: 400px">
							<el-step v-for="(item, index) in statusList" :key="index" :title="item.title" :description="item.time" />
						</el-steps>
					</div>
				</el-row>
			</div>
		</div>

		<div class="header">需求描述</div>
		<div class="descript"></div>

		<!-- 提交 -->
		<div class="commit">
			<el-form style="padding: 10px" :model="commitForm" label-width="60px">
				<el-row>
					<el-col :span="4">
						<el-form-item label="状态:">
							<el-select v-model="commitForm.status" style="width: 100%" clearable filterable>
								<el-option label="" value=""></el-option>
								<el-option label="未激活" value=""></el-option>
								<el-option label="已驳回" value="1"></el-option>
								<el-option label="修复中" value="2"></el-option>
								<el-option label="挂起" value="2"></el-option>
								<el-option label="待验证" value="2"></el-option>
								<el-option label="已解决" value="2"></el-option>
								<el-option label="重新打开" value="2"></el-option>
								<el-option label="关闭" value="2"></el-option>
							</el-select>
						</el-form-item>
					</el-col>
					<el-col :span="4">
						<el-button class="file">附件上传</el-button>
					</el-col>
				</el-row>
				<el-row>
					<el-col :pan="4">
						<el-form-item>
							<el-input v-model="commitForm.remark" type="textarea" width="50%" placeholder="请输入描述..."></el-input>
						</el-form-item>
					</el-col>
				</el-row>
			</el-form>
		</div>

		
	</div>
</template>

<script>
import { reactive, ref } from "vue";

export default {
	name: "marketDemandEdit",
	setup() {
		// 状态记录
		const statusList = reactive([
			{ id: "001", title: "已开始", time: "2022-1-5" },
			{ id: "002", title: "进行中", time: "2022-1-6" },
			{ id: "003", title: "已结束", time: "2022-1-7" },
		]);

		// 提交
		let commitForm = reactive({
			status: "",
			remark:""
		});
		

		return {
			statusList,
			commitForm,
		};
	},
};
</script>

<style lang="less" scoped>
.main {
	// padding: 10px;
}
.header {
	width: 100%;
	height: 40px;
	font-size: 17px;
	font-weight: 700;
	padding: 10px;
	box-sizing: border-box;
	background-color: rgb(188, 224, 218);
}
.title {
	width: 100%;
	height: 250px;
	padding: 10px;
	background-color: rgb(246, 250, 249);

	//状态记录
	.dia_bottom {
		margin-top: 30px;
		.record {
			font-size: 14px;
			font-weight: 700;
			margin-bottom: 50px;
		}
		.el-steps {
			margin-top: 20px;
			margin-left: 0;
		}
	}
	.login-body {
		width: 100%;
		height: 90%;
		margin-top: 40px;
		::v-deep .el-step__icon {
			width: 30px;
			height: 30px;
		}
		::v-deep .el-step__line {
			top: 15px;
		}
	}
}
.descript {
	width: 100%;
	height: 250px;
	background-color: rgb(240, 241, 241);
}
.commit {
	width: 100%;
	height: 250px;
	background-color: rgb(231, 230, 227);
}
.file {
	margin-left: 20px;
	background: rgb(116, 203, 238);
}
</style>
