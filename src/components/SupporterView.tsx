import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Supporter, Donation } from '../types';
import { 
  Users, HeartHandshake, Plus, Award, Mail, Calendar, 
  MapPin, Landmark, X, FileText, Download 
} from 'lucide-react';

export const SupporterView: React.FC = () => {
  const { 
    supporters, donations, addSupporter, addDonation, language, t, logAction 
  } = useApp();

  const [showAddSupporter, setShowAddSupporter] = useState(false);
  const [showAddDonation, setShowAddDonation] = useState(false);
  const [activeCertificate, setActiveCertificate] = useState<Donation | null>(null);

  // Supporter Form fields
  const [supName, setSupName] = useState('');
  const [supMobile, setSupMobile] = useState('');
  const [supEmail, setSupEmail] = useState('');
  const [supAddress, setSupAddress] = useState('');
  const [supContribution, setSupContribution] = useState('5000');

  // Donation Form fields
  const [donSupId, setDonSupId] = useState('');
  const [donAmount, setDonAmount] = useState('5000');
  const [donMethod, setDonMethod] = useState('Bank Transfer');
  const [donPurpose, setDonPurpose] = useState('General Academic Funding');

  const paymentMethods = ['Bank Transfer', 'Cash Contribution', 'bKash Merchant', 'Rocket Pay', 'Nagad Pay'];

  const handleCreateSupporter = (e: React.FormEvent) => {
    e.preventDefault();
    if (!supName || !supMobile) return;

    addSupporter({
      name: supName,
      mobile: supMobile,
      email: supEmail,
      address: supAddress,
      regularContribution: Number(supContribution),
      status: 'Active'
    });

    setSupName('');
    setSupMobile('');
    setSupEmail('');
    setSupAddress('');
    setShowAddSupporter(false);
  };

  const handleCreateDonation = (e: React.FormEvent) => {
    e.preventDefault();
    if (!donAmount) return;

    let donorName = 'External Patron';
    if (donSupId) {
      const match = supporters.find(s => s.id === donSupId);
      if (match) donorName = match.name;
    }

    addDonation({
      supporterId: donSupId || 'anonymous',
      supporterName: donorName,
      amount: Number(donAmount),
      date: new Date().toISOString().split('T')[0],
      paymentMethod: donMethod,
      receiptNo: '', // Auto-set inside provider helper
      purpose: donPurpose
    });

    setShowAddDonation(false);
  };

  return (
    <div className="space-y-6">
      {/* Title */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-sans font-bold text-xl text-slate-900 dark:text-slate-100 flex items-center gap-2">
            <HeartHandshake className="text-rose-455" />
            {t('supporters')}
          </h2>
          <p className="text-xs text-slate-500 tracking-wide">
            {language === 'bn' ? 'একাডেমির নিয়মিত দাতাগণ, সমর্থনকারীদের বার্ষিক ডনেশন সমূহ এবং থ্যাঙ্ক ইউ সার্টিফিকেট।' : 'Track dedicated donors, document patron grant contributions, and issue certificate vouchers'}
          </p>
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => setShowAddSupporter(true)}
            className="flex items-center gap-1.5 px-3 py-2 bg-slate-800 border border-slate-700 text-slate-200 hover:text-white rounded-lg text-xs font-semibold shadow transition"
          >
            <Plus size={15} />
            <span>{language === 'bn' ? 'সমর্থক যোগ করুন' : 'Add Patron'}</span>
          </button>
          <button
            id="register-grant-btn"
            onClick={() => {
              setDonSupId(supporters[0]?.id || '');
              setShowAddDonation(true);
            }}
            className="flex items-center gap-1.5 px-4 py-2 bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-400 hover:to-pink-500 text-white font-bold rounded-lg text-xs shadow transition"
          >
            <Plus size={15} />
            <span>{language === 'bn' ? 'অনুদান এন্ট্রি করুন' : 'Log Donation Grant'}</span>
          </button>
        </div>
      </div>

      {/* Main Grid: Supporters cards & Donations listings */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        
        {/* Supporters directory list column */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-5 rounded-2xl shadow space-y-4">
          <h3 className="font-sans font-bold text-sm border-b border-light-divider dark:border-slate-800 pb-2">
            {language === 'bn' ? 'আমাদের আজীবন সমর্থক ও পৃষ্ঠপোষক' : 'Academy Committed Patrons'}
          </h3>

          <div className="space-y-4 overflow-y-auto max-h-[400px] custom-scrollbar">
            {supporters.map(sup => (
              <div key={sup.id} className="bg-slate-50 dark:bg-slate-950/50 p-4 border border-slate-100 dark:border-slate-850 rounded-xl space-y-2">
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="font-bold text-sm dark:text-slate-100">{sup.name}</h4>
                    <span className="text-[10px] text-slate-500 block">ID: {sup.id}</span>
                  </div>
                  <span className={`px-2 py-0.5 rounded text-[8px] font-bold ${sup.status === 'Active' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-slate-550/10 text-slate-400'}`}>
                    {sup.status === 'Active' ? t('active') : t('inactive')}
                  </span>
                </div>

                <div className="text-[11px] text-slate-400 space-y-1">
                  <p className="flex items-center gap-1.5"><Mail size={11} /> <span>{sup.email || 'N/A'}</span></p>
                  <p className="flex items-center gap-1.5"><MapPin size={11} /> <span className="truncate">{sup.address}</span></p>
                  <p className="flex items-center gap-1.5 font-bold text-emerald-400">
                    <Landmark size={11} /> 
                    <span>Committed: ৳{sup.regularContribution}/yr</span>
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Donations records database block */}
        <div className="xl:col-span-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden shadow">
          <div className="p-4 bg-slate-50 dark:bg-slate-950 border-b border-light-divider dark:border-slate-800 font-sans font-bold text-xs">
            {language === 'bn' ? 'পৃষ্ঠপোষক অনুদান ও গ্রান্ট খাতা' : 'Patron Donation Ledger Records'}
          </div>

          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-100 dark:bg-slate-950/40 text-slate-500 font-mono text-[9px] uppercase">
                <th className="p-3">দাতার নাম (ID)</th>
                <th className="p-3">অনুদানের পরিমাণ</th>
                <th className="p-3">উদ্দেশ্য / ফান্ডিং খাত</th>
                <th className="p-3 text-center">সার্টিফিকেট</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-700 dark:text-slate-350">
              {donations.map(don => (
                <tr key={don.id} className="hover:bg-slate-50 dark:hover:bg-slate-955/30 transition">
                  <td className="p-3">
                    <p className="font-bold">{don.supporterName}</p>
                    <p className="text-[10px] text-slate-500">Method: {don.paymentMethod}</p>
                  </td>
                  <td className="p-3 font-bold text-emerald-400 font-mono">
                    ৳{don.amount}
                  </td>
                  <td className="p-3 text-slate-400 truncate max-w-[150px]">
                    {don.purpose}
                  </td>
                  <td className="p-3 text-center">
                    <button
                      onClick={() => setActiveCertificate(don)}
                      className="p-1 rounded text-sky-400 hover:bg-sky-500/10 transition"
                      title="Generate Thank You Certificate Snapshot"
                    >
                      <FileText size={13} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Patron Support modal */}
      {showAddSupporter && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl w-full max-w-md shadow-2xl animate-scaleUp text-slate-850 dark:text-slate-100">
            <div className="flex items-center justify-between p-5 border-b border-light-divider dark:border-slate-800/80">
              <h3 className="font-sans font-bold text-base">আজীবন পৃষ্ঠপোষক সংযোজন</h3>
              <button onClick={() => setShowAddSupporter(false)} className="p-1.5 rounded bg-slate-800 text-slate-400 hover:text-white">
                <X size={16} />
              </button>
            </div>

            <form onSubmit={handleCreateSupporter} className="p-5 space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1">দাতার শুভ নাম *</label>
                <input
                  type="text"
                  value={supName}
                  onChange={(e) => setSupName(e.target.value)}
                  placeholder="যেমন: আলহাজ্ব জসিম উদ্দিন"
                  className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-850 rounded-lg px-3 py-2 text-xs focus:outline-none"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1">{t('mobile')} *</label>
                  <input
                    type="tel"
                    value={supMobile}
                    onChange={(e) => setSupMobile(e.target.value)}
                    placeholder="017XXXXXXXX"
                    className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-850 rounded-lg px-3 py-2 text-xs focus:outline-none"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1">বার্ষিক অবদানের প্রতিশ্রুতি</label>
                  <input
                    type="number"
                    value={supContribution}
                    onChange={(e) => setSupContribution(e.target.value)}
                    className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-850 rounded-lg px-3 py-2 text-xs focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1">ইমেইল এড্রেস</label>
                <input
                  type="email"
                  value={supEmail}
                  onChange={(e) => setSupEmail(e.target.value)}
                  placeholder="name@gmail.com"
                  className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-850 rounded-lg px-3 py-2 text-xs focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1">ঠিকানা</label>
                <input
                  type="text"
                  value={supAddress}
                  onChange={(e) => setSupAddress(e.target.value)}
                  className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-850 rounded-lg px-3 py-2 text-xs focus:outline-none"
                />
              </div>

              <div className="flex gap-2 justify-end pt-3 border-t border-slate-100 dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => setShowAddSupporter(false)}
                  className="px-4 py-1.5 rounded bg-slate-100 hover:bg-slate-200 dark:bg-slate-855 text-xs font-semibold"
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

      {/* Log Donation modal */}
      {showAddDonation && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl w-full max-w-md shadow-2xl animate-scaleUp text-slate-850 dark:text-slate-100">
            <div className="flex items-center justify-between p-5 border-b border-light-divider dark:border-slate-800/80">
              <h3 className="font-sans font-bold text-base">অনুদান গ্র্যান্ট এন্ট্রি করুন</h3>
              <button onClick={() => setShowAddDonation(false)} className="p-1.5 rounded bg-slate-800 text-slate-400 hover:text-white">
                <X size={16} />
              </button>
            </div>

            <form onSubmit={handleCreateDonation} className="p-5 space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1">দানকারী পৃষ্ঠপোষক নির্বাচন</label>
                <select
                  value={donSupId}
                  onChange={(e) => setDonSupId(e.target.value)}
                  className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-850 rounded-lg px-3 py-2 text-xs focus:outline-none"
                >
                  <option value="">-- Anonymous / External Donor (বেনামী) --</option>
                  {supporters.map(sup => <option key={sup.id} value={sup.id}>{sup.name}</option>)}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1">অনুদানের পরিমাণ (BDT) *</label>
                  <input
                    type="number"
                    value={donAmount}
                    onChange={(e) => setDonAmount(e.target.value)}
                    className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-850 rounded-lg px-3 py-2 text-xs focus:outline-none"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1">পেমেন্ট মাধ্যম</label>
                  <select
                    value={donMethod}
                    onChange={(e) => setDonMethod(e.target.value)}
                    className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-850 rounded-lg px-3 py-2 text-xs focus:outline-none"
                  >
                    {paymentMethods.map(m => <option key={m} value={m}>{m}</option>)}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1">ফান্ড বরাদ্দ প্রদানের উদ্দেশ্য</label>
                <input
                  type="text"
                  value={donPurpose}
                  onChange={(e) => setDonPurpose(e.target.value)}
                  className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-850 rounded-lg px-3 py-2 text-xs focus:outline-none"
                />
              </div>

              <div className="flex gap-2 justify-end pt-3 border-t border-slate-100 dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => setShowAddDonation(false)}
                  className="px-4 py-1.5 rounded bg-slate-100 hover:bg-slate-200 dark:bg-slate-855 text-xs font-semibold"
                >
                  {t('cancel')}
                </button>
                <button
                  type="submit"
                  className="px-5 py-1.5 rounded bg-gradient-to-r from-rose-500 to-pink-500 text-white text-xs font-bold shadow"
                >
                  {language === 'bn' ? 'অনুদান তালিকাভুক্ত করুন' : 'Record Donor Grant'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Certificate Viewer Popup */}
      {activeCertificate && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/65 backdrop-blur-sm p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 text-white max-w-lg w-full shadow-2xl relative text-center">
            <button onClick={() => setActiveCertificate(null)} className="absolute right-4 top-4 text-slate-500 hover:text-white">
              <X size={16} />
            </button>

            {/* Simulated certificate vector */}
            <div className="bg-amber-50 dark:bg-slate-950 border-4 border-double border-amber-500/50 rounded-2xl p-6 text-slate-900 dark:text-slate-150 shadow shadow-inner my-3 space-y-4 relative">
              <div className="absolute top-2 right-2 text-amber-500/20"><Award size={100} /></div>
              
              <div className="text-center font-serif">
                <p className="text-[10px] tracking-widest text-amber-500 font-bold uppercase uppercase">Certificate of Appreciation</p>
                <h3 className="font-bold text-lg text-amber-600 dark:text-amber-400 mt-1 uppercase">PARABAR FOUNDATION</h3>
              </div>

              <p className="text-xs italic leading-relaxed max-w-md mx-auto text-slate-500 mt-4">
                "Our heartfelt gratitude to <strong className="text-slate-800 dark:text-slate-200 not-italic">{activeCertificate.supporterName}</strong> for kind sponsorship grant contribution of <strong className="font-mono not-italic text-emerald-400">৳{activeCertificate.amount} BDT</strong> allocated towards <em>"{activeCertificate.purpose}"</em>. Handed on {activeCertificate.date}."
              </p>

              <div className="flex justify-between items-end border-t border-slate-800 pt-6 mt-6 text-[10px] text-slate-500 font-sans">
                <div>
                  <p className="font-bold font-mono">Ref: {activeCertificate.id.substring(0, 8)}</p>
                </div>
                <div className="text-right">
                  <p className="border-t border-slate-800 pt-1 font-semibold text-slate-800 dark:text-slate-350">Academy Chairman</p>
                </div>
              </div>
            </div>

            <button
              onClick={() => {
                alert(language === 'bn' ? 'সার্টিফিকেট স্ন্যাপশট আপনার গ্যালারিতে সংরক্ষিত হয়েছে!' : 'Patron Appreciation Certificate snap saved to memory!');
                setActiveCertificate(null);
              }}
              className="mt-4 w-full py-2 bg-gradient-to-r from-amber-500 to-yellow-600 hover:from-amber-400 hover:to-yellow-500 text-slate-950 font-black rounded-xl text-xs flex items-center justify-center gap-1.5 transition"
            >
              <Download size={15} />
              <span>{language === 'bn' ? 'সার্টিফিকেট ডাউনলোড' : 'Download Patron appreciation Certificate'}</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
