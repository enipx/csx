/* eslint-disable no-undef */
/* eslint-disable no-unused-expressions */
import {
  domElementExistHandler,
  getAllDOMElementHandler,
  getDOMElementHandler,
  addStyleToElem,
  getStyleFromElem,
} from '../utils/_base';

type slideshowType = {
  selector: string;
  slideTo: string | number;
  onComplete?: () => void;
};

export default class Slideshow {
  selector: string;

  itemSelector: string;

  indicatorSelector: string;

  indicatorExist: boolean;

  isAutoSlide: boolean;

  autoSlideDuration: number;

  autoSlideTimer: NodeJS.Timer | null;

  activeClass: string;

  animationClass: string;

  animationDuration: number;

  domElement: HTMLElement;

  domIndicatorElement: NodeListOf<HTMLElement>;

  slideIndex: number;

  slideIndexTotal: number;

  constructor() {
    this.selector = '';
    this.itemSelector = '.slideshow_item';
    this.indicatorSelector = '.slideshow_indicators span[data-slideshow]';
    this.indicatorExist = false;
    this.isAutoSlide = false;
    this.autoSlideDuration = 3000;
    this.autoSlideTimer = null;
    this.activeClass = 'active';
    this.animationClass = 'slide';
    this.animationDuration = 200;
    this.domElement = getDOMElementHandler('body');
    this.domIndicatorElement = getAllDOMElementHandler('body');
    this.slideIndex = 1;
    this.slideIndexTotal = 1;
  }

  init(params: slideshowType): void {
    this.setUpParams(params);
    this.autoSlide(params.selector);
    this.stopAutoSlide(params.selector);
  }

  setUpParams(params: slideshowType): void {
    if (domElementExistHandler(params.selector)) {
      this.selector = params.selector;
      this.domElement = getDOMElementHandler(this.selector);

      // Get slideshow current index
      getAllDOMElementHandler(`${this.selector} ${this.itemSelector}`).forEach(
        (item, index) => {
          if (item.classList.contains(this.activeClass)) {
            this.slideIndex = index + 1;
          }
        },
      );

      // Properties
      switch (params.slideTo) {
        case 'next':
          this.slideIndex += 1;
          break;

        case 'prev':
          this.slideIndex -= 1;
          break;

        default:
          this.slideIndex = +params.slideTo;
          break;
      }

      this.slideIndexTotal = this.domElement.querySelectorAll(
        this.itemSelector,
      ).length;

      // Verify index
      switch (true) {
        case this.slideIndex > this.slideIndexTotal:
          this.slideIndex = 1;
          break;

        case this.slideIndex <= 0:
          this.slideIndex = this.slideIndexTotal;
          break;

        default:
          '';
      }

      // Indicator
      if (
        domElementExistHandler(`${this.selector} ${this.indicatorSelector}`)
      ) {
        this.indicatorExist = true;
        this.domIndicatorElement = getAllDOMElementHandler(
          `${this.selector} ${this.indicatorSelector}`,
        );
      }

      // Auto slide
      if (Object.keys(this.domElement.dataset).includes('autoSlide')) {
        this.isAutoSlide = true;
      }

      // Auto slide duration
      this.autoSlideDuration =
        +this.domElement.dataset.slideDuration! || this.autoSlideDuration;

      // slide animation
      this.animationClass =
        this.domElement.dataset.slideAnimation! || this.animationClass;
    } else {
      throw new Error(`DOM element doesn't have the ${params.selector} class`);
    }
  }

  closeOthers(): void {
    this.domElement.querySelectorAll(this.itemSelector).forEach((item) => {
      if (item.classList.contains(this.activeClass)) {
        if (this.animationClass === 'slide') {
          // Animate out
          const itemDetail = item.getBoundingClientRect();
          const nodePaddingTop = getStyleFromElem(
            item.parentNode as HTMLElement,
            'padding-top',
          );

          addStyleToElem(item as HTMLElement, {
            position: 'absolute',
            top: nodePaddingTop,
            width: `${itemDetail.width}px`,
            height: `${itemDetail.height}px`,
          });

          item.classList.add(`${this.animationClass}Out`, this.activeClass);
          setTimeout(() => {
            item.classList.remove(
              this.activeClass,
              this.animationClass,
              `${this.animationClass}Out`,
            );
            item.removeAttribute('style');
          }, this.animationDuration);
        } else {
          item.classList.remove(
            this.activeClass,
            this.animationClass,
            `${this.animationClass}Out`,
          );
        }
      }
    });

    if (this.indicatorExist) {
      this.domIndicatorElement.forEach((item) => {
        item.classList.remove(this.activeClass);
      });
    }
  }

  slideTo(params: slideshowType, init = true): void {
    init ? this.setUpParams(params) : '';

    // close other
    this.closeOthers();

    // show slider
    this.domElement
      .querySelectorAll(this.itemSelector)
      [this.slideIndex - 1].classList.add(
        this.activeClass,
        this.animationClass,
      );

    if (this.indicatorExist && this.domIndicatorElement[this.slideIndex - 1]) {
      this.domIndicatorElement[this.slideIndex - 1].classList.add(
        this.activeClass,
      );
    }
  }

  autoSlide(selector: string): void {
    this.autoSlideTimer = setInterval(() => {
      this.slideTo({
        selector,
        slideTo: this.slideIndex,
      });
      this.slideIndex += 1;
    }, this.autoSlideDuration);
  }

  stopAutoSlide(selector: string): void {
    this.domElement.addEventListener('mouseover', () => {
      clearInterval(this.autoSlideTimer!);
      this.autoSlideTimer = null;
    });

    this.domElement.addEventListener('mouseout', () => {
      this.autoSlide(selector);
    });
  }
}
