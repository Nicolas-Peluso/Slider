export default class Slide {
  constructor(SLide, Container) {
    this.Slide = document.querySelector(SLide);
    this.Container = document.querySelector(Container);
    this.events = ['mousedown', 'mousemove', 'mouseleave'];
    this.eventsCallBacks = [this.onStart, this.handleMousemove, this.HandleRemoveEvents];
  }

  EventsBinder() {
    this.onStart = this.onStart.bind(this);
    this.HandleRemoveEvents = this.HandleRemoveEvents.bind(this);
    this.handleMousemove = this.handleMousemove.bind(this);
    this.addEvents = this.addEvents.bind(this);
  }

  handleRemoveEvents() {
    console.log(this);
    this.events.forEach((evento, i) => {
      this.Container.removeEventListener(evento, this.eventsCallBacks[i]);
    });
  }

  handleMousemove() {
    console.log('mouse move');
    this.Container.addEventListener('mouseleave', this.handleRemoveEvents);
  }

  onStart(event) {
    event.preventDefault();
    this.Container.addEventListener('mousemove', this.handleMousemove);
  }

  addEvents() {
    this.Container.addEventListener('mousedown', this.onStart);
  }

  init() {
    this.EventsBinder();
    this.addEvents();
    return this;
  }
}
