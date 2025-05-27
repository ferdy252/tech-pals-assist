import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useTranslation } from 'react-i18next';

const TermsOfService = () => {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();
  
  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100 transition-colors duration-300">
      <Navbar />
      <div className="pt-20 flex-grow"> {/* Add padding to account for fixed navbar */}
        <div className="max-w-4xl mx-auto px-4 py-12">
          <h1 className="text-3xl font-bold mb-8">{t('termsOfService.title')}</h1>
          <p className="mb-4 text-sm text-gray-500 dark:text-gray-400">
            {t('termsOfService.lastUpdated')} {currentYear}
          </p>
          
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">{t('termsOfService.sections.introduction.title')}</h2>
            <p className="mb-4">
              {t('termsOfService.sections.introduction.content')}
            </p>
          </section>
          
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">{t('termsOfService.sections.servicesDescription.title')}</h2>
            <p className="mb-4">
              {t('termsOfService.sections.servicesDescription.content')}
            </p>
          </section>
          
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">{t('termsOfService.sections.userAccounts.title')}</h2>
            <p className="mb-4">
              {t('termsOfService.sections.userAccounts.content1')}
            </p>
            <p className="mb-4">
              {t('termsOfService.sections.userAccounts.content2')}
            </p>
          </section>
          
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">{t('termsOfService.sections.appointments.title')}</h2>
            <p className="mb-4">
              {t('termsOfService.sections.appointments.content')}
            </p>
            <h3 className="text-xl font-medium mb-2">{t('termsOfService.sections.appointments.cancellationTitle')}</h3>
            <p className="mb-4">
              {t('termsOfService.sections.appointments.cancellationContent')}
            </p>
          </section>
          
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">{t('termsOfService.sections.payment.title')}</h2>
            <p className="mb-4">
              {t('termsOfService.sections.payment.content')}
            </p>
            <h3 className="text-xl font-medium mb-2">{t('termsOfService.sections.payment.refundTitle')}</h3>
            <p className="mb-4">
              {t('termsOfService.sections.payment.refundContent')}
            </p>
          </section>
          
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">{t('termsOfService.sections.guarantees.title')}</h2>
            <p className="mb-4">
              {t('termsOfService.sections.guarantees.content1')}
            </p>
            <p className="mb-4">
              {t('termsOfService.sections.guarantees.content2')}
            </p>
          </section>
          
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">{t('termsOfService.sections.intellectualProperty.title')}</h2>
            <p className="mb-4">
              {t('termsOfService.sections.intellectualProperty.content')}
            </p>
          </section>
          
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">{t('termsOfService.sections.userConduct.title')}</h2>
            <p className="mb-4">
              {t('termsOfService.sections.userConduct.intro')}
            </p>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              {(t('termsOfService.sections.userConduct.items', { returnObjects: true }) as string[]).map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </section>
          
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">{t('termsOfService.sections.limitation.title')}</h2>
            <p className="mb-4">
              {t('termsOfService.sections.limitation.intro')}
            </p>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              {(t('termsOfService.sections.limitation.items', { returnObjects: true }) as string[]).map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </section>
          
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">{t('termsOfService.sections.indemnification.title')}</h2>
            <p className="mb-4">
              {t('termsOfService.sections.indemnification.content')}
            </p>
          </section>
          
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">{t('termsOfService.sections.governingLaw.title')}</h2>
            <p className="mb-4">
              {t('termsOfService.sections.governingLaw.content')}
            </p>
          </section>
          
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">{t('termsOfService.sections.changes.title')}</h2>
            <p className="mb-4">
              {t('termsOfService.sections.changes.content')}
            </p>
          </section>
          
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">{t('termsOfService.sections.contact.title')}</h2>
            <p className="mb-4">
              {t('termsOfService.sections.contact.content')}
            </p>
            <ul className="list-none mb-4 space-y-2">
              <li><strong>{t('termsOfService.sections.contact.email')}</strong> support@techpals.com</li>
              <li><strong>{t('termsOfService.sections.contact.phone')}</strong> {t('common.phoneNumber')}</li>
              <li><strong>{t('termsOfService.sections.contact.address')}</strong> 123 Tech Street, Scranton, PA 18503</li>
            </ul>
          </section>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default TermsOfService;
