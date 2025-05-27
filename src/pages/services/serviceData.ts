// Service data with detailed information for each service

interface PricingOption {
  name: string;
  price: string;
  description: string;
}

interface DetailSection {
  title: string;
  content: string;
  listItems?: string[];
}

interface FAQ {
  question: string;
  answer: string;
}

export interface ServiceDetail {
  slug: string;
  title: string;
  longDescription: string;
  image: string;
  imageCaption: string;
  price: string;
  detailSections: DetailSection[];
  pricingOptions: PricingOption[];
  faqs?: FAQ[];
}

export const serviceDetails: ServiceDetail[] = [
  {
    slug: 'computer-repair',
    title: 'Computer Repair',
    longDescription: "Our computer repair service provides affordable solutions for both desktop and laptop computers. Whether you're dealing with slow performance, virus infections, or hardware issues, our technicians can diagnose and fix your problems quickly.",
    image: '/images/services/computer-repair.svg',
    imageCaption: 'Professional computer repair services in Scranton',
    price: '$45',
    detailSections: [
      {
        title: 'Comprehensive Computer Repair Services',
        content: 'At Tech Pals, we offer a wide range of computer repair services to get your system back up and running. Our experienced technicians can handle both hardware and software issues for Windows and Mac computers.',
        listItems: [
          'Hardware diagnostics and repair',
          'Software troubleshooting and installation',
          'Virus and malware removal',
          'Operating system reinstallation',
          'Data backup and recovery'
        ]
      },
      {
        title: 'Our Computer Repair Process',
        content: 'We follow a systematic approach to diagnose and fix your computer issues. First, we perform a thorough assessment to identify the problem. Then, we discuss the repair options with you before proceeding with the fix. Finally, we test the system to ensure everything is working properly.'
      },
      {
        title: 'Why Choose Our Computer Repair Service',
        content: "Our computer repair service stands out because we focus on providing honest, affordable solutions. We won't try to sell you services you don't need, and we'll explain the issues in plain language so you understand what's happening with your computer.",
        listItems: [
          'Fast turnaround times',
          'Affordable rates',
          'Experienced technicians',
          'No fix, no fee guarantee',
          'Free basic computer health check'
        ]
      }
    ],
    pricingOptions: [
      {
        name: 'Basic Diagnostic',
        price: '$45',
        description: 'Computer assessment, problem identification, and repair recommendation.'
      },
      {
        name: 'Virus & Malware Removal',
        price: '$65',
        description: 'Complete system scan and removal of viruses, malware, and unwanted programs.'
      },
      {
        name: 'System Optimization',
        price: '$75',
        description: 'Speed up your computer by cleaning up unnecessary files and optimizing settings.'
      },
      {
        name: 'Operating System Reinstall',
        price: '$95',
        description: 'Fresh installation of Windows or macOS with basic software setup.'
      }
    ],
    faqs: [
      {
        question: 'How long does computer repair usually take?',
        answer: 'Most basic repairs can be completed within 24-48 hours. More complex issues might take 3-5 business days.'
      },
      {
        question: 'Do you offer on-site computer repair?',
        answer: 'Yes, we offer on-site repair for an additional fee. However, some complex issues may require us to take the computer to our shop.'
      },
      {
        question: "Can you recover data from a computer that won't boot?",
        answer: 'In many cases, yes. We can often recover data from non-booting computers, though success depends on the specific issue and extent of damage.'
      },
      {
        question: 'Do you repair both Windows and Mac computers?',
        answer: 'Yes, our technicians are experienced with both Windows and Mac systems.'
      }
    ]
  },
  {
    slug: 'mobile-support',
    title: 'Mobile Device Support',
    longDescription: 'Our mobile device support service helps you get the most out of your smartphones and tablets. We can troubleshoot issues, set up new devices, transfer data, and help with app configuration and updates.',
    image: '/images/services/mobile-support.svg',
    imageCaption: 'Expert smartphone and tablet support',
    price: '$35',
    detailSections: [
      {
        title: 'Comprehensive Mobile Device Support',
        content: 'We provide expert assistance for all types of smartphones and tablets, including Apple iOS and Android devices. Our technicians can help with a wide range of issues to keep your mobile devices working smoothly.',
        listItems: [
          'Device setup and configuration',
          'Software updates and troubleshooting',
          'Data transfer and backup',
          'Email and account setup',
          'App installation and configuration'
        ]
      },
      {
        title: 'Common Mobile Device Issues We Solve',
        content: 'Our team regularly helps customers with issues like slow performance, battery problems, storage management, and connectivity issues. We can also assist with screen troubleshooting and basic hardware diagnostics.'
      },
      {
        title: 'Why Choose Our Mobile Support Service',
        content: 'Our mobile device support service is designed to be convenient and affordable. We explain technical issues in simple terms and provide practical solutions that work for your specific needs.',
        listItems: [
          'Support for all major brands and models',
          'Patient, jargon-free explanations',
          'Quick service with minimal wait times',
          'Affordable flat-rate pricing',
          'Personalized recommendations'
        ]
      }
    ],
    pricingOptions: [
      {
        name: 'Basic Mobile Support',
        price: '$35',
        description: 'Troubleshooting common issues, software updates, and basic configuration.'
      },
      {
        name: 'Data Transfer',
        price: '$45',
        description: 'Transfer contacts, photos, and data between devices or to/from backup.'
      },
      {
        name: 'Complete Device Setup',
        price: '$55',
        description: 'Full setup of a new device including email, accounts, apps, and data transfer.'
      },
      {
        name: 'Storage Optimization',
        price: '$40',
        description: 'Free up space by removing unnecessary files and optimizing storage.'
      }
    ],
    faqs: [
      {
        question: 'Can you help with both Android and iPhone devices?',
        answer: 'Yes, our technicians are experienced with both Android and iOS devices.'
      },
      {
        question: 'Do I need an appointment for mobile device support?',
        answer: 'While walk-ins are welcome, we recommend scheduling an appointment to minimize wait times.'
      },
      {
        question: 'Can you recover data from a broken phone?',
        answer: 'In many cases, yes. The success rate depends on the type of damage and whether the device can still power on.'
      },
      {
        question: 'Do you sell phone accessories?',
        answer: 'We offer a limited selection of essential accessories like chargers, cables, and screen protectors.'
      }
    ]
  },
  {
    slug: 'network-setup',
    title: 'Home Network Setup',
    longDescription: 'Our home network setup service ensures your internet connection is fast, reliable, and secure. We can install and configure routers, extend Wi-Fi coverage, connect all your devices, and optimize your network for the best performance.',
    image: '/images/services/network-setup.svg',
    imageCaption: 'Professional home network installation',
    price: '$65',
    detailSections: [
      {
        title: 'Complete Home Network Solutions',
        content: 'We provide comprehensive home networking services to ensure you have a fast, reliable, and secure internet connection throughout your home. Our technicians can set up new networks or improve existing ones.',
        listItems: [
          'Router installation and configuration',
          'Wi-Fi optimization for better coverage',
          'Network security setup',
          'Device connection and troubleshooting',
          'Printer and smart home device integration'
        ]
      },
      {
        title: 'Our Network Setup Process',
        content: 'We begin by assessing your home layout and internet needs. Then we recommend and implement the best solution for your situation. Finally, we test the network thoroughly and ensure all your devices are properly connected.'
      },
      {
        title: 'Why Choose Our Network Setup Service',
        content: 'Our network setup service stands out because we focus on creating a solution that works for your specific home and needs. We use reliable equipment and proven techniques to ensure your network performs well for years to come.',
        listItems: [
          'Customized solutions for your home',
          'Expert technicians with networking experience',
          'Clear explanations of technical concepts',
          'Ongoing support after installation',
          'Affordable flat-rate pricing'
        ]
      }
    ],
    pricingOptions: [
      {
        name: 'Basic Router Setup',
        price: '$65',
        description: 'Installation and configuration of a single router with basic security settings.'
      },
      {
        name: 'Extended Wi-Fi Coverage',
        price: '$95',
        description: 'Setup of mesh network or Wi-Fi extenders to improve coverage throughout your home.'
      },
      {
        name: 'Complete Home Network',
        price: '$125',
        description: 'Full network setup including router, device connections, printer setup, and optimization.'
      },
      {
        name: 'Network Security Package',
        price: '$85',
        description: 'Enhanced security configuration with guest network, parental controls, and device management.'
      }
    ],
    faqs: [
      {
        question: 'Do I need to purchase equipment before your visit?',
        answer: 'We can either work with equipment you already have, recommend equipment for you to purchase, or in some cases, provide basic equipment as part of our service package.'
      },
      {
        question: 'How long does a typical network setup take?',
        answer: 'A basic setup usually takes 1-2 hours. More complex setups with multiple access points may take 2-4 hours.'
      },
      {
        question: 'Can you help improve my existing Wi-Fi coverage?',
        answer: 'Yes, we can assess your current setup and recommend solutions to improve coverage in areas with weak signals.'
      },
      {
        question: 'Do you set up guest networks?',
        answer: 'Yes, we can configure a separate guest network to keep your main network secure while still providing internet access to visitors.'
      }
    ]
  }
];

