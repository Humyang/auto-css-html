<template>
  <scroll-view scroll-y style="height:{{scrollHeight}}px;" bindscrolltoupper="upper" bindscrolltolower="lower" >
    
   </scroll-view>
</template>


<script>
let page = {
  data: {
    formData: {
      page: 0,
      size: 20
    },
    listData: [],
    nextPage: true,
    scrollHeight: 0,
    upTip: '加载中...'
  },
  lower: function(e) {
    console.log("ss");
    this.data.formData.pageNo = this.data.formData.pageNo + 1;
    this.datalist();
  },
  datalist() {
    this.setData({
      nextPage: false
    })
    ajax.address.addressList({
      "pageNo": this.data.formData.pageNo,
      "size": 20
    }).then(res => {

      let listData = this.data.listData
      listData = listData.concat(res.extra.list)

      this.setData({
        listData: listData,
        nextPage: true
      })

      if (res.extra.list.length==0) {
        console.log('到底了')
        this.setData({
          upTip: '到底了',
          nextPage: false,
          scrollHeight: ''
        })
      }
    })
  },
  onLoad: function (options) {

    var that = this;
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          scrollHeight: res.windowHeight
        });
      }
    });

    this.setData({
      formData: {
        "pageNo": 0,
        "size": 10
      }
    })
    this.datalist()
  },
};
</script>