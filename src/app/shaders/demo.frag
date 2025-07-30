precision mediump float;

varying vec3 vUv;

void main() {
    vec3 color = vec3(vUv, 0.0);
    gl_FragColor = vec4(color, 1.);
}