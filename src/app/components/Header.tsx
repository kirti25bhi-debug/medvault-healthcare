import { Menu, Phone, Sparkles, X } from 'lucide-react';
import { useState } from 'react';

interface HeaderProps {
  onOpenAnalyzer?: () => void;
}

export function Header({ onOpenAnalyzer }: HeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { name: 'Home', href: '#home' },
    { name: 'Services', href: '#services' },
    { name: 'Features', href: '#features' },
    { name: 'Health Records', href: '#health-records' },
    { name: 'About', href: '#about' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-[#DFF0EB] bg-white/95 backdrop-blur-md">
      <nav className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center"
              style={{ background: 'linear-gradient(135deg, #2A9D7E, #1DB5CC)' }}
            >
              <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6 text-white" stroke="currentColor" strokeWidth={2}>
                <path d="M22 12h-4l-3 9L9 3l-3 9H2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <div>
              <div className="text-xl font-bold leading-none" style={{ fontFamily: 'var(--font-heading)' }}>
                <span className="text-[#0D2B3E]">Med</span>
                <span className="text-[#2A9D7E]">Vault</span>
              </div>
              <p className="text-xs text-[#6B7A8D] mt-0.5">Smart Healthcare</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            {navItems.map((item, i) => (
              <a
                key={item.name}
                href={item.href}
                className="text-[#374151] hover:text-[#2A9D7E] transition-colors duration-300 font-medium text-sm relative group"
              >
                {item.name}
                <span
                  className="absolute -bottom-1 left-0 w-0 h-0.5 rounded-full group-hover:w-full transition-all duration-300"
                  style={{ background: 'linear-gradient(90deg, #2A9D7E, #1DB5CC)' }}
                />
                {i === 0 && (
                  <span
                    className="absolute -bottom-1 left-0 w-full h-0.5 rounded-full"
                    style={{ background: 'linear-gradient(90deg, #2A9D7E, #1DB5CC)' }}
                  />
                )}
              </a>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="hidden lg:flex items-center gap-3">
            {onOpenAnalyzer && (
              <button
                onClick={onOpenAnalyzer}
                className="flex items-center gap-2 px-4 py-2 rounded-xl border border-[#2A9D7E] text-[#2A9D7E] hover:bg-[#E0F2EE] font-semibold text-sm transition-all duration-300 hover:scale-105"
              >
                <Sparkles className="w-4 h-4" />
                <span>AI Diagnostics</span>
              </button>
            )}
            <button
              className="flex items-center gap-2 px-6 py-2 rounded-xl text-white font-semibold text-sm transition-all duration-300 hover:scale-105 hover:shadow-lg"
              style={{
                background: 'linear-gradient(135deg, #E85A60, #C94248)',
                boxShadow: '0 4px 14px rgba(232, 90, 96, 0.35)',
              }}
            >
              <Phone className="w-4 h-4" />
              <span>Emergency</span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2 text-[#374151] hover:text-[#2A9D7E] transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden mt-4 pb-4 border-t border-[#DFF0EB] pt-4 space-y-3">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="block text-[#374151] hover:text-[#2A9D7E] transition-colors font-medium py-1"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item.name}
              </a>
            ))}
            <div className="pt-3">
              <button
                className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-white font-semibold"
                style={{ background: 'linear-gradient(135deg, #E85A60, #C94248)' }}
              >
                <Phone className="w-4 h-4" />
                <span>Emergency</span>
              </button>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
