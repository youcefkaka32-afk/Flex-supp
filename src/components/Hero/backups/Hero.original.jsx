import { useEffect, useRef, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { gsap } from 'gsap'
import { CustomEase } from 'gsap/CustomEase'
import * as THREE from 'three'
import './Hero.css'
import { slides } from '../../data/siteData'
import CartIcon from '../Cart/CartIcon'
import TextAnimate from '../../registry/magicui/text-animate'

gsap.registerPlugin(CustomEase)
CustomEase.create('heroEase', '0.22, 1, 0.36, 1')

function isWebGLSupported() {
  try {
    const c = document.createElement('canvas')
    return !!(window.WebGLRenderingContext && (c.getContext('webgl') || c.getContext('experimental-webgl')))
  } catch {
    return false
  }
}

const vertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position, 1.0);
  }
`

const fragmentShader = `
  precision highp float;
  uniform float uTime;
  uniform float uProgress;
  uniform float uGlitch;
  uniform float uImageScale;
  uniform vec2 uImageOffset;
  uniform vec2 uResolution;
  uniform sampler2D uPrevTex;
  uniform sampler2D uNextTex;
  uniform vec2 uPrevTexSize;
  uniform vec2 uNextTexSize;
  varying vec2 vUv;

  vec3 permute(vec3 x){ return mod(((x * 34.0) + 1.0) * x, 289.0); }
  float snoise(vec2 v) {
    const vec4 C = vec4(0.211324865405187, 0.366025403784439, -0.577350269189626, 0.024390243902439);
    vec2 i = floor(v + dot(v, C.yy));
    vec2 x0 = v - i + dot(i, C.xx);
    vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
    vec4 x12 = x0.xyxy + C.xxzz;
    x12.xy -= i1;
    i = mod(i, 289.0);
    vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0)) + i.x + vec3(0.0, i1.x, 1.0));
    vec3 m = max(0.5 - vec3(dot(x0, x0), dot(x12.xy, x12.xy), dot(x12.zw, x12.zw)), 0.0);
    m = m * m;
    m = m * m;
    vec3 x = 2.0 * fract(p * C.www) - 1.0;
    vec3 h = abs(x) - 0.5;
    vec3 a0 = x - floor(x + 0.5);
    vec3 g;
    g.x = a0.x * x0.x + h.x * x0.y;
    g.yz = a0.yz * x12.xz + h.yz * x12.yw;
    return 130.0 * dot(m, g);
  }

  vec2 coverUv(vec2 uv, vec2 texSize, vec2 resolution) {
    float texRatio = texSize.x / texSize.y;
    float resRatio = resolution.x / resolution.y;
    vec2 scale = resRatio > texRatio ? vec2(resRatio / texRatio, 1.0) : vec2(1.0, texRatio / resRatio);
    return (uv - 0.5) * scale + 0.5;
  }

  vec4 sampleLayer(sampler2D tex, vec2 texSize, vec2 uv, float direction, float glitch) {
    float row = floor(uv.y * 28.0);
    float rowNoise = fract(sin(row * 123.456 + floor(uTime * 32.0)) * 43758.5453);
    float rowShift = 0.0;
    if (glitch > 0.0 && rowNoise > 0.85 - glitch * 0.12) {
      rowShift = (rowNoise - 0.5) * 0.045 * glitch * direction;
    }
    float wave = snoise(vec2(uv.y * 6.0, uTime * 0.8)) * 0.004 * glitch * direction;
    vec2 sampleUv = coverUv(uv, texSize, uResolution);
    sampleUv = (sampleUv - 0.5) * uImageScale + 0.5;
    sampleUv += uImageOffset;
    sampleUv.x += rowShift + wave;
    return texture2D(tex, sampleUv);
  }

  void main() {
    vec2 uv = vUv;
    float progress = smoothstep(0.0, 1.0, uProgress);
    float transitionWarp = sin(progress * 3.14159265);
    float drift = transitionWarp * 0.012;
    vec2 noiseOffset = vec2(
      snoise(uv * 2.8 + vec2(uTime * 0.15, progress * 1.5)),
      snoise(uv * 2.8 + vec2(progress * 1.5, uTime * 0.15 + 8.0))
    ) * (0.07 * transitionWarp);

    vec4 prevColor = sampleLayer(uPrevTex, uPrevTexSize, uv + noiseOffset, 1.0, uGlitch);
    vec4 nextColor = sampleLayer(uNextTex, uNextTexSize, uv - noiseOffset, -1.0, uGlitch);
    float transition = clamp(progress + snoise(uv * 3.0 + vec2(0.0, progress * 2.0)) * 0.10 * transitionWarp, 0.0, 1.0);
    vec3 color = mix(prevColor.rgb, nextColor.rgb, transition);

    color += vec3(0.03, 0.03, 0.04) * transitionWarp;
    color += vec3(drift);
    color.r += snoise(uv * 4.0 + uTime * 0.45) * 0.015 * transitionWarp;
    color.g += snoise(uv * 4.3 + uTime * 0.4 + 2.0) * 0.010 * transitionWarp;
    color.b += snoise(uv * 4.6 + uTime * 0.35 + 4.0) * 0.015 * transitionWarp;

    gl_FragColor = vec4(color, 1.0);
  }
`

export default function Hero() {
  // ... content identical to current Hero.jsx (omitted for brevity)
}
