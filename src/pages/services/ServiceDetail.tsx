import React, { useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Phone, MapPin, Clock, DollarSign, CheckCircle, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { getServiceDetail, ServiceDetail as ServiceDetailType } from '@/pages/services/serviceData';
import { useAuth } from '@/context/AuthContext';
import { useTranslation } from 'react-i18next';

const ServiceDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const service = slug ? getServiceDetail(slug) : null;
  const { user } = useAuth();
  const navigate = useNavigate();
  const { t } = useTranslation();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleBookAppointment = () => {
    if (!user) {
      // If user is not logged in, redirect to login page with a redirect back to appointment booking
      navigate('/login', { state: { redirectTo: `/book-appointment?service=${slug}` } });
    } else {
      // If user is logged in, go directly to appointment booking with service pre-selected
      navigate(`/book-appointment?service=${slug}`);
    }
  };

  if (!service) {
    return (
      <div className="min-h-screen flex flex-col bg-white dark:bg-gray-950">
        <Navbar />
        <div className="flex-1 flex flex-col items-center justify-center p-6">
          <h1 className="text-2xl font-bold mb-4 dark:text-white">{t('serviceDetail.serviceNotFound')}</h1>
          <p className="text-gray-600 dark:text-gray-300 mb-6">{t('serviceDetail.serviceNotFoundDesc')}</p>
          <Link to="/services">
            <Button>
              <ArrowLeft className="mr-2 h-4 w-4" />
              {t('serviceDetail.backToServices')}
            </Button>
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100 transition-colors duration-300">
      <Navbar />
      
      <div className="pt-20 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        {/* Breadcrumb */}
        <div className="mb-6">
          <Link to="/services" className="text-blue-500 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 flex items-center">
            <ArrowLeft className="mr-2 h-4 w-4" />
            {t('serviceDetail.backToServices')}
          </Link>
        </div>
        
        {/* Hero Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold mb-6 dark:text-white">{service.title}</h1>
            <p className="text-lg text-gray-700 dark:text-gray-300 mb-8">{service.longDescription}</p>
            
            <div className="flex flex-col space-y-4 mb-8">
              <div className="flex items-center">
                <Phone className="h-5 w-5 text-blue-500 mr-3" />
                <span className="dark:text-gray-300">{t('serviceDetail.contactInfo.callUs')} <a href="tel:5705352472" className="text-blue-600 dark:text-blue-400 hover:underline">(570) 535-2472</a></span>
              </div>
              <div className="flex items-center">
                <MapPin className="h-5 w-5 text-blue-500 mr-3" />
                <span className="dark:text-gray-300">{t('serviceDetail.contactInfo.location')}</span>
              </div>
              <div className="flex items-center">
                <Clock className="h-5 w-5 text-blue-500 mr-3" />
                <span className="dark:text-gray-300">{t('serviceDetail.contactInfo.hours')}</span>
              </div>
              <div className="flex items-center">
                <DollarSign className="h-5 w-5 text-blue-500 mr-3" />
                <span className="dark:text-gray-300">{t('serviceDetail.contactInfo.startingAt')} {service.price}</span>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="w-full sm:w-auto" onClick={handleBookAppointment}>
                <Calendar className="mr-2 h-4 w-4" />
                {t('serviceDetail.buttons.bookAppointment')}
              </Button>
              <a href="#contact">
                <Button variant="outline" size="lg" className="w-full sm:w-auto dark:text-gray-200 dark:border-gray-700 dark:hover:bg-gray-800">
                  {t('serviceDetail.buttons.requestService')}
                </Button>
              </a>
              <a href={`tel:5705352472`}>
                <Button variant="outline" size="lg" className="w-full sm:w-auto dark:text-gray-200 dark:border-gray-700 dark:hover:bg-gray-800">
                  <Phone className="mr-2 h-4 w-4" />
                  {t('serviceDetail.buttons.callNow')}
                </Button>
              </a>
            </div>
          </div>
          
          <div className="relative rounded-xl overflow-hidden shadow-xl h-[300px] sm:h-[400px]">
            <img 
              src={service.image} 
              alt={service.title} 
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
              <div className="text-white font-medium">{service.imageCaption}</div>
            </div>
          </div>
        </div>
        
        {/* Service Details */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-16">
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-bold mb-6 dark:text-white">{t('serviceDetail.sections.whatWeOffer')}</h2>
            
            <div className="prose prose-blue dark:prose-invert max-w-none mb-8">
              {service.detailSections.map((section, index) => (
                <div key={index} className="mb-8">
                  <h3 className="text-xl font-semibold mb-4 dark:text-gray-100">{section.title}</h3>
                  <p className="text-gray-700 dark:text-gray-300 mb-4">{section.content}</p>
                  {section.listItems && (
                    <ul className="space-y-2">
                      {section.listItems.map((item, i) => (
                        <li key={i} className="flex items-start">
                          <CheckCircle className="h-5 w-5 text-blue-500 mr-2 flex-shrink-0 mt-0.5" />
                          <span className="dark:text-gray-300">{item}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </div>
          
          <div>
            <div className="bg-blue-50 dark:bg-gray-800 rounded-xl p-6 sticky top-24">
              <h3 className="text-xl font-bold mb-4 dark:text-white">{t('serviceDetail.sections.pricing')}</h3>
              <Separator className="mb-4 dark:bg-gray-700" />
              
              {service.pricingOptions.map((option, index) => (
                <div key={index} className="mb-4 last:mb-0">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium dark:text-gray-200">{option.name}</span>
                    <span className="font-bold dark:text-white">{option.price}</span>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{option.description}</p>
                  {index < service.pricingOptions.length - 1 && (
                    <Separator className="my-4 dark:bg-gray-700" />
                  )}
                </div>
              ))}
              
              <div className="mt-6">
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                  {t('serviceDetail.sections.customSolution')}
                </p>
                <Button className="w-full mb-3" onClick={handleBookAppointment}>
                  <Calendar className="mr-2 h-4 w-4" />
                  {t('serviceDetail.buttons.bookAppointment')}
                </Button>
                <a href="#contact">
                  <Button variant="outline" className="w-full dark:text-gray-200 dark:border-gray-700 dark:hover:bg-gray-800">{t('serviceDetail.buttons.getQuote')}</Button>
                </a>
              </div>
            </div>
          </div>
        </div>
        
        {/* FAQ Section */}
        {service.faqs && service.faqs.length > 0 && (
          <div className="mb-16">
            <h2 className="text-2xl font-bold mb-6 dark:text-white">{t('serviceDetail.sections.faq')}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {service.faqs.map((faq, index) => (
                <div key={index} className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
                  <h3 className="font-semibold text-lg mb-3 dark:text-white">{faq.question}</h3>
                  <p className="text-gray-700 dark:text-gray-300">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {/* CTA Section */}
        <div className="bg-gradient-to-r from-blue-500 to-blue-700 rounded-xl p-8 text-white">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
            <div className="md:col-span-2">
              <h2 className="text-2xl font-bold mb-2">{t('serviceDetail.sections.readyToStart')}</h2>
              <p className="opacity-90 mb-0 md:mb-0">{t('serviceDetail.sections.contactToday')}</p>
            </div>
            <div className="flex flex-col sm:flex-row md:flex-col gap-4 md:justify-end">
              <Button size="lg" onClick={handleBookAppointment} className="w-full">
                <Calendar className="mr-2 h-4 w-4" />
                {t('serviceDetail.buttons.bookAppointment')}
              </Button>
              <a href="tel:5705352472">
                <Button variant="outline" size="lg" className="w-full bg-transparent border-white text-white hover:bg-white/10">
                  <Phone className="mr-2 h-4 w-4" />
                  {t('serviceDetail.buttons.callNow')}
                </Button>
              </a>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default ServiceDetail;
