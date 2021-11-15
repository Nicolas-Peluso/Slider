import Slide from './Slide';

export default class SlideNav extends Slide {
  addArrow(prev, next) {
    console.log(this);
    this.prevButton = document.querySelector(prev);
    this.NextButton = document.querySelector(next);
    this.addArrowEvent();
  }

  addArrowEvent() {
    this.prevButton.addEventListener('click', this.activePrevSlide);
    this.NextButton.addEventListener('click', this.activeNextSlide);
  }
}
