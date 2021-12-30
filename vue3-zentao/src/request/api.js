/**   
 * api接口统一管理
 */
import { get, post, postWithHeader, downLoad, postAll } from './http'

//项目集报表数据
export const tableListMsg = p => get('neworder/deal/manager/contractDetail', p);

//项目概况报表数据
export const proViewListMsg = p => get('neworder/deal/manager/contractDetail', p);
//项目概况-新增报表
export const addproView = p => get('neworder/deal/manager/contractDetail', p);
//项目概况-编辑报表
export const editproView = p => get('neworder/deal/manager/contractDetail', p);


// ===============================================
export const apiAddInvoicePayment = p => post('neworder/deal/manager/addInvoicePayment', p);
export const userId = () => get('neworder/api/v1/allocate/getOrg');
