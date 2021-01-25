<template>
	
	<view v-if="html">
		<myeditor class="editor" 
		    @cancel="hideEditor" 
		    @save="saveEditor" 
		    :html="html"
		    :imageUploader="uploadImg" 
		    :tools="tools" 
		    :muiltImage="fasel">
		</myeditor>
	</view>
	
</template>

<script>
	import myeditor from "@/components/robin-editor/editor.vue"
	import *as http from "@/pages/diary/api.js"
	export default {
	data() {
		return {
			html:"",
			tools:['bold', 'italic', 'underline', 'align-left', 'align-center', 'align-right',  'font','clear'],
			r_id:0
		}
	},
	components: {
		myeditor
	},
	onLoad(event) {
		this.r_id = event.r_id;
		this.getDetail()
	},
	methods: {
			getDetail(){
				try{
					http.getDetail({
						r_id:this.r_id
					}).then(res => {
						console.log(res)
						this.html = res.html
						console.log(this.html)
						
						
					}).catch(err => {
						uni.showToast({
							icon:"none",
							title:'服务器开小差！'
						})
					})
				}catch(err){
					console.log(err)
					
				}
			},
			// 点击发布
			saveEditor(res) {
				
				let html = res.html
				let text_data = res.text
				// text  截取13个中文字 作为列表显示标题使用
				const sub_text = (str) => {
					const start = 0;
					const n = 24;
					if (str.replace(/[\u4e00-\u9fa5]/g, '**').length <= n) {
					  return str;
					}
					let len = 0;
					let tmpStr = '';
					for (let i = start; i < str.length; i++) { // 遍历字符串
					  if (/[\u4e00-\u9fa5]/.test(str[i])) { // 中文 长度为两字节
					    len += 2;
					  } else {
					    len += 1;
					  }
					  if (len > n) {
					    break;
					  } else {
					    tmpStr += str[i];
					  }
					}
					return tmpStr;
				}
				text_data = sub_text(text_data)
				const that = this
				uni.showModal({
					title: '提示',
					content: '您是否公开您的该篇日记',
					success: function (res) {
						if (res.confirm) {
							console.log('用户点击确定');
							try{
								http.diaryEdit({
									diary_id:that.r_id,
									title:text_data,
									html:html,
									public:1
								}).then(res => {
									console.log(res)
									 uni.showToast({
										title:'修改成功',
										duration: 3000,
										icon:"success",
									});
									
									uni.switchTab({
										url: '/pages/tabBar/diary/diary'
									});
									
								}).catch(err => {
									console.log(err)
									uni.showToast({
										icon:"none",
										title:err
									})
								})
							}catch(err){
								console.log(err)
								uni.showToast({
									title:err
								})
							}
						} else if (res.cancel) {
							console.log('用户点击取消');
							try{
								http.diaryEdit({
									diary_id:this.r_id,
									title:text_data,
									html:html,
									public:2
								}).then(res => {
									console.log(res)
									uni.showToast({
										title:'修改成功！',
										duration: 2000,
										icon:"success",
									})
									
									// 修改成功之后跳转 显示一下之后，倒计时到列表查看 
									setTimeout(function(){
										uni.navigateTo({
											url: 'pages/tabBar/diary/diary'
										});
									},2000)
									
								}).catch(err => {
									console.log(err)
									uni.showToast({
										icon:"none",
										title:err+'，请登录后重试！'
									})
								})
							}catch(err){
								uni.showToast({
									title:err
								})
							}
						}
					}
				});
				
				
				
				
			},
			// 点击取消
			hideEditor() {
				uni.navigateBack()
			}
		}
	}
</script>

<style>
</style>
