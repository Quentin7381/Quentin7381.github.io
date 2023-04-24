/* ----- ----- ----- ------ ----- ----- ----- */
/* ----- ----- ----- HEADER ----- ----- ----- */
/* ----- ----- ----- ------ ----- ----- ----- */
const header = {
        target : document.querySelector('header'),
        button : document.querySelector('.headerToggleBtn'),
        links : document.querySelectorAll('header a'),
        logo : document.querySelector('header .logo'),
        collapsed : false,
        toggle : ()=> {
            header.collapsed = !header.collapsed
            if(header.collapsed === false){
                header.target.classList.remove('collapsed');
            } else {
                header.target.classList.add('collapsed');
            }
            return header.collapsed;
        }
};

header.button.addEventListener('click', header.toggle);

/* ----- ----- ----- ------ ----- ----- ----- */
/* ----- ----- ----- SCROLL ----- ----- ----- */
/* ----- ----- ----- ------ ----- ----- ----- */
const scroller = {
    target : document.querySelector('.scrollContainer'),
    tile : 0,
    scroll : (event)=> {
        const newTile = Math.round(scroller.target.scrollTop / (scroller.target.clientHeight));

        if(newTile != scroller.tile){

            switch(newTile){
                case 0 :
                    header.button.classList.add('hidden');
                    header.target.classList.remove('collapsed');
                    break;
                case 1 :
                    switch(scroller.tile){
                        case 0 :
                            header.button.classList.remove('hidden');
                            header.target.classList.add('collapsed');
                    }
                    break;
            }

            scroller.tile = newTile;
        }
    }
};

scroller.target.addEventListener('scroll', (e)=>scroller.scroll(e))