// Add detailed content for security-solutions
serviceDetails.push({
  slug: 'security-solutions',
  title: 'Security Solutions',
  longDescription: 'Our comprehensive security solutions protect your digital life from threats like viruses, malware, and hackers. We offer both preventative measures and remediation services to keep your data safe and your devices secure.',
  image: '/images/services/security-solutions.svg',
  imageCaption: 'Advanced cybersecurity protection for your devices',
  price: '$55',
  detailSections: [
    {
      title: 'Complete Digital Security Protection',
      content: 'At Tech Pals, we provide comprehensive security solutions to protect your computers, mobile devices, and networks from various digital threats. Our security experts use industry-leading tools and techniques to safeguard your digital life.',
      listItems: [
        'Virus and malware protection',
        'Ransomware prevention and removal',
        'Phishing protection',
        'Password management solutions',
        'Data encryption services'
      ]
    },
    {
      title: 'Our Security Assessment Process',
      content: 'We begin with a thorough security assessment of your current setup to identify vulnerabilities. Then we implement appropriate security measures tailored to your specific needs. Finally, we provide education on best practices to maintain your security going forward.'
    },
    {
      title: 'Why Choose Our Security Solutions',
      content: 'Our security solutions stand out because we focus on both technical protection and user education. We believe that the best security combines robust technical measures with informed user behavior.',
      listItems: [
        'Personalized security plans',
        'Regular security updates',
        'Plain-language security education',
        'Ongoing support for security issues',
        'Affordable protection packages'
      ]
    }
  ],
  pricingOptions: [
    {
      name: 'Basic Security Scan',
      price: '$55',
      description: 'Comprehensive scan for viruses, malware, and security vulnerabilities with basic remediation.'
    },
    {
      name: 'Advanced Malware Removal',
      price: '$85',
      description: 'Complete removal of complex malware, ransomware, and persistent threats.'
    },
    {
      name: 'Security Suite Setup',
      price: '$75',
      description: 'Installation and configuration of comprehensive security software with ongoing protection.'
    },
    {
      name: 'Complete Security Package',
      price: '$125',
      description: 'Full security audit, software installation, data backup setup, and security training.'
    }
  ],
  faqs: [
    {
      question: 'How do I know if my computer has a virus?',
      answer: 'Common signs include unexpected slowdowns, strange pop-ups, programs starting on their own, or unusual network activity. If you notice any of these, it\'s best to get a security check.'
    },
    {
      question: 'Do I need antivirus software if I have a Mac?',
      answer: 'While Macs are generally less targeted than Windows computers, they are not immune to malware. We recommend security software for all devices, including Macs.'
    },
    {
      question: 'How often should I update my security software?',
      answer: 'Security software should be set to update automatically to ensure you have the latest protection against new threats.'
    },
    {
      question: 'What should I do if I think my accounts have been hacked?',
      answer: 'Immediately change your passwords from a secure device, enable two-factor authentication where possible, and contact us for a security assessment to ensure your devices are clean.'
    }
  ]
});

