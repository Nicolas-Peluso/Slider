import Slide from './Slide.js';

export default class SlideNav extends Slide {
  constructor(slide, wrapper) {
    super(slide, wrapper);
    this.bindControlsEvent();
  }

  addArrow(prev, next) {
    this.prevButton = document.querySelector(prev);
    this.NextButton = document.querySelector(next);
    this.addArrowEvent();
  }

  addArrowEvent() {
    this.prevButton.addEventListener('click', this.activePrevSlide);
    this.NextButton.addEventListener('click', this.activeNextSlide);
  }

  CreateControls() {
    const control = document.createElement('ul');
    control.classList.add('SlidePaginacao');
    this.slideArray.forEach((item, index) => {
      control.innerHTML += `<li><a href='#slide${index + 1}'></a></li>`;
    });
    this.wrapper.append(control);
    return control;
  }

  activeControlItem() {
    this.controlArray.forEach((item) => item.classList.remove(this.activeClass));
    this.controlArray[this.index.active].classList.add(this.activeClass);
  }

  addControl(customControl = null) {
    this.control = document.querySelector(customControl) || this.CreateControls();
    this.controlArray = [...this.control.children];
    this.controlArray.forEach((item, index) => {
      this.EventControl(item, index);
    });
  }

  EventControl(item, index) {
    item.addEventListener('click', (event) => {
      event.preventDefault();
      this.changeSlide(index);
    });
    this.activeControlItem();
    this.wrapper.addEventListener('changeSlide', this.activeControlItem);
  }

  bindControlsEvent() {
    this.changeSlide = this.changeSlide.bind(this);
    this.activeControlItem = this.activeControlItem.bind(this);
  }
}
