import { getDOMElementHandler } from '../utils/_base';

type togglePasswordType = {
  selector: string;
  state?: string;
};

export const togglePasswordVisibilityHandler = (params: togglePasswordType) => {
  const domElement = getDOMElementHandler(params.selector) as HTMLInputElement;
  const state = params.state === undefined ? domElement.type : params.state;

  if (domElement) {
    switch (state) {
      case 'password':
        domElement.type = 'text';
        break;

      case 'text':
        domElement.type = 'password';
        break;

      default:
        domElement.type = 'password';
    }
  } else {
    throw new Error(
      `DOM element with the selector of ${params.selector} not found`,
    );
  }
};

type inputSet = {
  selector: string;
  value: string;
};

type inputGet = {
  selector: string;
  view: string;
};

export const domValueHandler = {
  // Input
  input: {
    get: (params: inputGet) => {
      const domElement = getDOMElementHandler(
        params.selector,
      ) as HTMLInputElement;
      if (domElement) {
        const checkInput = ['checkbox'];
        const view = getDOMElementHandler(params.view);
        let value: string | boolean = checkInput.includes(domElement.type)
          ? domElement.checked
          : domElement.value;
        view.innerText = view.dataset.value!;
        const events = ['keyup', 'change'];

        events.forEach((evt) => {
          domElement.addEventListener(evt, () => {
            value = checkInput.includes(domElement.type)
              ? `${domElement.checked}`
              : domElement.value;

            if (view) {
              if (value.length >= 1) {
                view.innerText = value;
              } else {
                view.innerText = view.dataset.value!;
              }
            }
          });
        });

        // domElement.addEventListener('keyup', () => {
        //   value = domElement.value;
        //   if (view) {
        //     if (value.length >= 1) {
        //       view.innerText = value;
        //     } else {
        //       view.innerText = view.dataset.value!;
        //     }
        //   }
        // });
        return value;
      }
      throw new Error(
        `DOM element with the selector of ${params.selector} not found`,
      );
    },

    set: (params: inputSet) => {
      const domElement = getDOMElementHandler(
        params.selector,
      ) as HTMLInputElement;
      if (domElement) {
        domElement.value = params.value;
        return true;
      }
      throw new Error(
        `DOM element with the selector of ${params.selector} not found`,
      );
    },
  },
};