// Add detailed content for data-recovery
serviceDetails.push({
  slug: 'data-recovery',
  title: 'Data Recovery',
  longDescription: 'Our data recovery service helps retrieve your valuable files from damaged, failed, or inaccessible storage devices. Whether it\'s a crashed hard drive, corrupted memory card, or accidentally deleted files, we can help recover your important data.',
  image: '/images/services/data-recovery.svg',
  imageCaption: 'Professional data recovery services',
  price: '$75',
  detailSections: [
    {
      title: 'Comprehensive Data Recovery Solutions',
      content: 'We offer professional data recovery services for all types of storage devices. Our technicians use specialized tools and techniques to recover data from various scenarios, from simple file deletion to complex drive failures.',
      listItems: [
        'Hard drive data recovery',
        'SSD data recovery',
        'Flash drive and memory card recovery',
        'Deleted file recovery',
        'Recovery from formatted or corrupted drives'
      ]
    },
    {
      title: 'Our Data Recovery Process',
      content: 'Our process begins with a free initial assessment to determine the likelihood of recovery. We then use specialized software and techniques to safely extract your data without causing further damage. Finally, we transfer the recovered data to a new storage device of your choice.'
    },
    {
      title: 'Why Choose Our Data Recovery Service',
      content: 'Our data recovery service stands out because we offer transparent pricing with no hidden fees. We only charge if we successfully recover your important data, and we prioritize the recovery of your most critical files first.',
      listItems: [
        'No recovery, no fee guarantee',
        'Free initial assessment',
        'Secure and confidential process',
        'Recovery from physically damaged drives',
        'Quick turnaround options available'
      ]
    }
  ],
  pricingOptions: [
    {
      name: 'Basic Data Recovery',
      price: '$75',
      description: 'Recovery of deleted files from healthy drives or simple logical failures.'
    },
    {
      name: 'Standard Data Recovery',
      price: '$150',
      description: 'Recovery from corrupted file systems, formatted drives, or moderate logical failures.'
    },
    {
      name: 'Advanced Data Recovery',
      price: '$250+',
      description: 'Recovery from complex failures, including some physical damage cases. Price varies based on complexity.'
    },
    {
      name: 'Emergency Recovery',
      price: '$350+',
      description: 'Priority service with expedited recovery process for urgent situations.'
    }
  ],
  faqs: [
    {
      question: 'Can you recover data from a hard drive that won\'t power on?',
      answer: 'In many cases, yes. Non-powering drives often have issues with the controller board or other components that can be addressed to access the data.'
    },
    {
      question: 'How long does data recovery typically take?',
      answer: 'Standard recovery usually takes 2-5 business days. The exact time depends on the type of failure, the size of the drive, and the amount of data to be recovered.'
    },
    {
      question: 'Is my data kept confidential during the recovery process?',
      answer: 'Absolutely. We maintain strict confidentiality for all customer data. Our technicians follow secure protocols and never access your personal files beyond what\'s necessary for recovery.'
    },
    {
      question: 'What\'s the success rate for data recovery?',
      answer: 'Our success rate is approximately 85-90% for logical failures and 60-75% for physical failures. However, each case is unique, and we provide a free assessment to give you a more accurate estimate for your specific situation.'
    }
  ]
});

