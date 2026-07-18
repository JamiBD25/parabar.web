import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { ClassSchedule } from '../types';
import { 
  BookOpen, Plus, Clock, User, Sparkles, X, Edit2, Trash2 
} from 'lucide-react';
import { isDepartmentAllowedForAdmin } from '../utils/adminLevels';

const getDeptStyles = (dept: string) => {
  switch (dept) {
    case 'Music':
      return {
        bg: 'bg-emerald-50 dark:bg-emerald-950/20',
        text: 'text-brand-green',
        border: 'border-brand-green/35'
      };
    case 'Recitation':
    case 'Poetry':
      return {
        bg: 'bg-amber-50 dark:bg-amber-950/25',
        text: 'text-accent-gold',
        border: 'border-accent-gold/35'
      };
    case 'Fine Arts':
    case 'Painting':
      return {
        bg: 'bg-orange-50 dark:bg-orange-950/20',
        text: 'text-[#E76F51]',
        border: 'border-[#E76F51]/35'
      };
    case 'Theatre':
    case 'Calligraphy':
      return {
        bg: 'bg-stone-50 dark:bg-amber-500/5',
        text: 'text-neutral-800 dark:text-amber-450 font-bold',
        border: 'border-amber-500/35'
      };
    default:
      return {
        bg: 'bg-slate-50 dark:bg-slate-900',
        text: 'text-slate-650',
        border: 'border-slate-205'
      };
  }
};

