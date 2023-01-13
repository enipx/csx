/* eslint-disable no-unused-expressions */
import { getDOMElementHandler } from '../utils/_base';

type tabsType = {
  target: HTMLElement;
  selector: string;
  onComplete?: () => void;
};

export default class Tabs {
  isActive: boolean;

  allowToggle: boolean;

  activeClass: string;

  onComplete?: () => void;

  domSelector: string;

  domTabItemSelector: string;

  domTabPanelSelector: string;

  domElement: HTMLElement;

  domTargetElement: HTMLElement;

  domTargetParentElement: HTMLElement;

  domParentElement: HTMLElement;

  constructor() {
    this.isActive = false;
    this.allowToggle = false;
    this.activeClass = 'active';
    this.domSelector = '';
    this.domTabItemSelector = '.tab_nav_item';
    this.domTabPanelSelector = '.tab_panel';
    this.domElement = getDOMElementHandler('body'); // Get body by default then initialize with accordion element later
    this.domTargetElement = getDOMElementHandler('body'); // Get body by default then initialize with accordion element later
    this.domTargetParentElement = getDOMElementHandler('body'); // Get body by default then initialize with accordion parent element later
    this.domParentElement = getDOMElementHandler('body'); // Get body by default then initialize with accordion parent element later
  }

  setUpParams(params: tabsType): void {
    this.domSelector = params.selector;
    this.domElement = getDOMElementHandler(this.domSelector);
    this.domParentElement = this.domElement.parentElement!;
    this.domTargetElement = params.target;
    this.domTargetParentElement = this.domTargetElement.parentElement!;

    if (
      Object.keys(this.domTargetParentElement.dataset).includes('allowToggle')
    ) {
      this.allowToggle = true;
    }

    if (this.domTargetParentElement.dataset.run) {
      // eslint-disable-next-line no-eval
      this.onComplete = eval(this.domTargetParentElement.dataset.run);
    } else {
      this.onComplete = params.onComplete;
    }
  }

  closeOthers(): void {
    this.domParentElement
      .querySelectorAll(this.domTabPanelSelector)
      .forEach((elem) => {
        elem.classList.remove(this.activeClass);
      });

    this.domTargetParentElement
      .querySelectorAll(this.domTabItemSelector)
      .forEach((elem) => {
        elem.classList.remove(this.activeClass);
      });
  }

  open(params: tabsType, init = true): void {
    init ? this.setUpParams(params) : '';

    // Close other
    this.closeOthers();

    // Add active class
    this.domElement.classList.add(this.activeClass);
    this.domTargetElement.classList.add(this.activeClass);

    this.onComplete?.();
  }

  close(params: tabsType, init = true): void {
    if (this.allowToggle) {
      init ? this.setUpParams(params) : '';

      this.domElement.classList.remove(this.activeClass);
      this.domTargetElement.classList.remove(this.activeClass);

      this.onComplete?.();
    }
  }

  toggle(params: tabsType): void {
    this.setUpParams(params);

    this.domElement.classList.contains(this.activeClass)
      ? this.close(params, false)
      : this.open(params, false);
  }
}
