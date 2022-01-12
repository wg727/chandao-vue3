/**   
 * api接口统一管理
 */
import { get, post} from './http'

//1.1.项目集报表数据
export const tableListMsg = () => get('zentao/ztProjectsReport/projectsReport');
//1.2.获取项目集报表统计数据
export const tableListTotalMsg = () => get('zentao/ztProjectsReport/projectsStatistics');


//2.工时统计
// 2.1获取每日成员工时统计
export const dayStafflList = p => post('zentao/ztTaskestimate/userTaskestimate', p);
// 2.2获取每日项目工时统计
export const dayProlList = p => post('zentao/ztTaskestimate/projectTaskestimate', p);
// 2.3获取项目成员工时统计
export const proStaffList = p => post('zentao/ztTaskestimate/userProjectTaskestimate', p);

// 2.4成员工时统计报表Excel导出
// export const dayStaffFileExport = p => post('zentao/ztTaskestimate/downloadUserTaskHourReport', p);


//3.项目概况
//3.1项目概况-项目名称
export const proNameMsg = () => get('zentao/ztProjectsReport/getProjectList');
//3.2项目概况-报表
export const proViewListMsg = p => post('zentao/ztProjectsReport/getGeneralSituation',p);
//3.3项目概况-新增报表
export const addproView = p => post('zentao/ztProjectsReport/insertGeneralSituation', p);
//3.4项目概况-编辑报表
export const editproView = p => post('zentao/ztProjectsReport/updateGeneralSituation', p);

// 3.工时提示
// 3.1工时录入提醒
export const searchAll = () => get('zentao/remind/searchAll');
// 3.2添加被通知人
export const addPeople = p => post('zentao/remind/add',p);
// 3.3删除被通知人
export const deletePeople = p => post('zentao/remind/delete',p);
// 3.4获取被通知人
export const getPeople = () => get('zentao/remind/get');


