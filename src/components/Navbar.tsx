
import React, { useState, useEffect } from 'react';
import { Computer, Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Link } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user, signOut } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const navItems = [
    { name: 'Home', href: '#home' },
    { name: 'Services', href: '#services' },
    { name: 'About', href: '#about' },
    { name: 'Testimonials', href: '#testimonials' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <nav
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out py-4 px-6 md:px-12',
        {
          'bg-white/90 shadow-sm backdrop-blur-md': isScrolled,
          'bg-transparent': !isScrolled,
        }
      )}
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link 
          to="/" 
          className="flex items-center space-x-2 text-xl font-semibold"
          onClick={() => setIsMobileMenuOpen(false)}
        >
          <Computer className="h-6 w-6 text-blue-500" />
          <span className="bg-gradient-to-r from-blue-500 to-blue-700 bg-clip-text text-transparent">
            TechPals
          </span>
        </Link>

        {/* Desktop navigation */}
        <div className="hidden md:flex space-x-8">
          {navItems.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className="text-gray-700 hover:text-blue-500 transition-colors duration-200 text-sm font-medium"
            >
              {item.name}
            </a>
          ))}
        </div>

        {/* Auth buttons (desktop) */}
        <div className="hidden md:flex items-center space-x-4">
          {user ? (
            <>
              <Link to="/dashboard">
                <Button variant="ghost" size="sm">Dashboard</Button>
              </Link>
              <Button variant="ghost" size="sm" onClick={signOut}>Sign Out</Button>
            </>
          ) : (
            <Link to="/auth">
              <Button className="bg-blue-500 hover:bg-blue-600 text-white px-5 py-2 rounded-full text-sm font-medium transition-all duration-200 ease-in-out transform hover:scale-105 shadow-sm">
                Sign In / Register
              </Button>
            </Link>
          )}
        </div>

        {/* Mobile menu button */}
        <button 
          className="md:hidden text-gray-700 focus:outline-none"
          onClick={toggleMobileMenu}
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>
      </div>

      {/* Mobile menu */}
      <div
        className={cn(
          'fixed inset-0 bg-white z-40 pt-20 px-6 transform transition-transform duration-300 ease-in-out md:hidden',
          {
            'translate-x-0': isMobileMenuOpen,
            'translate-x-full': !isMobileMenuOpen,
          }
        )}
      >
        <div className="flex flex-col space-y-6">
          {navItems.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className="text-gray-700 hover:text-blue-500 text-lg font-medium transition-colors duration-200"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {item.name}
            </a>
          ))}
          
          {user ? (
            <>
              <Link 
                to="/dashboard" 
                className="text-gray-700 hover:text-blue-500 text-lg font-medium transition-colors duration-200"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Dashboard
              </Link>
              <button
                onClick={() => {
                  signOut();
                  setIsMobileMenuOpen(false);
                }}
                className="text-gray-700 hover:text-blue-500 text-lg font-medium transition-colors duration-200 text-left"
              >
                Sign Out
              </button>
            </>
          ) : (
            <Link
              to="/auth"
              className="bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-full text-center font-medium transition-all duration-200 shadow-sm"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Sign In / Register
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
