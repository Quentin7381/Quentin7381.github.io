/* ----- ----- ----- ------ ----- ----- ----- */
/* ----- ----- ----- HEADER ----- ----- ----- */
/* ----- ----- ----- ------ ----- ----- ----- */
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
const scroller = {
	target: document.querySelector(".scrollContainer"),
	tile: 0,
	scrollBtns: document.querySelectorAll(".scrollContainer > .btn"),
	onScroll: (event) => {
		const newTile = Math.round(
			scroller.target.scrollTop / scroller.target.clientHeight
		);

		if (newTile != scroller.tile) {
			switch (newTile) {
				case 0:
					header.button.classList.add("hidden");
					scroller.scrollBtns[0].classList.add("hidden");
					header.target.classList.remove("collapsed");
					break;
				case 1:
					switch (scroller.tile) {
						case 0:
							header.button.classList.remove("hidden");
							header.target.classList.add("collapsed");
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
	},
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