// Add detailed content for hardware-upgrades
serviceDetails.push({
  slug: 'hardware-upgrades',
  title: 'Hardware Upgrades',
  longDescription: 'Our hardware upgrade service can breathe new life into your existing computer by replacing or adding components to improve performance, storage capacity, and capabilities. From RAM and storage upgrades to graphics cards and processors, we can help you get more out of your current system.',
  image: '/images/services/hardware-upgrades.svg',
  imageCaption: 'Professional computer hardware upgrade services',
  price: '$50+',
  detailSections: [
    {
      title: 'Comprehensive Hardware Upgrade Options',
      content: 'We offer a wide range of hardware upgrade services to improve your computer\'s performance and extend its useful life. Our technicians can recommend and install the right components based on your needs and budget.',
      listItems: [
        'RAM upgrades for better multitasking',
        'Storage upgrades (HDD to SSD, larger capacity)',
        'Graphics card upgrades for gaming and design',
        'Processor (CPU) upgrades',
        'Cooling system improvements'
      ]
    },
    {
      title: 'Our Hardware Upgrade Process',
      content: 'We start with a thorough assessment of your current system to identify upgrade opportunities. We then discuss options and recommendations with you, focusing on the best value improvements. After you approve, we carefully install the new components and ensure everything works properly.'
    },
    {
      title: 'Why Choose Our Hardware Upgrade Service',
      content: 'Our hardware upgrade service stands out because we focus on cost-effective improvements that give you the best performance boost for your budget. We help you make informed decisions about which upgrades will benefit you most.',
      listItems: [
        'Expert component selection advice',
        'Professional installation',
        'Performance testing before and after',
        'Data migration for storage upgrades',
        'Warranty on parts and labor'
      ]
    }
  ],
  pricingOptions: [
    {
      name: 'RAM Upgrade',
      price: '$50+',
      description: 'Installation of additional or replacement RAM modules. Price includes labor only.'
    },
    {
      name: 'SSD Upgrade',
      price: '$75+',
      description: 'Installation of SSD and data migration from existing drive. Price includes labor only.'
    },
    {
      name: 'Graphics Card Upgrade',
      price: '$65+',
      description: 'Installation of new graphics card and required drivers. Price includes labor only.'
    },
    {
      name: 'Complete System Upgrade',
      price: '$150+',
      description: 'Multiple component upgrades including RAM, storage, and other hardware. Price includes labor only.'
    }
  ],
  faqs: [
    {
      question: 'How do I know which upgrades my computer needs?',
      answer: 'We offer a free assessment to identify bottlenecks in your system and recommend the most effective upgrades based on your usage and budget.'
    },
    {
      question: 'Can all computers be upgraded?',
      answer: 'Most desktop computers can be upgraded extensively. Laptops typically have more limited upgrade options, often restricted to RAM and storage. Some newer laptops and all-in-one computers may have limited or no upgrade potential.'
    },
    {
      question: 'Will I lose my data during a hardware upgrade?',
      answer: 'For most upgrades like RAM or graphics cards, your data remains untouched. For storage upgrades, we perform a complete data migration to ensure nothing is lost.'
    },
    {
      question: 'Is it worth upgrading an older computer?',
      answer: 'It depends on the specific computer and your needs. Often, strategic upgrades can significantly extend the useful life of a computer at a fraction of the cost of a new system. We can help you determine if upgrading makes sense for your situation.'
    }
  ]
});

