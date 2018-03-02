const sendAjaxRequest = function (method, url, cb, data='') {
  let req = new XMLHttpRequest();
  req.open(method, url);
  req.addEventListener('load',() => cb(req.responseText));
  req.send(data);
};

window.onload = setInterval(function () {
  let gameId = window.location.pathname.split('/')[2];
  let playerId = window.location.pathname.split('/')[3];
  sendAjaxRequest('get',`/game/${gameId}/${playerId}/hasPlayerJoined`,(res)=>{
    res = JSON.parse(res);
    if(res.start) {
      window.location = res.link;
    }
  });
},800);
