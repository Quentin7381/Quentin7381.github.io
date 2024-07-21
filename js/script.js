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

/* ----- ----- ----- ------ ----- ----- ----- */
/* ----- ----- ----- SCROLL ----- ----- ----- */
/* ----- ----- ----- ------ ----- ----- ----- */
/**
 * An object to manage scrolling
 * target : the scroll container of the page
 * tile : page is divided in tiles (articles). One tile takes a full screen, and scroll snaps to it
 * scrollBtns : btns that allow to scroll by click
 */
const scroller = {
	target: document.querySelector(".scrollContainer"),
	tile: 0,
	scrollBtns: document.querySelectorAll(".scrollContainer > .btn"),
	maxTile: document.querySelectorAll(".scrollContainer > article").length - 1,
	snapTimer: null,

	/**
	 * trigered by all scrollings. Dynamicly hide the menus
	 * @param {*} event 
	 */
	onScroll: (event) => {
		
		//First we calc the tile we are arriving on
		const newTile = Math.round(
			scroller.target.scrollTop / scroller.target.clientHeight
		);
		
		//Then if we changed tile...
		if (newTile != scroller.tile) {

			let direction = newTile - scroller.tile;

			// For the first tile, the menu is displayed
			if(newTile == 0) {
				scroller.scrollBtns[0].classList.add("hidden");
				scroller.scrollBtns[1].classList.remove("hidden");
				if(window.screen.width>AUTO_TOGGLE_WIDTH){
					header.target.classList.remove("collapsed");
					header.button.classList.add("hidden");
				}
			}

			// We hide the scroll bot button on last tile
			else if(newTile == scroller.maxTile){
				header.target.classList.add("collapsed");
				scroller.scrollBtns[0].classList.remove("hidden");
				scroller.scrollBtns[1].classList.add("hidden");
				header.button.classList.remove("hidden");
			}

			// We show scroll buttons on other tiles
			else {
				header.target.classList.add("collapsed");
				scroller.scrollBtns[0].classList.remove("hidden");
				scroller.scrollBtns[1].classList.remove("hidden");
				header.button.classList.remove("hidden");
			}

			scroller.tile = newTile;
		}

		if(typeof snapTimer != "undefined") {
			clearTimeout(snapTimer);
		}
		snapTimer = setTimeout(() => {
			console.log("Scrolling in 1 sec");
			scroller.target.scroll({
				top: scroller.tile * scroller.target.clientHeight,
				behavior: "smooth",
			});
		}, 1000);

		//Collapsing menu when screen size is small
		if(window.screen.width<=AUTO_TOGGLE_WIDTH){
			header.target.classList.add('collapsed');
		}
	},

	/**
	 * allow to scroll using events
	 * @param {*} direction -1 is upward, 1 is downward. IMPORTANT NOTE : greater or lower numbers will multiply the scroll. To scroll 2 tiles up, you can use direction : -2;
	 */
	scroll: (direction) => {
		scroller.target.scroll({
			top:
				scroller.target.scrollTop +
				direction * scroller.target.clientHeight,
			behavior: "smooth",
		});
	},

	scrollTo: (tile) => {
		scroller.target.scroll({
			top: tile * scroller.target.clientHeight,
			behavior: "smooth",
		});
	
	}
};

scroller.target.addEventListener("scroll", (e) => scroller.onScroll(e));
scroller.scrollBtns[0].addEventListener("click", () => scroller.scroll(-1));
scroller.scrollBtns[1].addEventListener("click", () => scroller.scroll(1));

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