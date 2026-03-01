import React from 'react';
import PropTypes from 'prop-types';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Clock, 
  Facebook, 
  Instagram, 
  Twitter, 
  Linkedin,
  CirclePlay,
  Coffee,
  ChevronRight,
  Heart
} from 'lucide-react';

// Constants for data management
const QUICK_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'About Us', href: '/about' },
  { label: 'Our Menu', href: '/menu' },
  { label: 'Services', href: '/services' },
  { label: 'Contact', href: '/contact' },
  { label: 'Info', href: '/info' }
];

const CONTACT_INFO = [
  { icon: Mail, text: 'hello@coffeetime.com', href: 'mailto:hello@coffeetime.com' },
  { icon: Phone, text: '+855 92 345 6789', href: 'tel:+855923456789' },
  { icon: MapPin, text: 'St. 123, Phnom Penh, Cambodia', href: 'https://maps.google.com' },
  { icon: Clock, text: 'Mon-Sun: 7:00 AM - 8:00 PM' }
];

const SOCIAL_ICONS = [
  { icon: Facebook, label: 'Facebook', href: 'https://facebook.com/coffeetime' },
  { icon: Instagram, label: 'Instagram', href: 'https://instagram.com/coffeetime' },
  { icon: CirclePlay, label: 'TikTok', href: 'https://tiktok.com/@coffeetime' },
  { icon: Twitter, label: 'Twitter', href: 'https://twitter.com/coffeetime' },
  { icon: Linkedin, label: 'LinkedIn', href: 'https://linkedin.com/company/coffeetime' }
];

const GALLERY_IMAGES = [
  {
    src: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=100&auto=format&fit=crop',
    alt: 'Coffee cup'
  },
  {
    src: 'https://images.unsplash.com/photo-1442512595331-e89e73853f31?q=80&w=100&auto=format&fit=crop',
    alt: 'Coffee beans'
  },
  {
    src: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?q=80&w=100&auto=format&fit=crop',
    alt: 'Coffee shop'
  },
  {
    src: 'https://images.unsplash.com/photo-1511920170033-f8396924c348?q=80&w=100&auto=format&fit=crop',
    alt: 'Latte art'
  }
];

// Reusable Social Icon Component
const SocialIcon = ({ icon: Icon, label, href = '#', onClick }) => (
  <a
    href={href}
    aria-label={label}
    target="_blank"
    rel="noopener noreferrer"
    onClick={onClick}
    className="w-10 h-10 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-amber-500 hover:text-white hover:scale-110 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 focus:ring-offset-transparent"
  >
    <Icon size={20} />
  </a>
);

SocialIcon.propTypes = {
  icon: PropTypes.elementType.isRequired,
  label: PropTypes.string.isRequired,
  href: PropTypes.string,
  onClick: PropTypes.func
};

// Newsletter Form Component
const NewsletterForm = () => {
  const [email, setEmail] = React.useState('');
  const [status, setStatus] = React.useState('idle'); // idle, loading, success, error

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus('loading');
    
    // Simulate API call
    setTimeout(() => {
      setStatus('success');
      setEmail('');
      setTimeout(() => setStatus('idle'), 3000);
    }, 1500);
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-white">Subscribe to our newsletter</h3>
      <p className="text-sm text-gray-300">Get 10% off your first order!</p>
      <form onSubmit={handleSubmit} className="space-y-3">
        <div className="flex">
          <input
            type="email"
            placeholder="Your email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="flex-1 px-4 py-3 text-gray-900 bg-white rounded-l-md focus:outline-none focus:ring-2 focus:ring-amber-500"
            disabled={status === 'loading'}
          />
          <button
            type="submit"
            disabled={status === 'loading'}
            className="bg-amber-600 px-6 py-3 rounded-r-md hover:bg-amber-700 transition-colors duration-300 font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            {status === 'loading' ? (
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              'Subscribe'
            )}
          </button>
        </div>
        {status === 'success' && (
          <p className="text-green-400 text-sm">✓ Successfully subscribed!</p>
        )}
        {status === 'error' && (
          <p className="text-red-400 text-sm">✗ Something went wrong. Try again.</p>
        )}
      </form>
    </div>
  );
};

// Business Hours Component
const BusinessHours = () => (
  <div className="space-y-3">
    <h3 className="text-lg font-semibold text-white">Business Hours</h3>
    <div className="space-y-2 text-sm text-gray-300">
      <div className="flex justify-between">
        <span>Monday - Friday:</span>
        <span className="text-white">7:00 AM - 8:00 PM</span>
      </div>
      <div className="flex justify-between">
        <span>Saturday:</span>
        <span className="text-white">8:00 AM - 9:00 PM</span>
      </div>
      <div className="flex justify-between">
        <span>Sunday:</span>
        <span className="text-white">8:00 AM - 6:00 PM</span>
      </div>
    </div>
  </div>
);

