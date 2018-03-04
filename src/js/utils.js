const Utils = {
  isMobile: () => {
    return /(Android|iPhone|iPod|iPad)/i.test(navigator.userAgent);
  },
  randomInRange: (min, max) => { // min and max inclusive
  	return return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  
}

export default Utils;


