/* ----- ----- ----- ------ ----- ----- ----- */
/* ----- ----- ----- HEADER ----- ----- ----- */
/* ----- ----- ----- ------ ----- ----- ----- */
const Header = {
        target : document.querySelector('header'),
        button : document.querySelector('.headerToggleBtn'),
        links : document.querySelectorAll('header a'),
        logo : document.querySelector('header .logo'),
        collapsed : false,
        toggle : ()=> {
            if(Header.collapsed === true){
                Header.links.forEach(link => {
                    link.classList.remove('hidden');
                });
                Header.target.classList.remove('collapsed');
                Header.logo.classList.remove('hidden');
                Header.collapsed = false;
            } else {
                Header.links.forEach(link => {
                    link.classList.add('hidden');
                });
                Header.target.classList.add('collapsed');
                Header.logo.classList.add('hidden');
                Header.collapsed = true;
            }
            return Header.collapsed;
        }
};

Header.button.addEventListener('click', Header.toggle);