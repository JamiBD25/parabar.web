import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { AttendanceRecord, Artist } from '../types';
import { 
  ClipboardList, Calendar, CheckCircle, AlertCircle, 
  HelpCircle, Sparkles, Plus, Search, FileText 
} from 'lucide-react';
import { isDepartmentAllowedForAdmin } from '../utils/adminLevels';

export const AttendanceView: React.FC = () => {
  const { 
    artists, classes, attendance, saveAttendanceList, language, t, logAction, currentAdmin
  } = useApp();

  const allowedClasses = (classes || []).filter(cls => isDepartmentAllowedForAdmin(currentAdmin.id, cls.department));

  // Date selectors
  const [selectedDate, setSelectedDate] = useState('2026-06-19');
  const [selectedClassId, setSelectedClassId] = useState(allowedClasses[0]?.id || '');
  const [selectedType, setSelectedType] = useState<'Friday Class' | 'Special Class'>('Friday Class');

  // Search filter
  const [searchTerm, setSearchTerm] = useState('');

  // Active status grid inputs
  const [tempAttendance, setTempAttendance] = useState<{ [artistId: string]: 'Present' | 'Absent' | 'Leave' | 'Late' }>({});

  const chosenClass = allowedClasses.find(c => c.id === selectedClassId);
  const targetedDept = chosenClass ? chosenClass.department : 'Music';

  // Artists currently enrolled in the department of the active course
  const enrolledArtists = artists.filter(art => {
    const matchesSearch = 
      art.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      art.id.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Enroll filter based on matching departments array
    const matchesDept = art.departments.includes(targetedDept);
    return matchesSearch && matchesDept;
  });

  // Handle radio option clicking
  const handleSetStatus = (artistId: string, status: 'Present' | 'Absent' | 'Leave' | 'Late') => {
    setTempAttendance({
      ...tempAttendance,
      [artistId]: status
    });
  };

  // Pre-fill statuses from existing ledger records if available!
  const handleLoadPreservedAttendance = () => {
    const existing = attendance.filter(a => a.date === selectedDate && a.classId === selectedClassId);
    if (existing.length > 0) {
      const mapping: any = {};
      existing.forEach(rec => {
        mapping[rec.artistId] = rec.status;
      });
      setTempAttendance(mapping);
      alert(language === 'bn' ? 'ডাটাবেজ থেকে সংরক্ষিত উপস্থিতি তথ্য সেশন লোড করা হয়েছে!' : 'Loaded stored attendance records from database cache!');
    } else {
      // Pre-fill with standard Active registers as Present
      const mapping: any = {};
      enrolledArtists.forEach(art => {
        mapping[art.id] = 'Present';
      });
      setTempAttendance(mapping);
      alert(language === 'bn' ? 'হাজিরা খাতা প্রস্তুত! অনুপস্থিতদের লাল বোতাম টগল করুন।' : 'Ready! Active artists defaulted to Present.');
    }
  };

  const handleCommitAttendance = () => {
    if (enrolledArtists.length === 0) {
      alert(language === 'bn' ? 'এই বিভাগের কোনো শিল্পী পাওয়া যায়নি।' : 'No enrolled talent registered in this department.');
      return;
    }

    const payload: Omit<AttendanceRecord, 'id'>[] = enrolledArtists.map(art => ({
      date: selectedDate,
      type: selectedType,
      classId: selectedClassId,
      artistId: art.id,
      artistName: art.name,
      status: tempAttendance[art.id] || 'Present'
    }));

    saveAttendanceList(payload);
    alert(language === 'bn' ? 'উপস্থিতি তালিকা ডায়ালগে সফলভাবে এন্ট্রি হয়েছে!' : 'Attendance counts synced to system master logs!');
  };

  // Custom visual list report grid across common June dates for seed users
  const auditDates = ['2026-06-12', '2026-06-19', '2026-06-21'];

  return (
    <div className="space-y-6">
      {/* Title */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-sans font-bold text-xl text-slate-900 dark:text-slate-100 flex items-center gap-2">
            <ClipboardList className="text-indigo-400" />
            {t('attendanceSystem')}
          </h2>
          <p className="text-xs text-slate-500 tracking-wide">
            {language === 'bn' ? 'শ্রেণী ভিত্তিক দৈনিক হাজিরা সংরক্ষণ করুন এবং উপস্থিতি রিপোর্ট দেখুন।' : 'Log class attendance records and observe sessional metrics'}
          </p>
        </div>

        <button
          onClick={handleLoadPreservedAttendance}
          className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 font-semibold border border-slate-700 text-xs rounded-lg transition"
        >
          <Sparkles size={14} className="text-sky-400" />
          <span>{language === 'bn' ? 'সংরক্ষিত হাজিরা লোড করুন' : 'Load Existing Log'}</span>
        </button>
      </div>

      {/* Selectors card */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 shadow space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
          {/* Target Date */}
          <div>
            <label className="block text-xs font-semibold text-slate-400 mb-1">{t('selectDate')}</label>
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-850 rounded-lg px-3 py-2 text-xs text-slate-800 dark:text-slate-200 focus:outline-none"
            />
          </div>

          {/* Class selection dropdown */}
          <div className="sm:col-span-2">
            <label className="block text-xs font-semibold text-slate-400 mb-1">{language === 'bn' ? 'চলমান ক্লাস ও কোর্স' : 'Assigned Class Session'}</label>
            <select
              value={selectedClassId}
              onChange={(e) => setSelectedClassId(e.target.value)}
              className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-850 rounded-lg px-3 py-2 text-xs text-slate-800 dark:text-slate-200 focus:outline-none"
            >
              {allowedClasses.map(cls => (
                <option key={cls.id} value={cls.id}>{cls.className} ({cls.department} - {cls.time})</option>
              ))}
            </select>
          </div>

          {/* Class Type */}
          <div>
            <label className="block text-xs font-semibold text-slate-400 mb-1">{language === 'bn' ? 'ক্লাসের ধরণ' : 'Academic Class Type'}</label>
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value as any)}
              className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-850 rounded-lg px-3 py-2 text-xs text-slate-800 dark:text-slate-200 focus:outline-none"
            >
              <option value="Friday Class">{language === 'bn' ? 'শুক্রবার সাপ্তাহিক ক্লাস' : 'Friday Class'}</option>
              <option value="Special Class">{language === 'bn' ? 'বিশেষ ক্লাস' : 'Special Class'}</option>
            </select>
          </div>
        </div>

        {/* Filter Details line */}
        <div className="flex items-center gap-2 bg-slate-50 dark:bg-slate-950 p-3 rounded-lg text-xs text-slate-400">
          <Sparkles size={14} className="text-sky-400" />
          <span>
            {language === 'bn' 
              ? `বর্তমান টার্গেট ডপার্টমেন্ট: ${targetedDept}। হাজিরা খাতায় শুধুমাত্র এই বিভাগের শিল্পীদের দেখানো হচ্ছে।`
              : `Active filter targets: ${targetedDept} department registers only.`}
          </span>
        </div>
      </div>

      {/* Main interactive attendance book sheet */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-850 rounded-2xl overflow-hidden shadow">
        
        {/* Sheet Top Search */}
        <div className="p-4 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center gap-3">
          <input
            type="text"
            placeholder={t('searchPlaceholder')}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-850 text-xs rounded-lg px-4 py-1.5 w-64 focus:outline-none"
          />
          <span className="text-xs text-slate-400 font-mono font-semibold">
            Count: {enrolledArtists.length}
          </span>
        </div>

        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="bg-slate-50 dark:bg-slate-950 border-b border-light-divider dark:border-slate-800 text-slate-500 font-mono text-[10px] tracking-wider uppercase">
              <th className="p-4">{t('artistId')}</th>
              <th className="p-4">{t('artistName')}</th>
              <th className="p-4 lg:w-[450px] text-center">{language === 'bn' ? 'উপস্থিতি বোতাম টগল করুন' : 'Set Attendance Status'}</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-700 dark:text-slate-300">
            {enrolledArtists.length === 0 ? (
              <tr>
                <td colSpan={3} className="p-8 text-center text-slate-400">
                  <p className="font-semibold">{language === 'bn' ? 'কোনো শিল্পী পাওয়া যায়নি।' : 'No matching department registers found.'}</p>
                </td>
              </tr>
            ) : (
              enrolledArtists.map(art => {
                const currentStatus = tempAttendance[art.id] || 'Present';
                
                return (
                  <tr key={art.id} className="hover:bg-slate-50 dark:hover:bg-slate-950/40 transition">
                    <td className="p-4 font-mono font-bold text-sky-400">{art.id}</td>
                    <td className="p-4">
                      <p className="font-bold text-slate-900 dark:text-slate-200">{art.name}</p>
                      <p className="text-[10px] text-slate-500">{art.nameEn}</p>
                    </td>
                    <td className="p-4">
                      {/* State columns radio choices */}
                      <div className="grid grid-cols-4 gap-1 sm:gap-2 max-w-[420px] mx-auto text-center font-bold">
                        {/* Present */}
                        <button
                          type="button"
                          id={`att-p-${art.id}`}
                          onClick={() => handleSetStatus(art.id, 'Present')}
                          className={`py-1.5 rounded-lg border text-[10px] transition ${
                            currentStatus === 'Present' 
                              ? 'bg-emerald-500 text-slate-950 border-emerald-400 shadow shadow-emerald-500/10' 
                              : 'bg-slate-50 dark:bg-slate-950/20 border-slate-200 dark:border-slate-850 text-slate-500 dark:text-slate-400 hover:text-white'
                          }`}
                        >
                          {t('present')}
                        </button>

                        {/* Late */}
                        <button
                          type="button"
                          id={`att-l-${art.id}`}
                          onClick={() => handleSetStatus(art.id, 'Late')}
                          className={`py-1.5 rounded-lg border text-[10px] transition ${
                            currentStatus === 'Late' 
                              ? 'bg-amber-500 text-slate-950 border-amber-400 shadow shadow-amber-500/10' 
                              : 'bg-slate-50 dark:bg-slate-950/20 border-slate-200 dark:border-slate-850 text-slate-500 dark:text-slate-400 hover:text-white'
                          }`}
                        >
                          {t('late')}
                        </button>

                        {/* Leave */}
                        <button
                          type="button"
                          id={`att-le-${art.id}`}
                          onClick={() => handleSetStatus(art.id, 'Leave')}
                          className={`py-1.5 rounded-lg border text-[10px] transition ${
                            currentStatus === 'Leave' 
                              ? 'bg-sky-500 text-slate-950 border-sky-400 shadow shadow-sky-500/10' 
                              : 'bg-slate-50 dark:bg-slate-950/20 border-slate-200 dark:border-slate-850 text-slate-500 dark:text-slate-400 hover:text-white'
                          }`}
                        >
                          {t('leave')}
                        </button>

                        {/* Absent */}
                        <button
                          type="button"
                          id={`att-a-${art.id}`}
                          onClick={() => handleSetStatus(art.id, 'Absent')}
                          className={`py-1.5 rounded-lg border text-[10px] transition ${
                            currentStatus === 'Absent' 
                              ? 'bg-rose-500 text-white border-rose-400 shadow shadow-rose-500/10' 
                              : 'bg-slate-50 dark:bg-slate-950/20 border-slate-200 dark:border-slate-850 text-slate-500 dark:text-slate-400 hover:text-white'
                          }`}
                        >
                          {t('absent')}
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>

        {/* Commitment button footer */}
        <div className="p-4 border-t border-slate-100 dark:border-slate-800 flex justify-end">
          <button
            id="commit-attendance-btn"
            onClick={handleCommitAttendance}
            className="flex items-center gap-1.5 px-5 py-2.5 bg-gradient-to-r from-sky-500 to-indigo-600 text-white font-bold rounded-xl text-xs shadow hover:scale-[1.01] transition"
          >
            <span>{t('saveAttendance')}</span>
          </button>
        </div>
      </div>

      {/* Grid: Attendance Report Registry Archive */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-5 rounded-2xl shadow">
        <div className="border-b border-light-divider dark:border-slate-800 pb-3 mb-4">
          <h3 className="font-sans font-bold text-sm text-slate-900 dark:text-slate-100">
            {language === 'bn' ? 'উপস্থিতি মাসিক প্রতিবেদন শিট (জুন ২০২৬)' : 'Class Attendance Monthly Report Matrix (June 2026)'}
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">{language === 'bn' ? 'চলতি জুন মাসের বিভিন্ন তারিখের হাজিরা বিবরণী শিট।' : 'Audit of Student presence across June class dates'}</p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-50 dark:bg-slate-950 border-b border-slate-800 text-slate-400 text-[10px] font-mono">
                <th className="p-3">{language === 'bn' ? 'শিল্পীর নাম (আইডি)' : 'Artist Record'}</th>
                {auditDates.map(d => (
                  <th key={d} className="p-3 text-center">{d}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-105 dark:divide-slate-800">
              {artists.map(art => {
                return (
                  <tr key={art.id} className="hover:bg-slate-50 dark:hover:bg-slate-950/40">
                    <td className="p-3">
                      <span className="font-bold dark:text-slate-200">{art.name}</span>
                      <span className="text-[10px] text-slate-500 font-mono ml-2">({art.id})</span>
                    </td>
                    {auditDates.map(date => {
                      // Lookup static and dynamic attendance entries
                      const found = attendance.find(a => a.artistId === art.id && a.date === date);
                      const status = found ? found.status : '—';
                      
                      const pillColors: any = {
                        'Present': 'text-emerald-400 font-bold',
                        'Late': 'text-amber-400 font-semibold',
                        'Leave': 'text-sky-400',
                        'Absent': 'text-rose-500 font-bold',
                        '—': 'text-slate-600'
                      };

                      return (
                        <td key={date} className={`p-3 text-center font-mono ${pillColors[status] || ''}`}>
                          {status === 'Present' ? 'P' : 
                           status === 'Late' ? 'L' : 
                           status === 'Leave' ? 'LV' : 
                           status === 'Absent' ? 'A' : '—'}
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
