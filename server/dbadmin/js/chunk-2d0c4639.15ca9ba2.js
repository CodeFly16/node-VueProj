(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d0c4639"],{"3b2f":function(e,t,a){"use strict";a.r(t);var n=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("a-card",[a("a-button",{attrs:{type:"primary"},on:{click:e.showModal}},[e._v(" 添加图书编目 ")]),a("a-spin",{attrs:{tip:"Loading...",spinning:e.spinning}},[a("a-table",{staticStyle:{"margin-top":"10px"},attrs:{bordered:"","data-source":e.dataSource,columns:e.columns},scopedSlots:e._u([{key:"operation",fn:function(t,n){return[e.dataSource.length?a("a-popconfirm",{attrs:{title:"确认删除吗"},on:{confirm:function(){return e.onDelete(n._id)}}},[a("a-button",{staticStyle:{"margin-left":"10px"},attrs:{type:"danger"}},[e._v(" 删除 ")])],1):e._e(),a("a-button",{staticStyle:{"margin-left":"10px"},on:{click:function(t){return e.edit(n._id)}}},[e._v("编辑")])]}}])})],1),a("a-modal",{attrs:{title:"添加读者类别","ok-text":"确认","cancel-text":"取消"},on:{ok:e.handleOk},model:{value:e.visible,callback:function(t){e.visible=t},expression:"visible"}},[a("a-form",{attrs:{"label-col":e.labelCol,"wrapper-col":e.wrapperCol}},[a("a-form-item",{attrs:{label:"图书分类号"}},[a("a-input",{attrs:{placeholder:"请输入图书分类号"},model:{value:e.model.cateNumber,callback:function(t){e.$set(e.model,"cateNumber",t)},expression:"model.cateNumber"}})],1),a("a-form-item",{attrs:{label:"图书分类名"}},[a("a-input",{attrs:{placeholder:"请输入分类名"},model:{value:e.model.cateName,callback:function(t){e.$set(e.model,"cateName",t)},expression:"model.cateName"}})],1)],1)],1)],1)},r=[],o=a("2909"),s=(a("96cf"),a("1da1")),c={name:"bookCatalog",data:function(){return{model:{},labelCol:{span:7},wrapperCol:{span:14},dataSource:[],columns:[{title:"图书分类号",dataIndex:"cateNumber"},{title:"图书分类名",dataIndex:"cateName"},{title:"操作",dataIndex:"operation",scopedSlots:{customRender:"operation"},width:"200px"}],spinning:!0,visible:!1,isEdit:!1}},created:function(){this.loadData()},methods:{onDelete:function(e){var t=this;return Object(s["a"])(regeneratorRuntime.mark((function a(){var n;return regeneratorRuntime.wrap((function(a){while(1)switch(a.prev=a.next){case 0:return a.next=2,t.$http[0].delete("/rest/bookCatalog/".concat(e));case 2:n=a.sent,200===n.status&&(t.loadData(),t.$message.success("删除成功"));case 4:case"end":return a.stop()}}),a)})))()},loadData:function(){var e=this;return Object(s["a"])(regeneratorRuntime.mark((function t(){var a;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return e.dataSource=[],t.next=3,e.$http[0].get("/rest/bookCatalog");case 3:a=t.sent,e.dataSource=Object(o["a"])(a.data),e.spinning=!1,console.log(e.dataSource);case 7:case"end":return t.stop()}}),t)})))()},showModal:function(){this.isEdit=!1,this.model={},this.visible=!0},handleOk:function(e){var t=this;return Object(s["a"])(regeneratorRuntime.mark((function e(){var a,n;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(console.log(t.model),t.isEdit){e.next=9;break}return e.next=4,t.$http[0].post("/rest/bookCatalog",t.model);case 4:a=e.sent,console.log(a),200===a.status&&(t.loadData(),t.$message.success("添加成功")),e.next=13;break;case 9:return e.next=11,t.$http[0].put("/rest/bookCatalog/".concat(t.model._id),t.model);case 11:n=e.sent,200===n.status&&(t.loadData(),t.$message.success("编辑成功"));case 13:t.visible=!1;case 14:case"end":return e.stop()}}),e)})))()},edit:function(e){var t=this;return Object(s["a"])(regeneratorRuntime.mark((function a(){var n,r;return regeneratorRuntime.wrap((function(a){while(1)switch(a.prev=a.next){case 0:return t.isEdit=!0,a.next=3,t.$http[0].get("/rest/bookCatalog/".concat(e));case 3:n=a.sent,r=n.data,t.model=r,t.visible=!0;case 7:case"end":return a.stop()}}),a)})))()}}},i=c,l=a("2877"),u=Object(l["a"])(i,n,r,!1,null,"14ba36ef",null);t["default"]=u.exports}}]);
//# sourceMappingURL=chunk-2d0c4639.15ca9ba2.js.map