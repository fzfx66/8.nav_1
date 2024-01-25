const $siteList = $('.siteList')
const $lastLi = $siteList.find('li.last')
const siteList = localStorage.getItem('siteList')
const siteListObject = JSON.parse(siteList)
// 将字符串转变为对应的对象;若 siteList 为空，返回 null；
const hashMap = siteListObject || [
  {logo:'A',url:'https://www.acfun.cn'},
  {logo:'B',url:'https://www.bilibili.com/'}
]

const simplifyUrl = (url)=>{
  return url.replace('https://','').replace('http://','').replace('www.','').replace('/\/.*/','').replace('/','')    //删除 / 开头的内容
}

const render = ()=>{
  $siteList.find('li:not(.last)').remove()  
  //找寻所有li（除了最后一个具新增功能的li），清空
  hashMap.forEach((node,index)=>{
    const $li = $(`<li>
      <div class="site">
        <div class="logo">${simplifyUrl(node.url)[0].toUpperCase()}</div>
        <div class="link">${simplifyUrl(node.url)}</div>
        <div class='close'>×</div>
      </div>
  </li>`).insertBefore($lastLi)
  $li.on('click',()=>{
    window.open(node.url)    //可代替a标签的功能，比a标签更具操作空间 
  })
  $li.on('click','.close',(e)=>{
    e.stopPropagation()      //点击关闭按钮时阻止冒泡
    hashMap.splice(index,1)
    render()
    localStorage.setItem('siteList',JSON.stringify(hashMap))
    })   
  })
}

render()

$('.addButton')
    .on('click',()=>{
        let user_input = window.prompt('请问你要添加的网址是？')
        if(user_input.indexOf('http')!==0){
            user_input = 'https://'+ user_input
        }
        hashMap.push({
          url:user_input
        })
        localStorage.setItem('siteList',JSON.stringify(hashMap))
         // 在本地的存储里面设置 siteList ，siteList 的值就是 JSON…… ；
        render()
    })

$(document).on('keypress',(e)=>{
  for(let i=0; i<hashMap.length; i++){
    const logo = simplifyUrl(hashMap[i].url)[0]
    if(logo === e.key){
      window.open(hashMap[i].url)
    }
  }
})

// 解决bug，在输入框输入时也会触发按键事件
