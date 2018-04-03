import fetch from '../ajax.js'
export default {
    login({params}){
        let {
            endTime,sign,list,merchantId,mobile,name,planName,remark,shopId,startTime
        } = obj
        return fetch('post','/login',params)
    }
}