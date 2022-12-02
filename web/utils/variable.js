export const getSassVariable = (opt) => {
  return fetch('/csx-configs.json')
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      throw new Error('[Error]: Loading css variables');
    })
}