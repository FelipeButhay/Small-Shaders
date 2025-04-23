#version 330

uniform vec2 u_resolution;
uniform float u_time;

vec3 rainbowGen(float h) {
    vec3 color = vec3(0.0);

    color.x = clamp( abs(h*6.0 - 3.0) - 1.0, 0.0, 1.0); // red
    color.y = clamp(-abs(h*6.0 - 2.0) + 2.0, 0.0, 1.0); // green
    color.z = clamp(-abs(h*6.0 - 4.0) + 2.0, 0.0, 1.0); // blue

    return color;
}

void main() {
    vec2 uv = (gl_FragCoord.xy * 2.0 - u_resolution.xy) / u_resolution.y;
    uv *= 0.7;

    vec3 red = vec3(1., 0., 0.);
    vec3 col = vec3(0.2, 0.5, 1.);
    
    float d;
    for (float i = 0.; i < 6.; i += 1.0) {
        d = length(uv);
        uv.x = fract(uv.x -0.5)*1.6 -0.8;
        uv.y = fract(uv.y -0.5)*1.6 -0.8;
        d = sin(d*8. + u_time)/8.;
        d = 1. / (abs(d)*180.*(i*0.1 + 0.6));
        d = pow(d, 1.2);

        gl_FragColor += vec4(rainbowGen(mod((i*10.+1.)*u_time*0.01, 1.))*d, 1.0);
    }
    //gl_FragColor = vec4(col, 1.0) ;
}

//    gl_FragColor = vec4(col.x, col.yz*step(0.0, sdHeart(vec2(nuv.x, nuv.y +0.5))), 1.0) ;
