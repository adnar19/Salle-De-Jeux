


var frequency = {
get : function(link,callback){
  var httpRequest = new XMLHttpRequest();
     httpRequest.onreadystatechange = function() {
         if (httpRequest.readyState === 4  ) {
             if (httpRequest.status === 200 && httpRequest.responseText !== undefined ) {
                if (callback) callback(httpRequest.response);
             }
         }
     };
     httpRequest.open('GET', link);
     httpRequest.setRequestHeader( "Pragma", "no-cache" );
     httpRequest.setRequestHeader( "Cache-Control", "no-cache" );
     httpRequest.setRequestHeader( "Expires", 0 );
     httpRequest.send();

} ,
fillForm : function(data,keysobj){
for(key in keysobj) {
  _('[name="'+key+'"]').value = keysobj[key];
}
},





/*GetJSON*/
getJSON : function(link, callback) {
  this.get(link,function(dt){
  if (callback) callback(JSON.parse(dt));
  });
} ,
/*reload page*/
reload : function(){
  window.location.reload();
},
/*redirection*/
href: function(x,target){
  if (target == undefined) {
    window.location.href = x;
  } else {
    target = target.split('.');
   window.open(x, '', 'width='+target[0]+'px,height='+target[1]+'px');
  }
} ,

/*FM*/
fm : function(n){
  return parseFloat(n).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$& ');
},
mf : function (str) {
  str += '';
  return parseFloat(str.replace(',','.').replace(' ','').replace(' ','').replace(' ',''));
},


/*buildjson*/
buildJSON : function (jsonData,el,func) {
  var htmlInner = '';
if (jsonData && jsonData.length) {
  for (var i = 0; i < jsonData.length; i++) {
    htmlInner += func(jsonData[i]);
  }
}
_(el).innerHTML = htmlInner;
} ,



/*POST*/
post : function(link,data,callb){
  var httpRequest = new XMLHttpRequest();
  httpRequest.onload  = function () {
  if (httpRequest.readyState==4 && httpRequest.status==200){
  if (callb) callb(httpRequest.responseText);
}
}
httpRequest.open('POST', link);
httpRequest.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
httpRequest.setRequestHeader( "Pragma", "no-cache" );
httpRequest.setRequestHeader( "Cache-Control", "no-cache" );
httpRequest.setRequestHeader( "Expires", 0 );
httpRequest.send(data);
},

 localIP : function(clb){
   var myPeerConnection = window.RTCPeerConnection || window.mozRTCPeerConnection || window.webkitRTCPeerConnection;
    var pc = new myPeerConnection({
        iceServers: []
    }),
    noop = function() {},
    localIPs = {},
    ipRegex = /([0-9]{1,3}(\.[0-9]{1,3}){3}|[a-f0-9]{1,4}(:[a-f0-9]{1,4}){7})/g,
    key;
    function iterateIP(ip) {
        if (!localIPs[ip]) clb(ip);
        localIPs[ip] = true;
    }
    pc.createDataChannel("");
    pc.createOffer().then(function(sdp) {
        sdp.sdp.split('\n').forEach(function(line) {
            if (line.indexOf('candidate') < 0) return;
            line.match(ipRegex).forEach(iterateIP);
        });
        pc.setLocalDescription(sdp, noop, noop);
    }).catch(function(reason) {
    });
    pc.onicecandidate = function(ice) {
        if (!ice || !ice.candidate || !ice.candidate.candidate || !ice.candidate.candidate.match(ipRegex)) return;
        ice.candidate.candidate.match(ipRegex).forEach(iterateIP);
    };
 },ean13 : function(st){
   if (st == undefined) st ='';
   if ( st.length <= 12) {
     var characters       = '0123456789';
      for ( var i = st.length; i < 12; i++ ) {
         st += characters.charAt(Math.floor(Math.random() * characters.length));
      }
   }

   var dd = st.split('').map(function(d){return parseInt(d)}) ,mult =[1,3,1,3,1,3,1,3,1,3,1,3] ,sum=0,r = '',check ;
for (var i = 0; i < 12; i++) {
sum+=  dd[i] * mult[i];
r+= dd[i];
}
check =  (Math.ceil(sum/10) *10) - sum;
return r+check;
 },
 worker: function(link,res)  {
 	   var w = new Worker(link);
   w.onmessage = function(event) {
              res(event.data);
          };
 }
}



function _(x) {
return document.querySelector(x);
}

function __(x) {
return document.querySelectorAll(x);
}
