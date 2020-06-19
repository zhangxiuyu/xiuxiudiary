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
				
				http.diaryAdd({
					text_data:text_data,
					html:html
				}).then(res => {
					console.log(res)
					
				}).catch(err => {
					console.log('添加失败')
				})
				
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
