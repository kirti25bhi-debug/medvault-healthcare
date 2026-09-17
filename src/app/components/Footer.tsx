import { Facebook, Twitter, Linkedin, Instagram, Youtube, Heart } from 'lucide-react';

export function Footer() {
  const footerLinks = {
    'Quick Links': ['Home', 'About Us', 'Services', 'Contact'],
    Services: ['Consultation', 'Telemedicine', 'Lab Tests', 'Pharmacy'],
    Resources: ['Blog', 'FAQs', 'Privacy Policy', 'Terms of Service'],
  };

  const socialLinks = [
    { icon: Facebook, href: '#', label: 'Facebook' },
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Linkedin, href: '#', label: 'LinkedIn' },
    { icon: Instagram, href: '#', label: 'Instagram' },
    { icon: Youtube, href: '#', label: 'YouTube' },
  ];

  return (
    <footer className="relative border-t border-[#DFF0EB] bg-[#F0FAF8]">
      <div className="container mx-auto px-6 py-14">
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center"
                style={{ background: 'linear-gradient(135deg, #2A9D7E, #1DB5CC)' }}
              >
                <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6 text-white" stroke="currentColor" strokeWidth={2}>
                  <path d="M22 12h-4l-3 9L9 3l-3 9H2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <div>
                <div className="text-xl font-bold" style={{ fontFamily: 'var(--font-heading)' }}>
                  <span className="text-[#0D2B3E]">Med</span>
                  <span className="text-[#2A9D7E]">Vault</span>
                </div>
                <p className="text-xs text-[#6B7A8D]">Smart Healthcare</p>
              </div>
            </div>
            <p className="text-[#6B7A8D] leading-relaxed mb-6 max-w-sm text-sm">
              Your trusted partner in digital healthcare. Providing innovative
              medical solutions powered by AI and accessible to everyone.
            </p>
            {/* Social Links */}
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="w-9 h-9 rounded-lg border border-[#DFF0EB] bg-white flex items-center justify-center hover:border-[#2A9D7E] hover:bg-[#E0F2EE] transition-all duration-300 group"
                >
                  <social.icon className="w-4 h-4 text-[#6B7A8D] group-hover:text-[#2A9D7E] transition-colors" />
                </a>
              ))}
            </div>
          </div>

          {/* Footer Links */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="mb-4 text-[#0D2B3E] text-base">{category}</h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-[#6B7A8D] hover:text-[#2A9D7E] transition-colors duration-300 inline-flex items-center group text-sm"
                    >
                      <span className="group-hover:translate-x-1 transition-transform duration-300">
                        {link}
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-[#DFF0EB]">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-[#6B7A8D] text-sm text-center md:text-left">
              © 2026 MedVault. All rights reserved.
            </p>
            <div className="flex items-center gap-2 text-[#6B7A8D] text-sm">
              <span>Made with</span>
              <Heart className="w-4 h-4 text-[#E85A60] fill-[#E85A60] animate-pulse" />
              <span>for better healthcare</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
