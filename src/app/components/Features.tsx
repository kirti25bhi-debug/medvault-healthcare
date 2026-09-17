import { Smartphone, Clock, Lock, TrendingUp, Users, Wifi } from 'lucide-react';
import { GlassCard } from './GlassCard';

const features = [
  {
    icon: Smartphone,
    title: 'Mobile First',
    description: 'Access healthcare services seamlessly on any device, anytime.',
  },
  {
    icon: Clock,
    title: '24/7 Availability',
    description: 'Round-the-clock medical support and emergency assistance.',
  },
  {
    icon: Lock,
    title: 'Data Security',
    description: 'Industry-standard compliance with end-to-end encryption for all records.',
  },
  {
    icon: TrendingUp,
    title: 'Health Analytics',
    description: 'Track your health metrics and get personalized insights.',
  },
  {
    icon: Users,
    title: 'Expert Network',
    description: 'Access to a vast network of verified medical professionals.',
  },
  {
    icon: Wifi,
    title: 'Telemedicine Support',
    description: 'High-definition video consultations with certified doctors anytime, anywhere.',
  },
];

export function Features() {
  return (
    <section
      id="features"
      className="relative py-28"
      style={{ background: 'linear-gradient(180deg, #F0FAF8 0%, #FFFFFF 100%)' }}
    >
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16 space-y-4">
          <div
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-semibold mb-4"
            style={{ background: '#E0F2EE', color: '#2A9D7E' }}
          >
            Platform Features
          </div>
          <h2 className="text-[#0D2B3E]">
            Why Choose{' '}
            <span
              style={{
                background: 'linear-gradient(135deg, #2A9D7E, #1DB5CC)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              MedVault
            </span>
          </h2>
          <p className="text-lg text-[#6B7A8D] max-w-2xl mx-auto">
            Built with the latest technology to provide you with the best healthcare
            experience possible.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className="group"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex items-start gap-4">
                <div
                  className="w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-300 group-hover:scale-110"
                  style={{
                    background: 'linear-gradient(135deg, #2A9D7E, #1DB5CC)',
                    boxShadow: '0 6px 18px rgba(42,157,126,0.28)',
                  }}
                >
                  <feature.icon className="w-7 h-7 text-white" />
                </div>
                <div className="flex-1 pt-1">
                  <h4 className="mb-2 text-[#0D2B3E] group-hover:text-[#2A9D7E] transition-colors">
                    {feature.title}
                  </h4>
                  <p className="text-[#6B7A8D] leading-relaxed text-sm">{feature.description}</p>
                  <div
                    className="mt-3 h-0.5 w-0 group-hover:w-full transition-all duration-500 rounded-full"
                    style={{ background: 'linear-gradient(90deg, #2A9D7E, #1DB5CC)' }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-20">
          <GlassCard glowColor="green" className="p-12 text-center" hoverEffect={false}>
            <div
              className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6"
              style={{ background: 'linear-gradient(135deg, #2A9D7E, #1DB5CC)' }}
            >
              <TrendingUp className="w-8 h-8 text-white" />
            </div>
            <h3 className="mb-4 text-[#0D2B3E]">Ready to Transform Your Healthcare Experience?</h3>
            <p className="text-[#6B7A8D] text-lg mb-8 max-w-2xl mx-auto">
              Join thousands of patients who trust Arogya Pralekh for their health
              and wellness needs.
            </p>
            <button
              className="px-10 py-4 rounded-xl text-white font-semibold transition-all duration-300 hover:scale-105"
              style={{
                background: 'linear-gradient(135deg, #2A9D7E, #1E7A64)',
                boxShadow: '0 6px 20px rgba(42,157,126,0.35)',
              }}
            >
              Start Your Journey
            </button>
          </GlassCard>
        </div>
      </div>
    </section>
  );
}
