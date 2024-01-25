const t=$(".siteList"),e=t.find("li.last"),l=JSON.parse(localStorage.getItem("siteList"))||[{logo:"A",url:"https://www.acfun.cn"},{logo:"B",url:"https://www.bilibili.com/"}],i=t=>t.replace("https://","").replace("http://","").replace("www.","").replace("//.*/","").replace("/",""),s=()=>{t.find("li:not(.last)").remove(),l.forEach((t,o)=>{let r=$(`<li>
      <div class="site">
        <div class="logo">${i(t.url)[0].toUpperCase()}</div>
        <div class="link">${i(t.url)}</div>
        <div class='close'>\xd7</div>
      </div>
  </li>`).insertBefore(e);r.on("click",()=>{window.open(t.url)}),r.on("click",".close",t=>{t.stopPropagation(),l.splice(o,1),s(),localStorage.setItem("siteList",JSON.stringify(l))})})};s(),$(".addButton").on("click",()=>{let t=window.prompt("请问你要添加的网址是？");0!==t.indexOf("http")&&(t="https://"+t),l.push({url:t}),localStorage.setItem("siteList",JSON.stringify(l)),s()}),$(document).on("keypress",t=>{for(let e=0;e<l.length;e++)i(l[e].url)[0]===t.key&&window.open(l[e].url)});
//# sourceMappingURL=index.4376ee17.js.map
