precision mediump float;

uniform vec2 u_resolution;
uniform float u_time;

vec2 mult_complx(vec2 z1, vec2 z2) {
    return vec2(z1.x*z2.x - z1.y*z2.y, z1.x*z2.y + z1.y*z2.x);
}

void main() {
    vec2 uv = (gl_FragCoord.xy * 2.0 - u_resolution.xy) / u_resolution.y;
    uv.x -= 0.5;

    vec2 z = vec2(0., 0.);
    vec2 c = uv;

    gl_FragColor = vec4(0. ,0., 0., 1.0);

    const float iter = 400.;

    for (float i = 0.; i < iter; i++) {
        z = mult_complx(z, z) + c;

        if (length(z) > 2.) {
            gl_FragColor = vec4(1. - 1. / (i*i/iter +1.), 0., 0., 1.);
            break;
        }
    }
}
