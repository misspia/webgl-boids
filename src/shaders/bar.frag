precision highp float;

uniform mat4 projectionMatrix;
uniform mat4 modelViewMatrix;

uniform vec2 uResolution;

varying vec4 vPosition;

const float fdelta = 2.0;
const float fhalf = 1.0;

vec4 toonIllumination(float lum) {
  vec4 color = vec4(0.9, 0.9, 1.0, 1.0);
  if(lum < 1.0) {
    if(mod(gl_FragCoord.x + gl_FragCoord.y, fdelta) == 0.0) {
      color = vec4(1.0, 0.7, 0.7, 1.0);
    }
  }
  if(lum < 0.75) {
    if(mod(gl_FragCoord.x - gl_FragCoord.y, fdelta) == 0.0) {
      color = vec4(1.0, 0.5, 0.5, 1.0);
    }
  }
  if(lum < 0.5) {
    if(mod(gl_FragCoord.x + gl_FragCoord.y - fhalf, fdelta) == 0.0) {
      color = vec4(1.0, 0.3, 0.3, 1.0);
    }
  }
  if(lum < 0.25) {
    if(mod(gl_FragCoord.x - gl_FragCoord.y - fhalf, fdelta) == 0.0) {
      color = vec4(1.0, 0.0, 0.0, 1.0);
    }

  }
  return color;
}

void main() {
  vec2 uv = gl_FragCoord.xy / uResolution;

  float lum = length(vPosition.xyz);
  vec4 color = toonIllumination(lum);

  gl_FragColor = color;
}
