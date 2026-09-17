import { useState } from 'react';
import { 
  Activity, 
  AlertTriangle, 
  CheckCircle2, 
  ShieldAlert, 
  Sparkles, 
  X, 
  RefreshCw, 
  UserCheck, 
  ArrowRight,
  ClipboardList
} from 'lucide-react';
import { GlassCard } from './GlassCard';

interface DiagnosticAnalyzerProps {
  isOpen: boolean;
  onClose: () => void;
  initialData?: any;
}

export function DiagnosticAnalyzer({ isOpen, onClose, initialData }: DiagnosticAnalyzerProps) {
  const [formData, setFormData] = useState({
    haematocrit: initialData?.haematocrit?.toString() || '38.0',
    haemoglobins: initialData?.haemoglobins?.toString() || '12.5',
    erythrocyte: initialData?.erythrocyte?.toString() || '4.50',
    leucocyte: initialData?.leucocyte?.toString() || '8.0',
    thrombocyte: initialData?.thrombocyte?.toString() || '250',
    mch: initialData?.mch?.toString() || '28.2',
    mchc: initialData?.mchc?.toString() || '33.3',
    mcv: initialData?.mcv?.toString() || '84.6',
    age: initialData?.age?.toString() || '45',
    sex: initialData?.sex || 'F',
  });

  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const loadSample = (type: 'in-care' | 'out-care' | 'infection') => {
    if (type === 'in-care') {
      setFormData({
        haematocrit: '31.9',
        haemoglobins: '11.0',
        erythrocyte: '3.88',
        leucocyte: '13.5',
        thrombocyte: '50',
        mch: '28.4',
        mchc: '34.5',
        mcv: '82.2',
        age: '51',
        sex: 'F',
      });
    } else if (type === 'out-care') {
      setFormData({
        haematocrit: '42.3',
        haemoglobins: '14.6',
        erythrocyte: '4.78',
        leucocyte: '5.0',
        thrombocyte: '282',
        mch: '30.5',
        mchc: '34.5',
        mcv: '88.5',
        age: '27',
        sex: 'M',
      });
    } else {
      setFormData({
        haematocrit: '34.9',
        haemoglobins: '12.6',
        erythrocyte: '4.10',
        leucocyte: '18.5',
        thrombocyte: '120',
        mch: '30.7',
        mchc: '36.1',
        mcv: '85.1',
        age: '63',
        sex: 'M',
      });
    }
    setResult(null);
    setError(null);
  };

  const handleAnalyze = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const payload = {
        haematocrit: parseFloat(formData.haematocrit),
        haemoglobins: parseFloat(formData.haemoglobins),
        erythrocyte: parseFloat(formData.erythrocyte),
        leucocyte: parseFloat(formData.leucocyte),
        thrombocyte: parseFloat(formData.thrombocyte),
        mch: parseFloat(formData.mch),
        mchc: parseFloat(formData.mchc),
        mcv: parseFloat(formData.mcv),
        age: parseInt(formData.age, 10),
        sex: formData.sex,
      };

      const res = await fetch('/api/diagnostics/predict', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        throw new Error(`Server returned status ${res.status}`);
      }

      const data = await res.json();
      setResult(data);
    } catch (err: any) {
      console.error('Diagnosis error:', err);
      setError('Could not connect to backend diagnostics server. Make sure `npm run server` is running.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-4xl max-h-[92vh] overflow-y-auto bg-white rounded-3xl shadow-2xl border border-[#DFF0EB] p-6 md:p-8 my-8">
        {/* Header */}
        <div className="flex items-center justify-between pb-6 border-b border-[#DFF0EB]">
          <div className="flex items-center gap-3">
            <div 
              className="w-12 h-12 rounded-2xl flex items-center justify-center text-white"
              style={{ background: 'linear-gradient(135deg, #2A9D7E, #1DB5CC)' }}
            >
              <Activity className="w-6 h-6" />
            </div>
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full text-xs font-semibold bg-[#E0F2EE] text-[#2A9D7E] mb-1">
                <Sparkles className="w-3.5 h-3.5" />
                <span>AI Clinical Triage Engine</span>
              </div>
              <h3 className="text-xl font-bold text-[#0D2B3E]">Hematology Lab Test Analyzer</h3>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-2 rounded-xl text-[#6B7A8D] hover:text-[#0D2B3E] hover:bg-[#F0FAF8] transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Quick presets */}
        <div className="my-6 p-4 rounded-2xl bg-[#F0FAF8] border border-[#DFF0EB]">
          <div className="text-xs font-semibold text-[#6B7A8D] uppercase tracking-wider mb-2">
            Load Sample Patient Data from 5,074 Clinical Dataset:
          </div>
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => loadSample('in-care')}
              className="text-xs font-medium px-3.5 py-2 rounded-xl bg-red-50 text-red-700 border border-red-200 hover:bg-red-100 transition-colors flex items-center gap-1.5"
            >
              <AlertTriangle className="w-3.5 h-3.5 text-red-500" />
              <span>Sample Critical (In-Care Admitted)</span>
            </button>
            <button
              type="button"
              onClick={() => loadSample('out-care')}
              className="text-xs font-medium px-3.5 py-2 rounded-xl bg-emerald-50 text-emerald-700 border border-emerald-200 hover:bg-emerald-100 transition-colors flex items-center gap-1.5"
            >
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
              <span>Sample Stable (Out-Care Routine)</span>
            </button>
            <button
              type="button"
              onClick={() => loadSample('infection')}
              className="text-xs font-medium px-3.5 py-2 rounded-xl bg-amber-50 text-amber-700 border border-amber-200 hover:bg-amber-100 transition-colors flex items-center gap-1.5"
            >
              <Activity className="w-3.5 h-3.5 text-amber-500" />
              <span>Sample Acute Infection (High WBC)</span>
            </button>
          </div>
        </div>

        {/* Form Inputs */}
        <form onSubmit={handleAnalyze} className="space-y-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-xs font-semibold text-[#0D2B3E] mb-1">
                Haematocrit (%)
              </label>
              <input
                type="number"
                step="0.1"
                required
                value={formData.haematocrit}
                onChange={(e) => setFormData({ ...formData, haematocrit: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-[#DFF0EB] bg-[#F0FAF8] text-[#0D2B3E] font-medium text-sm focus:bg-white focus:border-[#2A9D7E] focus:outline-none"
                placeholder="36 - 50"
              />
              <span className="text-[10px] text-[#6B7A8D]">Norm: 36.0 - 50.0%</span>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#0D2B3E] mb-1">
                Hemoglobin (g/dL)
              </label>
              <input
                type="number"
                step="0.1"
                required
                value={formData.haemoglobins}
                onChange={(e) => setFormData({ ...formData, haemoglobins: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-[#DFF0EB] bg-[#F0FAF8] text-[#0D2B3E] font-medium text-sm focus:bg-white focus:border-[#2A9D7E] focus:outline-none"
                placeholder="12 - 17"
              />
              <span className="text-[10px] text-[#6B7A8D]">Norm: 12.0 - 17.0</span>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#0D2B3E] mb-1">
                Erythrocyte (×10¹²/L)
              </label>
              <input
                type="number"
                step="0.01"
                required
                value={formData.erythrocyte}
                onChange={(e) => setFormData({ ...formData, erythrocyte: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-[#DFF0EB] bg-[#F0FAF8] text-[#0D2B3E] font-medium text-sm focus:bg-white focus:border-[#2A9D7E] focus:outline-none"
                placeholder="4.0 - 5.5"
              />
              <span className="text-[10px] text-[#6B7A8D]">Norm: 4.0 - 5.5</span>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#0D2B3E] mb-1">
                Leucocyte (WBC ×10⁹/L)
              </label>
              <input
                type="number"
                step="0.1"
                required
                value={formData.leucocyte}
                onChange={(e) => setFormData({ ...formData, leucocyte: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-[#DFF0EB] bg-[#F0FAF8] text-[#0D2B3E] font-medium text-sm focus:bg-white focus:border-[#2A9D7E] focus:outline-none"
                placeholder="4.0 - 11.0"
              />
              <span className="text-[10px] text-[#6B7A8D]">Norm: 4.0 - 11.0</span>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#0D2B3E] mb-1">
                Thrombocyte (Platelets)
              </label>
              <input
                type="number"
                required
                value={formData.thrombocyte}
                onChange={(e) => setFormData({ ...formData, thrombocyte: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-[#DFF0EB] bg-[#F0FAF8] text-[#0D2B3E] font-medium text-sm focus:bg-white focus:border-[#2A9D7E] focus:outline-none"
                placeholder="150 - 450"
              />
              <span className="text-[10px] text-[#6B7A8D]">Norm: 150 - 450</span>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#0D2B3E] mb-1">
                MCV (fL)
              </label>
              <input
                type="number"
                step="0.1"
                required
                value={formData.mcv}
                onChange={(e) => setFormData({ ...formData, mcv: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-[#DFF0EB] bg-[#F0FAF8] text-[#0D2B3E] font-medium text-sm focus:bg-white focus:border-[#2A9D7E] focus:outline-none"
                placeholder="80 - 100"
              />
              <span className="text-[10px] text-[#6B7A8D]">Norm: 80 - 100</span>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#0D2B3E] mb-1">
                Age (Years)
              </label>
              <input
                type="number"
                required
                value={formData.age}
                onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-[#DFF0EB] bg-[#F0FAF8] text-[#0D2B3E] font-medium text-sm focus:bg-white focus:border-[#2A9D7E] focus:outline-none"
                placeholder="Age"
              />
              <span className="text-[10px] text-[#6B7A8D]">Patient Age</span>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#0D2B3E] mb-1">
                Biological Sex
              </label>
              <select
                value={formData.sex}
                onChange={(e) => setFormData({ ...formData, sex: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-[#DFF0EB] bg-[#F0FAF8] text-[#0D2B3E] font-medium text-sm focus:bg-white focus:border-[#2A9D7E] focus:outline-none"
              >
                <option value="F">Female (F)</option>
                <option value="M">Male (M)</option>
              </select>
              <span className="text-[10px] text-[#6B7A8D]">Gender</span>
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-3 rounded-xl border border-[#DFF0EB] text-[#6B7A8D] font-semibold hover:bg-[#F0FAF8] transition-all text-sm"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex items-center gap-2 px-8 py-3 rounded-xl text-white font-semibold transition-all duration-300 hover:scale-[1.02] text-sm"
              style={{
                background: 'linear-gradient(135deg, #2A9D7E, #1E7A64)',
                boxShadow: '0 6px 20px rgba(42, 157, 126, 0.35)',
              }}
            >
              {loading ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Evaluating Clinical Markers...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  <span>Run AI Diagnostic Triage</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </div>
        </form>

        {error && (
          <div className="mt-6 p-4 rounded-2xl bg-red-50 border border-red-200 text-red-700 text-sm flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Results Showcase */}
        {result && (
          <div className="mt-8 pt-8 border-t border-[#DFF0EB] space-y-6 animate-fade-in">
            {/* Triage Banner */}
            <div 
              className={`p-6 rounded-2xl border ${
                result.triageDecision === 'in-care' 
                  ? 'bg-red-50/70 border-red-200' 
                  : 'bg-emerald-50/70 border-emerald-200'
              }`}
            >
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div 
                    className={`w-12 h-12 rounded-2xl flex items-center justify-center text-white flex-shrink-0 ${
                      result.triageDecision === 'in-care' ? 'bg-red-500' : 'bg-emerald-600'
                    }`}
                  >
                    {result.triageDecision === 'in-care' ? (
                      <ShieldAlert className="w-6 h-6" />
                    ) : (
                      <CheckCircle2 className="w-6 h-6" />
                    )}
                  </div>
                  <div>
                    <span 
                      className={`text-xs font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full ${
                        result.triageDecision === 'in-care' 
                          ? 'bg-red-100 text-red-800' 
                          : 'bg-emerald-100 text-emerald-800'
                      }`}
                    >
                      {result.triageDecision === 'in-care' ? 'In-Patient Admission Recommended' : 'Out-Patient Routine Care'}
                    </span>
                    <h4 className="text-xl font-bold text-[#0D2B3E] mt-1">{result.triageLabel}</h4>
                  </div>
                </div>

                <div className="text-right">
                  <div className="text-2xl font-black text-[#0D2B3E]">
                    {result.riskScore}%
                  </div>
                  <div className="text-xs text-[#6B7A8D]">
                    In-Care Admission Risk Score ({result.riskLevel})
                  </div>
                </div>
              </div>

              <p className="mt-4 text-sm text-[#374151] leading-relaxed">
                {result.summary}
              </p>
            </div>

            {/* Critical Alerts if any */}
            {result.clinicalAlerts?.length > 0 && (
              <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 space-y-2">
                <div className="text-xs font-bold text-amber-900 uppercase tracking-wider flex items-center gap-1.5">
                  <AlertTriangle className="w-4 h-4 text-amber-600" />
                  <span>Clinical Flag Alerts ({result.clinicalAlerts.length})</span>
                </div>
                <ul className="space-y-1 pl-5 list-disc text-xs text-amber-800">
                  {result.clinicalAlerts.map((alert: string, idx: number) => (
                    <li key={idx}>{alert}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* Detailed Parameters Grid */}
            <div>
              <h5 className="text-sm font-bold text-[#0D2B3E] mb-3 flex items-center gap-2">
                <ClipboardList className="w-4 h-4 text-[#2A9D7E]" />
                <span>Laboratory Parameter Breakdown</span>
              </h5>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {result.parameters && Object.values(result.parameters).map((param: any) => (
                  <div 
                    key={param.key} 
                    className="p-3.5 rounded-xl border border-[#DFF0EB] bg-[#F0FAF8] text-left"
                  >
                    <div className="flex items-center justify-between gap-1 mb-1">
                      <span className="text-xs font-semibold text-[#0D2B3E] truncate">{param.name}</span>
                      <span 
                        className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                          param.status === 'critical' ? 'bg-red-100 text-red-700' :
                          param.status === 'warning' ? 'bg-amber-100 text-amber-700' :
                          'bg-emerald-100 text-emerald-700'
                        }`}
                      >
                        {param.flag}
                      </span>
                    </div>
                    <div className="text-base font-bold text-[#0D2B3E]">
                      {param.value} <span className="text-xs font-normal text-[#6B7A8D]">{param.unit}</span>
                    </div>
                    <div className="text-[10px] text-[#6B7A8D] mt-0.5">
                      Ref: {param.normalRange}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Doctor Recommendations */}
            {result.recommendations?.length > 0 && (
              <div className="p-5 rounded-2xl bg-white border border-[#DFF0EB] space-y-2">
                <div className="text-xs font-bold text-[#0D2B3E] uppercase tracking-wider flex items-center gap-1.5">
                  <UserCheck className="w-4 h-4 text-[#2A9D7E]" />
                  <span>Clinical Action Plan & Care Recommendations</span>
                </div>
                <div className="grid md:grid-cols-2 gap-2 pt-1">
                  {result.recommendations.map((rec: string, idx: number) => (
                    <div key={idx} className="flex items-start gap-2 text-xs text-[#374151]">
                      <span className="w-4 h-4 rounded-full bg-[#E0F2EE] text-[#2A9D7E] flex items-center justify-center font-bold text-[10px] flex-shrink-0 mt-0.5">
                        {idx + 1}
                      </span>
                      <span>{rec}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
