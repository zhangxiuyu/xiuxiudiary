import * as http from '../../../utils/service.js'

const userCode = (data) =>{
	return new Promise((resolve,reject)=>{
		http.post('userCode',data).then(res => {
			resolve(res)
		}).catch(err => {
			reject(err)
		})
	})
}

const login = (data) =>{
	return new Promise((resolve,reject)=>{
		http.post('login',data).then(res => {
			resolve(res)
		}).catch(err => {
			reject(err)
		})
	})
}
export{
	userCode,
	login
}