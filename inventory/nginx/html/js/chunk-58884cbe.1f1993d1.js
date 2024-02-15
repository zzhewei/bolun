(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-58884cbe"],{8588:function(t,e,a){"use strict";a("d3b7"),a("ac1f"),a("3ca3"),a("1276"),a("ddb0"),a("2b3d");function n(t){return new Promise((function(e,a){try{var n=t.headers["content-disposition"],s=decodeURI(n.split("fileName=")[1]||n.split("filename=")[1]),i=new Blob([t.data]),o=window.URL.createObjectURL(i);if(window.navigator.msSaveBlob)try{window.navigator.msSaveBlob(i,s)}catch(r){console.log(r),a("下载失败，浏览器不支持")}else{var l=document.createElement("a");l.style.display="none",l.href=o,l.setAttribute("download",s),document.body.appendChild(l),l.click()}}catch(r){a("下载失败")}}))}e["a"]=n},eb9d:function(t,e,a){"use strict";a.r(e);var n=function(){var t=this,e=this,a=e.$createElement,n=e._self._c||a;return n("b-overlay",{attrs:{show:e.loading,opacity:"0.5"}},[n("div",{staticClass:"d-flex mb-3 align-items-center"},[n("div",{staticClass:"d-flex mr-2"},[n("a-input",{attrs:{placeholder:"游戏名称",allowClear:""},model:{value:e.gameReq.GAME_NAME,callback:function(t){e.$set(e.gameReq,"GAME_NAME","string"===typeof t?t.trim():t)},expression:"gameReq.GAME_NAME"}})],1),n("div",{staticClass:"d-flex mr-2"},[n("a-input",{attrs:{placeholder:"游戏代码",allowClear:""},model:{value:e.gameReq.GAME_CODE,callback:function(t){e.$set(e.gameReq,"GAME_CODE","string"===typeof t?t.trim():t)},expression:"gameReq.GAME_CODE"}})],1),n("l-button",{staticClass:"mr-2",attrs:{msg:"搜索"},on:{click:function(t){return e.getData(1,e.gameReq.pagerNum)}}}),n("l-button",{staticClass:"mr-2 bt_green",attrs:{msg:"添加",icon:"icon-tianjia"},on:{click:function(t){return e.$refs.gameAddDialog.show()}}}),n("l-button",{staticClass:"mr-2 bt_info",attrs:{msg:"导出",icon:"icon-xiazai"},on:{click:e.doDownload}}),n("l-button",{staticClass:"mr-2 bt_warn",attrs:{msg:"导入",icon:"icon-shangchuan"},on:{click:function(t){return e.$refs.uploadBtn.click()}}}),n("input",{ref:"uploadBtn",staticClass:"d-none",attrs:{type:"file",accept:".xls,.xlsx"},on:{change:e.doPauseExcel}})],1),n("b-table",{ref:"gameTable",attrs:{hover:"",bordered:"","show-empty":"",selectable:"","empty-text":"暂无数据",items:e.tableData.list,fields:e.columns,"primary-key":"UN_ID"},on:{"row-selected":function(e){return t.selected=e.map((function(t){return t.UN_ID}))}},scopedSlots:e._u([{key:"head(selected)",fn:function(){return[n("input",{attrs:{type:"checkbox"},on:{change:function(t){t.target.checked?e.$refs.gameTable.selectAllRows():e.$refs.gameTable.clearSelected()}}})]},proxy:!0},{key:"cell(selected)",fn:function(t){var e=t.rowSelected;return[n("input",{attrs:{type:"checkbox"},domProps:{checked:e}})]}},{key:"cell(action)",fn:function(t){return[n("span",[n("button",{staticClass:"text-purple",on:{click:function(a){return e.$refs.gameAddDialog.show(t.item)}}},[e._v(" 修改")])]),n("a-divider",{attrs:{type:"vertical"}}),n("span",[n("button",{staticClass:"text-danger",on:{click:function(a){return e.deleteGame(t.item)}}},[e._v(" 删除")])])]}}])},[n("template",{slot:"table-colgroup"},e._l(e.columns,(function(t){return n("col",{key:t.key,style:{width:t.width}})})),0)],2),n("m-pagination",{attrs:{data:e.tableData},on:{handleSizeChange:e.getData}}),n("game-add-dialog",{ref:"gameAddDialog",on:{confirm:e.handleOkAddUp}})],1)},s=[],i=(a("d81d"),a("d3b7"),a("051c")),o=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("a-modal",{attrs:{title:t.isAdd?"添加游戏":"修改游戏信息",visible:t.visible,keyboard:!1,destroyOnClose:!0,maskClosable:!1,width:400},on:{cancel:function(e){t.visible=!1}}},[a("a-form",{attrs:{size:"small","label-col":{span:5},"wrapper-col":{span:19}}},[a("a-form-item",{staticClass:"mb-0",attrs:{label:"游戏名称"}},[a("a-input",{model:{value:t.game.GAME_NAME,callback:function(e){t.$set(t.game,"GAME_NAME","string"===typeof e?e.trim():e)},expression:"game.GAME_NAME"}})],1),t.isAdd?a("a-form-item",{staticClass:"mb-0",attrs:{label:"游戏代码"}},[a("a-input",{model:{value:t.game.GAME_CODE,callback:function(e){t.$set(t.game,"GAME_CODE","string"===typeof e?e.trim():e)},expression:"game.GAME_CODE"}})],1):t._e()],1),a("span",{attrs:{slot:"footer"},slot:"footer"},[a("l-button",{staticClass:"mr-2",attrs:{msg:"取消",icon:"",type:""},on:{click:function(e){t.visible=!1}}}),a("l-button",{attrs:{msg:"确定",icon:""},on:{click:t.handleOk}})],1)],1)},l=[],r={name:"GameAddDialog",data:function(){return{visible:!1,isAdd:!0,game:{}}},methods:{show:function(t){this.isAdd=!t,this.game=t?JSON.parse(JSON.stringify(t)):{},this.visible=!0},handleOk:function(){this.visible=!1,this.$emit("confirm",this.game)}}},c=r,d=a("2877"),u=Object(d["a"])(c,o,l,!1,null,"79b97b8c",null),m=u.exports,f=a("1146"),h=a.n(f),g=a("8588"),p={name:"GameTable",components:{GameAddDialog:m},data:function(){return{loading:!1,tableData:{},columns:[{key:"selected"},{label:"游戏名称",key:"GAME_NAME",width:"40%"},{label:"游戏代码",key:"GAME_CODE",width:"50%"},{label:"操作",key:"action",width:"10%"}],gameReq:{GAME_NAME:null,GAME_CODE:null,pagerIndex:1,pagerNum:100},selected:[]}},methods:{getData:function(t,e){var a=this;this.loading=!0,this.gameReq.pagerIndex=t,this.gameReq.pagerNum=e,this.$http(i["A"],this.gameReq).then((function(t){a.loading=!1,0===t.resCode&&(a.tableData=t.resData)}))},handleOkAddUp:function(t){var e=this;this.loading=!0,this.$http(i["a"],t).then((function(t){e.loading=!1,0===t.resCode?(e.$toast.success("操作成功"),e.getData()):e.$toast.error(t.resMsg)}))},deleteGame:function(t){var e=this;this.$toast.confirm(t.GAME_NAME,"确认删除",(function(){return e.doDelete(t)}))},doDelete:function(t){var e=this;this.loading=!0,this.$http(i["i"],t).then((function(a){e.loading=!1,0===a.resCode?(e.$store.commit("deleteGame",t),e.$toast.success("删除成功")):e.$toast.error(a.resMsg)}))},doDownload:function(){var t=this;0!==this.selected.length?(this.loading=!0,this.$http(i["s"],{unIds:this.selected},!0).then((function(e){Object(g["a"])(e).catch((function(){t.$toast.error("下载失败")}))})).catch((function(){return t.$toast.error("下载失败")})).finally((function(){return t.loading=!1}))):this.$toast.error("请选择游戏")},doPauseExcel:function(t){var e=this,a=t.target.files;if(a.length<=0)return!1;var n=new FileReader;n.onload=function(a){try{var n=h.a.read(a.target.result,{type:"buffer"}),s=h.a.utils.sheet_to_json(n.Sheets[n.SheetNames[0]]);e.doUpload(s)}catch(t){e.$toast.error("文件解析错误")}finally{e.$refs.uploadBtn.value=null}},n.readAsArrayBuffer(a[0])},doUpload:function(t){var e=this;this.loading=!0;var a=t.map((function(t){return{GAME_CODE:t["游戏代码"],GAME_NAME:t["游戏名称"]}}));this.$http(i["R"],{games:a}).then((function(t){0===t.resCode?e.$toast.success("导入成功"):e.$toast.error(t.resMsg)})).finally((function(){return e.loading=!1}))}},mounted:function(){this.getData(1,this.gameReq.pagerNum)}},b=p,A=Object(d["a"])(b,n,s,!1,null,"035af52e",null);e["default"]=A.exports}}]);