export const ClassView: React.FC = () => {
  const { 
    classes, addClass, updateClass, deleteClass, trainers, language, t, currentAdmin 
  } = useApp();

  const allowedClasses = (classes || []).filter(cls => isDepartmentAllowedForAdmin(currentAdmin.id, cls.department));
  const departmentsList = ['Music', 'Fine Arts', 'Dance', 'Recitation', 'Theatre'].filter(d => isDepartmentAllowedForAdmin(currentAdmin.id, d));

  const [showAddModal, setShowAddModal] = useState(false);
  const [editingClass, setEditingClass] = useState<ClassSchedule | null>(null);

  // Form Fields
  const [className, setClassName] = useState('');
  const [dept, setDept] = useState(departmentsList[0] || 'Music');
  const [trainerId, setTrainerId] = useState(trainers[0]?.id || '');
  const [day, setDay] = useState('Friday');
  const [time, setTime] = useState('09:00 AM - 11:00 AM');
  const [isSpecial, setIsSpecial] = useState(false);
  const [conductedBy, setConductedBy] = useState('');

  const handleOpenAdd = () => {
    setEditingClass(null);
    setClassName('');
    setDept(departmentsList[0] || 'Music');
    setTrainerId(trainers[0]?.id || '');
    setDay('Friday');
    setTime('09:00 AM - 11:00 AM');
    setIsSpecial(false);
    setConductedBy('');
    setShowAddModal(true);
  };

  const handleOpenEdit = (cls: ClassSchedule) => {
    setEditingClass(cls);
    setClassName(cls.className);
    setDept(cls.department);
    setTrainerId(cls.trainerId);
    setDay(cls.day);
    setTime(cls.time);
    setIsSpecial(cls.isSpecial);
    setConductedBy(cls.conductedBy || '');
    setShowAddModal(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!className || !trainerId) return;

    const trainer = trainers.find(t => t.id === trainerId);
    const trainerName = trainer ? trainer.name : 'Unknown Faculty';

    const payload = {
      className,
      department: dept,
      trainerId,
      trainerName,
      day,
      time,
      isSpecial,
      conductedBy: conductedBy || trainerName
    };

    if (editingClass) {
      updateClass(editingClass.id, payload);
    } else {
      addClass(payload);
    }
    setShowAddModal(false);
  };

  const handleDelete = (id: string, name: string) => {
    if (confirm(language === 'bn' ? `আপনি কি নিশ্চিতভাবে "${name}" ক্লাস শিডিউল সরাতে চান?` : `Cancel slot for: "${name}"?`)) {
      deleteClass(id);
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Title */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-sans font-black text-xl text-[#222222] dark:text-slate-100 flex items-center gap-2">
            <BookOpen className="text-brand-red" />
            {t('classes')}
          </h2>
          <p className="text-xs text-[#6B6B6B] tracking-wide font-medium">
            {language === 'bn' ? 'সাপ্তাহিক রুটিন, ক্লাসের বিষয় ও দায়িত্বপ্রাপ্ত ওস্তাদ শিডিউল রক্ষণ করুন।' : 'Design sessional courses, assign faculty instructors, and track completed lessons'}
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="flex items-center gap-1.5 px-4 py-2 bg-brand-red hover:bg-[#991d1d] text-white rounded-lg text-xs font-bold shadow transition cursor-pointer"
        >
          <Plus size={15} />
          <span>{language === 'bn' ? 'নতুন ক্লাস যোগ করুন' : 'Schedule Class'}</span>
        </button>
      </div>

      {/* Roster Cards list */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {allowedClasses.map((cls) => {
          const deptStyles = getDeptStyles(cls.department);
          return (
            <div key={cls.id} className="bg-white border border-slate-200/80 p-5 rounded-2xl shadow-sm hover:shadow hover:border-brand-green/20 transition duration-300 flex flex-col justify-between">
              <div>
                {/* Header info */}
                <div className="flex items-start justify-between">
                  <div>
                    <span className={`px-2.5 py-0.5 rounded text-[9px] font-extrabold uppercase tracking-widest border ${deptStyles.bg} ${deptStyles.text} ${deptStyles.border}`}>
                      {cls.department === 'Music' ? '🎵 ' : cls.department === 'Recitation' ? '📖 ' : cls.department === 'Fine Arts' ? '🎨 ' : ''}
                      {cls.department}
                    </span>
                    <h3 className="font-sans font-black text-base text-[#222222] mt-2.5 leading-snug">
                      {cls.className}
                    </h3>
                  </div>
                  {cls.isSpecial && (
                    <span className="bg-brand-red text-white font-extrabold px-2 py-0.5 rounded text-[8px] uppercase tracking-wider">
                      Special
                    </span>
                  )}
                </div>

                {/* Schedule times list */}
                <div className="my-4 pt-3 border-t border-slate-100 space-y-2.5 text-xs text-text-gray font-medium">
                  <p className="flex items-center gap-2">
                    <Clock size={13} className="text-slate-400" />
                    <span className="text-[#222222] font-semibold">{cls.day} | {cls.time}</span>
                  </p>
                  <p className="flex items-center gap-2">
                    <User size={13} className="text-slate-400" />
                    <span>Instructor: <span className="text-brand-green font-bold">{cls.trainerName}</span></span>
                  </p>
                  {cls.conductedBy && (
                    <p className="flex items-center gap-2 font-semibold">
                      <Sparkles size={11} className="text-brand-red" />
                      <span>Conducted by: <span className="text-brand-red font-bold">{cls.conductedBy}</span></span>
                    </p>
                  )}
                </div>
              </div>

              {/* Operations row */}
              <div className="flex items-center justify-end gap-2 border-t border-slate-100 dark:border-slate-805/50 pt-3 mt-1.5">
                <button
                  onClick={() => handleOpenEdit(cls)}
                  className="p-1.5 rounded bg-slate-105 hover:bg-slate-200 dark:bg-slate-850 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-200 transition"
                >
                  <Edit2 size={12} />
                </button>
                <button
                  onClick={() => handleDelete(cls.id, cls.className)}
                  className="p-1.5 rounded bg-rose-500/10 text-rose-450 hover:bg-rose-500 hover:text-white transition"
                >
                  <Trash2 size={12} />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Class Editor Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl w-full max-w-md text-slate-800 dark:text-slate-100 shadow-2xl animate-scaleUp">
            <div className="flex items-center justify-between p-5 border-b border-light-divider dark:border-slate-800/80">
              <h3 className="font-sans font-bold text-base">
                {editingClass ? t('edit') : t('addNew')}
              </h3>
              <button onClick={() => setShowAddModal(false)} className="p-1.5 rounded bg-slate-800 text-slate-400 hover:text-white">
                <X size={16} />
              </button>
            </div>

            <form onSubmit={handleSave} className="p-5 space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1">ক্লাসের শিরোনাম *</label>
                <input
                  type="text"
                  value={className}
                  onChange={(e) => setClassName(e.target.value)}
                  placeholder="যেমন: রবীন্দ্রসঙ্গীত শিক্ষা আসর"
                  className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-850 rounded-lg px-3 py-2 text-xs focus:outline-none"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1">{t('department')}</label>
                  <select
                    value={dept}
                    onChange={(e) => setDept(e.target.value)}
                    className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-850 rounded-lg px-3 py-2 text-xs focus:outline-none"
                  >
                    {departmentsList.map(d => <option key={d} value={d}>{d}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1">ভারপ্রাপ্ত ওস্তাদ / টিচার *</label>
                  <select
                    value={trainerId}
                    onChange={(e) => setTrainerId(e.target.value)}
                    className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-850 rounded-lg px-3 py-2 text-xs focus:outline-none"
                    required
                  >
                    <option value="">-- Faculty Option --</option>
                    {trainers.map(trn => <option key={trn.id} value={trn.id}>{trn.name}</option>)}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1">বার / দিন</label>
                  <select
                    value={day}
                    onChange={(e) => setDay(e.target.value)}
                    className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-850 rounded-lg px-3 py-2 text-xs focus:outline-none"
                  >
                    <option value="Friday">Friday (শুক্রবার)</option>
                    <option value="Special Class">Special Class (বিশেষ ক্লাস)</option>
                    <option value="Monday">Monday</option>
                    <option value="Wednesday">Wednesday</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1">ক্লাসের সময়কাল</label>
                  <input
                    type="text"
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    placeholder="09:00 AM - 11:00 AM"
                    className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-850 rounded-lg px-3 py-2 text-xs focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1">কন্ডাক্টেড বাই (Tracer)</label>
                  <input
                    type="text"
                    value={conductedBy}
                    onChange={(e) => setConductedBy(e.target.value)}
                    placeholder="প্রশিক্ষকের নাম দিন"
                    className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-850 rounded-lg px-3 py-2 text-xs focus:outline-none"
                  />
                </div>
                <div className="flex items-center gap-2 pt-5">
                  <input
                    type="checkbox"
                    id="is-special-chk"
                    checked={isSpecial}
                    onChange={(e) => setIsSpecial(e.target.checked)}
                    className="rounded border-slate-350 text-indigo-600 focus:ring-0"
                  />
                  <label htmlFor="is-special-chk" className="text-xs text-slate-400 cursor-pointer select-none">
                    বিশেষ সেশন (Special Slot)
                  </label>
                </div>
              </div>

              <div className="flex gap-2 justify-end pt-3 border-t border-slate-100 dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-1.5 rounded bg-slate-100 hover:bg-slate-200 dark:bg-slate-855 text-xs text-slate-700 dark:text-slate-350 font-semibold"
                >
                  {t('cancel')}
                </button>
                <button
                  type="submit"
                  className="px-5 py-1.5 rounded bg-gradient-to-r from-sky-500 to-indigo-600 text-white text-xs font-bold shadow"
                >
                  {t('save')}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
