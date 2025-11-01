import React, { Suspense, useEffect, useMemo, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { servicesList } from '../../../data/serviceData';
import SeoHelmet from '../../../components/common/SeoHelmet';

declare global {
  namespace JSX {
    interface IntrinsicElements {
      mesh: any;
      sphereGeometry: any;
      meshPhysicalMaterial: any;
      ambientLight: any;
      pointLight: any;
    }
  }
}


type ServiceDetailTemplateProps = {
  slug: string;
};

const ServiceDetailTemplate: React.FC<ServiceDetailTemplateProps> = ({ slug }) => {
  // Dynamically load 3D libraries to avoid hard dependency at build time.
  const [threeModules, setThreeModules] = useState<{
    Canvas?: any;
    useFrame?: any;
    Stars?: any;
  }>({});


  useEffect(() => {
    let isMounted = true;
    (async () => {
      try {
        // dynamic import without hard type dependency
        // @ts-ignore
        const fiber: any = await import('@react-three/fiber');
        if (isMounted) {
          setThreeModules({ Canvas: fiber.Canvas, useFrame: fiber.useFrame, Stars: undefined });
        }
      } catch (_) {
        // If not installed, silently skip 3D
      }
    })();
    return () => { isMounted = false; };
  }, []);

  // Lightweight parallax target for the glowing sphere
  const mouseRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      const cx = window.innerWidth / 2;
      const cy = window.innerHeight / 2;
      mouseRef.current.x = (e.clientX - cx) / cx; // -1..1
      mouseRef.current.y = (e.clientY - cy) / cy; // -1..1
    };
    window.addEventListener('mousemove', onMove);
    return () => window.removeEventListener('mousemove', onMove);
  }, []);

  // Detect WebGL support once and limit how many canvases we mount
  const canUseWebGL = useMemo(() => {
    try {
      const canvas = document.createElement('canvas');
      const gl2 = canvas.getContext('webgl2', { failIfMajorPerformanceCaveat: true });
      if (gl2) return true;
      const gl = canvas.getContext('webgl', { failIfMajorPerformanceCaveat: true })
        || (canvas as any).getContext('experimental-webgl', { failIfMajorPerformanceCaveat: true });
      return !!gl;
    } catch (_) {
      return false;
    }
  }, []);
  const renderSecondary3D = false; // prevent creating multiple WebGL contexts to avoid runtime errors
  const enable3D = false; // hard-disable R3F Canvas to avoid WebGL context errors on some devices

  // Error boundary to catch renderer failures and fall back gracefully
  const [threeFailed, setThreeFailed] = useState(false);
  class CanvasErrorBoundary extends React.Component<{ onError: () => void; children: React.ReactNode }, { hasError: boolean }> {
    constructor(props: any) {
      super(props);
      this.state = { hasError: false };
    }
    static getDerivedStateFromError() { return { hasError: true }; }
    componentDidCatch() { this.props.onError(); }
    render() { return this.state.hasError ? null : (this.props.children as any); }
  }

  const service = useMemo(() => servicesList.find(s => s.slug === slug), [slug]);
  if (!service) return null;

  const { title, image, content } = service.details;
  const sectionImages = service.sectionImages || [];

  const Hero3DBackground: React.FC = () => {
    const { Canvas, useFrame } = threeModules;
    if (!Canvas || !canUseWebGL || !renderSecondary3D) return null;

    // Rotating, glowing sphere with subtle parallax
    const RotatingGlow: React.FC = () => {
      const ref = useRef<any>(null);
      useFrame((state: any) => {
        if (!ref.current) return;
        ref.current.rotation.y += 0.0025;
        ref.current.rotation.x += 0.0008;
        // Parallax: move slightly based on mouse
        const px = mouseRef.current.x * 0.4;
        const py = mouseRef.current.y * 0.25;
        ref.current.position.x += (px - ref.current.position.x) * 0.02;
        ref.current.position.y += (-py - ref.current.position.y) * 0.02;
      });
      return (
        React.createElement(
          'mesh',
          { ref, position: [1.8, 0.6, -4] },
          [
            React.createElement('sphereGeometry', { args: [1.2, 48, 48], key: 'geo' }),
            React.createElement('meshPhysicalMaterial', {
              color: '#384bff', emissive: '#384bff', emissiveIntensity: 0.55,
              roughness: 0.2, metalness: 0.6, clearcoat: 0.9, clearcoatRoughness: 0.2,
              key: 'mat'
            })
          ]
        )
      );
    };

    return (
      <div style={{ position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none' }} aria-hidden>
        <Canvas frameloop="demand" gl={{ antialias: true }} camera={{ fov: 55, position: [0, 0, 6] }}>
          {/* @ts-ignore */}
          <ambientLight intensity={0.5} />
          {/* @ts-ignore */}
          <pointLight position={[3, 4, 5]} intensity={1.2} color="#8aa2ff" />
          <RotatingGlow />
        </Canvas>
      </div>
    );
  };

  const HeroVectors: React.FC = () => {
    return (
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 1 }} aria-hidden>
        {/* Animated SVG lines */}
        <motion.svg width="280" height="180" viewBox="0 0 280 180" style={{ position: 'absolute', left: '4%', top: '18%', opacity: 0.25 }} initial={{ opacity: 0 }} animate={{ opacity: 0.25, y: [0, -6, 0] }} transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}>
          <defs>
            <linearGradient id="g1" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#8aa2ff" />
              <stop offset="100%" stopColor="#384bff" />
            </linearGradient>
          </defs>
          <path d="M0 90 Q70 10 140 90 T280 90" fill="none" stroke="url(#g1)" strokeWidth="2" />
        </motion.svg>
        {/* Floating gradient circle */}
        <motion.div style={{ position: 'absolute', left: '10%', bottom: '12%', width: 120, height: 120, borderRadius: '50%', background: 'radial-gradient(circle at 30% 30%, rgba(56,75,255,0.35), rgba(56,75,255,0.05))', filter: 'blur(0.5px)' }} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 0.6, scale: [0.95, 1, 0.95] }} transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }} />
      </div>
    );
  };

  // Page/body subtle 3D background (fixed behind content)
  const Page3DBackground: React.FC = () => {
    const { Canvas, useFrame } = threeModules;
    if (!Canvas || !useFrame || !canUseWebGL) return null;

    const SlowSpin: React.FC<{ position: [number, number, number]; color: string; scale?: number; geo: 'box' | 'ico' | 'torus'; }>
      = ({ position, color, scale = 1, geo }) => {
      const ref = useRef<any>(null);
      useFrame(() => {
        if (!ref.current) return;
        ref.current.rotation.y += 0.0008;
        ref.current.rotation.x += 0.0004;
      });
      const geometry = geo === 'box' ? 'boxGeometry' : (geo === 'ico' ? 'icosahedronGeometry' : 'torusKnotGeometry');
      return React.createElement(
        'mesh',
        { ref, position, scale },
        [
          React.createElement(geometry as any, { args: geo === 'torus' ? [0.6, 0.18, 64, 16] : (geo === 'ico' ? [0.8, 0] : [1, 1, 1]), key: 'g' }),
          React.createElement('meshPhysicalMaterial', { color, roughness: 0.6, metalness: 0.2, clearcoat: 0.6, clearcoatRoughness: 0.6, key: 'm' })
        ]
      );
    };

    return (
      <div style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none' }} aria-hidden>
        <Canvas frameloop="demand" gl={{ antialias: true }} camera={{ fov: 60, position: [0, 0, 8] }}>
          {React.createElement('ambientLight', { intensity: 0.35 })}
          {React.createElement('pointLight', { position: [-6, 8, 6], intensity: 0.6, color: '#8aa2ff' })}
          {/* Dispersed slow spinners */}
          <SlowSpin position={[-5, -2, -5]} color="#8aa2ff" scale={0.9} geo="ico" />
          <SlowSpin position={[6, 3, -6]} color="#384bff" scale={0.8} geo="torus" />
          <SlowSpin position={[0, -4, -7]} color="#9aaeff" scale={0.7} geo="box" />
        </Canvas>
      </div>
    );
  };

  // Decorative 3D canvases in section corners
  const SectionCorner3D: React.FC = () => {
    const { Canvas, useFrame } = threeModules;
    if (!Canvas || !useFrame || !canUseWebGL || !renderSecondary3D) return null;
    const CornerSpin: React.FC<{ color: string }>= ({ color }) => {
      const ref = useRef<any>(null);
      useFrame(() => { if (ref.current) ref.current.rotation.z += 0.002; });
      return React.createElement('mesh', { ref }, [
        React.createElement('octahedronGeometry', { args: [0.6, 0], key: 'g' }),
        React.createElement('meshStandardMaterial', { color, metalness: 0.3, roughness: 0.4, key: 'm' })
      ]);
    };
    return (
      <>
        <div style={{ position: 'absolute', left: 0, top: 0, width: 160, height: 160, pointerEvents: 'none', opacity: 0.25 }} aria-hidden>
          <Canvas frameloop="demand" gl={{ antialias: true }} camera={{ fov: 60, position: [0, 0, 4] }}>
            {React.createElement('ambientLight', { intensity: 0.5 })}
            <CornerSpin color="#8aa2ff" />
          </Canvas>
        </div>
        <div style={{ position: 'absolute', right: 0, bottom: 0, width: 160, height: 160, pointerEvents: 'none', opacity: 0.2 }} aria-hidden>
          <Canvas frameloop="demand" gl={{ antialias: true }} camera={{ fov: 60, position: [0, 0, 4] }}>
            {React.createElement('ambientLight', { intensity: 0.5 })}
            <CornerSpin color="#384bff" />
          </Canvas>
        </div>
      </>
    );
  };

  return (
    <>
      {/* Page-wide subtle 3D background or CSS fallback */}
      {canUseWebGL && !threeFailed && enable3D ? (
        <CanvasErrorBoundary onError={() => setThreeFailed(true)}>
          <Suspense fallback={null}>
            <Page3DBackground />
          </Suspense>
        </CanvasErrorBoundary>
      ) : (
        <div aria-hidden style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none', background: 'radial-gradient(1200px 600px at 80% 20%, rgba(56,75,255,0.08), transparent), radial-gradient(1000px 500px at 10% 80%, rgba(136,160,255,0.10), transparent)' }} />
      )}
      <SeoHelmet 
        title={`${service.title} | Tanasvi Technologies`} 
        description={service.overview || service.description || `Professional ${service.title.toLowerCase()} services by Tanasvi Technologies. Experience cutting-edge solutions tailored to your business needs.`} 
        keywords={`${service.title}, Tanasvi Technologies, ${service.slug.replace(/-/g, ' ')}, ${service.offerings?.slice(0, 3).join(', ')}`}
        ogImage={image} 
      />

      {/* Hero (reuse project banner styles for consistency) */}
      <section className="project-banner-cyient" style={{ backgroundImage: `url(${image})`, position: 'relative', overflow: 'hidden' }}>
        {/* 3D background layer */}
        <Suspense fallback={null}>
          <Hero3DBackground />
        </Suspense>
        {/* Vector overlays */}
        <Suspense fallback={null}>
          <HeroVectors />
        </Suspense>
        <div className="container">
          <div className="banner-content">
            <p className="breadcrumb-link"><Link to="/service">Services</Link> / {service.title}</p>
            <h1>{title}</h1>
          </div>
        </div>

        {/* Floating service icon badge (subtle loop) */}
        <motion.img
          src={service.icon}
          alt={`${service.title} service icon badge`}
          initial={{ opacity: 0, y: -6, scale: 0.9 }}
          animate={{ opacity: 0.9, y: [0, -8, 0], scale: 1 }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
          style={{ position: 'absolute', right: '6%', top: '14%', width: 54, height: 54, zIndex: 1, filter: 'drop-shadow(0 6px 16px rgba(56,75,255,0.35))' }}
        />
      </section>

      {/* Content Sections (overview, offerings, why choose) */}
      <section className="content-section-cyient section-padding" style={{ position: 'relative' }}>
        {/* Section decorative 3D in corners */}
        <Suspense fallback={null}>
          <SectionCorner3D />
        </Suspense>
        <div className="container">
          <div className="alternating-content-block" style={{ background: 'linear-gradient(180deg, rgba(136,160,255,0.08) 0%, rgba(255,255,255,0) 100%), radial-gradient(800px 400px at 10% 20%, rgba(56,75,255,0.06), transparent)', borderRadius: 16 }}>
            <div className="row align-items-center">
              <motion.div className="col-lg-6" initial={{ opacity: 0, x: -50, scale: 0.98 }} whileInView={{ opacity: 1, x: 0, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
                <div className="content-image-wrapper">
                  <img src={sectionImages[0] || service.icon} alt={`${service.title} - Overview and expertise illustration`} className="content-image" />
                </div>
              </motion.div>
              <motion.div className="col-lg-6" initial={{ opacity: 0, scale: 0.98 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.15 }}>
                <div className="content-text">
                  <h3 style={{ position: 'relative', display: 'inline-block' }}>
                    Overview
                    <span style={{ position: 'absolute', left: 0, right: 0, bottom: -6, height: 3, borderRadius: 3, background: 'linear-gradient(90deg, #88a0ff, #384bff)' }} />
                  </h3>
                  {service.overview && (
                    <motion.p initial={{ opacity: 0, y: 8 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.1 }}
                      style={{ background: 'rgba(56,75,255,0.04)', border: '1px solid rgba(56,75,255,0.12)', borderLeft: '4px solid #384bff', padding: '14px 16px', borderRadius: 10, marginTop: 18 }}>
                      {service.overview}
                    </motion.p>
                  )}
                  {content?.map((p, i) => (
                    <motion.p key={i} initial={{ opacity: 0, y: 8 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.45, delay: 0.08 * i }}
                      style={{ background: 'linear-gradient(180deg, rgba(56,75,255,0.03), rgba(255,255,255,0))', padding: '12px 14px', borderRadius: 10, border: '1px solid rgba(136,160,255,0.14)', marginTop: 12 }}>
                      {p}
                    </motion.p>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
          {/* Divider animation */}
          <motion.div initial={{ opacity: 0, width: '0%' }} whileInView={{ opacity: 1, width: '100%' }} viewport={{ once: true }} transition={{ duration: 0.8 }} style={{ height: 2, background: 'linear-gradient(90deg, rgba(136,160,255,0.2), rgba(56,75,255,0.6), rgba(136,160,255,0.2))', borderRadius: 2, margin: '24px 0' }} />

          {(service.offerings && service.offerings.length > 0) && (
            <div className="alternating-content-block" style={{ background: 'linear-gradient(180deg, rgba(56,75,255,0.06) 0%, rgba(255,255,255,0) 100%), radial-gradient(700px 380px at 90% 30%, rgba(136,160,255,0.08), transparent)', borderRadius: 16 }}>
              <div className="row align-items-center flex-row-reverse">
                <motion.div className="col-lg-6" initial={{ opacity: 0, x: 50, scale: 0.98 }} whileInView={{ opacity: 1, x: 0, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
                  <div className="content-image-wrapper">
                    <img src={sectionImages[1] || image} alt={`${service.title} - Key Features and Capabilities`} className="content-image" />
                  </div>
                </motion.div>
                <motion.div className="col-lg-6" initial={{ opacity: 0, scale: 0.98 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.15 }}>
                  <div className="content-text">
                    <h3 style={{ position: 'relative', display: 'inline-block' }}>
                      Key Features
                      <span style={{ position: 'absolute', left: 0, right: 0, bottom: -6, height: 3, borderRadius: 3, background: 'linear-gradient(90deg, #88a0ff, #384bff)' }} />
                    </h3>
                    <ul style={{ listStyle: 'none', padding: 0, marginTop: 16 }}>
                      {service.offerings.map((item, idx) => (
                        <motion.li key={idx} initial={{ opacity: 0, x: 8 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: 0.08 * idx }}
                          style={{ display: 'flex', alignItems: 'flex-start', gap: 12, background: 'rgba(56,75,255,0.035)', border: '1px solid rgba(136,160,255,0.18)', borderRadius: 12, padding: '10px 12px', marginBottom: 10 }}>
                          <i className="fas fa-check-circle" style={{ color: '#384bff', marginTop: 2 }}></i>
                          <span>{item}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              </div>
            </div>
          )}

          <motion.div initial={{ opacity: 0, width: '0%' }} whileInView={{ opacity: 1, width: '100%' }} viewport={{ once: true }} transition={{ duration: 0.8 }} style={{ height: 2, background: 'linear-gradient(90deg, rgba(136,160,255,0.2), rgba(56,75,255,0.6), rgba(136,160,255,0.2))', borderRadius: 2, margin: '24px 0' }} />

          {(service.whyChooseUs && service.whyChooseUs.length > 0) && (
            <div className="alternating-content-block" style={{ background: 'linear-gradient(180deg, rgba(136,160,255,0.06) 0%, rgba(255,255,255,0) 100%), radial-gradient(600px 360px at 15% 70%, rgba(56,75,255,0.07), transparent)', borderRadius: 16 }}>
              <div className="row align-items-center">
                <motion.div className="col-lg-6" initial={{ opacity: 0, x: -50, scale: 0.98 }} whileInView={{ opacity: 1, x: 0, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
                  <div className="content-text">
                    <h3 style={{ position: 'relative', display: 'inline-block' }}>
                      Why Choose Us
                      <span style={{ position: 'absolute', left: 0, right: 0, bottom: -6, height: 3, borderRadius: 3, background: 'linear-gradient(90deg, #88a0ff, #384bff)' }} />
                    </h3>
                    <ul style={{ listStyle: 'none', padding: 0, marginTop: 16 }}>
                      {service.whyChooseUs.map((item, idx) => (
                        <motion.li key={idx} initial={{ opacity: 0, x: 8 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: 0.08 * idx }}
                          style={{ display: 'flex', alignItems: 'flex-start', gap: 12, background: 'rgba(56,75,255,0.035)', border: '1px solid rgba(136,160,255,0.18)', borderRadius: 12, padding: '10px 12px', marginBottom: 10 }}>
                          <i className="fas fa-star" style={{ color: '#88a0ff', marginTop: 2 }}></i>
                          <span>{item}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
                <motion.div className="col-lg-6" initial={{ opacity: 0, scale: 0.98 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.15 }}>
                  <div className="content-image-wrapper">
                    <img src={sectionImages[2] || sectionImages[0] || service.icon} alt={`${service.title} - Why Choose Us Benefits`} className="content-image" />
                  </div>
                </motion.div>
              </div>
            </div>
          )}

          {service.mission && (
            <motion.div className="alternating-content-block" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} style={{ background: 'linear-gradient(180deg, rgba(56,75,255,0.05) 0%, rgba(255,255,255,0) 100%), radial-gradient(700px 380px at 80% 80%, rgba(136,160,255,0.08), transparent)', borderRadius: 16 }}>
              <div className="content-text text-center">
                <h3 style={{ position: 'relative', display: 'inline-block' }}>
                  Our Mission
                  <span style={{ position: 'absolute', left: 0, right: 0, bottom: -6, height: 3, borderRadius: 3, background: 'linear-gradient(90deg, #88a0ff, #384bff)' }} />
                </h3>
                <p style={{ maxWidth: 820, margin: '16px auto 0', background: 'rgba(56,75,255,0.04)', border: '1px solid rgba(56,75,255,0.12)', borderLeft: '4px solid #384bff', padding: '16px 18px', borderRadius: 12 }}>
                  {service.mission}
                </p>
              </div>
            </motion.div>
          )}

          <motion.div className="text-center mt-5" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.5 }} style={{ position: 'relative', display: 'flex', justifyContent: 'center' }}>
            {/* Pulsing gradient glow behind CTA */}
            <motion.div aria-hidden style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 0 }}>
              <motion.div style={{ width: 260, height: 56, borderRadius: 20, background: 'radial-gradient(circle at 50% 50%, rgba(56,75,255,0.35), rgba(56,75,255,0))' }} animate={{ opacity: [0.3, 0.6, 0.3], scale: [0.98, 1.02, 0.98] }} transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }} />
            </motion.div>
            <motion.div whileHover={{ y: -2, scale: 1.02, boxShadow: '0 14px 30px rgba(56,75,255,0.35)' }} transition={{ duration: 0.25 }} style={{ position: 'relative', zIndex: 1 }}>
              <Link to="/contact" className="btn-modern">Discuss Your Requirements</Link>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default ServiceDetailTemplate;


