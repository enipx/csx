import { domValueHandler, togglePasswordVisibilityHandler } from './_others';
import {
  domElementExistHandler,
  getAllDOMElementHandler,
  getDOMElementHandler,
  windowExist,
} from '../utils/_base';
import Accordion from './_accordion';
import Alert from './_alert';
import Dropdown from './_dropdown';
import Hamburger from './_hamburger';
import Modal from './_modal';
import Mode from './_mode';
import Slideshow from './_slideshow';
import Tabs from './_tabs';

// eslint-disable-next-line import/no-mutable-exports
let allcsxComponents: any;
let csxComponentsDefaults: any;

if (windowExist()) {
  allcsxComponents = {
    accordion: new Accordion(),
    alert: new Alert(),
    dropdown: new Dropdown(),
    hamburger: new Hamburger(),
    modal: new Modal(),
    mode: new Mode(),
    slideshow: new Slideshow(),
    tabs: new Tabs(),
    // Addition Helpers Handler
    togglePasswordVisibility: togglePasswordVisibilityHandler,
    getInputVal: domValueHandler.input.get,
    getInputValue: domValueHandler.input.get,
    setInputVal: domValueHandler.input.set,
    setInputValue: domValueHandler.input.set,
  };

  csxComponentsDefaults = {
    /*
      The selector holds all the component name identitier in the DOM for easy mutability accross csx.
    */
    selector: {
      modal: 'modal',
      alert: 'alert',
      dropdown: 'dropdown',
      accordion: 'accordion',
      hamburger: 'hamburger',
      tabs: 'tabs',
      slideshow: 'slideshow',
      mode: 'mode',
      password: 'password',
      fileInput: '.input-file input',
      otpInputs: {
        form: '.custom-otp-form',
        name: '.custom-otp',
        length: 5,
        inputCls: ['custom-otp-input', 'input'],
        type: 'text',
        typeSupported: ['text', 'number'],
        max: 1,
        placeholder: '•',
      },
    },
    attr: {
      dropdown: '*[data-toggle="dropdown"]',
      password: '*[data-toggle="password"]',
    },
  };
}

