export default class Slide {
  constructor(SLide, Container) {
    this.Slide = document.querySelector(SLide);
    this.Container = document.querySelector(Container);
    this.dist = {
      finalposition: 0, startX: 0, movement: 0, lastPosition: 0,
    };
  }

  updatePosition(clientX) {
    this.dist.movement = (this.dist.startX - clientX) * 2;
    return this.dist.movement + this.dist.finalposition;
  }

  moveSlide(distX) {
    if (distX > 0) {
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

  handleRemoveEvents(event) {
    const moveType = (event.type === 'mouseup') ? 'mousemove' : 'touchmove';
    this.Container.removeEventListener(moveType, this.handleMousemove);
    this.dist.finalposition = this.dist.lastPosition;
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
  }

  addEvents() {
    this.Container.addEventListener('mousedown', this.onStart);
    this.Container.addEventListener('touchstart', this.onStart);
    this.Container.addEventListener('mouseup', this.handleRemoveEvents);
    this.Container.addEventListener('touchend', this.handleRemoveEvents);
  }

  init() {
    this.EventsBinder();
    this.addEvents();
    return this;
  }
}
