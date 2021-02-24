<template>
	<view class="detailBox">
		<!-- loading动画 -->
		<mi-loading ref="loading" title="加载中" :hasMask="true"></mi-loading>
		
		<cu-custom :isBack="true">
			<block slot="backText"> </block>
			<block slot="content" class="tarbar">{{ viewTitle }}</block>
		</cu-custom>
		<view>
		    <video id="myVideo" class="video" :src=src controls></video>
		</view>
		<!--        分割线-->
		<!-- #ifdef MP-WEIXIN || MP-BAIDU -->
		<!-- 接口失效预告片与剧照暂时删除 -->
		<!-- #endif -->
	</view>
</template>

<script>
	
	import miLoading from '@/components/mi-loading/mi-loading.vue' // loading动画
	export default {
		components: {
			miLoading
		},
		onShareAppMessage: function(res) {
			var that = this;
			return {
				title: '老赵的杂货铺',
				path: 'pages/detail/index' ,
				success: function(res) {
					console.log("转发成功:" + JSON.stringify(res));
					that.shareClick();
				},
				fail: function(res) {
					console.log("转发失败:" + JSON.stringify(res));
				}
			}
		},
		onLoad: function(option) {
			
			// uni.setBackgroundTextStyle({
			//   textStyle: 'light' // 下拉背景字体、loading 图的样式为dark
			// })
			// uni.showLoading({
			// 	'title': '加载中'
			// })
			var that = this
			// 获取本地存储的图片
			uni.getStorage({
				key: 'storage_bg',
				success: function(res) {
					that.viewBg = res.data
				}
			});
			uni.getStorage({
				key: 'storage_h1',
				success: function(res) {
					that.viewTitle = res.data
				}
			});
			// 获取电影详情信息
			var id = option.id
			console.log(id)
			uni.request({
				url: 'http://101.201.150.84:5000/video_detail',
				method: 'GET',
				header: {
					"Content-Type": "application/text",
				},
				data: {
					id: id
				},
				success: function(res) {
				
					// res.data = res.data.subject
					that.info = res.data
					console.log(res.data)
					that.viewBanner = that.info.cover_url //电影封面
					that.src = that.info.video_src //电影封面
					// that.genres = res.data.types[0] + ' / ' //电影类型
					// that.countries = res.data.region + ' / ' // 上映国家
					// that.pubdates = res.data.release_year + ' / ' // 上映时间
					// that.durations = '片长: ' + res.data.duration // 片长
					// that.summary = res.data.short_comment.content // 剧情简介
					// that.directors = res.data.directors // 导演
					// that.casts = res.data.actors // 演员
					// #ifdef MP-WEIXIN || MP-BAIDU 
					// that.photos = res.data.photos // 剧照
					// that.trailers = res.data.trailers // 预告片
					// if(that.trailers.length < 1) {
					// 	that.trailersState = false
					// }
					// #endif
					// that.popular_comments = res.data.short_comment // 评论
					// // 随机使用静态资源头像
					// that.avatar = "~@/static/avatar/" +  Math.floor( Math.random()*9 ) + '.jpg'
					// console.log(that.avatar, 'that.avatar')
					// that.summarStatu = true
					// if (res.data.videos[0]) {
					// 	that.isVideosLook = true
					// 	that.movieUrl = res.data.videos[0].sample_link
					// } else {
					// 	that.isVideosLook = false
					// }
				}
			})
		},
		data() {
			return {
				info: {}, // 电影信息
				genres: '', // 电影类型
				countries: '', // 上映国家
				pubdates: '', // 上映时间
				durations: '', // 片长
				viewBg: '', // 背景img
				viewTitle: '', // 电影title
				viewBanner: '', //电影封面
				summary: '', // 剧情简介
				casts: [], // 演员
				directors: [], // 导演
				summarStatu: false, // 剧情简介是否显示
				movieUrl: '', // 电影视频
				trailers: [], // 预告片
				photos: [], // 剧照
				trailersState: true, //预告片状态
				popular_comments: [], // 精选评论
				isVideosLook: false, // 是否可以观看
				showText: false, // 展开收起
				avatar: '' ,// 静态头像，
				 src: '',
			}
		},
		methods: {
			toggleDescription(num) {
				this.showText = !this.showText
			}
		},
	}
</script>


<style scoped>
	@import "/common/colorui/main.css";
	@import "/common/colorui/icon.css";
	/* 文字遮罩 */
	.textMark {
		margin-top: 20rpx;
		border-radius: 80rpx 80rpx 14rpx 14rpx;
		background-color: rgba(0, 0, 0, .2);
	}

	.detailBox {
		width: 100%;
		height: 100vh;
		position: relative;
	}

	.detailBgMax {
		position: fixed;
		overflow: hidden;
		width: 100%;
		height: 100vh;
		top: 0;
		left: 0;
		z-index: 0;
	}

	.detailBg {
		width: 100%;
		height: 100vh;
		background-size: 100% 100%;
		filter: blur(60rpx);
		transform: scale(1.2);
		transition: 0.3s;
	}

	/* 导航tab */
	.tarbar {
		font-weight: 700 !important;
		color: #fff !important;
	}

	/* 大图 */
	.bigImgBox {
		height: 700rpx;
		/* background: pink; */
		transition: 1s;
		text-align: center;
	}

	/* 滚动视图窗口 */
	.scrollBox {}

	/* 图片从上至下动画 */
	@keyframes mymove {
		0% {
			margin-top: -200px
		}

		100% {
			margin-top: 50px
		}
	}

	.bigImg {
		width: 440rpx;
		height: 600rpx;
		margin-top: 50px;
		border-radius: 10rpx;
		animation: mymove 0.8s cubic-bezier(.41, -0.6, .68, .81) 1;
		/* -moz-box-shadow: 1px 1px 1px #dddddd;
		-webkit-box-shadow: 1px 1px 1px #dddddd;
		box-shadow: 1px 1px 1px #dddddd; */
	}

	.bigtitleBox {
		width: 90%;
		margin: 0 auto;
		text-align: center;
		line-height: 80rpx;
		font-weight: 700;
		color: #F7F7F7;
	}

	.textSty {
		width: 90%;
		margin: 0 auto;
	}

	/* 剧情简介 */
	.summarybox {
		width: 90%;
		margin: 40rpx auto 0;
		line-height: 60rpx;
		font-size: 40rpx;
		color: #EDE1D9;
		font-weight: 700;
	}

	/* 标题设置 */
	.hTitle {
		font-size: 40rpx;
		color: #EDE1D9;
		font-weight: 700;
		margin-left: 3%;
	}
	/* 演职员设置 */
	.castsBox {
		width: 90%;
		display: flex;
		margin: 30rpx auto 0;
		overflow: auto;
	}

	.castsBox-li {
		margin-right: 30rpx;
		text-align: center;
		;
	}

	.castsBox-li img {
		width: 200rpx;
		height: 260rpx;
		border-radius: 10rpx;
	}

	.summary {
		color: #fff;
		font-weight: 600;
		font-size: 30rpx;
		line-height: 40rpx;
		margin-top: 20rpx;
		/* max-height: 160upx; */
	}

	.summaryColor {
		color: #D3BBA7;
	}

	.summaryVColor {
		color: #fff;
		font-weight: 700;
	}

	/* 视频设置 */
	@-webkit-keyframes masked-animation {
		0% {
			background-position: 0 0
		}

		to {
			background-position: -100% 0
		}
	}

	.videoUrl {
		margin-top: 30rpx;
	}

	#myVideo {
	
		width: 750upx;
	}
	.video{
		width: 750upx;
	}
</style>
