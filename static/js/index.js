let soul = ['✨✨✨**开始我们的舔狗日记**✨✨✨']


function getDogNotes(){
  if(soul.length == 1){
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

var time1 = window.setTimeout(randomSentence,2000);
window.clearTimeout(time1);
