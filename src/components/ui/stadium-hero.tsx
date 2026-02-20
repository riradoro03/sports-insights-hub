import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import logo from '@/assets/logo.png';
import stadiumSoccer from '@/assets/stadium-soccer.jpg';
import stadiumFootball from '@/assets/stadium-football.jpg';
import stadiumBasketball from '@/assets/stadium-basketball.jpg';

gsap.registerPlugin(ScrollTrigger);

// ─── Section data ──────────────────────────────────────────────────────────
const SECTIONS = [
  {
    id: 'pitch',
    title: 'THE PITCH',
    sub1: 'Where strategy meets performance,',
    sub2: 'and vision becomes victory.',
    image: stadiumSoccer,
    cta: true,
  },
  {
    id: 'game',
    title: 'THE GAME',
    sub1: 'Beyond the scoreline lies the business —',
    sub2: 'brand, revenue, and relentless innovation.',
    image: stadiumFootball,
    cta: false,
  },
  {
    id: 'future',
    title: 'THE FUTURE',
    sub1: 'In the space between sport and technology,',
    sub2: 'we find the next era of the beautiful game.',
    image: stadiumBasketball,
    cta: false,
  },
];
const TOTAL_SECTIONS = SECTIONS.length;

// ─── Camera journey ───────────────────────────────────────────────────────
const CAM_KEYFRAMES = [
  { x: 0, y: 60,  z: 900 },
  { x: 0, y: 30,  z: 400 },
  { x: 0, y: 10,  z: 60  },
];

