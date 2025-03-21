import React, { useState } from 'react';
import { Phone, Mail, MapPin, Calendar } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const Contact = () => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitSuccess(true);
      
      // Reset form after showing success message
      setTimeout(() => {
        setSubmitSuccess(false);
        setFormData({
          name: '',
          email: '',
          phone: '',
          service: '',
          message: '',
        });
      }, 3000);
    }, 1500);
  };

  return (
    <section id="contact" className="py-24 px-6 md:px-12 bg-blue-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4 animate-slide-up dark:text-white">{t('contactPage.title')}</h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto animate-slide-up" style={{ animationDelay: '0.1s' }}>
            {t('contactPage.description')}
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div
            className="animate-slide-right"
            style={{ animationDelay: '0.2s' }}
          >
            <div className="glass p-8 rounded-2xl h-full border border-white/20 dark:border-gray-700/30">
              <h3 className="text-2xl font-semibold mb-6 dark:text-white">{t('contactPage.contactInfo.title')}</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-8">
                {t('contactPage.contactInfo.description')}
              </p>
              
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="bg-blue-100 dark:bg-blue-900/40 p-3 rounded-lg mr-4">
                    <Phone className="h-6 w-6 text-blue-500 dark:text-blue-300" />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white">{t('contactPage.contactInfo.phone.title')}</h4>
                    <p className="text-gray-600 dark:text-gray-300">{t('contactPage.contactInfo.phone.number')}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{t('contactPage.contactInfo.phone.hours')}</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-blue-100 dark:bg-blue-900/40 p-3 rounded-lg mr-4">
                    <Mail className="h-6 w-6 text-blue-500 dark:text-blue-300" />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white">{t('contactPage.contactInfo.email.title')}</h4>
                    <p className="text-gray-600 dark:text-gray-300">{t('contactPage.contactInfo.email.address')}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{t('contactPage.contactInfo.email.response')}</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-blue-100 dark:bg-blue-900/40 p-3 rounded-lg mr-4">
                    <MapPin className="h-6 w-6 text-blue-500 dark:text-blue-300" />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white">{t('contactPage.contactInfo.location.title')}</h4>
                    <p className="text-gray-600 dark:text-gray-300">{t('contactPage.contactInfo.location.address')}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{t('contactPage.contactInfo.location.note')}</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-blue-100 dark:bg-blue-900/40 p-3 rounded-lg mr-4">
                    <Calendar className="h-6 w-6 text-blue-500 dark:text-blue-300" />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white">{t('contactPage.contactInfo.hours.title')}</h4>
                    <p className="text-gray-600 dark:text-gray-300">{t('contactPage.contactInfo.hours.weekdays')}</p>
                    <p className="text-gray-600 dark:text-gray-300">{t('contactPage.contactInfo.hours.saturday')}</p>
                    <p className="text-gray-600 dark:text-gray-300">{t('contactPage.contactInfo.hours.sunday')}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Contact Form */}
          <div
            className="animate-slide-left"
            style={{ animationDelay: '0.3s' }}
          >
            <div className="glass p-8 rounded-2xl border border-white/20 dark:border-gray-700/30">
              <h3 className="text-2xl font-semibold mb-6 dark:text-white">{t('contactPage.form.title')}</h3>
              
              {submitSuccess ? (
                <div className="bg-green-50 dark:bg-green-900/30 border border-green-200 dark:border-green-700 text-green-700 dark:text-green-300 rounded-lg p-4 flex items-center mb-6">
                  <svg className="w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <p>{t('contactPage.form.success')}</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <label htmlFor="name" className="block text-gray-700 dark:text-gray-300 text-sm font-medium mb-2">
                        {t('contactPage.form.fields.name.label')}
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-200 dark:border-gray-700 dark:bg-gray-800 dark:text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder={t('contactPage.form.fields.name.placeholder')}
                        required
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="email" className="block text-gray-700 dark:text-gray-300 text-sm font-medium mb-2">
                        {t('contactPage.form.fields.email.label')}
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-200 dark:border-gray-700 dark:bg-gray-800 dark:text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder={t('contactPage.form.fields.email.placeholder')}
                        required
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="phone" className="block text-gray-700 dark:text-gray-300 text-sm font-medium mb-2">
                        {t('contactPage.form.fields.phone.label')}
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-200 dark:border-gray-700 dark:bg-gray-800 dark:text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder={t('contactPage.form.fields.phone.placeholder')}
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="service" className="block text-gray-700 dark:text-gray-300 text-sm font-medium mb-2">
                        {t('contactPage.form.fields.service.label')}
                      </label>
                      <select
                        id="service"
                        name="service"
                        value={formData.service}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-200 dark:border-gray-700 dark:bg-gray-800 dark:text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        required
                      >
                        <option value="">{t('contactPage.form.fields.service.placeholder')}</option>
                        <option value="computer-repair">{t('contactPage.form.fields.service.options.computerRepair')}</option>
                        <option value="mobile-support">{t('contactPage.form.fields.service.options.mobileSupport')}</option>
                        <option value="network-setup">{t('contactPage.form.fields.service.options.networkSetup')}</option>
                        <option value="security-solutions">{t('contactPage.form.fields.service.options.securitySolutions')}</option>
                        <option value="data-recovery">{t('contactPage.form.fields.service.options.dataRecovery')}</option>
                        <option value="hardware-upgrades">{t('contactPage.form.fields.service.options.hardwareUpgrades')}</option>
                        <option value="tech-consultation">{t('contactPage.form.fields.service.options.techConsultation')}</option>
                        <option value="remote-support">{t('contactPage.form.fields.service.options.remoteSupport')}</option>
                        <option value="other">{t('contactPage.form.fields.service.options.other')}</option>
                      </select>
                    </div>
                  </div>
                  
                  <div className="mb-6">
                    <label htmlFor="message" className="block text-gray-700 dark:text-gray-300 text-sm font-medium mb-2">
                      {t('contactPage.form.fields.message.label')}
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={4}
                      className="w-full px-4 py-2 border border-gray-200 dark:border-gray-700 dark:bg-gray-800 dark:text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder={t('contactPage.form.fields.message.placeholder')}
                      required
                    ></textarea>
                  </div>
                  
                  <button
                    type="submit"
                    className="w-full py-3 px-6 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-lg transition-colors duration-300 flex items-center justify-center"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        {t('contactPage.form.fields.sending')}
                      </>
                    ) : (
                      t('contactPage.form.fields.submit')
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
