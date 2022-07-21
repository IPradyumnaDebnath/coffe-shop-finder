/**
* custom hook to get debounced value
* @params
* func: callback to be debounces
* wait: delay in ms
* @returns debounced function
*/
export default function debounce(func, wait) {
  let timeout;
  return function () {
    const context = this;
    const args = arguments;
    const later = function () {
      timeout = null;
      func.apply(context, args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}
