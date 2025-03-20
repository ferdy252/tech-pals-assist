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

// Add placeholder data for the remaining services
export const remainingServices: string[] = [
  'security-solutions',
  'data-recovery',
  'hardware-upgrades',
  'tech-consultation',
  'remote-support'
];

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
