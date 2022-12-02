/* eslint-disable no-unused-expressions */
import { getDOMElementHandler, getKeyboardClickHandler } from '../utils/_base';

type modalType = {
  selector: string;
  onComplete?: () => void;
  animation?: string;
};
export default class Modal {
  isActive: boolean;

  isDrawer: boolean;

  backdropDimiss: boolean;

  keyboardShortcutDismiss: boolean;

  animation: string;

  duration: number;

  drawerDuration: number;

  domSelector: string;

  domElement: HTMLElement;

  domElementContainer: HTMLElement;

  activeClass: string;

  modalContainerClsSelector: string;

  constructor() {
    this.isActive = false;
    this.isDrawer = false;
    this.backdropDimiss = true;
    this.keyboardShortcutDismiss = true;
    this.animation = 'fadeTop';
    this.duration = 300;
    this.drawerDuration = 400;
    this.domSelector = '';
    this.domElement = getDOMElementHandler('body'); // Get body by default then initialize with modal element later
    this.domElementContainer = getDOMElementHandler('body'); // Get body by default then initialize with modal element container later
    this.activeClass = 'show';
    this.modalContainerClsSelector = 'modal_container';
  }

  initModal(selector: string): void {
    this.domSelector = selector;
    this.domElement = getDOMElementHandler(selector);
    this.domElementContainer = getDOMElementHandler(
      `${selector} .${this.modalContainerClsSelector}`,
    );
    // Check if animation is define
    if (this.domElementContainer.dataset.animation) {
      this.animation = this.domElementContainer.dataset.animation;
    }

    // Check if backdrop is define
    if (this.domElement.dataset.backdropDismiss === 'false') {
      this.backdropDimiss = false;
    }

    // Check if keyboardshortcut is define
    if (this.domElement.dataset.escDismiss === 'false') {
      this.keyboardShortcutDismiss = false;
    }

    // Check if modal is drawer
    if (this.domElement.dataset.type === 'drawer') {
      this.duration = 200; // reduce duration
      this.isDrawer = true;
      this.animation = 'show'; // `show` is the drawer animation
    }
  }

  open(params: modalType): void {
    this.initModal(params.selector);
    // Check if animation is set
    if (this.domElement.dataset.animation) {
      this.animation = this.domElement.dataset.animation;
    }

    // Add display class to modal
    this.domElement.classList.add(this.activeClass);
    if (this.isDrawer) {
      setTimeout(() => {
        this.domElementContainer.classList.add(this.animation);
      }, this.duration);
    } else {
      this.domElementContainer.classList.add(this.animation);
    }

    // Focus on modal
    this.domElement.focus();

    // Run onComplete function if set
    params.onComplete?.();

    // Set modal to active
    this.isActive = true;

    this.closeOnBackdropClick();
    this.closeOnKeyboardShortcut();
  }

  close(params: modalType): void {
    this.initModal(params.selector);
    // remove display class to modal
    this.domElementContainer.classList.remove(this.animation);
    this.domElementContainer.classList.add(`${this.animation}Out`);

    const duration = this.isDrawer ? this.drawerDuration : this.duration;

    setTimeout(() => {
      this.domElement.classList.remove(this.activeClass);
      this.domElementContainer.classList.remove(`${this.animation}Out`);
    }, duration);

    // Run onComplete function if set
    params.onComplete?.();

    // Set modal to active
    this.isActive = false;
  }

  toggle(params: modalType): void {
    this.domElement = getDOMElementHandler(params.selector);

    this.domElement.classList.contains(this.activeClass)
      ? this.close(params)
      : this.open(params);
  }

  closeOnBackdropClick(): void {
    this.backdropDimiss &&
      document.addEventListener('click', (evt: Event) => {
        const target = <HTMLElement>evt.target;
        if (target.classList.contains(this.modalContainerClsSelector)) {
          // Close modal
          this.close({
            selector: this.domSelector,
          });
        }
      });
  }

  closeOnKeyboardShortcut(): void {
    this.keyboardShortcutDismiss &&
      this.isActive &&
      document.addEventListener('keydown', (evt) => {
        if (getKeyboardClickHandler(evt).key === 'Escape') {
          // Close modal
          this.close({
            selector: this.domSelector,
          });
        }
      });
  }
}

export const initModal = (): void => {
  // ...
};
