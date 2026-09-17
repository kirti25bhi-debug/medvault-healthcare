import { CheckCircle2 } from 'lucide-react';
import { GlassCard } from './GlassCard';

export function About() {
  const highlights = [
    'AI-powered health assessments and predictions',
    'Enterprise-grade data security and privacy',
    'Integrated EHR system for seamless records',
    'Lifetime medical records from birth to present',
    'Family account linking for newborns and children',
    'Multi-language support for regional accessibility',
    'Real-time health monitoring and alerts',
    'Personalized treatment recommendations',
  ];

  return (
    <section id="about" className="relative py-28 bg-white">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <div className="space-y-6">
            <div
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-semibold"
              style={{ background: '#E0F2EE', color: '#2A9D7E' }}
            >
              About Us
            </div>

            <h2 className="text-[#0D2B3E]">
              Revolutionizing Healthcare{' '}
              <span
                style={{
                  background: 'linear-gradient(135deg, #2A9D7E, #1DB5CC)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                Through Technology
              </span>
            </h2>

            <p className="text-lg text-[#6B7A8D] leading-relaxed">
              MedVault is at the forefront of digital healthcare innovation,
              combining advanced AI, machine learning, and telemedicine to make
              quality healthcare accessible to everyone.
            </p>

            <p className="text-lg text-[#6B7A8D] leading-relaxed">
              Our platform connects patients with the best medical professionals,
              provides instant access to complete lifetime health records, and delivers
              personalized care recommendations based on real-time data analysis.
            </p>

            <div className="space-y-3 pt-2">
              {highlights.map((highlight) => (
                <div key={highlight} className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#2A9D7E] flex-shrink-0 mt-0.5" />
                  <span className="text-[#374151] text-sm">{highlight}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Content — Stats Cards */}
          <div className="grid grid-cols-2 gap-5">
            <GlassCard glowColor="green" className="p-8 text-center">
              <div
                className="text-5xl font-bold mb-2"
                style={{
                  background: 'linear-gradient(135deg, #2A9D7E, #1DB5CC)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                50K+
              </div>
              <div className="text-[#6B7A8D] text-sm font-medium">Active Patients</div>
              <div className="w-12 h-1 mx-auto mt-4 rounded-full" style={{ background: 'linear-gradient(90deg, #2A9D7E, #1DB5CC)' }} />
            </GlassCard>

            <GlassCard glowColor="cyan" className="p-8 text-center">
              <div
                className="text-5xl font-bold mb-2"
                style={{
                  background: 'linear-gradient(135deg, #1DB5CC, #1490A8)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                200+
              </div>
              <div className="text-[#6B7A8D] text-sm font-medium">Specialists</div>
              <div className="w-12 h-1 mx-auto mt-4 rounded-full" style={{ background: 'linear-gradient(90deg, #1DB5CC, #1490A8)' }} />
            </GlassCard>

            <GlassCard glowColor="green" className="p-8 text-center">
              <div
                className="text-5xl font-bold mb-2"
                style={{
                  background: 'linear-gradient(135deg, #2A9D7E, #1E7A64)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                15K+
              </div>
              <div className="text-[#6B7A8D] text-sm font-medium">Consultations</div>
              <div className="w-12 h-1 mx-auto mt-4 rounded-full" style={{ background: 'linear-gradient(90deg, #2A9D7E, #1E7A64)' }} />
            </GlassCard>

            <GlassCard glowColor="red" className="p-8 text-center">
              <div
                className="text-5xl font-bold mb-2"
                style={{
                  background: 'linear-gradient(135deg, #E85A60, #C94248)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                24/7
              </div>
              <div className="text-[#6B7A8D] text-sm font-medium">Emergency Care</div>
              <div className="w-12 h-1 mx-auto mt-4 rounded-full" style={{ background: 'linear-gradient(90deg, #E85A60, #C94248)' }} />
            </GlassCard>
          </div>
        </div>

        {/* Mission Statement */}
        <div className="mt-20">
          <GlassCard glowColor="green" className="p-12" hoverEffect={false}>
            <div
              className="absolute inset-0 opacity-5 rounded-2xl"
              style={{ background: 'linear-gradient(135deg, #2A9D7E, #1DB5CC)' }}
            />
            <div className="relative max-w-4xl mx-auto text-center space-y-6">
              <h3 className="text-[#0D2B3E]">Our Mission</h3>
              <p className="text-xl text-[#6B7A8D] leading-relaxed">
                "To democratize healthcare by leveraging cutting-edge technology,
                ensuring that every individual has access to quality medical care
                regardless of their location or economic status. We believe in a
                future where healthcare is predictive, preventive, and personalized."
              </p>
            </div>
          </GlassCard>
        </div>
      </div>
    </section>
  );
}
