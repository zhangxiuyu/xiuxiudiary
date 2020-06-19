const get = (token) =>{
	uni.getStorage({
	    key: 'token',
	    success: function (res) {
			console.log(res)
	       return res.data
	    }
	});
}
export {
	get
}