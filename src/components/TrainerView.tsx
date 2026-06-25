import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Trainer, Expense } from '../types';
import { 
  Plus, Edit2, Trash2, Award, Landmark, Check, X, 
  Smartphone, MapPin, Calendar, HelpCircle 
} from 'lucide-react';

export const TrainerView: React.FC = () => {
  const { 
    trainers, addTrainer, updateTrainer, deleteTrainer, 
    addExpense, language, t, logAction 
  } = useApp();

  const [showAddModal, setShowAddModal] = useState(false);
  const [editingTrainer, setEditingTrainer] = useState<Trainer | null>(null);

  // Form states
  const [name, setName] = useState('');
  const [mobile, setMobile] = useState('');
  const [address, setAddress] = useState('');
  const [depts, setDepts] = useState<string[]>([]);
  const [joiningDate, setJoiningDate] = useState('2025-01-01');
  const [status, setStatus] = useState<'Active' | 'Inactive'>('Active');
  const [salary, setSalary] = useState('12000');

  // Salary Payment states
  const [showPayModal, setShowPayModal] = useState<Trainer | null>(null);
  const [payMonth, setPayMonth] = useState('June 2026');

  // Predefined lists
  const availableDepts = ['Music', 'Fine Arts', 'Dance', 'Recitation', 'Theatre'];

  const handleOpenAddModal = () => {
    setEditingTrainer(null);
    setName('');
    setMobile('');
    setAddress('');
    setDepts([]);
    setJoiningDate('2025-01-01');
    setStatus('Active');
    setSalary('12000');
    setShowAddModal(true);
  };

  const handleOpenEditModal = (trn: Trainer) => {
    setEditingTrainer(trn);
    setName(trn.name);
    setMobile(trn.mobile);
    setAddress(trn.address);
    setDepts(trn.departments);
    setJoiningDate(trn.joiningDate);
    setStatus(trn.status);
    setSalary(trn.salary.toString());
    setShowAddModal(true);
  };

  const handleSaveTrainer = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !mobile || depts.length === 0) {
      alert(language === 'bn' ? 'অনুগ্রহ করে সব প্রয়োজনীয় তথ্য পূরণ করুন।' : 'Please check required fields and choose at least 1 department.');
      return;
    }

    const payload = {
      name,
      mobile,
      address,
      departments: depts,
      joiningDate,
      status,
      salary: Number(salary),
      avatar: editingTrainer?.avatar || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=faces'
    };

    if (editingTrainer) {
      updateTrainer(editingTrainer.id, payload);
    } else {
      addTrainer(payload);
    }
    setShowAddModal(false);
  };

  const handleDeleteTrainer = (id: string, tName: string) => {
    if (confirm(language === 'bn' ? `আপনি কি নিশ্চিতভাবে "${tName}" প্রশিক্ষকের তথ্য ডিলিট করতে চান?` : `Remove instructor "${tName}" from active academy records?`)) {
      deleteTrainer(id);
    }
  };

  // Salary simulation payout: Registers an expense record automatically
  const handleDisburseSalary = (e: React.FormEvent) => {
    e.preventDefault();
    if (!showPayModal) return;

    const expensePayload = {
      title: `Salary Honorarium - ${showPayModal.name} (${payMonth})`,
      category: 'Trainer Honorarium' as const,
      amount: showPayModal.salary,
      date: new Date().toISOString().split('T')[0],
      description: `Disbursed monthly salary of ৳${showPayModal.salary} BDT to trainer ${showPayModal.name}.`
    };

    addExpense(expensePayload);
    alert(language === 'bn' ? 'প্রশিক্ষকের সম্মানি পেমেন্ট হিসাব লেজারে এন্ট্রি করা হয়েছে!' : 'Salary payout recorded successfully in Expense accounts ledger!');
    setShowPayModal(null);
  };

  const handleDeptToggle = (dName: string) => {
    if (depts.includes(dName)) {
      setDepts(depts.filter(d => d !== dName));
    } else {
      setDepts([...depts, dName]);
    }
  };

  return (
    <div className="space-y-6">
      {/* Title */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-sans font-bold text-xl text-slate-900 dark:text-slate-100 flex items-center gap-2">
            <Award className="text-sky-400" />
            {t('trainers')}
          </h2>
          <p className="text-xs text-slate-500 tracking-wide">
            {language === 'bn' ? 'প্রশিক্ষক বা ওস্তাদদের প্রোফাইল, সম্মানি বিবরণ ও স্যালারি ট্র্যাকিং করুন।' : 'Manage Academy faculty members (Ustad), designate course departments, and issue payouts'}
          </p>
        </div>

        <button
          onClick={handleOpenAddModal}
          className="flex items-center gap-1.5 px-4 py-2 bg-gradient-to-r from-sky-500 to-indigo-600 text-white rounded-lg text-xs font-semibold shadow hover:from-sky-450 transition"
        >
          <Plus size={16} />
          <span>{language === 'bn' ? 'প্রশিক্ষক যুক্ত করুন' : 'Add Trainer'}</span>
        </button>
      </div>

      {/* Grid listing */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {trainers.map((trn) => {
          return (
            <div key={trn.id} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-5 rounded-2xl shadow hover:border-sky-500/30 transition duration-300 flex flex-col justify-between">
              <div>
                {/* Header info */}
                <div className="flex items-start gap-3">
                  <img src={trn.avatar} alt="" className="w-12 h-12 rounded-full object-cover border border-slate-800 shrink-0" />
                  <div>
                    <h3 className="font-bold text-sm text-slate-900 dark:text-slate-100">{trn.name}</h3>
                    <p className="text-[10px] text-sky-400 font-mono tracking-wider font-semibold uppercase">{trn.id}</p>
                    <span className={`inline-block px-2 py-0.5 rounded text-[8px] font-bold mt-1 ${trn.status === 'Active' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-slate-500/10 text-slate-400'}`}>
                      {trn.status === 'Active' ? t('active') : t('inactive')}
                    </span>
                  </div>
                </div>

                {/* Body Details */}
                <div className="my-4 pt-3 border-t border-slate-100 dark:border-slate-800 space-y-2 text-xs text-slate-500">
                  <p className="flex items-center gap-2">
                    <Smartphone size={12} className="text-slate-400" />
                    <span>{trn.mobile}</span>
                  </p>
                  <p className="flex items-center gap-2">
                    <MapPin size={12} className="text-slate-400" />
                    <span className="truncate">{trn.address}</span>
                  </p>
                  <p className="flex items-center gap-2">
                    <Calendar size={12} className="text-slate-400" />
                    <span>{t('joiningDate')}: {trn.joiningDate}</span>
                  </p>
                  <p className="flex items-center gap-2 font-semibold">
                    <Landmark size={12} className="text-slate-400" />
                    <span className="dark:text-slate-300">{t('salaryHonorarium')}: <span className="text-sky-400">৳{trn.salary} BDT</span></span>
                  </p>

                  {/* Assigned departments */}
                  <div className="flex flex-wrap gap-1 mt-3">
                    {trn.departments.map(dept => (
                      <span key={dept} className="bg-sky-500/10 border border-sky-500/20 text-sky-400 px-2 py-0.5 rounded text-[9px]">
                        {dept}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action operations footer */}
              <div className="flex items-center justify-between border-t border-slate-100 dark:border-slate-800/50 pt-3 mt-1.5">
                {/* Salary disbursement simulation link */}
                <button
                  onClick={() => setShowPayModal(trn)}
                  className="flex items-center gap-1 text-[11px] font-bold text-slate-400 hover:text-emerald-400 transition"
                  title="Post honorarium salary payout"
                >
                  <Landmark size={14} className="text-emerald-400" />
                  <span>{language === 'bn' ? 'সম্মানি পেমেন্ট' : 'Salary Payout'}</span>
                </button>

                <div className="flex gap-2">
                  <button
                    onClick={() => handleOpenEditModal(trn)}
                    className="p-1.5 rounded bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-200 transition"
                  >
                    <Edit2 size={12} />
                  </button>
                  <button
                    onClick={() => handleDeleteTrainer(trn.id, trn.name)}
                    className="p-1.5 rounded bg-rose-500/10 text-rose-400 hover:bg-rose-500 hover:text-white transition"
                  >
                    <Trash2 size={12} />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Add / Edit modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl w-full max-w-md text-slate-800 dark:text-slate-100 shadow-2xl animate-scaleUp">
            <div className="flex items-center justify-between p-5 border-b border-light-divider dark:border-slate-800/80">
              <h3 className="font-sans font-bold text-base text-slate-900 dark:text-slate-100">
                {editingTrainer ? t('edit') : t('addNew')}
              </h3>
              <button onClick={() => setShowAddModal(false)} className="p-1.5 rounded-lg text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition">
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSaveTrainer} className="p-5 space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1">{language === 'bn' ? 'প্রশিক্ষকের নাম' : 'Trainer Name'} *</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="যেমন: ওস্তাদ শফি মণ্ডল"
                  className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg px-3 py-2 text-xs focus:outline-none"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1">{t('mobile')} *</label>
                  <input
                    type="tel"
                    value={mobile}
                    onChange={(e) => setMobile(e.target.value)}
                    placeholder="017XXXXXXXX"
                    className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg px-3 py-2 text-xs focus:outline-none"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1">{t('salaryHonorarium')} *</label>
                  <input
                    type="number"
                    value={salary}
                    onChange={(e) => setSalary(e.target.value)}
                    className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg px-3 py-2 text-xs focus:outline-none"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1">{t('joiningDate')}</label>
                  <input
                    type="date"
                    value={joiningDate}
                    onChange={(e) => setJoiningDate(e.target.value)}
                    className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg px-3 py-2 text-xs focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1">{t('status')}</label>
                  <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value as any)}
                    className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg px-3 py-2 text-xs focus:outline-none"
                  >
                    <option value="Active">{t('active')}</option>
                    <option value="Inactive">{t('inactive')}</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1">{t('address')}</label>
                <input
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg px-3 py-2 text-xs focus:outline-none"
                />
              </div>

              {/* Departments Assigned Checklist */}
              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-2">{t('assignedDept')} *</label>
                <div className="flex flex-wrap gap-2">
                  {availableDepts.map(d => {
                    const active = depts.includes(d);
                    return (
                      <button
                        key={d}
                        type="button"
                        onClick={() => handleDeptToggle(d)}
                        className={`text-xs px-3 py-1 rounded border transition ${active ? 'bg-sky-500/20 border-sky-500 text-sky-400 font-bold' : 'bg-slate-950/20 border-slate-800 text-slate-400'}`}
                      >
                        {d}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="flex gap-2 justify-end pt-3 border-t border-slate-100 dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-1.5 rounded bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 text-xs text-slate-700 dark:text-slate-300 font-semibold"
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

      {/* Salary payout simulator modal */}
      {showPayModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 text-white max-w-sm w-full shadow-2xl relative text-center">
            <button onClick={() => setShowPayModal(null)} className="absolute right-4 top-4 text-slate-500 hover:text-white">
              <X size={16} />
            </button>

            <div className="my-2 text-center">
              <span className="p-3.5 bg-emerald-500/10 rounded-full text-emerald-400 inline-block mb-3">
                <Landmark size={24} />
              </span>
              <h3 className="font-sans font-bold text-base">{language === 'bn' ? 'সম্মানি সম্মানী পরিশোধ' : 'Disburse Faculty Honorarium'}</h3>
              <p className="text-xs text-slate-400 mt-1">Instructor: {showPayModal.name}</p>
            </div>

            <form onSubmit={handleDisburseSalary} className="space-y-4 pt-4 text-left">
              <div>
                <label className="block text-[10px] font-semibold text-slate-400 uppercase tracking-widest mb-1">Assigned Month</label>
                <select
                  value={payMonth}
                  onChange={(e) => setPayMonth(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs focus:outline-none"
                >
                  <option value="May 2026">May 2026</option>
                  <option value="June 2026">June 2026</option>
                  <option value="July 2026">July 2026</option>
                </select>
              </div>

              <div className="bg-slate-950 p-3 rounded-lg border border-slate-800 space-y-2 text-xs font-mono">
                <div className="flex justify-between">
                  <span className="text-slate-500">Committed salary:</span>
                  <span className="text-sky-400 font-bold">৳{showPayModal.salary} BDT</span>
                </div>
                <div className="flex justify-between border-t border-slate-800 pt-1.5 font-bold">
                  <span className="text-slate-400">Total Outflow:</span>
                  <span className="text-rose-400">৳{showPayModal.salary}</span>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold rounded-lg text-xs transition"
              >
                {language === 'bn' ? 'সম্মানি প্রদান নিশ্চিত করুন' : 'Confirm Salary Disbursement'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
