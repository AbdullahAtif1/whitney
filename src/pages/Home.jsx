import { useState } from 'react';
import { ShieldCheck, MapPin, FileText, PhoneCall, Zap, Box, Navigation, Scale, Maximize, Gauge, ChevronRight, Lock, Download, X, CheckCircle, Star, Clock, Activity, Truck, AlertCircle } from 'lucide-react';
// import redTruckImg from '../assets/imgs/Gemini_Generated_Image_g8cjsog8cjsog8cj.webp';
import driverImg from '../assets/imgs/female.webp';
// Authentic Asset Imports
import heroTruck from '../assets/imgs/Gemini_Generated_Image_g8cjsog8cjsog8cj.webp'; // Black truck side profile
import operatorJules from '../assets/imgs/image8.webp';
import truckRear from '../assets/imgs/unnamed.jpg'; // Rear view with liftgate
import truckFront from '../assets/imgs/image4.webp'; // Side view with decals
import safetyVest from '../assets/imgs/image9.webp'; // PPE closeup
import strapsBuckets from '../assets/imgs/image6.webp'; // Securement straps


const Home = () => {
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [accessCode, setAccessCode] = useState('');
  const [error, setError] = useState('');

  // FMCSA & User Data Constants
  const PHONE = "(303) 356-6325";
  const EMAIL = "MOTAYLORTRANSPORTLLC@GMAIL.COM";
  const MC_NUMBER = "1739553";
  const DOT_NUMBER = "4274180";
  const HOME_BASE = "12404 DRIFTSTONE WAY RIVERVIEW, FL 33569";

  const handleDownload = (docName) => {
    if (!isUnlocked) {
      setShowModal(true);
      return;
    }

    // Mapping to the specific filenames in your /public/docs/ folder
    const docMap = {
      'W-9 Form': '/docs/w9.png',
      'MC Authority': '/docs/mc.jpg', 
      'Insurance Cert': '/docs/insurance.jpg'
    };

    const filePath = docMap[docName];

    // Using Blob fetch to ensure local browser support for .jpg downloads
    fetch(filePath)
      .then(response => {
        if (!response.ok) throw new Error('File not found');
        return response.blob();
      })
      .then(blob => {
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', `${docName.replace(/\s+/g, '_')}_WT.jpg`);
        document.body.appendChild(link);
        link.click();
        link.parentNode.removeChild(link);
        window.URL.revokeObjectURL(url);
      })
      .catch(() => alert("Error: Ensure files are in public/docs/ with the exact names shown in your folder."));
  };

  const handleUnlock = (e) => {
    e.preventDefault();
    if (accessCode.toUpperCase() === 'WT2026') {
      setIsUnlocked(true); 
      setShowModal(false); 
      setError('');
    } else { 
      setError('Invalid Code. Try "WT2026"'); 
    }
  };

  const getMailtoLink = () => {
    if (!quoteOrigin || !quoteDest) return '#';

    const subject = encodeURIComponent(
      `Quote Request: ${quoteOrigin} to ${quoteDest} - MO' TAYLOR TRANSPORT LLC`
    );

    const body = encodeURIComponent(
      `Hi WHITNEY,\n\nI am reaching out to request a quote for a load moving from ${quoteOrigin} to ${quoteDest}.\n\nEquipment Required: 26ft Box Truck\nCarrier: MO' TAYLOR TRANSPORT LLC (MC# ${MC_NUMBER})\n\nPlease let me know your availability and rate for this lane.\n\nBest regards,`
    );

    return `mailto:${EMAIL}?subject=${subject}&body=${body}`;
  };


  const [quoteOrigin, setQuoteOrigin] = useState('');
  const [quoteDest, setQuoteDest] = useState('');

  const handleQuoteRequest = (e) => {
    // Note: This must be triggered by a <button type="submit"> within a <form onSubmit={handleQuoteRequest}>
    if (e && e.preventDefault) e.preventDefault();
    
    if (!quoteOrigin || !quoteDest) {
      alert("Please select both an Origin and a Destination.");
      return;
    }

    const subject = encodeURIComponent(`Quote Request: ${quoteOrigin} to ${quoteDest} - MO' TAYLOR TRANSPORT LLC`);
    const body = encodeURIComponent(
      `Hi WHITNEY,\n\nI am reaching out to request a quote for a load moving from ${quoteOrigin} to ${quoteDest}.\n\nEquipment Required: 26ft Box Truck\nCarrier: MO' TAYLOR TRANSPORT LLC (MC# ${MC_NUMBER})\n\nPlease let me know your availability and rate for this lane.\n\nBest regards,`
    );

    window.location.href = `mailto:${EMAIL}?subject=${subject}&body=${body}`;
  };

  return (
    <div id="home" className="pt-32 font-sans text-gray-900 bg-gray-50 overflow-x-hidden">
      
      {/* 1. HERO SECTION */}
      <section className="relative w-full pb-20 px-4">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          <div className="space-y-6 animate-fade-in-up z-20">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white rounded-tl-xl rounded-br-xl border-l-4 border-red-600 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
              <span className="text-xs font-bold tracking-widest uppercase text-gray-500">Active Authority • DOT# {DOT_NUMBER}</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-black leading-none tracking-tight text-gray-900">
              <span className="text-gradient bg-clip-text text-transparent bg-gradient-to-r from-red-600 to-red-400">MO' TAYLOR</span><br /> TRANSPORT LLC
            </h1>
            
            <p className="text-xl text-gray-600 max-w-lg leading-relaxed">
              <strong>FLORIDA ↔ SOUTHEAST Specialist.</strong> <br/>
              Owner-Operator run. No dispatch middlemen. Just direct, reliable communication and a 26' Box Truck ready to roll.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <a href={`tel:${PHONE.replace(/\D/g,'')}`} className="clip-trap flex uppercase items-center justify-center gap-2 bg-red-600 text-white px-8 py-4 font-black text-lg hover-lift shadow-red-500/30 shadow-lg">
                <PhoneCall size={20} />
                CALL WHITNEY
              </a>
              <a href="#documents" className="clip-trap flex items-center justify-center gap-2 bg-white text-gray-900 border border-gray-300 px-8 py-4 font-bold text-lg hover:bg-gray-900 hover:text-white transition-colors shadow-sm">
                BROKER PACKET
              </a>
            </div>
          </div>

          {/* HERO IMAGE - Now visible on mobile with smooth transition */}
          <div className="relative w-full h-full animate-fade-in-up" style={{animationDelay: '0.2s'}}>
            <div className="clip-trap relative z-10 bg-gray-800 aspect-[4/5] shadow-2xl group overflow-hidden">
              <img 
                src={heroTruck} 
                alt="WHITNEY Trucking LLC 26ft International Box Truck" 
                className="w-full h-full object-cover opacity-95 group-hover:opacity-100 transition-all duration-700 ease-in-out transform group-hover:scale-110"
              />
              <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/90 to-transparent p-6 md:p-8">
                  <p className="text-white font-black text-xl md:text-2xl uppercase">26k Non-CDL</p>
                  <p className="text-red-500 font-bold text-sm md:text-base">General Freight & LTL Ready</p>
              </div>
            </div>
            {/* Decoration Border */}
            <div className="clip-trap absolute -z-10 top-6 -right-6 w-full h-full border-2 border-red-600 opacity-30 hidden md:block"></div>
          </div>

        </div>
      </section>

      {/* 2. AUTHORITY STRIP */}
      <section id="authority" className="bg-white border-y border-gray-200 py-10 shadow-sm relative z-10">
        <div className="max-w-7xl mx-auto px-4 flex flex-wrap justify-center md:justify-between items-center gap-8 text-center md:text-left">
          <div className="flex flex-col group cursor-default">
            <span className="text-xs font-bold text-gray-400 uppercase tracking-widest group-hover:text-red-500 transition-colors">Motor Carrier</span>
            <span className="text-3xl font-black font-mono text-gray-900">MC# {MC_NUMBER}</span>
          </div>
          <div className="h-10 w-px bg-gray-200 hidden md:block"></div>
          <div className="flex flex-col group cursor-default">
            <span className="text-xs font-bold text-gray-400 uppercase tracking-wUFCidest group-hover:text-red-500 transition-colors">US DOT</span>
            <span className="text-3xl font-black font-mono text-gray-900">#{DOT_NUMBER}</span>
          </div>
          <div className="h-10 w-px bg-gray-200 hidden md:block"></div>
          <div className="flex items-center gap-3 bg-gray-50 px-6 py-3 clip-trap border border-gray-200 hover:border-red-500 transition-colors">
            <ShieldCheck className="text-red-600" size={32} />
            <div className="flex flex-col text-left">
              <span className="text-sm font-bold text-gray-900">Active Insurance</span>
              <span className="text-xs font-bold text-green-600 uppercase">Motive ELD Compliant</span>
            </div>
          </div>
        </div>
      </section>

      {/* 3. MEET THE OPERATOR */}
      <section className="py-24 bg-gray-50 relative overflow-hidden">
        {/* Background decorative element */}
        <div className="absolute top-0 right-0 w-1/3 h-full bg-gray-100 skew-x-12 opacity-50"></div>

        <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-16 items-center relative z-10">
           {/* Image Side */}
            <div className="relative group hover-lift">
              <div className="clip-trap absolute -inset-4 bg-red-600 opacity-20 group-hover:rotate-1 transition-transform duration-500"></div>
              <img 
                src={driverImg} 
                alt="WHITNEY TAYLOR - Owner Operator" 
                className="clip-trap relative shadow-2xl w-full object-cover aspect-[4/5] transition-all duration-500"
              />
              <div className="absolute bottom-6 left-6 bg-black/80 backdrop-blur-md px-6 py-4 border-l-4 border-red-600 shadow-lg">
                <p className="font-black text-xl uppercase text-white">WHITNEY TAYLOR</p>
                <p className="text-sm text-gray-400 font-bold">Owner & Lead Operator</p>
              </div>
            </div>

          <div className="space-y-6">
              <h2 className="text-4xl font-black uppercase text-gray-900">
                Direct Contact. <br /><span className="text-red-600">No Middlemen.</span>
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed border-l-4 border-red-200 pl-4">
                "I operate under my own authority to kill the anxiety brokers feel when they hang up the phone. When you book MO' TAYLOR TRANSPORT LLC, you aren't talking to a dispatcher—you're talking to the driver. 
                <br/><br/>
                I make the decisions, I drive the truck, and I guarantee your customer's cargo is treated like my own."
              </p>
              
              <div className="grid grid-cols-2 gap-4 pt-4">
                 <div className="p-4 bg-white clip-trap border border-gray-200 shadow-sm group hover:border-red-500 transition-colors">
                    <Truck className="text-red-600 mb-2 group-hover:scale-110 transition-transform" />
                    <div className="font-bold text-xl">Owner Op</div>
                    <div className="text-xs opacity-60 uppercase">Direct Oversight</div>
                 </div>
                 <div className="p-4 bg-white clip-trap border border-gray-200 shadow-sm group hover:border-red-500 transition-colors">
                    <Activity className="text-red-600 mb-2 group-hover:scale-110 transition-transform" />
                    <div className="font-bold text-xl">Verified</div>
                    <div className="text-xs opacity-60 uppercase">Drug & Alcohol Consortium</div>
                 </div>
              </div>
           </div>
        </div>
      </section>

      {/* 4. SAFETY & COMPLIANCE BENTO */}
      <section id="safety" className="py-24 bg-gray-900 text-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4">
          
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6">
            <div className="space-y-2">
              <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter">
                Safety & <span className="text-red-600">Compliance</span>
              </h2>
              <p className="text-gray-400 font-bold uppercase tracking-widest text-sm">
                Zero-Damage Delivery • Full PPE Standards
              </p>
            </div>
            <div className="hidden md:flex gap-4">
               <div className="flex items-center gap-2 px-4 py-2 bg-gray-800 border-l-2 border-red-600">
                 <ShieldCheck className="text-red-600" size={20} />
                 <span className="text-xs font-black uppercase tracking-widest">OSHA Ready</span>
               </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 auto-rows-[300px]">
            
            {/* BIG BLOCK: PPE Compliance */}
            <div className="md:col-span-2 md:row-span-2 relative group overflow-hidden clip-trap">
              <img 
                src={operatorJules} 
                alt="WHITNEY TAYLOR PPE" 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent p-8 flex flex-col justify-end">
                <div className="flex items-center gap-2 mb-2">
                   <span className="h-px w-8 bg-red-600"></span>
                   <span className="text-red-500 font-black text-xs uppercase tracking-widest">Operator Safety</span>
                </div>
                <h3 className="text-3xl font-black uppercase leading-none">Full PPE<br/>Compliance</h3>
                <p className="text-gray-400 mt-4 text-sm leading-relaxed max-w-sm">
                  We arrive on-site with high-visibility vests, safety glasses, and hard hats. Prepared for industrial facilities, ports, and high-security job sites.
                </p>
              </div>
            </div>

            {/* MEDIUM BLOCK: Ratchet Straps (Yellow) */}
            <div className="md:col-span-2 relative group overflow-hidden clip-trap border-b-4 border-red-600">
              <img 
                src={strapsBuckets} 
                alt="Heavy Duty Securement" 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
              />
              <div className="absolute inset-0 bg-gray-900/40 group-hover:bg-transparent transition-colors"></div>
              <div className="absolute top-6 left-6 bg-red-600 text-white px-4 py-1 text-[10px] font-black uppercase tracking-widest">
                Load Securement
              </div>
              <div className="absolute bottom-6 left-6 right-6">
                <p className="text-white font-black uppercase text-xl">Grade-A Ratchet Sets</p>
              </div>
            </div>

            {/* SMALL BLOCK: Gloves & Vest Detail */}
            <div className="relative group overflow-hidden clip-trap bg-gray-800">
              <img 
                src={safetyVest} 
                alt="Safety Detail" 
                className="w-full h-full object-cover opacity-50 group-hover:opacity-100 transition-opacity" 
              />
              <div className="absolute inset-0 p-6 flex flex-col justify-between border border-white/5">
                <Activity className="text-red-600" size={24} />
                <p className="font-black text-xs uppercase tracking-tighter">Gear Check Every Load</p>
              </div>
            </div>

            {/* SMALL BLOCK: Securement Detail */}
            <div className="relative group overflow-hidden clip-trap bg-red-600 flex flex-col items-center justify-center p-8 text-center shadow-inner">
               <ShieldCheck size={48} className="mb-4 text-white" />
               <p className="text-white font-black uppercase text-sm tracking-tighter leading-tight">
                 Zero Damage<br/>Guarantee
               </p>
            </div>

          </div>
        </div>
      </section>

      {/* 5. EQUIPMENT & SPECS */}
      <section id="equipment" className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-end mb-10 border-b border-gray-200 pb-4">
            <h2 className="text-4xl font-black uppercase text-gray-900">Technical <span className="text-red-600">Specs</span></h2>
            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Verified Equipment Data</span>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Data Card */}
            <div className="lg:col-span-2 bg-white p-8 clip-trap border-l-4 border-red-600 shadow-md flex flex-col justify-between">
              <div>
                <h3 className="text-3xl font-black text-gray-900 mb-8 uppercase tracking-tighter">26ft International Van</h3>
                
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-red-600 font-bold text-xs uppercase"><Maximize size={16}/> Dimensions</div>
                    <p className="text-2xl font-black text-gray-800 tracking-tighter">26'L x 102"W x 103"H</p>
                    <p className="text-xs text-gray-400 font-bold uppercase tracking-widest">High-Cube Capacity</p>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-red-600 font-bold text-xs uppercase"><Scale size={16}/> Payload</div>
                    <p className="text-2xl font-black text-gray-800 tracking-tighter uppercase">10,000 LBS</p>
                    <p className="text-xs text-gray-400 font-bold uppercase tracking-widest">Class 6 Non-CDL</p>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-red-600 font-bold text-xs uppercase"><Gauge size={16}/> Liftgate</div>
                    <p className="text-2xl font-black tracking-tighter text-red-600 uppercase">3,000 LB</p>
                    <p className="text-xs text-gray-400 font-bold uppercase tracking-widest">Anthony Rail Liftgate</p>
                  </div>
                </div>
              </div>

              {/* Technical Load Securement Grid (Fills the space) */}
              <div className="mt-12">
                <div className="flex items-center gap-2 mb-4">
                  <CheckCircle className="text-red-600" size={18} />
                  <span className="text-sm font-black uppercase tracking-widest text-gray-900">Professional Load Securement</span>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                  {[
                    { icon: <Zap size={18} />, label: 'E-Tracks' },
                    { icon: <ShieldCheck size={18} />, label: 'Ratchet Straps' },
                    { icon: <Box size={18} />, label: 'Moving Blankets' },
                    { icon: <Truck size={18} />, label: 'Pallet Jack' }
                  ].map((item, idx) => (
                    <div key={idx} className="bg-gray-900 text-white p-4 clip-trap flex flex-col items-center justify-center text-center group hover:bg-red-600 transition-all duration-300">
                      <div className="text-red-500 group-hover:text-white mb-2 transition-colors">
                        {item.icon}
                      </div>
                      <span className="text-[10px] font-black uppercase tracking-widest">{item.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Equipment Proof Card (The Real Picture) */}
            <div className="relative group clip-trap bg-gray-200 shadow-xl overflow-hidden h-[400px] lg:h-auto">
              <img 
                src={truckRear} 
                alt="WHITNEY's 3000lb Anthony Liftgate Proof" 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent p-8 flex flex-col justify-end">
                <span className="bg-red-600 text-white text-[10px] font-black px-3 py-1 w-fit mb-3 uppercase tracking-widest animate-pulse">
                  Verified Unit
                </span>
                <p className="text-white font-black uppercase text-2xl leading-none">
                  3,000 LB Capacity
                </p>
                <p className="text-red-500 font-bold text-xs uppercase mt-2 tracking-widest">
                  Proof of Equipment
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. BROKER REVIEWS (Placeholder updated for Box Truck context) */}
      <section className="py-20 bg-gray-900 text-white clip-angle">
        <div className="max-w-7xl mx-auto px-4">
           <div className="text-center mb-12">
             <h2 className="text-3xl font-black uppercase">Broker <span className="text-red-500">Trust</span></h2>
             <p className="text-gray-400">Consistent, regional performance.</p>
           </div>

           <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { name: "Jason M.", company: "TQL", text: "WHITNEY was excellent. Perfect for that tricky LTL run we had. Tracking was on point." },
                { name: "Sarah K.", company: "CH Robinson", text: "No nonsense. He said he'd be there at 8am, he was there at 7:45am. Clean box truck." },
                { name: "David L.", company: "Coyote", text: "Direct communication makes all the difference. Paperwork was in my inbox immediately." }
              ].map((review, i) => (
                <div key={i} className="bg-gray-800 p-8 clip-trap shadow-lg border-b-4 border-red-600 relative hover-lift transition-all duration-300">
                   <div className="flex text-red-500 mb-4">
                      {[...Array(5)].map((_, i) => <Star key={i} size={16} fill="currentColor" />)}
                   </div>
                   <p className="italic text-gray-300 mb-6">"{review.text}"</p>
                   <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center font-bold text-white">
                        {review.name[0]}
                      </div>
                      <div>
                        <p className="font-bold text-sm">{review.name}</p>
                        <p className="text-xs text-gray-500 uppercase">{review.company}</p>
                      </div>
                   </div>
                </div>
              ))}
           </div>
        </div>
      </section>
      
      {/* 6. LANES */}
      <section id="lanes" className="py-20 bg-white border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 text-center">
            <h2 className="text-3xl font-black uppercase mb-8 text-gray-900">Service <span className="text-red-600">Area</span></h2>
            <p className="text-gray-500 mb-12 max-w-2xl mx-auto">
                Specializing in FLORIDA ↔ SOUTHEAST lanes. Open to structured backhauls or dedicated regional runs.
            </p>

            <div className="flex flex-wrap justify-center gap-4">
              {['FLORIDA', 'GEORGIA', 'ALABAMA', 'SOUTH CAROLINA', 'NORTH CAROLINA', 'TENNESSEE', 'MISSISSIPPI', 'KENTUCKY'].map((state, index) => (
                <span 
                  key={state} 
                  className={`clip-trap px-6 py-3 font-bold shadow-sm hover:scale-110 transition-transform cursor-default border-l-4
                    ${index === 0 ? 'bg-red-600 text-white border-red-800' : 'bg-gray-50 text-gray-700 border-red-600'}`}
                >
                  {state}
                </span>
              ))}
            </div>

            <div className="mt-12 p-8 bg-gray-50 inline-block clip-trap border border-gray-200">
               <div className="flex items-center gap-4 text-left">
                 <div className="p-3 bg-white border border-gray-200 text-red-600 rounded-full shadow-sm"><Navigation size={24}/></div>
                 <div>
                   <p className="font-bold text-lg text-gray-900">Home Base</p>
                   <p className="text-gray-500 uppercase text-sm tracking-wide">{HOME_BASE}</p>
                 </div>
               </div>
            </div>
        </div>
      </section>

      {/* 6.5 CHECK AVAILABILITY SECTION - FIXED BUTTON TYPE */}
      <section id="availability" className="pb-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="bg-[#111827] clip-trap p-8 md:p-12 relative overflow-hidden shadow-2xl">
            <div className="absolute top-0 right-0 w-64 h-64 bg-red-600/10 blur-3xl rounded-full -mr-20 -mt-20"></div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
              <div className="text-left space-y-4 text-white">
                <h2 className="text-3xl md:text-5xl font-black leading-none uppercase">Check <span className="text-red-600">Availability</span></h2>
                <p className="text-gray-400 text-lg leading-relaxed">Specializing in <strong>FLORIDA ↔ SOUTHEAST</strong> lanes. Get a direct response from the owner-operator within minutes.</p>
              </div>
              <div className="bg-white p-1 clip-trap">
                <form className="grid grid-cols-1 sm:grid-cols-2 gap-2 p-2 bg-white">
                  <select
                    required
                    value={quoteOrigin}
                    onChange={(e) => setQuoteOrigin(e.target.value)}
                    className="bg-gray-100 p-4 font-bold text-gray-700 outline-none focus:bg-gray-200 transition-colors cursor-pointer"
                  >
                    <option value="">Origin (Florida)</option>
  <option>FL - Florida (HQ)</option>
  <option>GA - Georgia</option>
  <option>AL - Alabama</option>
  <option>SC - South Carolina</option>
                  </select>

                  <select
                    required
                    value={quoteDest}
                    onChange={(e) => setQuoteDest(e.target.value)}
                    className="bg-gray-100 p-4 font-bold text-gray-700 outline-none focus:bg-gray-200 transition-colors cursor-pointer"
                  >
                    <option value="">Destination (Southeast)</option>
  <option>NC - North Carolina</option>
  <option>TN - Tennessee</option>
  <option>MS - Mississippi</option>
  <option>KY - Kentucky</option>
                  </select>


                  {/* CHANGED TYPE TO SUBMIT */}
                  <a
                    href={getMailtoLink()}
                    onClick={(e) => {
                      if (!quoteOrigin || !quoteDest) {
                        e.preventDefault();
                        alert("Please select both an Origin and a Destination.");
                      }
                    }}
                    className="sm:col-span-2 bg-red-600 text-white font-black py-4 flex items-center justify-center gap-2 hover:bg-red-700 transition-all uppercase tracking-widest group"
                  >
                    Request Quote <ChevronRight className="group-hover:translate-x-1 transition-transform" />
                  </a>

                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. DOCUMENTS */}
      <section id="documents" className="py-24 bg-gray-900 text-white relative">
        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
            <div className="mb-10">
              <h2 className="text-3xl font-black uppercase mb-2">Broker <span className="text-red-500">Packet</span></h2>
              <p className="text-gray-400 flex items-center justify-center gap-2 text-sm">
                {isUnlocked ? <><CheckCircle size={14} className="text-green-500" /> IDENTITY VERIFIED</> : <><Lock size={14} /> LOCKED: VERIFIED BROKERS ONLY</>}
              </p>
            </div>
            
            <div className={`bg-gray-800 p-10 clip-trap border-2 ${isUnlocked ? 'border-red-500 shadow-2xl shadow-red-500/20' : 'border-gray-700'} transition-all duration-500`}>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {[
                      { label: 'W-9 Form', icon: <FileText size={32} /> },
                      { label: 'MC Authority', icon: <ShieldCheck size={32} /> },
                      { label: 'Insurance Cert', icon: <Box size={32} /> }
                    ].map((doc, i) => (
                        <button 
                          key={i} 
                          onClick={() => handleDownload(doc.label)}
                          className={`flex flex-col items-center justify-center p-6 clip-trap border transition-all duration-300
                            ${isUnlocked 
                              ? 'bg-gray-700 border-gray-600 hover:bg-red-600 hover:text-white hover:-translate-y-1 hover:border-red-600 shadow-lg' 
                              : 'bg-gray-900/50 border-dashed border-gray-600 opacity-50 cursor-not-allowed'
                            }`}
                        >
                            {isUnlocked ? doc.icon : <Lock size={32}/>}
                            <span className="font-bold text-sm mt-3 uppercase tracking-tighter">{doc.label}</span>
                            {isUnlocked && <Download size={14} className="mt-2 opacity-50" />}
                        </button>
                    ))}
                </div>
                {!isUnlocked && (
                  <button 
                    onClick={() => setShowModal(true)} 
                    className="mt-8 clip-trap bg-white text-gray-900 px-10 py-3 font-black uppercase tracking-widest hover:bg-red-600 hover:text-white transition-all shadow-xl"
                  >
                    ENTER ACCESS CODE
                  </button>
                )}
            </div>
        </div>
        
        {/* Abstract Background Detail */}
        <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-black to-transparent opacity-50"></div>
      </section>

      {/* SECURITY MODAL */}
      {showModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in zoom-in duration-200">
          <div className="clip-trap bg-white w-full max-w-sm p-8 shadow-2xl border-t-4 border-red-600 relative">
            <button onClick={() => setShowModal(false)} className="absolute top-4 right-4 text-gray-400 hover:text-gray-900 transition-colors"><X size={20} /></button>
            <ShieldCheck size={40} className="mx-auto text-red-600 mb-4" />
            <h3 className="text-xl font-black text-center mb-1 text-gray-900">Identity Check</h3>
            <p className="text-center text-gray-500 text-xs mb-6">Enter the code provided in our email signature.</p>
            <form onSubmit={handleUnlock}>
                <input 
                  type="text" 
                  value={accessCode} 
                  onChange={(e) => setAccessCode(e.target.value)} 
                  placeholder="ACCESS CODE" 
                  className="w-full text-center font-mono text-xl py-3 rounded bg-gray-100 border border-gray-300 focus:border-red-600 outline-none uppercase mb-4 transition-colors text-gray-900" 
                />
                {error && <p className="text-red-500 text-xs text-center mb-4 flex items-center justify-center gap-1"><AlertCircle size={12}/> {error}</p>}
                <button type="submit" className="w-full bg-red-600 text-white font-bold py-3 hover:brightness-110 transition-all shadow-lg shadow-red-600/30">UNLOCK DOCUMENTS</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;