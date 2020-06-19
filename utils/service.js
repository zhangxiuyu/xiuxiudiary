let baseUrl = 'http://www.lqy.com/api/'
// let baseUrl = 'https://www.ergouphp.com/api/'

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
		headers[headertype]['Authorization'] = uni.getStorageSync('token')
		// headers[headertype]['Authorization']='eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC93d3cubHF5LmNvbVwvYXBpXC9kaWFyeVVzZXJDb2RlIiwiaWF0IjoxNTkyNTQ5NTk4LCJleHAiOjE1OTI1NTMxOTgsIm5iZiI6MTU5MjU0OTU5OCwianRpIjoiM3cyalp3eVQyS045WFJuQiIsInN1YiI6eyJpZCI6Miwib3BlbmlkIjoib2xxVjU1TVMzdnVxQXBwQUlTLUowN3d3QmxfdyIsInVzZXJuYW1lIjoiXHU1ZjIwXHU3OWMwXHU5NmU4IiwiYXZhdGFyIjoiaHR0cHM6XC9cL3d4LnFsb2dvLmNuXC9tbW9wZW5cL3ZpXzMyXC9EWUFJT2dxODNlcTJTN2liYldpY0dpYjFCQjY3YnZVQVF3WTVWWUp4RkYxeUkyYmxiOXlhejdyZEdGejlMRHBTRkRvM1dzcUFsaWNTQWdvaWNOeGNRMkV3enBRXC8xMzIiLCJ1cGRhdGVkX2F0IjoiMjAyMC0wNi0xOCAxNTo0MDoxNSIsImNyZWF0ZWRfYXQiOiIyMDIwLTA2LTE4IDE1OjQwOjE1In19.ui4OGudK3DuFTbz8Y1q6KloJXn1XPnhiqbP0vULRXfA'
	}catch(err){
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
			
				// 这里移除 用户信息 
				uni.removeStorage({
				    key: 'userInfo',
				});
				// 这里移除 token
				uni.removeStorage({
				    key: 'token',
				});
				uni.showToast({
					title:res[1].data.message
				})
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
