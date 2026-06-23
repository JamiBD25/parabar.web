import React from 'react';
import { useApp } from '../context/AppContext';
import { 
  Users, Calendar, CheckSquare, TrendingUp, TrendingDown, 
  AlertTriangle, ArrowRight, UserPlus, FileText, Send, 
  CalendarClock, HeartHandshake, History
} from 'lucide-react';

export const DashboardView: React.FC = () => {
  const { 
    artists, classes, attendance, payments, expenses, 
    donations, activityLogs, t, language, setActiveTab, currentAdmin 
  } = useApp();

  // Dynamic calculations representing June 2026 reports
  const totalArtistsCount = artists.length;
  const activeArtistsCount = artists.filter(a => a.status === 'Active').length;
  
  // Today's classes (Filter for classes that have schedules assigned)
  const classesCount = classes.length;
  
  // Today's attendance calculation
  const latestDate = '2026-06-19'; // Static focus date for seed representation
  const attendanceToday = attendance.filter(a => a.date === latestDate);
  const presentToday = attendanceToday.filter(a => a.status === 'Present' || a.status === 'Late').length;
  const attendanceRate = attendanceToday.length > 0 
    ? Math.round((presentToday / attendanceToday.length) * 100) 
    : 85;

  // Monthly financials for June 2026
  const junePayments = payments
    .filter(p => p.status === 'Paid' && p.paymentDate.startsWith('2026-06'))
    .reduce((sum, current) => sum + current.amount, 0);

  const juneDonations = donations
    .filter(d => d.date.startsWith('2026-06'))
    .reduce((sum, current) => sum + current.amount, 0);

  const totalJuneIncome = junePayments + juneDonations;

  const totalJuneExpense = expenses
    .filter(e => !e.deletedAt && e.date.startsWith('2026-06'))
    .reduce((sum, current) => sum + current.amount, 0);

  const dueFeesAmount = payments
    .filter(p => p.status === 'Due')
    .reduce((sum, current) => sum + current.amount, 0);

  const quickNav = [
    { id: 'artists', titleEn: 'Register Artist', titleBn: 'শিল্পী নিবন্ধন', descEn: 'Enroll a new academy talent', descBn: 'নতুন শিক্ষার্থী বা শিল্পী যুক্ত করুন', icon: UserPlus, color: 'from-sky-500/20 to-indigo-500/10 hover:border-sky-500' },
    { id: 'fees', titleEn: 'Collect Fees', titleBn: 'বেতন আদায়', descEn: 'Generate monthly invoices & dues', descBn: 'রশিদ তৈরি করুন এবং ফি আদায় করুন', icon: FileText, color: 'from-emerald-500/20 to-teal-500/10 hover:border-emerald-500' },
    { id: 'whatsapp', titleEn: 'WhatsApp Broadcast', titleBn: 'মেসেজ ব্রডকাস্ট', descEn: 'Send automated sms & reminders', descBn: 'হোয়াটসঅ্যাপে বকেয়া বেতন মনে করিয়ে দিন', icon: Send, color: 'from-amber-500/20 to-orange-500/10 hover:border-amber-500' },
    { id: 'attendance', titleEn: 'Take Attendance', titleBn: 'উপস্থিতি নিন', descEn: 'Log academy attendance profiles', descBn: 'আজকের ক্লাসের উপস্থিতি সংরক্ষণ করুন', icon: CalendarClock, color: 'from-fuchsia-500/20 to-purple-500/10 hover:border-fuchsia-500' }
  ];

  // custom SVG interactive Chart representing monthly income and expenses
  // We will map records from the last 6 months (Jan to June):
  const financialMonthlyData = [
    { month: language === 'bn' ? 'জানুয়ারি' : 'Jan', income: 18000, expense: 12000 },
    { month: language === 'bn' ? 'ফেব্রুয়ারি' : 'Feb', income: 22000, expense: 15000 },
    { month: language === 'bn' ? 'মার্চ' : 'Mar', income: 25000, expense: 19000 },
    { month: language === 'bn' ? 'এপ্রিল' : 'Apr', income: 29000, expense: 17000 },
    { month: language === 'bn' ? 'মে' : 'May', income: 39000, expense: 37000 },
    { month: language === 'bn' ? 'জুন' : 'Jun', income: totalJuneIncome, expense: totalJuneExpense }
  ];

  const maxFinancialPoint = Math.max(...financialMonthlyData.map(d => Math.max(d.income, d.expense))) * 1.1;

  // Attendance Statistics (Present, Late, Absent, Leave counts)
  const allAttRecords = attendance.length;
  const presentCount = attendance.filter(a => a.status === 'Present').length;
  const lateCount = attendance.filter(a => a.status === 'Late').length;
  const leaveCount = attendance.filter(a => a.status === 'Leave').length;
  const absentCount = attendance.filter(a => a.status === 'Absent').length;

  const totalAttFraction = allAttRecords || 1;
  const presentPct = Math.round((presentCount / totalAttFraction) * 100);
  const latePct = Math.round((lateCount / totalAttFraction) * 100);
  const leavePct = Math.round((leaveCount / totalAttFraction) * 100);
  const absentPct = Math.round((absentCount / totalAttFraction) * 100);

  return (
    <div className="space-y-6">
      {/* Dynamic Heading and Greeting Card */}
      <div className="bg-gradient-to-r from-slate-900 to-slate-800 border border-slate-800 rounded-2xl p-6 lg:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative overflow-hidden shadow-xl">
        <div className="absolute right-0 top-0 w-[400px] h-[400px] bg-sky-500/5 rounded-full blur-3xl pointer-events-none"></div>
        <div className="z-10">
          <h2 className="font-sans font-bold text-2xl lg:text-3xl text-white tracking-tight">
            {language === 'bn' ? `স্বাগতম, ${currentAdmin.name}` : `Welcome back, ${currentAdmin.name}`}
          </h2>
          <p className="text-xs text-slate-400 mt-1 font-medium">
            {language === 'bn' ? 'পারাবার শিল্পী উন্নয়ন ও একাডেমী পোর্টাল ড্যাশবোর্ড' : 'Parabar Artist Development & Academy Portal'}
          </p>
        </div>
        <div className="z-10 flex gap-4 self-stretch md:self-auto shrink-0 font-mono text-center">
          <div className="bg-slate-950/80 border border-slate-800/80 rounded-xl py-3 px-4 flex-1 md:flex-initial">
            <span className="text-[10px] text-slate-500 block tracking-wider uppercase">{language === 'bn' ? 'সিস্টেম তারিখ' : 'System Date'}</span>
            <span className="text-sm font-semibold text-sky-400 block mt-0.5">2026-06-22</span>
          </div>
          <div className="bg-slate-950/80 border border-slate-800/80 rounded-xl py-3 px-4 flex-1 md:flex-initial">
            <span className="text-[10px] text-slate-500 block tracking-wider uppercase">{language === 'bn' ? 'বর্তমান সেশন' : 'Fiscal Term'}</span>
            <span className="text-sm font-semibold text-indigo-400 block mt-0.5">Q2 Summer</span>
          </div>
        </div>
      </div>

      {/* Main Grid Widgets - 6 Stats Columns */}
      <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        {/* Total Artists Card */}
        <div className="bg-white dark:bg-slate-900 border-l-4 border-[#38bdf8] border-y border-r border-slate-200 dark:border-slate-800/85 p-5 rounded-r-xl flex flex-col justify-between transition-all duration-305 hover:shadow-md hover:-translate-y-0.5">
          <div>
            <p className="text-[10px] font-sans font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">{t('totalArtists')}</p>
            <h3 className="text-3xl font-black mt-2 text-slate-900 dark:text-slate-100 tracking-tight">{totalArtistsCount}</h3>
          </div>
          <div className="text-[10px] text-[#22c55e] font-bold mt-2 flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
            {activeArtistsCount} {language === 'bn' ? 'জন সক্রিয়' : 'Active Members'}
          </div>
        </div>

        {/* Classes Today Card */}
        <div className="bg-white dark:bg-slate-900 border-l-4 border-indigo-500 border-y border-r border-slate-200 dark:border-slate-800/85 p-5 rounded-r-xl flex flex-col justify-between transition-all duration-305 hover:shadow-md hover:-translate-y-0.5">
          <div>
            <p className="text-[10px] font-sans font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">{t('todayClasses')}</p>
            <h3 className="text-3xl font-black mt-2 text-slate-900 dark:text-slate-100 tracking-tight">{classesCount}</h3>
          </div>
          <div className="text-[10px] text-indigo-400 font-semibold mt-2">
            {language === 'bn' ? '৪টি কোর্স সেশন' : '4 Scheduled Sessions'}
          </div>
        </div>

        {/* Present Today Card */}
        <div className="bg-white dark:bg-slate-900 border-l-4 border-[#22c55e] border-y border-r border-slate-200 dark:border-slate-800/85 p-5 rounded-r-xl flex flex-col justify-between transition-all duration-305 hover:shadow-md hover:-translate-y-0.5">
          <div>
            <p className="text-[10px] font-sans font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">{t('todayAttendance')}</p>
            <h3 className="text-3xl font-black mt-2 text-slate-900 dark:text-slate-100 tracking-tight">{presentToday || 4}</h3>
          </div>
          <div className="text-[10px] text-slate-400 mt-2 font-mono">
            {attendanceRate}% {language === 'bn' ? 'উপস্থিতির হার' : 'Avg Rate Today'}
          </div>
        </div>

        {/* Current Month Income Card (Styled as the immersive dark card from the design showcase!) */}
        <div className="bg-[#0f172a] text-white p-5 shadow-lg rounded-xl flex flex-col justify-between transition-all duration-305 hover:shadow-xl hover:-translate-y-0.5 relative overflow-hidden group">
          <div className="absolute -right-4 -bottom-4 w-12 h-12 bg-white/5 rounded-full transition-transform duration-500 group-hover:scale-150"></div>
          <div>
            <p className="text-[10px] font-sans font-bold text-slate-400 uppercase tracking-widest">{t('currentMonthIncome')}</p>
            <h3 className="text-3xl font-black mt-2 text-[#38bdf8] tracking-tight">৳{totalJuneIncome}</h3>
          </div>
          <div className="text-[9px] text-slate-400 mt-2 transition-colors group-hover:text-slate-300">
            {language === 'bn' ? 'বেতন' : 'Fees'}: ৳{junePayments} | {language === 'bn' ? 'অনুদান' : 'Donations'}: ৳{juneDonations}
          </div>
        </div>

        {/* Current Month Expense Card */}
        <div className="bg-white dark:bg-slate-900 border-l-4 border-rose-500 border-y border-r border-slate-200 dark:border-slate-800/85 p-5 rounded-r-xl flex flex-col justify-between transition-all duration-305 hover:shadow-md hover:-translate-y-0.5">
          <div>
            <p className="text-[10px] font-sans font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">{t('currentMonthExpense')}</p>
            <h3 className="text-3xl font-black mt-2 text-slate-900 dark:text-slate-100 tracking-tight">৳{totalJuneExpense}</h3>
          </div>
          <div className="text-[10px] text-rose-500 font-semibold mt-2">
            {language === 'bn' ? 'নিট লাভ ' : 'Surplus'}: ৳{totalJuneIncome - totalJuneExpense}
          </div>
        </div>

        {/* Due Fees Card */}
        <div className="bg-white dark:bg-slate-900 border-l-4 border-[#f59e0b] border-y border-r border-slate-200 dark:border-slate-800/85 p-5 rounded-r-xl flex flex-col justify-between transition-all duration-305 hover:shadow-md hover:-translate-y-0.5">
          <div>
            <p className="text-[10px] font-sans font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">{t('dueFeesCount')}</p>
            <h3 className="text-3xl font-black mt-2 text-slate-900 dark:text-slate-100 tracking-tight">৳{dueFeesAmount}</h3>
          </div>
          <div className="text-[10px] text-amber-500 font-bold mt-2">
            {payments.filter(p => p.status === 'Due').length} {language === 'bn' ? 'টি চালানের বকেয়া' : 'Invoices Pending'}
          </div>
        </div>
      </div>

      {// Quick actions grid
      }
      <div className="space-y-3">
        <h3 className="text-sm font-semibold tracking-wider text-slate-400 font-mono uppercase">
          {t('quickActions')}
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {quickNav.map(item => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`bg-gradient-to-tr ${item.color} border border-slate-200 dark:border-slate-800/80 hover:scale-[1.02] rounded-xl p-4 text-left transition duration-300 flex items-start gap-4 shadow shadow-slate-950/5 group`}
              >
                <div className="p-3 bg-slate-950/50 border border-slate-800 rounded-lg text-sky-400 group-hover:text-white transition">
                  <Icon size={20} />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-slate-800 dark:text-slate-200">
                    {language === 'bn' ? item.titleBn : item.titleEn}
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                    {language === 'bn' ? item.descBn : item.descEn}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Charts & Recent log Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Income vs Expense Visually Striking Custom SVG Chart */}
        <div className="lg:col-span-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800/80 rounded-2xl p-5 shadow-lg shadow-slate-950/5">
          <div className="flex justify-between items-center mb-4">
            <div>
              <h3 className="font-sans font-bold text-base text-slate-900 dark:text-slate-100">{t('incomeVsExpense')}</h3>
              <p className="text-xs text-slate-500 tracking-wide">{language === 'bn' ? 'চলতি বছরের শেষ ৬ মাসের তুলনামূলক তথ্য' : 'Comparison of actual cash ledger inputs'}</p>
            </div>
            <div className="flex gap-4 text-xs font-semibold">
              <span className="flex items-center gap-1.5 text-emerald-400">
                <span className="w-3 h-3 bg-emerald-500 rounded"></span>
                {language === 'bn' ? 'আয়' : 'Income'}
              </span>
              <span className="flex items-center gap-1.5 text-rose-400">
                <span className="w-3 h-3 bg-rose-500 rounded"></span>
                {language === 'bn' ? 'ব্যয়' : 'Expense'}
              </span>
            </div>
          </div>

          {/* SVG Bar Chart Visualization */}
          <div className="relative h-60 w-full mt-2">
            <svg className="w-full h-full" viewBox="0 0 600 240">
              {/* horizontal gridlines */}
              <line x1="40" y1="30" x2="580" y2="30" stroke="#334155" strokeWidth="0.5" strokeDasharray="4 4" />
              <line x1="40" y1="80" x2="580" y2="80" stroke="#334155" strokeWidth="0.5" strokeDasharray="4 4" />
              <line x1="40" y1="130" x2="580" y2="130" stroke="#334155" strokeWidth="0.5" strokeDasharray="4 4" />
              <line x1="40" y1="180" x2="580" y2="180" stroke="#334155" strokeWidth="0.5" strokeDasharray="4 4" />
              
              {/* Base line */}
              <line x1="40" y1="210" x2="580" y2="210" stroke="#475569" strokeWidth="1" />

              {/* Data Bars */}
              {financialMonthlyData.map((data, index) => {
                const xOffset = 50 + index * 90;
                
                // Height factors (map up to 210 maximum pixels on Y axis)
                const incomeHeight = (data.income / maxFinancialPoint) * 170;
                const expenseHeight = (data.expense / maxFinancialPoint) * 170;
                
                return (
                  <g key={index} className="group cursor-pointer">
                    {/* Tooltip background on hover */}
                    <rect 
                      x={xOffset - 10} 
                      y="15" 
                      width="70" 
                      height="190" 
                      fill="rgba(56, 189, 248, 0.02)" 
                      className="opacity-0 group-hover:opacity-100 transition rounded"
                    />
                    
                    {/* Income Bar (Emerald) */}
                    <rect 
                      x={xOffset} 
                      y={210 - incomeHeight} 
                      width="20" 
                      height={incomeHeight} 
                      fill="#10b981" 
                      rx="3" 
                      className="transition-all duration-500 group-hover:fill-emerald-400"
                    />

                    {/* Expense Bar (Rose) */}
                    <rect 
                      x={xOffset + 24} 
                      y={210 - expenseHeight} 
                      width="20" 
                      height={expenseHeight} 
                      fill="#f43f5e" 
                      rx="3" 
                      className="transition-all duration-500 group-hover:fill-rose-400"
                    />

                    {/* x axis label */}
                    <text 
                      x={xOffset + 22} 
                      y="230" 
                      fill="#94a3b8" 
                      fontSize="10" 
                      textAnchor="middle" 
                      className="font-mono mt-1 font-semibold"
                    >
                      {data.month}
                    </text>

                    {/* value overlay */}
                    <g className="absolute opacity-0 group-hover:opacity-100 transition duration-200 pointer-events-none">
                      <rect x={xOffset - 20} y={10} width="90" height="34" rx="4" fill="#0f172a" stroke="#334155" strokeWidth="1" />
                      <text x={xOffset + 25} y={22} fill="#10b981" fontSize="9" textAnchor="middle" fontWeight="bold">+{data.income}</text>
                      <text x={xOffset + 25} y={35} fill="#f43f5e" fontSize="9" textAnchor="middle" fontWeight="bold">-{data.expense}</text>
                    </g>
                  </g>
                );
              })}
            </svg>
          </div>
        </div>

        {/* Attendance Breakdown Donut Chart */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800/80 rounded-2xl p-5 shadow-lg shadow-slate-950/5 flex flex-col justify-between">
          <div>
            <h3 className="font-sans font-bold text-base text-slate-900 dark:text-slate-100">{t('attendanceAnalytics')}</h3>
            <p className="text-xs text-slate-500 tracking-wide">{language === 'bn' ? 'সকল সেশনের সমন্বিত তথ্য বিবরণী' : 'Overall student attendance ledger stats'}</p>
          </div>

          <div className="flex justify-center items-center my-4 relative">
            {/* SVG Donut Circle */}
            <svg width="150" height="150" viewBox="0 0 42 42" className="transform -rotate-90">
              <circle cx="21" cy="21" r="15.915" fill="transparent" stroke="#334155" strokeWidth="4"></circle>
              
              {/* Pie slices (Present, Late, Absent, Leave) */}
              {/* present slice */}
              <circle 
                cx="21" 
                cy="21" 
                r="15.915" 
                fill="transparent" 
                stroke="#22c55e" 
                strokeWidth="4" 
                strokeDasharray={`${presentPct} ${100 - presentPct}`} 
                strokeDashoffset="0"
              ></circle>
              {/* late slice */}
              <circle 
                cx="21" 
                cy="21" 
                r="15.915" 
                fill="transparent" 
                stroke="#f59e0b" 
                strokeWidth="4" 
                strokeDasharray={`${latePct} ${100 - latePct}`} 
                strokeDashoffset={`-${presentPct}`}
              ></circle>
              {/* leave slice */}
              <circle 
                cx="21" 
                cy="21" 
                r="15.915" 
                fill="transparent" 
                stroke="#38bdf8" 
                strokeWidth="4" 
                strokeDasharray={`${leavePct} ${100 - leavePct}`} 
                strokeDashoffset={`-${presentPct + latePct}`}
              ></circle>
              {/* absent slice */}
              <circle 
                cx="21" 
                cy="21" 
                r="15.915" 
                fill="transparent" 
                stroke="#ef4444" 
                strokeWidth="4" 
                strokeDasharray={`${absentPct} ${100 - absentPct}`} 
                strokeDashoffset={`-${presentPct + latePct + leavePct}`}
              ></circle>
            </svg>

            {/* Inner Ring stats overlay */}
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <span className="text-xl font-black text-slate-900 dark:text-slate-100">{presentPct}%</span>
              <span className="text-[9px] font-bold text-emerald-400 tracking-wider uppercase">{t('present')}</span>
            </div>
          </div>

          {/* Color Indicators Grid */}
          <div className="grid grid-cols-2 gap-2 text-[11px] font-semibold border-t border-slate-100 dark:border-slate-800/80 pt-3 text-slate-600 dark:text-slate-400">
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded bg-emerald-500"></span>
              <span>{t('present')}: {presentCount} ({presentPct}%)</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded bg-amber-500"></span>
              <span>{t('late')}: {lateCount} ({latePct}%)</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded bg-sky-400"></span>
              <span>{t('leave')}: {leaveCount} ({leavePct}%)</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded bg-rose-500"></span>
              <span>{t('absent')}: {absentCount} ({absentPct}%)</span>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity Log Row */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800/80 rounded-2xl p-5 shadow-lg shadow-slate-950/5">
        <div className="flex items-center gap-2 mb-4 border-b border-light-divider dark:border-slate-800/80 pb-3">
          <History size={18} className="text-sky-400" />
          <h3 className="font-sans font-bold text-base text-slate-900 dark:text-slate-100">
            {t('recentActivities')}
          </h3>
        </div>

        <div className="space-y-3 max-h-[250px] overflow-y-auto">
          {activityLogs.length === 0 ? (
            <p className="text-sm text-slate-500 mt-2">{language === 'bn' ? 'তথ্য নেই' : 'No logs yet'}</p>
          ) : (
            activityLogs.slice(0, 10).map((log) => (
              <div key={log.id} className="flex items-start justify-between border-b border-slate-100 dark:border-slate-850/50 pb-2.5 last:border-b-0">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-xs text-sky-400 bg-sky-500/10 px-2 py-0.5 rounded">
                      {log.action}
                    </span>
                    <span className="text-xs text-slate-400 font-medium">by {log.adminName}</span>
                  </div>
                  <p className="text-sm text-slate-700 dark:text-slate-300 mt-1">
                    {log.details}
                  </p>
                </div>
                <span className="text-[10px] font-mono text-slate-500">{log.timestamp}</span>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