// Add detailed content for tech-consultation
serviceDetails.push({
  slug: 'tech-consultation',
  title: 'Tech Consultation',
  longDescription: 'Our tech consultation service provides expert guidance to help you make informed technology decisions. Whether you need help choosing the right devices, setting up a home office, or understanding new technologies, our experts are here to provide clear, jargon-free advice tailored to your needs.',
  image: '/images/services/tech-consultation.svg',
  imageCaption: 'Expert technology advice and guidance',
  price: '$65/hour',
  detailSections: [
    {
      title: 'Comprehensive Tech Consultation Services',
      content: 'Our tech consultation service covers a wide range of technology needs, from personal device selection to home network setup and smart home integration. We help demystify technology and provide recommendations that match your specific requirements and budget.',
      listItems: [
        'Technology purchasing advice',
        'Home network planning and optimization',
        'Smart home device selection and setup',
        'Software and app recommendations',
        'Technology learning and training'
      ]
    },
    {
      title: 'Our Consultation Process',
      content: 'We begin by understanding your needs, experience level, and goals. Then we analyze your current setup and provide customized recommendations. Finally, we help implement solutions and provide training if needed, ensuring you feel confident using your technology.'
    },
    {
      title: 'Why Choose Our Tech Consultation Service',
      content: 'Our tech consultation service stands out because we take the time to understand your unique situation and provide unbiased, practical advice. We focus on solutions that make sense for you, not on selling specific products or services.',
      listItems: [
        'Personalized technology roadmaps',
        'Unbiased product recommendations',
        'Plain-language explanations',
        'Follow-up support',
        'Flexible consultation formats (in-person, phone, or video)'
      ]
    }
  ],
  pricingOptions: [
    {
      name: 'Basic Consultation',
      price: '$65/hour',
      description: 'One-on-one technology consultation for specific questions or decisions.'
    },
    {
      name: 'Home Technology Audit',
      price: '$150',
      description: 'Comprehensive evaluation of your home technology setup with written recommendations.'
    },
    {
      name: 'Shopping Assistance',
      price: '$95',
      description: 'Personalized shopping assistance to help you choose and purchase the right technology.'
    },
    {
      name: 'Ongoing Tech Support',
      price: '$200/month',
      description: 'Monthly retainer for regular technology advice and support (4 hours included, then $65/hour).'
    }
  ],
  faqs: [
    {
      question: 'What can I ask about during a tech consultation?',
      answer: 'You can ask about anything technology-related: choosing devices, setting up home networks, smart home technology, software recommendations, learning new technologies, and more. We tailor our advice to your specific needs and knowledge level.'
    },
    {
      question: 'How is a tech consultation different from tech support?',
      answer: 'Tech support typically helps fix specific technical issues, while a tech consultation focuses on providing advice and recommendations to help you make informed technology decisions and get the most out of your devices.'
    },
    {
      question: 'Do I need to prepare anything for a consultation?',
      answer: 'It\'s helpful to think about your goals, budget, and any specific questions you have. If we\'ll be discussing your current setup, having information about your devices and how you use them will be beneficial.'
    },
    {
      question: 'Can you help with business technology decisions?',
      answer: 'Yes, we can provide guidance on small business technology needs, including hardware, software, and security considerations. For larger businesses, we can help identify your requirements and recommend appropriate solutions.'
    }
  ]
});

