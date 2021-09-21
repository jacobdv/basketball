// let pageLink = 'http://127.0.0.1:5000/'
let pageLink = 'https://zbasketball.herokuapp.com/data/'

let menuIcon = d3.select('#mNavbar');
let onClickNav = d3.select('#mNavOnClick');
menuIcon.on('click', function() {
    if (onClickNav.attr('class').includes('hidden')) {
        onClickNav.classed('hidden', false);
    } else {
        onClickNav.classed('hidden', true);
    };
});

let navItems = d3.selectAll('.mNavItemText');
navItems.on('click', function() {
    let selection = this.attributes.value.value;
    linkNavigation(selection);
});
let navIcons = d3.selectAll('.mNavIcon');
navIcons.on('click', function() {
    let selection = this.attributes.value.value;
    linkNavigation(selection);
});
let header = d3.select('#mLogoDiv');
header.on('click', function() {
    let selection = this.attributes.value.value;
    linkNavigation(selection);
});
function linkNavigation(selection) {
    if (selection !== 'home') {
        location = `/${selection}`;
    } else {
        location = '/';
    };
};