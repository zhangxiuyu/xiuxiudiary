import * as http from '../../../utils/service.js'

const userCode = (data) =>{
	return new Promise((resolve,reject)=>{
		http.post('diaryUserCode',data).then(res => {
			resolve(res)
		}).catch(err => {
			reject(err)
		})
	})
}
export{
	userCode
}