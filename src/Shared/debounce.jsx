// debounce function
// export function debounce (func, delay) {
//   let timeoutId

//   return function (...args) {
//     clearTimeout(timeoutId)
//     timeoutId = setTimeout(() => {
//       func(...args)
//     }, delay)
//   }
// }

export function debounce(func, delay) {
  let timer; 
  return function (...args) {
    clearTimeout(timer); 
    timer = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  };
}