// Add detailed content for remote-support
serviceDetails.push({
  slug: 'remote-support',
  title: 'Remote Support',
  longDescription: 'Our remote support service provides quick and convenient technical assistance directly to your device, no matter where you are. Using secure remote access tools, our technicians can diagnose and fix many common computer issues without the need for an in-person visit, saving you time and hassle.',
  image: '/images/services/remote-support.svg',
  imageCaption: 'Convenient remote technical support',
  price: '$45',
  detailSections: [
    {
      title: 'Comprehensive Remote Support Services',
      content: 'Our remote support service covers a wide range of technical issues that can be resolved without physical access to your device. We use secure, encrypted connections to access your computer with your permission.',
      listItems: [
        'Virus and malware removal',
        'Software installation and updates',
        'Performance optimization',
        'Email and internet connection issues',
        'Printer and peripheral setup'
      ]
    },
    {
      title: 'How Remote Support Works',
      content: 'After you contact us, we\'ll send you a secure link to start the remote session. You\'ll be able to see everything our technician is doing on your screen. The session is completely secure, and you can end it at any time with a single click.'
    },
    {
      title: 'Why Choose Our Remote Support',
      content: 'Our remote support service is the fastest and most convenient way to get help with your computer issues. You don\'t need to leave your home or office, and most issues can be resolved in under an hour.',
      listItems: [
        'No need to leave your home or office',
        'Faster than scheduling an in-person visit',
        'Available for both Windows and Mac',
        'Secure, encrypted connections',
        'Flat-rate pricing with no hidden fees'
      ]
    }
  ],
  pricingOptions: [
    {
      name: 'Basic Remote Support',
      price: '$45',
      description: 'Up to 30 minutes of remote support for common issues like software problems or basic troubleshooting.'
    },
    {
      name: 'Advanced Remote Support',
      price: '$75',
      description: 'Up to 1 hour of remote support for more complex issues like malware removal or system optimization.'
    },
    {
      name: 'Remote Support Package',
      price: '$150',
      description: '3 remote support sessions (1 hour each) to be used within 6 months.'
    },
    {
      name: 'Premium Remote Support',
      price: '$250',
      description: 'Unlimited remote support for 3 months, including priority scheduling.'
    }
  ],
  faqs: [
    {
      question: 'Is remote support secure?',
      answer: 'Yes, we use enterprise-grade encryption for all remote sessions. You can see everything our technician is doing, and you can end the session at any time with a single click.'
    },
    {
      question: 'What do I need for a remote support session?',
      answer: 'You\'ll need a working internet connection, the ability to download and run our secure remote support software, and a phone or another device to communicate with our technician during the session.'
    },
    {
      question: 'Can all computer problems be fixed remotely?',
      answer: 'While many software-related issues can be resolved remotely, some hardware problems may require an in-person visit. During our initial assessment, we\'ll let you know if your issue can be fixed remotely or if an on-site visit is needed.'
    },
    {
      question: 'What if my issue isn\'t fixed during the remote session?',
      answer: 'If we\'re unable to resolve your issue remotely, we\'ll provide a full refund and recommend next steps, which may include an in-person service call if appropriate.'
    }
  ]
});

