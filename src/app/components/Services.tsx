import { Stethoscope, Brain, Heart, Pill, UserCheck, Activity } from 'lucide-react';
import { GlassCard } from './GlassCard';

const services = [
  {
    icon: Stethoscope,
    title: 'General Consultation',
    description: 'Connect with experienced doctors for routine checkups and health advice.',
    color: 'blue' as const,
    iconBg: 'linear-gradient(135deg, #2A9D7E, #1DB5CC)',
    iconShadow: 'rgba(42,157,126,0.25)',
  },
  {
    icon: Brain,
    title: 'Mental Health',
    description: 'Professional counseling and therapy sessions for mental wellness.',
    color: 'cyan' as const,
    iconBg: 'linear-gradient(135deg, #1DB5CC, #1490A8)',
    iconShadow: 'rgba(29,181,204,0.25)',
  },
  {
    icon: Heart,
    title: 'Cardiology',
    description: 'Specialized cardiac care and heart health monitoring services.',
    color: 'red' as const,
    iconBg: 'linear-gradient(135deg, #E85A60, #C94248)',
    iconShadow: 'rgba(232,90,96,0.25)',
  },
  {
    icon: Pill,
    title: 'Pharmacy',
    description: 'Order medications online with doorstep delivery and reminders.',
    color: 'green' as const,
    iconBg: 'linear-gradient(135deg, #2A9D7E, #1E7A64)',
    iconShadow: 'rgba(42,157,126,0.25)',
  },
  {
    icon: UserCheck,
    title: 'Lab Tests',
    description: 'Book diagnostic tests and receive reports digitally with AI analysis.',
    color: 'blue' as const,
    iconBg: 'linear-gradient(135deg, #1DB5CC, #2A9D7E)',
    iconShadow: 'rgba(29,181,204,0.25)',
  },
  {
    icon: Activity,
    title: 'Emergency Care',
    description: 'Rapid emergency response, instant triage, and ambulance dispatch 24/7.',
    color: 'red' as const,
    iconBg: 'linear-gradient(135deg, #E85A60, #C94248)',
    iconShadow: 'rgba(232,90,96,0.25)',
  },
];

interface ServicesProps {
  onOpenAnalyzer?: () => void;
}

export function Services({ onOpenAnalyzer }: ServicesProps) {
  return (
    <section id="services" className="relative py-28 bg-white">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16 space-y-4">
          <div
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-semibold mb-4"
            style={{ background: '#E0F2EE', color: '#2A9D7E' }}
          >
            Our Services
          </div>
          <h2 className="text-[#0D2B3E]">
            Comprehensive{' '}
            <span
              style={{
                background: 'linear-gradient(135deg, #2A9D7E, #1DB5CC)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Healthcare Solutions
            </span>
          </h2>
          <p className="text-lg text-[#6B7A8D] max-w-2xl mx-auto">
            From preventive care to specialized treatments, we offer a full spectrum
            of medical services powered by cutting-edge technology.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <div
              key={service.title}
              onClick={() => {
                if (service.title === 'Lab Tests' && onOpenAnalyzer) {
                  onOpenAnalyzer();
                }
              }}
            >
              <GlassCard
                glowColor={service.color}
                className="p-8 group cursor-pointer h-full"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="mb-5">
                  <div
                    className="w-16 h-16 rounded-2xl flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110"
                    style={{
                      background: service.iconBg,
                      boxShadow: `0 6px 20px ${service.iconShadow}`,
                    }}
                  >
                    <service.icon className="w-8 h-8 text-white" />
                  </div>
                </div>
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-[#0D2B3E] group-hover:text-[#2A9D7E] transition-colors">
                    {service.title}
                  </h4>
                  {service.title === 'Lab Tests' && (
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#E0F2EE] text-[#2A9D7E]">
                      AI Diagnostics
                    </span>
                  )}
                </div>
                <p className="text-[#6B7A8D] leading-relaxed text-sm">{service.description}</p>
                <div className="mt-5 flex items-center text-[#2A9D7E] text-sm font-semibold gap-1 group-hover:gap-2 transition-all">
                  <span>{service.title === 'Lab Tests' ? 'Launch Analyzer' : 'Learn more'}</span>
                  <span className="opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                </div>
              </GlassCard>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
