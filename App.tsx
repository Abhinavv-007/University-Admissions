import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  GraduationCap, 
  Calendar, 
  DollarSign, 
  Award, 
  Info, 
  CheckCircle2, 
  Clock, 
  XCircle,
  Globe2,
  TrendingUp,
  Filter
} from 'lucide-react';

type Status = 'offer' | 'pending' | 'rejected';

interface University {
  id: string;
  name: string;
  country: string;
  flag: string;
  program: string;
  statusText: string;
  status: Status;
  tuitionYear: string;
  tuitionTotal: string;
  scholarship: string;
  start?: string;
  notes?: string[];
}

const universities: University[] = [
  {
    id: 'tudelft',
    name: 'Delft University of Technology (TU Delft)',
    country: 'Netherlands',
    flag: '🇳🇱',
    program: 'BSc Computer Science & Engineering',
    statusText: 'Selection Ongoing',
    status: 'pending',
    tuitionYear: '€20,000',
    tuitionTotal: '€60,000',
    scholarship: 'Not confirmed',
    notes: ['Selection: CST Completed', 'Teamwork Assignment Submitted']
  },
  {
    id: 'tue',
    name: 'Eindhoven University of Technology (TU/e)',
    country: 'Netherlands',
    flag: '🇳🇱',
    program: 'BSc Computer Science & Engineering',
    statusText: 'Selection Ongoing',
    status: 'pending',
    tuitionYear: '€16,000',
    tuitionTotal: '€48,000',
    scholarship: 'Not confirmed',
    notes: ['Selection Day: 14 March 2026']
  },
  {
    id: 'twente',
    name: 'University of Twente',
    country: 'Netherlands',
    flag: '🇳🇱',
    program: 'BSc Technical Computer Science',
    statusText: 'Conditional / Under Review',
    status: 'pending',
    tuitionYear: '€13,000–€16,000',
    tuitionTotal: '€39,000–€48,000',
    scholarship: 'Not confirmed',
    notes: ['Application Fee: €100 (Paid)']
  },
  {
    id: 'deakin',
    name: 'Deakin University',
    country: 'Australia',
    flag: '🇦🇺',
    program: 'Bachelor of Computer Science',
    statusText: 'Offer Received',
    status: 'offer',
    tuitionYear: '~AUD 38,000–41,000',
    tuitionTotal: '~AUD 114,000–123,000',
    scholarship: '25% (Up to AUD 40,000)',
    start: 'Feb 2026'
  },
  {
    id: 'rmit',
    name: 'RMIT University',
    country: 'Australia',
    flag: '🇦🇺',
    program: 'Bachelor of Computer Science',
    statusText: 'Offer Received',
    status: 'offer',
    tuitionYear: '~AUD 38,000–41,000',
    tuitionTotal: '~AUD 114,000–123,000',
    scholarship: '20% (Up to AUD 35,000)',
    start: 'Feb 2026'
  },
  {
    id: 'uwa',
    name: 'University of Western Australia',
    country: 'Australia',
    flag: '🇦🇺',
    program: 'BSc (Computer Science)',
    statusText: 'Offer Received',
    status: 'offer',
    tuitionYear: '~AUD 49,000–51,000',
    tuitionTotal: '~AUD 147,000–153,000',
    scholarship: 'Global Excellence (Eligibility Based)',
    start: 'July 2026'
  },
  {
    id: 'monash',
    name: 'Monash University',
    country: 'Australia',
    flag: '🇦🇺',
    program: 'Bachelor of Computer Science',
    statusText: 'Conditional Offer',
    status: 'offer',
    tuitionYear: '~AUD 45,000–48,000',
    tuitionTotal: '~AUD 135,000–144,000',
    scholarship: 'Not confirmed',
    start: 'July 2026'
  },
  {
    id: 'uq',
    name: 'University of Queensland',
    country: 'Australia',
    flag: '🇦🇺',
    program: 'Bachelor of Computer Science',
    statusText: 'Provisional Offer',
    status: 'offer',
    tuitionYear: '~AUD 44,000–47,000',
    tuitionTotal: '~AUD 132,000–141,000',
    scholarship: 'Not confirmed',
    notes: ['Deposit Required: AUD 14,000'],
    start: 'July 2026'
  },
  {
    id: 'adelaide',
    name: 'University of Adelaide',
    country: 'Australia',
    flag: '🇦🇺',
    program: 'Bachelor of Computer Science',
    statusText: 'Conditional Offer',
    status: 'offer',
    tuitionYear: '~AUD 45,000–48,000',
    tuitionTotal: '~AUD 135,000–144,000',
    scholarship: 'Not confirmed',
    start: '2026'
  },
  {
    id: 'helsinki',
    name: 'University of Helsinki',
    country: 'Finland',
    flag: '🇫🇮',
    program: 'Computer Science',
    statusText: 'Rejected',
    status: 'rejected',
    tuitionYear: '~€13,000–€15,000',
    tuitionTotal: '~€39,000–€45,000',
    scholarship: 'N/A'
  }
];

