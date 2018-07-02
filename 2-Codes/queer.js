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
		
		{//Récupération des éléments HTML
		var eChoix = document.getElementById('choix');
		
		var eBGif = document.getElementById('bGif');
		var eNom = document.getElementById('nom');
		
		var eEpaisseur = document.getElementById('epaisseur');
		var eBGFlag = document.getElementById('bgFlag');
		
		
		var eImgPara = document.getElementById('imgPara');
		var eDivPara = document.getElementById('divPara');
		var eRCercle = document.getElementById('rCercle');
		var eLBarre = document.getElementById('lBarre');
		var eAFleche = document.getElementById('aFleche');
		var ePFleche = document.getElementById('pFleche');
		var ePDCroix = document.getElementById('pdCroix');
		var ePCroix = document.getElementById('pCroix');
		
		var eTypeCouleur1 = document.getElementById('typeCouleur1');
		var eValCouleur1 = document.getElementById('valCouleur1');
		var eDivValCouleur1 = document.getElementById('divValCouleur1');
		var eDir1 = document.getElementById('dir1');
		var eDirT = document.getElementById('dirT');
		var ePhiT = document.getElementById('phiT');
		var ePDCentre = document.getElementById('pdCentre');
		
		var eDivSymb2 = document.getElementById('divSymb2');
		var eCbSymb2 = document.getElementById('cbSymb2');
		var eTypeCouleur2 = document.getElementById('typeCouleur2');
		var eValCouleur2 = document.getElementById('valCouleur2');
		var eDivValCouleur2 = document.getElementById('divValCouleur2');
		var eDir2 = document.getElementById('dir2');
		var ePhi2 = document.getElementById('phi2');
		
		var eSpeed = document.getElementById('speed');
		var timeExe = document.getElementById('timeExe');
		
		var eTestText = document.getElementById('testText');
		var eTestInput = document.getElementById('testInput');
		
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
		
		var flagInUse = rainbow;
		}
		
		{//contantes et variables des symboles
		//A prpos des input restants à ajouter :
		var angle = 0;//fini
		var pi = Math.PI;//fini
		canvas.width = 500;//à ajouter					<----
		canvas.height = 360;//à ajouter					<----
		var cy = canvas.height/2;//lié à un autre
		var cx = canvas.width/2;//lié à un autre
		
		var paraVisible = false;
		var dtheta = 1;//fini
		var rCercle = 40;//fini
		var lBarre = 100;//fini
		var aFleche = 7*pi/12;//fini
		var pFleche = 0.5;//fini
		var pdCroix = 0.5;//fini
		var pCroix = 0.45;//fini
		
		var posiVisible = true;
		var sensDirT = true;//fini, à réarranger
		var phiT = ePhiT.value;//fini, à réarranger
		var pdCentre = 1/3;//fini, à réarranger
		var pEspacement = 1.5;//à ajouter				<----
		
		var typeCouleur1InUse = 'rand';//fini
		var valCouleur1InUse = null;//fini
		var sensDir1 = true;//fini
		
		var symb2Exists = eCbSymb2.checked;
		var typeCouleur2InUse = 'rand';
		var valCouleur2InUse = null;
		var sensDir2 = false;
		var phi2 = 0;
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
		arrierePlan(rainbow,0);//si quelquechose plante après, il y a au moins un joli arrière-plan
		
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
			case 'animatedRainbowAns':
				flagInUse = 'animatedRainbow';
				break;
			default:
				flagInUse = rainbow;
		}
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
	
	eTypeCouleur1.onchange = function(){
		typeCouleur1InUse = eTypeCouleur1.value;
		if (eTypeCouleur1.value == 'col'){
			valCouleur1InUse = eValCouleur1.value;
			eValCouleur1.disabled = false;
			eDivValCouleur1.style.display = '';
		}
		else{
			eValCouleur1.disabled = true;
			eDivValCouleur1.style.display = 'none';
		}
	}
	
	eValCouleur1.onchange = function(){
		valCouleur1InUse = eValCouleur1.value;
	}
	
	eDir1.onchange = function(){
		sensDir1 = eDir1.checked;
	}
	
	eDirT.onchange = function(){
		sensDirT = !eDirT.checked;
	}
	
	eCbSymb2.onchange = function(){
		symb2Exists = eCbSymb2.checked;
		if (symb2Exists){eDivSymb2.style.display = '';}
		else{eDivSymb2.style.display = 'none';}
	}
	
	eTypeCouleur2.onchange = function(){
		typeCouleur2InUse = eTypeCouleur2.value;
		if (eTypeCouleur2.value == 'col'){
			valCouleur2InUse = eValCouleur2.value;
			eValCouleur2.disabled = false;
			eDivValCouleur2.style.display = '';
		}
		else{
			eValCouleur2.disabled = true;
			eDivValCouleur2.style.display = 'none';
		}
	}
	
	eValCouleur2.onchange = function(){
		valCouleur2InUse = eValCouleur2.value;
	}
	
	eDir2.onchange = function(){
		sensDir2 = eDir2.checked;
	}
	
	ePhi2.onchange = function(){
		phi2 = ePhi2.value*1;
	}
	
	ePhiT.onchange = function(){
		phiT = ePhiT.value*1;
	}
	
	ePDCentre.onchange = function(){
		pdCentre = ePDCentre.value*1;
	}
	}
	
	eTestInput.onclick = function(){
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
	
	function animate(){//fonction principale gérant le dessin sur le canvas et l'enregistrement du gif si demandé
		{//timer & affichage du temps
		temps = timeNew.getTime() - timeOld.getTime();
		timeExe.innerHTML = 'Temps d\'éxecution : ' + temps + 'ms';
		
		timeOld = timeNew;
		timeNew = new Date();
		}
		
		{//gestion des constantes sur la frame
		dtheta = eSpeed.value*0.030;
		var eSymb1 = eEpaisseur.value;
		var cSymb1 = couleurFunc(angle,typeCouleur1InUse,valCouleur1InUse);
		var cSymb2 = couleurFunc(angle,typeCouleur2InUse,valCouleur2InUse);
		
		context.lineJoin = 'bevel';
		}
		
		{//desssin de la frame
		arrierePlan(flagInUse,angle);
		
		if (symb2Exists){
			var cx2 = cx+Math.sin(dir(sensDirT,angle-phiT))*rCercle*(1-pdCentre)*pEspacement;
			var cy2 = cy-Math.cos(dir(sensDirT,angle-phiT))*rCercle*(1-pdCentre)*pEspacement;
			var angle2 = dir(sensDir2,angle+phi2);
			symbole(cx2,cy2,angle2,context,eSymb1,cSymb2,rCercle,lBarre,aFleche,pFleche,pCroix,pdCroix)
		}
		var cx1 = cx-Math.sin(dir(sensDirT,angle-phiT))*rCercle*(pdCentre)*pEspacement;
		var cy1 = cy+Math.cos(dir(sensDirT,angle-phiT))*rCercle*(pdCentre)*pEspacement;
		var angle1 = dir(sensDir1,angle);
		symbole(cx1,cy1,angle1,context,eSymb1,cSymb1,rCercle,lBarre,aFleche,pFleche,pCroix,pdCroix);
		}
		
		{//gestion de l'enregistrement du gif
		if (frameRestantes > 0){
			encoder.addFrame(context);
			frameRestantes --;
			eTestText.innerHTML = frameRestantes;
			
			var msg = 'Frame '+(frameTot-frameRestantes)+'/'+frameTot;
			infoMessage(msg,2000,true,frameTot-frameRestantes,frameTot);
		}
		
		if (frameRestantes == 0 & recordGif){
			recordGif = false;
			eChoix.style.opacity = 1;
			encoder.finish();
			encoder.download(eNom.value+'.gif');
			
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