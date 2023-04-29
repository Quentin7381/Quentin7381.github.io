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
			//We check the tile we arrived on
			switch (newTile) {
				//If it is the first one
				case 0:
					scroller.scrollBtns[0].classList.add("hidden");
					if(SCREEN_WIDTH>AUTO_TOGGLE_WIDTH){
						header.target.classList.remove("collapsed");
						console.log(window.screen.width, AUTO_TOGGLE_WIDTH);
						header.button.classList.add("hidden");
					}
					break;
				//The second
				case 1:
					//Only if we came from the first one to the second one (so menu doesn't hide when scrolling upwards)
					switch (scroller.tile) {
						case 0:
							header.target.classList.add("collapsed");
							header.button.classList.remove("hidden");
							scroller.scrollBtns[0].classList.remove("hidden");
					}
					break;
				case 2:
					switch (scroller.tile) {
						case 3:
							scroller.scrollBtns[1].classList.remove("hidden");
					}
					break;
				case 3:
					scroller.scrollBtns[1].classList.add("hidden");
					break;
			}

			scroller.tile = newTile;
		}

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
};

scroller.target.addEventListener("scroll", (e) => scroller.onScroll(e));
scroller.scrollBtns[0].addEventListener("click", () => scroller.scroll(-1));
scroller.scrollBtns[1].addEventListener("click", () => scroller.scroll(1));

/* ----- ----- ----- -------------- ----- ----- ----- */
/* ----- ----- ----- SMOOTH ANCHORS ----- ----- ----- */
/* ----- ----- ----- -------------- ----- ----- ----- */
//Prevent default anchor behaviour to insted scroll smoothly
console.log(document.querySelectorAll('a[href^="#"]'));

document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
	anchor.addEventListener("click", (e) => {
		e.preventDefault();
		document.querySelector(anchor.getAttribute("href")).scrollIntoView({
			behavior: "smooth",
		});
	});
});

document.querySelector("#logo").addEventListener("click", (e) => {
	console.log(e);
	scroller.target.scroll({
		top: 0,
		behavior: "smooth",
	});
});
