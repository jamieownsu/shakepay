(this.webpackJsonpshakepay=this.webpackJsonpshakepay||[]).push([[0],{171:function(t,e,n){},172:function(t,e,n){},309:function(t,e,n){"use strict";n.r(e);var a=n(0),r=n.n(a),c=n(72),o=n.n(c),i=(n(171),n(172),n(139)),s=n(140),u=n(141),h=n(161),m=n(311),d=n(162),l=n(315),j=n(158),f=n(159),b=n(63),y=n(60),v=n(16),p=function(t){Object(u.a)(n,t);var e=Object(h.a)(n);function n(t){var a;return Object(i.a)(this,n),(a=e.call(this,t)).state={error:null,isLoaded:!1,items:[]},a}return Object(s.a)(n,[{key:"componentDidMount",value:function(){var t=this;fetch("https://shakepay.github.io/programming-exercise/web/transaction_history.json").then((function(t){return t.json()})).then((function(e){t.setState({isLoaded:!0,items:e.reverse()})}),(function(e){t.setState({isLoaded:!0,error:e})}))}},{key:"formatData",value:function(){var t=this,e=this.state.items,n=[];return e.forEach((function(a,r){var c=new Date(a.createdAt);n.push({date:c.toLocaleDateString(),networth:t.getNetworth(e.slice(0,r))})})),n}},{key:"getNetworth",value:function(t){var e=0,n=0,a=0;return t.forEach((function(t){if("conversion"===t.type)"CAD"===t.from.currency?e-=t.from.amount:"BTC"===t.currency?n-=t.from.amount:"ETH"===t.currency&&(a-=t.from.amount),"CAD"===t.to.currency?e+=t.to.amount:"BTC"===t.to.currency?n+=t.to.amount:"ETH"===t.to.currency&&(a+=t.to.amount);else{var r="credit"===t.direction;"CAD"===t.currency?r?e+=t.amount:e-=t.amount:"BTC"===t.currency?r?n+=t.amount:n-=t.amount:"ETH"===t.currency&&(r?a+=t.amount:a-=t.amount)}})),e+2246e-8*n+.000322321609642528*a}},{key:"render",value:function(){var t=this.state,e=t.error,n=t.isLoaded;return e?Object(v.jsxs)("div",{className:"title",children:["Error: ",e.message]}):n?Object(v.jsxs)("div",{className:"App-header",children:[Object(v.jsx)("h2",{className:"title",children:"My Shakepay Networth"}),Object(v.jsxs)(m.a,{width:1e3,height:600,data:this.formatData(),children:[Object(v.jsx)(d.a,{type:"monotone",dataKey:"networth",stroke:"#8884d8",activeDot:{r:4}}),Object(v.jsx)(l.a,{stroke:"#ccc",strokeDasharray:"3 3"}),Object(v.jsx)(j.a,{label:{value:"Dates"},interval:100,dataKey:"date"}),Object(v.jsx)(f.a,{label:{value:"CAD",angle:-90,position:"insideLeft"}}),Object(v.jsx)(b.a,{formatter:function(t){return new Intl.NumberFormat("en-CA",{style:"currency",currency:"CAD",minimumFractionDigits:2,maximumFractionDigits:2}).format(t)}}),Object(v.jsx)(y.a,{})]})]}):Object(v.jsx)("div",{className:"title",children:"Loading..."})}}]),n}(r.a.Component);var O=function(){return Object(v.jsx)("div",{className:"App",children:Object(v.jsx)("header",{className:"App-header",children:Object(v.jsx)(p,{})})})},g=function(t){t&&t instanceof Function&&n.e(3).then(n.bind(null,317)).then((function(e){var n=e.getCLS,a=e.getFID,r=e.getFCP,c=e.getLCP,o=e.getTTFB;n(t),a(t),r(t),c(t),o(t)}))};o.a.render(Object(v.jsx)(r.a.StrictMode,{children:Object(v.jsx)(O,{})}),document.getElementById("root")),g()}},[[309,1,2]]]);
//# sourceMappingURL=main.82a7e415.chunk.js.map