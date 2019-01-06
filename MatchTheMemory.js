let arr = [];//random color duplicate 
let arrtmp = [];
let button1;
let button2;
let button3;
let opened = [];
let colorarr = ["#FF0000","#008000","#0000FF","#4B0082","#FFC0CB","#FFFF00","#000000","#800080","#ffa500","#CD853F","#FF00FF",/*"#6e506e","#b4ff14","#A52A2A",*/"#2F4F4F"];

function drawAll() {

	for ( let i = 0; i < 12; i++ ) {
		let rand = Math.floor(Math.random()*24);
		while(arr[rand]) {
		 	rand = Math.floor(Math.random()*24);
		}
		arr[rand] = getRandomColor();
	}

	for ( let i = 0,j = 0; i < 24; i++ ) {//filter, only defined in arrtmp
		if ( arr[i] ) {
			arrtmp[j] = arr[i];
			j++;
		}
	}
	

	for ( let i = 0,j=12; i < 12; i++ ) {//duplicate color 
		let rand = Math.floor(Math.random()*24);
		while(arr[rand]) {
		 	rand = Math.floor(Math.random()*24);
		}
		let rand2 = Math.floor(Math.random()*j);
		arr[rand] = arrtmp[rand2];
		arrtmp.splice(rand2,1);
		j--;
	}

}

function getRandomColor() {
 
  let rand = Math.floor(Math.random() * colorarr.length);
  let color = colorarr[rand];
  colorarr.splice(rand,1);
  return color;
}

drawAll();//draw all buttons 

function openTheButton(num) {
	if (opened.includes(num)) {return;}//check open the button 
	if ( button1 ) {
		if ( button2 ) {
			button3 = num;
		}
		else {
			button2 = num;
		}
	}
	else {
		button1 = num;
	}

	if ( button1 === button2 ) { //if click 2 times in one button
		button2 = undefined;
		return;
	}
	else if ( button1 === button3 ) {
		button3 = undefined;
		return;
	}
	else if ( button2 !== undefined && button2 === button3) {
		button3 = undefined;
		return;
	}

	let str = "" + arr[num-1];
	document.getElementById("button"+num).style.backgroundColor = str;
	document.getElementById("button"+num).style.transform = "rotateY(180deg)";

	if ( button3 ) {
		if (arr[button1-1] !== arr[button2-1] ) {
			document.getElementById("button"+ button1).style.transform = "rotateY(0deg)";
			document.getElementById("button"+ button1).style.backgroundColor = "grey";
			document.getElementById("button"+ button2).style.transform = "rotateY(0deg)";
			document.getElementById("button"+ button2).style.backgroundColor = "grey";
			
			button1 = button3;
			button2 = undefined;
			button3 = undefined;
		}
		else {
			opened.push(button1);
			opened.push(button2);
			button1 = button3;
			button2 = undefined;
			button3 = undefined;
		}
	}
	if (opened.length === 22 && button1 && button2) {
		document.getElementById("main").style.display = "none";
		document.getElementById("myimg").style.visibility = "visible";
	}
}



