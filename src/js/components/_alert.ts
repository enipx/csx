/* eslint-disable no-unused-expressions */
/* eslint-disable no-undef */
import {
  fadeOutHandler,
  generateRandomValue,
  getAllDOMElementHandler,
  getDOMElementHandler,
  domElementExistHandler,
} from '../utils/_base';

type alertType = {
  selector: string;
  onComplete?: () => void;
};

type alertMockupType = {
  title: string;
  description?: string;
  icon?: boolean;
  dismissIcon?: boolean;
  status?: 'info' | 'success' | 'warning' | 'danger';
  variant?: 'solid' | 'default';
  toast?: boolean;
};

type toastAlertType = {
  title: string;
  description?: string;
  icon?: boolean;
  dismissIcon?: boolean;
  status?: 'info' | 'success' | 'warning' | 'danger';
  variant?: 'solid' | 'default';
  position?:
    | 'top'
    | 'top-left'
    | 'top-right'
    | 'bottom'
    | 'bottom-left'
    | 'bottom-right';
  duration?: number;
};

type createAlertType = {
  title: string;
  description?: string;
  icon?: boolean;
  dismissIcon?: boolean;
  status?: 'info' | 'success' | 'warning' | 'danger';
  variant?: 'solid' | 'default';
  appendTo: string;
  duration?: number;
};

type alertIconsType = {
  info: string;
  success: string;
  warning: string;
  danger: string;
};
export default class Alert {
  domAllAlertDismiss: NodeListOf<HTMLElement>;

  domCurrentDismiss: HTMLElement;

  domAlert: HTMLElement;

  domSelector: string;

  domToastParentSelector: string;

  domHide: string;

  duration: number;

  toastDuration: number;

  alertIcons: alertIconsType;

  constructor() {
    this.domAllAlertDismiss = getAllDOMElementHandler('body');
    this.domCurrentDismiss = getDOMElementHandler('body');
    this.domAlert = getDOMElementHandler('body');
    this.domSelector = '.alert';
    this.domToastParentSelector = '.toast-alert-container';
    this.domHide = 'data-hide';
    this.duration = 400;
    this.toastDuration = 5000;
    this.alertIcons = {
      info: `
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18"><path fill-rule="evenodd" d="M1.5 9C1.5 4.86 4.86 1.5 9 1.5a7.5 7.5 0 1 1 0 15c-4.14 0-7.5-3.359-7.5-7.5zm7.502-2.114c-.56 0-1.006-.457-1.006-1.006s.446-.994.994-.994c.56 0 1.006.446 1.006.994s-.446 1.006-.994 1.006zM8.246 8.64a.76.76 0 0 1 .754-.754c.411 0 .746.344.746.754v3.789c0 .412-.334.746-.746.746s-.754-.333-.754-.746V8.64z" fill="currentColor"/></svg>
      `,
      success: `
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18"><path fill-rule="evenodd" d="M1.5 9C1.5 4.86 4.86 1.5 9 1.5a7.5 7.5 0 1 1 0 15c-4.14 0-7.5-3.359-7.5-7.5zm7.072 2.056l3.562-3.562a.66.66 0 0 0 0-.93.66.66 0 0 0-.93 0L8.108 9.661 6.795 8.349a.66.66 0 0 0-.93 0 .66.66 0 0 0 0 .93l1.785 1.777a.64.64 0 0 0 .457.188c.173 0 .338-.06.465-.187z" fill="currentColor"/></svg>
      `,
      warning: `
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18"><path fill-rule="evenodd" d="M10.858 3.332l5.452 9.461c.12.282.172.512.188.751a2.07 2.07 0 0 1-.547 1.516c-.383.415-.9.661-1.462.69H3.509a2.36 2.36 0 0 1-.682-.149c-1.087-.438-1.612-1.672-1.17-2.742l5.489-9.535c.187-.335.472-.624.825-.81a2.14 2.14 0 0 1 2.887.817zM9.651 9.567c0 .357-.292.655-.652.655s-.66-.298-.66-.655V7.464c0-.357.3-.647.66-.647a.65.65 0 0 1 .652.647v2.102zm-.652 3.196c-.36 0-.66-.298-.66-.654s.3-.655.66-.655a.65.65 0 0 1 .652.647.66.66 0 0 1-.652.662z" fill="currentColor"/></svg>
      `,
      danger: `
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18"><path fill-rule="evenodd" d="M1.5 9C1.5 4.86 4.86 1.5 9 1.5a7.5 7.5 0 1 1 0 15c-4.14 0-7.5-3.359-7.5-7.5zm6.746-3.36a.76.76 0 0 1 .754-.754c.411 0 .746.344.746.754v3.789c0 .412-.334.746-.746.746s-.754-.333-.754-.746V5.64zm.756 7.534c-.56 0-1.006-.457-1.006-1.006s.446-.994.994-.994c.56 0 1.006.446 1.006.994s-.446 1.006-.994 1.006z" fill="currentColor"/></svg>
      `,
    };
  }

