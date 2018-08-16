/*
Commentaires sur les commentaires et notes diverses :
- IL FAUT QUE J4AHOUTE DES COMMENTAIRES D'EXPLICATION PARTOUT !
- certains n sont qu temporaires pour permettre de connaitre mon avancement
- ma touch 'e' ne fonctionne pas très bien (le claier entier, en fait), il y a *beaucoup* de fautes de frappes

About comments :
- sorry, i'm french, i don't work directly in english, so comments must be translated in order to exist;
- tbh, they often need to be created in french, you don't miss too much;
- my keyboard is quite old and doesn't work quite well, some letters are missing (mainly 'e')  
*/

var bSymbChanged = false;

window.onload = function(){
							
		var canvas = document.getElementById("canvas1");
			if(!canvas){
				alert("Ceci est un probleme technique");
				return;
			}

		var context = canvas.getContext('2d');
			if(!context){
				alert("Impossible de récupérer le context du canvas");
				return;
			}
		
		{//Récupération des éléments HTML
		var eChoix = document.getElementById('choix');
		
		var eBGif = document.getElementById('bGif');
		var eNom = document.getElementById('nom');
		
		
		var eBGFlag = document.getElementById('bgFlag');
		var eRefreshed = document.getElementById('refreshed');
		
		var eImgPara = document.getElementById('imgPara');
		var eEpaisseur = document.getElementById('epaisseur');
		var eDivPara = document.getElementById('divPara');
		var eRCercle = document.getElementById('rCercle');
		var eLBarre = document.getElementById('lBarre');
		var eAFleche = document.getElementById('aFleche');
		var ePFleche = document.getElementById('pFleche');
		var ePDCroix = document.getElementById('pdCroix');
		var ePCroix = document.getElementById('pCroix');
		
		var eImgPos = document.getElementById('imgPos');
		var eDivPos = document.getElementById('divPos');
		var eDirT = document.getElementById('dirT');
		var ePhiT = document.getElementById('phiT');
		var ePEspacement = document.getElementById('pEspacement');
		
		var eNewSymb = document.getElementById('newSymb');
		var eSymbTemp = document.getElementById('symbTemp');
		var eSymbDiv = document.getElementById('symbDiv');
		
		var eSpeed = document.getElementById('speed');
		var e0angle = document.getElementById('0angle');
		var timeExe = document.getElementById('timeExe');
		
		var eTestText = document.getElementById('testText');
		var eTestInput = document.getElementById('testInput');
		var eTestDiv = document.getElementById('testDiv');
		
		var info = document.getElementById('info');
		var dChoix = document.getElementById('choix');
		var chargement = $('#chargement');
		}
		
		{//toutes les constantes et variables uilisées
		{//constantes du drapeau/arrière-plan
		var rainbow = ['red','orange','gold','green','blue','purple'];
		var trans1 = ['lightSkyBlue','pink','white','pink','lightSkyBlue'];
		var trans2 = ['magenta','orchid','mediumOrchid','darkOrchid','blue'];
		var pan = ['magenta','gold','skyBlue'];
		var bi = ['mediumVioletRed','mediumVioletRed','mediumOrchid','blue','blue'];
		var intersex = ['plum','white','lightBlue','pink','white','plum'];
		var enby = ['yellow','white','purple','black'];
		var aro = ['darkGreen','green','yellow','gray','black'];
		var ace = ['black','grey','white','purple'];
		
		var flagInUse = rainbow;
		}
		
		{//contantes et variables des symboles
		//A prpos des input restants à ajouter :
		var angle = 0;
		var pi = Math.PI;
		canvas.width = 500;//à ajouter/tba				<----
		canvas.height = 360;//à ajouter/tba				<----
		var cy = canvas.height/2;//lié à un autre
		var cx = canvas.width/2;//lié à un autre
		var refreshed = true;
		
		var paraVisible = false;
		var dtheta = 1;
		var rCercle = 40;
		var lBarre = 100;
		var aFleche = 7*pi/12;
		var pFleche = 0.5;
		var pdCroix = 0.5;
		var pCroix = 0.45;
		var epaisseur = 10;
		
		var posVisible = true;
		var sensDirT = !eDirT.checked;
		var phiT = parseFloat(ePhiT.value);
		var pEspacement = 1.5;
		
		var allSymbols = getSymb();
		var qttSymbs = allSymbols.length;
		//cette variable va contenir l'ensenble de tout les symboles devant être dessinés, autre que le premier.
		//l'information est sous forme d'array, avec, dans l'ordre :
		// div du symbole,type couleur, couleur,sens, déphasage1, déphasage2
		}
		
		{//constantes et variables du temps
		var timeNew = new Date();
		var timeOld = new Date();
		var temps;
		}
		
		{//constantes et variables du gifEncoder
		var recordGif = false;
		var frameRestantes = 0;
		var frameTot = 0;
		var encoder = new GIFEncoder();
		var msgCount = 0;
		}
		}
		
		arrierePlan(rainbow,0,context);//si quelquechose plante après, il y a au moins un joli arrière-plan
		
	var myInterval = setInterval(animate, 30);
	{//On ne récupère les valeurs des variables que lorsqu'elles sont changées, pas à chaque itération
	eBGFlag.onchange = function(){
		switch(eBGFlag.value){
			case 'rainbowAns':
				flagInUse = rainbow;
				break;
			case 'trans1Ans':
				flagInUse = trans1;
				break;
			case 'trans2Ans':
				flagInUse = trans2;
				break;
			case 'panAns':
				flagInUse = pan;
				break;
			case 'biAns':
				flagInUse = bi;
				break;
			case 'intersexAns':
				flagInUse = intersex;
				break;
			case 'intersex2Ans':
				flagInUse = 'intersex2';
				break;
			case 'enbyAns':
				flagInUse = enby;
				break;
			case 'aroAns':
				flagInUse = aro;
				break;
			case 'aceAns':
				flagInUse = ace;
				break;
			case 'animatedRainbowAns':
				flagInUse = 'animatedRainbow';
				break;
			default:
				flagInUse = rainbow;
		}
		arrierePlan(flagInUse,angle,context);
	}
	eRefreshed.onchange = function(){
		refreshed = eRefreshed.checked;
	}
	eRCercle.onchange = function(){
		rCercle = parseInt(eRCercle.value);
	}
	eLBarre.onchange = function(){
		lBarre = parseInt(eLBarre.value);
	}
	eAFleche.onchange = function(){
		aFleche = parseFloat(eAFleche.value);
	}
	ePDCroix.onchange = function(){
		pdCroix = parseFloat(ePDCroix.value);
	}
	ePCroix.onchange = function(){
		pCroix = parseFloat(ePCroix.value);
	}
	ePFleche.onchange = function(){
		pFleche = parseFloat(ePFleche.value);
	}
	ePEspacement.onchange = function(){
		pEspacement = parseFloat(ePEspacement.value);
	}
	eEpaisseur.onchange = function(){
		epaisseur = parseFloat(eEpaisseur.value);
	}
	ePhiT.onchange = function(){
		phiT = parseFloat(ePhiT.value);
	}
	eDirT.onchange = function(){
		sensDirT = !eDirT.checked;
	}
	e0angle.onclick = function(){
		angle = 0;
	}
	}
	
	eNewSymb.onclick = function(){
		var eClonedSymb = eSymbTemp.cloneNode(true);
		eClonedSymb.removeAttribute('id');
		eClonedSymb.setAttribute('class','symb');
		var p = eNewSymb.parentNode;
		p.insertBefore(eClonedSymb,eNewSymb);
		bSymbChanged = true;
	}
	
	eTestInput.onclick = function(){
		var a = ['a','b','c'];
		a.forEach(function(el){alert(el);});
	}
	
	eImgPara.onclick = function(){
		paraVisible = !paraVisible;
		
		if(paraVisible){
			eImgPara.src = "../0-Contenus/FlecheBas.png";
			eImgPara.alt = "v"
			eDivPara.style.display = '';
		}
		else{
			eImgPara.src = "../0-Contenus/FlecheDroite.png";
			eImgPara.alt = ">"
			eDivPara.style.display = 'none';
		}
	}
	eImgPos.onclick = function(){
		posVisible = !posVisible;
		
		if(posVisible){
			eImgPos.src = "../0-Contenus/FlecheBas.png";
			eImgPos.alt = "v"
			eDivPos.style.display = '';
		}
		else{
			eImgPos.src = "../0-Contenus/FlecheDroite.png";
			eImgPos.alt = ">"
			eDivPos.style.display = 'none';
		}
	}
	
	bGif.onclick= function(){//lance l'enregistrement d'un .gif (un tour) avec les parametres actuels (freezés)
		var speed = eSpeed.value;
		frameRestantes = Math.round(2*pi/(0.030*Math.abs(speed)));
		frameTot= frameRestantes;
		recordGif = true;
		if (speed == 0){frameRestantes = 1;}
		
		
		encoder.setRepeat(0);
		encoder.setDelay(30);
		encoder.start();
		
		eChoix.style.opacity = 0;
		
		console.log('**********');
		console.log('Lancement de l\'enregistrement d\'un .gif :');
		console.log('Frequence : 20 Hz');
		console.log('Nombre de frames : '+frameRestantes);
		console.log('Durée de la boucle : ' + 0.030*frameRestantes + ' s');
		console.log('Nom du gif : ');
	}
	
	function animate(){
	//fonction principale rélisant une frame, son enregistrement si nécessaire et gérant la variable 'angle'
	//main function : draws one frame, record if necessary and refresh the 'angle' variable
		{//timer & affichage du temps
		temps = timeNew.getTime() - timeOld.getTime();
		timeExe.innerHTML = 'Temps d\'éxecution : ' + temps + 'ms';
		
		timeOld = timeNew;
		timeNew = new Date();
		}
		
		{//gestion des constantes sur la frame
		dtheta = eSpeed.value*0.030;		
		context.lineJoin = 'bevel';
		}
		
		{//desssin de la frame
		if (refreshed){arrierePlan(flagInUse,angle,context);}
		
		var phiRel = 2*pi/qttSymbs;
		eTestText.innerHTML =  (0+phiT) + ' ';
		for(var i = 0; i < qttSymbs;i++){
			var theta = phiRel*i;
			var cxs = cx+Math.cos(theta+phiT+dir(sensDirT,angle))*pEspacement*rCercle; 
			var cys = cy-Math.sin(theta+phiT+dir(sensDirT,angle))*pEspacement*rCercle; 
			var angles = dir(allSymbols[i][2],angle+allSymbols[i][3]);
			var cols = couleurFunc(angle,allSymbols[i][0],allSymbols[i][1]);
			symbole(cxs,cys,angles,context,epaisseur,cols,rCercle,lBarre,aFleche,pFleche,pCroix,pdCroix);
			eTestText.innerHTML += i;
			
		}
		}
		
		{//gestion de l'enregistrement du gif
		if (frameRestantes > 0){
			encoder.addFrame(context);
			frameRestantes --;
			eTestText.innerHTML = frameRestantes;
			
			var msg = 'Frame '+(frameTot-frameRestantes)+'/'+frameTot;
			infoMessage(msg,2000,true,frameTot-frameRestantes,frameTot);
		}
		
		if(bSymbChanged){
			allSymbols = getSymb();
			qttSymbs = allSymbols.length;
			bSymbChanged = false;
		}
		
		if (frameRestantes == 0 & recordGif){
			recordGif = false;
			eChoix.style.opacity = 1;
			encoder.finish();
			encoder.download(eNom.value+'.gif');
			
			console.log('*********');
			console.log('Le gif a bien été enregistré et téléchargé.');
			infoMessage('Enregistrement terminé !',3000,false,null,null);
		}
		}
		
		angle = angle + dtheta;
		if (angle>2*pi){angle = angle-2*pi;}
		if (angle<0){angle = angle+2*pi;}
	}
	
	function dir(b,theta){
	//renvoie f(theta) mod 2pi où f(x)=x si b et f(x)=-x si !b
	//returns f(theta) mod 2pi where f(x)=x if b and f(x)=-x if !b
		var ret = theta;
		if (!b){ret = 2*pi-theta;}
		while (ret<0){ret = ret+ 2*pi;}
		while (ret>2*pi){ret = ret- 2*pi;}
		return ret;
	}
	
	function arrierePlan(flag,theta,ctx){
	//dessine l'arrière plan d'une frame selon le motif demandé
	//draws the frame's background according to the requested flag 
		switch (flag) {
			case 'animatedRainbow':
				for (var i = 0;i<6;i++){
					ctx.fillStyle = couleurFunc(theta + i*pi/3,'rainbow',null);
					ctx.fillRect(0,canvas.height/6*i,canvas.width,canvas.height/6);
				}
				break;
			case 'intersex2':
				ctx.fillStyle = 'yellow';
				ctx.fillRect(0,0,canvas.width, canvas.height);
				ctx.strokeStyle = 'purple';
				var minDim = Math.min(canvas.width,canvas.height);
				ctx.lineWidth = 10;
				console.log('lineWidth');
				ctx.beginPath();
				console.log('beginPath');
				//ctx.arc(canvas.width/2,canvas.height/2,minDim/20,0,2*pi);
				ctx.arc(100,100,5,0,2*pi);
				console.log('arc');
				ctx.stroke();
				console.log('stroke');
			default:
			var len = flag.length;
			var stripHeight = canvas.height/len;
				for (var i =0; i < len; i++){
					ctx.fillStyle = flag[i];
					ctx.fillRect(0,stripHeight*i,canvas.width,stripHeight);
				}
		}
	}
	
	function symbole(x,y,theta,cxt,e,c,r,lB,aF,pF,pC,pdC){
	//dessine un symbole selon pleeeins de variables
	//draws a symbol dependending on muuuch parameters
		cxt.strokeStyle = c;
		cxt.lineWidth = e;
		
		cxt.beginPath();
		cxt.arc(x,y,r,0,2*pi);
		cxt.stroke();
		
		cxt.beginPath();
		cxt.moveTo(x+r*Math.cos(theta),y-r*Math.sin(theta));
		cxt.lineTo(x+(r+lB)*Math.cos(theta),y-(r+lB)*Math.sin(theta));
		cxt.stroke();
		
		
		if (0 < theta && theta < pi){//ajout de la fleche
			var mu = 1;
			if (theta < pi/6) {mu = 6*theta/pi;}
			if (theta > 5/6*pi) {mu = (pi-theta)/(pi/6);}
		
			cxt.beginPath();
			cxt.moveTo(x+(r+lB)*Math.cos(theta)-lB*pF*Math.cos(mu*aF/2-theta),
							y-(r+lB)*Math.sin(theta)-lB*pF*Math.sin(mu*aF/2-theta));
			cxt.lineTo(x+(r+lB)*Math.cos(theta),y-(r+lB)*Math.sin(theta));
			cxt.lineTo(x+(r+lB)*Math.cos(theta)-lB*pF*Math.cos(mu*aF/2+theta),
							y-(r+lB)*Math.sin(theta)+lB*pF*Math.sin(mu*aF/2+theta));
			cxt.stroke();
		}
		
		if (2/3*pi < theta && theta < 5/3*pi) {//ajout de la croix
			var mu = 1;
			if (theta < 5/6 * pi) {mu = (theta-4/6*pi)/(pi/6);}
			if (theta > 3/2 * pi) {mu = (10/6*pi-theta)/(pi/6);}
			
			cxt.beginPath();
			cxt.moveTo(x+(r+lB*pdC)*Math.cos(theta)+mu*lB*pC*Math.sin(theta),
							y-(r+lB*pdC)*Math.sin(theta)+mu*lB*pC*Math.cos(theta));
			cxt.lineTo(x+(r+lB*pdC)*Math.cos(theta)-mu*lB*pC*Math.sin(theta),
							y-(r+lB*pdC)*Math.sin(theta)-mu*lB*pC*Math.cos(theta));
			cxt.stroke();
		}
	}
	
	function couleurFunc(theta,type,couleur){
	//une simple famille de fonctions 2pi-périodiques de R dans le colorspace
	//some continuous 2pi-periodic functions from R to the colorspace
		switch (type){
			case 'rand':
				var r = Math.floor((Math.sin(5*theta)+Math.sin(theta)+2)*64);
				var g = Math.floor((Math.sin(4*theta)+Math.sin(theta)+2)*64);
				var b = Math.floor((Math.sin(3*theta)+Math.sin(theta)+2)*64);
				var ret = 'rgb('+r+','+g+','+b+')';
				break;
			case 'blinkingRainbow':
				var r = Math.floor((Math.cos(theta)+1)*(1+(Math.sin(15*theta)/5))/(1+1/5)*128);
				var g = Math.floor((Math.cos(theta+2*pi/3)+1)*(1+(Math.sin(10*theta)/5))/(1+1/5)*128);
				var b = Math.floor((Math.cos(theta+4*pi/3)+1)*(1+(Math.sin(10*theta)/5))/(1+1/5)*128);
				var ret = 'rgb('+r+','+g+','+b+')';
				break;
			case 'rainbow':
				var r = Math.floor((Math.cos(theta)+1)*128);
				var g = Math.floor((Math.cos(theta+2*pi/3)+1)*128);
				var b = Math.floor((Math.cos(theta+4*pi/3)+1)*128);
				var ret = 'rgb('+r+','+g+','+b+')';
				break;
			case 'col':
				var ret = couleur;
				break;
			case 'hidden':
				var ret = 'rgba(0,0,0,0)';
			
		}
		return ret;
	}
	
	function infoMessage(message, temps, bChargement, value, max){
		
		msgCount++;
		info.style.opacity = 1;
		info.style.bottom = "10px";
		
		pInfo.innerHTML = message;
		chargement.css('height',(info.offsetHeight-2) + 'px');
		
		if(bChargement){
			chargement.css('width',(info.offsetWidth * value / max) + 'px');
		}
		else{
			chargement.css('width',(info.offsetWidth-2) + 'px');
		}
		setTimeout(function(){
			if(msgCount == 1){
				info.style.opacity = 0;
				info.style.bottom = "100px";
			}
			msgCount--}
		, temps);
	}
	
	function getSymb(){
		console.log('Récupération des consignes des symboles :');
		var allSymb = document.getElementsByClassName('symb');
		console.log(allSymb);
		var aSymbsValeurs = [];
		for(var i = 0; i < allSymb.length; i++){
			var elValues = [];
			elValues.push(nthSibling(allSymb[i].firstChild,5).value);
			elValues.push(nthSibling(nthSibling(allSymb[i].firstChild,6).firstChild,2).value);
			elValues.push(nthSibling(allSymb[i].firstChild,9).checked);
			elValues.push(parseFloat(nthSibling(allSymb[i].firstChild,12).value));
			aSymbsValeurs.push(elValues);
		}
		console.log(aSymbsValeurs);
		return aSymbsValeurs
	}
}

function nthSibling(elem,n){
	var ret;
	if(n==0){ret = elem;}
	else{ret = nthSibling(elem,n-1).nextElementSibling;}
	return ret;
}

function closeSymb(elem){
	p = elem.parentNode;
	p.parentNode.removeChild(p);
	bSymbChanged = true;
}

function changeColor(elem){
	var d = elem.nextElementSibling;
	var c = d.firstChild.nextElementSibling.nextElementSibling
	if(elem.value == "col"){
		d.style.display = '';
		c.removeAttribute('disabled');
	}
	else{
		d.style.display = 'none';
		c.setAttribute('disabled','true');
	}
}
