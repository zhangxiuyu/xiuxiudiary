<template>
	<view>
		
		<!-- 写一些文字 -->
		
		<view class="text-box" scroll-y="true">
			<text class="flex flex-direction">
				我打江南走过
				那等在季节里的容颜如莲花的开落
				
				东风不来，三月的柳絮不飞
				你的心如小小寂寞的城
				恰若青石的街道向晚
				跫音不响，三月的春帷不揭
				你的心是小小的窗扉紧掩
				
				我达达的马蹄是美丽的错误
				我不是归人，是个过客……
			 </text>
		</view>
		
		<!-- 轮播图  start -->
		<!-- <view  class="swiper">
			<view class="swiper-box">
				<swiper circular="true" autoplay="true" @change="swiperChange">
					<swiper-item v-for="swiper in swiperList" :key="swiper.id">
						<image :src="swiper.img" @tap="toSwiper(swiper)"></image>
					</swiper-item>
				</swiper>
				<view class="indicator">
					<view
						class="dots"
						v-for="(swiper, index) in swiperList"
						:class="[currentSwiper >= index ? 'on' : '']"
						:key="index"
					></view>
				</view>
			</view>
		</view> -->
		<!-- 轮播图 end -->
		
		<!-- 文字滚动 start-->
		<!-- <view>
			<uni-notice-bar scrollable="true" single="true" :text="notice_text"></uni-notice-bar>
		</view> -->
		<!-- 文字滚动 end-->
		
		<!-- 日志数量 start -->
		<!-- <view  class="hm-visits-card">
			<view class="cardClass">
				<rich-text :nodes="nodes" class="text"></rich-text>
				<uni-badge  type="warning"	 :text="public_num"></uni-badge>
			</view>
			
			<view class="cardClass">
				<rich-text :nodes="nodes_to" class="text"></rich-text>
				<uni-badge  type="warning"	 :text="protected_num"></uni-badge>
			</view>
		</view> -->
		<!-- 日志数量 end -->
		
	
		
		<!-- 日记列表 start -->
		<view class="goods-list">
			<view class="title" style="color: #59c88d;">
				<image src="/static/img/hua.png"></image>
				秀秀最近分享
				<image src="/static/img/hua.png"></image>
			</view>
			<view class="product-list">
				<view
				
					class="product"
					v-for="product in productList"
					:key="product.r_id"
					@tap="toDiary(product)"
				>
			
					<!-- 标题卡片模式 -->
					<uni-card :title=product.name mode="title"  :is-shadow="true" :thumbnail=product.img :extra=product.time>
					    {{ product.con }}
					</uni-card>
				</view>
			</view>
			<!-- <view class="loading-text">{{ loadingText }}</view> -->
		</view>
		<!-- 日记列表 end -->

		<!-- 热更新 -->
		<mUpdateAppTip @updateClose="updateClose" :update_title="update_title" :is_forced_update="is_forced_update"
					   :update_des="update_des" :update_type="update_type" :update_url="update_url" :is_update_app="is_update_app"></mUpdateAppTip>
   </view>
</template>

<script>
</script>

<style>
</style>


