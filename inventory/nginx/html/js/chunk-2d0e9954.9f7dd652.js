(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d0e9954"],{"8dc5":function(e,t,a){"use strict";a.r(t);var l=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("b-overlay",{attrs:{show:e.loading,opacity:"0.5"}},[a("div",{staticClass:"d-flex mb-3 align-items-center"},[a("div",{staticClass:"d-flex flex-column mr-2"},[a("date-packer",{attrs:{placeholder:"开始日期"},model:{value:e.detailsReq.startTime,callback:function(t){e.$set(e.detailsReq,"startTime",t)},expression:"detailsReq.startTime"}})],1),a("div",{staticClass:"d-flex flex-column mr-2"},[a("date-packer",{attrs:{placeholder:"结束日期"},model:{value:e.detailsReq.endTime,callback:function(t){e.$set(e.detailsReq,"endTime",t)},expression:"detailsReq.endTime"}})],1),a("div",{staticClass:"d-flex flex-column mr-2"},[a("a-select",{attrs:{allowClear:"",placeholder:"操作方式"},model:{value:e.detailsReq.type,callback:function(t){e.$set(e.detailsReq,"type",t)},expression:"detailsReq.type"}},[a("a-select-option",{attrs:{value:"入库成功"}},[e._v("入库成功")]),a("a-select-option",{attrs:{value:"凭证分配"}},[e._v("凭证分配")]),a("a-select-option",{attrs:{value:"撤销分配"}},[e._v("撤销分配")]),a("a-select-option",{attrs:{value:"出库使用中"}},[e._v("出库使用中")]),a("a-select-option",{attrs:{value:"标记可使用"}},[e._v("标记可使用")]),a("a-select-option",{attrs:{value:"标记已到账"}},[e._v("标记已到账")]),a("a-select-option",{attrs:{value:"标记未到账"}},[e._v("标记未到账")]),a("a-select-option",{attrs:{value:"移至回收站"}},[e._v("移至回收站")]),a("a-select-option",{attrs:{value:"移出回收站"}},[e._v("移出回收站")]),a("a-select-option",{attrs:{value:"移出回收站"}},[e._v("导出并移至回收站")])],1)],1),a("div",{staticClass:"d-flex flex-column mr-2"},[a("child-select",{attrs:{placeholder:"子账户"},model:{value:e.detailsReq.handler_chiId,callback:function(t){e.$set(e.detailsReq,"handler_chiId",t)},expression:"detailsReq.handler_chiId"}})],1),a("div",{staticClass:"d-flex flex-column mr-2"},[a("a-input",{attrs:{placeholder:"凭证编号",clearable:""},model:{value:e.detailsReq.transaction_id,callback:function(t){e.$set(e.detailsReq,"transaction_id","string"===typeof t?t.trim():t)},expression:"detailsReq.transaction_id"}})],1),a("l-button",{staticClass:"mr-2",attrs:{msg:"搜索"},on:{click:function(t){return e.getData(1,e.detailsReq.pagerNum)}}}),a("l-button",{attrs:{msg:"清空日志",type:"danger",icon:"icon-shanchu"},on:{click:function(t){return e.clearLog()}}})],1),a("b-table",{attrs:{hover:"",bordered:"","show-empty":"","empty-text":"暂无数据",items:e.tableData.list,fields:e.columns}},[a("template",{slot:"table-colgroup"},e._l(e.columns,(function(e){return a("col",{key:e.key,style:{width:e.width}})})),0)],2),a("m-pagination",{attrs:{data:e.tableData},on:{handleSizeChange:e.getData}})],1)},i=[],s=a("051c"),n=[{label:"游戏名称",key:"game_name",width:"25%"},{label:"档位名称",key:"package_name",width:"25%"},{label:"档位编号",key:"transaction_id",width:"15%"},{label:"子账户",key:"handler_chiId",width:"10%"},{label:"操作方式",key:"usage_state",width:"15%"},{label:"创建时间",key:"create_time",width:"10%"}],o={name:"StockLog",data:function(){return{columns:n,loading:!1,detailsReq:{handler_chiId:null,transaction_id:null,startTime:null,endTime:void 0,type:void 0,pagerIndex:1,pagerNum:100},tableData:{}}},methods:{getData:function(e,t){var a=this;this.loading=!0,this.detailsReq.pagerIndex=e,this.detailsReq.pagerNum=t,this.$http(s["x"],this.detailsReq).then((function(e){a.loading=!1,0===e.resCode&&(a.tableData=e.resData)}))},clearLog:function(){var e=this;this.$toast.confirm("立即清空操作日志","警告",(function(){e.loading=!0,e.$http(s["f"]).then((function(t){e.loading=!1,0===t.resCode&&e.getData(1,e.detailsReq.pagerNum)}))}))}},mounted:function(){this.getData(1,this.detailsReq.pagerNum)}},c=o,d=a("2877"),r=Object(d["a"])(c,l,i,!1,null,"48c21412",null);t["default"]=r.exports}}]);