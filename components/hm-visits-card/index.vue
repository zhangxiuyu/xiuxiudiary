<template>
  <div class="hm-visits-card">
    <div class="cardClass">
      <div class="titleClass">
        <text class="text">{{ options.text }}</text>
        <image class="img" :src="options.img" />
      </div>
      <div class="body">
        <div class="outer">
          <div class="wrap">
            <image class="jiantouimg" :src="options.jiantouimg" />
            <text class="num">{{ options.num }}</text>
          </div>
          <div class="block">
            <text class="nums">{{ options.nums }}</text>
            <text class="unit">{{ options.unit }}</text>
          </div>
        </div>
        <image class="shopLogo" :src="options.shopLogo" />
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'HmVisitsCard',
  props: {
    dataId: {
      type: String,
      default: 'hm-visits-card'
    },
    options: {
      type: Object,
      default: function() {
        return {
          text: '日常访问',
          img:
            './images/img_24227_0_1.png',
          jiantouimg:
            './images/img_24227_0_2.png',
          num: '+3.49%',
          nums: '178080',
          unit: '个',
          shopLogo:
            './images/img_24227_0_0.png'
        };
      }
    }
  },
  data() {
    return {};
  },
  methods: {}
};
</script>
<style>
@import './index.response.css';
</style>
