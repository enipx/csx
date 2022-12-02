/* eslint-disable no-param-reassign */
/* eslint-disable no-undef */

// ----- Check if window exist
export const windowExist = () => typeof window === 'object';

// ----- Return DOM Element
export const getDOMElementHandler = (selector: string): HTMLElement => {
  if (windowExist() && document.querySelector(selector)) {
    return document.querySelector(selector)!;
  }
  throw new Error(`DOM: element with the selector of ${selector} not found`);
};

// ----- Return All DOM Elements
export const getAllDOMElementHandler = (
  selector: string,
): NodeListOf<HTMLElement> => {
  if (windowExist() && document.querySelectorAll(selector)) {
    return document.querySelectorAll<HTMLElement>(selector);
  }
  throw new Error(`DOM: element with the selector of ${selector} not found`);
};

// ----- Return All DOM Elements
export const domElementExistHandler = (selector: string) =>
  getAllDOMElementHandler(selector).length > 0;

// ----- FadeOut DOM Elements
type fadeOutHandlerType = {
  domElement: HTMLElement;
  duration: number;
};

export const fadeOutHandler = (params: fadeOutHandlerType): void => {
  params.domElement.style.transition = `${params.duration}ms ease`;
  params.domElement.style.opacity = '0';
  setTimeout(() => {
    params.domElement.remove();
  }, params.duration);
};

// ----- Keyboard Click
export const getKeyboardClickHandler = (evt: KeyboardEvent) => {
  const res: any = {
    key: evt.key,
    ctrlKey: evt.ctrlKey,
    shiftKey: evt.shiftKey,
    altKey: evt.altKey,
  };

  return res;
};

// ----- Generate random value
export const generateRandomValue = (length: number): string =>
  Math.random().toString(length).slice(2);

// ----- Set DOM Element Style
export const addStyleToElem = (
  elem: HTMLElement,
  styles: { [key: string]: string },
) => {
  Object.entries(styles).forEach(([property, value]) => {
    elem.style[property as any] = value;
  });
};

// ----- Get DOM Element Style
export const getStyleFromElem = (elem: HTMLElement, property: string) => {
  const style = window.getComputedStyle(elem, null);
  return style.getPropertyValue(property);
};

// ----- Set Cookie
type setCookieType = {
  key: string;
  value: string;
  days: number;
  path?: string;
};
export const setCookie = (params: setCookieType) => {
  if (windowExist()) {
    let expires = '';
    const path = params.path ? params.path : '/';

    if (params.days) {
      const date = new Date();
      date.setTime(date.getTime() + params.days * 24 * 60 * 60 * 1000);
      expires = `; expires=${date.toUTCString()}`;
    }
    document.cookie = `${params.key} = ${params.value}; expires = ${expires}; path = ${path}`;
  }
};

// ----- Get Cookie
export const getCookie = (key: string) => {
  if (windowExist()) {
    const name = `${key}=`;
    const decodeCookie = decodeURIComponent(document.cookie);
    const cookieArr = decodeCookie.split(';');

    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < cookieArr.length; i++) {
      let arr = cookieArr[i];

      while (arr.charAt(0) === ' ') {
        arr = arr.substring(1);
      }

      if (arr.indexOf(name) === 0) {
        return arr.substring(name.length, arr.length);
      }
    }
    return '';
  }
  return '';
};

// ----- Delete Cookie
export const deleteCookie = (key: string) =>
  setCookie({
    key,
    value: '',
    days: -1,
  });

// ----- Set Local Storage
export const setLocalStorageHandler = (key: string, value: string) =>
  windowExist() ? localStorage.setItem(key, value) : '';

// ----- Get Local Storage
export const getLocalStorageHandler = (key: string) =>
  windowExist() ? localStorage.getItem(key) : '';
