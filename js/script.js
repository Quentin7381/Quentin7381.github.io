/* ----- ----- ----- ------ ----- ----- ----- */
/* ----- ----- ----- HEADER ----- ----- ----- */
/* ----- ----- ----- ------ ----- ----- ----- */
/**
 * An object allowing easier header manipulation
 * target : the header itself
 * button : the button used to toggle the header
 * toggle : show/hide the header
 */
const AUTO_TOGGLE_WIDTH = 780;

if(window.innerWidth <= AUTO_TOGGLE_WIDTH){
	document.querySelector("header").classList.add('collapsed')
};

const header = {
	target: document.querySelector("header"),
	button: document.querySelector(".headerToggleBtn"),
	toggle: (event, state = null) => {
		if (state === null) {
			header.target.classList.toggle("collapsed");
		} else {
			if (state) {
				header.target.classList.add("collapsed");
			} else {
				header.target.classList.remove("collapsed");
			}
		}
		return header.collapsed;
	},
	scrollToggle: (event, state = null) => {
		if (window.innerWidth >= AUTO_TOGGLE_WIDTH) {
			header.toggle(null, state);
		}
	}
};

header.button.addEventListener("click", header.toggle);

/* ----- ----- ----- -------------- ----- ----- ----- */
/* ----- ----- ----- SMOOTH ANCHORS ----- ----- ----- */
/* ----- ----- ----- -------------- ----- ----- ----- */
// Prevent default anchor behaviour to insted scroll smoothly

document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
	anchor.addEventListener("click", (e) => {
		e.preventDefault();
		document.querySelector(anchor.getAttribute("href")).scrollIntoView({
			behavior: "smooth",
		});
	});
});

document.querySelector("#logo").addEventListener("click", (e) => {
	scroller.target.scroll({
		top: 0,
		behavior: "smooth",
	});
});

/* ----- ----- ----- ----------- ----- ----- ----- */
/* ----- ----- ----- LAZY IMAGES ----- ----- ----- */
/* ----- ----- ----- ----------- ----- ----- ----- */
//Lazy load all images

document.querySelectorAll('img').forEach((img)=>{
	img.setAttribute('loading', 'lazy');
})

/* ----- ----- ----- ----------- ----- ----- ----- */
/* ----- ----- ------ SCROLLER  ------ ----- ----- */
/* ----- ----- ----- ----------- ----- ----- ----- */

class Scroller {

	container = null;

	tiles = [];
	actualTile = 0;
	maxTile = 0;
	snap = 'start';

	scrollBtns = [];
	snapTimer = null;

	direction = 'vertical';

	scrollCallback = null;

	constructor(container, direction = 'vertical', snap = 'start') {
		this.container = container;
		this.container.addEventListener('scroll', this.onScroll);

		this.tiles = container.querySelectorAll(':scope > .tile');
		this.maxTile = this.tiles.length - 1;
		this.direction = direction;
		this.snap = snap;

		this.createButton(-1);
		this.createButton(1);

		this.actualizeButtons(this.getCurrentTile());
	}

	getCurrentTile() {
		let scroll = this.direction == 'vertical' ? this.container.scrollTop : this.container.scrollLeft;
		
		let i = 0;
		let closest;
		do {
			let boundary = this.getBoundary(i);
			let distanceToBoundary = Math.abs(scroll - boundary);
			if(typeof closest == 'undefined' || distanceToBoundary < closest) {
				closest = distanceToBoundary;
			} else {
				break;
			}
		} while(i++ < this.maxTile);

		return i-1;
	}


	onScroll = (event, noscroll = false) => {
		let newTile = this.getCurrentTile();

		if(newTile != this.actualTile) {
			this.actualizeButtons(newTile);
			this.actualTile = newTile;
		}

		if(noscroll) {
			return;
		}

		if(typeof this.snapTimer != 'undefined') {
			clearTimeout(this.snapTimer);
		}

		this.snapTimer = setTimeout(() => {
			this.scrollTo(this.actualTile);
		}, 1000);
	}

	getBoundary(tile){
		if(this.snap == 'start') {
			return this.direction == 'vertical' ? this.tiles[tile].offsetTop : this.tiles[tile].offsetLeft;
		} else {
			return this.direction == 'vertical' ? this.tiles[tile].offsetTop + this.tiles[tile].offsetHeight - this.container.clientHeight : this.tiles[tile].offsetLeft + this.tiles[tile].offsetWidth - this.container.clientWidth;
		}
	}

	scroll = (direction) => {
		this.scrollTo(this.actualTile + direction);
	}

	scrollTo = (tile) => {

		if(tile < 0 || tile > this.maxTile) {
			return;
		}

		let boundary = this.getBoundary(tile);
		let scroll = this.getScrollObject(boundary);

		this.container.scroll(scroll);
		
		this.actualTile = tile;
		this.onScroll(null, true);
	}

	getScrollObject(boundary){
		let scroll = {
			behavior: 'smooth'
		}

		scroll[this.direction == 'vertical' ? 'top' : 'left'] = boundary;
		
		return scroll;
	}

	actualizeButtons(newTile){
		if(newTile == 0) {
			this.scrollBtns[0].classList.add('hidden');
			header.button.classList.add('hidden');
		}

		if(newTile == this.maxTile) {
			this.scrollBtns[1].classList.add('hidden');
		}

		if(newTile > 0) {
			this.scrollBtns[0].classList.remove('hidden');
			header.button.classList.remove('hidden');
		}

		if(newTile < this.maxTile) {
			this.scrollBtns[1].classList.remove('hidden');
		}

		if(typeof this.scrollCallback == 'function') {
			this.scrollCallback(this, newTile);
		}
	}

	createButton(direction) {
		let btn = document.createElement('div');
		btn.classList.add('btn', 'hidden');
		switch (direction) {
			case -1:
				btn.classList.add(this.direction == 'vertical' ? 'up' : 'left');
				break;
			case 1:
				btn.classList.add(this.direction == 'vertical' ? 'down' : 'right');
				break;
			default:
				throw new Error('Invalid direction');
		}

		btn.innerHTML = '<i class="fa-solid fa-angles-up"></i>';
		btn.addEventListener('click', () => this.scroll(direction));
		this.container.appendChild(btn);
		this.scrollBtns.push(btn);
	}
}

const mainScroller = new Scroller(document.querySelector('.scrollContainer'));
mainScroller.scrollCallback = (scroller, tile) => {
	if(tile == 0) {
		header.scrollToggle(null, false);
	} else {
		header.scrollToggle(null, true);
	}
}

let carrousels = document.querySelectorAll('.carrousel');
carrousels = Array.from(carrousels);
carrousels.map((carrousel) => {
	let snap = carrousel.dataset.snap || 'start';
	let scroller = new Scroller(carrousel, 'horizontal', snap);
});