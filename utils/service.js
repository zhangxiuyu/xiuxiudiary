// let baseUrl = 'http://www.lqy.com/api/'
let baseUrl = 'https://www.ergouphp.com/api/'

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
