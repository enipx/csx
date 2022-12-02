/* eslint-disable no-unused-expressions */
import {
  getDOMElementHandler,
  setCookie,
  getCookie,
  getKeyboardClickHandler,
} from '../utils/_base';

type modeType = {
  save?: boolean;
  default?: string; // mode by default
  keyboardShortcut?: string;
  disableKeyboardShortcut?: boolean;
};

class Mode {
  allMode: string[];

  currentMode: string;

  domElement: HTMLElement;

  saveToStorage: boolean;

  systemPreferredMode: boolean;

  storageName: string;

  keyboardShortcut: string;

  disableKeyboardShortcut: boolean;

  constructor() {
    this.allMode = ['light', 'dark'];
    this.currentMode = 'light';
    this.domElement = getDOMElementHandler('body');
    this.saveToStorage = true;
    this.storageName = 'csxPreferredMode';
    this.keyboardShortcut = 'shift+d';
    this.disableKeyboardShortcut = false;
    this.systemPreferredMode = true;
  }

  setupParams(params: modeType): void {
    // Check if default mode is set
    if (params.default) {
      this.currentMode = params.default;
      setCookie({
        key: this.storageName,
        value: this.currentMode,
        days: 365,
      });
    }

    if (params.keyboardShortcut) {
      this.keyboardShortcut = params.keyboardShortcut;
    }
    this.setKeboardShortcut(this.keyboardShortcut);

    if (params.save !== undefined) {
      this.saveToStorage = params.save;
    }
  }

  save(mode: string): void {
    this.currentMode = mode;
    setCookie({
      key: this.storageName,
      value: this.currentMode,
      days: 365,
    });
  }

  load(mode: string): void {
    this.currentMode = mode;
    this.domElement.setAttribute('data-mode', mode);
    this.saveToStorage ? this.save(mode) : '';
  }

  getMode(): string {
    return this.currentMode;
  }

  toggle(): void {
    const current = this.allMode.indexOf(this.currentMode);
    const index = current === this.allMode.length - 1 ? 0 : current + 1;
    this.load(this.allMode[index]);
  }

  setKeboardShortcut(key: string): void {
    let shortcut: string;
    let specialKey: string;

    switch (true) {
      case key.split('+').length > 1:
        [specialKey, shortcut] = key.split('+');
        break;

      case key.split('+').length === 1:
        specialKey = '';
        shortcut = key;
        break;

      default:
        '';
    }

    if (!this.disableKeyboardShortcut) {
      document.addEventListener('keydown', (evt) => {
        if (specialKey === 'shift' && evt.shiftKey) {
          // ...
          if (
            getKeyboardClickHandler(evt).key.toLowerCase() ===
            shortcut.toLowerCase()
          ) {
            this.toggle();
          }
        }

        if (getKeyboardClickHandler(evt).key === shortcut) {
          // check special key event
          const specialKeyVal: any = `${specialKey}Key`;
          if (specialKey && !getKeyboardClickHandler(evt)[specialKeyVal]) {
            return false;
          }
          this.toggle();
        }
        return true;
      });
    }
  }

  init(params: modeType): void {
    this.setupParams(params);

    if (getCookie(this.storageName)) {
      this.load(getCookie(this.storageName));
      return;
    }

    if (this.systemPreferredMode) {
      this.currentMode = window.matchMedia('(prefers-color-scheme: dark)')
        .matches
        ? 'dark'
        : 'light';
      this.load(this.currentMode);
    }
  }
}

export default Mode;
