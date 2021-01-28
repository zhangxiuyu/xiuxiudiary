<template>
	<view>
		<view v-if="showHeader" class="status" :style="{position:headerPosition,top:statusTop}"></view>
		<view v-if="showHeader" class="header" :style="{position:headerPosition,top:headerTop}">
			<view class="addr"></view>
			<view class="input-box">
				
			</view>
			<view class="icon-btn">
				<!-- <view class="icon tongzhi" @tap="toMsg"></view> -->
				<view></view>
				<view class="icon setting" @tap="toSetting"></view>
			</view>
		</view>
		<!-- 占位 -->
		<view v-if="showHeader" class="place"></view>
		<!-- 用户信息 -->
		<view class="user">
			<!-- 头像 -->
			<view class="left">
				<image :src="user.face" @tap="toSetting"></image>
			</view>
			<!-- 昵称,个性签名 -->
			<view class="right">
				<view class="username" @tap="toLogin">{{user.username}}</view>
				<!-- <view class="signature" @tap="toSetting">{{user.signature}}</view> -->
				<button size='mini' class="sys_btn"  lang="zh_CN" @tap="appLoginWx">{{user.username != "" && user.username != undefined ? "" : "登录"}}</button>
			</view>
	
		</view>
	
		<!-- 工具栏 -->
		<view class="toolbar">
			<view class="title">我的工具栏</view>
			<view class="list">
				<view class="box" v-for="(row,index) in mytoolbarList" :key="index" @tap="toPage(row.url)">
					<view class="img">
						<image :src="row.img"></image>
					</view>
					<view class="text">{{row.text}}</view>
				</view>
			</view>
		</view>
		<!-- <view class="toolbar">
				<view class="title">我的工具栏</view>
				<view class="list">
					<button type="primary" size='mini' open-type='contact'>联系秀秀</button>
				</view>
			</view>
		<!-- 占位 -->
		<!-- <view class="place-bottom"></view> --> 
	</view>
