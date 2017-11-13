var video = document.getElementById("video");
var canvas = document.getElementById('canvas');


function foldDiv(node) {
	var node1 = document.getElementById('pc_log');
	node1.style.display = "none";

	var node2 = document.getElementById('innner_log');
	node2.style.display = "block";
}

function register () {
	if(uid_p.value === '' | userInfo_p.value === ''){
		alert("Account and UserName cann`t be null!");
		return;
	}	
	var imgBase64;		
	var cav = document.createElement('canvas');
	var ctx = cav.getContext('2d');				
	var opt ={
		url:'http://localhost:8082/faceLog',
		type:'post',
		data:{},
		success:function (data) {
			alert(data);
		}
	};

	cav.width = video.offsetWidth;
	cav.height = video.offsetHeight;
	ctx.drawImage(video,0,0,cav.width,cav.height);
	imgBase64 = cav.toDataURL();
	opt.data.uid = uid_p.value;
	opt.data.userInfo = userInfo_p.value;
	opt.data.img = imgBase64;
	ajaxRequest(opt);
}

function login (arg) {
	var base64;
	var opt = {
		url:'http://localhost:8082/faceRec',
		type:'post',
		data:{},
		success:function (data) {
			alert(data);
		}
	};
	var cav = document.createElement('canvas');				
	var ctx = cav.getContext('2d');
	var fr  = new FileReader();
	
	cav.width = video.offsetWidth;
	cav.height = video.offsetHeight;			
	ctx.drawImage(video,0,0,cav.width,cav.height);					
	base64 = cav.toDataURL();
	opt.data.img = base64;
	ajaxRequest(opt);
}

function loadCamera() {

	navigator.getUserMedia=navigator.getUserMedia||navigator.mozGetUserMedia||navigator.webkitGetUserMedia||navigator.msGetUserMedia;
	shootN=window.URL|| window.webkitURL|| window.mozURL|| window.msURL;
	var videoObj = {
            video: true,
            audio: false
        };
    var errBack = function(err){
    	document.getElementById('pc_camera').style.display = 'none';
    	document.getElementById('pc_log').style.display = 'none';
    	video.style.display = 'none';
    }
    if(!navigator.getUserMedia){
    	errBack();
    }
    navigator.getUserMedia(videoObj,function(stream){
    	if(video.mozSrcObject !== undefined){
    		video.mozSrcObject = stream;	            		
    	}else{
    		video.src = (window.URL&&window.URL.createObjectURL(stream))||stream;
    	}
    	video.play();
    	canvas.style.display = 'none';
    },errBack);
}	