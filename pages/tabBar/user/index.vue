<template>
	<view class="container">
		<ms-dropdown-menu>
            <ms-dropdown-item v-model="value1" :list="list"></ms-dropdown-item>
            <ms-dropdown-item v-model="value2" :list="list"></ms-dropdown-item>
         <!--   <ms-dropdown-item v-model="value2" :list="list">
                <view slot="title">
                    <view class="dropdown-item-title">
                        <view class="title">自定义title</view>
                        <view class="btn">打开</view>
                    </view>
                </view>
            </ms-dropdown-item> -->
            <!-- <ms-dropdown-item v-model="value3" :hasSlot="true" title="自定义下拉框内容" ref="dropdownItem">
                <view class="dropdown-item-content">
                    <view>=====此为测试内容=====</view>
                    <view class="btn" @click="choose">输出：test</view>
                    <view class="btn" @click="close">关闭</view>
                </view>
            </ms-dropdown-item> -->
        </ms-dropdown-menu>
        <!-- <view>输出：{{value1}}</view>
        <view>输出：{{value2}}</view>
        <view>输出：{{value3}}</view -->
		<view class="uni-textarea">
		     <textarea class="text"   placeholder-style="color:#F76260" placeholder="翻译内容" v-model="textareaInput"/>
		</view>
		<view class="function">
			<button class="mini-btn clear" type="primary" size="mini" @click="clear">清空</button>
			<button class="mini-btn" type="primary" size="mini" @click="translation">翻译</button>
		</view>
		
		 <view class="uni-fab__item">百度：{{todata1}}</view>
		 <view class="uni-fab__item">谷歌：{{todata2}}</view>
		 <view class="uni-fab__item">有道：{{todata3}}</view>
		 <!-- <view class="uni-fab__item">金山：{{todata4}}</view> -->
		 <view class="uni-fab__item">千词：{{todata5}}</view>
	</view>
</template>

<script>
	import msDropdownMenu from '@/components/ms-dropdown/dropdown-menu.vue'
    import msDropdownItem from '@/components/ms-dropdown/dropdown-item.vue'
	export default {
		 components: {
		            msDropdownMenu,
		            msDropdownItem
		        },
		 props: {
				},
		data() {
			return {
				list: [
					{
						text: '中文',
						value: 0
					},
					{
						text: '英文',
						value: 1
					},
					{
						text: '俄语',
						value: 2
					}
				],
				value1: 2,
				value2: 0,
				value3: 'init',
				todata1:'',
				todata2:'',
				todata3:'',
				todata4:'',
				todata5:'',
				textareaInput:''
			}
		},
		watch: {
		},
		mounted() {
		},
		methods: {
			clear(){
				this.textareaInput = "";	
				this.todata1='';
				this.todata2='';
				this.todata3='';
				this.todata4='';
				this.todata5='';
			},
			translation(){
				console.log(this.value1)
				console.log(this.value2)
				this.$http.get({
						url: "tranTest",
						data: {
							'text':this.textareaInput,
							'th':this.value1,
							'to':this.value2,
						},
					}).then((res) => {
					console.log(res)
					this.todata1 = res.data.baidu
					this.todata2 = res.data.google
					this.todata3 = res.data.youdao
					this.todata4 = res.data.jinshan
					this.todata5 = res.data.qianci
				});
			},
			buttonText:function(e){
				console.log(e.detail.value)
				console.log(e.detail.value)
				console.log(this.value1)
				console.log(this.value2)
				this.$http.get({
						url: "tranTest",
						data: {
							'text':e.detail.value,
							'th':this.value1,
							'to':this.value2,
						},
					}).then((res) => {
					console.log(res)
					this.todata1 = res.data.baidu
					this.todata2 = res.data.google
					this.todata3 = res.data.youdao
					this.todata4 = res.data.jinshan
					this.todata5 = res.data.qianci
				});
			}
		}
	}
</script>

<style scoped>
	.container {
		padding: 20px;
		font-size: 14px;
		line-height: 24px;
	}
	.uni-textarea{
		
	}
	.uni-textarea textarea{
		padding:20upx ;
		border: 1upx solid #CCCCCC;
		border-radius: 10upx ;
	}
	.function{
		display: flex;
		justify-content: flex-end;
		margin: 30upx 0;
	}
	.function button{
		border: 0;
		margin: 0 20upx;
	}
	.function .clear{
		background-color: #9a9a9a; 
	}
	.uni-fab__item{
		font-size: 30upx;
		margin: 20upx 0;
		user-select: text;
	}
</style>