// Main Footer Component
const Footer = () => {
  const currentYear = new Date().getFullYear();

  const handleSmoothScroll = (e, href) => {
    e.preventDefault();
    // Smooth scroll implementation
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="relative w-full bg-cover bg-center bg-no-repeat text-white" 
      style={{ 
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.8)), url('https://images.unsplash.com/photo-1447933601403-0c6688de566e?q=80&w=761&auto=format&fit=crop')`
      }}>
      
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Top Section with 4 Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          
          {/* Column 1: Brand Info */}
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <img
                src="https://i.pinimg.com/736x/ec/aa/6a/ecaa6ac4cbb715c055bd586316117d00.jpg"
                className="w-16 h-16 rounded-full border-2 border-amber-500 object-cover"
                alt="Coffee Time Logo"
              />
              <h2 className="text-2xl font-bold tracking-wider">
                <span className="text-amber-500">Coffee</span>
                <br />
                <span className="text-sm tracking-normal text-gray-300">Time</span>
              </h2>
            </div>
            <p className="text-gray-300 leading-relaxed">
              Crafting the perfect cup of coffee daily since 2010. We bring the world's best beans to your neighborhood with love and passion.
            </p>
            {/* Trust Badge */}
            <div className="flex items-center gap-2 text-amber-500">
              <Coffee size={20} />
              <span className="text-sm">100% Arabica Beans</span>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-white border-b-2 border-amber-500 pb-2 inline-block">
              Quick Links
            </h3>
            <ul className="space-y-3">
              {QUICK_LINKS.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    onClick={(e) => handleSmoothScroll(e, link.href)}
                    className="text-gray-300 hover:text-amber-500 transition-colors duration-300 flex items-center gap-2 group"
                  >
                    <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Contact Info */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-white border-b-2 border-amber-500 pb-2 inline-block">
              Contact Us
            </h3>
            <ul className="space-y-4">
              {CONTACT_INFO.map((item, index) => {
                const Icon = item.icon;
                return (
                  <li key={index}>
                    {item.href ? (
                      <a
                        href={item.href}
                        className="flex items-center gap-3 text-gray-300 hover:text-amber-500 transition-colors duration-300 group"
                        {...(item.href.startsWith('http') && { target: '_blank', rel: 'noopener noreferrer' })}
                      >
                        <div className="bg-white/10 p-2 rounded-md group-hover:bg-amber-500 transition-colors">
                          <Icon size={16} className="text-white" />
                        </div>
                        <span className="text-sm">{item.text}</span>
                      </a>
                    ) : (
                      <div className="flex items-center gap-3 text-gray-300">
                        <div className="bg-white/10 p-2 rounded-md">
                          <Icon size={16} className="text-white" />
                        </div>
                        <span className="text-sm">{item.text}</span>
                      </div>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Column 4: Instagram Gallery Preview */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-white border-b-2 border-amber-500 pb-2 inline-block">
              Instagram
            </h3>
            <div className="grid grid-cols-2 gap-2">
              {GALLERY_IMAGES.map((image, index) => (
                <a
                  key={index}
                  href="https://instagram.com/coffeetime"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative group overflow-hidden rounded-lg aspect-square"
                >
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <Instagram size={24} className="text-white" />
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Middle Section: Newsletter & Business Hours */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-12 py-8 border-t border-b border-white/20">
          <NewsletterForm />
          <BusinessHours />
        </div>

        {/* Bottom Section: Social Links & Copyright */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          {/* Social Icons */}
          <div className="flex gap-4">
            {SOCIAL_ICONS.map((social) => (
              <SocialIcon
                key={social.label}
                icon={social.icon}
                label={social.label}
                href={social.href}
              />
            ))}
          </div>

          {/* Copyright & Legal */}
          <div className="text-center md:text-right">
            <p className="text-sm text-gray-300">
              © {currentYear} <span className="text-amber-500">Coffee Time</span>. All rights reserved.
            </p>
            <div className="flex gap-4 mt-2 text-xs text-gray-400">
              <a href="/privacy" className="hover:text-amber-500 transition-colors">
                Privacy Policy
              </a>
              <span>|</span>
              <a href="/terms" className="hover:text-amber-500 transition-colors">
                Terms of Service
              </a>
              <span>|</span>
              <a href="/sitemap" className="hover:text-amber-500 transition-colors">
                Sitemap
              </a>
            </div>
          </div>

          {/* Made with love */}
          <div className="flex items-center gap-1 text-sm text-gray-400">
            Made with <Heart size={14} className="text-red-500 fill-red-500" /> in Cambodia
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;