  initParams(selector: string): void {
    this.domSelector = selector;
    this.domCurrentDismiss = getDOMElementHandler(selector);
    this.domAllAlertDismiss = getAllDOMElementHandler(
      `${this.domSelector}_dismiss`,
    );
  }

  show(params: alertType): void {
    this.initParams(params.selector);
    this.domCurrentDismiss.removeAttribute(this.domHide);
    // Run onComplete function if set
    params.onComplete?.();
  }

  dispose(elem: HTMLElement): void {
    switch (true) {
      case elem.parentElement?.classList.contains('alert'):
        this.domAlert = <HTMLElement>elem.parentElement;
        break;

      case elem.classList.contains('alert'):
        this.domAlert = <HTMLElement>elem;
        break;

      default:
        this.domAlert = elem;
    }

    if (elem.parentElement?.classList.contains('alert')) {
      this.domAlert = <HTMLElement>elem.parentElement;
    } else {
      this.domAlert = <HTMLElement>elem;
    }
    fadeOutHandler({
      domElement: this.domAlert,
      duration: this.duration,
    });
  }

  hide(params: alertType): void {
    this.initParams(params.selector);
    this.domCurrentDismiss.setAttribute(this.domHide, 'true');
    // Run onComplete function if set
    params.onComplete?.();
  }

  init(): void {
    // Setup Dismiss
    if (getAllDOMElementHandler(this.domSelector).length > 0) {
      this.initParams(this.domSelector);
      this.domAllAlertDismiss.forEach((elem) => {
        elem.addEventListener('click', () => {
          this.dispose(elem);
        });
      });
    }
  }

  // eslint-disable-next-line class-methods-use-this
  alertMockup(params: alertMockupType) {
    const status = params.status ? `alert-${params.status}` : '';
    const variant = params.variant === 'solid' ? 'data-solid' : '';
    const icon = params.icon === undefined ? true : params.icon;
    const id = `alert-${generateRandomValue(20)}`;
    const toast = params.toast ? 'data-toast' : '';

    const mockup = `
      <div class="alert fade ${status}" id="${id}" ${variant} ${toast}>
        ${
          icon
            ? `
              <div class="alert_icon">
                ${
                  params.status
                    ? this.alertIcons[params.status]
                    : this.alertIcons.info
                }
              </div>
            `
            : ''
        }
        <div class="alert_content">
          ${
            params.title
              ? `
              <p>${params.title}</p>
            `
              : ''
          }
          ${
            params.description
              ? `
              <p class="alert_content_description">${params.description}</p>
            `
              : ''
          }
        </div>
        ${
          params.dismissIcon
            ? `
            <div class="alert_dismiss">
              <svg xmlns="http://www.w3.org/2000/svg" width="9" height="9" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" xmlns:v="https://vecta.io/nano"><path d="M7.997 1.002L1.003 7.996"/><path d="M8 8.001L1 1"/></svg>
            </div>
          `
            : ''
        }
        
      </div>
    `;

    return {
      mockup,
      id,
    };
  }

  createAlert(params: createAlertType): void {
    // Generate mockup
    const alertMockup = this.alertMockup({
      title: params.title,
      description: params.description,
      icon: params.icon,
      dismissIcon: params.dismissIcon,
      status: params.status,
      variant: params.variant,
    });

    if (params.appendTo && domElementExistHandler(params.appendTo)) {
      // ...
      getDOMElementHandler(params.appendTo).insertAdjacentHTML(
        'beforeend',
        alertMockup.mockup,
      );

      if (params.duration) {
        setTimeout(() => {
          this.dispose(getDOMElementHandler(`#${alertMockup.id}`));
        }, params.duration);
      }
    } else {
      throw new Error(
        'DOM element to append alert to does not exist or No value specify in appenTo key',
      );
    }

    this.init();
  }

  createToast(params: toastAlertType): void {
    // Position
    params.position
      ? getDOMElementHandler(this.domToastParentSelector).setAttribute(
          'data-pos',
          params.position,
        )
      : '';

    // Generate mockup
    const alertMockup = this.alertMockup({
      ...params,
      toast: true,
    });

    getDOMElementHandler(this.domToastParentSelector).insertAdjacentHTML(
      'beforeend',
      alertMockup.mockup,
    );

    const duration = params.duration ? params.duration : this.toastDuration;
    setTimeout(() => {
      this.dispose(getDOMElementHandler(`#${alertMockup.id}`));
    }, duration);
  }
}
