import { ArrowRight, Activity, Shield, Zap } from 'lucide-react';
import { GlassCard } from './GlassCard';

interface HeroProps {
  onOpenAnalyzer?: () => void;
}

export function Hero({ onOpenAnalyzer }: HeroProps) {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center pt-24 pb-0 overflow-hidden"
      style={{ background: 'linear-gradient(160deg, #F0FAF8 0%, #FFFFFF 60%)' }}
    >
      {/* Background decorative cross */}
      <div className="absolute top-20 right-12 opacity-10">
        <div className="w-24 h-24 relative">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-6 h-24 bg-[#1DB5CC] rounded-full" />
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-24 h-6 bg-[#1DB5CC] rounded-full" />
          </div>
        </div>
      </div>

      {/* EKG line decoration */}
      <div className="absolute bottom-32 right-0 w-80 opacity-15">
        <svg viewBox="0 0 320 60" fill="none" className="w-full">
          <polyline
            points="0,30 40,30 60,10 75,50 90,5 105,55 120,30 160,30 175,30 320,30"
            stroke="#1DB5CC"
            strokeWidth="2"
            fill="none"
          />
        </svg>
      </div>

      {/* Wave bottom */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
          <path
            d="M0,60 C200,110 400,20 600,70 C800,120 1000,30 1200,70 C1320,95 1400,65 1440,60 L1440,120 L0,120 Z"
            fill="#E8F5F2"
            opacity="0.6"
          />
          <path
            d="M0,80 C240,40 480,100 720,70 C960,40 1200,90 1440,80 L1440,120 L0,120 Z"
            fill="#F0FAF8"
            opacity="0.8"
          />
        </svg>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            {/* Badge */}
            <div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium"
              style={{ background: '#E0F2EE', color: '#2A9D7E' }}
            >
              <span className="w-2 h-2 rounded-full bg-[#2A9D7E] animate-pulse" />
              <span>Smart Healthcare Platform</span>
            </div>

            {/* Heading */}
            <div>
              <h1 className="mb-5 text-[#0D2B3E]">
                Your Health,
                <br />
                <span
                  style={{
                    background: 'linear-gradient(135deg, #2A9D7E, #1DB5CC)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}
                >
                  Our Priority
                </span>
              </h1>
              <p className="text-lg text-[#6B7A8D] leading-relaxed max-w-lg">
                Experience the future of healthcare with AI-powered diagnostics,
                24/7 virtual consultations, and personalized treatment plans.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4">
              <button
                onClick={onOpenAnalyzer}
                className="flex items-center gap-2 px-8 py-3.5 rounded-xl text-white font-semibold transition-all duration-300 hover:scale-105 group"
                style={{
                  background: 'linear-gradient(135deg, #2A9D7E, #1E7A64)',
                  boxShadow: '0 6px 20px rgba(42, 157, 126, 0.35)',
                }}
              >
                <span>Get Started</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <a 
                href="#health-records"
                className="flex items-center gap-2 px-8 py-3.5 rounded-xl border-2 border-[#0D2B3E] text-[#0D2B3E] font-semibold hover:bg-[#0D2B3E] hover:text-white transition-all duration-300"
              >
                <span>View Health Records</span>
              </a>
            </div>

            {/* Stats */}
            <div className="flex items-center gap-8 pt-4">
              <div>
                <div
                  className="text-4xl font-bold mb-1"
                  style={{
                    background: 'linear-gradient(135deg, #2A9D7E, #1E7A64)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}
                >
                  50K+
                </div>
                <div className="text-sm text-[#6B7A8D] font-medium">Patients</div>
              </div>
              <div className="w-px h-10 bg-[#DFF0EB]" />
              <div>
                <div
                  className="text-4xl font-bold mb-1"
                  style={{
                    background: 'linear-gradient(135deg, #1DB5CC, #1490A8)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}
                >
                  200+
                </div>
                <div className="text-sm text-[#6B7A8D] font-medium">Specialists</div>
              </div>
            </div>
          </div>

          {/* Right Content — Feature Cards */}
          <div className="relative space-y-5">
            <div onClick={onOpenAnalyzer} className="cursor-pointer">
              <GlassCard glowColor="green" className="p-6">
                <div className="flex items-start gap-4">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ background: 'linear-gradient(135deg, #2A9D7E, #1DB5CC)' }}
                  >
                    <Activity className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="text-[#0D2B3E]">AI-Powered Diagnostics</h4>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#E0F2EE] text-[#2A9D7E]">Live AI</span>
                    </div>
                    <p className="text-[#6B7A8D] text-sm leading-relaxed">
                      Advanced machine learning algorithms for accurate and rapid health assessments. Click to analyze lab results.
                    </p>
                  </div>
                </div>
              </GlassCard>
            </div>

            <GlassCard glowColor="cyan" className="p-6">
              <div className="flex items-start gap-4">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ background: 'linear-gradient(135deg, #1DB5CC, #1490A8)' }}
                >
                  <Shield className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h4 className="mb-1 text-[#0D2B3E]">Secure & Private</h4>
                  <p className="text-[#6B7A8D] text-sm leading-relaxed">
                    Bank-level encryption ensures your medical records are completely confidential.
                  </p>
                </div>
              </div>
            </GlassCard>

            <GlassCard glowColor="blue" className="p-6">
              <div className="flex items-start gap-4">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ background: 'linear-gradient(135deg, #2A9D7E, #1DB5CC)' }}
                >
                  <Zap className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h4 className="mb-1 text-[#0D2B3E]">Instant Access</h4>
                  <p className="text-[#6B7A8D] text-sm leading-relaxed">
                    Connect with healthcare professionals 24/7 from anywhere in the world.
                  </p>
                </div>
              </div>
            </GlassCard>

            {/* Soft ambient glow */}
            <div className="absolute -top-10 -right-10 w-48 h-48 bg-[#2A9D7E]/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-[#1DB5CC]/10 rounded-full blur-3xl pointer-events-none" />
          </div>
        </div>
      </div>
    </section>
  );
}
