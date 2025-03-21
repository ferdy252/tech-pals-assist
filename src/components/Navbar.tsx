import React, { useState, useEffect } from 'react';
import { Computer, Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Link } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/ThemeToggle';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import { useTranslation } from 'react-i18next';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user, signOut } = useAuth();
  const { t } = useTranslation();

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
    { name: t('navbar.home'), href: '/', isLink: true },
    { name: t('navbar.services'), href: '/services', isLink: true },
    { name: t('navbar.about'), href: '/about', isLink: true },
    { name: t('navbar.contact'), href: '/contact', isLink: true },
  ];

  return (
    <nav
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out py-4 px-6 md:px-12',
        {
          'bg-white/90 dark:bg-gray-900/90 shadow-sm backdrop-blur-md': isScrolled,
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
            {t('common.companyName')}
          </span>
        </Link>

        {/* Desktop navigation */}
        <div className="hidden md:flex space-x-8">
          {navItems.map((item) => (
            item.isLink ? (
              <Link
                key={item.name}
                to={item.href}
                className="text-gray-700 dark:text-gray-200 hover:text-blue-500 dark:hover:text-blue-400 transition-colors duration-200 text-sm font-medium"
              >
                {item.name}
              </Link>
            ) : (
              <a
                key={item.name}
                href={item.href}
                className="text-gray-700 dark:text-gray-200 hover:text-blue-500 dark:hover:text-blue-400 transition-colors duration-200 text-sm font-medium"
              >
                {item.name}
              </a>
            )
          ))}
        </div>

        {/* Auth buttons and theme toggle (desktop) */}
        <div className="hidden md:flex items-center space-x-4">
          <LanguageSwitcher />
          <ThemeToggle />
          {user ? (
            <>
              <Link to="/dashboard">
                <Button variant="ghost" size="sm">{t('navbar.dashboard')}</Button>
              </Link>
              <Button variant="ghost" size="sm" onClick={signOut}>{t('navbar.signOut')}</Button>
            </>
          ) : (
            <Link to="/auth">
              <Button className="bg-blue-500 hover:bg-blue-600 text-white px-5 py-2 rounded-full text-sm font-medium transition-all duration-200 ease-in-out transform hover:scale-105 shadow-sm">
                {t('navbar.signInRegister')}
              </Button>
            </Link>
          )}
        </div>

        {/* Mobile menu button */}
        <div className="flex items-center space-x-2 md:hidden">
          <LanguageSwitcher />
          <ThemeToggle />
          <button 
            className="text-gray-700 dark:text-gray-200 focus:outline-none"
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
      </div>

      {/* Mobile menu */}
      <div
        className={cn(
          'fixed inset-0 bg-white dark:bg-gray-900 z-40 pt-20 px-6 transform transition-transform duration-300 ease-in-out md:hidden',
          {
            'translate-x-0': isMobileMenuOpen,
            'translate-x-full': !isMobileMenuOpen,
          }
        )}
      >
        <div className="flex flex-col space-y-6">
          {navItems.map((item) => (
            item.isLink ? (
              <Link
                key={item.name}
                to={item.href}
                className="text-gray-700 dark:text-gray-200 hover:text-blue-500 dark:hover:text-blue-400 text-lg font-medium transition-colors duration-200"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item.name}
              </Link>
            ) : (
              <a
                key={item.name}
                href={item.href}
                className="text-gray-700 dark:text-gray-200 hover:text-blue-500 dark:hover:text-blue-400 text-lg font-medium transition-colors duration-200"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item.name}
              </a>
            )
          ))}
          
          {user ? (
            <>
              <Link 
                to="/dashboard" 
                className="text-gray-700 dark:text-gray-200 hover:text-blue-500 dark:hover:text-blue-400 text-lg font-medium transition-colors duration-200"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {t('navbar.dashboard')}
              </Link>
              <button
                onClick={() => {
                  signOut();
                  setIsMobileMenuOpen(false);
                }}
                className="text-gray-700 dark:text-gray-200 hover:text-blue-500 dark:hover:text-blue-400 text-lg font-medium transition-colors duration-200 text-left"
              >
                {t('navbar.signOut')}
              </button>
            </>
          ) : (
            <Link
              to="/auth"
              className="bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-full text-center font-medium transition-all duration-200 shadow-sm"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {t('navbar.signInRegister')}
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
