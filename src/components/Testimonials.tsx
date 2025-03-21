import React from 'react';
import { useTranslation } from 'react-i18next';

interface Testimonial {
  content: string;
  author: string;
  position: string;
}

const testimonials = [
  {
    content: "TechPals fixed my laptop's performance issues in just one visit. Professional, fast, and affordable!",
    author: "Sarah Johnson",
    position: "Small Business Owner",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=256&q=80",
  },
  {
    content: "After struggling with my home network for months, TechPals set everything up perfectly. My Wi-Fi has never been more reliable.",
    author: "Michael Chen",
    position: "Remote Worker",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=256&q=80",
  },
  {
    content: "They helped me choose the perfect devices for my needs and set everything up. Their consultation service saved me time and money.",
    author: "Emily Rodriguez",
    position: "Teacher",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=256&q=80",
  },
];

const Testimonials = () => {
  const { t } = useTranslation();
  
  // Type the testimonials array properly
  const translatedTestimonials = t('testimonials.items', { returnObjects: true }) as Testimonial[];

  return (
    <section className="py-24 px-6 md:px-12 bg-gray-50 dark:bg-gray-800">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4 dark:text-white">{t('testimonials.title')}</h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            {t('testimonials.description')}
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {translatedTestimonials.map((testimonial, index) => (
            <div 
              key={index}
              className="bg-white dark:bg-gray-700 p-8 rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-300 relative overflow-hidden"
              style={{ 
                transform: 'translateY(20px)',
                opacity: 0,
                animation: 'slideUp 0.6s ease-out forwards',
                animationDelay: `${index * 0.15}s`,
              }}
            >
              <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-400 to-blue-600"></div>
              <div className="mb-6">
                <svg className="w-8 h-8 text-blue-500" fill="currentColor" viewBox="0 0 32 32">
                  <path d="M10,8c-4.411,0-8,3.589-8,8s3.589,8,8,8c0.702,0,1.378-0.101,2.021-0.271c-0.004,0.032-0.021,0.059-0.021,0.092v4.758l6.168-6.168C19.349,20.676,20,18.91,20,17C20,11.589,16.411,8,10,8z M10,20c-2.206,0-4-1.794-4-4s1.794-4,4-4s4,1.794,4,4S12.206,20,10,20z M30,8h-8c-1.105,0-2,0.895-2,2v10c0,1.105,0.895,2,2,2h5.172l4.828,4.828V10C32,8.895,31.105,8,30,8z M28,18h-4v-2h4V18z M28,14h-4v-2h4V14z"></path>
                </svg>
              </div>
              <p className="text-gray-600 dark:text-gray-300 mb-6 italic">"{testimonial.content}"</p>
              <div className="flex items-center">
                <div className="w-12 h-12 rounded-full bg-gray-200 dark:bg-gray-600 flex items-center justify-center mr-4">
                  <span className="text-xl font-semibold text-gray-500 dark:text-gray-300">
                    {testimonial.author.charAt(0)}
                  </span>
                </div>
                <div>
                  <h4 className="font-semibold dark:text-white">{testimonial.author}</h4>
                  <p className="text-gray-500 dark:text-gray-400 text-sm">{testimonial.position}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
