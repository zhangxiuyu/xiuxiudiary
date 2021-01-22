<template>
	<view>
		<jinEdit placeholder="请输入内容" @editOk="editOk" :uploadFileUrl="uploadFileUrl"></jinEdit> 
	</view>
</template>

<script>
	import jinEdit from '../../components/jin-edit/jin-edit.vue';
	import *as http from "@/pages/diary/api.js"
	export default {
		data() {
			return {
				uploadFileUrl:'https://p.ergouphp.com/api/upImage'
			}
		},
		components: {
			jinEdit
		},
		methods: {
			// 点击发布
			editOk(res) {
				console.log(res);
				let html = res.html
				let text_data = res.text
				let st = 2;
				if (res.isPublic){
					 st = 1;
				}
				// text  截取13个中文字 作为列表显示标题使用
				const sub_text = (str) => {
					const start = 0;
					const n = 36;
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
				try{
					http.diaryAdd({
						title:text_data,
						html:html,
						public:st
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
					console.log(err)
					uni.showToast({
						title:'添加失败！'
					})
				}
			}
		}
	}
</script>

<style>
	
</style>
