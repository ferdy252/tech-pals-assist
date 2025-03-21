import React from 'react';
import Navbar from '@/components/Navbar';
import About from '@/components/About';
import Footer from '@/components/Footer';
import { useTranslation } from 'react-i18next';

const AboutPage = () => {
  const { t } = useTranslation();
  
  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100 transition-colors duration-300">
      <Navbar />
      <div className="pt-20"> {/* Add padding to account for fixed navbar */}
        <About />
        
        {/* Additional About Content */}
        <section className="py-16 px-6 md:px-12 bg-white dark:bg-gray-900">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div>
                <h2 className="text-2xl font-bold mb-6 dark:text-white">{t('aboutPage.additionalSections.mission.title')}</h2>
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  {t('aboutPage.additionalSections.mission.description1')}
                </p>
                <p className="text-gray-600 dark:text-gray-300">
                  {t('aboutPage.additionalSections.mission.description2')}
                </p>
              </div>
              
              <div>
                <h2 className="text-2xl font-bold mb-6 dark:text-white">{t('aboutPage.additionalSections.story.title')}</h2>
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  {t('aboutPage.additionalSections.story.description1')}
                </p>
                <p className="text-gray-600 dark:text-gray-300">
                  {t('aboutPage.additionalSections.story.description2')}
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
