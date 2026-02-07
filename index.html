import React, { useState, useEffect, useRef } from 'react';
import { 
  ShieldCheck, 
  Search, 
  AlertTriangle, 
  CheckCircle2, 
  XCircle, 
  Scale, 
  BarChart3, 
  Info, 
  RefreshCw, 
  FileText, 
  Globe,
  TrendingUp,
  AlertCircle,
  WifiOff,
  ArrowRight,
  Key,
  Unlock,
  Link as LinkIcon,
  BookOpen,
  ExternalLink,
  Activity
} from 'lucide-react';

/**
 * API CONFIGURATION
 * The app will use the provided key or fallback to the user's custom key input.
 */
const defaultApiKey = "AIzaSyAedA3FWzNHgNh-P5aF8o0KJ3ciot0zlR4"; 
const MODEL_NAME = "gemini-2.5-flash-preview-09-2025";

/**
 * Visual background component
 */
const NewspaperBackground = () => (
  <div className="fixed inset-0 overflow-hidden pointer-events-none select-none z-0 opacity-[0.05]">
    <div className="absolute top-[-5%] left-[-2%] rotate-[-8deg] bg-[#fdfaf1] text-black p-12 max-w-sm font-serif shadow-2xl border-b-4 border-black">
      <h2 className="text-6xl font-black uppercase mb-2 tracking-tighter">The Daily News</h2>
      <div className="flex justify-between border-y border-black py-1 mb-4 text-[10px] font-bold">
        <span>VOL. CXIV... No. 38,492</span>
        <span>LATE EDITION</span>
      </div>
      <p className="text-sm leading-tight font-bold mb-2 italic">TRUTH IN THE AGE OF DISINFORMATION</p>
    </div>
  </div>
);

