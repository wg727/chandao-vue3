import axios from 'axios'; // 引入axios
import QS from 'qs'; // 引入qs模块，用来序列化post类型的数据
import { ElMessage } from 'element-plus';
import { getCookie } from '@/utils/cookie';

// 环境的切换
// 叶浪云   10.0.4.84
// 张文星   10.0.32.240
// 方孝梦   10.0.32.45 10.0.32.223
// 叶浪云
// let url = 'https://office.yunbiaokj.com:40019/'
// 报表生产
// let url = 'https://dopt.szkwrobot.com:10000/'
let url = 'http://10.0.32.241:8089/'
//let url = 'http://10.0.32.223:8089/'
// let url = ' https://office.yunbiaokj.com:3105/'
//let url = ' http://10.0.32.223:8089/'
// let url = 'http://10.0.4.84:8089/'
//  let url = 'http://10.0.4.93:10001/'
// let url = window.location.protocol + '//' + window.location.host + '/'

if (process.env.NODE_ENV == 'development') {
    axios.defaults.baseURL = url;
}
else if (process.env.NODE_ENV == 'debug') {
    axios.defaults.baseURL = url;
}
else if (process.env.NODE_ENV == 'production') {
    axios.defaults.baseURL = url;
}

axios.defaults.timeout = 300000; //超时时间

axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8';


axios.defaults.headers.post['corTicket'] = '1_1635304234016';
axios.defaults.headers.get['corTicket'] = '1_1635304234016';

// axios.defaults.headers.post['corTicket'] = getCookie('ssoCorTicket');
// axios.defaults.headers.get['corTicket'] = getCookie('ssoCorTicket');


//响应拦截器
axios.interceptors.response.use(
    response => {
        // 如果返回的状态码为200，说明接口请求成功，可以正常拿到数据     
        // 否则的话抛出错误
        if (response.status === 200) {
            return Promise.resolve(response);
        } else {
            return Promise.reject(response);
        }
    },
    // 服务器状态码不是2开头的的情况
    // 这里可以跟你们的后台开发人员协商好统一的错误状态码    
    // 然后根据返回的状态码进行一些操作，例如登录过期提示，错误提示等等
    // 下面列举几个常见的操作，其他需求可自行扩展
    error => {
        if (error.response.status) {
            switch (error.response.status) {

                // 404请求不存在
                case 404:
                    ElMessage({
                        message: '网络请求不存在',
                        duration: 1500,
                        type: error
                    });
                    break;
                // 其他错误，直接抛出错误提示
                case 500:
                    ElMessage({
                        message: error.response.data.message,
                        duration: 1500,
                        type: error
                    });
                    break;
                default:
                    ElMessage({
                        message: error.response.data.message,
                        duration: 1500,
                        type: error
                    });
            }
            return Promise.reject(error.response);
        }
    }
);

/**
 * get方法，对应get请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */
export function get(url, params) {
    return new Promise((resolve, reject) => {
        axios.get(url, {
            params: params
        }).then(res => {
            resolve(res.data);
        }).catch(err => {
            reject(err.data)
        })
    });
}

/** 
 * post方法，对应post请求 
 * @param {String} url [请求的url地址] 
 * @param {Object} params [请求时携带的参数] 
 */

export function post(url, params) {
    return new Promise((resolve, reject) => {
        axios.post(url, params)
            .then(res => {
                resolve(res.data);
            })
            .catch(err => {
                reject(err.data)
            })
    });
};
export function postWithHeader(url, params) {
    console.log(params);
    return new Promise((resolve, reject) => {
        axios.post(url, params)
            .then(res => {
                resolve(res.data);
            })
            .catch(err => {
                reject(err.data)
            })
    });

};

export function getNew(url, params) {
    return new Promise((resolve, reject) => {
        axios.get(
            url,
            params,
            {
                transformRequest: [(params) => {
                    return tansParams(params)
                }],
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
                responseType: 'blob'
            }
        ).then(res => {
            resolve(res.data);
        }).catch(err => {
            reject(err.data)
        })
    });
};

export function downLoad(url, params) {
    return new Promise((resolve, reject) => {
        axios.request(
            {
                url,
                method: "get",
                params,
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/x-www-form-urlencoded',
                    withCredentials: true,
                },
                responseType: 'blob'
            }
        ).then(res => {
            resolve(res.data);
        }).catch(err => {
            reject(err.data)
        })
    }

    );
}


export default { get, post, postWithHeader, getNew, downLoad }