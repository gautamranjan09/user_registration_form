export function debounce(func, wait) {
    let timeout;
    
    return function executedFunction(...args) {
      const context = this;
      
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        func.apply(context, args);
      }, wait);
    };
  }