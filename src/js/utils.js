const Utils = {
  isMobile: () => {
    return /(Android|iPhone|iPod|iPad)/i.test(navigator.userAgent);
  },
  
}

export default Utils;
