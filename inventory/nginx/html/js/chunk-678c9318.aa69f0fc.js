(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-678c9318"],{"7d7e":function(e,t,a){"use strict";var s=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("a-modal",{attrs:{title:"修改备注",visible:e.visible,keyboard:!1,destroyOnClose:!0,maskClosable:!1,closable:!1,width:300},on:{cancel:function(t){e.visible=!1}}},[a("a-input",{attrs:{allowClear:""},model:{value:e.remark,callback:function(t){e.remark=t},expression:"remark"}}),a("span",{attrs:{slot:"footer"},slot:"footer"},[a("l-button",{staticClass:"mr-2",attrs:{msg:"取消",icon:"",type:""},on:{click:function(t){e.visible=!1}}}),a("l-button",{attrs:{msg:"确定",icon:""},on:{click:e.handleOk}})],1)],1)},l=[],i={name:"RemarkDialog",data:function(){return{visible:!1,remark:null}},methods:{show:function(){this.remark=null,this.visible=!0},handleOk:function(){this.visible=!1,this.$emit("confirm",this.remark)}}},o=i,r=a("2877"),n=Object(r["a"])(o,s,l,!1,null,"5b311f34",null);t["a"]=n.exports},bef3:function(e,t,a){"use strict";a.r(t);var s=function(){var e=this,t=this,a=t.$createElement,s=t._self._c||a;return s("b-overlay",{attrs:{show:t.loading,opacity:"0.5"}},[s("div",{staticClass:"d-flex mb-3 align-items-center"},[s("div",{staticClass:"d-flex flex-column mr-2"},[s("game-select",{model:{value:t.detailsReq.game_name,callback:function(e){t.$set(t.detailsReq,"game_name",e)},expression:"detailsReq.game_name"}}),s("product-select",{staticClass:"mt-1",attrs:{game_name:t.detailsReq.game_name},model:{value:t.detailsReq.package_name,callback:function(e){t.$set(t.detailsReq,"package_name",e)},expression:"detailsReq.package_name"}})],1),s("div",{staticClass:"d-flex flex-column mr-2"},[s("a-input",{attrs:{placeholder:"编号查找",allowClear:""},model:{value:t.detailsReq.order_no,callback:function(e){t.$set(t.detailsReq,"order_no","string"===typeof e?e.trim():e)},expression:"detailsReq.order_no"}}),s("a-select",{staticClass:"mt-1",attrs:{allowClear:"",placeholder:"凭证状态"},model:{value:t.detailsReq.status,callback:function(e){t.$set(t.detailsReq,"status",e)},expression:"detailsReq.status"}},[s("a-select-option",{attrs:{value:"使用中"}},[t._v("使用中")]),s("a-select-option",{attrs:{value:"已到账"}},[t._v("已到账")]),s("a-select-option",{attrs:{value:"未到账"}},[t._v("未到账")])],1)],1),s("div",{staticClass:"d-flex flex-column mr-2"},[s("date-packer",{attrs:{placeholder:"出库开始日期"},model:{value:t.detailsReq.exportStartDate,callback:function(e){t.$set(t.detailsReq,"exportStartDate",e)},expression:"detailsReq.exportStartDate"}}),s("date-packer",{staticClass:"mt-1",attrs:{placeholder:"出库结束时间"},model:{value:t.detailsReq.exportEndDate,callback:function(e){t.$set(t.detailsReq,"exportEndDate",e)},expression:"detailsReq.exportEndDate"}})],1),s("div",{staticClass:"d-flex flex-column mr-2"},[s("date-packer",{attrs:{placeholder:"入库开始日期"},model:{value:t.detailsReq.importStartDate,callback:function(e){t.$set(t.detailsReq,"importStartDate",e)},expression:"detailsReq.importStartDate"}}),s("date-packer",{staticClass:"mt-1",attrs:{placeholder:"入库结束日期"},model:{value:t.detailsReq.importEndDate,callback:function(e){t.$set(t.detailsReq,"importEndDate",e)},expression:"detailsReq.importEndDate"}})],1),"user_main"===t.role?s("div",{staticClass:"d-flex flex-column mr-2"},[s("child-select",{attrs:{placeholder:"出库账户"},model:{value:t.detailsReq.export_child,callback:function(e){t.$set(t.detailsReq,"export_child",e)},expression:"detailsReq.export_child"}})],1):t._e(),s("l-button",{staticClass:"mr-2 bt_info",attrs:{msg:"修改状态",icon:"icon-bianji"},on:{click:function(e){return t.doAction("status")}}}),s("l-button",{staticClass:"mr-2 bt_green",attrs:{msg:"备注",icon:"icon-bianji"},on:{click:function(e){return t.doAction("remark")}}}),"user_main"===t.role?s("l-button",{staticClass:"mr-2",attrs:{msg:"删除",type:"danger",icon:"icon-shanchu"},on:{click:function(e){return t.doAction("delete")}}}):t._e(),s("l-button",{staticClass:"mr-2",attrs:{msg:"搜索"},on:{click:function(e){return t.getData(1,t.detailsReq.pagerNum)}}})],1),s("b-table",{ref:"exDetails",attrs:{hover:"",bordered:"",selectable:"","show-empty":"","empty-text":"暂无数据",items:t.tableData.list,fields:t.columns,"primary-key":"order_no"},on:{"row-selected":function(t){return e.selectedOrderNo=t.map((function(e){return e.order_no}))}},scopedSlots:t._u([{key:"head(selected)",fn:function(){return[s("input",{attrs:{type:"checkbox"},on:{change:function(e){e.target.checked?t.$refs.exDetails.selectAllRows():t.$refs.exDetails.clearSelected()}}})]},proxy:!0},{key:"cell(selected)",fn:function(e){var t=e.rowSelected;return[s("input",{attrs:{type:"checkbox"},domProps:{checked:t}})]}}])},[s("template",{slot:"table-colgroup"},t._l(t.columns,(function(e){return s("col",{key:e.key,style:{width:e.width}})})),0)],2),s("m-pagination",{attrs:{data:t.tableData,selectArray:t.selectedOrderNo},on:{handleSizeChange:t.getData}}),s("status-dialog",{ref:"statusDialog",on:{confirm:t.upStatus}}),s("remark-dialog",{ref:"remarkDialog",on:{confirm:t.doRemark}})],1)},l=[],i=a("051c"),o=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("a-modal",{attrs:{title:"修改凭证状态",visible:e.visible,keyboard:!1,destroyOnClose:!0,maskClosable:!1,closable:!1,width:300},on:{cancel:function(t){e.visible=!1}}},[a("a-select",{staticClass:"w-100",attrs:{allowClear:"",placeholder:"凭证状态"},model:{value:e.status,callback:function(t){e.status=t},expression:"status"}},[a("a-select-option",{attrs:{value:"使用中"}},[e._v("使用中")]),a("a-select-option",{attrs:{value:"已到账"}},[e._v("已到账")]),a("a-select-option",{attrs:{value:"未到账"}},[e._v("未到账")])],1),a("span",{attrs:{slot:"footer"},slot:"footer"},[a("l-button",{staticClass:"mr-2",attrs:{msg:"取消",icon:"",type:""},on:{click:function(t){e.visible=!1}}}),a("l-button",{attrs:{msg:"确定",icon:""},on:{click:e.handleOk}})],1)],1)},r=[],n={name:"StatusDialog",data:function(){return{visible:!1,status:null}},methods:{show:function(){this.status=null,this.visible=!0},handleOk:function(){this.visible=!1,this.status&&this.$emit("confirm",this.status)}}},c=n,d=a("2877"),u=Object(d["a"])(c,o,r,!1,null,"baa20444",null),m=u.exports,p=a("7d7e"),h=[{key:"selected"},{label:"游戏名称",key:"game_name",width:"15%"},{label:"档位名称",key:"package_name",width:"15%"},{label:"档位价格",key:"package_fee",width:"10%"},{label:"货币代码",key:"currency_code",width:"10%"},{label:"库存单号",key:"order_no",width:"15%"},{label:"库存状态",key:"status",width:"5%"},{label:"出库账户",key:"owner",width:"10%"},{label:"出库时间",key:"use_time",width:"10%"},{label:"备注",key:"invalid_reason",width:"10%"}],f={name:"ExportDetails",components:{RemarkDialog:p["a"],StatusDialog:m},data:function(){return{columns:h,loading:!1,detailsReq:{game_name:null,package_name:null,order_no:null,status:void 0,export_child:null,exportStartDate:void 0,exportEndDate:void 0,importStartDate:void 0,importEndDate:void 0,del_flag:0,export:1,pagerIndex:1,pagerNum:100},tableData:{},selectedOrderNo:[],role:"user_main"}},methods:{getData:function(e,t){var a=this;this.loading=!0,this.detailsReq.pagerIndex=e,this.detailsReq.pagerNum=t,this.$http(i["E"],this.detailsReq).then((function(e){a.loading=!1,0===e.resCode&&(a.tableData=e.resData)}))},doAction:function(e){if(0!==this.selectedOrderNo.length)switch(e){case"delete":var t=this;this.$toast.confirm("移至回收站","确认删除",(function(){t.doRecycle()}));break;case"status":this.$refs.statusDialog.show();break;case"remark":this.$refs.remarkDialog.show();break}else this.$toast.error("请选择凭证")},doRecycle:function(){var e=this;this.loading=!0,this.$http(i["q"],{order_nos:this.selectedOrderNo,del_flag:1}).then((function(t){e.loading=!1,0===t.resCode?(e.getData(e.detailsReq.pagerIndex,e.detailsReq.pagerNum),e.selectedOrderNo=[],e.$toast.success("操作成功")):e.$toast.error(t.resMsg)}))},upStatus:function(e){var t=this;this.loading=!0;var a={order_nos:this.selectedOrderNo,status:e};this.$http(i["Q"],a).then((function(e){t.loading=!1,0===e.resCode?(t.getData(t.detailsReq.pagerIndex,t.detailsReq.pagerNum),t.selectedOrderNo=[]):t.$toast.error(e.resMsg)}))},doRemark:function(e){var t=this;this.loading=!0,this.$http(i["r"],{order_nos:this.selectedOrderNo,remark:e}).then((function(e){t.loading=!1,0===e.resCode?(t.getData(t.detailsReq.pagerIndex,t.detailsReq.pagerNum),t.selectedOrderNo=[],t.$toast.success("备注成功")):t.$toast.error(e.resMsg)}))}},mounted:function(){this.role=this.$store.getters.getRole(),this.getData(1,this.detailsReq.pagerNum)}},g=f,k=Object(d["a"])(g,s,l,!1,null,"5a07a8b0",null);t["default"]=k.exports}}]);