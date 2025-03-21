import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Linkedin, Mail, MapPin, Phone } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const Footer = () => {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white pt-16 pb-8 px-6 md:px-12">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Company Info */}
          <div>
            <Link to="/" className="flex items-center mb-6">
              <img src="/images/logo-white.svg" alt="TechPals" className="h-8 w-auto" />
              <span className="ml-2 text-xl font-bold">{t('common.companyName')}</span>
            </Link>
            <p className="text-gray-400 mb-6">
              {t('footer.description')}
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Linkedin size={20} />
              </a>
            </div>
          </div>
          
          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold mb-6">{t('footer.services')}</h3>
            <ul className="space-y-4">
              <li>
                <Link to="/services/smartphone-repair" className="text-gray-400 hover:text-white transition-colors">
                  {t('footer.serviceItems.smartphoneRepair')}
                </Link>
              </li>
              <li>
                <Link to="/services/computer-troubleshooting" className="text-gray-400 hover:text-white transition-colors">
                  {t('footer.serviceItems.computerTroubleshooting')}
                </Link>
              </li>
              <li>
                <Link to="/services/home-network-setup" className="text-gray-400 hover:text-white transition-colors">
                  {t('footer.serviceItems.homeNetworkSetup')}
                </Link>
              </li>
              <li>
                <Link to="/services/tech-consultation" className="text-gray-400 hover:text-white transition-colors">
                  {t('footer.serviceItems.techConsultation')}
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Company */}
          <div>
            <h3 className="text-lg font-semibold mb-6">{t('footer.company')}</h3>
            <ul className="space-y-4">
              <li>
                <Link to="/about" className="text-gray-400 hover:text-white transition-colors">
                  {t('footer.companyItems.aboutUs')}
                </Link>
              </li>
              <li>
                <Link to="/testimonials" className="text-gray-400 hover:text-white transition-colors">
                  {t('footer.companyItems.testimonials')}
                </Link>
              </li>
              <li>
                <Link to="/privacy-policy" className="text-gray-400 hover:text-white transition-colors">
                  {t('footer.companyItems.privacyPolicy')}
                </Link>
              </li>
              <li>
                <Link to="/terms-of-service" className="text-gray-400 hover:text-white transition-colors">
                  {t('footer.companyItems.termsOfService')}
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-6">{t('footer.contact')}</h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <MapPin size={20} className="text-gray-400 mr-3 mt-1 flex-shrink-0" />
                <span className="text-gray-400">{t('footer.location')}</span>
              </li>
              <li className="flex items-start">
                <Mail size={20} className="text-gray-400 mr-3 mt-1 flex-shrink-0" />
                <a href="mailto:support@techpals.com" className="text-gray-400 hover:text-white transition-colors">
                  {t('footer.email')}
                </a>
              </li>
              <li className="flex items-start">
                <Phone size={20} className="text-gray-400 mr-3 mt-1 flex-shrink-0" />
                <a href="tel:5705352472" className="text-gray-400 hover:text-white transition-colors">
                  {t('common.phoneNumber')}
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm mb-4 md:mb-0">
            &copy; {currentYear} {t('common.companyName')}. {t('footer.allRightsReserved')}
          </p>
          <div className="flex space-x-6">
            <Link to="/privacy-policy" className="text-gray-500 hover:text-white text-sm transition-colors">
              {t('footer.companyItems.privacyPolicy')}
            </Link>
            <Link to="/terms-of-service" className="text-gray-500 hover:text-white text-sm transition-colors">
              {t('footer.companyItems.termsOfService')}
            </Link>
            <Link to="/cookie-policy" className="text-gray-500 hover:text-white text-sm transition-colors">
              {t('footer.cookiePolicy')}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
