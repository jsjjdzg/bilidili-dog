let soul = ['你昨天晚上又没回我信息，我却看见你的游戏在线，在我再一次孜孜不倦的骚扰你的情况下，你终于跟我说了一句最长的话“**你他妈是不是有病**”，我又陷入了沉思，这一定有什么含义，我想了很久，你竟然提到了我的妈妈，原来你已经想得那么长远了，想和我结婚见我的父母，我太感动了，真的。那你现在在干嘛，我好想你，我妈妈说她也很喜欢你。',
'今天我观战了一天你和别人打游戏，**你们玩的很开心**；我给你发了200多条消息，你说没流量就不回；晚上发说说没有人爱你，我连滚带爬评论了句有“我在”，你把我拉黑了，我给你打电话也无人接听。对不起，我不该打扰你，我求求你再给我一次当好友的机会吧！',
'我爸说再敢网恋就打断我的腿，幸好不是胳膊，这样我还能继续**和你打字聊天**，就算连胳膊也打断了，我的心里也会有你位置。',
'你说你情侣头像是一个人用的，空间上锁是因为你不喜欢玩空间，情侣空间是和闺蜜开的，找你连麦时你说你在忙工作，每次聊天你都说在忙，你真是一个**上进的好女孩**，你真好，我好喜欢你！',
'你跟他已经醒了吧？我今天捡垃圾挣了一百多，明天给你打过去。你快点休息吧，我明天叫你起床，给你点外卖买烟，给你点你最喜欢的奶茶。晚上我会继续去摆地摊的，你不用担心我，你床只有那么大睡不下三个。**你要好好照顾好自己，不要让他抢你被子**。我永远爱你！',
'她三天没回我的消息了，在我孜孜不倦地骚扰下她终于舍得回我“**nmsl**”，我想这一定是有什么含义吧，噢！我恍然大悟原来是**尼美舒利颗粒**，她知道我有关节炎让我吃尼美舒利颗粒，她还是关心我的，但是又不想显现的那么热情。天啊！她好高冷，我好像更喜欢她了！',
'你想我了吧？可以回我消息了吗？我买了万通筋骨贴，你**运动一个晚上腰很疼**吧？今晚早点回家，我炖了排骨汤，我永远在家等你。',
'昨晚你和朋友打了一晚上游戏，你破天荒的给我看了战绩，虽然我看不懂但是我相信你一定是最厉害的、最棒的。我给你发了好多消息夸你，告诉你我多崇拜你，你回了我一句“**啥B**”，我翻来覆去思考这是什么意思，Sha[傻]，噢你是说我傻，那B就是Baby的意思了吧，原来你是在叫我**傻宝**，这么宠溺的语气，我竟一时不敢相信，其实你也是喜欢我的对吧。',
'今天我还是照常给你发消息，汇报日常工作，你终于回了我四个字：“**嗯嗯，好的。**”。你开始愿意敷衍我了，我太感动了，受宠若惊。我愿意天天给你发消息，就算你天天骂我，我也不觉得烦。',
'你昨天晚上又没回我的消息，在我孜孜不倦的骚扰下，你终于舍得回我了，你说“**滚**”，这其中一定有什么含义，我想了很久，滚是三点水，这代表你对我的思念也如**滚滚流水**一样汹涌，我感动哭了，不知道你现在在干嘛，我很想你。',
'听说你想要一套化妆品，我算了算，明天我去工地上**搬一天砖**，就可以拿到200块钱，再加上我上个月攒下来的零花钱，刚好给你买一套迪奥。',
'今天表白被拒绝了，她对我说能不能脱下裤子**撒泡尿照照自己**。当我脱下裤子，她咽了口水，说我们可以试一下。']


function getDogNotes(){
  if(soul.length == 12){
    $.get('http://bilidili.club:8999/dog/notes',
    function(data){
      for(var index in data){
        soul.push(data[index])
      };
    })
  }
}

window.onload = function(){
  getDogNotes();
  getNowFormatDate();
  randomSentence();
}

function randomSentence() {
  getNowFormatDate();
  var note = soul[Math.floor(Math.random() * soul.length)]
  document.getElementById('sentence').innerHTML = note.replace(/\*\*(.*?)\*\*/g,'<mark>$1</mark>').replace(/\'/g,'');
}

function getNowFormatDate() {
  var date = new Date();
  var seperator1 = "-";
  var year = date.getFullYear();
  var month = date.getMonth() + 1;
  var strDate = date.getDate();
  if (month >= 1 && month <= 9) {
      month = "0" + month;
  }
  if (strDate >= 0 && strDate <= 9) {
      strDate = "0" + strDate;
  }
  var currentdate = year + seperator1 + month + seperator1 + strDate;
  document.getElementById('basicTitle').innerHTML = currentdate + ' ' + getWeather();
}

function getWeather(){
  var city = localStorage.getItem('city') || '';
  var cloud = localStorage.getItem('cloud') || '';
  var cond = localStorage.getItem('cond') || '';

  if(city == '') {
    $.post(
      'https://free-api.heweather.net/s6/weather/now?location=auto_ip&key=d2974b815cc841848c45c48a069e26d0',
      function(data){
        var weather = data.HeWeather6[0] || {};
        city = weather.basic.location || '';
        cloud = weather.now.fl || ''
        cond = weather.now.cond_txt || ''
        localStorage.setItem('city',city);
        localStorage.setItem('cloud',cloud);
        localStorage.setItem('cond',cond);
        return getWeather();
      },'json'
    ) // 天气结束
  } else {
    var weatherHTML = city+'·'+cond+'·'+cloud+'&#8451;</span>'
    return weatherHTML;
  }
}

function copytg(){
  copyText(document.getElementById('basicTitle').innerHTML+ '\n' + '\n' + document.getElementById('sentence').innerHTML.replace('<mark>','').replace('</mark>',''));
};

function copyText(text) {
    var textarea = document.createElement("textarea"); //创建input对象
    var currentFocus = document.activeElement; //当前获得焦点的元素
    var toolBoxwrap = document.getElementById('NewsToolBox'); //将文本框插入到NewsToolBox这个之后
    toolBoxwrap.appendChild(textarea); //添加元素
    textarea.value = text;
    textarea.focus();
    if (textarea.setSelectionRange) {
        textarea.setSelectionRange(0, textarea.value.length); //获取光标起始位置到结束位置
    } else {
        textarea.select();
    }
    try {
        var flag = document.execCommand("copy"); //执行复制
    } catch (eo) {
        var flag = false;
    }
    toolBoxwrap.removeChild(textarea); //删除元素
    currentFocus.focus();
    return flag;
}

randomSentence();
