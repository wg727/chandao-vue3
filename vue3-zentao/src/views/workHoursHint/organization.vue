<template>
	<!-- 工时提示-组织 -->
	<div>
		<!-- 表格 -->
		<div style="padding: 20px">
			<el-table
				:data="lists.tableList"
				border
				height="530"
				:header-cell-style="{
					background: '#add8e6',
					color: '#606266',
					'text-align': 'center',
				}"
				:cell-style="{ 'text-align': 'center' }"
			>
				<el-table-column type="index" label="ID" width="250"></el-table-column>
				<el-table-column prop="a" label="姓名" width="250"></el-table-column>
				<el-table-column prop="b" label="用户名"></el-table-column>
				<el-table-column prop="c" label="职位"></el-table-column>
				<el-table-column prop="d" label="邮箱"></el-table-column>
				<el-table-column prop="e" label="性别"></el-table-column>
				<el-table-column prop="f" label="电话"></el-table-column>
				<el-table-column prop="g" label="QQ"></el-table-column>
				<el-table-column prop="h" label="最后登录"></el-table-column>
				<el-table-column prop="t" label="访问次数"></el-table-column>
			</el-table>
			
		</div>
	</div>
</template>

<script>
import { reactive} from "vue";
// import { dayStafflList,dayProlList,proStaffList} from "../../request/api";
export default {
	name:'organization',
	setup(){
		let lists=reactive({
			tableList:[
				{a:'zs',b:'admin',c:'web',d:'zs@qq.com',e:'女',f:'18827289024',g:'1547815744',h:'2022/01/01',t:'3'},
				{a:'zs',b:'admin',c:'web',d:'zs@qq.com',e:'女',f:'18827289024',g:'1547815744',h:'2022/01/01',t:'3'},
				{a:'zs',b:'admin',c:'web',d:'zs@qq.com',e:'女',f:'18827289024',g:'1547815744',h:'2022/01/01',t:'3'}
			]
		})

		return{
			lists
		}
	}
}
</script>

<style>

</style>