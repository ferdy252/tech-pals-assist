import React from 'react';
import Navbar from '@/components/Navbar';
import About from '@/components/About';
import Footer from '@/components/Footer';

const AboutPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="pt-20"> {/* Add padding to account for fixed navbar */}
        <About />
        
        {/* Additional About Content */}
        <section className="py-16 px-6 md:px-12 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div>
                <h2 className="text-2xl font-bold mb-6">Our Mission</h2>
                <p className="text-gray-600 mb-6">
                  At Tech Pals, our mission is to provide affordable, reliable tech support services to the Scranton community. 
                  We believe that everyone deserves access to quality technical assistance without breaking the bank.
                </p>
                <p className="text-gray-600">
                  We strive to demystify technology and empower our customers with the knowledge and tools they need 
                  to get the most out of their devices and systems.
                </p>
              </div>
              
              <div>
                <h2 className="text-2xl font-bold mb-6">Our Story</h2>
                <p className="text-gray-600 mb-6">
                  Tech Pals was founded by a group of tech enthusiasts who saw a need for honest, straightforward 
                  tech support in the Scranton area. We started small, helping friends and family with their computer issues, 
                  and grew through word-of-mouth as people appreciated our no-nonsense approach.
                </p>
                <p className="text-gray-600">
                  Today, we're proud to serve the entire Scranton community with the same level of care and attention 
                  that we'd give to our own family members. Our team has grown, but our values remain the same: honesty, 
                  affordability, and a genuine desire to help.
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </div>
  );
};

export default AboutPage;
