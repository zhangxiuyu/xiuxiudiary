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
	export default {
	data() {
		return {
			html:"请开始你的表演",
			tools:['bold', 'italic', 'underline', 'align-left', 'align-center', 'align-right',  'font','clear'],
		}
	},
	components: {
		myeditor
	},
	methods: {
			// 点击发布
			saveEditor(res) {
				console.log(res);
			},
			// 点击取消
			hideEditor() {
				console.log(222);
				// 取消当前页面跳转我的页面
				uni.navigateBack()
			}
		}
	}
</script>

<style>
</style>
