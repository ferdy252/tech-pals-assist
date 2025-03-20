
import React, { useEffect, useState } from 'react';
import { ArrowRight, Smartphone, Computer, Network, HelpCircle } from 'lucide-react';

const Hero = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section 
      id="home" 
      className="min-h-screen w-full flex flex-col items-center justify-center pt-16 px-6 md:px-12"
    >
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className="order-2 lg:order-1">
          <div className="appear-done">
            <div className="delay-0">
              <span className="inline-block bg-blue-100 text-blue-700 px-4 py-1 rounded-full text-sm font-medium mb-4 animate-slide-right">
                Professional Tech Support Services
              </span>
            </div>
            <h1 className="delay-1 font-bold text-gray-900 leading-tight mb-6">
              Expert Tech Solutions <br className="hidden sm:block" />
              <span className="bg-gradient-to-r from-blue-500 to-blue-700 bg-clip-text text-transparent">When You Need Them</span>
            </h1>
            <p className="delay-2 text-gray-600 text-lg mb-8 max-w-lg">
              We provide fast, reliable tech support for all your devices. From smartphone repairs to home network setups, we've got you covered.
            </p>
            
            <div className="delay-3 flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 mb-12">
              <a 
                href="#services" 
                className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-full inline-flex items-center justify-center font-medium transition-all duration-300 transform hover:scale-105 shadow-md group"
              >
                Explore Services
                <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </a>
              <a 
                href="#contact" 
                className="glass text-gray-800 hover:text-blue-600 px-6 py-3 rounded-full inline-flex items-center justify-center font-medium transition-all duration-300 hover:bg-white/90"
              >
                Get in Touch
              </a>
            </div>
          </div>
          
          <div className="delay-4 grid grid-cols-2 gap-4 sm:flex sm:space-x-6 sm:space-y-0">
            {[
              { icon: <Smartphone className="h-6 w-6 text-blue-500" />, text: 'Smartphone Repairs' },
              { icon: <Computer className="h-6 w-6 text-blue-500" />, text: 'Computer Troubleshooting' },
              { icon: <Network className="h-6 w-6 text-blue-500" />, text: 'Network Setup' },
              { icon: <HelpCircle className="h-6 w-6 text-blue-500" />, text: 'Tech Consultations' },
            ].map((item, index) => (
              <div key={index} className="flex items-center space-x-2 animate-slide-up" style={{ animationDelay: `${index * 0.1 + 0.5}s` }}>
                {item.icon}
                <span className="text-sm text-gray-600 font-medium">{item.text}</span>
              </div>
            ))}
          </div>
        </div>
        
        <div className="order-1 lg:order-2 flex justify-center">
          <div className="relative w-full max-w-md">
            <div className="absolute inset-0 bg-blue-100 rounded-full filter blur-3xl opacity-20 animate-pulse" style={{ animationDuration: '4s' }}></div>
            <div className="relative glass rounded-3xl overflow-hidden border border-white/20 shadow-xl transform transition-all duration-700 animate-float">
              <div className="aspect-[4/3] bg-gradient-to-br from-blue-50 to-blue-100 p-8 flex items-center justify-center">
                <div className="relative bg-white rounded-2xl p-6 shadow-lg transform transition-all duration-500 hover:scale-105">
                  <div className="flex justify-center mb-4">
                    <div className="p-4 bg-blue-500 text-white rounded-2xl">
                      <Computer className="h-12 w-12" />
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold text-center mb-2">Tech Support</h3>
                  <p className="text-gray-600 text-center text-sm">Expert assistance for all your tech needs</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce hidden md:block">
        <div className="w-8 h-12 rounded-full border-2 border-gray-300 flex justify-center items-start p-1">
          <div className="w-1 h-3 bg-gray-300 rounded-full animate-[slideDown_1.5s_infinite]"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
