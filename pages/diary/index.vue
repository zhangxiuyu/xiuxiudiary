<template>
    <view>
        <view class="article-meta">
            <text class="article-author">{{banner.author_name}}</text>
            <text class="article-text">发表于</text>
            <text class="article-time">{{banner.published_at}}</text>
		
        </view>
        <view class="article-content">
            <rich-text :nodes="htmlString"></rich-text>
        </view>
        <!-- #ifdef MP-WEIXIN -->
		<!-- 这里是小程序的广告位 -->
        <!-- <ad v-if="htmlString" unit-id="adunit-01b7a010bf53d74e"></ad> -->
        <!-- #endif -->
    </view>
</template>

<script>
    export default {
        data() {
            return {
                banner: {
					title:'我的日记',
					author_name:'zzzz',
					published_at:'2018.1.1'
				},
                htmlString: "评价列表，传入数据即可，具体参考Demo，修复当评价内容过长，样式显示错乱问题,修改示例图片评价列表，传入数据即可，具体参考Demo，修复当评价内容过长，样式显示错乱问题,修改示例图片评价列表，传入数据即可，具体参考Demo，修复当评价内容过长，样式显示错乱问题,修改示例图片评价列表，传入数据即可，具体参考Demo，修复当评价内容过长，样式显示错乱问题,修改示例图片评价列表，传入数据即可，具体参考Demo，修复当评价内容过长，样式显示错乱问题,修改示例图片评价列表，传入数据即可，具体参考Demo，修复当评价内容过长，样式显示错乱问题,修改示例图片评价列表，传入数据即可，具体参考Demo，修复当评价内容过长，样式显示错乱问题,修改示例图片评价列表，传入数据即可，具体参考Demo，修复当评价内容过长，样式显示错乱问题,修改示例图片评价列表，传入数据即可，具体参考Demo，修复当评价内容过长，样式显示错乱问题,修改示例图片评价列表，传入数据即可，具体参考Demo，修复当评价内容过长，样式显示错乱问题,修改示例图片评价列表，传入数据即可，具体参考Demo，修复当评价内容过长，样式显示错乱问题,修改示例图片评价列表，传入数据即可，具体参考Demo，修复当评价内容过长，样式显示错乱问题,修改示例图片评价列表，传入数据即可，具体参考Demo，修复当评价内容过长，样式显示错乱问题,修改示例图片评价列表，传入数据即可，具体参考Demo，修复当评价内容过长，样式显示错乱问题,修改示例图片评价列表，传入数据即可，具体参考Demo，修复当评价内容过长，样式显示错乱问题,修改示例图片"
            }
        },
        onShareAppMessage() {
            return {
                title: this.banner.title,
                path: 'pages/diary/index?detailDate=' + JSON.stringify(this.banner)
            }
        },
        onLoad(event) {
            // 目前在某些平台参数会被主动 decode，暂时这样处理。
            try {
                let detaion = JSON.parse(decodeURIComponent(event.detailDate));
				console.log(detaion)
            } catch (error) {
				console.log('errrrr')
                // this.banner = JSON.parse(event.detailDate);
            }

            // //this.getDetail();
            // uni.setNavigationBarTitle({
            //     title: this.banner.title
            // });
        },
        methods: {
            getDetail() {
                uni.request({
                    url: 'https://unidemo.dcloud.net.cn/api/news/36kr/' + this.banner.post_id,
                    success: (data) => {
                        if (data.statusCode == 200) {
                            this.htmlString = data.data.content.replace(/\\/g, "").replace(/<img/g,
                                "<img style=\"display:none;\"");
                        }
                    },
                    fail: () => {
                        console.log('fail');
                    }
                })
            }
        }
    }
</script>

<style>
    view {
        font-size: 28upx;
        line-height: 1.8;
    }

    .banner {
        height: 360upx;
        overflow: hidden;
        position: relative;
        background-color: #ccc;
    }

    .banner-img {
        width: 100%;
    }

    .banner-title {
        max-height: 84upx;
        overflow: hidden;
        position: absolute;
        left: 30upx;
        bottom: 30upx;
        width: 90%;
        font-size: 32upx;
        font-weight: 400;
        line-height: 42upx;
        color: white;
        z-index: 11;
    }

    .article-meta {
        padding: 20upx 40upx;
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        color: gray;
    }

    .article-text {
        font-size: 26upx;
        line-height: 50upx;
        margin: 0 20upx;
    }

    .article-author,
    .article-time {
        font-size: 30upx;
    }

    .article-content {
        padding: 0 30upx;
        overflow: hidden;
        font-size: 30upx;
        margin-bottom: 30upx;
    }
</style>
