import React, { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Services from '@/components/Services';
import Testimonials from '@/components/Testimonials';
import Footer from '@/components/Footer';

const Index = () => {
  useEffect(() => {
    // Apply animation classes on component mount
    document.querySelectorAll('.appear-done > *').forEach((el) => {
      el.classList.add('opacity-0');
    });

    // Intersection Observer to trigger animations when elements come into view
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-fade-in');
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    // Observe all sections
    document.querySelectorAll('section').forEach((section) => {
      observer.observe(section);
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <Hero />
      <Services />
      <Testimonials />
      <Footer />
    </div>
  );
};

export default Index;
