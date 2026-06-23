import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Expense } from '../types';
import { 
  FileSpreadsheet, Plus, Trash2, RotateCcw, AlertTriangle, 
  TrendingUp, TrendingDown, Landmark, HeartHandshake, Archive 
} from 'lucide-react';

export const AccountingView: React.FC = () => {
  const { 
    expenses, payments, donations, addExpense, deleteExpense, 
    restoreExpense, hardDeleteExpense, language, t, logAction 
  } = useApp();

  const [expenseTitle, setExpenseTitle] = useState('');
  const [expenseCategory, setExpenseCategory] = useState<'Rent' | 'Utility' | 'Trainer Honorarium' | 'Material purchase' | 'Event Expense' | 'Office Supply' | 'Others'>('Office Supply');
  const [expenseAmount, setExpenseAmount] = useState('');
  const [expenseDescription, setExpenseDescription] = useState('');

  // active operational tab
  const [activeLedgerTab, setActiveLedgerTab] = useState<'ledger' | 'trash' | 'profitloss'>('ledger');

  const categories = ['Rent', 'Utility', 'Trainer Honorarium', 'Material purchase', 'Event Expense', 'Office Supply', 'Others'];

  // Safe variables computation from current state
  const activeExpenses = expenses.filter(e => !e.deletedAt);
  const recycledExpenses = expenses.filter(e => !!e.deletedAt);

  // Total Income computation (fees payments + sponsor donations)
  const totalPaidFees = payments
    .filter(p => p.status === 'Paid')
    .reduce((sum, current) => sum + current.amount, 0);

  const totalDonations = donations
    .reduce((sum, current) => sum + current.amount, 0);

  const totalCalculatedIncome = totalPaidFees + totalDonations;
  const totalCalculatedExpense = activeExpenses.reduce((sum, current) => sum + current.amount, 0);
  const netBalanceProfit = totalCalculatedIncome - totalCalculatedExpense;

  const handlePostExpense = (e: React.FormEvent) => {
    e.preventDefault();
    if (!expenseTitle || !expenseAmount) return;

    addExpense({
      title: expenseTitle,
      category: expenseCategory,
      amount: Number(expenseAmount),
      date: new Date().toISOString().split('T')[0],
      description: expenseDescription
    });

    setExpenseTitle('');
    setExpenseAmount('');
    setExpenseDescription('');
  };

  return (
    <div className="space-y-6">
      {/* Title */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-sans font-bold text-xl text-slate-900 dark:text-slate-100 flex items-center gap-2">
            <FileSpreadsheet className="text-sky-400" />
            {t('accountingTitle')}
          </h2>
          <p className="text-xs text-slate-500 tracking-wide">
            {language === 'bn' ? 'একাডেমির লাভ ক্ষয়ক্ষতি বিবরণী, দৈনন্দিন ব্যয় লেজার এবং ডাস্টবিন রিস্টোর টুল।' : 'Oversee income flows, record expense bills, audit fiscal profit margins, and manage bin targets'}
          </p>
        </div>
      </div>

      {/* Mini state stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl">
          <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider block">{language === 'bn' ? 'সর্বমোট আয়' : 'Cumulative Cash Inflow'}</span>
          <span className="text-2xl font-black text-emerald-400 mt-1 block">৳{totalCalculatedIncome} BDT</span>
          <span className="text-[9px] text-slate-400 block mt-0.5">Fees: ৳{totalPaidFees} | Donations: ৳{totalDonations}</span>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl">
          <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider block">{language === 'bn' ? 'সক্রিয় মোট ব্যয়' : 'Cumulative Active Dr Outflow'}</span>
          <span className="text-2xl font-black text-rose-400 mt-1 block">৳{totalCalculatedExpense} BDT</span>
          <span className="text-[9px] text-slate-450 block mt-0.5">{activeExpenses.length} logged expense receipts</span>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl">
          <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider block">{t('netProfit')}</span>
          <span className={`text-2xl font-black mt-1 block ${netBalanceProfit >= 0 ? 'text-sky-400' : 'text-rose-500'}`}>
            ৳{netBalanceProfit} BDT
          </span>
          <span className="text-[9px] text-slate-450 block mt-0.5">Academy reserve net balance</span>
        </div>
      </div>

      {/* Section Tabs */}
      <div className="flex border-b border-slate-850">
        <button
          onClick={() => setActiveLedgerTab('ledger')}
          className={`px-4 py-2 text-xs font-semibold border-b-2 transition ${activeLedgerTab === 'ledger' ? 'border-sky-500 text-sky-400 font-bold' : 'border-transparent text-slate-400'}`}
        >
          {language === 'bn' ? 'ব্যয় খতিয়ান' : 'Expense Ledger'}
        </button>
        <button
          onClick={() => setActiveLedgerTab('profitloss')}
          className={`px-4 py-2 text-xs font-semibold border-b-2 transition ${activeLedgerTab === 'profitloss' ? 'border-sky-500 text-sky-400 font-bold' : 'border-transparent text-slate-400'}`}
        >
          {t('profitAndLoss')}
        </button>
        <button
          id="tab-recycle-bin"
          onClick={() => setActiveLedgerTab('trash')}
          className={`px-4 py-2 text-xs font-semibold border-b-2 transition flex items-center gap-1.5 ${activeLedgerTab === 'trash' ? 'border-rose-500 text-rose-500 font-bold' : 'border-transparent text-slate-400'}`}
        >
          <Archive size={12} />
          <span>{t('recycleBin')}</span>
          <span className="bg-rose-500/10 text-rose-450 text-[10px] px-1.5 rounded-full font-mono">
            {recycledExpenses.length}
          </span>
        </button>
      </div>

      {/* Main Container Contents render matching active tabs */}
      {activeLedgerTab === 'ledger' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Post Expense bill Form */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-5 rounded-2xl shadow-lg h-fit space-y-4">
            <h3 className="font-sans font-bold text-sm border-b border-light-divider dark:border-slate-800 pb-2">
              {language === 'bn' ? 'নতুন খরচ সংযোজন' : 'Post New Academy Debit'}
            </h3>

            <form onSubmit={handlePostExpense} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1">ব্যয় খাতের বিবরণ *</label>
                <input
                  type="text"
                  value={expenseTitle}
                  onChange={(e) => setExpenseTitle(e.target.value)}
                  placeholder="যেমন: রংতুলি ও ক্যানভাস ক্রয়"
                  className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-850 rounded-lg px-3 py-2 text-xs focus:outline-none"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1">ক্যাটাগরি</label>
                  <select
                    value={expenseCategory}
                    onChange={(e) => setExpenseCategory(e.target.value as any)}
                    className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-850 rounded-lg px-3 py-2 text-xs focus:outline-none"
                  >
                    {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1">{t('amount')} *</label>
                  <input
                    type="number"
                    value={expenseAmount}
                    onChange={(e) => setExpenseAmount(e.target.value)}
                    placeholder="৳"
                    className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-855 rounded-lg px-3 py-2 text-xs focus:outline-none"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1">অতিরিক্ত নোট / বিবরণ</label>
                <input
                  type="text"
                  value={expenseDescription}
                  onChange={(e) => setExpenseDescription(e.target.value)}
                  placeholder="যেমন: ক্যাশ ভাউচার #৭৮"
                  className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-850 rounded-lg px-3 py-2 text-xs focus:outline-none"
                />
              </div>

              <button
                type="submit"
                id="post-expense-btn"
                className="w-full py-2 bg-gradient-to-r from-sky-500 to-indigo-600 font-bold text-xs text-white rounded-lg shadow transition"
              >
                {language === 'bn' ? 'ব্যয় এন্ট্রি করুন' : 'Confirm Expense Bill'}
              </button>
            </form>
          </div>

          {/* Active ledger items list table */}
          <div className="lg:col-span-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden shadow">
            <div className="p-4 bg-slate-50 dark:bg-slate-950 border-b border-light-divider dark:border-slate-800 font-sans font-bold text-xs">
              {language === 'bn' ? 'চলতি খরচ বিবরণী লেজার' : 'Active Debit Transactions Book'}
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-slate-100 dark:bg-slate-950/40 text-slate-500 font-mono text-[9px] uppercase tracking-wider">
                    <th className="p-3">খরচের শিরোনাম (ক্যাটাগরি)</th>
                    <th className="p-3">টাকার পরিমাণ</th>
                    <th className="p-3">তারিখ</th>
                    <th className="p-3 text-center">{language === 'bn' ? 'অ্যাকশন' : 'Trash'}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-700 dark:text-slate-350">
                  {activeExpenses.length === 0 ? (
                    <tr>
                      <td colSpan={4} className="p-8 text-center text-slate-400">
                        {language === 'bn' ? 'লেজার খালি' : 'No expenses recorded yet.'}
                      </td>
                    </tr>
                  ) : (
                    activeExpenses.map(exp => (
                      <tr key={exp.id} className="hover:bg-slate-50 dark:hover:bg-slate-955/30 transition">
                        <td className="p-3">
                          <p className="font-bold">{exp.title}</p>
                          <p className="text-[10px] text-slate-500">{exp.category}</p>
                        </td>
                        <td className="p-3 font-bold text-rose-400">
                          ৳{exp.amount}
                        </td>
                        <td className="p-3 font-mono text-slate-400">
                          {exp.date}
                        </td>
                        <td className="p-3 text-center">
                          <button
                            onClick={() => deleteExpense(exp.id)}
                            className="p-1 rounded text-slate-500 hover:bg-rose-500/10 hover:text-rose-400 transition"
                            title="Recycle"
                          >
                            <Trash2 size={13} />
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Recycle Bin Tab rendering */}
      {activeLedgerTab === 'trash' && (
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden shadow">
          <div className="p-4 bg-rose-500/10 border-b border-rose-500/20 flex justify-between items-center text-rose-450 font-bold text-xs">
            <span className="flex items-center gap-1.5">
              <AlertTriangle size={15} />
              {language === 'bn' ? 'রিসাইকেল বিন (৩০ দিন পর মুছে ফেলা হবে)' : 'Recycle Bin Cache (Retention timer relative: 30 days remaining)'}
            </span>
          </div>

          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-100 dark:bg-slate-950 text-slate-500 text-[10px] uppercase font-mono tracking-wider">
                <th className="p-4">শিথিল নিষ্কাশিত খরচ বিবরণ</th>
                <th className="p-4">টাকার পরিমাণ</th>
                <th className="p-4">বাকি দিন (Countdown)</th>
                <th className="p-4 text-center">রিস্টোর / চিরস্থায়ী ডিলিট</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-700 dark:text-slate-300">
              {recycledExpenses.length === 0 ? (
                <tr>
                  <td colSpan={4} className="p-12 text-center text-slate-400 font-semibold">
                    {language === 'bn' ? 'রিসাইকেল বিনের মেমরি খালি আছে!' : 'Recycle Bin is currently empty! No records queue.'}
                  </td>
                </tr>
              ) : (
                recycledExpenses.map(exp => (
                  <tr key={exp.id} className="hover:bg-slate-50 dark:hover:bg-slate-950/50">
                    <td className="p-4">
                      <p className="font-bold text-slate-850 dark:text-slate-200">{exp.title}</p>
                      <p className="text-[10px] text-slate-500 italic">Category: {exp.category}</p>
                    </td>
                    <td className="p-4 font-bold text-slate-800 dark:text-slate-300">
                      ৳{exp.amount}
                    </td>
                    <td className="p-4 font-semibold text-rose-450 font-mono">
                      {/* 30 days mock countdown check */}
                      {Math.max(1, 30 - Math.ceil((Date.now() - Date.parse(exp.deletedAt || '')) / (1000 * 60 * 60 * 24)))} {language === 'bn' ? 'দিন বাকি' : 'days left'}
                    </td>
                    <td className="p-4 flex items-center justify-center gap-2">
                      <button
                        onClick={() => restoreExpense(exp.id)}
                        className="flex items-center gap-1 py-1 px-2 rounded.md bg-emerald-500/10 hover:bg-emerald-500 text-emerald-400 hover:text-slate-950 font-bold transition text-[10px] rounded"
                      >
                        <RotateCcw size={11} />
                        <span>{language === 'bn' ? 'ফিরিয়ে আনুন' : 'Restore'}</span>
                      </button>
                      <button
                        onClick={() => hardDeleteExpense(exp.id)}
                        className="flex items-center gap-1 py-1 px-2 rounded.md bg-rose-500/15 hover:bg-rose-550 text-rose-400 hover:text-white font-bold transition text-[10px] rounded"
                      >
                        <Trash2 size={11} />
                        <span>Purge</span>
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* Income Statement Profit/Loss report */}
      {activeLedgerTab === 'profitloss' && (
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-5 rounded-2xl shadow space-y-4">
          <div className="border-b border-light-divider dark:border-slate-800 pb-2">
            <h3 className="font-sans font-bold text-sm text-slate-900 dark:text-slate-100">
              {language === 'bn' ? 'একাডেমির লাভ-লোকসান বিশ্লেষণ বিবরণী (সার্বক্ষণিক তথ্য)' : 'Real-time Profit & Loss Income Statement'}
            </h3>
          </div>

          <div className="space-y-3 max-w-xl text-xs font-semibold text-slate-650 dark:text-slate-350">
            {/* Row index */}
            <div className="flex justify-between border-b border-slate-100 dark:border-slate-800 pb-2.5">
              <span>{language === 'bn' ? 'কোর্স ও সেশন ভর্তি ফি' : 'Sessional Admission Fees'}</span>
              <span className="text-emerald-400 font-mono">৳{payments.filter(p => p.feeType === 'Admission Fee' && p.status === 'Paid').reduce((s, c) => s + c.amount, 0)}</span>
            </div>
            <div className="flex justify-between border-b border-slate-100 dark:border-slate-800 pb-2.5">
              <span>{language === 'bn' ? 'সাপ্তাহিক ও মাসিক টিউশন ফি' : 'Student Monthly Tuition Fees'}</span>
              <span className="text-emerald-400 font-mono">৳{payments.filter(p => p.feeType === 'Monthly Fee' && p.status === 'Paid').reduce((s, c) => s + c.amount, 0)}</span>
            </div>
            <div className="flex justify-between border-b border-slate-100 dark:border-slate-800 pb-2.5">
              <span>{language === 'bn' ? 'পৃষ্ঠপোষক অনুদান ও কন্ট্রিবিউশন' : 'Donor Supporter Funding'}</span>
              <span className="text-emerald-400 font-mono">৳{totalDonations}</span>
            </div>
            <div className="flex justify-between border-b border-slate-100 dark:border-slate-800 pb-2.5">
              <span>{language === 'bn' ? 'অন্যান্য প্রাতিষ্ঠানিক আয়' : 'Form, Exams & Other Income'}</span>
              <span className="text-emerald-400 font-mono">৳{payments.filter(p => (p.feeType === 'Form Fee' || p.feeType === 'Exam Fee' || p.feeType === 'Event Fee') && p.status === 'Paid').reduce((s, c) => s + c.amount, 0)}</span>
            </div>
            
            <div className="flex justify-between border-b border-slate-100 dark:border-slate-800 pb-2.5 text-rose-400">
              <span>{language === 'bn' ? 'প্রশিক্ষক/ওস্তাদদের মাসিক সম্মানি' : 'Instructors honorarium payouts'}</span>
              <span className="font-mono">-৳{activeExpenses.filter(e => e.category === 'Trainer Honorarium').reduce((s, c) => s + c.amount, 0)}</span>
            </div>
            <div className="flex justify-between border-b border-slate-100 dark:border-slate-800 pb-2.5 text-rose-400">
              <span>{language === 'bn' ? 'ভাড়া, বিদ্যুৎ ও ইন্টারনেট বিল' : 'Facility Rent, Leases & Utility Bills'}</span>
              <span className="font-mono">-৳{activeExpenses.filter(e => e.category === 'Rent' || e.category === 'Utility').reduce((s, c) => s + c.amount, 0)}</span>
            </div>
            <div className="flex justify-between border-b border-slate-100 dark:border-slate-800 pb-2.5 text-rose-400">
              <span>{language === 'bn' ? 'শিক্ষা সামগ্রী ও অফিসিয়াল সরঞ্জাম' : 'Supplies & General Administrative overhead'}</span>
              <span className="font-mono">-৳{activeExpenses.filter(e => e.category !== 'Rent' && e.category !== 'Utility' && e.category !== 'Trainer Honorarium').reduce((s, c) => s + c.amount, 0)}</span>
            </div>

            <div className="flex justify-between border-t border-slate-800 pt-3 text-sm font-black dark:text-white">
              <span>{language === 'bn' ? 'নেট ব্যালেন্স লাভ/লোকসান (Net Balance)' : 'Total Net Cash Surplus'}</span>
              <span className={netBalanceProfit >= 0 ? 'text-emerald-450' : 'text-rose-500'}>
                ৳{netBalanceProfit} BDT
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