<script>
	import uniBadge from "@/components/uni-badge/uni-badge.vue"
	import uniNoticeBar from '@/components/uni-notice-bar/uni-notice-bar.vue'
	import uniCard from '@/components/uni-card/uni-card.vue'
	
	import *as http from '@/pages/tabBar/home/api.js'
	import mUpdateAppTip from '@/common/maozai-update/updateAppTip.vue'
	export default {
		components: {
			uniBadge,
			uniNoticeBar,
			uniCard,
			mUpdateAppTip
		},
		data() {
			return {
				swiperList: [
					 { id: 1, src: 'url1', img: '/static/img/1.jpg' },
					 { id: 2, src: 'url2', img: '/static/img/2.jpg' },
					 { id: 3, src: 'url3', img: '/static/img/3.jpg' }
				],
			    nodes: [{
			                name: 'div',
			                attrs: {
			                    class: '',
			                    style: 'text-align: center;'
			                },
			                children: [{
			                    type: 'text',
			                    text: '公开日记'
			                }]
						}],
				nodes_to: [{
							name: 'div',
							attrs: {
								class: '',
								style: 'text-align: center;'
							},
							children: [{
								type: 'text',
								text: '私人日记'
							}]
						}],
				public_num:7,
				protected_num:8,
				notice_text:"[单行] 这是 NoticeBar 通告栏，这是 NoticeBar 通告栏，这是 NoticeBar 通告栏",
				productList:[],
				page_total:1, // 总页数
				page:1, 	  // 当前页
				loadingText:'加载中...', 
				/*~~~~~~~~ 更新 ~~~~~~~~~*/
				version: '1.0.0',
				update_type: 0, //0是热更新，1整包更新
				update_url: '', //更新的地址
				update_title: '发现新的版本，请点击升级',
				update_des: '版本升级描述文件',
				is_update_app: false,
				is_forced_update: false, //是否强制升级
			}
		},
		methods: {
			onClick: function(e) {
			  console.log('onClick');
			},
			// 轮播图指示器
			swiperChange(event) {
				this.currentSwiper = event.detail.current;
			},
			// 日记详情
			toDiary(e) {
				// uni.showToast({ title: '商品' + e.r_id, icon: 'none' });
				console.log(e.r_id)
				uni.navigateTo({
					url: '../../diary/index?r_id=' + e.r_id
				});
			},
			//版本检测
			getUpdateApp() {
				this.$http
					.get({
						url: "version",
						data: {},
					})
					.then((res) => {
						console.log(res)
						const data = res.data;
						uni.setStorageSync('code_url', data.code_url)
						//#ifdef APP-PLUS
						plus.runtime.getProperty(plus.runtime.appid, widgetInfo => {
							if (widgetInfo.version != data.version_num) {
								this.update_url = data.url //更新的地址
								this.is_update_app = true, ///是否强制更新，不能关闭
										this.update_title = '发现新的版本，请点击升级'
								this.update_des = data.content
							}
						})
						//#endif
					});
			},
		},
		onLoad() {
			this.getUpdateApp()
			http.homeDiary({
				page:this.page
			}).then(res => {
				res.lists.map(x=>{
					this.productList.push({
						r_id:x.id,
						img:x.avatar,
						time:x.created_at,
						name:x.username,
						con:x.title,
						num:"",
					});
				})
				this.page_total = res.total
			}).catch(err => {
				uni.showToast({
					icon:"none",
					title:'服务器开小差！'
				})
			})
		},
		onReachBottom() {
			    console.log('触发下一页');
				if(this.page >= this.page_total){
					this.loadingText = '没有了。';
					return false;
				}else{
					this.page++;
					http.homeDiary({
						page:this.page
					}).then(res => {
						res.lists.map(x=>{
							this.productList.push({
								r_id:x.id,
								img:x.avatar,
								time:x.created_at,
								name:x.username,
								con:x.title,
								num:"",
							});
						})
					}).catch(err => {
						uni.showToast({
							icon:"none",
							title:'服务器开小差！'
						})
					})
				}
				
				setTimeout(function () {
				    uni.stopPullDownRefresh();	
				}, 500);
			},
	}
	
</script>

<style lang="scss" >
.swiper {
	width: 100%;
	margin-top: 10upx;
	display: flex;
	justify-content: center;
	.swiper-box {
		width: 92%;
		height: 30.7vw;
		overflow: hidden;
		border-radius: 15upx;
		box-shadow: 0upx 8upx 25upx rgba(0, 0, 0, 0.2);
		//兼容ios，微信小程序
		position: relative;
		z-index: 1;
		swiper {
			width: 100%;
			height: 30.7vw;
			swiper-item {
				image {
					width: 100%;
					height: 30.7vw;
				}
			}
		}
		.indicator {
			position: absolute;
			bottom: 20upx;
			left: 20upx;
			background-color: rgba(255, 255, 255, 0.4);
			width: 150upx;
			height: 5upx;
			border-radius: 3upx;
			overflow: hidden;
			display: flex;
			.dots {
				width: 0upx;
				background-color: rgba(255, 255, 255, 1);
				transition: all 0.3s ease-out;
				&.on {
					width: (100%/3);
				}
			}
		}
	}
}
.hm-visits-card {
	margin-left: 20upx;
	margin-top: 20upx;
	margin-right: 20upx;
	display: flex;
	align-items: center;
	flex-direction: row;
	justify-content: center;
	width: 750rpx;
	height: 165.9rpx;
	text-align: center;
}

.cardClass {
	display: flex;
	align-items: flex-start;
	flex-direction: column;
	justify-content: center;
	border-radius: 10.96rpx;
	box-shadow: 0px 10px 30px rgba(209, 213, 223, 0.5);
	background-color: #ffffff;
	width: 720.78rpx;
	height: 160.97rpx;
  
}
.text {
	opacity: 1;
	width: 124.68rpx;
	height: 46.75rpx;
	line-height: 46.75rpx;
	white-space: nowrap;
	color: #59c88d;
	font-size: 31.17rpx;
	font-weight: 400;

}

.goods-list {
	// background-color: #f4f4f4;
	.title {
		width: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
		height: 80upx;
		color: #59c88d;
		font-size: 30upx;
		margin-top: 10upx;
		image {
			width: 30upx;
			height: 30upx;
		}
	}
}

.text-box{
	    margin-bottom: 20px;
	    padding: 20px 0;
	    display: flex;
	    min-height: 150px;
	    background-color: #fff;
	    -webkit-box-pack: center;
	    -webkit-justify-content: center;
	    justify-content: center;
	    -webkit-box-align: center;
	    align-items: center;
	    text-align: center;
	    font-size: 15px;
	    color: #59c88d;
	    line-height: 1.8;
}
</style>