// Update remaining services to exclude remote-support
export const remainingServices: string[] = [];

// This function returns either a real service detail or generates a placeholder
export function getServiceDetail(slug: string): ServiceDetail {
  const existingService = serviceDetails.find(s => s.slug === slug);
  if (existingService) return existingService;
  
  // If we don't have detailed data yet, return a placeholder based on the services page data
  const serviceTitle = slug.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  
  return {
    slug,
    title: serviceTitle,
    longDescription: `Our ${serviceTitle} service provides professional assistance for all your tech needs in Scranton, PA. Contact us to learn more about how we can help you with ${serviceTitle.toLowerCase()}.`,
    image: '/images/services/placeholder.svg',
    imageCaption: `Professional ${serviceTitle.toLowerCase()} services`,
    price: 'Call for pricing',
    detailSections: [
      {
        title: `About Our ${serviceTitle} Service`,
        content: `We offer comprehensive ${serviceTitle.toLowerCase()} services tailored to your specific needs. Our experienced technicians are ready to assist you with any issues or questions you might have.`,
        listItems: [
          'Professional service',
          'Experienced technicians',
          'Affordable rates',
          'Quick turnaround',
          'Satisfaction guaranteed'
        ]
      },
      {
        title: 'Why Choose Tech Pals',
        content: 'At Tech Pals, we pride ourselves on providing honest, reliable tech support services. We explain technical issues in plain language and offer fair, transparent pricing.'
      }
    ],
    pricingOptions: [
      {
        name: 'Basic Service',
        price: 'From $40',
        description: 'Essential service covering basic needs and simple issues.'
      },
      {
        name: 'Standard Service',
        price: 'From $65',
        description: 'Comprehensive service for most common issues and requirements.'
      },
      {
        name: 'Premium Service',
        price: 'From $90',
        description: 'Advanced service for complex issues requiring specialized attention.'
      }
    ],
    faqs: [
      {
        question: `What does your ${serviceTitle} service include?`,
        answer: `Our ${serviceTitle} service includes assessment, diagnosis, and resolution of your specific issues. We provide transparent pricing and explain everything in simple terms.`
      },
      {
        question: 'How long does the service typically take?',
        answer: 'Service times vary depending on the complexity of the issue. Basic services can often be completed within 1-2 hours, while more complex issues may take longer.'
      },
      {
        question: 'Do you offer any guarantees?',
        answer: "Yes, we stand behind our work with a satisfaction guarantee. If you're not satisfied with our service, we'll work to make it right."
      }
    ]
  };
}