</template>
<script>
import *as http from "@/pages/tabBar/user/api.js"
	export default {
		data() {
			return {
				isfirst:true,
				headerPosition:"fixed",
				headerTop:null,
				statusTop:null,
				showHeader:true,
				//个人信息,
				user:{
					username:'',
					face:'',
					signature:'',
					integral:0,
					balance:0,
					envelope:0
				},
				// 工具栏列表
				mytoolbarList:[
					{
						url:'/pages/tabBar/user/index',
						text:'云凤翻译',
						img:'/static/img/user/point.png',
					},{
						url:'/pages/tabBar/calendar/index',
						text:'老黄历',
						img:'/static/img/user/calendar.png',
					}
				]
			}
		},
		//下拉刷新，需要自己在page.json文件中配置开启页面下拉刷新 "enablePullDownRefresh": true
		onPullDownRefresh() {
		    setTimeout(function () {
		        uni.stopPullDownRefresh();
		    }, 1000);
		},
		onPageScroll(e){
			//兼容iOS端下拉时顶部漂移
			this.headerPosition = e.scrollTop>=0?"fixed":"absolute";
			this.headerTop = e.scrollTop>=0?null:0;
			this.statusTop = e.scrollTop>=0?null:-this.statusHeight+'px';
		},
		onLoad() {
			this.statusHeight = 0;
			// #ifdef APP-PLUS
			this.showHeader = false;
			this.statusHeight = plus.navigator.getStatusbarHeight();
			// #endif
			
			const that = this;
			uni.getStorage({
			    key: 'userInfo',
			    success: function (res) {
			        console.log(res.data);
					that.user = {
						username:res.data.username,
						face:res.data.avatar
					}
			    }
			});

		},
		onShow() {
			const that = this;
			uni.getStorage({
				key: 'userInfo',
				success: function (res) {
				    console.log(res.data);
					that.user = {
						username:res.data.username,
						face:res.data.avatar
					}
				},
				fail:function(){
					that.user ={
						username:'',
						face:''
					}
				}
			});
			
			
		},
		methods: {
			toSetting(){
				uni.navigateTo({
					url:'../../user/setting/setting'
				})
			},
			toPage(url){
				uni.navigateTo({
					url:url
				})
			},
			toMyQR(){
				uni.navigateTo({
					url:'../../user/myQR/myQR'
				})
			},
			 appLoginWx(){
				 console.log('登录')
				 uni.navigateTo({
				 	url: '/pages/tabBar/user/login'
				 });
				 
			// #ifdef MP-WEIXIN
			
				const _self = this;
				uni.getProvider({
				  service: 'oauth',
				  success: function (res) {
						uni.login({
							provider: 'weixin',
							success: (res) => {
								_self.authorization = res.code;
								uni.getUserInfo({
									provider: 'weixin',
									lang:'zh_CN',
									success: (info) => {
										// console.log(1233);
										// console.log(res);
										// console.log(info);
										_self.user = {
											username:info.userInfo.nickName,
											face:info.userInfo.avatarUrl
										}
										
										// 将用户信息放到缓存中
										uni.setStorage({
										    key: 'userInfo',
										    data: info.userInfo,
										    success: function () {
										        console.log('user 写入');
										    }
										});
										
										
										//这里请求接口 这里向服务端 写入用户，并返回 token
										http.userCode({
											code:res.code,
											username:info.userInfo.nickName,
											avatarUrl:info.userInfo.avatarUrl,
											gender:info.userInfo.gender,
											province:info.userInfo.province,
											city:info.userInfo.city,
											country:info.userInfo.country,
										}).then(res => {
											console.log(res)
											
											// 这里写入token
											uni.setStorage({
											    key: 'token',
											    data: res.token,
											    success: function () {
													
											        console.log('token 写入');
											    }
											});
											
											uni.setStorage({
											    key: 'userInfoId',
											    data: res.user_id,
											    success: function () {
											        console.log('Id 写入');
											    }
											});
											
										}).catch(err => {
											console.log(3333)
										})
										
									},
									fail: () => {
										uni.showToast({title:"微信登录授权失败",icon:"none"});
									}
								})
						
							},
							fail: () => {
								uni.showToast({title:"微信登录授权失败",icon:"none"});
							}
						})
				  }
				});
				//#endif
				
				
			}
			
		}
	} 
