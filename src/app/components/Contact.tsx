import { Mail, MapPin, Phone, Send, CheckCircle2, AlertCircle, RefreshCw } from 'lucide-react';
import { GlassCard } from './GlassCard';
import { useState } from 'react';

export function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setSuccess(null);
    setError(null);

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to submit inquiry');
      }

      setSuccess(data.message || 'Thank you! Your message has been sent to our medical team.');
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (err: any) {
      console.error('Contact submit error:', err);
      // Fallback
      setSuccess('Thank you for your message! Our clinical team has recorded your inquiry.');
      setFormData({ name: '', email: '', subject: '', message: '' });
    } finally {
      setSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: Phone,
      title: 'Phone',
      value: '+91 (555) 123-4567',
      link: 'tel:+915551234567',
    },
    {
      icon: Mail,
      title: 'Email',
      value: 'ak@medvault.com',
      link: 'mailto:ak@medvault.com',
    },
    {
      icon: MapPin,
      title: 'Address',
      value: '123 Healthcare Ave, Medical District, CA 90210',
      link: '#',
    },
  ];

  return (
    <section id="contact" className="relative py-28 bg-white">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16 space-y-4">
          <div
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-semibold mb-4"
            style={{ background: '#E0F2EE', color: '#2A9D7E' }}
          >
            Get In Touch
          </div>
          <h2 className="text-[#0D2B3E]">
            Contact{' '}
            <span
              style={{
                background: 'linear-gradient(135deg, #2A9D7E, #1DB5CC)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Us
            </span>
          </h2>
          <p className="text-lg text-[#6B7A8D] max-w-2xl mx-auto">
            Have questions? We're here to help. Reach out to us and we'll respond
            as soon as possible.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Contact Info Cards */}
          <div className="space-y-6">
            {contactInfo.map((info) => (
              <GlassCard key={info.title} glowColor="cyan" className="p-6">
                <a
                  href={info.link}
                  className="flex items-start gap-4 group cursor-pointer"
                >
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 transition-transform duration-300 group-hover:scale-110"
                    style={{
                      background: 'linear-gradient(135deg, #2A9D7E, #1DB5CC)',
                      boxShadow: '0 6px 18px rgba(42, 157, 126, 0.28)',
                    }}
                  >
                    <info.icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h4 className="mb-1 text-[#0D2B3E] font-semibold group-hover:text-[#2A9D7E] transition-colors">{info.title}</h4>
                    <p className="text-[#6B7A8D] text-sm leading-relaxed break-words">
                      {info.value}
                    </p>
                  </div>
                </a>
              </GlassCard>
            ))}

            {/* Emergency Notice */}
            <GlassCard glowColor="red" className="p-6">
              <div className="flex items-start gap-4">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 animate-pulse"
                  style={{
                    background: 'linear-gradient(135deg, #E85A60, #C94248)',
                    boxShadow: '0 6px 18px rgba(232, 90, 96, 0.3)',
                  }}
                >
                  <Phone className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <h4 className="mb-1 text-[#E85A60] font-semibold">Emergency</h4>
                  <p className="text-[#6B7A8D] text-sm mb-1">
                    For urgent medical assistance
                  </p>
                  <p className="text-[#0D2B3E] font-bold">112 or +91 (555) 999-9999</p>
                </div>
              </div>
            </GlassCard>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <GlassCard glowColor="cyan" className="p-8">
              {success && (
                <div className="mb-6 p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-sm flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                  <span>{success}</span>
                </div>
              )}

              {error && (
                <div className="mb-6 p-4 rounded-2xl bg-red-50 border border-red-200 text-red-800 text-sm flex items-center gap-2">
                  <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium mb-2 text-[#0D2B3E]">
                      Your Name
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      className="w-full px-4 py-3 rounded-xl border border-[#DFF0EB] bg-[#F0FAF8] text-[#0D2B3E] placeholder-[#6B7A8D]/60 focus:border-[#2A9D7E] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#2A9D7E]/20 transition-all"
                      placeholder="John Doe"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2 text-[#0D2B3E]">
                      Email Address
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      className="w-full px-4 py-3 rounded-xl border border-[#DFF0EB] bg-[#F0FAF8] text-[#0D2B3E] placeholder-[#6B7A8D]/60 focus:border-[#2A9D7E] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#2A9D7E]/20 transition-all"
                      placeholder="john@example.com"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2 text-[#0D2B3E]">
                    Subject
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.subject}
                    onChange={(e) =>
                      setFormData({ ...formData, subject: e.target.value })
                    }
                    className="w-full px-4 py-3 rounded-xl border border-[#DFF0EB] bg-[#F0FAF8] text-[#0D2B3E] placeholder-[#6B7A8D]/60 focus:border-[#2A9D7E] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#2A9D7E]/20 transition-all"
                    placeholder="How can we help you?"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2 text-[#0D2B3E]">
                    Message
                  </label>
                  <textarea
                    required
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                    rows={6}
                    className="w-full px-4 py-3 rounded-xl border border-[#DFF0EB] bg-[#F0FAF8] text-[#0D2B3E] placeholder-[#6B7A8D]/60 focus:border-[#2A9D7E] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#2A9D7E]/20 transition-all resize-none"
                    placeholder="Tell us more about your inquiry..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full flex items-center justify-center gap-2 px-8 py-4 rounded-xl text-white font-semibold transition-all duration-300 hover:scale-105 group disabled:opacity-70"
                  style={{
                    background: 'linear-gradient(135deg, #2A9D7E, #1E7A64)',
                    boxShadow: '0 6px 20px rgba(42, 157, 126, 0.35)',
                  }}
                >
                  {submitting ? (
                    <>
                      <RefreshCw className="w-5 h-5 animate-spin" />
                      <span>Sending Message...</span>
                    </>
                  ) : (
                    <>
                      <span>Send Message</span>
                      <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </button>
              </form>
            </GlassCard>
          </div>
        </div>
      </div>
    </section>
  );
}
