const sendAjaxRequest = function (method, url, cb, data='') {
  let req = new XMLHttpRequest();
  req.open(method, url);
  req.addEventListener('load',() => cb(req.responseText));
  req.send(data);
};

window.onload = setInterval(function () {
  let gameId = window.location.pathname.split('/')[2];
  sendAjaxRequest('get',`/game/${gameId}/hasPlayerJoined`,(res)=>{
    res = JSON.parse(res);
    if(res.start) {
      window.location = res.link;
    }
  });
},3000);