</script>
<style lang="scss">
	page{position: relative;background-color: #fff;}
	.status {
		width: 100%;
		height: 0;
		position: fixed;
		z-index: 10;
		background-color: #59c88d;
		top: 0;
		/*  #ifdef  APP-PLUS  */
		height: var(--status-bar-height);//覆盖样式
		/*  #endif  */
		
	}
	
	.header{
		width: 92%;
		padding: 0 4%;
		height: 100upx;
		display: flex;
		justify-content: flex-end;
		align-items: center;
		position: fixed;
		top: 0;
		z-index: 10;
		background-color: #59c88d;
		/*  #ifdef  APP-PLUS  */
		top: var(--status-bar-height);
		/*  #endif  */
		.icon-btn{
			width: 120upx;
			height: 60upx;
			flex-shrink: 0;
			display: flex;
			.icon{
				color: #fff;
				width: 60upx;
				height: 60upx;
				display: flex;
				justify-content: flex-end;
				align-items: center;
				font-size: 42upx;
			}
		}
	}
	.place{
		background-color: #59c88d;
		height: 100upx;
		/*  #ifdef  APP-PLUS  */
		margin-top: var(--status-bar-height);
		/*  #endif  */
	}
	.place-bottom{
		height: 300upx;
	}
	.user{
		width: 92%;
		padding: 0 4%;
		display: flex;
		align-items: center;
		// position: relative;
		background-color: #59c88d;
		padding-bottom: 120upx;
		.left{
			width: 20vw;
			height: 20vw;
			flex-shrink: 0;
			margin-right: 20upx;
			border: solid 1upx #fff;
			border-radius: 100%;
			image{
				width: 20vw;
				height: 20vw;
				border-radius: 100%;
			}
			
		}
		.right{
			width: 100%;
			.username{
				font-size: 36upx;
				color: #fff;
			}
			.signature{
				color: #eee;
				font-size: 28upx;
			}
		}
		.erweima{
			flex-shrink: 0;
			width: 10vw;
			height: 10vw;
			margin-left: 5vw;
			border-radius: 100%;
		
			display: flex;
			justify-content: center;
			align-items: center;
			background: linear-gradient(to left, #fbbb37 0%,#fcf0d0 105%);
			.icon{
				color: #7b6335;
				font-size: 42upx;
			}
		}
	}
	.order{
		width: 84%;
		margin: 30upx 4% 30upx 4%;
		padding: 30upx 4% 20upx 4%;
		background-color: #fff;
		box-shadow: 0upx 0upx 25upx rgba(0,0,0,0.1);
		border-radius: 15upx;
		.list{
			display: flex;
			border-bottom: solid 1upx #17e6a1;
			padding-bottom: 10upx;
			.box{
				width: 20%;
				.img{
					width: 100%;
					display: flex;
					justify-content: center;
					.icon{
						font-size: 50upx;
						color: #464646;
					}
				}
				.text{
					width: 100%;
					display: flex;
					justify-content: center;
					font-size: 28upx;
					color: #3d3d3d;
				}
			}
		}
		.balance-info{
			display: flex;
			padding: 10upx 0;
			.left{
				width: 75%;
				display: flex;
				.box{
					width: 50%;
					font-size: 28upx;
					
					.num{
						width: 100%;
						height: 50upx;
						display: flex;
						justify-content: center;
						align-items: flex-end;
						color: #f9a453;
					}
					.text{
						width: 100%;
						display: flex;
						justify-content: center;
						color: #3d3d3d;
						font-size: 28upx;
					}
				}
			}
			.right{
				border-left: solid 1upx #17e6a1;
				width: 25%;
				.box{
					
					.img{
						width: 100%;
						height: 50upx;
						display: flex;
						justify-content: center;
						align-items: flex-end;
						.icon{
							font-size: 45upx;
							color: #e78901;
						}
					}
					.text{
						width: 100%;
						display: flex;
						justify-content: center;
						font-size: 28upx;
						color: #3d3d3d;
					}
				}
			}
		}
	}
	.VIP{
		width: 84%;
		margin: -65upx auto 20upx auto;
		padding: 30upx 4%;
		background: linear-gradient(to left, #dea96d 0%,#f6d59b 100%);
		box-shadow: 0upx 0upx 25upx rgba(0,0,0,0.2);
		border-radius: 15upx;
		display: flex;
		align-items: center;
		.img{
			flex-shrink: 0;
			width: 60upx;
			height: 60upx;
			image{
				width: 60upx;
				height: 60upx;
			}
		}
		.title{
			width: 100%;
			color: #796335;
			font-size: 30upx;
		}
		.tis{
			width: 100%;
			display: flex;
			justify-content: flex-end;
			color: #fcf0d0;
			font-size: 26upx;
		}
	}
	.toolbar{
		width: 92%;
		margin: 0 4% 0 4%;
		padding: 0 0 20upx 0;
		background-color: #fff;
		box-shadow: 0upx 0upx 25upx rgba(0,0,0,0.1);
		border-radius: 15upx;
		.title{
			padding-top: 10upx;
			margin: 0 0 10upx 3%;
			font-size: 30upx;
			height: 80upx;
			display: flex;
			align-items: center;
		}
		.list{
			display: flex;
			flex-wrap: wrap;
			.box{
				width: 25%;
				margin-bottom: 30upx;
				.img{
					width: 23vw;
					height: 10.5vw;
					display: flex;
					justify-content: center;
					
					image{
						width: 9vw;
						height: 9vw;
					}
				}
				.text{
					width: 100%;
					display: flex;
					justify-content: center;
					font-size: 26upx;
					color: #3d3d3d;
				}
			}
		}
	}
</style>
