export const Device = {
  isMobile: () => {
    return /(Android|iPhone|iPod|iPad)/i.test(navigator.userAgent);
  },
}

export const Calc = {
  randomInRange: (min, max) => {
  	return Math.random() * (max - min) + min;
  }
}
