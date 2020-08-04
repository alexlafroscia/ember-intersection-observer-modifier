import { modifier } from "ember-modifier";

/**
 * @param {HTMLElement} element
 * @param {[IntersectionObserverCallback, Partial<IntersectionObserverInit>]} positionalParams
 * @param {Partial<IntersectionObserverInit>} hashOptions
 */
function observeIntersection(element, [callback, optionsObject], hashOptions) {
  const options = { ...optionsObject, ...hashOptions };

  const observer = new IntersectionObserver(callback, options);
  observer.observe(element);

  return function cleanupObserver() {
    observer.disconnect();
  };
}

export default modifier(observeIntersection);
