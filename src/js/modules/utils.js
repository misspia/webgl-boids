export const Device = {
  isMobile: () => {
    return /(Android|iPhone|iPod|iPad)/i.test(navigator.userAgent);
  },
}

export const Calc = {
  maxNode: 255,
  randomInRange: (min, max) => {
  	return Math.random() * (max - min) + min;
  },
  toRadians: (degrees) => {
    return degrees * Math.PI / 180;
  },
  circleCoord: (centerCoord, radius, angle) => {
    const radians = Calc.toRadians(angle);
    return {
      x: centerCoord.x + radius * Math.cos(-radians),
      y: centerCoord.y,
      z: centerCoord.z  + radius * Math.sin(-radians),
    };
  },
  circumference: (radius) => {
    return 2 * Math.PI * radius;
  }
}
