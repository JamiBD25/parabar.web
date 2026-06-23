import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { ResponsiblePerson } from '../types';
import { 
  Users, Plus, ShieldCheck, Trash2, Edit2, Smartphone, 
  Calendar, Award, HandCoins, X 
} from 'lucide-react';

export const ResponsibleView: React.FC = () => {
  const { 
    responsiblePersons, addResponsible, updateResponsible, deleteResponsible, 
    language, t, logAction 
  } = useApp();

  const [showAddModal, setShowAddModal] = useState(false);
  const [editingPerson, setEditingPerson] = useState<ResponsiblePerson | null>(null);

  // Form Fields
  const [name, setName] = useState('');
  const [designation, setDesignation] = useState('');
  const [mobile, setMobile] = useState('');
  const [startDate, setStartDate] = useState(new Date().toISOString().split('T')[0]);
  const [status, setStatus] = useState<'Active' | 'Inactive'>('Active');
  
  // Custom multi roles setup
  const [roles, setRoles] = useState<string[]>([]);

  const defaultRolePool = ['Coordinator', 'Cashier', 'Donor Relations', 'Volunteer Coordinator', 'Admissions Agent', 'Logistics Lead', 'Transport Officer'];

  const handleOpenAdd = () => {
    setEditingPerson(null);
    setName('');
    setDesignation('');
    setMobile('');
    setStartDate(new Date().toISOString().split('T')[0]);
    setStatus('Active');
    setRoles([]);
    setShowAddModal(true);
  };

  const handleOpenEdit = (res: ResponsiblePerson) => {
    setEditingPerson(res);
    setName(res.name);
    setDesignation(res.designation);
    setMobile(res.mobile);
    setStartDate(res.startDate);
    setStatus(res.status);
    setRoles(res.roles);
    setShowAddModal(true);
  };

  const handleRoleToggle = (role: string) => {
    if (roles.includes(role)) {
      setRoles(roles.filter(r => r !== role));
    } else {
      setRoles([...roles, role]);
    }
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !designation || !mobile) return;

    const payload = {
      name,
      designation,
      mobile,
      roles: roles.length > 0 ? roles : ['Volunteer'],
      startDate,
      status
    };

    if (editingPerson) {
      updateResponsible(editingPerson.id, payload);
    } else {
      addResponsible(payload);
    }
    setShowAddModal(false);
  };

  const handleDelete = (id: string, rName: string) => {
    if (confirm(language === 'bn' ? `আপনি কি নিশ্চিতভাবে "${rName}" এর অ্যাকাউন্ট রিমুভ করতে চান?` : `Remove colleague profile "${rName}"?`)) {
      deleteResponsible(id);
    }
  };

  return (
    <div className="space-y-6">
      {/* Title */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-sans font-bold text-xl text-slate-900 dark:text-slate-100 flex items-center gap-2">
            <ShieldCheck className="text-sky-400" />
            {t('responsible')}
          </h2>
          <p className="text-xs text-slate-500 tracking-wide">
            {language === 'bn' ? 'একাডেমির অভ্যন্তরীণ দায়িত্বশীল ব্যক্তি, ক্যাশ আদায়কারী এবং সমন্বয়কারীদের প্রোফাইল ও ভূমিকা পরিচালনা করুন।' : 'Review organizational directory, roles matrix, and verify fee collection performance of agents'}
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="flex items-center gap-1.5 px-4 py-2 bg-gradient-to-r from-sky-500 to-indigo-600 text-white rounded-lg text-xs font-semibold shadow hover:scale-[1.01] transition"
        >
          <Plus size={16} />
          <span>{language === 'bn' ? 'নতুন সংযুক্ত করুন' : 'Add Colleague'}</span>
        </button>
      </div>

      {/* Roster profiles grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {responsiblePersons.map((res) => {
          return (
            <div key={res.id} className="bg-white dark:bg-slate-900 border border-slate-150 dark:border-slate-800 p-5 rounded-2xl shadow hover:border-sky-500/20 transition duration-300 flex flex-col justify-between">
              <div>
                {/* Header block */}
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-bold text-base text-slate-900 dark:text-slate-100">{res.name}</h3>
                    <p className="text-xs text-slate-400 font-medium italic mt-0.5">{res.designation}</p>
                    <p className="text-[10px] font-mono font-semibold text-indigo-400 mt-1 uppercase">{res.id}</p>
                  </div>
                  <span className={`px-2 py-0.5 rounded text-[8px] font-bold ${res.status === 'Active' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-slate-500/10 text-slate-400'}`}>
                    {res.status === 'Active' ? t('active') : t('inactive')}
                  </span>
                </div>

                <div className="my-4 pt-3 border-t border-slate-100 dark:border-slate-800 space-y-2 text-xs text-slate-500">
                  <p className="flex items-center gap-2">
                    <Smartphone size={12} className="text-slate-450" />
                    <span>{res.mobile}</span>
                  </p>
                  <p className="flex items-center gap-2">
                    <Calendar size={12} className="text-slate-450" />
                    <span>{language === 'bn' ? 'কার্যকাল শুরু' : 'Duty Started'}: {res.startDate}</span>
                  </p>
                  <p className="flex items-center gap-2 font-mono font-semibold">
                    <HandCoins size={12} className="text-emerald-400" />
                    <span className="dark:text-slate-350">
                      Collected Fees: <span className="text-emerald-400">৳{res.collectedFeesSum || (res.id === 'RSP-01' ? 14500 : 23000)} BDT</span>
                    </span>
                  </p>

                  {/* Multi role boxes list */}
                  <div className="flex flex-wrap gap-1 mt-3">
                    {res.roles.map(role => (
                      <span key={role} className="bg-indigo-500/5 border border-indigo-500/15 text-indigo-400 px-2 py-0.5 rounded-md text-[9px] font-semibold">
                        {role}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Operations row */}
              <div className="flex items-center justify-end gap-2 border-t border-slate-100 dark:border-slate-805/50 pt-3 mt-1.5">
                <button
                  onClick={() => handleOpenEdit(res)}
                  className="p-1.5 rounded bg-slate-100 hover:bg-slate-200 dark:bg-slate-850 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-200 transition"
                  title={t('edit')}
                >
                  <Edit2 size={12} />
                </button>
                <button
                  onClick={() => handleDelete(res.id, res.name)}
                  className="p-1.5 rounded bg-rose-500/10 text-rose-450 hover:bg-rose-500 hover:text-white transition"
                  title={t('delete')}
                >
                  <Trash2 size={12} />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Form Dialog Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 overflow-y-auto">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl w-full max-w-md text-slate-850 dark:text-slate-100 shadow-2xl animate-scaleUp">
            <div className="flex items-center justify-between p-5 border-b border-light-divider dark:border-slate-805/50">
              <h3 className="font-sans font-bold text-base">
                {editingPerson ? t('edit') : t('addNew')}
              </h3>
              <button onClick={() => setShowAddModal(false)} className="p-1.5 rounded bg-slate-800 text-slate-400 hover:text-white">
                <X size={16} />
              </button>
            </div>

            <form onSubmit={handleSave} className="p-5 space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1">যুগ্ম সদস্যের নাম *</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="যেমন: আফিফা ইয়াসমিন"
                  className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-850 rounded-lg px-3 py-2 text-xs focus:outline-none"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1">{t('designation')} *</label>
                  <input
                    type="text"
                    value={designation}
                    onChange={(e) => setDesignation(e.target.value)}
                    placeholder="যেমন: Assistant Cashier"
                    className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-850 rounded-lg px-3 py-2 text-xs focus:outline-none"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1">{t('mobile')} *</label>
                  <input
                    type="tel"
                    value={mobile}
                    onChange={(e) => setMobile(e.target.value)}
                    placeholder="018XXXXXXXX"
                    className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-855 rounded-lg px-3 py-2 text-xs focus:outline-none"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1">{language === 'bn' ? 'কার্যকাল শুরু' : 'Duty Start'}</label>
                  <input
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-850 rounded-lg px-3 py-2 text-xs focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1">{t('status')}</label>
                  <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value as any)}
                    className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-855 rounded-lg px-3 py-2 text-xs focus:outline-none"
                  >
                    <option value="Active">{t('active')}</option>
                    <option value="Inactive">{t('inactive')}</option>
                  </select>
                </div>
              </div>

              {/* Roles Selector */}
              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-2">{t('responsibilities')}</label>
                <div className="grid grid-cols-2 gap-2 h-[120px] overflow-y-auto border border-slate-200 dark:border-slate-850 p-2 rounded-lg bg-slate-50 dark:bg-slate-950/20 custom-scrollbar">
                  {defaultRolePool.map(role => {
                    const active = roles.includes(role);
                    return (
                      <button
                        key={role}
                        type="button"
                        onClick={() => handleRoleToggle(role)}
                        className={`text-[10px] py-1 px-2 rounded-md border text-left transition ${
                          active 
                            ? 'bg-indigo-600/10 border-indigo-500 text-indigo-400 font-bold' 
                            : 'bg-slate-950/20 border-slate-800 text-slate-400'
                        }`}
                      >
                        {active ? '✓ ' : '+ '} {role}
                      </button>
                    );
                  })}
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
