<template>
	
	<view>
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
		}
	},
	components: {
		myeditor
	},
	methods: {
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
				uni.showModal({
					title: '提示',
					content: '您是否公开您的该篇日记',
					success: function (res) {
						if (res.confirm) {
							console.log('用户点击确定');
							try{
								http.diaryAdd({
									title:text_data,
									html:html,
									public:1
								}).then(res => {
									console.log(res)
									uni.showToast({
										title:'添加成功！',
										duration: 2000,
										icon:"success",
									})
									
									// 添加成功之后跳转 显示一下之后，倒计时到列表查看 
									setTimeout(function(){
										uni.navigateBack()
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
									title:'添加失败！'
								})
							}
						} else if (res.cancel) {
							console.log('用户点击取消');
							try{
								http.diaryAdd({
									title:text_data,
									html:html,
									public:2
								}).then(res => {
									console.log(res)
									uni.showToast({
										title:'添加成功！',
										duration: 2000,
										icon:"success",
									})
									
									// 添加成功之后跳转 显示一下之后，倒计时到列表查看 
									setTimeout(function(){
										uni.navigateBack()
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
									title:'添加失败！'
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
