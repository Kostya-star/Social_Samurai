"use strict";(self.webpackChunkfapp_13_06_22=self.webpackChunkfapp_13_06_22||[]).push([[672],{5672:function(s,e,n){n.r(e),n.d(e,{default:function(){return x}});var i=n(2807),a={dialogs:"Dialogs_dialogs__4fRSk",dialogsItems:"Dialogs_dialogsItems__QaYDL",active:"Dialogs_active__c8PjB",messages:"Dialogs_messages__NPIZ4"},t=n(3504),o=n(184),r=function(s){var e="/dialogs/"+s.id;return(0,o.jsx)("div",{className:a.dialog,children:(0,o.jsx)(t.OL,{to:e,children:s.name})})},u=function(s){return(0,o.jsx)("div",{className:a.message,children:s.message})},d=(n(2791),n(6871)),l=n(6139),c=n(704),g=n(9086),m=n(8610),f=(0,m.D)(50),h=(0,c.Z)({form:"dialogAddMessageForm"})((function(s){return(0,o.jsxs)("form",{onSubmit:s.handleSubmit,children:[(0,o.jsx)(l.Z,{component:g.gx,validate:[m.C,f],name:"newMessageBody",placeholder:"enter your message"})," ",(0,o.jsx)("br",{}),(0,o.jsx)("button",{children:"send"})]})})),j=function(s){var e=s.dialogsPage,n=e.dialogs.map((function(s){return(0,o.jsx)(r,{name:s.name,id:s.id},s.id)})),i=e.messages.map((function(s){return(0,o.jsx)(u,{message:s.message,id:s.id},s.id)}));e.newMessageBody;return s.isAuth?(0,o.jsxs)("div",{className:a.dialogs,children:[(0,o.jsx)("div",{className:a.dialogsItems,children:n}),(0,o.jsxs)("div",{className:a.messages,children:[i,(0,o.jsx)(h,{onSubmit:function(e){s.sendMessage(e.newMessageBody)}})]})]}):(0,o.jsx)(d.Fg,{to:"/login"})},p=n(8687),_=n(1466),x=(0,n(7781).qC)((0,p.$j)((function(s){return{dialogsPage:s.dialogsPage}}),(function(s){return{sendMessage:function(e){s((0,i.X)(e))}}})),_.D)(j)},1466:function(s,e,n){n.d(e,{D:function(){return m}});var i=n(1413),a=n(5671),t=n(3144),o=n(136),r=n(2882),u=n(2791),d=n(6871),l=n(8687),c=n(184),g=function(s){return{isAuth:s.auth.isAuth}},m=function(s){var e=function(e){(0,o.Z)(u,e);var n=(0,r.Z)(u);function u(){return(0,a.Z)(this,u),n.apply(this,arguments)}return(0,t.Z)(u,[{key:"render",value:function(){return this.props.isAuth?(0,c.jsx)(s,(0,i.Z)({},this.props)):(0,c.jsx)(d.Fg,{to:"/login"})}}]),u}(u.Component);return(0,l.$j)(g)(e)}}}]);
//# sourceMappingURL=672.95c21d89.chunk.js.map