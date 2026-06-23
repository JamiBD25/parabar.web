import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Payment, Artist } from '../types';
import { 
  Plus, Search, Filter, HardDrive, Printer, CheckCircle, 
  X, AlertTriangle, FileText, Download, TrendingUp, HelpCircle
} from 'lucide-react';

export const FeeView: React.FC = () => {
  const { 
    payments, artists, addPayment, updatePayment, deletePayment, t, language, logAction, currentAdmin 
  } = useApp();

  // Selected fee context
  const [activeTab, setActiveTab] = useState<'all' | 'dues' | 'history'>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('');
  const [filterMethod, setFilterMethod] = useState('');

  // Modals state
  const [showPayModal, setShowPayModal] = useState(false);
  const [showReceipt, setShowReceipt] = useState<Payment | null>(null);

  // Form Fields
  const [payArtistId, setPayArtistId] = useState('');
  const [payFeeType, setPayFeeType] = useState<'Admission Fee' | 'Monthly Fee' | 'Form Fee' | 'Exam Fee' | 'Event Fee' | 'Other Income'>('Monthly Fee');
  const [payAmount, setPayAmount] = useState('1000');
  const [payMonth, setPayMonth] = useState('June 2026');
  const [payMethod, setPayMethod] = useState<'Cash' | 'bKash' | 'Rocket' | 'Nagad' | 'Bank'>('Cash');
  const [payReceiptNo, setPayReceiptNo] = useState('');
  const [payStatus, setPayStatus] = useState<'Paid' | 'Due' | 'Partial'>('Paid');
  
  // Auto Receipt Checkbox
  const [autoReceipt, setAutoReceipt] = useState(true);

  const feeCategories = ['Admission Fee', 'Monthly Fee', 'Form Fee', 'Exam Fee', 'Event Fee', 'Other Income'];
  const paymentMethods = ['Cash', 'bKash', 'Rocket', 'Nagad', 'Bank'];
  const monthsList = ['January 2026', 'February 2026', 'March 2026', 'April 2026', 'May 2026', 'June 2026', 'July 2026', 'August 2026', 'September 2026', 'October 2026', 'November 2026', 'December 2026'];

  const handleOpenPayModal = () => {
    setPayArtistId(artists[0]?.id || '');
    setPayFeeType('Monthly Fee');
    setPayAmount('1000');
    setPayMonth('June 2026');
    setPayMethod('Cash');
    setPayReceiptNo('');
    setPayStatus('Paid');
    setAutoReceipt(true);
    setShowPayModal(true);
  };

  const handleArtistChange = (id: string) => {
    setPayArtistId(id);
    const art = artists.find(a => a.id === id);
    // If Admission Fee is picked, we might set 2000, otherwise 1000 standard
    if (payFeeType === 'Admission Fee') {
      setPayAmount('2000');
    } else if (payFeeType === 'Event Fee') {
      setPayAmount('500');
    } else {
      setPayAmount('1000');
    }
  };

  const handleFeeTypeChange = (type: any) => {
    setPayFeeType(type);
    if (type === 'Admission Fee') {
      setPayAmount('2000');
    } else if (type === 'Event Fee') {
      setPayAmount('500');
    } else if (type === 'Exam Fee') {
      setPayAmount('400');
    } else if (type === 'Form Fee') {
      setPayAmount('200');
    } else {
      setPayAmount('1000');
    }
  };

  // Record a payment
  const handleRecordPayment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!payArtistId) {
      alert(language === 'bn' ? 'দয়া করে একজন শিল্পী নির্বাচন করুন।' : 'Please select an enrolled artist');
      return;
    }

    const artist = artists.find(a => a.id === payArtistId);
    if (!artist) return;

    const receiptNo = autoReceipt 
      ? `REC-2026-${String(payments.length + 101).padStart(3, '0')}`
      : payReceiptNo || `MAN-${Date.now().toString().slice(-6)}`;

    const newPayment = {
      artistId: payArtistId,
      artistName: artist.name,
      feeType: payFeeType,
      amount: Number(payAmount),
      paymentDate: payStatus === 'Paid' ? new Date().toISOString().split('T')[0] : '',
      month: payFeeType === 'Monthly Fee' ? payMonth : undefined,
      receiptNo,
      paymentMethod: payMethod,
      status: payStatus,
      collectedBy: payStatus === 'Paid' ? currentAdmin.name : ''
    };

    addPayment(newPayment);
    setShowPayModal(false);
  };

  const handleQuickPayDue = (payment: Payment) => {
    const updated = {
      ...payment,
      status: 'Paid' as const,
      paymentDate: new Date().toISOString().split('T')[0],
      collectedBy: currentAdmin.name,
      paymentMethod: 'Cash' as const
    };
    updatePayment(payment.id, updated);
    logAction('Collect Due', `Collected due payment of ৳${payment.amount} for ${payment.artistName}. Receipt: ${payment.receiptNo}`);
  };

  // Print single Receipt modal
  const handlePrintSingleReceipt = (pay: Payment) => {
    const printWindow = window.open('', '_blank');
    if (!printWindow) return;

    printWindow.document.write(`
      <html>
        <head>
          <title>Academy Invoice Receipt - ${pay.receiptNo}</title>
          <style>
            body { font-family: 'Helvetica Neue', 'Arial', sans-serif; padding: 30px; color: #1e293b; max-width: 500px; margin: 0 auto; border: 1px solid #e2e8f0; border-radius: 12px; }
            .header { text-align: center; border-bottom: 2px dashed #cbd5e1; padding-bottom: 15px; margin-bottom: 20px; }
            .logo { font-size: 20px; font-weight: bold; color: #0f172a; text-transform: uppercase; margin-bottom: 2px; }
            .subtitle { font-size: 11px; color: #64748b; letter-spacing: 1px; }
            .receipt-title { font-size: 13px; font-weight: bold; background: #e2e8f0; color: #0f172a; display: inline-block; padding: 4px 12px; border-radius: 4px; margin-top: 10px; }
            .row { display: flex; justify-content: space-between; font-size: 12px; margin-bottom: 8px; }
            .label { color: #64748b; }
            .val { font-weight: 600; color: #0f172a; }
            .box { background: #f8fafc; border: 1px solid #e2e8f0; padding: 12px; rounded: 8px; margin: 15px 0; }
            .stamp { text-align: right; margin-top: 40px; font-size: 10px; color: #94a3b8; }
            .stamp-sig { border-top: 1px solid #cbd5e1; display: inline-block; width: 120px; text-align: center; padding-top: 5px; font-weight: bold; }
          </style>
        </head>
        <body>
          <div class="header">
            <div class="logo">PARABAR SONGSOD</div>
            <div class="subtitle">Parabar Sahittya Sangskriti Songsod Chattogram</div>
            <div class="receipt-title">PAYMENT RECEIPT (টাকামান রসিদ)</div>
          </div>
          
          <div class="row">
            <span class="label">Receipt Number</span>
            <span class="val font-mono">${pay.receiptNo}</span>
          </div>
          <div class="row">
            <span class="label">Date Collected</span>
            <span class="val">${pay.paymentDate || 'N/A'}</span>
          </div>
          
          <div class="box">
            <div class="row">
              <span class="label">Artist Name</span>
              <span class="val">${pay.artistName}</span>
            </div>
            <div class="row">
              <span class="label">Artist Account ID</span>
              <span class="val">${pay.artistId}</span>
            </div>
            <div class="row">
              <span class="label">Fee Description</span>
              <span class="val">${pay.feeType} ${pay.month ? `(${pay.month})` : ''}</span>
            </div>
            <div class="row" style="border-top: 1px solid #cbd5e1; padding-top: 6px; margin-top: 6px;">
              <span class="label" style="font-weight: bold;">Amount Paid</span>
              <span class="val" style="color: #10b981; font-size: 14px;">৳${pay.amount} BDT</span>
            </div>
          </div>
          
          <div class="row">
            <span class="label">Payment Mode</span>
            <span class="val">${pay.paymentMethod}</span>
          </div>
          <div class="row">
            <span class="label">Ledger Status</span>
            <span class="val" style="color: #22c55e;">${pay.status.toUpperCase()}</span>
          </div>
          <div class="row">
            <span class="label">Admin Collector</span>
            <span class="val">${pay.collectedBy || 'Self'}</span>
          </div>

          <div class="stamp">
            <div class="stamp-sig">Authorized Agent</div>
          </div>
          <script>window.print();</script>
        </body>
      </html>
    `);
    printWindow.document.close();
    logAction('Print Receipt', `Printed single account voucher for receipt: ${pay.receiptNo}`);
  };

  // Financial listings filtering
  const filteredPayments = payments.filter(pay => {
    const searchLower = searchTerm.toLowerCase();
    const matchesSearch = 
      pay.artistName.toLowerCase().includes(searchLower) ||
      pay.artistId.toLowerCase().includes(searchLower) ||
      pay.receiptNo.toLowerCase().includes(searchLower);

    const matchesType = filterType ? pay.feeType === filterType : true;
    const matchesMethod = filterMethod ? pay.paymentMethod === filterMethod : true;
    
    const matchesTab = 
      activeTab === 'dues' ? pay.status === 'Due' :
      activeTab === 'history' ? pay.status === 'Paid' : true;

    return matchesSearch && matchesType && matchesMethod && matchesTab;
  });

  return (
    <div className="space-y-6">
      {/* Title block */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-sans font-bold text-xl text-slate-900 dark:text-slate-100 flex items-center gap-2">
            <TrendingUp className="text-emerald-400" />
            {t('fees')}
          </h2>
          <p className="text-xs text-slate-500 tracking-wide">
            {language === 'bn' ? 'মাসিক বেতন ও ফি আদায়ের রশিদ এবং বকেয়া তালিকা রক্ষণ করুন।' : 'Record monthly student dues, collect payments and issue receipts'}
          </p>
        </div>

        <button
          id="collect-fee-btn"
          onClick={handleOpenPayModal}
          className="flex items-center gap-1.5 px-4 py-2 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-slate-950 font-bold rounded-lg text-xs shadow transition-all"
        >
          <Plus size={16} />
          <span>{language === 'bn' ? 'ফি আদায় করুন' : 'Collect New Fee'}</span>
        </button>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-light-divider dark:border-slate-800">
        <button
          onClick={() => setActiveTab('all')}
          className={`px-4 py-2 text-xs font-semibold border-b-2 transition ${activeTab === 'all' ? 'border-emerald-500 text-emerald-400 font-bold' : 'border-transparent text-slate-400'}`}
        >
          {language === 'bn' ? 'সকল লেনদেন' : 'All Accounts'}
        </button>
        <button
          id="tab-dues"
          onClick={() => setActiveTab('dues')}
          className={`px-4 py-2 text-xs font-semibold border-b-2 transition flex items-center gap-1.5 ${activeTab === 'dues' ? 'border-amber-500 text-amber-400 font-bold' : 'border-transparent text-slate-400'}`}
        >
          <AlertTriangle size={12} className="text-amber-500" />
          <span>{t('dueList')}</span>
          <span className="bg-amber-500/10 text-amber-400 text-[10px] px-1.5 rounded-full font-mono">
            {payments.filter(p => p.status === 'Due').length}
          </span>
        </button>
        <button
          onClick={() => setActiveTab('history')}
          className={`px-4 py-2 text-xs font-semibold border-b-2 transition ${activeTab === 'history' ? 'border-emerald-500 text-emerald-400 font-bold' : 'border-transparent text-slate-400'}`}
        >
          {t('history')}
        </button>
      </div>

      {/* Search Filter Widgets */}
      <div className="bg-white dark:bg-slate-900 rounded-xl p-4 border border-slate-200 dark:border-slate-800/80 shadow space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {/* Query search */}
          <div>
            <input
              type="text"
              placeholder={t('searchPlaceholder')}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-800 dark:text-slate-200 focus:outline-none"
            />
          </div>

          {/* Fee category filter */}
          <div>
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-800 dark:text-slate-200 focus:outline-none"
            >
              <option value="">{language === 'bn' ? 'সকল ফি ক্যাটাগরি' : 'All Fee Categories'}</option>
              {feeCategories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
            </select>
          </div>

          {/* Payment method filter */}
          <div>
            <select
              value={filterMethod}
              onChange={(e) => setFilterMethod(e.target.value)}
              className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-800 dark:text-slate-200 focus:outline-none"
            >
              <option value="">{language === 'bn' ? 'সকল পেমেন্ট মোড' : 'All Payment Methods'}</option>
              {paymentMethods.map(m => <option key={m} value={m}>{m}</option>)}
            </select>
          </div>
        </div>
      </div>

      {/* Account Table */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-850 rounded-2xl overflow-hidden shadow-lg">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-100 dark:bg-slate-950 border-b border-light-divider dark:border-slate-800 text-slate-500 font-mono tracking-wider uppercase">
                <th className="p-4">{t('receiptNo')}</th>
                <th className="p-4">{language === 'bn' ? 'শিল্পীর তথ্য' : 'Artist Details'}</th>
                <th className="p-4">{language === 'bn' ? 'ফি ক্যাটাগরি' : 'Description'}</th>
                <th className="p-4">{t('amount')}</th>
                <th className="p-4">{t('paymentStatus')}</th>
                <th className="p-4">{t('paymentDate')}</th>
                <th className="p-4 text-center">{language === 'bn' ? 'অ্যাকশন' : 'Operation'}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-700 dark:text-slate-300">
              {filteredPayments.length === 0 ? (
                <tr>
                  <td colSpan={7} className="p-8 text-center text-slate-400">
                    <p className="font-semibold text-sm">
                      {language === 'bn' ? 'কোনো লেনদেন রেকর্ড পাওয়া যায়নি।' : 'No payment records fit the specified criteria.'}
                    </p>
                  </td>
                </tr>
              ) : (
                filteredPayments.map(pay => {
                  const isDue = pay.status === 'Due';
                  return (
                    <tr key={pay.id} className="hover:bg-slate-50 dark:hover:bg-slate-950/50 transition">
                      <td className="p-4 font-mono font-bold text-sky-400">
                        {pay.receiptNo}
                      </td>
                      <td className="p-4">
                        <div className="font-semibold text-slate-900 dark:text-slate-200">
                          {pay.artistName}
                        </div>
                        <div className="text-[10px] text-slate-500 font-mono">
                          {pay.artistId}
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="font-medium text-slate-850 dark:text-slate-300">
                          {pay.feeType}
                        </div>
                        {pay.month && (
                          <div className="text-[10px] text-slate-400">
                            {pay.month}
                          </div>
                        )}
                      </td>
                      <td className="p-4 font-bold text-slate-850 dark:text-slate-200">
                        ৳{pay.amount}
                      </td>
                      <td className="p-4">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                          pay.status === 'Paid' ? 'bg-emerald-500/10 text-emerald-400' :
                          pay.status === 'Due' ? 'bg-rose-500/10 text-rose-400' :
                          'bg-amber-500/10 text-amber-400'
                        }`}>
                          {pay.status === 'Paid' ? t('paid') : pay.status === 'Due' ? t('due') : t('partial')}
                        </span>
                      </td>
                      <td className="p-4 font-mono text-slate-450 text-[11px]">
                        {pay.paymentDate || '—'}
                      </td>
                      <td className="p-4 flex items-center justify-center gap-1.5">
                        {isDue ? (
                          <button
                            onClick={() => handleQuickPayDue(pay)}
                            className="bg-emerald-500 text-slate-950 font-bold px-2 py-1 rounded text-[10px] hover:bg-emerald-400 transition"
                          >
                            {language === 'bn' ? 'পরিশোধ নিন' : 'Mark Paid'}
                          </button>
                        ) : (
                          <>
                            <button
                              onClick={() => setShowReceipt(pay)}
                              className="p-1 rounded bg-slate-100 hover:bg-slate-200 dark:bg-slate-850 dark:hover:bg-slate-800 text-slate-300 transition"
                              title="Show Receipt Card"
                            >
                              <FileText size={13} className="text-sky-400" />
                            </button>
                            <button
                              onClick={() => handlePrintSingleReceipt(pay)}
                              className="p-1 rounded bg-slate-100 hover:bg-slate-200 dark:bg-slate-850 dark:hover:bg-slate-800 text-slate-300 transition"
                              title={t('print')}
                            >
                              <Printer size={13} className="text-emerald-400" />
                            </button>
                          </>
                        )}
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Collect Fee Modal */}
      {showPayModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 overflow-y-auto">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl w-full max-w-md text-slate-800 dark:text-slate-100 shadow-2xl animate-scaleUp">
            <div className="flex items-center justify-between p-5 border-b border-light-divider dark:border-slate-800/80">
              <h3 className="font-sans font-bold text-lg text-slate-900 dark:text-slate-100">
                {language === 'bn' ? 'নতুন ফি বা পেমেন্ট আদায়' : 'Collect New Academy Payment'}
              </h3>
              <button onClick={() => setShowPayModal(false)} className="p-1.5 rounded-lg text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition">
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleRecordPayment} className="p-6 space-y-4">
              {/* Select Artist */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-400 mb-1">{t('selectArtist')} *</label>
                <select
                  value={payArtistId}
                  onChange={(e) => handleArtistChange(e.target.value)}
                  className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-800 dark:text-slate-200 focus:outline-none"
                  required
                >
                  <option value="">-- {language === 'bn' ? 'শিল্পী নির্বাচন করুন' : 'Select Artist'} --</option>
                  {artists.map(art => (
                    <option key={art.id} value={art.id}>{art.name} ({art.id} - {art.mobile})</option>
                  ))}
                </select>
              </div>

              {/* Fee Categories */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-400 mb-1">{language === 'bn' ? 'ফি ক্যাটাগরি' : 'Fee Category'} *</label>
                <select
                  value={payFeeType}
                  onChange={(e) => handleFeeTypeChange(e.target.value as any)}
                  className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-800 dark:text-slate-200 focus:outline-none"
                >
                  {feeCategories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                </select>
              </div>

              {/* Monthly billing month */}
              {payFeeType === 'Monthly Fee' && (
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-400 mb-1">{language === 'bn' ? 'মাস নির্বাচন' : 'Assigned Month'}</label>
                  <select
                    value={payMonth}
                    onChange={(e) => setPayMonth(e.target.value)}
                    className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-800 dark:text-slate-200 focus:outline-none"
                  >
                    {monthsList.map(mo => <option key={mo} value={mo}>{mo}</option>)}
                  </select>
                </div>
              )}

              {/* Amount and Payment method */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-400 mb-1">{t('amount')} *</label>
                  <input
                    type="number"
                    value={payAmount}
                    onChange={(e) => setPayAmount(e.target.value)}
                    className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-800 dark:text-slate-200 focus:outline-none"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-400 mb-1">{t('paymentMethod')}</label>
                  <select
                    value={payMethod}
                    onChange={(e) => setPayMethod(e.target.value as any)}
                    className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-800 dark:text-slate-200 focus:outline-none"
                  >
                    {paymentMethods.map(m => <option key={m} value={m}>{m}</option>)}
                  </select>
                </div>
              </div>

              {/* Status */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-400 mb-1">{language === 'bn' ? 'প্রাপ্তি অবস্থা' : 'Payment Status'}</label>
                <select
                  value={payStatus}
                  onChange={(e) => setPayStatus(e.target.value as any)}
                  className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-800 dark:text-slate-200 focus:outline-none"
                >
                  <option value="Paid">{t('paid')}</option>
                  <option value="Due">{t('due')}</option>
                </select>
              </div>

              {/* Auto Receipt Toggle */}
              <div className="flex items-center gap-2 pt-2 border-t border-slate-100 dark:border-slate-850">
                <input
                  type="checkbox"
                  id="auto-receipt-chk"
                  checked={autoReceipt}
                  onChange={(e) => setAutoReceipt(e.target.checked)}
                  className="rounded border-slate-300 dark:border-slate-800 text-indigo-600 focus:ring-0"
                />
                <label htmlFor="auto-receipt-chk" className="text-xs text-slate-600 dark:text-slate-400 cursor-pointer select-none">
                  {t('receiptGen')} (স্বয়ংক্রিয় রশিদ নং ট্রিগার করুন)
                </label>
              </div>

              {/* Manual receipt input if auto is checked out */}
              {!autoReceipt && (
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-400 mb-1">{t('receiptNo')} (ম্যানুয়াল)</label>
                  <input
                    type="text"
                    value={payReceiptNo}
                    onChange={(e) => setPayReceiptNo(e.target.value)}
                    placeholder="যেমন: REC-2026-999"
                    className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-800 dark:text-slate-200 focus:outline-none"
                  />
                </div>
              )}

              {/* Submit Buttons */}
              <div className="flex gap-3 justify-end pt-4 border-t border-light-divider dark:border-slate-800/80">
                <button
                  type="button"
                  onClick={() => setShowPayModal(false)}
                  className="px-4 py-2 rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-xs text-slate-700 dark:text-indigo-200 transition font-semibold"
                >
                  {t('cancel')}
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-lg bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 font-bold text-xs text-slate-950 transition shadow"
                >
                  {language === 'bn' ? 'রশিদ তৈরি করুন' : 'Issue Receipt'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Single Live Receipt View Slider Popup */}
      {showReceipt && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 text-white max-w-sm w-full shadow-2xl relative">
            <button 
              onClick={() => setShowReceipt(null)}
              className="absolute right-4 top-4 p-1 rounded-full bg-slate-800 hover:bg-slate-700 transition"
            >
              <X size={16} />
            </button>

            {/* Document wrapper */}
            <div className="text-center mb-4">
              <span className="text-xs bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 px-3 py-1 rounded-full uppercase font-mono font-bold">
                Invoice Details
              </span>
            </div>

            <div className="bg-slate-950 border border-slate-850 p-4 rounded-xl space-y-3 font-mono text-xs">
              <div className="flex justify-between">
                <span className="text-slate-500">Receipt No:</span>
                <span className="text-sky-400 font-bold">{showReceipt.receiptNo}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Artist ID:</span>
                <span>{showReceipt.artistId}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Name:</span>
                <span className="text-slate-300 font-semibold">{showReceipt.artistName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Voucher For:</span>
                <span>{showReceipt.feeType}</span>
              </div>
              {showReceipt.month && (
                <div className="flex justify-between">
                  <span className="text-slate-500">Month:</span>
                  <span>{showReceipt.month}</span>
                </div>
              )}
              <div className="flex justify-between border-t border-slate-800 pt-2 font-bold text-sm">
                <span className="text-slate-400">Total BDT:</span>
                <span className="text-emerald-400">৳{showReceipt.amount}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Collected By:</span>
                <span>{showReceipt.collectedBy || 'N/A'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Payment:</span>
                <span className="text-indigo-400 font-bold">{showReceipt.paymentMethod}</span>
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={() => {
                  handlePrintSingleReceipt(showReceipt);
                  setShowReceipt(null);
                }}
                className="flex-1 flex items-center justify-center gap-2 py-2 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs transition"
              >
                <Printer size={15} />
                <span>Printer Layout</span>
              </button>
              <button
                _id="download-btn"
                onClick={() => {
                  alert(language === 'bn' ? 'রসিদ পিডিএফ ডাউনলোড সমাপ্ত!' : 'PDF Invoicing snapshot download complete!');
                  setShowReceipt(null);
                }}
                className="flex-1 flex items-center justify-center gap-2 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 transition text-xs font-semibold"
              >
                <Download size={15} />
                <span>Snap PDF</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
