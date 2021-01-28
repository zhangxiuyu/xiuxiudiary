<template>
	<view class="z-index center" v-if="is_update_app">
		<view class="update-box column">
			<image class="bg" src="./icon/app_update_bg.png"></image>
			<view class="box-font-box column">
				<view class="box-title">{{update_title}}</view>
				<scroll-view class="box-des-scroll" scroll-y="true">
					<view class="box-des">{{update_des}}</view>
				</scroll-view>
			</view>
			
			<view class="progress-box column" v-if="update_type == 0 && is_update">
				<progress class="progress" border-radius="35px" :percent="prpgress_num" activeColor="#1c89d6" show-info stroke-width="10" />
				<view class="progress-des">资源下载中，请稍后({{download_num_ed}}/{{download_num}}M)</view>
			</view>
			<view class="update-btn" @tap.stop="downloadBtn" v-if="!is_update">立即升级</view>
			<image v-if="!is_forced_update" class="close-img" src="./icon/app_update_close.png" @tap.stop="closeUpdate"></image>
		</view>
	</view>
</template>

<script>
	
	export default {
		name:'mUpdateAppTip',
		props:{
			is_update_app:{
				type:Boolean
			},
			is_forced_update:{
				type:Boolean
			},
			update_url:{
				type:String
			},
			update_type:{
				type:[Number,String]//0是热更新，1整包更新
			},
			update_title:{
				type:String
			},
			update_des:{
				type:String
			},
		},
		data() {
			return {
				prpgress_num:0,
				download_num_ed: 0, //已经下载数
				download_num: 0, //总下载数
				is_update:false,
			};
		},
		
		methods:{
			
			//确定更新
			downloadBtn() {
				if(this.update_type == 1) {
					plus.runtime.openURL(this.update_url);
					this.closeUpdate()
					return
				}
				
				this.is_update = true
				//下载更新文件
				const downloadTask = uni.downloadFile({
					url:this.update_url,
					success: res => {
						if (res.statusCode == 200) {
							this.installBtn(res.tempFilePath);
							return;
						}
					}
				});
			
				downloadTask.onProgressUpdate(res => {
					this.prpgress_num = res.progress;
					this.download_num_ed = (res.totalBytesWritten / Math.pow(1024.00, 2)).toFixed(2);
					this.download_num = (res.totalBytesExpectedToWrite / Math.pow(1024.00, 2)).toFixed(2);
				});
			},
			
			//点击安装
			installBtn(path) { 
				plus.runtime.install(path, {
					force: false
				}, res => {
					this.$emit('updateClose',{})
					//更新完重启app
					plus.runtime.restart();
				},err => {
					//重置更新的参数
					this.prpgress_num = 0
					this.download_num_ed = 0
					this.download_num = 0
					this.is_update = false
					this.$emit('updateClose',{})
					uni.showModal({
						title: '更新失败',
						content: err.message,
						showCancel: false,
						success: res => {
						}
					});
			
				});
			},
			
			//取消更新
			closeUpdate() {
				if(parseFloat(this.download_num_ed) > 0) {
					return getApp().globalData.hint('升级中，请勿关闭~');
				}
				this.$emit('updateClose',{})
			}
		}
	}
</script>

<style scoped lang="scss">
	.z-index {
		position: fixed;
		left: 0;
		top: 0;
		right: 0;
		bottom: 0;
		background-color: #000;
		background: rgba(0, 0, 0, 0.3);
		z-index: 10;
	}
	
	/* 盒子内容居中 */
	.center {
		display: flex;
		justify-content: center;
		align-items: center;
	}
	
	
	/* 内容纵向水平且居中 */
	.column {
		display: flex;
		flex-direction: column;
		align-items: center;
	}
	
	
	.update-box {
		position: relative;
		z-index: 1000;
		width: 586rpx;
		height: 734rpx;
		margin-bottom: 240rpx;
		.bg{
			width: 586rpx;
			height: 734rpx;
			position: absolute;
		}
	}
	
	.update-btn {
		color: #FFFFFF;
		text-align: center;
		line-height: 90rpx;
		font-size: 42rpx;
		width: 400rpx;
		height: 90rpx;
		border-radius: 35px;
		background: #b3977e;
		position: absolute;
		bottom: 30rpx;
		left: 92rpx;
		
	}
	
	.progress-box {
		width: 420rpx;
		position: absolute;
		bottom: 30rpx;
		left: 92rpx;
	}
	
	.progress {
		width: 420rpx;
		border-radius:35px;
	}
	
	.close-img {
		width: 70rpx;
		height: 140rpx;
		z-index: 1000;
		position: absolute;
		bottom: -140rpx;
		left: 258rpx;
	}
	
	.box-font-box {
		text-align: center;
		width: 100%;
		position: absolute;
		top: 330rpx;
	}
	
	.box-title {
		width: 100%;
		font-size: 30rpx;
		font-weight: bold;
		text-align: center;
		color: #666666;
	}
	
	.box-des-scroll {
		width: 526rpx;
		height: 180rpx;
		text-align: left;
		margin-top: 20rpx;
		color: #999999;
	}
	
	.box-des {
		margin-bottom: 20rpx;
		font-size: 28rpx;
		color: #666666;
	}
	
	.progress-des {
		margin-top: 20rpx;
		font-size: 28rpx;
		color: #6C6C6C;
	}
</style>
