import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import logo from '@/assets/logo.png';
import heroImage from '@/assets/hero-stadium.jpg';

gsap.registerPlugin(ScrollTrigger);

export const StadiumHero = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const [isReady, setIsReady] = useState(false);

  const smoothCameraPos = useRef({ x: 0, y: 30, z: 100 });
  const threeRefs = useRef<{
    scene: THREE.Scene | null;
    camera: THREE.PerspectiveCamera | null;
    renderer: THREE.WebGLRenderer | null;
    particles: THREE.Points[];
    animationId: number | null;
    targetCameraX?: number;
    targetCameraY?: number;
    targetCameraZ?: number;
  }>({
    scene: null,
    camera: null,
    renderer: null,
    particles: [],
    animationId: null,
  });

  useEffect(() => {
    if (!canvasRef.current) return;
    const refs = threeRefs.current;

    // Scene
    refs.scene = new THREE.Scene();
    refs.scene.fog = new THREE.FogExp2(0x000000, 0.0008);

    // Camera — starts far away, looking at center
    refs.camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 3000);
    refs.camera.position.set(0, 60, 900);
    smoothCameraPos.current = { x: 0, y: 60, z: 900 };

    // Renderer
    refs.renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      antialias: true,
      alpha: true,
    });
    refs.renderer.setSize(window.innerWidth, window.innerHeight);
    refs.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    refs.renderer.setClearColor(0x000000, 0);

    // --- Particle field (light trails / crowd sparks) ---
    const createParticles = (count: number, spread: number, yRange: [number, number], color1: THREE.Color, color2: THREE.Color) => {
      const geo = new THREE.BufferGeometry();
      const positions = new Float32Array(count * 3);
      const colors = new Float32Array(count * 3);
      const sizes = new Float32Array(count);

      for (let i = 0; i < count; i++) {
        positions[i * 3] = (Math.random() - 0.5) * spread;
        positions[i * 3 + 1] = yRange[0] + Math.random() * (yRange[1] - yRange[0]);
        positions[i * 3 + 2] = (Math.random() - 0.5) * spread * 0.6;

        const c = Math.random() < 0.5 ? color1 : color2;
        const bright = 0.6 + Math.random() * 0.4;
        colors[i * 3] = c.r * bright;
        colors[i * 3 + 1] = c.g * bright;
        colors[i * 3 + 2] = c.b * bright;

        sizes[i] = Math.random() * 3 + 0.5;
      }

      geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
      geo.setAttribute('color', new THREE.BufferAttribute(colors, 3));
      geo.setAttribute('size', new THREE.BufferAttribute(sizes, 1));

      const mat = new THREE.ShaderMaterial({
        uniforms: { time: { value: 0 } },
        vertexShader: `
          attribute float size;
          attribute vec3 color;
          varying vec3 vColor;
          uniform float time;
          void main() {
            vColor = color;
            vec3 pos = position;
            pos.y += sin(time * 0.3 + pos.x * 0.01) * 2.0;
            pos.x += cos(time * 0.2 + pos.z * 0.01) * 1.5;
            vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
            gl_PointSize = size * (400.0 / -mvPosition.z);
            gl_Position = projectionMatrix * mvPosition;
          }
        `,
        fragmentShader: `
          varying vec3 vColor;
          void main() {
            float d = length(gl_PointCoord - vec2(0.5));
            if (d > 0.5) discard;
            float alpha = 1.0 - smoothstep(0.0, 0.5, d);
            gl_FragColor = vec4(vColor, alpha * 0.8);
          }
        `,
        transparent: true,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      });

      const pts = new THREE.Points(geo, mat);
      refs.scene!.add(pts);
      refs.particles.push(pts);
    };

    // Green sparks (primary: 145 80% 45%)
    const green = new THREE.Color().setHSL(145 / 360, 0.8, 0.45);
    // Orange sparks (secondary: 20 90% 55%)
    const orange = new THREE.Color().setHSL(20 / 360, 0.9, 0.55);
    // White sparks
    const white = new THREE.Color(0.9, 0.9, 0.9);

    createParticles(2000, 1200, [-80, 200], green, white);
    createParticles(1000, 800, [-40, 120], orange, white);
    createParticles(500, 400, [0, 60], green, orange);

    // Stadium floor glow plane
    const floorGeo = new THREE.PlaneGeometry(2000, 1200, 1, 1);
    const floorMat = new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 },
        color1: { value: green },
        color2: { value: new THREE.Color(0x001a00) },
      },
      vertexShader: `
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        varying vec2 vUv;
        uniform float time;
        uniform vec3 color1;
        uniform vec3 color2;
        void main() {
          float dist = length(vUv - vec2(0.5));
          float alpha = 0.18 * (1.0 - smoothstep(0.0, 0.5, dist));
          float pulse = sin(time * 0.5) * 0.05 + 0.95;
          vec3 col = mix(color1, color2, dist * 2.0) * pulse;
          gl_FragColor = vec4(col, alpha);
        }
      `,
      transparent: true,
      blending: THREE.AdditiveBlending,
      side: THREE.DoubleSide,
      depthWrite: false,
    });
    const floor = new THREE.Mesh(floorGeo, floorMat);
    floor.rotation.x = -Math.PI / 2;
    floor.position.y = -80;
    refs.scene.add(floor);

    // Animate loop
    const animate = () => {
      refs.animationId = requestAnimationFrame(animate);
      const time = Date.now() * 0.001;

      // Animate particles
      refs.particles.forEach((pts) => {
        if ((pts.material as THREE.ShaderMaterial).uniforms) {
          (pts.material as THREE.ShaderMaterial).uniforms.time.value = time;
        }
      });

      // Animate floor
      if ((floorMat as THREE.ShaderMaterial).uniforms) {
        (floorMat as THREE.ShaderMaterial).uniforms.time.value = time;
      }

      // Smooth camera
      if (refs.camera && refs.targetCameraZ !== undefined) {
        const ease = 0.04;
        smoothCameraPos.current.x += ((refs.targetCameraX ?? 0) - smoothCameraPos.current.x) * ease;
        smoothCameraPos.current.y += ((refs.targetCameraY ?? 60) - smoothCameraPos.current.y) * ease;
        smoothCameraPos.current.z += ((refs.targetCameraZ ?? 900) - smoothCameraPos.current.z) * ease;

        const floatX = Math.sin(time * 0.12) * 3;
        const floatY = Math.cos(time * 0.09) * 2;

        refs.camera.position.x = smoothCameraPos.current.x + floatX;
        refs.camera.position.y = smoothCameraPos.current.y + floatY;
        refs.camera.position.z = smoothCameraPos.current.z;
        refs.camera.lookAt(0, -10, 0);
      }

      refs.renderer!.render(refs.scene!, refs.camera!);
    };
    animate();

    // Set initial targets
    refs.targetCameraX = 0;
    refs.targetCameraY = 60;
    refs.targetCameraZ = 900;

    setIsReady(true);

    // Resize
    const handleResize = () => {
      if (!refs.camera || !refs.renderer) return;
      refs.camera.aspect = window.innerWidth / window.innerHeight;
      refs.camera.updateProjectionMatrix();
      refs.renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      if (refs.animationId) cancelAnimationFrame(refs.animationId);
      window.removeEventListener('resize', handleResize);
      refs.particles.forEach((p) => { p.geometry.dispose(); (p.material as THREE.Material).dispose(); });
      refs.renderer?.dispose();
    };
  }, []);

  // Scroll — fly camera into the stadium
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const maxScroll = window.innerHeight;
      const t = Math.min(scrollY / maxScroll, 1);

      const refs = threeRefs.current;
      // Fly from far (900) toward center (50), descend slightly
      refs.targetCameraX = 0;
      refs.targetCameraY = 60 - t * 50;
      refs.targetCameraZ = 900 - t * 820;

      // Fade overlay in as we zoom in
      if (overlayRef.current) {
        overlayRef.current.style.opacity = String(t * 0.7);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // GSAP entrance animations
  useEffect(() => {
    if (!isReady) return;
    const tl = gsap.timeline({ delay: 0.3 });

    if (titleRef.current) {
      tl.from(titleRef.current, { y: 60, opacity: 0, duration: 1.2, ease: 'power4.out' });
    }
    if (subtitleRef.current) {
      tl.from(subtitleRef.current, { y: 30, opacity: 0, duration: 1, ease: 'power3.out' }, '-=0.6');
    }
    if (ctaRef.current) {
      tl.from(ctaRef.current, { y: 20, opacity: 0, duration: 0.8, ease: 'power3.out' }, '-=0.5');
    }
    if (scrollIndicatorRef.current) {
      tl.from(scrollIndicatorRef.current, { opacity: 0, duration: 0.8, ease: 'power2.out' }, '-=0.3');
    }

    return () => { tl.kill(); };
  }, [isReady]);

  return (
    <div ref={containerRef} className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Stadium photo background */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${heroImage})` }}
      />
      {/* Dark base overlay */}
      <div className="absolute inset-0 bg-background/60" />

      {/* Three.js canvas — particle layer on top */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" />

      {/* Scroll-driven dark overlay (fades in as user scrolls in) */}
      <div ref={overlayRef} className="absolute inset-0 bg-background pointer-events-none" style={{ opacity: 0 }} />

      {/* Vignette */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.7) 100%)' }} />

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <div ref={titleRef} style={{ opacity: 0 }}>
          <img
            src={logo}
            alt="The Second Layer"
            className="h-48 md:h-64 lg:h-80 w-auto mx-auto mb-4 drop-shadow-2xl"
          />
        </div>

        <div ref={subtitleRef} style={{ opacity: 0 }}>
          <p className="text-lg md:text-xl text-muted-foreground mb-2 font-heading tracking-widest uppercase">
            Sports Business | Innovation | Strategy
          </p>
          <p className="text-sm md:text-base text-muted-foreground/70 mb-8 max-w-2xl mx-auto">
            Exploring the intersection of sport, business, and technology. Welcome to my digital space.
          </p>
        </div>

        <div ref={ctaRef} className="flex gap-4 justify-center" style={{ opacity: 0 }}>
          <Button asChild size="lg" className="font-heading tracking-wide">
            <Link to="/about">Discover More <ArrowRight className="ml-2" size={18} /></Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="font-heading tracking-wide border-primary/50 text-primary hover:bg-primary/10">
            <Link to="/projects">View Projects</Link>
          </Button>
        </div>
      </div>

      {/* Scroll indicator */}
      <div ref={scrollIndicatorRef} className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2" style={{ opacity: 0 }}>
        <span className="font-heading text-xs tracking-[0.3em] text-muted-foreground uppercase">Scroll</span>
        <div className="w-px h-12 bg-gradient-to-b from-primary to-transparent animate-pulse" />
      </div>
    </div>
  );
};
