'use strict'

import Zoom from 'zooming';
import '../CSS/style.css';
import img1 from '../img/img1';
import img2 from '../img/img2';
import img3 from '../img/img3';

const divWithMainImage = document.createElement( 'div' ),
	divWithPrevues = document.createElement( 'div' ),
	gallery = document.getElementById('gallery'),
	mainImage = createImg('', ['main-image']),
	imageSources = [img1, '../img/img2.jpg', '../img/img3.jpg'],
	allImages = [];
	
function createImg(src, classList = []) {	
	let img = document.createElement('img');
	for (let className of Array.from( classList )) {
		img.classList.add( className );
	}
	
	img.setAttribute('src', src);
	return img;
}

function askCaptcha() {
	let a = Math.round( Math.random() * 5 ),
		b = Math.round( Math.random() * 5 ),
		operations = ['+', '-', '*'],
		operationIndex = Math.round( Math.random() * 3 - 0.5 ),
		userAnswer = +prompt( a + ' ' + operations[operationIndex] + ' ' + b ),
		res;

	switch (operationIndex) {
		case 0:
			res = a + b;
			break;
		case 1:
			res = a - b;
			break;
		case 2:
			res = a * b;
			break;
	}

	if (userAnswer !== res) {
		deleteBodyElements();
	}
}

function deleteBodyElements() {
	for (let elem of Array.from( document.body.children )) {
		deleteBodyElements.displeysStyles.push( elem.style.display );
		elem.style.display = 'none';
	}
}
deleteBodyElements.displeysStyles = [];
deleteBodyElements.return = function() {
	for (let elem of Array.from( document.body.children )) {
		elem.style.display = deleteBodyElements.displeysStyles.shift();
	}
}


function changeImage(src){
	allImages[changeImage.curIndex].classList.remove('curent-image');
	changeImage.curIndex = Array.from( allImages ).map( img => img.src ).indexOf(src);
	allImages[changeImage.curIndex].classList.add('curent-image');
	mainImage.src = src;
}
changeImage.curIndex = 0;

for (let src of imageSources) {
	let img = createImg( src, ['preview-image'] );

	if (imageSources.indexOf( src ) < 2) {
		divWithPrevues.appendChild( img );
		allImages.push( img );
	} else {
		divWithPrevues.insertBefore( img, divWithPrevues.children[2]);
		allImages.splice(2, 0, img)
	}
}

divWithPrevues.id = 'container-preview';

gallery.appendChild( divWithMainImage );
gallery.appendChild( divWithPrevues );
divWithMainImage.appendChild( mainImage );
changeImage( allImages[0].src );

for (let img of allImages) {
	img.addEventListener('click', event => { 
		changeImage(event.target.src); 
	});
}	

document.addEventListener('keydown', event => {
	if (event.code === 'ArrowLeft') {
		let index = (changeImage.curIndex + allImages.length - 1) % allImages.length;
		changeImage( allImages[index].src );
	} else if (event.code === 'ArrowRight') {
		let index = (changeImage.curIndex + 1) % allImages.length;	
		changeImage( allImages[index].src );
	}
});

setInterval(() => {
	let index = (changeImage.curIndex + 1) % allImages.length;
	changeImage( allImages[index].src );
}, 10000);

const accordion = document.createElement('div');
accordion.classList.add( 'accordion' );

document.body.appendChild( accordion );
for (let i = 0; i < 3; i++) {
	let accordContainer = document.createElement( 'div' ),
		accordBtn = document.createElement( 'button' ),
		accordText = document.createElement( 'p' );

	accordBtn.classList.add( 'accord-btn' );
	accordBtn.innerHTML = 'Button ' + (i + 1);
	accordText.style.display = 'none';
	accordText.innerHTML = 'Example ' + (i + 1);
	
	accordContainer.appendChild( accordBtn );
	accordContainer.appendChild( accordText );
	accordion.appendChild( accordContainer );
	
	accordBtn.addEventListener('click', event => {
		let pWithText = event.target.nextSibling;
		pWithText.style.display = 
			pWithText.style.display === 'none' ? 'block' : 'none';
	});
}

// mainImage.addEventListener('click', event => {
// 	let img = document.createElement('img');
	
// 	img.style.width = '100%';
// 	img.style.height = '100vh';
// 	img.src = event.target.src;
	
// 	img.addEventListener( 'wheel' , event => {
// 		enlargeOnScroll(event);
// 	});
	
// 	img.addEventListener('click', event => {
// 		event.target.remove();
// 		deleteBodyElements.return();
// 	})

// 	deleteBodyElements();
// 	document.body.appendChild( img );
// });

function enlargeOnScroll(event) {
	let transform = event.target.style.transform,
		scale = transform === null ? 1 : +transform.slice(6, transform.length - 1)
	if (event.deltaY < 0) {
		event.target.style.transform = `scale(${scale * 1.05})`;
	} else if (scale > 1) {
		event.target.style.transform = `scale(${scale * 0.95})`;
	}
}

//const zooming = new Zooming();
//zooming.listen( '.main-image' );

//askCaptcha();
