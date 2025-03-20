
import React from 'react';

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
  return (
    <section id="testimonials" className="py-24 px-6 md:px-12 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4 animate-slide-up">What Our Clients Say</h2>
          <p className="text-gray-600 max-w-2xl mx-auto animate-slide-up" style={{ animationDelay: '0.1s' }}>
            Don't just take our word for it — hear from our satisfied customers about their experience with TechPals.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="glass p-8 rounded-2xl border border-white/20 hover:shadow-lg transition-all duration-300"
              style={{ 
                transform: 'translateY(20px)', 
                opacity: 0, 
                animation: 'slideUp 0.6s ease-out forwards',
                animationDelay: `${index * 0.15}s` 
              }}
            >
              <div className="flex flex-col h-full">
                <div className="mb-6 flex-grow">
                  <svg className="h-8 w-8 text-blue-500 mb-4 opacity-50" fill="currentColor" viewBox="0 0 32 32">
                    <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
                  </svg>
                  <p className="text-gray-600">{testimonial.content}</p>
                </div>
                <div className="flex items-center mt-6">
                  <div className="relative w-12 h-12 mr-4">
                    <img 
                      src={testimonial.image} 
                      alt={testimonial.author} 
                      className="absolute inset-0 w-full h-full object-cover rounded-full"
                      loading="lazy"
                    />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">{testimonial.author}</h4>
                    <p className="text-sm text-gray-500">{testimonial.position}</p>
                  </div>
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
