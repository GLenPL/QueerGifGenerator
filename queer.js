window.onload =function(){
							
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
		
		var aside = document.getElementById('choix');
		
		{//Récupération des éléments HTML
		var elementBGif = document.getElementById('bGif');
		var elementNom = document.getElementById('nom');
		
		var elementEpaisseur = document.getElementById('epaisseur');
		var elementBGFlag = document.getElementById('bgFlag');
		
		var elementTypeCouleur1 = document.getElementById('typeCouleur1');
		var elementValCouleur1 = document.getElementById('valCouleur1');
		var elementDivValCouleur1 = document.getElementById('divValCouleur1');
		var elementDir1 = document.getElementById('dir1');
		var elementDirT = document.getElementById('dirT');
		var elementPhiT = document.getElementById('phiT');
		var elementPDCentre = document.getElementById('pdCentre');
		
		var elementDivSymb2 = document.getElementById('divSymb2');
		var elementCbSymb2 = document.getElementById('cbSymb2');
		var elementTypeCouleur2 = document.getElementById('typeCouleur2');
		var elementValCouleur2 = document.getElementById('valCouleur2');
		var elementDivValCouleur2 = document.getElementById('divValCouleur2');
		var elementDir2 = document.getElementById('dir2');
		var elementPhi2 = document.getElementById('phi2');
		
		var elementSpeed = document.getElementById('speed');
		var timeExe = document.getElementById('timeExe');
		var elementTestText = document.getElementById('testText');
		
		var info = document.getElementById('info');
		var dChoix = document.getElementById('choix');
		var chargement = $('#chargement');
		}
		
		canvas.width = 500;
		canvas.height = 360;
		
		
		var rainbow = ['red','orange','gold','green','blue','purple'];
		var trans1 = ['lightSkyBlue','pink','white','pink','lightSkyBlue'];
		var trans2 = ['magenta','orchid','mediumOrchid','darkOrchid','blue'];
		var pan = ['magenta','gold','skyBlue'];
		var bi = ['mediumVioletRed','mediumVioletRed','mediumOrchid','blue','blue'];
		
		var flagInUse = rainbow;
		
		{//contantes et variables des symboles
		var angle = 0;
		var pi = Math.PI;
		var cy = canvas.height/2;
		var cx = canvas.width/2;
		var dtheta = 1;
		var rCercle = 40;
		var lBarre = 100;
		var aFleche = 7*pi/12;
		var pFleche = 0.5;
		var pdCroix = 0.5;
		var pCroix = 0.45;
		var kx = 0;
		var ky = 0;
		
		var typeCouleur1InUse = 'rand';
		var valCouleur1InUse = null;
		var sensDir1 = true;
		var sensDirT = false;
		var phiT = elementPhiT.value;
		var pdCentre = 1/3;
		
		var symb2Exists = elementCbSymb2.checked;
		var typeCouleur2InUse = 'rand';
		var valCouleur2InUse = null;
		var sensDir2 = false;
		var phi2 = elementPhi2.value;
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
		
		arrierePlan(rainbow,0);//si quelquechose plante après, il y a au moins un joli arrière-plan
		
	var myInterval = setInterval(animate, 50);
	
	{//On ne récupère les valeurs des variables que lorsqu'elles sont changées, pas à chaque itération
	elementBGFlag.onchange = function(){
		switch(elementBGFlag.value){
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
			case 'animatedRainbowAns':
				flagInUse = 'animatedRainbow';
				break;
			default:
				flagInUse = rainbow;
		}
	}
	
	elementTypeCouleur1.onchange = function(){
		typeCouleur1InUse = elementTypeCouleur1.value;
		if (elementTypeCouleur1.value == 'col'){
			valCouleur1InUse = elementValCouleur1.value;
			elementValCouleur1.disabled = false;
			elementDivValCouleur1.style.display = '';
		}
		else{
			elementValCouleur1.disabled = true;
			elementDivValCouleur1.style.display = 'none';
		}
	}
	
	elementValCouleur1.onchange = function(){
		valCouleur1InUse = elementValCouleur.value;
	}
	
	elementDir1.onchange = function(){
		sensDir1 = elementDir1.checked;
	}
	
	elementDirT.onchange = function(){
		sensDirT = !elementDirT.checked;
	}
	
	elementCbSymb2.onchange = function(){
		symb2Exists = elementCbSymb2.checked;
		if (symb2Exists){elementDivSymb2.style.display = '';}
		else{elementDivSymb2.style.display = 'none';}
	}
	
	elementTypeCouleur2.onchange = function(){
		typeCouleur2InUse = elementTypeCouleur2.value;
		if (elementTypeCouleur2.value == 'col'){
			valCouleur2InUse = elementValCouleur2.value;
			elementValCouleur2.disabled = false;
			elementDivValCouleur2.style.display = '';
		}
		else{
			elementValCouleur2.disabled = true;
			elementDivValCouleur2.style.display = 'none';
		}
	}
	
	elementValCouleur2.onchange = function(){
		valCouleur2InUse = elementValCouleur.value;
	}
	
	elementDir2.onchange = function(){
		sensDir2 = elementDir2.checked;
	}
	
	elementPhi2.onchange = function(){
		phi2 = elementPhi2.value*1;
	}
	
	elementPhiT.onchange = function(){
		phiT = elementPhiT.value*1;
	}
	
	elementPDCentre.onchange = function(){
		pdCentre = elementPDCentre.value*1;
	}
	}
	
	bGif.onclick= function(){//lance l'enregistrement d'un .gif (un tour) avec les parametres actuels (freezés)
		var speed = elementSpeed.value;
		frameRestantes = Math.round(2*pi/(0.05*Math.abs(speed)));
		frameTot= frameRestantes;
		recordGif = true;
		
		
		encoder.setRepeat(0);
		encoder.setDelay(50);
		encoder.start();
		
		console.log('**********');
		console.log('Lancement de l\'enregistrement d\'un .gif :');
		console.log('Frequence : 20 Hz');
		console.log('Nombre de frames : '+frameRestantes);
		console.log('Durée de la boucle : ' + 0.05*frameRestantes + ' s');
		console.log('Nom du gif : ');
	}
	
	function animate(){//fonction principale gérant le dessin sur le canvas et l'enregistrement du gif si demandé
		{//timer & affichage du temps
		temps = timeNew.getTime() - timeOld.getTime();
		timeExe.innerHTML = 'Temps d\'éxecution : ' + temps + 'ms';
		
		timeOld = timeNew;
		timeNew = new Date();
		}
		
		{//gestion des constantes sur la frame
		dtheta = elementSpeed.value*0.05;
		var eSymb1 = elementEpaisseur.value;
		var cSymb1 = couleurFunc(angle,typeCouleur1InUse,valCouleur1InUse);
		var cSymb2 = couleurFunc(angle,typeCouleur2InUse,valCouleur2InUse);
		
		context.lineJoin = 'bevel';
		}
		
		//gestion des éléments constants (cercle et barre)
		arrierePlan(flagInUse,angle);
		
		if (symb2Exists){
			symbole(cx+Math.sin(dir(sensDirT,angle)+phiT)*rCercle*(1-pdCentre)*1.6,cy-Math.cos(dir(sensDirT,angle)+phiT)*rCercle*(1-pdCentre)*1.6,dir(sensDir2,angle+phi2),context,eSymb1,cSymb2,rCercle,lBarre,aFleche,pFleche,pCroix,pdCroix)
		}
		symbole(cx-Math.sin(dir(sensDirT,angle)+phiT)*rCercle*pdCentre*1.6,cy+Math.cos(dir(sensDirT,angle)+phiT)*rCercle*pdCentre*1.6,dir(sensDir1,angle),context,eSymb1,cSymb1,rCercle,lBarre,aFleche,pFleche,pCroix,pdCroix);
		
		{//gestion de l'enregistrement du gif
		if (frameRestantes > 0){
			encoder.addFrame(context);
			frameRestantes --;
			elementTestText.innerHTML = frameRestantes;
			
			var msg = 'Frame '+(frameTot-frameRestantes)+'/'+frameTot;
			infoMessage(msg,2000,true,frameTot-frameRestantes,frameTot);
		}
		
		if (frameRestantes == 0 & recordGif){
			recordGif = false;
			encoder.finish();
			encoder.download(elementNom.value+'.gif');
			
			console.log('*********');
			console.log('Le gif a bien été enregistré et téléchargé.');
			infoMessage('Enregistrement terminé !',2000,false,null,null);
		}
		}
		
		angle = angle + dtheta;
		if (angle>2*pi){angle = angle-2*pi;}
		if (angle<0){angle = angle+2*pi;}
	}
	
	function dir(b,theta){
		var ret = theta;
		if (!b){ret = 2*pi-theta;}
		while (ret<0){ret = ret+ 2*pi;}
		while (ret>2*pi){ret = ret- 2*pi;}
		return ret;
	}
	
	function arrierePlan(flag,theta){
		switch (flag) {
			case 'animatedRainbow':
				for (var i = 0;i<6;i++){
					context.fillStyle = couleurFunc(theta + i*pi/3,'rainbow',null);
					context.fillRect(0,canvas.height/6*i,canvas.width,canvas.height/6);
				}
				break;
			
			default:
			var len = flag.length;
			var stripHeight = canvas.height/len;
				for (var i =0; i < len; i++){
					context.fillStyle = flag[i];
					context.fillRect(0,stripHeight*i,canvas.width,stripHeight);
				}
		}
	}
	
	function symbole(x,y,theta,cxt,e,c,r,lB,aF,pF,pC,pdC){//dessine un ymbole selon pleeeins de variables
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
	
	function couleurFunc(theta,type,couleur){//une simple famille de fonctions 2pi-périodiques de R dans le colorspace
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
}