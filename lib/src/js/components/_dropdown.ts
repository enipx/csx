/* eslint-disable no-unused-expressions */
import {
  domElementExistHandler,
  getDOMElementHandler,
  getAllDOMElementHandler,
  getKeyboardClickHandler,
} from '../utils/_base';

export default class Dropdown {
  isActive: boolean;

  dropdownDOMElement: HTMLElement;

  dropdownSelector: string;

  activeClass: string;

  clickOutsideDimiss: boolean;

  keyboardShortcutDismiss: boolean;

  constructor() {
    this.isActive = false;
    this.dropdownDOMElement = getDOMElementHandler('body');
    this.dropdownSelector = 'dropdown_menu';
    this.activeClass = 'active';
    this.clickOutsideDimiss = true;
    this.keyboardShortcutDismiss = true;
  }

  setUpParam(selector: string): void {
    if (this.isDropdown(selector)) {
      // Set dropdown
      this.dropdownDOMElement = getDOMElementHandler(selector);
    } else {
      const dropdown = <HTMLElement>(
        getDOMElementHandler(selector).nextElementSibling
      );
      if (dropdown.classList.contains(this.dropdownSelector)) {
        // Set dropdown
        this.dropdownDOMElement = dropdown;
      } else {
        throw new Error(
          `DOM element doesn't have the ${this.dropdownSelector} class`,
        );
      }
    }
  }

  isDropdown(selector: string): boolean {
    return getDOMElementHandler(selector).classList.contains(
      this.dropdownSelector,
    );
  }

  closeAll(): void {
    if (domElementExistHandler(`.${this.dropdownSelector}`)) {
      getAllDOMElementHandler(`.${this.dropdownSelector}`).forEach(
        (dropdown) => {
          dropdown.classList.contains(this.activeClass)
            ? dropdown.classList.remove(this.activeClass)
            : '';
        },
      );
    }
  }

  open(selector: string): void {
    this.setUpParam(selector);

    // Close other dropdown
    this.closeAll();

    // Add active class to dropdonw
    this.dropdownDOMElement.classList.add(this.activeClass);
    this.dropdownDOMElement.focus();

    // Set tooltip width to content width
    if (this.dropdownDOMElement.dataset.type === 'tooltip') {
      this.dropdownDOMElement
        .querySelectorAll('.content')
        .forEach((content) => {
          const contentInfo = content.getBoundingClientRect();
          const maxWidth = 16 * 16;
          if (contentInfo.width < maxWidth) {
            this.dropdownDOMElement.style.minWidth = `${
              contentInfo.width + 16
            }px`;
          }
        });
    }

    // Make dropdown active
    this.isActive = true;

    // Close on outside
    this.closeOnOutsideClick(selector);
    this.closeOnKeyboardShortcut(selector);
  }

  close(selector: string): void {
    this.setUpParam(selector);

    // remove active class to dropdonw
    this.dropdownDOMElement.classList.remove(this.activeClass);

    // Make dropdown active
    this.isActive = false;
  }

  toggle(selector: string): void {
    if (this.isDropdown(selector)) {
      getDOMElementHandler(selector).classList.contains(this.activeClass)
        ? this.close(selector)
        : this.open(selector);
    } else {
      const dropdown = <HTMLElement>(
        getDOMElementHandler(selector).nextElementSibling
      );
      dropdown.classList.contains(this.activeClass)
        ? this.close(selector)
        : this.open(selector);
    }
  }

  closeOnOutsideClick(selector: string): void {
    this.clickOutsideDimiss &&
      document.addEventListener('click', (evt: Event) => {
        const target = <HTMLElement>evt.target;
        if (
          target !== this.dropdownDOMElement &&
          !this.dropdownDOMElement.contains(target) &&
          this.isActive
        ) {
          // Close
          this.close(selector);
        }
      });
  }

  closeOnKeyboardShortcut(selector: string): void {
    this.keyboardShortcutDismiss &&
      this.isActive &&
      document.addEventListener('keydown', (evt) => {
        if (getKeyboardClickHandler(evt).key === 'Escape') {
          // Close modal
          this.close(selector);
        }
      });
  }

  hoverReveal(selector: string): void {
    const events = ['mouseover', 'mouseout'];
    events.forEach((type) => {
      getDOMElementHandler(selector).addEventListener(type, () => {
        type === events[0] ? this.open(selector) : this.close(selector);
      });
    });
  }
}
