import * as http from '../../../utils/service.js'

const homeDiary = (data) =>{
	return new Promise((resolve,reject)=>{
		http.get('homeDiary',data).then(res => {
			resolve(res)
		}).catch(err => {
			reject(err)
		})
	})
}
export{
	homeDiary
}