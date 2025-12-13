import React, { useRef, useEffect, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { FloatingHologramParticles } from "./FloatingHologramParticles";
import { useAppStore } from "../../../../shared/store/useAppStore";

type Props = {
  visible: boolean;
  position: [number, number, number];
  width?: number;
  height?: number;
  children?: React.ReactNode;

  scanSpeed?: number;
  scanIntensity?: number;
  lineWidth?: number;
  baseColor?: string;
  glowColor?: string;
};

// ========================================================
// BORDER SHADER (Neon Pulsing Frame)
// ========================================================
const borderVertex = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position =
      projectionMatrix *
      modelViewMatrix *
      vec4(position, 1.0);
  }
`;

const borderFragment = `
  precision mediump float;

  varying vec2 vUv;

  uniform float u_time;
  uniform float u_opacity;
  uniform vec3 u_color;

  const float borderSize = 0.07;

  void main() {
    vec2 uv = vUv;

    float edge = min(min(uv.x, 1.0 - uv.x), min(uv.y, 1.0 - uv.y));
    float mask = smoothstep(borderSize, borderSize + 0.015, edge);
    mask = 1.0 - mask;

    float pulse = 0.8 + sin(u_time * 3.0) * 0.2;

    vec3 glow = u_color * pulse;

    gl_FragColor = vec4(glow, mask * u_opacity);
  }
`;

// ========================================================
// MAIN PANEL SHADER (Scanlines + Noise + Glitch Burst)
// ========================================================
const panelVertex = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position =
      projectionMatrix *
      modelViewMatrix *
      vec4(position, 1.0);
  }
`;

const panelFragment = `
  precision mediump float;

  varying vec2 vUv;

  uniform float u_time;
  uniform float u_opacity;
  uniform float u_scanSpeed;
  uniform float u_scanIntensity;
  uniform float u_lineWidth;
  uniform float u_glitchStrength;
  uniform vec3 u_baseColor;
  uniform vec3 u_glowColor;

  float hash21(vec2 p) {
    p = fract(p * vec2(123.34, 456.21));
    p += dot(p, p + 45.32);
    return fract(p.x * p.y);
  }

  void main() {

    vec3 base = u_baseColor;
    vec2 uv = vUv - 0.5;
    float dist = length(uv);

    float vignette = smoothstep(0.45, 0.9, dist);

    // --- Scanlines ---
    float scroll = u_time * u_scanSpeed;
    float pos = fract(vUv.y + scroll);

    float line = smoothstep(u_lineWidth * 0.5, 0.0, abs(pos - 0.5));
    line *= smoothstep(0.0, 0.9, 1.0 - dist);

    // --- Glitch Burst ---
    float glitch = u_glitchStrength;

    if (glitch > 0.01) {
      float tear = step(0.97,
                        fract(sin(uv.y * 90.0 + u_time * 12.0) * 9999.0))
                        * glitch * 0.1;
      uv.x += tear;
    }

    // --- RGB Offset ---
    vec2 offset = vec2(
      (hash21(uv * 10.0 + u_time) - 0.5) * glitch * 0.04,
      (hash21(uv * 30.0 + u_time) - 0.5) * glitch * 0.04
    );

    float n = hash21(vUv * 400.0 + u_time * 0.1) *
              (0.03 + glitch * 0.04);

    vec3 rgb = vec3(
      base.r + n,
      base.g + n * 0.7,
      base.b + n * 0.4
    );

    rgb += u_glowColor * (line * u_scanIntensity);
    rgb += u_glowColor * glitch * 0.4;

    float alpha = u_opacity * (1.0 - vignette * 0.8);

    gl_FragColor = vec4(rgb, alpha);
  }
`;

// ========================================================
// RIPPLE SHADER (Touch Wave Pulse)
// ========================================================
const rippleVertex = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position =
      projectionMatrix *
      modelViewMatrix *
      vec4(position, 1.0);
  }
`;

const rippleFragment = `
  precision mediump float;
  varying vec2 vUv;

  uniform float u_time;
  uniform float u_opacity;
  uniform vec3 u_color;

  void main() {
    vec2 uv = vUv - 0.5;

    float dist = length(uv);

    float radius = u_time * 1.6;

    float ring = smoothstep(radius + 0.03, radius, dist);

    float fade = 1.0 - smoothstep(0.0, 0.6, u_time);

    gl_FragColor = vec4(u_color, ring * fade * u_opacity);
  }
