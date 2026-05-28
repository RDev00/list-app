//React imports
import { useEffect } from "react";
import Lenis from "lenis";

export default function SmoothProvider() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.6,
      smoothWheel: true,
      wheelMultiplier: 0.9,
      touchMultiplier: 1,
      lerp: 0.08
    });
    
    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return null;
}