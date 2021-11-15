export default class Slide {
  constructor(SLide, Container) {
    this.Slide = document.querySelector(SLide);
    this.Container = document.querySelector(Container);
    this.dist = {
      finalposition: 0, startX: 0, movement: 0, lastPosition: 0,
    };
  }

  transition(active) {
    this.Slide.style.transition = active ? 'transform .3s' : '';
  }

  updatePosition(clientX) {
    this.dist.movement = (this.dist.startX - clientX) * 2;
    return (this.dist.movement + this.dist.finalposition);
  }

  moveSlide(distX) {
    console.log(this.index);
    if (this.index.prev !== null || this.index.next !== null) {
      this.dist.lastPosition = distX;
      this.Slide.style.transform = `translate3d(-${distX}px, 0, 0)`;
    }
  }

  EventsBinder() {
    this.onStart = this.onStart.bind(this);
    this.handleRemoveEvents = this.handleRemoveEvents.bind(this);
    this.handleMousemove = this.handleMousemove.bind(this);
    this.addEvents = this.addEvents.bind(this);
  }

  // Slides COnfiguracao
  SlidePosition(elemento) {
    const Total = (this.Container.offsetWidth - elemento.offsetWidth) / 2;
    return (elemento.offsetLeft - Total);
  }

  slideConfig() {
    this.slidArray = [...this.Slide.children].map((elemento) => {
      const position = this.SlidePosition(elemento);
      return {
        position,
        elemento,
      };
    });
  }

  ChangeSlide(index) {
    this.SlideIndexNav(index);
    this.moveSlide(this.slidArray[index].position);
    this.dist.finalposition = this.slidArray[index].position;
  }

  activePrevSlide() {
    if (this.index.prev) this.ChangeSlide(this.index.prev);
  }

  activeNextSlide() {
    if (this.index.next) this.ChangeSlide(this.index.next);
  }

  SlideIndexNav(index) {
    this.index = {
      prev: (index - 1 < 0) ? null : index - 1,
      active: index,
      next: (index + 1 > this.slidArray.length - 1) ? null : index + 1,
    };
    return this.index;
  }

  // Slides COnfiguracao Final

  handleRemoveEvents(event) {
    const moveType = (event.type === 'mouseup') ? 'mousemove' : 'touchmove';
    this.Container.removeEventListener(moveType, this.handleMousemove);
    this.dist.finalposition = this.dist.lastPosition;
    this.changeSlideOnEnd();
    this.transition(true);
  }

  changeSlideOnEnd() {
    if (this.dist.movement > 0 && this.index.next !== null) {
      this.activeNextSlide();
    } else if (this.dist.movement < 0 && this.index.prev !== null) {
      this.activePrevSlide();
    } else {
      this.ChangeSlide(this.index.active);
    }
  }

  handleMousemove(event) {
    const pointerPosition = (event.type === 'mousemove') ? event.clientX : event.changedTouches[0].clientX;
    const finalPosition = this.updatePosition(pointerPosition);
    this.moveSlide(finalPosition);
  }

  onStart(event) {
    let moveType;
    if (event.type === 'mousedown') {
      event.preventDefault();
      this.dist.startX = event.clientX;
      moveType = 'mousemove';
    } else {
      this.dist.startX = event.changedTouches[0].clientX;
      moveType = 'touchmove';
    }
    this.Container.addEventListener(moveType, this.handleMousemove);
    this.transition(false);
  }

  addEvents() {
    this.Container.addEventListener('mousedown', this.onStart);
    this.Container.addEventListener('touchstart', this.onStart);
    this.Container.addEventListener('mouseup', this.handleRemoveEvents);
    this.Container.addEventListener('touchend', this.handleRemoveEvents);
  }

  init() {
    this.EventsBinder();
    this.transition(true);
    this.addEvents();
    this.slideConfig();
    return this;
  }
}
