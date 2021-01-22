<template>
	<view>
		<jinEdit :html="html" placeholder="请输入内容" ref="jinEdit" @editOk="editOk"  uploadFileUrl="/upLoad"></jinEdit> 
	</view>
</template>

<script>
	import jinEdit from '@/components/jin-edit/jin-edit.vue';
	import *as http from "@/pages/diary/api.js"
	export default {
		data() {
			return {
				html: "",
				r_id: 0
			}
		},
		components: {
			jinEdit
		},
		onLoad(event) {
			this.r_id = event.r_id;
			this.getDetail()
		},
		onBackPress(){
			// console.log(333)
			this.$refs.jinEdit.release(false)
		},
		methods: {
			
			getDetail(){
				try{
					http.getDetail({
						r_id:this.r_id
					}).then(res => {
						this.html = res.html
						uni.createSelectorQuery()
							.in(this)
							.select('.ql-container')
							.fields({
								size: true,
								context: true
							},res => {
								this.editorCtx = res.context;
								this.editorCtx.setContents({
									html: this.html
								})
							})
							.exec();
						
						
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
			editOk(res) {
				console.log(res);
				console.log(1);
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
					http.diaryEdit({
						diary_id:this.r_id,
						title:text_data,
						html:html,
						public:st
					}).then(res => {
						console.log(res)
						uni.showToast({
							title:'修改成功！',
							duration: 2000,
							icon:"success",
						})
						
						setTimeout(function(){
							uni.switchTab({
								url: '/pages/tabBar/diary/diary'
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
