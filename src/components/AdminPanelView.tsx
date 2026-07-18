import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  ShieldCheck, Terminal, ToggleLeft, RefreshCw, Lock, 
  Activity, Sparkles, CheckCircle, Save 
} from 'lucide-react';
import { getAdminLevelLabel, getAdminLevelConfig } from '../utils/adminLevels';

export const AdminPanelView: React.FC = () => {
  const { 
    admins, updateAdminPermissions, activityLogs, backupData, restoreData, language, t, logAction 
  } = useApp();

  const getRoleLabel = (adminId: string) => {
    return getAdminLevelLabel(adminId, language);
  };

  const [activeAdminId, setActiveAdminId] = useState<string>('ADM-002');
  const [permissionSuccess, setPermissionSuccess] = useState(false);

  // Read permission checkboxes for selected sub admin
  const activeAdmin = admins.find(a => a.id === activeAdminId) || admins[0];
  const [canView, setCanView] = useState(activeAdmin.permissions.view);
  const [canEdit, setCanEdit] = useState(activeAdmin.permissions.edit);
  const [canDelete, setCanDelete] = useState(activeAdmin.permissions.delete);
  const [canExport, setCanExport] = useState(activeAdmin.permissions.export);
  const [canMessaging, setCanMessaging] = useState(activeAdmin.permissions.messaging);

  const handleSelectAdmin = (adminId: string) => {
    setActiveAdminId(adminId);
    const target = admins.find(a => a.id === adminId) || admins[0];
    setCanView(target.permissions.view);
    setCanEdit(target.permissions.edit);
    setCanDelete(target.permissions.delete);
    setCanExport(target.permissions.export);
    setCanMessaging(target.permissions.messaging);
  };

  const handleUpdatePermissions = () => {
    updateAdminPermissions(activeAdminId, {
      view: canView,
      edit: canEdit,
      delete: canDelete,
      export: canExport,
      messaging: canMessaging
    });
    setPermissionSuccess(true);
    setTimeout(() => setPermissionSuccess(false), 2000);
    logAction('Permission update', `Modified privileges of sub admin ${activeAdmin.name}`);
  };

  const handleBackup = () => {
    const backupJson = backupData();
    // Simulate prompt with mock json details
    alert(
      language === 'bn' 
        ? 'আপনার ডেটা সফলভাবে ডাউনলোড করা হয়েছে! (ব্যাকআপ মেমরি ব্রাউজার ক্যাশে সংরক্ষিত)।' 
        : `Database Backup successfully compiled! Encrypted hex string stored in local storage cache.`
    );
  };

  const handleRestore = () => {
    const confirmRestore = confirm(
      language === 'bn'
        ? 'আপনি কি নিশ্চিতভাবে পূর্ববর্তী সংরক্ষিত ব্যাকআপ ফাইল রিস্টোর করতে চান? চলমান ডাটা প্রতিস্থাপিত হবে।'
        : 'Are you sure you want to restore the latest cached state snapshot from browser storage?'
    );
    if (!confirmRestore) return;

    const restored = restoreData();
    if (restored) {
      alert(language === 'bn' ? 'ডাটাবেজ সফলভাবে রিস্টোর হয়েছে!' : 'Local database states successfully restored from JSON back-ups!');
    } else {
      alert(language === 'bn' ? 'কোনো ব্যাকআপ ডাটা পাওয়া যায়নি।' : 'No backup configurations found in browser cache storage.');
    }
  };

  return (
    <div className="space-y-6">
      {/* Title */}
      <div>
        <h2 className="font-sans font-bold text-xl text-slate-900 dark:text-slate-100 flex items-center gap-2">
          <ShieldCheck className="text-indigo-400" />
          {t('adminPanel')}
        </h2>
        <p className="text-xs text-slate-500 tracking-wide">
          {language === 'bn' 
            ? 'এডমিনদের রোল-ভিত্তিক অ্যাক্সেস কন্ট্রোল, অ্যাক্টিভিটি অডিট লগস এবং ডেটা ব্যাকআপ ও রিস্টোর পরিচালনা করুন।' 
            : 'Configure role-based access privileges, view audit security logs, and download state backups.'}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Permission Controls form */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-5 rounded-2xl shadow space-y-4">
          <div className="flex justify-between items-center border-b border-light-divider dark:border-slate-805/50 pb-2.5">
            <h3 className="font-sans font-bold text-sm">
              🔑 {language === 'bn' ? 'রোল ভিত্তিক অ্যাক্সেস কন্ট্রোল' : 'Role-Based Access Control'}
            </h3>
            {permissionSuccess && (
              <span className="text-[10px] text-emerald-400 font-bold flex items-center gap-1 animate-pulse">
                <CheckCircle size={10} /> Saved!
              </span>
            )}
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-400 mb-1">প্রশাসক বা সহকারী নির্বাচন</label>
            <select
              value={activeAdminId}
              onChange={(e) => handleSelectAdmin(e.target.value)}
              className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-850 rounded-lg px-3 py-2 text-xs focus:outline-none"
            >
              {admins.map(adm => <option key={adm.id} value={adm.id}>{adm.name} ({getRoleLabel(adm.id)})</option>)}
            </select>
          </div>

          <div className="bg-amber-500/10 border border-amber-500/20 rounded-lg p-2.5 text-[11px] text-amber-800 dark:text-amber-300">
            <span className="font-bold block">
              {language === 'bn' ? 'লেভেল ও ডেসক্রিপশন:' : 'Level & Scope of Control:'}
            </span>
            <span>
              {language === 'bn' 
                ? getAdminLevelConfig(activeAdminId).descriptionBn 
                : getAdminLevelConfig(activeAdminId).descriptionEn}
            </span>
          </div>

          <p className="text-xs text-slate-400 tracking-wide">
            {language === 'bn' 
              ? `মনোনীত সহকারী: ${activeAdmin.name}। অ্যাক্সেস পারমিশন চেঞ্জ করুন:` 
              : `Current Target Admin: ${activeAdmin.name}. Select allowed privileges:`}
          </p>

          <div className="space-y-3 font-semibold text-xs text-slate-750 dark:text-slate-350">
            <div className="flex items-center justify-between p-2 rounded-lg bg-slate-50 dark:bg-slate-950/20">
              <span className="flex items-center gap-1.5 font-sans">
                <ToggleLeft size={16} /> View Modules & Content
              </span>
              <input
                type="checkbox"
                checked={canView}
                onChange={(e) => setCanView(e.target.checked)}
                className="rounded border-slate-350 text-indigo-600 focus:ring-0"
              />
            </div>
            <div className="flex items-center justify-between p-2 rounded-lg bg-slate-50 dark:bg-slate-950/20">
              <span className="flex items-center gap-1.5 font-sans">
                <ToggleLeft size={16} /> Create & Edit Records
              </span>
              <input
                type="checkbox"
                checked={canEdit}
                onChange={(e) => setCanEdit(e.target.checked)}
                className="rounded border-slate-350 text-indigo-600 focus:ring-0"
              />
            </div>
            <div className="flex items-center justify-between p-2 rounded-lg bg-slate-50 dark:bg-slate-950/20">
              <span className="flex items-center gap-1.5 font-sans">
                <ToggleLeft size={16} /> Delete Records
              </span>
              <input
                type="checkbox"
                checked={canDelete}
                onChange={(e) => setCanDelete(e.target.checked)}
                className="rounded border-slate-350 text-indigo-600 focus:ring-0"
              />
            </div>
            <div className="flex items-center justify-between p-2 rounded-lg bg-slate-50 dark:bg-slate-950/20">
              <span className="flex items-center gap-1.5 font-sans">
                <ToggleLeft size={16} /> Export Data List (Excel/PDF)
              </span>
              <input
                type="checkbox"
                checked={canExport}
                onChange={(e) => setCanExport(e.target.checked)}
                className="rounded border-slate-350 text-indigo-600 focus:ring-0"
              />
            </div>
            <div className="flex items-center justify-between p-2 rounded-lg bg-slate-50 dark:bg-slate-950/20">
              <span className="flex items-center gap-1.5 font-sans">
                <ToggleLeft size={16} /> Broadcast Messages & Reminders
              </span>
              <input
                type="checkbox"
                checked={canMessaging}
                onChange={(e) => setCanMessaging(e.target.checked)}
                className="rounded border-slate-350 text-indigo-600 focus:ring-0"
              />
            </div>
          </div>

          <button
            onClick={handleUpdatePermissions}
            className="w-full py-2 bg-indigo-600 hover:bg-indigo-500 font-bold text-xs text-white rounded-lg flex items-center justify-center gap-1 shadow-md transition"
          >
            <Save size={13} />
            <span>{language === 'bn' ? 'পারমিশন সেভ করুন' : 'Apply Permissions State'}</span>
          </button>
        </div>

        {/* Security Audit logs list */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-5 rounded-2xl shadow space-y-4">
          <div className="flex justify-between items-center border-b border-light-divider dark:border-slate-805/50 pb-2.5">
            <h3 className="font-sans font-bold text-sm">
              🕵️‍♂️ {language === 'bn' ? 'নিরাপত্তা ও অডিট সিস্টেম লগ' : 'Security Audit & Activity Logs'}
            </h3>
            <span className="px-2 py-0.5 bg-slate-950/30 text-indigo-400 font-mono text-[9px] rounded font-bold">
              SYSTEM LIVE
            </span>
          </div>

          <div className="space-y-2.5 max-h-[300px] overflow-y-auto custom-scrollbar font-mono text-[10px]">
            {activityLogs.map(log => (
              <div key={log.id} className="p-3 bg-slate-50 dark:bg-slate-950/20 border border-slate-100 dark:border-slate-850 rounded-xl space-y-1">
                <div className="flex justify-between items-center text-slate-500">
                  <span className="font-bold text-sky-400">{log.user}</span>
                  <span>{log.timestamp}</span>
                </div>
                <p className="text-slate-700 dark:text-slate-300">
                  <span className="p-1 px-1.5 bg-indigo-500/10 text-indigo-400 rounded text-[8px] font-bold mr-1.5 font-sans uppercase">
                    {log.action}
                  </span>
                  {log.details}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Interactive Backup & Restore portal */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-5 rounded-2xl shadow space-y-4">
          <div className="border-b border-light-divider dark:border-slate-805/50 pb-2.5">
            <h3 className="font-sans font-bold text-sm">
              💾 {language === 'bn' ? 'ডাটাবেজ ব্যাকআপ ও রিস্টোর' : 'System Database Backup Port'}
            </h3>
          </div>

          <p className="text-xs text-slate-400 leading-relaxed">
            {language === 'bn' 
              ? 'একাডেমির পেমেন্ট রেকর্ড, তালিকাভুক্ত শিল্পী ডাটা ও সাধারণ খতিয়ানের অফলাইন JSON ব্যাকআপ নিরাপদে স্থানীয় ব্রাউজারে বা ডাউনলোড ফাইলে সংরক্ষণ করুন।' 
              : 'Safely compile whole-academy records (talent sheets, classes ledger records, fee payment logs) into downloadable json encryptions.'}
          </p>

          <div className="grid grid-cols-2 gap-3 pt-4">
            <button
              onClick={handleBackup}
              id="admin-backup-btn"
              className="py-3 bg-slate-105 hover:bg-slate-200 dark:bg-slate-850 dark:hover:bg-slate-800 text-slate-900 dark:text-slate-200 border border-slate-750 font-bold text-xs rounded-xl flex flex-col items-center justify-center gap-1.5 transition"
            >
              <RefreshCw size={18} className="text-sky-400" />
              <span>{language === 'bn' ? 'ডাউনলোড ব্যাকআপ' : 'Download Backup'}</span>
            </button>

            <button
              onClick={handleRestore}
              id="admin-restore-btn"
              className="py-3 bg-indigo-600/10 hover:bg-indigo-600 text-indigo-400 hover:text-white border border-indigo-500/20 font-bold text-xs rounded-xl flex flex-col items-center justify-center gap-1.5 transition"
            >
              <Sparkles size={18} />
              <span>{language === 'bn' ? 'রিস্টোর ব্যাকআপ' : 'Restore Backup'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
