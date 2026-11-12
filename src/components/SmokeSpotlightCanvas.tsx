"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";

/**
 * SmokeSpotlightCanvas: Nền khói xám & Spotlight tĩnh chất lượng cao (Static 1-Frame WebGL Render)
 * Vẽ một lần duy nhất khi tải trang và khi đổi kích thước màn hình (preserveDrawingBuffer: true),
 * giữ nguyên chất lượng làn khói và luồng sáng đẹp nhất mà tiêu thụ 0% GPU/CPU khi cuộn trang.
 */
export default function SmokeSpotlightCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [hasWebGL, setHasWebGL] = useState<boolean>(true);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl =
      canvas.getContext("webgl", {
        preserveDrawingBuffer: true,
        powerPreference: "low-power",
        alpha: false,
        antialias: false,
      }) ||
      (canvas.getContext("experimental-webgl", {
        preserveDrawingBuffer: true,
      }) as WebGLRenderingContext | null);

    if (!gl) {
      setHasWebGL(false);
      return;
    }

    // Vertex Shader
    const vsSource = `
      attribute vec2 position;
      void main() {
        gl_Position = vec4(position, 0.0, 1.0);
      }
    `;

    // Fragment Shader: Khói xám lụa sang trọng + Luồng Spotlight đỉnh (tích hợp sẵn contrast/brightness)
    const fsSource = `
      precision highp float;
      uniform float u_time;
      uniform vec2 u_resolution;

      float hash(vec2 p) {
        p = fract(p * vec2(123.34, 456.21));
        p += dot(p, p + 45.32);
        return fract(p.x * p.y);
      }

      float noise(vec2 p) {
        vec2 i = floor(p);
        vec2 f = fract(p);
        f = f * f * (3.0 - 2.0 * f);
        float a = hash(i);
        float b = hash(i + vec2(1.0, 0.0));
        float c = hash(i + vec2(0.0, 1.0));
        float d = hash(i + vec2(1.0, 1.0));
        return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
      }

      float fbm(vec2 p) {
        float v = 0.0;
        float a = 0.5;
        mat2 rot = mat2(cos(0.5), sin(0.5), -sin(0.5), cos(0.5));
        for (int i = 0; i < 5; i++) {
          v += a * noise(p);
          p = rot * p * 2.0 + vec2(10.0);
          a *= 0.5;
        }
        return v;
      }

      void main() {
        vec2 uv = gl_FragCoord.xy / u_resolution.xy;
        float aspect = u_resolution.x / u_resolution.y;
        vec2 p = (uv - 0.5) * vec2(aspect, 1.0);

        float t = u_time * 0.14;
        vec2 flowA = vec2(sin(t * 0.35) * 0.15, -t * 0.32);
        vec2 flowB = vec2(cos(t * 0.28) * 0.18, t * 0.24);

        vec2 q = vec2(
          fbm(p * 1.8 + flowA),
          fbm(p * 1.8 + vec2(4.3, 0.0) + flowB)
        );

        vec2 r = vec2(
          fbm(p * 2.4 + 2.0 * q + vec2(1.7, -t * 0.38) + vec2(sin(t * 0.2), cos(t * 0.25)) * 0.15),
          fbm(p * 2.4 + 2.0 * q + vec2(8.3, t * 0.32) - vec2(cos(t * 0.22), sin(t * 0.18)) * 0.15)
        );

        float f = fbm(p * 2.0 + 2.2 * r);

        float silk = sin((p.x * 0.8 + p.y * 1.2 + f * 2.8) * 4.0);
        silk = abs(silk);
        silk = 1.0 - pow(silk, 0.4);

        // Luồng Spotlight từ đỉnh rọi xuống
        vec2 spotCenter = vec2(0.0, 0.52);
        vec2 spotVec = p - spotCenter;

        float spotAngle = atan(abs(spotVec.x), -spotVec.y);
        float spotCone = smoothstep(0.92, 0.1, spotAngle);
        float spotDist = length(spotVec);
        float spotFalloff = smoothstep(1.75, 0.1, spotDist);

        float spotlight = spotCone * spotFalloff;
        float coreGlow = smoothstep(0.65, 0.0, abs(spotVec.x) + spotDist * 0.35);
        spotlight = mix(spotlight, 1.0, coreGlow * 0.45);

        vec3 deepCharcoal = vec3(0.04, 0.04, 0.045);
        vec3 midSmoke = vec3(0.24, 0.25, 0.27);
        vec3 lightSmoke = vec3(0.55, 0.56, 0.60);
        vec3 spotBeam = vec3(0.95, 0.96, 0.98);

        float smokeDensity = clamp(f * 0.72 + silk * 0.45, 0.0, 1.0);
        vec3 col = mix(deepCharcoal, midSmoke, smokeDensity);
        col = mix(col, lightSmoke, pow(smokeDensity, 2.2) * 0.7);

        col += spotBeam * (spotlight * 0.5 + spotlight * smokeDensity * 0.65);

        float bulb = smoothstep(0.32, 0.0, length(p - spotCenter));
        col += vec3(1.0) * bulb * 0.75;

        float grain = (hash(gl_FragCoord.xy + vec2(3.7, 9.1)) - 0.5) * 0.035;
        col += grain;

        float vignette = smoothstep(1.5, 0.45, length(p));
        col *= vignette;

        // Tích hợp sẵn contrast 1.08 & brightness 1.02 để không cần CSS filter
        col = (col - 0.5) * 1.08 + 0.5;
        col *= 1.02;

        gl_FragColor = vec4(clamp(col, 0.0, 1.0), 1.0);
      }
    `;

    const createShader = (type: number, source: string) => {
      const shader = gl.createShader(type);
      if (!shader) return null;
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error("Shader compile error:", gl.getShaderInfoLog(shader));
        gl.deleteShader(shader);
        return null;
      }
      return shader;
    };

    const vs = createShader(gl.VERTEX_SHADER, vsSource);
    const fs = createShader(gl.FRAGMENT_SHADER, fsSource);
    if (!vs || !fs) {
      setHasWebGL(false);
      return;
    }

    const program = gl.createProgram();
    if (!program) {
      setHasWebGL(false);
      return;
    }

    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error("Program link error:", gl.getProgramInfoLog(program));
      setHasWebGL(false);
      return;
    }

    gl.useProgram(program);

    const posBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, posBuffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]),
      gl.STATIC_DRAW
    );

    const posLoc = gl.getAttribLocation(program, "position");
    gl.enableVertexAttribArray(posLoc);
    gl.vertexAttribPointer(posLoc, 2, gl.FLOAT, false, 0, 0);

    const uTime = gl.getUniformLocation(program, "u_time");
    const uRes = gl.getUniformLocation(program, "u_resolution");

    const drawStaticFrame = () => {
      if (!canvas) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 1.25);
      const width = Math.floor(window.innerWidth * dpr * 0.75);
      const height = Math.floor(window.innerHeight * dpr * 0.75);

      if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width;
        canvas.height = height;
        gl.viewport(0, 0, width, height);
      }

      gl.uniform1f(uTime, 2.5);
      gl.uniform2f(uRes, canvas.width, canvas.height);
      gl.drawArrays(gl.TRIANGLES, 0, 6);
    };

    drawStaticFrame();

    let resizeTimer: ReturnType<typeof setTimeout>;
    const handleResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(drawStaticFrame, 120);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      clearTimeout(resizeTimer);
      window.removeEventListener("resize", handleResize);
      gl.deleteBuffer(posBuffer);
      gl.deleteProgram(program);
      gl.deleteShader(vs);
      gl.deleteShader(fs);
    };
  }, []);

  return (
    <div
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
      aria-hidden="true"
    >
      {/* 1. Canvas WebGL tĩnh: Vẽ khói sắc nét 1 lần, 0% hao phí GPU lúc cuộn */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 h-full w-full object-cover"
      />

      {/* 2. Dự phòng ảnh tĩnh nếu trình duyệt tắt WebGL */}
      {!hasWebGL && (
        <Image
          src="/images/page3_toc_backdrop_clean.webp"
          alt="Trần Nam Tiến Portfolio - Table of Content Backdrop"
          fill
          priority
          sizes="100vw"
          className="object-cover object-top select-none"
        />
      )}
    </div>
  );
}