export const StadiumHero = () => {
  const wrapperRef        = useRef<HTMLDivElement>(null);
  const canvasRef         = useRef<HTMLCanvasElement>(null);
  const titleRefs         = useRef<(HTMLDivElement | null)[]>([]);
  const subtitleRefs      = useRef<(HTMLDivElement | null)[]>([]);
  const progressBarRef    = useRef<HTMLDivElement>(null);
  const sectionLabelRef   = useRef<HTMLSpanElement>(null);
  const ctaRef            = useRef<HTMLDivElement>(null);
  const scrollLineRef     = useRef<HTMLDivElement>(null);

  const smoothCam = useRef({ x: 0, y: 60, z: 900 });
  const [isReady, setIsReady] = useState(false);
  const [currentSection, setCurrentSection] = useState(0);
  const [imageOpacities, setImageOpacities] = useState([1, 0, 0]);

  const threeRefs = useRef<{
    scene: THREE.Scene | null;
    camera: THREE.PerspectiveCamera | null;
    renderer: THREE.WebGLRenderer | null;
    composer: EffectComposer | null;
    stars: THREE.Points[];
    nebula: THREE.Mesh | null;
    animationId: number | null;
    targetCamX: number;
    targetCamY: number;
    targetCamZ: number;
  }>({
    scene: null, camera: null, renderer: null, composer: null,
    stars: [], nebula: null,
    animationId: null,
    targetCamX: 0, targetCamY: 60, targetCamZ: 900,
  });

  // ── Three.js init ───────────────────────────────────────────────────────
  useEffect(() => {
    if (!canvasRef.current) return;
    const R = threeRefs.current;

    R.scene = new THREE.Scene();
    R.scene.fog = new THREE.FogExp2(0x000000, 0.00025);

    R.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 2000);
    R.camera.position.set(0, 60, 900);

    R.renderer = new THREE.WebGLRenderer({ canvas: canvasRef.current, antialias: true, alpha: true });
    R.renderer.setSize(window.innerWidth, window.innerHeight);
    R.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    R.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    R.renderer.toneMappingExposure = 0.6;

    R.composer = new EffectComposer(R.renderer);
    R.composer.addPass(new RenderPass(R.scene, R.camera));
    const bloom = new UnrealBloomPass(
      new THREE.Vector2(window.innerWidth, window.innerHeight),
      1.0, 0.4, 0.82,
    );
    R.composer.addPass(bloom);

    // ── Stars (crowd lights / distant sparks) ────────────────────────────
    const GREEN  = new THREE.Color().setHSL(145 / 360, 0.8, 0.5);
    const ORANGE = new THREE.Color().setHSL(20  / 360, 0.9, 0.6);
    const WHITE  = new THREE.Color(0.95, 0.95, 0.95);

    const starVert = /* glsl */`
      attribute float size;
      attribute vec3 color;
      varying vec3 vColor;
      uniform float time;
      uniform float depth;
      void main() {
        vColor = color;
        vec3 pos = position;
        float angle = time * 0.04 * (1.0 - depth * 0.3);
        float s = sin(angle); float c = cos(angle);
        pos.xy = vec2(c * pos.x - s * pos.y, s * pos.x + c * pos.y);
        vec4 mv = modelViewMatrix * vec4(pos, 1.0);
        gl_PointSize = size * (300.0 / -mv.z);
        gl_Position = projectionMatrix * mv;
      }
    `;
    const starFrag = /* glsl */`
      varying vec3 vColor;
      void main() {
        float d = length(gl_PointCoord - vec2(0.5));
        if (d > 0.5) discard;
        float a = 1.0 - smoothstep(0.0, 0.5, d);
        gl_FragColor = vec4(vColor, a);
      }
    `;

    const addStars = (count: number, depth: number, colors: THREE.Color[]) => {
      const geo = new THREE.BufferGeometry();
      const pos = new Float32Array(count * 3);
      const col = new Float32Array(count * 3);
      const siz = new Float32Array(count);
      for (let j = 0; j < count; j++) {
        const r   = 200 + Math.random() * 800;
        const th  = Math.random() * Math.PI * 2;
        const phi = Math.acos(Math.random() * 2 - 1);
        pos[j*3]   = r * Math.sin(phi) * Math.cos(th);
        pos[j*3+1] = r * Math.sin(phi) * Math.sin(th);
        pos[j*3+2] = r * Math.cos(phi);
        const c = colors[Math.floor(Math.random() * colors.length)];
        const b = 0.6 + Math.random() * 0.4;
        col[j*3] = c.r * b; col[j*3+1] = c.g * b; col[j*3+2] = c.b * b;
        siz[j] = Math.random() * 2 + 0.5;
      }
      geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
      geo.setAttribute('color',    new THREE.BufferAttribute(col, 3));
      geo.setAttribute('size',     new THREE.BufferAttribute(siz, 1));
      const mat = new THREE.ShaderMaterial({
        uniforms: { time: { value: 0 }, depth: { value: depth } },
        vertexShader: starVert, fragmentShader: starFrag,
        transparent: true, blending: THREE.AdditiveBlending, depthWrite: false,
      });
      const pts = new THREE.Points(geo, mat);
      R.scene!.add(pts);
      R.stars.push(pts);
    };

    addStars(5000, 0, [WHITE, WHITE, WHITE, GREEN, ORANGE]);
    addStars(3000, 1, [GREEN, WHITE, GREEN]);
    addStars(2000, 2, [ORANGE, WHITE, ORANGE]);

    // (No atmosphere sphere — stadium images provide the backdrop)

    // ── Animate loop ─────────────────────────────────────────────────────
    const animate = () => {
      R.animationId = requestAnimationFrame(animate);
      const t = Date.now() * 0.001;

      R.stars.forEach(s => { (s.material as THREE.ShaderMaterial).uniforms.time.value = t; });

      const ease = 0.05;
      smoothCam.current.x += (R.targetCamX - smoothCam.current.x) * ease;
      smoothCam.current.y += (R.targetCamY - smoothCam.current.y) * ease;
      smoothCam.current.z += (R.targetCamZ - smoothCam.current.z) * ease;
      R.camera!.position.x = smoothCam.current.x + Math.sin(t * 0.1) * 2;
      R.camera!.position.y = smoothCam.current.y + Math.cos(t * 0.14) * 1;
      R.camera!.position.z = smoothCam.current.z;
      R.camera!.lookAt(0, 10, -600);

      R.composer!.render();
    };
    animate();

    setIsReady(true);

    const onResize = () => {
      if (!R.camera || !R.renderer || !R.composer) return;
      R.camera.aspect = window.innerWidth / window.innerHeight;
      R.camera.updateProjectionMatrix();
      R.renderer.setSize(window.innerWidth, window.innerHeight);
      R.composer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', onResize);

    return () => {
      if (R.animationId) cancelAnimationFrame(R.animationId);
      window.removeEventListener('resize', onResize);
      R.stars.forEach(s => { s.geometry.dispose(); (s.material as THREE.Material).dispose(); });
      R.renderer?.dispose();
    };
  }, []);

  // ── Scroll → camera, section state & image crossfade ────────────────────
  useEffect(() => {
    const onScroll = () => {
      const el = wrapperRef.current;
      if (!el) return;
      const scrollY    = window.scrollY;
      const wrapHeight = el.offsetHeight - window.innerHeight;
      const progress   = Math.min(Math.max(scrollY / wrapHeight, 0), 1);

      const R = threeRefs.current;

      // Camera interpolation
      const totalProgress = progress * (TOTAL_SECTIONS - 1);
      const idx  = Math.min(Math.floor(totalProgress), TOTAL_SECTIONS - 2);
      const frac = totalProgress - idx;
      const kA   = CAM_KEYFRAMES[idx];
      const kB   = CAM_KEYFRAMES[idx + 1];
      R.targetCamX = kA.x + (kB.x - kA.x) * frac;
      R.targetCamY = kA.y + (kB.y - kA.y) * frac;
      R.targetCamZ = kA.z + (kB.z - kA.z) * frac;

      // Section index
      const sec = Math.min(Math.floor(progress * TOTAL_SECTIONS), TOTAL_SECTIONS - 1);
      setCurrentSection(sec);

      // Image crossfade: calculate opacity for each image
      const opacities = [0, 0, 0];
      const sectionProgress = progress * TOTAL_SECTIONS;
      for (let i = 0; i < TOTAL_SECTIONS; i++) {
        const dist = Math.abs(sectionProgress - (i + 0.5));
        opacities[i] = Math.max(0, 1 - dist * 1.5);
      }
      // Ensure at least one is fully visible
      const maxOp = Math.max(...opacities);
      if (maxOp > 0) {
        opacities.forEach((_, i) => { opacities[i] = opacities[i] / maxOp; });
      } else {
        opacities[0] = 1;
      }
      setImageOpacities(opacities);

      // Progress bar
      if (progressBarRef.current) progressBarRef.current.style.width = `${progress * 100}%`;
      if (sectionLabelRef.current) sectionLabelRef.current.textContent = `0${sec + 1} / 0${TOTAL_SECTIONS}`;
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // ── GSAP entrance animations ─────────────────────────────────────────────
  useEffect(() => {
    if (!isReady) return;
    const tl = gsap.timeline({ delay: 0.4 });

    titleRefs.current[0] && tl.from(titleRefs.current[0], {
      y: 80, opacity: 0, duration: 1.4, ease: 'power4.out',
    });
    subtitleRefs.current[0] && tl.from(subtitleRefs.current[0], {
      y: 30, opacity: 0, duration: 1.0, ease: 'power3.out',
    }, '-=0.7');
    ctaRef.current && tl.from(ctaRef.current, {
      y: 20, opacity: 0, duration: 0.8, ease: 'power3.out',
    }, '-=0.5');
    scrollLineRef.current && tl.from(scrollLineRef.current, {
      opacity: 0, duration: 0.8,
    }, '-=0.3');

    return () => { tl.kill(); };
  }, [isReady]);

  // ── Section transition animations ──────────────────────────────────────
  useEffect(() => {
    if (!isReady) return;
    const title = titleRefs.current[currentSection];
    const sub   = subtitleRefs.current[currentSection];
    if (title) gsap.fromTo(title, { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.9, ease: 'power3.out' });
    if (sub)   gsap.fromTo(sub,   { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7, ease: 'power3.out', delay: 0.15 });

    titleRefs.current.forEach((t, i) => {
      if (i !== currentSection && t) gsap.to(t, { opacity: 0, duration: 0.4 });
    });
    subtitleRefs.current.forEach((s, i) => {
      if (i !== currentSection && s) gsap.to(s, { opacity: 0, duration: 0.3 });
    });

    if (ctaRef.current) {
      gsap.to(ctaRef.current, { opacity: currentSection === 0 ? 1 : 0, duration: 0.5 });
    }
  }, [currentSection, isReady]);

  return (
    <div ref={wrapperRef} style={{ height: `${TOTAL_SECTIONS * 100}vh` }} className="relative">
      <div className="sticky top-0 h-screen overflow-hidden">

        {/* Three.js canvas (bottom layer) */}
        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 1 }} />

        {/* ── Stadium images with crossfade (above canvas) ── */}
        {SECTIONS.map((sec, i) => (
          <div
            key={sec.id}
            className="absolute inset-0 bg-cover bg-center bg-no-repeat will-change-[opacity] transition-none"
            style={{
              backgroundImage: `url(${sec.image})`,
              opacity: imageOpacities[i],
              zIndex: 2,
              mixBlendMode: 'screen',
            }}
          />
        ))}

        {/* Dark overlay for text readability */}
        <div className="absolute inset-0 bg-background/30" style={{ zIndex: 3 }} />

        {/* Vignette */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse at center, transparent 35%, rgba(0,0,0,0.75) 100%)', zIndex: 4 }}
        />

        {/* ── Logo ── */}
        <div className="absolute top-24 left-1/2 -translate-x-1/2 z-20">
          <img src={logo} alt="The Second Layer" className="h-48 md:h-64 lg:h-80 w-auto drop-shadow-2xl" />
        </div>

        {/* ── Section text ── */}
        <div className="absolute inset-0 flex flex-col items-center justify-center z-20 pointer-events-none px-4">
          {SECTIONS.map((sec, i) => (
            <div key={sec.id} className="absolute text-center max-w-3xl">
              <div
                ref={el => { titleRefs.current[i] = el; }}
                style={{ opacity: 0 }}
              >
                <h1 className="font-heading font-bold text-5xl md:text-7xl lg:text-8xl tracking-widest text-foreground drop-shadow-lg mb-4">
                  {sec.title}
                </h1>
              </div>
              <div
                ref={el => { subtitleRefs.current[i] = el; }}
                style={{ opacity: 0 }}
              >
                <p className="font-heading text-base md:text-xl text-muted-foreground tracking-wide mb-2 uppercase">
                  {sec.sub1}
                </p>
                <p className="font-heading text-sm md:text-lg text-muted-foreground/60 tracking-wide uppercase">
                  {sec.sub2}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* ── CTA buttons (section 0 only) ── */}
        <div
          ref={ctaRef}
          className="absolute bottom-28 left-1/2 -translate-x-1/2 z-20 flex gap-4"
          style={{ opacity: 0 }}
        >
          <Button asChild size="lg" className="font-heading tracking-wide pointer-events-auto">
            <Link to="/about">Discover More <ArrowRight className="ml-2" size={18} /></Link>
          </Button>
          <Button
            asChild variant="outline" size="lg"
            className="font-heading tracking-wide border-primary/50 text-primary hover:bg-primary/10 pointer-events-auto"
          >
            <Link to="/projects">View Projects</Link>
          </Button>
        </div>

        {/* ── Bottom HUD ── */}
        <div className="absolute bottom-6 left-0 right-0 z-20 flex items-end justify-between px-8">
          <div className="flex flex-col gap-1 w-48">
            <div className="h-px bg-border/40 relative overflow-hidden rounded-full">
              <div
                ref={progressBarRef}
                className="absolute left-0 top-0 h-full bg-primary transition-none"
                style={{ width: '0%' }}
              />
            </div>
            <span
              ref={sectionLabelRef}
              className="font-heading text-[10px] tracking-[0.3em] text-muted-foreground"
            >
              01 / 0{TOTAL_SECTIONS}
            </span>
          </div>

          <div ref={scrollLineRef} className="flex flex-col items-center gap-1" style={{ opacity: 0 }}>
            <span className="font-heading text-[10px] tracking-[0.35em] text-muted-foreground uppercase">Scroll</span>
            <div className="w-px h-10 bg-gradient-to-b from-primary to-transparent animate-pulse" />
          </div>

          <div className="flex gap-2">
            {SECTIONS.map((_, i) => (
              <div
                key={i}
                className="w-1.5 h-1.5 rounded-full transition-all duration-500"
                style={{
                  backgroundColor: i === currentSection
                    ? 'hsl(var(--primary))'
                    : 'hsl(var(--muted-foreground) / 0.4)',
                  transform: i === currentSection ? 'scale(1.4)' : 'scale(1)',
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
