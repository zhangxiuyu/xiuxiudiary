const get = (token) =>{
	uni.getStorage({
	    key: 'token',
	    success: function (res) {
	       return res.data
	    }
	});
}
export {
	get
}