(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d2304c4"],{ec4d:function(e,t,a){"use strict";a.r(t);var l=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("b-overlay",{attrs:{show:e.loading,opacity:"0.5"}},[a("div",{staticClass:"d-flex mb-3 align-items-center"},[a("div",{staticClass:"d-flex flex-column mr-2"},[a("game-select",{model:{value:e.detailsReq.game_name,callback:function(t){e.$set(e.detailsReq,"game_name",t)},expression:"detailsReq.game_name"}}),a("product-select",{staticClass:"mt-1",attrs:{game_name:e.detailsReq.game_name},model:{value:e.detailsReq.package_name,callback:function(t){e.$set(e.detailsReq,"package_name",t)},expression:"detailsReq.package_name"}})],1),a("div",{staticClass:"d-flex flex-column mr-2"},[a("a-input",{attrs:{placeholder:"编号查找",allowClear:""},model:{value:e.detailsReq.order_no,callback:function(t){e.$set(e.detailsReq,"order_no","string"===typeof t?t.trim():t)},expression:"detailsReq.order_no"}}),a("a-select",{staticClass:"mt-1",attrs:{allowClear:"",placeholder:"凭证状态"},model:{value:e.detailsReq.status,callback:function(t){e.$set(e.detailsReq,"status",t)},expression:"detailsReq.status"}},[a("a-select-option",{attrs:{value:"可使用"}},[e._v("可使用")]),a("a-select-option",{attrs:{value:"已分配"}},[e._v("已分配")]),a("a-select-option",{attrs:{value:"使用中"}},[e._v("使用中")]),a("a-select-option",{attrs:{value:"已到账"}},[e._v("已到账")]),a("a-select-option",{attrs:{value:"未到账"}},[e._v("未到账")])],1)],1),a("div",{staticClass:"d-flex flex-column mr-2"},[a("date-packer",{attrs:{placeholder:"入库开始日期"},model:{value:e.detailsReq.importStartDate,callback:function(t){e.$set(e.detailsReq,"importStartDate",t)},expression:"detailsReq.importStartDate"}}),a("date-packer",{staticClass:"mt-1",attrs:{placeholder:"入库结束日期"},model:{value:e.detailsReq.importEndDate,callback:function(t){e.$set(e.detailsReq,"importEndDate",t)},expression:"detailsReq.importEndDate"}})],1),"user_main"===e.$store.getters.getRole()?a("div",{staticClass:"d-flex flex-column mr-2"},[a("child-select",{attrs:{placeholder:"入库账户"},model:{value:e.detailsReq.import_child,callback:function(t){e.$set(e.detailsReq,"import_child",t)},expression:"detailsReq.import_child"}})],1):e._e(),a("l-button",{staticClass:"mr-2",attrs:{msg:"搜索"},on:{click:function(t){return e.getData(1,e.detailsReq.pagerNum)}}})],1),a("b-table",{attrs:{hover:"",bordered:"","show-empty":"","empty-text":"暂无数据",items:e.tableData.list,fields:e.columns,"primary-key":"order_no"}}),a("m-pagination",{attrs:{data:e.tableData},on:{handleSizeChange:e.getData}})],1)},s=[],i=a("051c"),o=[{label:"游戏名称",key:"game_name",width:"15%"},{label:"档位名称",key:"package_name",width:"25%"},{label:"档位价格",key:"package_fee",width:"5%"},{label:"货币代码",key:"currency_code",width:"5%"},{label:"库存单号",key:"order_no",width:"15%"},{label:"库存状态",key:"status",width:"5%"},{label:"入库账户",key:"create_subacount",width:"10%"},{label:"入库时间",key:"create_time",width:"10%"},{label:"生成时间",key:"receipt_time_char",width:"10%"}],n={name:"ImportDetails",data:function(){return{columns:o,loading:!1,detailsReq:{game_name:null,package_name:null,order_no:null,status:void 0,import_child:null,importStartDate:void 0,importEndDate:void 0,del_flag:0,pagerIndex:1,pagerNum:100},tableData:{}}},methods:{getData:function(e,t){var a=this;this.loading=!0,this.detailsReq.pagerIndex=e,this.detailsReq.pagerNum=t,this.$http(i["E"],this.detailsReq).then((function(e){a.loading=!1,0===e.resCode&&(a.tableData=e.resData)}))}},mounted:function(){this.getData(1,this.detailsReq.pagerNum)}},r=n,d=a("2877"),c=Object(d["a"])(r,l,s,!1,null,"241ab714",null);t["default"]=c.exports}}]);