`;

// ========================================================
// COMPONENT START
// ========================================================
export const HologramPanel: React.FC<Props> = ({
  visible,
  position,
  width = 6,
  height = 3,
  children,

  scanSpeed = 0.35,
  scanIntensity = 1.0,
  lineWidth = 0.02,
  baseColor = "#003a3a",
  glowColor = "#00ffff",
}) => {
  const groupRef = useRef<THREE.Group | null>(null);

  const opacity = useRef(0);
  const scale = useRef(0.85);

  // cursor tilt refs
  const tiltX = useRef(0);
  const tiltY = useRef(0);

  // ripple refs
  const rippleTime = useRef(1);

  // ========================================================
  // MATERIALS
  // ========================================================

  // MAIN PANEL
  const panelMat = useMemo(() => {
    return new THREE.ShaderMaterial({
      vertexShader: panelVertex,
      fragmentShader: panelFragment,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      uniforms: {
        u_time: { value: 0 },
        u_opacity: { value: 0 },
        u_scanSpeed: { value: scanSpeed },
        u_scanIntensity: { value: scanIntensity },
        u_lineWidth: { value: lineWidth },
        u_glitchStrength: { value: 0 },
        u_baseColor: { value: new THREE.Color(baseColor) },
        u_glowColor: { value: new THREE.Color(glowColor) },
      },
    });
  }, []);

  // BORDER
  const borderMat = useMemo(() => {
    return new THREE.ShaderMaterial({
      vertexShader: borderVertex,
      fragmentShader: borderFragment,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      uniforms: {
        u_time: { value: 0 },
        u_opacity: { value: 0 },
        u_color: { value: new THREE.Color(glowColor) },
      },
    });
  }, []);

  // RIPPLE
  const rippleMat = useMemo(() => {
    return new THREE.ShaderMaterial({
      vertexShader: rippleVertex,
      fragmentShader: rippleFragment,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      uniforms: {
        u_time: { value: 1 },
        u_opacity: { value: 0 },
        u_color: { value: new THREE.Color(glowColor) },
      },
    });
  }, []);

  // ========================================================
  // VISIBILITY → Start Animations
  // ========================================================
  useEffect(() => {
    if (visible) {
      opacity.current = 0;
      scale.current = 0.85;

      // GLITCH BURST
      panelMat.uniforms.u_glitchStrength.value = 1.2;

      console.log("HologramPanel opened");

      useAppStore.getState().playEffect("panel_open");
    }
  }, [visible]);

  // ========================================================
  // CURSOR EVENTS
  // ========================================================
  const handlePointerMove = (e: any) => {
    const x = (e.uv?.x ?? 0.5) - 0.5;
    const y = (e.uv?.y ?? 0.5) - 0.5;

    tiltX.current = y;
    tiltY.current = x;
  };

  const handlePointerOut = () => {
    tiltX.current = 0;
    tiltY.current = 0;
  };

  const handlePointerDown = () => {
    rippleTime.current = 0; // restart ripple
    useAppStore.getState().playEffect("click_pulse");
  };

  // ========================================================
  // FRAME LOOP
  // ========================================================
  useFrame((_, delta) => {
    if (!groupRef.current) return;

    // time uniforms
    panelMat.uniforms.u_time.value += delta;
    borderMat.uniforms.u_time.value += delta;

    opacity.current = THREE.MathUtils.lerp(
      opacity.current,
      visible ? 0.95 : 0,
      6 * delta
    );

    scale.current = THREE.MathUtils.lerp(
      scale.current,
      visible ? 1.0 : 0.9,
      6 * delta
    );

    groupRef.current.scale.set(scale.current, scale.current, scale.current);

    panelMat.uniforms.u_opacity.value = opacity.current;
    borderMat.uniforms.u_opacity.value = opacity.current;

    // glitch decay
    panelMat.uniforms.u_glitchStrength.value = THREE.MathUtils.lerp(
      panelMat.uniforms.u_glitchStrength.value,
      0,
      8 * delta
    );

    // -------------------------------------------------
    // RIPPLE ANIMATION
    // -------------------------------------------------
    if (visible) {
      rippleTime.current += delta * 2.2;
      rippleMat.uniforms.u_time.value = rippleTime.current;
      rippleMat.uniforms.u_opacity.value = opacity.current;
    } else {
      rippleTime.current = 1;
    }

    // -------------------------------------------------
    // CURSOR TILT ANIMATION
    // -------------------------------------------------
    if (visible) {
      const maxTilt = 0.15;

      const targetX = tiltX.current * maxTilt;
      const targetY = -tiltY.current * maxTilt;

      groupRef.current.rotation.x = THREE.MathUtils.lerp(
        groupRef.current.rotation.x,
        targetX,
        6 * delta
      );

      groupRef.current.rotation.y = THREE.MathUtils.lerp(
        groupRef.current.rotation.y,
        targetY,
        6 * delta
      );
    } else {
      groupRef.current.rotation.x = THREE.MathUtils.lerp(
        groupRef.current.rotation.x,
        0,
        6 * delta
      );
      groupRef.current.rotation.y = THREE.MathUtils.lerp(
        groupRef.current.rotation.y,
        0,
        6 * delta
      );
    }
  });

  // ========================================================
  // RETURN JSX
  // ========================================================
  return (
    <group
      ref={groupRef}
      position={position}
      onPointerMove={handlePointerMove}
      onPointerOut={handlePointerOut}
      onPointerDown={handlePointerDown}
    >
      {/* Floating hologram particles */}
      <FloatingHologramParticles count={45} radius={2.4} color={glowColor} />

      {/* Main Hologram Panel */}
      <mesh>
        <planeGeometry args={[width, height]} />
        <primitive object={panelMat} attach="material" />
      </mesh>

      {/* Pulsing Neon Border */}
      <mesh position={[0, 0, 0.02]}>
        <planeGeometry args={[width * 1.05, height * 1.05]} />
        <primitive object={borderMat} attach="material" />
      </mesh>

      {/* Touch Ripple Pulse */}
      <mesh position={[0, 0, 0.05]}>
        <planeGeometry args={[width * 1.1, height * 1.1]} />
        <primitive object={rippleMat} attach="material" />
      </mesh>

      {/* Text / Content */}
      <group position={[0, 0, 0.07]}>{children}</group>
    </group>
  );
};
