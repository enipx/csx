/* eslint-disable no-unused-expressions */
import { domElementExistHandler, getDOMElementHandler } from '../utils/_base';

export default class Accordion {
  isActive: boolean;

  allowMultiple: boolean;

  activeClass: string;

  domSelector: string;

  domItemSelector: string;

  domItemHeaderSelector: string;

  domElement: HTMLElement;

  domSelectorElement: HTMLElement;

  domParentElement: HTMLElement;

  constructor() {
    this.isActive = false;
    this.allowMultiple = false;
    this.activeClass = 'active';
    this.domSelector = '';
    this.domItemHeaderSelector = 'accordion_header';
    this.domItemSelector = 'accordion_item';
    this.domSelectorElement = getDOMElementHandler('body'); // Get body by default then initialize with accordion element later
    this.domElement = getDOMElementHandler('body'); // Get body by default then initialize with accordion element later
    this.domParentElement = getDOMElementHandler('body'); // Get body by default then initialize with accordion parent element later
  }

  setUpParams(selector: string): void {
    if (domElementExistHandler(selector)) {
      this.domSelector = selector;

      // Setup dom element
      this.domSelectorElement = getDOMElementHandler(selector);
      this.domElement = getDOMElementHandler(selector).parentElement!;
      this.domParentElement = <HTMLElement>this.domElement.parentNode;

      // Setup properties
      if (
        Object.keys(this.domParentElement.dataset).includes('allowMultiple')
      ) {
        this.allowMultiple = true;
      }
    } else {
      throw new Error(
        `DOM element with the selector of ${selector} not found.`,
      );
    }
  }

  closeOthers(): void {
    this.domParentElement
      .querySelectorAll(`.${this.domItemSelector}`)
      .forEach((elem) => {
        elem.classList.remove(this.activeClass);
      });
  }

  open(selector: string, init = true): void {
    init ? this.setUpParams(selector) : '';

    // Close other
    this.allowMultiple ? '' : this.closeOthers();

    // Add active class
    this.domElement.classList.add(this.activeClass);

    // set accordion to active
    this.isActive = true;
  }

  close(selector: string, init = true): void {
    init ? this.setUpParams(selector) : '';

    // remove active class
    this.domElement.classList.remove(this.activeClass);

    // set accordion to active
    this.isActive = false;
  }

  toggle(selector: string): void {
    this.setUpParams(selector);

    this.domElement.classList.contains(this.activeClass)
      ? this.close(selector, false)
      : this.open(selector, false);
  }

  enableAccessibilty(): void {
    window.addEventListener('keyup', (e: KeyboardEvent) => {
      const elemFocused =
        document.activeElement?.classList.contains(this.domItemSelector) ||
        document.activeElement?.closest(`.${this.domItemSelector}`);

      if (e.key === 'ArrowUp') {
        if (elemFocused) {
          const elem = (elemFocused as HTMLElement).previousElementSibling;
          if (elem) {
            const elemHeader = elem?.querySelector(
              `.${this.domItemHeaderSelector}`,
            ) as HTMLButtonElement;
            if (elemHeader) elemHeader.focus();
          }
        }
      }

      if (e.key === 'ArrowDown') {
        if (elemFocused) {
          const elem = (elemFocused as HTMLElement).nextElementSibling;
          if (elem) {
            const elemHeader = elem?.querySelector(
              `.${this.domItemHeaderSelector}`,
            ) as HTMLButtonElement;
            if (elemHeader) elemHeader.focus();
          }
        }
      }
    });
  }

  init() {
    this.enableAccessibilty();
  }
}
