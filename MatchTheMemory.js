let arr = [];//random color duplicate 
let arrtmp = [];
let button1;
let button2;
let button3;
let opened = [];

function drawAll() {

	for ( let i = 0; i < 15; i++ ) {
		let rand = Math.floor(Math.random()*30);
		while(arr[rand]) {
		 	rand = Math.floor(Math.random()*30);
		}
		arr[rand] = getRandomColor();
	}

	for ( let i = 0,j = 0; i < 30; i++ ) {
		if ( arr[i] ) {
			arrtmp[j] = arr[i];
			j++;
		}
	}
	

	for ( let i = 0,j=15; i < 15; i++ ) {
		let rand = Math.floor(Math.random()*30);
		while(arr[rand]) {
		 	rand = Math.floor(Math.random()*30);
		}
		let rand2 = Math.floor(Math.random()*j);
		arr[rand] = arrtmp[rand2];
		arrtmp.splice(rand2,1);
		j--;
	}

}

function getRandomColor() {
  let letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
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
	if (opened.length === 28) {
		document.body.style.backgroundImage = "url('http://www.freepressjournal.in/wp-content/uploads/2018/05/Win.jpg')";
	}
}

