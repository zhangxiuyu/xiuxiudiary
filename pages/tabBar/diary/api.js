import * as http from '../../../utils/service.js'

const diaryList = (data) =>{
	return new Promise((resolve,reject)=>{
		http.get('diaryList',data).then(res => {
			resolve(res)
		}).catch(err => {
			reject(err)
		})
	})
}
const getDate = (data) =>{
	return new Promise((resolve,reject)=>{
		http.get('getDate',data).then(res => {
			resolve(res)
		}).catch(err => {
			reject(err)
		})
	})
}
export{
	diaryList,
	getDate
}