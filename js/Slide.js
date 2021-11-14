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

  handleRemoveEvents() {
    this.Container.removeEventListener('mousemove', this.handleMousemove);
    this.dist.finalposition = this.dist.lastPosition;
  }

  handleMousemove(event) {
    const finalPosition = this.updatePosition(event.clientX);
    this.moveSlide(finalPosition);
  }

  onStart(event) {
    event.preventDefault();
    this.dist.startX = event.clientX;
    this.Container.addEventListener('mousemove', this.handleMousemove);
  }

  addEvents() {
    this.Container.addEventListener('mousedown', this.onStart);
    this.Container.addEventListener('mouseup', this.handleRemoveEvents);
  }

  init() {
    this.EventsBinder();
    this.addEvents();
    return this;
  }
}
