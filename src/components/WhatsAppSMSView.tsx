import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Send, Users, CheckCircle, Smartphone, AlertTriangle, 
  MessageSquare, RefreshCw, Smartphone as PhoneIcon
} from 'lucide-react';

export const WhatsAppSMSView: React.FC = () => {
  const { 
    artists, payments, language, t, logAction 
  } = useApp();

  const [selectedTemplate, setSelectedTemplate] = useState<'confirm' | 'due' | 'custom'>('confirm');
  const [selectedArtistId, setSelectedArtistId] = useState('');
  const [customMsgText, setCustomMsgText] = useState('');
  
  // Simulation statuses
  const [sendingStatus, setSendingStatus] = useState<'idle' | 'sending' | 'success'>('idle');
  const [logs, setLogs] = useState<string[]>([
    'WhatsApp Gateway status: CONNECTED (API v4)',
    'Automatic message template queue ready.'
  ]);

  const handleSelectArtist = (id: string) => {
    setSelectedArtistId(id);
    const artist = artists.find(a => a.id === id);
    if (!artist) return;

    if (selectedTemplate === 'confirm') {
      const artPay = payments.find(p => p.artistId === id && p.status === 'Paid');
      const amount = artPay ? artPay.amount : 1000;
      const receipt = artPay ? artPay.receiptNo : 'REC-2026-###';
      
      setCustomMsgText(
        language === 'bn'
          ? `প্রিয় ${artist.name}, আপনার ৳${amount} পেমেন্ট সফলভাবে এন্ট্রি করা হয়েছে। রশিদ নম্বর: ${receipt}। ধন্যবাদান্তে, পারাবার একাডেমি।`
          : `Dear ${artist.nameEn}, your payment of ৳${amount} has been received. Receipt No: ${receipt}. Thank you. - Parabar Academy`
      );
    } else if (selectedTemplate === 'due') {
      const duePay = payments.find(p => p.artistId === id && p.status === 'Due');
      const amount = duePay ? duePay.amount : 1000;
      
      setCustomMsgText(
        language === 'bn'
          ? `প্রিয় ${artist.name}, পারাবার কালচারাল একাডেমিতে আপনার জুন ২০২৬ সেশনের মাসিক ফি ৳${amount} বকেয়া রয়েছে। অনুগ্রহ করে দ্রুত পরিশোধ করুন।`
          : `Dear ${artist.nameEn}, your June monthly tuition fee of ৳${amount} BDT is due. Please pay as soon as possible. Thank you. - Parabar`
      );
    }
  };

  const handleTemplateChange = (tmpl: 'confirm' | 'due' | 'custom') => {
    setSelectedTemplate(tmpl);
    if (tmpl === 'custom') {
      setCustomMsgText(
        language === 'bn'
          ? 'জানানো যাচ্ছে যে, আগামী শুক্রবার একাডেমির বার্ষিক চিত্রাঙ্কন উৎসব অনুষ্ঠিত হতে চলেছে। সকল শিল্পীর উপস্থিতি কাম্য।'
          : 'Dear Artists, we are excited to announce our Annual Painting Festival scheduled for upcoming Friday! See details at office.'
      );
    } else if (selectedArtistId) {
      // Refresh current values on variables
      setTimeout(() => {
        handleSelectArtist(selectedArtistId);
      }, 50);
    }
  };

  const handleSendMessage = () => {
    if (!customMsgText.trim()) {
      alert(language === 'bn' ? 'দয়া করে বার্তার মূল অংশ পূরণ করুন।' : 'Message text cannot be empty');
      return;
    }

    setSendingStatus('sending');
    const recipientName = artists.find(a => a.id === selectedArtistId)?.nameEn || 'Broadcast Group';
    const recipientPhone = artists.find(a => a.id === selectedArtistId)?.mobile || '+8801XXXXX';

    setLogs(prev => [
      ...prev,
      `[${new Date().toLocaleTimeString()}] Queueing broadcast packet to ${recipientPhone}`,
      `[${new Date().toLocaleTimeString()}] Standard API dispatching packet formatting...`
    ]);

    setTimeout(() => {
      setSendingStatus('success');
      setLogs(prev => [
        ...prev,
        `[${new Date().toLocaleTimeString()}] SUCCESS: Message delivered successfully to [${recipientPhone}] (${recipientName})`
      ]);
      logAction('WhatsApp Blast', `Dispatched API web hook message to ${recipientName}: "${customMsgText.substring(0, 30)}..."`);
    }, 1800);
  };

  const handleBulkSMS = () => {
    const activeTargets = artists.filter(a => a.status === 'Active');
    
    setSendingStatus('sending');
    setLogs(prev => [
      ...prev,
      `[${new Date().toLocaleTimeString()}] Initiating bulk pipeline transmission to ${activeTargets.length} active artists...`
    ]);

    activeTargets.forEach((art, index) => {
      setTimeout(() => {
        setLogs(prev => [
          ...prev,
          `[${new Date().toLocaleTimeString()}] [${index + 1}/${activeTargets.length}] Dispatched success to matching mobile ${art.mobile} (${art.nameEn})`
        ]);
        
        if (index === activeTargets.length - 1) {
          setSendingStatus('success');
          logAction('Bulk WhatsApp Blast', `Automated bulk broadcast complete to ${activeTargets.length} active registers`);
        }
      }, 600 * (index + 1));
    });
  };

  return (
    <div className="space-y-6">
      {/* Module Title */}
      <div>
        <h2 className="font-sans font-bold text-xl text-slate-900 dark:text-slate-100 flex items-center gap-2">
          <Send className="text-sky-400" />
          {t('whatsappAutomation')}
        </h2>
        <p className="text-xs text-slate-500 tracking-wide">
          {language === 'bn' 
            ? 'পেমেন্ট রশিদ, ফি রিমাইন্ডার এবং ছুটির নোটিশ মোবাইল হোয়াটসঅ্যাপ বা এসএমএস এর মাধ্যমে প্রেরণ করুন।' 
            : 'Configure instant payment confirmation alerts or schedule batch alert queues to student mobiles.'}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Controls block */}
        <div className="lg:col-span-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-5 rounded-2xl shadow-lg space-y-5">
          <h3 className="font-sans font-bold text-sm border-b border-light-divider dark:border-slate-800 pb-3">
            {language === 'bn' ? 'বার্তা কম্পোজার ও টেমপ্লেট' : 'Compose Message Panel'}
          </h3>

          {/* Template Choice buttons */}
          <div className="space-y-2">
            <label className="block text-xs font-semibold text-slate-400 tracking-wider font-mono uppercase">
              {t('selectTemplate')}
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              <button
                onClick={() => handleTemplateChange('confirm')}
                className={`py-2 px-3 text-xs font-bold rounded-lg border text-center transition ${
                  selectedTemplate === 'confirm' 
                    ? 'bg-sky-500 text-slate-950 border-sky-400' 
                    : 'bg-slate-50 dark:bg-slate-950/40 border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-900'
                }`}
              >
                {t('payConfirmTemplate')}
              </button>
              <button
                onClick={() => handleTemplateChange('due')}
                className={`py-2 px-3 text-xs font-bold rounded-lg border text-center transition ${
                  selectedTemplate === 'due' 
                    ? 'bg-indigo-600 text-white border-indigo-500' 
                    : 'bg-slate-50 dark:bg-slate-950/40 border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-900'
                }`}
              >
                {t('dueReminderTemplate')}
              </button>
              <button
                onClick={() => handleTemplateChange('custom')}
                className={`py-2 px-3 text-xs font-bold rounded-lg border text-center transition ${
                  selectedTemplate === 'custom' 
                    ? 'bg-emerald-500 text-slate-950 border-emerald-400' 
                    : 'bg-slate-50 dark:bg-slate-950/40 border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-900'
                }`}
              >
                {t('customMessage')}
              </button>
            </div>
          </div>

          {/* Targeted Profile details selection (only if not custom general announcements) */}
          {selectedTemplate !== 'custom' && (
            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1">{t('selectArtist')} *</label>
              <select
                value={selectedArtistId}
                onChange={(e) => handleSelectArtist(e.target.value)}
                className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-850 rounded-lg px-3 py-2 text-xs text-slate-800 dark:text-slate-200 focus:outline-none"
              >
                <option value="">-- {language === 'bn' ? 'নির্বাচন করুন' : 'Choose Recipient'} --</option>
                {artists.map(art => (
                  <option key={art.id} value={art.id}>{art.name} ({art.id} - {art.mobile})</option>
                ))}
              </select>
            </div>
          )}

          {/* Custom Message input block */}
          <div>
            <label className="block text-xs font-semibold text-slate-400 mb-1">
              {language === 'bn' ? 'বার্তার টেক্সট' : 'Automated SMS Body'}
            </label>
            <textarea
              rows={4}
              value={customMsgText}
              onChange={(e) => setCustomMsgText(e.target.value)}
              className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg p-3 text-xs text-slate-800 dark:text-slate-200 focus:outline-none font-sans leading-relaxed"
            ></textarea>
          </div>

          {/* Senders control buttons */}
          <div className="flex gap-3 pt-3 border-t border-slate-100 dark:border-slate-850">
            {/* Bulk blaster */}
            <button
              onClick={handleBulkSMS}
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-lg text-xs transition"
              title="Broadcast alert to all Active enrolled registry artists"
            >
              {t('bulkSend')} ({artists.filter(a => a.status === 'Active').length} {language === 'bn' ? 'জন সক্রিয়' : 'Active'})
            </button>

            {/* Single direct transmitter */}
            <button
              id="send-single-sms-btn"
              onClick={handleSendMessage}
              disabled={sendingStatus === 'sending'}
              className="ml-auto flex items-center gap-1.5 px-5 py-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold rounded-lg text-xs tracking-wide shadow-md transition disabled:opacity-50"
            >
              <Send size={14} />
              <span>
                {sendingStatus === 'sending' 
                  ? (language === 'bn' ? 'বার্তা যাচ্ছে...' : 'Dispatched...') 
                  : t('send')
                }
              </span>
            </button>
          </div>
        </div>

        {/* Mock Live Phone Layout Preview column */}
        <div className="flex flex-col space-y-6">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-3 shadow-2xl relative max-w-[280px] mx-auto w-full aspect-[9/16] flex flex-col justify-between text-white overflow-hidden">
            {/* Phone Speaker & Camera notches */}
            <div className="mx-auto bg-slate-950 w-24 h-4 rounded-full mt-1 mb-2 absolute top-2 left-1/2 -translate-x-1/2 flex items-center justify-center">
              <span className="w-1.5 h-1.5 rounded-full bg-slate-850"></span>
            </div>

            {/* Inner Phone Layout */}
            <div className="bg-[#0b141a] grow rounded-2xl flex flex-col justify-between overflow-hidden relative pt-6 text-[11px] h-full">
              {/* WhatsApp chat top navbar */}
              <div className="bg-[#1f2c34] px-2 py-1.5 flex items-center gap-2 border-b border-[#0b141a] shrink-0">
                <div className="bg-slate-500 rounded-full w-5 h-5 flex items-center justify-center text-[10px] text-white">
                  P
                </div>
                <div>
                  <p className="font-bold">Parabar Academy</p>
                  <p className="text-[8px] text-emerald-400">online</p>
                </div>
              </div>

              {/* Chat timeline window */}
              <div className="grow p-3 space-y-3 overflow-y-auto flex flex-col justify-end custom-scrollbar bg-[url('https://user-images.githubusercontent.com/15075759/28719144-86dc0f70-73b1-11e7-911d-60d70fcded21.png')] bg-cover">
                {/* Simulated template bubbles sent */}
                <div className="bg-[#005c4b] text-slate-100 rounded-lg rounded-tr-none p-2.5 max-w-[85%] self-end shadow break-words leading-relaxed text-[10px]">
                  {customMsgText || (language === 'bn' ? 'বার্তা প্রাকদর্শন এখানে দেখা যাবে...' : 'Sms preview values will render in this dialogue card...')}
                  <div className="text-right text-[7px] text-slate-300 mt-1">
                    {new Date().toLocaleTimeString().substring(0, 5)} PM ✓✓
                  </div>
                </div>
              </div>

              {/* Chat action bar */}
              <div className="bg-[#1f2c34] p-1 px-2 flex items-center gap-2 shrink-0">
                <input 
                  type="text" 
                  disabled 
                  placeholder="Type a message" 
                  className="bg-[#2a3942] border-none text-[9px] rounded-full px-3 py-1 grow text-slate-300 focus:outline-none" 
                />
                <button className="bg-[#00a884] p-1.5 rounded-full text-slate-950">
                  <Send size={10} />
                </button>
              </div>
            </div>
          </div>

          {/* API Gateway log streams */}
          <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 font-mono text-[9px] text-slate-450 h-[100px] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-800 pb-1.5 mb-2 uppercase text-slate-500 font-bold tracking-wider">
              <span>Delivery Status Logs</span>
              <button 
                onClick={() => setLogs(['Automatic template queue restarted.'])}
                className="hover:text-white"
              >
                <RefreshCw size={10} />
              </button>
            </div>
            {logs.map((log, idx) => (
              <div key={idx} className="mb-1 leading-normal text-slate-300">
                {log}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
