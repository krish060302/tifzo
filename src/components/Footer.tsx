import { Instagram, Facebook, Linkedin, Twitter } from 'lucide-react';

export default function Footer() {
  const sections = [
    {
      title: 'Sections',
      links: ['Home', 'About Us', 'Contact Us'],
    },
    {
      title: 'Help',
      links: ['Privacy', 'Help Center'],
    },
    {
      title: 'Company Policies',
      links: ['Terms & Conditions'],
    },
  ];

  const socialLinks = [
    { icon: Instagram, href: '#', label: 'Instagram' },
    { icon: Facebook, href: '#', label: 'Facebook' },
    { icon: Linkedin, href: '#', label: 'LinkedIn' },
    { icon: Twitter, href: '#', label: 'Twitter' },
  ];

  return (
    <footer className="bg-white border-t border-gray-200 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="text-2xl font-bold text-blue-600 mb-3">tifzo</div>
            <p className="text-gray-600 text-sm mb-4">
              Your food, delivered safely
            </p>
            <div className="flex space-x-3">
              {socialLinks.map((social, index) => {
                const Icon = social.icon;
                return (
                  <a
                    key={index}
                    href={social.href}
                    aria-label={social.label}
                    className="w-9 h-9 bg-blue-600 rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors"
                  >
                    <Icon className="w-4 h-4 text-white" />
                  </a>
                );
              })}
            </div>
          </div>

          {sections.map((section, index) => (
            <div key={index}>
              <h3 className="font-bold text-gray-900 mb-3">{section.title}</h3>
              <ul className="space-y-2">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <a
                      href="#"
                      className="text-gray-600 hover:text-blue-600 transition-colors text-sm"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-gray-200 pt-8 text-center text-gray-600 text-sm">
          <p>&copy; {new Date().getFullYear()} tifzo. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
