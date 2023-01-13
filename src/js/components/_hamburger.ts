/* eslint-disable no-unused-expressions */
import { getDOMElementHandler } from '../utils/_base';

type hamburgerType = {
  selector: string;
  onComplete?: () => void;
};

export default class Hamburger {
  isActive: boolean;

  domSelector: string;

  onComplete?: () => void;

  animationDuration: number;

  activeClass: string;

  domElement: HTMLElement;

  constructor() {
    this.isActive = false;
    this.domSelector = '';
    this.onComplete;
    this.animationDuration = 300;
    this.activeClass = 'active';
    this.domElement = getDOMElementHandler('body'); // Get body by default then initialize with modal element later
  }

  setUpParams(params: hamburgerType) {
    this.domSelector = params.selector;
    this.domElement = getDOMElementHandler(this.domSelector);
    if (this.domElement.dataset.run) {
      // eslint-disable-next-line no-eval
      this.onComplete = eval(this.domElement.dataset.run);
    } else {
      this.onComplete = params.onComplete;
    }
  }

  open(params: hamburgerType, init = true) {
    init ? this.setUpParams(params) : '';

    this.domElement.classList.add(this.activeClass);
    this.isActive = true;
    setTimeout(() => {
      this.onComplete?.();
    }, this.animationDuration);
  }

  close(params: hamburgerType, init = true) {
    init ? this.setUpParams(params) : '';

    this.domElement.classList.remove(this.activeClass);
    this.isActive = false;
    setTimeout(() => {
      this.onComplete?.();
    }, this.animationDuration);
  }

  toggle(params: hamburgerType) {
    this.setUpParams(params);

    this.domElement.classList.contains(this.activeClass)
      ? this.close(params, false)
      : this.open(params, false);
  }
}
