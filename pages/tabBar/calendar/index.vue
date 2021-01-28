<template>
	<view>
		<!-- 日期 -->
		<view class="uni-list">
			<view class="uni-list-cell">
				<view class="uni-list-cell-db">
					<picker mode="date" :value="date"  @change="bindDateChange">
						<view class="uni-input" style="margin-left: 25%; margin-top: 20rpx;">日期 ： {{date}}</view>
					</picker>
				</view>
			</view>
		</view>
		
		<!-- 日历 -->
		<view class="warp">
		        <view class="box">
		            <t-table @change="change">
		                <t-tr v-for="item in tableList" :key="item.id">
		                    <t-td>{{ item.name }}</t-td>
		                    <t-td>{{ item.hobby }}</t-td>
		                </t-tr>
		            </t-table>
		        </view>
		       
		    </view>
		
	</view>
</template>

<script>
	 import tTable from '@/components/t-table/t-table.vue';
	    import tTh from '@/components/t-table/t-th.vue';
	    import tTr from '@/components/t-table/t-tr.vue';
	    import tTd from '@/components/t-table/t-td.vue';
	export default {
		 components: {
		            tTable,
		            tTh,
		            tTr,
		            tTd
		        },
		data() {
			const currentDate = this.getDate({
			            format: true
			        })
					
			return {
				date: currentDate,
				time: '12:01',
				tableList: []
			}
		},
		methods: {
			getDate(type) {
				const date = new Date();
				let year = date.getFullYear();
				let month = date.getMonth() + 1;
				let day = date.getDate();
	
				if (type === 'start') {
					year = year - 60;
				} else if (type === 'end') {
					year = year + 2;
				}
				month = month > 9 ? month : '0' + month;;
				day = day > 9 ? day : '0' + day;
				this.getCalendar(year,month,day)
				return `${year}-${month}-${day}`;
			},
			bindDateChange: function(e) {
			    this.date = e.target.value
				const str = this.date.split('-')
				this.getCalendar(str[0],str[1],str[2])
			},
			getCalendar(year,month,day){
				this.$http
					.get({
						url: "getCalendar",
						data: {
							year:year,
							month:month,
							day:day,
						},
					})
					.then((res) => {
						this.tableList = res.data
					});
			}
		}
	}
</script>

<style>
	.uni-column{
		flex-direction:column
	}
	.warp{
		margin-top: 30rpx;
	}
</style>
