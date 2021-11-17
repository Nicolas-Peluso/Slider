import SlideNav from './SlideNav.js';

const Slider = new SlideNav('.Slide', '.Slide-Container');
Slider.init();
Slider.addArrow('.arrow-prev', '.arrow-next');
Slider.addControl('.pagination-Item');