export default function App() {
  const [input, setInput] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [auditPhase, setAuditPhase] = useState('');
  const [searchStatus, setSearchStatus] = useState('active');
  const [customKey, setCustomKey] = useState('');
  const [showKeyInput, setShowKeyInput] = useState(false);

  // Load key from local storage if available
  useEffect(() => {
    const savedKey = localStorage.getItem('verifact_api_key');
    if (savedKey) setCustomKey(savedKey);
  }, []);

  const saveKey = (key) => {
    setCustomKey(key);
    localStorage.setItem('verifact_api_key', key);
    setSearchStatus('active');
  };

  const parseAIResponse = (rawText) => {
    try {
      if (!rawText) throw new Error("Empty response received.");
      let cleanText = rawText.replace(/```json/gi, '').replace(/```/gi, '').trim();
      const start = cleanText.indexOf('{');
      const end = cleanText.lastIndexOf('}');
      if (start === -1 || end === -1) throw new Error("No structured audit data found.");
      return JSON.parse(cleanText.substring(start, end + 1));
    } catch (e) {
      console.error("Parse Error:", rawText);
      throw new Error("Audit report was generated but is unreadable. Please retry.");
    }
  };

  const fetchWithRetry = async (payload, retries = 5, delay = 1000) => {
    const activeKey = customKey || defaultApiKey;
    
    if (!activeKey) {
        throw new Error("API Key Missing. Please enter a key in the top right menu.");
    }

    const url = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL_NAME}:generateContent?key=${activeKey}`;
    
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        if (response.status === 403 || response.status === 401) {
          return { error: 'AUTH_RESTRICTION', status: response.status };
        }
        if (retries > 0 && (response.status >= 500 || response.status === 429)) {
          await new Promise(resolve => setTimeout(resolve, delay + Math.random() * 500));
          return fetchWithRetry(payload, retries - 1, delay * 2);
        }
        throw new Error(`Audit Node Error (${response.status})`);
      }
      return await response.json();
    } catch (err) {
      if (retries > 0 && err.name !== 'TypeError') {
        await new Promise(resolve => setTimeout(resolve, delay));
        return fetchWithRetry(payload, retries - 1, delay * 2);
      }
      throw err;
    }
  };

  const performAudit = async () => {
    const trimmedInput = input.trim();
    if (!trimmedInput || trimmedInput.length < 3) {
      setError("Please enter a topic, question, or claim to verify.");
      return;
    }

    setIsAnalyzing(true);
    setError(null);
    setResult(null);
    setAuditPhase('Initializing Search Protocols...');

    const systemPrompt = `You are a non-partisan news auditor and fact-checker.
    
    Task: 
    1. Research the User's input using Google Search to find the latest, most reliable information.
    2. Synthesize a direct answer/verdict based on the search results.
    3. Audit the coverage for bias and framing.
    4. EXTRACT sources used to form the verdict.
    
    INSTRUCTIONS:
    - If the input is a question, answer it with evidence.
    - If the input is a claim, verify it (True/False/Context Missing).
    - If the input is a topic, summarize the current factual status.
    - "verifiable_score": Estimate (0-100) how much of this topic is backed by hard evidence/facts vs speculation/opinion.
    - "trust_score": Estimate (0-100) based on the credibility/reputation of the sources found (e.g., major wire services = high, random blogs = low).
    
    JSON SCHEMA:
    {
      "verdict": "string (e.g., 'True', 'False', 'Developing', 'Confirmed')",
      "reason": "string (A direct, clear answer to the user's input based on facts)",
      "confidence": number (0-100),
      "verifiable_score": number,
      "trust_score": number,
      "bias": { "label": "string", "explanation": "string (How is this topic generally framed by media?)" },
      "tactics": ["string (e.g., 'Sensationalism', 'Omission', 'Factual Reporting')"],
      "claims": [{ "claim": "string (Specific fact found)", "status": "string (Verified/Debunked)", "details": "string (Source context)" }],
      "sources": [{ "name": "string (Source Name)", "url": "string (Full URL if available from search)" }]
    }`;

    try {
      setAuditPhase('Scanning Global Media...');
      
      const primaryPayload = {
        contents: [{ parts: [{ text: `VERIFY THIS TOPIC/CLAIM: ${trimmedInput}` }] }],
        systemInstruction: { parts: [{ text: systemPrompt }] },
        tools: [{ "google_search": {} }],
        generationConfig: { responseMimeType: "application/json", temperature: 0.1 }
      };

      let data = await fetchWithRetry(primaryPayload);

      if (data.error === 'AUTH_RESTRICTION') {
        setSearchStatus('restricted');
        setAuditPhase('Search Blocked - Using Internal Knowledge...');
        setError("Live Search Blocked: Please add a valid API Key for live results. Proceeding with offline analysis.");
        
        const fallbackPayload = {
          contents: [{ parts: [{ text: `ANALYZE THIS TOPIC (No Live Search Available): ${trimmedInput}` }] }],
          systemInstruction: { parts: [{ text: systemPrompt }] },
          generationConfig: { responseMimeType: "application/json" }
        };
        
        data = await fetchWithRetry(fallbackPayload);
      } else {
        setSearchStatus('active');
      }

      const textResponse = data.candidates?.[0]?.content?.parts?.[0]?.text;
      setAuditPhase('Synthesizing Report...');
      setResult(parseAIResponse(textResponse));
    } catch (err) {
      setError(err.message || "Connection lost. Please check your network.");
    } finally {
      setIsAnalyzing(false);
      setAuditPhase('');
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] text-slate-100 font-sans selection:bg-blue-500/30 overflow-x-hidden relative pb-24">
      <NewspaperBackground />

      <nav className="sticky top-0 z-50 bg-[#050505]/80 backdrop-blur-2xl border-b border-white/5">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center shadow-[0_0_20px_rgba(37,99,235,0.4)]">
              <ShieldCheck className="text-white w-6 h-6" />
            </div>
            <span className="text-xl font-black tracking-tighter text-white uppercase italic">VeriFact</span>
          </div>
          
          <div className="flex items-center gap-4">
             {/* Key Input Toggle */}
             <div className="relative">
                <button 
                    onClick={() => setShowKeyInput(!showKeyInput)}
                    className="flex items-center gap-2 px-3 py-1.5 bg-white/5 hover:bg-white/10 rounded-lg transition-colors border border-white/10"
                >
                    {customKey ? <Unlock size={14} className="text-emerald-400"/> : <Key size={14} className="text-slate-400"/>}
                    <span className="text-[10px] font-bold uppercase tracking-widest text-slate-300">
                        {customKey ? 'Key Active' : 'Connect Key'}
                    </span>
                </button>
                
                {showKeyInput && (
                    <div className="absolute top-12 right-0 w-64 p-4 bg-slate-900 border border-white/10 rounded-xl shadow-2xl animate-in fade-in zoom-in-95 z-50">
                        <p className="text-[10px] text-slate-400 mb-2 uppercase tracking-wide font-bold">Paste Gemini API Key</p>
                        <input 
                            type="password" 
                            value={customKey}
                            onChange={(e) => saveKey(e.target.value)}
                            placeholder="AI Studio Key..."
                            className="w-full bg-black/50 border border-white/10 rounded-lg px-3 py-2 text-xs text-white mb-2 focus:border-blue-500 outline-none"
                        />
                        <div className="text-[9px] text-slate-500 leading-tight">
                            Needed for Live Search. Get one free at <a href="https://aistudio.google.com" target="_blank" className="text-blue-400 hover:underline">aistudio.google.com</a>
                        </div>
                    </div>
                )}
             </div>

            <div className={`flex items-center gap-2 px-3 py-1.5 bg-white/5 rounded-full border border-white/10 ${searchStatus === 'active' ? 'text-emerald-400' : 'text-amber-400'}`}>
              <div className={`w-1.5 h-1.5 rounded-full ${searchStatus === 'active' ? 'bg-emerald-500 animate-pulse' : 'bg-amber-500'}`}></div>
              <span className="text-[9px] font-black uppercase tracking-widest hidden md:inline">
                {searchStatus === 'active' ? 'Live Index' : 'Offline Mode'}
              </span>
            </div>
          </div>
        </div>
      </nav>

      <main className="relative z-10 max-w-4xl mx-auto px-6 py-12 md:py-20">
        <div className="text-center mb-16 space-y-6">
          <h1 className="text-6xl md:text-8xl font-black text-white tracking-tighter leading-[0.8] uppercase italic drop-shadow-2xl">
            Search & <br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-emerald-400 to-blue-500 underline decoration-blue-500/30">Verify.</span>
          </h1>
          <p className="text-lg text-slate-400 max-w-xl mx-auto font-medium leading-relaxed">
            Enter a rumor, question, or news topic. We'll search the truth and audit the bias.
          </p>
        </div>

        {/* Input Card */}
        <div className="bg-slate-900/40 backdrop-blur-3xl rounded-[2.5rem] border border-white/5 shadow-2xl p-2 mb-16 focus-within:border-blue-500/40 transition-all">
          <div className="p-4">
            <div className="relative">
              <Search className="absolute top-6 left-6 text-slate-500 w-6 h-6" />
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if(e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    performAudit();
                  }
                }}
                placeholder="Ask a question or enter a topic (e.g., 'Is the cafe virus real?', 'Election results')..."
                className="w-full h-32 py-6 pl-16 pr-8 bg-transparent border-none rounded-[2rem] focus:ring-0 resize-none text-slate-200 placeholder:text-slate-600 font-medium text-xl leading-relaxed"
              />
            </div>
            
            <div className="mt-4 flex flex-col md:flex-row items-center justify-between gap-4 px-2 pb-2">
              <div className="flex gap-4 opacity-40 px-4">
                <Globe size={16} />
                <span className="text-xs font-bold uppercase tracking-widest">Searching Global Sources</span>
              </div>

              <button
                onClick={performAudit}
                disabled={isAnalyzing || !input.trim()}
                className={`w-full md:w-auto px-10 py-4 rounded-xl font-black uppercase tracking-[0.2em] text-xs transition-all flex items-center justify-center gap-3 ${
                  isAnalyzing 
                    ? 'bg-slate-800 text-slate-500 cursor-not-allowed' 
                    : 'bg-white text-black hover:bg-blue-600 hover:text-white shadow-xl active:scale-95'
                }`}
              >
                {isAnalyzing ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>{auditPhase}</span>
                  </>
                ) : (
                  <>
                    <span>Verify Now</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Error State */}
        {error && (
          <div className="bg-rose-500/10 border border-rose-500/20 text-rose-400 p-8 rounded-[2rem] flex items-start gap-6 mb-12 animate-in fade-in zoom-in">
            <WifiOff className="w-8 h-8 flex-shrink-0" />
            <div>
              <p className="font-black uppercase tracking-[0.2em] text-[10px] opacity-60 mb-1">Search Issue</p>
              <p className="text-sm font-semibold leading-relaxed">{error}</p>
            </div>
          </div>
        )}

        {/* Results */}
        {result && (
          <div className="space-y-12 animate-in fade-in slide-in-from-bottom-8 duration-700">
            {/* Verdict */}
            <div className={`p-10 rounded-[3rem] border-2 flex flex-col md:flex-row md:items-center justify-between gap-10 shadow-2xl backdrop-blur-xl ${
              result.verdict.toLowerCase().includes('true') || result.verdict.toLowerCase().includes('confirmed') ? 'bg-emerald-500/5 border-emerald-500/20' :
              result.verdict.toLowerCase().includes('false') || result.verdict.toLowerCase().includes('debunked') ? 'bg-rose-500/5 border-rose-500/20' :
              'bg-amber-500/5 border-amber-500/20'
            }`}>
              <div className="flex items-center gap-10">
                <div className={`w-24 h-24 rounded-[2rem] flex items-center justify-center shadow-2xl transform rotate-[-5deg] ${
                  result.verdict.toLowerCase().includes('true') || result.verdict.toLowerCase().includes('confirmed') ? 'bg-emerald-500' : 
                  result.verdict.toLowerCase().includes('false') || result.verdict.toLowerCase().includes('debunked') ? 'bg-rose-500' : 
                  'bg-amber-500'
                }`}>
                  {result.verdict.toLowerCase().includes('true') || result.verdict.toLowerCase().includes('confirmed') ? <CheckCircle2 size={48} className="text-white" /> : 
                   result.verdict.toLowerCase().includes('false') || result.verdict.toLowerCase().includes('debunked') ? <XCircle size={48} className="text-white" /> : 
                   <AlertTriangle size={48} className="text-white" />}
                </div>
                <div>
                  <div className="text-[10px] font-black uppercase tracking-[0.3em] opacity-40 mb-2">Search Verdict</div>
                  <h3 className="text-5xl font-black uppercase tracking-tighter italic leading-none mb-3">
                    {result.verdict}
                  </h3>
                  <p className="text-slate-400 font-medium text-lg leading-snug">{result.reason}</p>
                </div>
              </div>
              
              <div className="bg-black/50 p-8 rounded-[2.5rem] border border-white/5 min-w-[200px] flex flex-col justify-center">
                 <div className="flex items-center gap-2 mb-4 opacity-50">
                    <Activity size={14} />
                    <span className="text-[9px] font-black uppercase tracking-widest">Vital Signs</span>
                 </div>
                 
                 <div className="mb-4">
                    <div className="flex justify-between items-end mb-1">
                        <span className="text-[10px] uppercase font-bold text-slate-400">Verifiable Info</span>
                        <span className={`text-xl font-black ${result.verifiable_score > 70 ? 'text-emerald-400' : 'text-amber-400'}`}>
                            {result.verifiable_score || 0}%
                        </span>
                    </div>
                    <div className="h-1 bg-white/10 rounded-full overflow-hidden">
                        <div className="h-full bg-current transition-all duration-1000" style={{ width: `${result.verifiable_score || 0}%`, color: result.verifiable_score > 70 ? '#34d399' : '#fbbf24' }}></div>
                    </div>
                 </div>

                 <div>
                    <div className="flex justify-between items-end mb-1">
                        <span className="text-[10px] uppercase font-bold text-slate-400">Source Trust</span>
                        <span className={`text-xl font-black ${result.trust_score > 70 ? 'text-blue-400' : 'text-rose-400'}`}>
                            {result.trust_score || 0}%
                        </span>
                    </div>
                    <div className="h-1 bg-white/10 rounded-full overflow-hidden">
                        <div className="h-full bg-current transition-all duration-1000" style={{ width: `${result.trust_score || 0}%`, color: result.trust_score > 70 ? '#60a5fa' : '#fb7185' }}></div>
                    </div>
                 </div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-10">
              {/* Bias */}
              <div className="bg-slate-900/40 p-10 rounded-[2.5rem] border border-white/5 backdrop-blur-md">
                <div className="flex items-center gap-3 mb-8">
                  <Scale size={20} className="text-blue-400" />
                  <h4 className="font-black uppercase tracking-[0.3em] text-[10px] text-slate-400">Media Framing</h4>
                </div>
                <p className="p-6 bg-black/40 rounded-2xl italic text-sm text-slate-300 font-serif leading-relaxed">
                  "{result.bias.explanation}"
                </p>
              </div>

              {/* Tactics */}
              <div className="bg-slate-900/40 p-10 rounded-[2.5rem] border border-white/5 backdrop-blur-md">
                <div className="flex items-center gap-3 mb-8">
                  <BarChart3 size={20} className="text-orange-400" />
                  <h4 className="font-black uppercase tracking-[0.3em] text-[10px] text-slate-400">Narrative Tactics</h4>
                </div>
                <div className="flex flex-wrap gap-2">
                  {result.tactics.map((t, i) => (
                    <span key={i} className="px-4 py-2 bg-white/5 text-white border border-white/10 rounded-xl text-[10px] font-black uppercase tracking-widest">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Claim Ledger */}
            <div className="bg-slate-900/40 rounded-[3rem] border border-white/5 overflow-hidden">
              <div className="p-8 border-b border-white/5 bg-white/[0.02] flex justify-between items-center">
                <h4 className="font-black uppercase tracking-[0.3em] text-[10px]">Fact Log</h4>
                <div className="text-[9px] font-black px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20">
                  {searchStatus === 'active' ? 'Live Grounding' : 'Offline Analysis'}
                </div>
              </div>
              <div className="divide-y divide-white/5">
                {result.claims.map((item, i) => (
                  <div key={i} className="p-10 hover:bg-white/[0.01] transition-colors">
                    <div className="flex flex-col md:flex-row justify-between gap-6 mb-4">
                      <p className="text-2xl font-black text-white leading-tight">"{item.claim}"</p>
                      <span className={`flex-shrink-0 px-5 py-2 rounded-full text-[10px] font-black uppercase tracking-widest border ${
                        item.status.toLowerCase().includes('verified') ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' :
                        item.status.toLowerCase().includes('debunked') || item.status.toLowerCase().includes('false') ? 'bg-rose-500/10 text-rose-400 border-rose-500/20' :
                        'bg-amber-500/10 text-amber-400 border-amber-500/20'
                      }`}>
                        {item.status}
                      </span>
                    </div>
                    <p className="text-slate-400 text-sm leading-relaxed">{item.details}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Source Dossier - UPDATED */}
            {result.sources && result.sources.length > 0 && (
              <div className="bg-slate-900/40 rounded-[3rem] border border-white/5 overflow-hidden">
                <div className="p-8 border-b border-white/5 bg-white/[0.02] flex items-center gap-3">
                  <BookOpen size={16} className="text-blue-400" />
                  <h4 className="font-black uppercase tracking-[0.3em] text-[10px]">Source Dossier</h4>
                </div>
                <div className="p-8 grid md:grid-cols-2 gap-4">
                  {result.sources.map((source, i) => {
                    const hasUrl = source.url && source.url.startsWith('http');
                    const Component = hasUrl ? 'a' : 'div';
                    return (
                      <Component
                        key={i} 
                        href={hasUrl ? source.url : undefined}
                        target={hasUrl ? "_blank" : undefined}
                        rel={hasUrl ? "noopener noreferrer" : undefined}
                        className={`group flex items-center justify-between p-4 bg-white/5 rounded-2xl border border-transparent transition-all ${hasUrl ? 'hover:bg-blue-600/10 hover:border-blue-500/30 cursor-pointer' : 'opacity-70 cursor-default'}`}
                      >
                        <div className="flex items-center gap-3">
                          <LinkIcon size={14} className={`text-slate-500 ${hasUrl ? 'group-hover:text-blue-400' : ''}`} />
                          <span className={`text-sm font-bold text-slate-300 truncate max-w-[200px] ${hasUrl ? 'group-hover:text-white' : ''}`}>
                            {source.name}
                          </span>
                        </div>
                        {hasUrl ? (
                          <ExternalLink size={14} className="text-slate-600 group-hover:text-blue-400 transform group-hover:translate-x-1 transition-transform" />
                        ) : (
                          <span className="text-[9px] uppercase font-black text-slate-600">Source</span>
                        )}
                      </Component>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        )}
      </main>

      <footer className="mt-40 py-20 border-t border-white/5 text-center">
        <p className="text-[10px] font-black uppercase tracking-[0.5em] text-slate-600">
          VeriFact Engine // Live Search Protocol
        </p>
      </footer>
    </div>
  );
}
