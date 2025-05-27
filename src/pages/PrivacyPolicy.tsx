import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useTranslation } from 'react-i18next';

const PrivacyPolicy = () => {
  const { t } = useTranslation();
  const currentDate = new Date();
  const currentYear = 2024; // Fixed year
  const currentMonth = currentDate.getMonth();
  
  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100 transition-colors duration-300">
      <Navbar />
      <div className="pt-20 flex-grow"> {/* Add padding to account for fixed navbar */}
        <div className="max-w-4xl mx-auto px-4 py-12">
          <h1 className="text-3xl font-bold mb-8">{t('privacyPolicy.title')}</h1>
          <p className="mb-4 text-sm text-gray-500 dark:text-gray-400">
            {t('privacyPolicy.lastUpdated', { month: t(`months.${currentMonth}`), year: currentYear })}
          </p>
          
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">{t('privacyPolicy.sections.introduction.title')}</h2>
            <p className="mb-4">
              {t('privacyPolicy.sections.introduction.content1')}
            </p>
            <p className="mb-4">
              {t('privacyPolicy.sections.introduction.content2')}
            </p>
          </section>
          
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">{t('privacyPolicy.sections.informationCollect.title')}</h2>
            <p className="mb-4">
              {t('privacyPolicy.sections.informationCollect.intro')}
            </p>
            <h3 className="text-xl font-medium mb-2">{t('privacyPolicy.sections.informationCollect.personalTitle')}</h3>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              {Array.isArray(t('privacyPolicy.sections.informationCollect.personalItems', { returnObjects: true })) && 
                (t('privacyPolicy.sections.informationCollect.personalItems', { returnObjects: true }) as string[]).map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
            </ul>
            
            <h3 className="text-xl font-medium mb-2">{t('privacyPolicy.sections.informationCollect.nonPersonalTitle')}</h3>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              {Array.isArray(t('privacyPolicy.sections.informationCollect.nonPersonalItems', { returnObjects: true })) && 
                (t('privacyPolicy.sections.informationCollect.nonPersonalItems', { returnObjects: true }) as string[]).map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
            </ul>
          </section>
          
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">{t('privacyPolicy.sections.howCollect.title')}</h2>
            <p className="mb-4">
              {t('privacyPolicy.sections.howCollect.intro')}
            </p>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              {Array.isArray(t('privacyPolicy.sections.howCollect.items', { returnObjects: true })) && 
                (t('privacyPolicy.sections.howCollect.items', { returnObjects: true }) as string[]).map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
            </ul>
          </section>
          
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">{t('privacyPolicy.sections.howUse.title')}</h2>
            <p className="mb-4">
              {t('privacyPolicy.sections.howUse.intro')}
            </p>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              {Array.isArray(t('privacyPolicy.sections.howUse.items', { returnObjects: true })) && 
                (t('privacyPolicy.sections.howUse.items', { returnObjects: true }) as string[]).map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
            </ul>
          </section>
          
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">{t('privacyPolicy.sections.cookies.title')}</h2>
            <p className="mb-4">
              {t('privacyPolicy.sections.cookies.content1')}
            </p>
            <p className="mb-4">
              {t('privacyPolicy.sections.cookies.content2')}
            </p>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              {Array.isArray(t('privacyPolicy.sections.cookies.items', { returnObjects: true })) && 
                (t('privacyPolicy.sections.cookies.items', { returnObjects: true }) as string[]).map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
            </ul>
            <p className="mb-4">
              {t('privacyPolicy.sections.cookies.content3')}
            </p>
          </section>
          
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">{t('privacyPolicy.sections.disclosure.title')}</h2>
            <p className="mb-4">
              {t('privacyPolicy.sections.disclosure.intro')}
            </p>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              {Array.isArray(t('privacyPolicy.sections.disclosure.items', { returnObjects: true })) && 
                (t('privacyPolicy.sections.disclosure.items', { returnObjects: true }) as Array<{title: string, description: string}>).map((item, index) => (
                  <li key={index}>
                    <span className="font-semibold">{item.title}:</span> {item.description}
                  </li>
                ))}
            </ul>
          </section>
          
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">{t('privacyPolicy.sections.security.title')}</h2>
            <p className="mb-4">
              {t('privacyPolicy.sections.security.content')}
            </p>
          </section>
          
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">{t('privacyPolicy.sections.rights.title')}</h2>
            <p className="mb-4">
              {t('privacyPolicy.sections.rights.content1')}
            </p>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              {Array.isArray(t('privacyPolicy.sections.rights.items', { returnObjects: true })) && 
                (t('privacyPolicy.sections.rights.items', { returnObjects: true }) as string[]).map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
            </ul>
            <p className="mb-4">
              {t('privacyPolicy.sections.rights.content2')}
            </p>
          </section>
          
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">{t('privacyPolicy.sections.children.title')}</h2>
            <p className="mb-4">
              {t('privacyPolicy.sections.children.content')}
            </p>
          </section>
          
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">{t('privacyPolicy.sections.changes.title')}</h2>
            <p className="mb-4">
              {t('privacyPolicy.sections.changes.content')}
            </p>
          </section>
          
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">{t('privacyPolicy.sections.contact.title')}</h2>
            <p className="mb-4">
              {t('privacyPolicy.sections.contact.content')}
            </p>
            <ul className="list-none mb-4 space-y-2">
              <li><strong>{t('privacyPolicy.sections.contact.email')}</strong> support@techpals.com</li>
              <li><strong>{t('privacyPolicy.sections.contact.phone')}</strong> {t('common.phoneNumber')}</li>
              <li><strong>{t('privacyPolicy.sections.contact.address')}</strong> 123 Tech Street, Scranton, PA 18503</li>
            </ul>
          </section>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default PrivacyPolicy;
