import React from 'react';
import Navbar from '@/components/Navbar';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';

const ContactPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="pt-20"> {/* Add padding to account for fixed navbar */}
        <Contact />
      </div>
      <Footer />
    </div>
  );
};

export default ContactPage;
