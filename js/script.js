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

if(window.screen.width <= AUTO_TOGGLE_WIDTH){
	document.querySelector("header").classList.add('collapsed')
};

const header = {
	target: document.querySelector("header"),
	button: document.querySelector(".headerToggleBtn"),
	toggle: () => {
		if (header.target.classList.contains("collapsed")) {
			header.target.classList.remove("collapsed");
		} else {
			header.target.classList.add("collapsed");
		}
		return header.collapsed;
	},
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

	boundaries = [];

	scrollBtns = [];
	snapTimer = null;

	direction = 'vertical';

	scrollCallback = null;

	constructor(container, direction = 'vertical') {
		this.container = container;
		this.container.addEventListener('scroll', this.onScroll);

		this.tiles = container.querySelectorAll(':scope > .tile');
		this.maxTile = this.tiles.length - 1;
		this.direction = direction;

		this.createButton(-1);
		this.createButton(1);

		this.setBoundaries();
		this.actualizeButtons(this.getCurrentTile());
	}

	getCurrentTile() {
		let scroll = this.direction == 'vertical' ? this.container.scrollTop : this.container.scrollLeft;
		
		let i = 0;
		let boundary;
		do {
			boundary = this.boundaries[i];
		} while(scroll > boundary && i++ < this.maxTile);

		return i;
	}


	onScroll = (event) => {
		let newTile = this.getCurrentTile();

		if(newTile != this.actualTile) {
			this.actualizeButtons(newTile);
			this.actualTile = newTile;
		}

		if(typeof this.snapTimer != 'undefined') {
			clearTimeout(this.snapTimer);
		}

		this.snapTimer = setTimeout(() => {
			this.scrollTo(this.actualTile);
		}, 1000);
	}

	scroll = (direction) => {
		this.scrollTo(this.actualTile + direction);
	}

	scrollTo = (tile) => {
		if(tile < 0 || tile > this.maxTile) {
			return;
		}

		this.tiles[tile].scrollIntoView({
			behavior: 'smooth',
			block: 'start',
		});

		this.actualTile = tile;
	}

	actualizeButtons(newTile){
		if(newTile == 0) {
			this.scrollBtns[0].classList.add('hidden');
		}

		if(newTile == this.maxTile) {
			this.scrollBtns[1].classList.add('hidden');
		}

		if(newTile > 0) {
			this.scrollBtns[0].classList.remove('hidden');
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

	setBoundaries() {
		this.tiles.forEach((tile) => {
			this.boundaries.push(this.direction == 'vertical' ? tile.offsetTop : tile.offsetLeft);
		});
	}
}

const mainScroller = new Scroller(document.querySelector('.scrollContainer'));
mainScroller.scrollCallback = (scroller, tile) => {
	if(tile == 0) {
		header.target.classList.remove('collapsed');
		header.button.classList.add('hidden');
	} else {
		header.target.classList.add('collapsed');
		header.button.classList.remove('hidden');
	}
}

let carrousels = document.querySelectorAll('.carrousel');
carrousels = Array.from(carrousels);
carrousels.map((carrousel) => {
	let scroller = new Scroller(carrousel, 'horizontal');
});