// ----- Overall Components declarations
export const initComponents = (): void => {
  if (windowExist()) {
    // ----- Alert
    allcsxComponents.alert.init();

    // ----- Accordion
    allcsxComponents.accordion.init();

    // ----- Listening to click events
    window.addEventListener('click', (evt: Event) => {
      const target = <HTMLElement>evt.target;
      // ----- Toggle: data-toggle *
      if (target.dataset.toggle) {
        const toggleTarget = target.dataset.toggle;
        // Check if toggle target is valid target
        if (
          Object.values(csxComponentsDefaults.selector).includes(toggleTarget)
        ) {
          // Modal
          if (toggleTarget === csxComponentsDefaults.selector.modal) {
            const targetModal = target.dataset.target
              ? getDOMElementHandler(target.dataset.target)
              : '';

            if (
              target.dataset.target &&
              targetModal &&
              targetModal.classList.contains(
                csxComponentsDefaults.selector.modal,
              )
            ) {
              // Toggle modal
              // const csxModal = new Modal();
              allcsxComponents.modal.toggle({
                selector: target.dataset.target,
              });
            }
          }

          // Dropdown
          if (toggleTarget === csxComponentsDefaults.selector.dropdown) {
            const selector = `#${target.getAttribute('id')}`;
            // const csxDropdown = new Dropdown();
            allcsxComponents.dropdown.toggle(selector);
          }

          // Accordion
          if (toggleTarget === csxComponentsDefaults.selector.accordion) {
            const targetAccordion = target.dataset.target
              ? getDOMElementHandler(target.dataset.target)
              : '';

            if (target.dataset.target && targetAccordion) {
              // Toggle accordion
              // const csxAccordion = new Accordion();
              allcsxComponents.accordion.toggle(target.dataset.target);
            }
          }

          // Hamburger
          if (toggleTarget === csxComponentsDefaults.selector.hamburger) {
            const targetHamburger = target.dataset.target
              ? target.dataset.target
              : `#${target.getAttribute('id')}`;

            if (targetHamburger) {
              // const csxHamburger = new Hamburger();
              allcsxComponents.hamburger.toggle({
                selector: targetHamburger,
              });
            }
          }

          // Tabs
          if (toggleTarget === csxComponentsDefaults.selector.tabs) {
            const targetTab = target.dataset.target;

            if (targetTab && domElementExistHandler(targetTab)) {
              // Toggle tab
              // const csxTabs = new Tabs();

              allcsxComponents.tabs.toggle({
                selector: targetTab,
                target,
              });
            }
          }

          // Mode
          if (toggleTarget === csxComponentsDefaults.selector.mode) {
            const targetMode = target.dataset.target;

            if (targetMode) {
              allcsxComponents.mode.load(targetMode);
            } else {
              allcsxComponents.mode.toggle();
            }
          }
        }

        // Password
        if (toggleTarget === csxComponentsDefaults.selector.password) {
          const targetPassword = target.dataset.target;

          if (targetPassword) {
            allcsxComponents.togglePasswordVisibility({
              selector: targetPassword,
            });
          }
        }
      }

      // ----- Dimiss: data-dismiss * specifically for modal
      if (target.dataset.dismiss) {
        // const csxModal = new Modal();
        allcsxComponents.modal.close({
          selector: `${target.dataset.dismiss}`,
        });
      }

      // ----- Slideshow
      if (target.dataset.slideshow) {
        const slideshowSelector = target.dataset.slideshow;
        const slideToPos = target.dataset.slideTo
          ? target.dataset.slideTo
          : 'next';
        // const csxSlideshow = new Slideshow();
        allcsxComponents.slideshow.slideTo({
          selector: slideshowSelector,
          slideTo: slideToPos,
        });
      }
    });

    // ----- Listening to hover events
    // dropdown, tooltip & popover
    if (domElementExistHandler(csxComponentsDefaults.attr.dropdown)) {
      getAllDOMElementHandler(csxComponentsDefaults.attr.dropdown).forEach(
        (dropdown) => {
          const target = <HTMLElement>dropdown.nextElementSibling;
          const { type, hoverReveal } = target.dataset;
          if (type === 'tooltip' || hoverReveal) {
            const id = dropdown.getAttribute('id')!;
            // const csxDropdown = new Dropdown();
            allcsxComponents.dropdown.hoverReveal(`#${id}`);
          }
        },
      );
    }

    // Password Visibility Hover
    if (domElementExistHandler(csxComponentsDefaults.attr.password)) {
      getAllDOMElementHandler(csxComponentsDefaults.attr.password).forEach(
        (password) => {
          const hover = password.dataset.reveal === 'hover';
          const targetPassword = password.dataset.target!;

          password.addEventListener('mouseenter', () => {
            if (hover) {
              allcsxComponents.togglePasswordVisibility({
                selector: targetPassword,
                state: 'password',
              });
            }
          });

          password.addEventListener('mouseleave', () => {
            if (hover) {
              allcsxComponents.togglePasswordVisibility({
                selector: targetPassword,
                state: 'text',
              });
            }
          });
        },
      );
    }

    // ----- Check if auto slide exist
    if (
      domElementExistHandler(`.${csxComponentsDefaults.selector.slideshow}`)
    ) {
      getAllDOMElementHandler(
        `.${csxComponentsDefaults.selector.slideshow}`,
      ).forEach((slideshow) => {
        const selector = `#${slideshow.getAttribute('id')}`;

        if (Object.keys(slideshow.dataset).includes('autoSlide')) {
          // const csxSlideshow = new Slideshow();
          allcsxComponents.slideshow.init({
            selector,
            slideTo: 'next',
          });
        }
      });
    }

    // ----- Custom file
    if (domElementExistHandler(csxComponentsDefaults.selector.fileInput)) {
      getAllDOMElementHandler(csxComponentsDefaults.selector.fileInput).forEach(
        (file) => {
          const fallBackName = 'No file choosen';
          const name = document.createElement('span');
          name.classList.add('input-file_name');
          const defaultName = file.getAttribute('data-default-name');

          name.innerHTML = defaultName || fallBackName;

          file.parentNode?.appendChild(name);

          file.addEventListener('change', (evt: Event) => {
            const { files } = evt.target as HTMLInputElement;

            if (files) {
              switch (true) {
                case files.length === 1:
                  name.innerHTML = files[0].name;
                  break;

                case files.length > 1:
                  name.innerHTML = `${files.length} files`;
                  break;

                default:
                  name.innerHTML = fallBackName;
              }
            }
          });
        },
      );
    }

    // ----- Custom Otp
    if (domElementExistHandler(csxComponentsDefaults.selector.otpInputs.name)) {
      const { otpInputs } = csxComponentsDefaults.selector;

      getAllDOMElementHandler(otpInputs.name).forEach((otpInput) => {
        const length = otpInput.dataset.length
          ? +otpInput.dataset.length
          : otpInputs.length;

        const defaultClassname = otpInput.dataset.inputStyle
          ? otpInput.dataset.inputStyle?.split(' ')
          : [];

        const defaultValueArr = otpInput.dataset.value
          ? otpInput.dataset.value.split('')
          : [];

        // check if otp doesn't have any child element
        if (otpInput.children.length === 0) {
          for (let i = 0; i < length; i += 1) {
            const input = document.createElement('input');
            input.classList.add(...otpInputs.inputCls);
            input.maxLength = otpInputs.max;
            input.placeholder =
              otpInput.dataset.placeholder || otpInputs.placeholder;
            input.type = otpInputs.typeSupported.includes(otpInput.dataset.type)
              ? otpInput.dataset.type
              : otpInputs.type;
            if (defaultClassname && defaultClassname.length > 0) {
              input.classList.add(...defaultClassname);
            }
            if (defaultValueArr.length > 0 && defaultValueArr[i]) {
              input.value = defaultValueArr[i];
            }
            otpInput.appendChild(input);
          }

          if (otpInput.dataset.focused) {
            const value = otpInput.dataset.focused;
            if (Number.isNaN(+value) || +value > otpInput.children.length) {
              (otpInput.children[0] as HTMLElement)?.focus();
            } else {
              (
                otpInput.children[+value > 0 ? +value - 1 : 0] as HTMLElement
              )?.focus();
            }
          }
        } else {
          // if otp inputs has child do something
          // ...
        }

        // manage input checks
        const otpChildInputs = otpInput.querySelectorAll(
          `.${otpInputs.inputCls[0]}`,
        );

        const getOtpInputValue = () => {
          const value: String[] = [];
          const valueArr: String[] = [];

          otpChildInputs.forEach((input) => {
            const val = (input as HTMLInputElement).value;
            valueArr.push(val);
            if (val) value.push(val);
          });

          otpInput.setAttribute('value', value.join(''));

          return {
            value: value.join(''),
            valueArr,
            isCompleted:
              valueArr.length > length - 1 && valueArr.every((val) => val),
          };
        };

        otpChildInputs.forEach((childInput, index) => {
          let prevIndex: number | undefined;
          let nextIndex: number | undefined;

          if (index === 0) {
            prevIndex = undefined;
            nextIndex = index + 1;
          } else if (index === otpChildInputs.length - 1) {
            nextIndex = undefined;
            prevIndex = index - 1;
          } else {
            nextIndex = index + 1;
            prevIndex = index - 1;
          }

          const eventHandler = (e: KeyboardEvent) => {
            if (e.key === 'Backspace' || e.keyCode === 8 || e.keyCode === 37) {
              if (
                (prevIndex || prevIndex === 0) &&
                !(otpChildInputs[prevIndex] as HTMLInputElement).value
              ) {
                (otpChildInputs[prevIndex] as HTMLInputElement).focus();
                (otpChildInputs[prevIndex] as HTMLInputElement).select();
              }
            } else {
              // eslint-disable-next-line no-lonely-if
              if (
                nextIndex &&
                !(otpChildInputs[nextIndex] as HTMLInputElement).value
              ) {
                (otpChildInputs[nextIndex] as HTMLInputElement).focus();
                (otpChildInputs[nextIndex] as HTMLInputElement).select();
              }
            }

            getOtpInputValue();
            if (getOtpInputValue().isCompleted) {
              const parent = otpInput.closest(otpInputs.form);
              if (parent && parent.hasAttribute('data-autoSubmit')) {
                (parent as HTMLFormElement).submit();
              }
              if (otpInput.dataset.oncomplete) {
                // eslint-disable-next-line no-eval
                eval(otpInput.dataset?.oncomplete);
              }
            }
          };

          childInput.addEventListener('keyup', (e) => eventHandler(<any>e));
        });
      });
    }

    // Mode
    allcsxComponents.mode.init({});
  }
};

export default allcsxComponents;
