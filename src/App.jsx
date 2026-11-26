import React, { useCallback, useEffect, useRef, useState } from 'react';
import { IconSprite } from './components/IconSprite';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { AudiencePaths } from './components/AudiencePaths';
import { About } from './components/About';
import { Services } from './components/Services';
import { CompostProduct } from './components/CompostProduct';
import { ProcessSection } from './components/ProcessSection';
import { FarmCalculator } from './components/FarmCalculator';
import { FaqSection } from './components/FaqSection';
import { Gallery } from './components/Gallery';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';

export default function App() {
  const [activeSection, setActiveSection] = useState('');
  const [hideFab, setHideFab] = useState(true);
  const [prefilledOrder, setPrefilledOrder] = useState(null);
  const heroRef = useRef(null);
  const contactRef = useRef(null);

  const handleApplyEstimate = useCallback((text) => {
    setPrefilledOrder({ text, nonce: Date.now() });
  }, []);

  useEffect(() => {
    // Reveal-on-scroll observer (never hides elements already in the initial viewport so LCP is instant)
    const revealEls = Array.from(document.querySelectorAll('.rv'));
    const vh = window.innerHeight || 800;
    const revealObs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.remove('rv-wait');
          entry.target.classList.add('in');
          revealObs.unobserve(entry.target);
        });
      },
      { rootMargin: '80px 0px', threshold: 0.04 }
    );
    revealEls.forEach((el) => {
      const rect = el.getBoundingClientRect();
      if (rect.top < vh * 1.15) {
        el.classList.add('in');
      } else {
        el.classList.add('rv-wait');
        revealObs.observe(el);
      }
    });

    // Active navigation link observer (clears active underline when back at top hero)
    const navObs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          if (entry.target === heroRef.current) {
            setActiveSection('');
          } else if (entry.target.id) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: '-40% 0px -55% 0px' }
    );
    if (heroRef.current) navObs.observe(heroRef.current);
    document.querySelectorAll('section[id]').forEach((sec) => navObs.observe(sec));

    // Floating mobile CTA visibility observer
    const fabHiddenTargets = new Set();
    const fabObs = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) fabHiddenTargets.add(entry.target);
        else fabHiddenTargets.delete(entry.target);
      });
      setHideFab(fabHiddenTargets.size > 0);
    });
    if (heroRef.current) fabObs.observe(heroRef.current);
    if (contactRef.current) fabObs.observe(contactRef.current);

    // Pause CSS animations when tab is hidden
    const onVisibility = () => {
      document.documentElement.classList.toggle('hid', document.hidden);
    };
    document.addEventListener('visibilitychange', onVisibility);

    return () => {
      revealObs.disconnect();
      navObs.disconnect();
      fabObs.disconnect();
      document.removeEventListener('visibilitychange', onVisibility);
    };
  }, []);

  return (
    <>
      <IconSprite />
      <Header activeSection={activeSection} />

      <main id="top">
        <Hero heroRef={heroRef} />
        <AudiencePaths />
        <About />
        <Services />
        <CompostProduct />
        <ProcessSection />
        <FarmCalculator onApplyEstimate={handleApplyEstimate} />
        <FaqSection />
        <Gallery />
        <Contact contactRef={contactRef} prefilledOrder={prefilledOrder} />
      </main>

      <Footer />

      <a className={`fab btn btn-green${hideFab ? ' h' : ''}`} id="fab" href="#contact">
        اطلب خدمة
      </a>
    </>
  );
}
