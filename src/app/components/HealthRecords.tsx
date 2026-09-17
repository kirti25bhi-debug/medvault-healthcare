import { useState, useEffect } from 'react';
import { 
  FileText, 
  Link2, 
  Clock, 
  Baby, 
  Users, 
  Database, 
  Search, 
  Sparkles, 
  ChevronLeft, 
  ChevronRight, 
  Activity,
  AlertCircle,
  Stethoscope
} from 'lucide-react';
import { GlassCard } from './GlassCard';

interface HealthRecordsProps {
  onOpenAnalyzer?: (patient?: any) => void;
}

export function HealthRecords({ onOpenAnalyzer }: HealthRecordsProps) {
  const [patients, setPatients] = useState<any[]>([]);
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [search, setSearch] = useState('');
  const [careFilter, setCareFilter] = useState<'all' | 'in-care' | 'out-care'>('all');

  // Fetch stats once
  useEffect(() => {
    fetch('/api/patients/stats')
      .then(res => res.json())
      .then(data => setStats(data))
      .catch(() => {});
  }, []);

  // Fetch paginated patients
  useEffect(() => {
    setLoading(true);
    const params = new URLSearchParams({
      page: page.toString(),
      limit: '7',
      search: search.trim(),
      careType: careFilter,
    });

    fetch(`/api/patients?${params.toString()}`)
      .then(res => res.json())
      .then(resData => {
        setPatients(resData.data || []);
        if (resData.pagination) {
          setTotalPages(resData.pagination.totalPages);
          setTotalCount(resData.pagination.total);
        }
      })
      .catch(() => {
        // Fallback if server is not yet running
        setPatients([]);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [page, search, careFilter]);

  return (
    <section id="health-records" className="relative py-28 bg-[#F0FAF8]">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16 space-y-4">
          <div
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-semibold mb-4"
            style={{ background: '#E0F2EE', color: '#2A9D7E' }}
          >
            Health Records & Diagnostics
          </div>
          <h2 className="text-[#0D2B3E]">
            Lifetime{' '}
            <span
              style={{
                background: 'linear-gradient(135deg, #2A9D7E, #1DB5CC)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Health Records Management
            </span>
          </h2>
          <p className="text-lg text-[#6B7A8D] max-w-3xl mx-auto">
            Complete medical history and laboratory blood profiles from birth to present, securely stored and
            instantly accessible with integrated AI triage diagnostics.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          {/* Timeline Visualization */}
          <div className="relative">
            <GlassCard glowColor="cyan" className="p-8">
              <h3 className="mb-8 text-center text-[#0D2B3E]">Your Health Journey</h3>

              {/* Timeline */}
              <div className="relative space-y-8">
                {/* Timeline Line */}
                <div
                  className="absolute left-[27px] top-8 bottom-8 w-0.5"
                  style={{
                    background: 'linear-gradient(180deg, #2A9D7E, #1DB5CC, #2A9D7E)',
                  }}
                />

                {/* Timeline Items */}
                {[
                  {
                    icon: Baby,
                    title: 'Birth Records',
                    date: 'Day 1',
                    description: 'Linked to parent accounts',
                    color: '#2A9D7E',
                  },
                  {
                    icon: FileText,
                    title: 'Vaccination History',
                    date: 'Childhood',
                    description: 'Complete immunization records',
                    color: '#1DB5CC',
                  },
                  {
                    icon: Database,
                    title: 'Medical History',
                    date: 'All Years',
                    description: 'Diagnoses, treatments, prescriptions',
                    color: '#1490A8',
                  },
                  {
                    icon: Clock,
                    title: 'Recent Consultations',
                    date: 'Present',
                    description: 'Latest health checkups & reports',
                    color: '#E85A60',
                  },
                ].map((item, index) => (
                  <div key={index} className="relative flex items-start gap-4 pl-2">
                    <div
                      className="w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0 z-10 text-white"
                      style={{
                        background: `linear-gradient(135deg, ${item.color}, ${item.color}dd)`,
                        boxShadow: `0 6px 18px ${item.color}40`,
                      }}
                    >
                      <item.icon className="w-6 h-6" />
                    </div>
                    <div className="flex-1 pt-2">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="text-[#0D2B3E] font-semibold">{item.title}</h4>
                        <span className="text-xs text-[#2A9D7E] px-2.5 py-0.5 rounded-full bg-[#E0F2EE] font-medium">
                          {item.date}
                        </span>
                      </div>
                      <p className="text-sm text-[#6B7A8D]">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </GlassCard>
          </div>

          {/* Features List */}
          <div className="space-y-6">
            <GlassCard glowColor="blue" className="p-6">
              <div className="flex items-start gap-4">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 text-white"
                  style={{
                    background: 'linear-gradient(135deg, #1DB5CC, #2A9D7E)',
                    boxShadow: '0 6px 18px rgba(29, 181, 204, 0.3)',
                  }}
                >
                  <Database className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="mb-1 text-[#0D2B3E]">Complete Medical History</h4>
                  <p className="text-[#6B7A8D] text-sm leading-relaxed">
                    Every consultation, diagnosis, prescription, lab report, and
                    health record from birth to present day, all in one secure
                    digital vault.
                  </p>
                </div>
              </div>
            </GlassCard>

            <GlassCard glowColor="green" className="p-6">
              <div className="flex items-start gap-4">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 text-white"
                  style={{
                    background: 'linear-gradient(135deg, #2A9D7E, #1E7A64)',
                    boxShadow: '0 6px 18px rgba(42, 157, 126, 0.3)',
                  }}
                >
                  <Link2 className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="mb-1 text-[#0D2B3E]">Family Account Linking</h4>
                  <p className="text-[#6B7A8D] text-sm leading-relaxed">
                    Newborns' records are automatically connected to parents'
                    accounts. Parents can manage and access their children's health
                    data until they're old enough to take control.
                  </p>
                </div>
              </div>
            </GlassCard>

            <GlassCard glowColor="cyan" className="p-6">
              <div className="flex items-start gap-4">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 text-white"
                  style={{
                    background: 'linear-gradient(135deg, #2A9D7E, #1DB5CC)',
                    boxShadow: '0 6px 18px rgba(42, 157, 126, 0.3)',
                  }}
                >
                  <Users className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="mb-1 text-[#0D2B3E]">Seamless Record Transfer</h4>
                  <p className="text-[#6B7A8D] text-sm leading-relaxed">
                    Share your complete medical history with any healthcare provider
                    instantly. No more filling out the same forms or remembering past
                    medications.
                  </p>
                </div>
              </div>
            </GlassCard>
          </div>
        </div>

        {/* Stats Banner */}
        <GlassCard glowColor="green" className="p-8 mb-16">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <div
                className="text-4xl font-bold mb-2"
                style={{
                  background: 'linear-gradient(135deg, #2A9D7E, #1DB5CC)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                {stats?.totalPatients ? stats.totalPatients.toLocaleString() : '5,074'}
              </div>
              <div className="text-[#0D2B3E] font-semibold">Laboratory Profiles Indexed</div>
              <p className="text-sm text-[#6B7A8D] mt-1">
                Full hematology panels in database
              </p>
            </div>
            <div>
              <div
                className="text-4xl font-bold mb-2"
                style={{
                  background: 'linear-gradient(135deg, #1DB5CC, #1490A8)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                {stats?.outCareCount ? `${stats.outCarePercentage}%` : '59.7%'}
              </div>
              <div className="text-[#0D2B3E] font-semibold">Out-Patient Care Appropriate</div>
              <p className="text-sm text-[#6B7A8D] mt-1">
                {stats?.outCareCount ? `${stats.outCareCount.toLocaleString()} patients` : '3,028 patients'} monitored
              </p>
            </div>
            <div>
              <div
                className="text-4xl font-bold mb-2"
                style={{
                  background: 'linear-gradient(135deg, #E85A60, #C94248)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                {stats?.inCareCount ? `${stats.inCarePercentage}%` : '40.3%'}
              </div>
              <div className="text-[#0D2B3E] font-semibold">In-Care Hospital Admission</div>
              <p className="text-sm text-[#6B7A8D] mt-1">
                {stats?.inCareCount ? `${stats.inCareCount.toLocaleString()} patients` : '2,046 patients'} admitted
              </p>
            </div>
          </div>
        </GlassCard>

        {/* Live Patient Lab Database & Triage Explorer */}
        <div className="space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#E0F2EE] text-[#2A9D7E] mb-1">
                <Database className="w-3.5 h-3.5" />
                <span>Live Hospital Dataset</span>
              </div>
              <h3 className="text-2xl font-bold text-[#0D2B3E]">Patient Lab Records & AI Diagnostics</h3>
              <p className="text-sm text-[#6B7A8D]">
                Browse real clinical blood panels or launch AI triage predictions for any patient.
              </p>
            </div>

            {onOpenAnalyzer && (
              <button
                onClick={() => onOpenAnalyzer()}
                className="flex items-center gap-2 px-6 py-3 rounded-xl text-white font-semibold text-sm transition-all duration-300 hover:scale-105"
                style={{
                  background: 'linear-gradient(135deg, #2A9D7E, #1E7A64)',
                  boxShadow: '0 6px 20px rgba(42, 157, 126, 0.3)',
                }}
              >
                <Sparkles className="w-4 h-4" />
                <span>Test Custom Blood Panel</span>
              </button>
            )}
          </div>

          {/* Search & Filter Bar */}
          <GlassCard glowColor="cyan" className="p-4">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="relative w-full sm:w-72">
                <Search className="w-4 h-4 text-[#6B7A8D] absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search ID, age, or status..."
                  value={search}
                  onChange={(e) => {
                    setSearch(e.target.value);
                    setPage(1);
                  }}
                  className="w-full pl-10 pr-4 py-2 rounded-xl border border-[#DFF0EB] bg-[#F0FAF8] text-sm text-[#0D2B3E] placeholder-[#6B7A8D] focus:bg-white focus:border-[#2A9D7E] focus:outline-none"
                />
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto">
                <button
                  onClick={() => { setCareFilter('all'); setPage(1); }}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                    careFilter === 'all'
                      ? 'bg-[#2A9D7E] text-white shadow-sm'
                      : 'bg-[#F0FAF8] text-[#6B7A8D] hover:bg-[#E0F2EE]'
                  }`}
                >
                  All ({totalCount})
                </button>
                <button
                  onClick={() => { setCareFilter('in-care'); setPage(1); }}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                    careFilter === 'in-care'
                      ? 'bg-red-500 text-white shadow-sm'
                      : 'bg-[#F0FAF8] text-[#6B7A8D] hover:bg-red-50 hover:text-red-700'
                  }`}
                >
                  In-Care (Admitted)
                </button>
                <button
                  onClick={() => { setCareFilter('out-care'); setPage(1); }}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                    careFilter === 'out-care'
                      ? 'bg-emerald-600 text-white shadow-sm'
                      : 'bg-[#F0FAF8] text-[#6B7A8D] hover:bg-emerald-50 hover:text-emerald-700'
                  }`}
                >
                  Out-Care (Routine)
                </button>
              </div>
            </div>
          </GlassCard>

          {/* Table */}
          <GlassCard glowColor="green" className="overflow-hidden p-0">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="bg-[#F0FAF8] border-b border-[#DFF0EB] text-xs font-bold text-[#0D2B3E] uppercase tracking-wider">
                  <tr>
                    <th className="py-3.5 px-4">Patient ID</th>
                    <th className="py-3.5 px-3">Age / Sex</th>
                    <th className="py-3.5 px-3">Hct (%)</th>
                    <th className="py-3.5 px-3">Hb (g/dL)</th>
                    <th className="py-3.5 px-3">RBC (×10¹²)</th>
                    <th className="py-3.5 px-3">WBC (×10⁹)</th>
                    <th className="py-3.5 px-3">Platelets</th>
                    <th className="py-3.5 px-3">MCV (fL)</th>
                    <th className="py-3.5 px-3">Care Status</th>
                    <th className="py-3.5 px-4 text-right">AI Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#DFF0EB]">
                  {loading ? (
                    <tr>
                      <td colSpan={10} className="py-12 text-center text-[#6B7A8D]">
                        <Activity className="w-6 h-6 animate-spin mx-auto text-[#2A9D7E] mb-2" />
                        <span>Loading patient lab records from backend...</span>
                      </td>
                    </tr>
                  ) : patients.length === 0 ? (
                    <tr>
                      <td colSpan={10} className="py-12 text-center text-[#6B7A8D]">
                        <AlertCircle className="w-6 h-6 mx-auto text-[#6B7A8D] mb-2" />
                        <span>No records found matching query. Ensure `npm run server` is running.</span>
                      </td>
                    </tr>
                  ) : (
                    patients.map((p) => (
                      <tr key={p.id} className="hover:bg-[#F0FAF8]/60 transition-colors">
                        <td className="py-3 px-4 font-bold text-[#0D2B3E]">#{p.id}</td>
                        <td className="py-3 px-3 text-[#374151]">
                          {p.age}y <span className="text-[#6B7A8D]">({p.sex})</span>
                        </td>
                        <td className="py-3 px-3 font-semibold text-[#0D2B3E]">{p.haematocrit}</td>
                        <td className="py-3 px-3 font-semibold text-[#0D2B3E]">{p.haemoglobins}</td>
                        <td className="py-3 px-3 text-[#374151]">{p.erythrocyte}</td>
                        <td className={`py-3 px-3 font-medium ${p.leucocyte > 12 ? 'text-amber-600 font-bold' : 'text-[#374151]'}`}>
                          {p.leucocyte}
                        </td>
                        <td className={`py-3 px-3 font-medium ${p.thrombocyte < 150 ? 'text-red-600 font-bold' : 'text-[#374151]'}`}>
                          {p.thrombocyte}
                        </td>
                        <td className="py-3 px-3 text-[#374151]">{p.mcv}</td>
                        <td className="py-3 px-3">
                          <span
                            className={`text-[11px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wide inline-flex items-center gap-1 ${
                              p.source === 'in-care'
                                ? 'bg-red-100 text-red-700'
                                : 'bg-emerald-100 text-emerald-700'
                            }`}
                          >
                            {p.source === 'in-care' ? 'In-Care' : 'Out-Care'}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-right">
                          <button
                            onClick={() => onOpenAnalyzer && onOpenAnalyzer(p)}
                            className="px-3 py-1.5 rounded-lg bg-[#E0F2EE] hover:bg-[#2A9D7E] text-[#2A9D7E] hover:text-white text-xs font-semibold transition-all inline-flex items-center gap-1"
                          >
                            <Stethoscope className="w-3 h-3" />
                            <span>Analyze</span>
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="p-4 bg-[#F0FAF8] border-t border-[#DFF0EB] flex items-center justify-between">
                <span className="text-xs text-[#6B7A8D]">
                  Showing page <span className="font-bold text-[#0D2B3E]">{page}</span> of{' '}
                  <span className="font-bold text-[#0D2B3E]">{totalPages}</span> ({totalCount} patients)
                </span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setPage(prev => Math.max(1, prev - 1))}
                    disabled={page <= 1}
                    className="p-1.5 rounded-lg border border-[#DFF0EB] text-[#0D2B3E] hover:bg-white disabled:opacity-40 disabled:cursor-not-allowed transition-all"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setPage(prev => Math.min(totalPages, prev + 1))}
                    disabled={page >= totalPages}
                    className="p-1.5 rounded-lg border border-[#DFF0EB] text-[#0D2B3E] hover:bg-white disabled:opacity-40 disabled:cursor-not-allowed transition-all"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}
          </GlassCard>
        </div>
      </div>
    </section>
  );
}
