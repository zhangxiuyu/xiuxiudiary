let baseUrl = 'http://www.lqy.com/api/'
import {
	token
} from './globalData.js'

const headers = {
	formdata: {
		'content-type': 'multipart/formdata'
	},
	json: {
		'content-type': 'application/json'
	},
	urlencoded: {
		'content-type': 'application/x-www-form-urlencoded'
	}
}

const http = async ({
	url,
	headertype,
	method,
	data
}) => {
	try{
		var tokende = token.get()
		console.log('tokende')
		console.log(tokende)
		headers[headertype]['Authorization'] = await token.get()
		// headers[headertype]['Authorization']='eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC9hcGkueml4aW5jby5jb21cL2FwaVwvbG9naW4iLCJpYXQiOjE1ODk3ODUyNDksImV4cCI6MTU5NDk2OTI0OSwibmJmIjoxNTg5Nzg1MjQ5LCJqdGkiOiIyd0lqcUlvWURyMjhwc1BXIiwic3ViIjp7ImlkIjoxMDA2LCJwaG9uZSI6IjEzMzEzMzI3NjkxIiwicGFzc3dvcmQiOiIkMnkkMTMkY0tSYWprWEk3WVhzTjFKcUl1aHhJdTRPOWdjcWpNVWtveWUzVTRkbmtwNy5WQS5jWjNmQTYiLCJuYW1lIjoiIiwibmlja25hbWUiOiJhYiIsImNvbXBhbnkiOiIiLCJ0ZWxlcGhvbmUiOiIiLCJhZGRyZXNzIjoiIiwiZW1haWwiOiIiLCJyZW1hcmsiOiIiLCJhY2NvdW50X2lkIjo3NTksImNyZWF0ZWRfYXQiOjE1ODM4MDM0MDcsImF2YXRhciI6Imh0dHA6XC9cL2ltZ3MuNWk3MS5vcmdcL3R4LnBuZyIsInNpZ25zdGF0dXMiOiIwIiwidGFnIjoiIiwic2V4IjoiMSIsImRlc2NyaXB0aW9uIjpudWxsLCJqb2IiOm51bGwsImNvbXBhbnlmbGFnIjoiMCIsImNvbXBhbnluYW1lIjpudWxsLCJwb2ludHMiOjAsIm9wZW5pZCI6bnVsbCwicmVhc29uIjoiIiwic3RhdHVzIjoiMSJ9fQ.GeuGygeJbjgboI0gHXPm0RX7nm2pVG_iD3Ho1npUeGo'
	}catch{
		headers[headertype]['Authorization'] = 'coco'
	}
	
	return new Promise((resolve, reject) => {
		if(url.includes('http')){
			baseUrl=''
		}
		uni.request({
			url: baseUrl + url,
			header: headers[headertype],
			method,
			data
		}).then(res => {
			if (res[1].data.code === 200) {
				resolve(res[1].data.data)
			} else if (res[1].data.code === 201) {
				reject(res[1].data.message)
			} else if (res[1].data.code === 202) {
				uni.$emit('showlogin')
				reject('登录身份失效')
			}
		}).catch(err => {
			reject(err)
		})
	})
}

const get = (url, data) => {
	if(data && data.id){
		url = `${url}/${data.id}`
		delete data.id
	}
	return http({
		url,
		headertype: 'json',
		method: 'GET',
		data
	})
}

const post = (url, data, headertype = 'json') => {
	return http({
		url,
		headertype,
		method: 'POST',
		data
	})
}
const put = (url, data, headertype = 'json') => {
	return http({
		url,
		headertype,
		method: 'PUT',
		data
	})
}
const del = (url, data, headertype = 'json') => {
	return http({
		url,
		headertype,
		method: 'DEL',
		data
	})
}
export {
	get,
	post,
	put,
	del
}