const UniversityCard = ({ uni, index }: { uni: University; index: number }) => {
  const statusConfig = {
    offer: { icon: CheckCircle2, class: 'status-offer', text: 'text-emerald-400' },
    pending: { icon: Clock, class: 'status-pending', text: 'text-amber-400' },
    rejected: { icon: XCircle, class: 'status-rejected', text: 'text-red-400' }
  };

  const config = statusConfig[uni.status];
  const Icon = config.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className="glass-panel rounded-2xl p-6 flex flex-col h-full hover:bg-white/[0.02] transition-colors relative overflow-hidden group"
    >
      {/* Background glow based on status */}
      <div className={`absolute -top-24 -right-24 w-48 h-48 rounded-full blur-[80px] opacity-20 group-hover:opacity-40 transition-opacity ${
        uni.status === 'offer' ? 'bg-emerald-500' : 
        uni.status === 'pending' ? 'bg-amber-500' : 'bg-red-500'
      }`} />

      <div className="flex justify-between items-start mb-4 relative z-10">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-2xl">{uni.flag}</span>
            <span className="text-sm font-medium text-neutral-400 tracking-wider uppercase">{uni.country}</span>
          </div>
          <h3 className="text-xl font-display font-semibold text-white leading-tight">{uni.name}</h3>
        </div>
      </div>

      <div className="mb-6 relative z-10">
        <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium ${config.class}`}>
          <Icon size={14} />
          {uni.statusText}
        </div>
      </div>

      <div className="space-y-4 flex-grow relative z-10">
        <div className="flex items-start gap-3">
          <GraduationCap className="text-neutral-500 mt-0.5 shrink-0" size={18} />
          <div>
            <div className="text-xs text-neutral-500 uppercase tracking-wider mb-0.5">Program</div>
            <div className="text-sm text-neutral-200 font-medium">{uni.program}</div>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <DollarSign className="text-neutral-500 mt-0.5 shrink-0" size={18} />
          <div>
            <div className="text-xs text-neutral-500 uppercase tracking-wider mb-0.5">Tuition (2026)</div>
            <div className="text-sm text-neutral-200">{uni.tuitionYear} <span className="text-neutral-500 text-xs ml-1">/ yr</span></div>
            <div className="text-xs text-neutral-400 mt-0.5">Total: {uni.tuitionTotal}</div>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <Award className="text-neutral-500 mt-0.5 shrink-0" size={18} />
          <div>
            <div className="text-xs text-neutral-500 uppercase tracking-wider mb-0.5">Scholarship</div>
            <div className="text-sm text-neutral-200">{uni.scholarship}</div>
          </div>
        </div>

        {uni.start && (
          <div className="flex items-start gap-3">
            <Calendar className="text-neutral-500 mt-0.5 shrink-0" size={18} />
            <div>
              <div className="text-xs text-neutral-500 uppercase tracking-wider mb-0.5">Start Date</div>
              <div className="text-sm text-neutral-200">{uni.start}</div>
            </div>
          </div>
        )}
      </div>

      {uni.notes && uni.notes.length > 0 && (
        <div className="mt-6 pt-4 border-t border-white/5 relative z-10">
          <ul className="space-y-2">
            {uni.notes.map((note, i) => (
              <li key={i} className="flex items-start gap-2 text-xs text-neutral-400">
                <Info size={14} className="shrink-0 mt-0.5 text-neutral-500" />
                <span>{note}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </motion.div>
  );
};

const StatCard = ({ title, value, icon: Icon, color, bg, border }: any) => (
  <motion.div 
    initial={{ opacity: 0, scale: 0.95 }}
    animate={{ opacity: 1, scale: 1 }}
    className={`glass-panel p-6 rounded-2xl flex flex-col items-center justify-center text-center relative overflow-hidden ${border}`}
  >
    <div className={`absolute -right-4 -top-4 w-24 h-24 rounded-full blur-2xl opacity-50 ${bg}`} />
    <Icon size={24} className={`${color} mb-3 relative z-10`} />
    <div className="text-4xl font-display font-bold text-white mb-1 relative z-10">{value}</div>
    <div className="text-xs text-neutral-400 uppercase tracking-wider font-medium relative z-10">{title}</div>
  </motion.div>
);

const Stats = ({ data }: { data: University[] }) => {
  const total = data.length;
  const offers = data.filter(d => d.status === 'offer').length;
  const pending = data.filter(d => d.status === 'pending').length;
  const rejected = data.filter(d => d.status === 'rejected').length;

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
      <StatCard title="Total Applications" value={total} icon={Globe2} color="text-blue-400" bg="bg-blue-400/10" border="border-blue-400/20" />
      <StatCard title="Offers Received" value={offers} icon={CheckCircle2} color="text-emerald-400" bg="bg-emerald-400/10" border="border-emerald-400/20" />
      <StatCard title="Pending Decisions" value={pending} icon={Clock} color="text-amber-400" bg="bg-amber-400/10" border="border-amber-400/20" />
      <StatCard title="Rejections" value={rejected} icon={XCircle} color="text-red-400" bg="bg-red-400/10" border="border-red-400/20" />
    </div>
  );
};

export default function App() {
  const [filterCountry, setFilterCountry] = useState('All');
  const [filterStatus, setFilterStatus] = useState('All');

  const countries = ['All', ...Array.from(new Set(universities.map(u => u.country)))];
  const statuses = ['All', 'offer', 'pending', 'rejected'];

  const filteredData = useMemo(() => {
    return universities.filter(u => {
      const matchCountry = filterCountry === 'All' || u.country === filterCountry;
      const matchStatus = filterStatus === 'All' || u.status === filterStatus;
      return matchCountry && matchStatus;
    });
  }, [filterCountry, filterStatus]);

  return (
    <div className="min-h-screen bg-[#050505] text-neutral-200 selection:bg-emerald-500/30 font-sans pb-24">
      {/* Background Effects */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-emerald-900/20 blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-blue-900/20 blur-[120px]" />
      </div>

      <div className="container mx-auto px-6 pt-20 relative z-10 max-w-7xl">
        <motion.header 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-16 text-center"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-panel text-sm font-medium text-neutral-300 mb-6 border-white/10">
            <TrendingUp size={16} className="text-emerald-400" />
            <span>Class of 2026 Application Tracker</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-display font-bold text-white tracking-tight mb-6 glow-text">
            University Admissions
          </h1>
          <p className="text-lg text-neutral-400 max-w-2xl mx-auto">
            Tracking applications, offers, and decisions for Computer Science programs across Australia, Netherlands, and Finland.
          </p>
        </motion.header>

        <Stats data={universities} />

        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4 justify-between items-center mb-10 glass-panel p-4 rounded-2xl">
          <div className="flex items-center gap-3 w-full md:w-auto overflow-x-auto pb-2 md:pb-0 hide-scrollbar">
            <Filter size={18} className="text-neutral-500 shrink-0" />
            <div className="flex gap-2">
              {countries.map(c => (
                <button
                  key={c}
                  onClick={() => setFilterCountry(c)}
                  className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                    filterCountry === c 
                      ? 'bg-white text-black' 
                      : 'bg-white/5 text-neutral-400 hover:bg-white/10'
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-2 w-full md:w-auto overflow-x-auto pb-2 md:pb-0 hide-scrollbar">
            {statuses.map(s => (
              <button
                key={s}
                onClick={() => setFilterStatus(s)}
                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all capitalize ${
                  filterStatus === s 
                    ? 'bg-white text-black' 
                    : 'bg-white/5 text-neutral-400 hover:bg-white/10'
                }`}
              >
                {s === 'All' ? 'All Statuses' : s}
              </button>
            ))}
          </div>
        </div>

        {/* Grid */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredData.map((uni, index) => (
              <motion.div
                key={uni.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
              >
                <UniversityCard uni={uni} index={index} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {filteredData.length === 0 && (
          <div className="text-center py-20 text-neutral-500">
            <Globe2 size={48} className="mx-auto mb-4 opacity-20" />
            <p>No universities match the selected filters.</p>
          </div>
        )}
      </div>
    </div>
  );
}
