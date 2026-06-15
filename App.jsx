import { useState, useEffect, useRef } from "react";

// ─── DESIGN TOKENS ───────────────────────────────────────────────────────────
const C = {
  navy:   "#0B1F3A",
  green:  "#0D8B5A",
  gold:   "#D4AF37",
  goldL:  "#F0D060",
  white:  "#FFFFFF",
  gray50: "#F8FAFC",
  gray100:"#F1F5F9",
  gray200:"#E2E8F0",
  gray400:"#94A3B8",
  gray600:"#475569",
  gray800:"#1E293B",
};

// ─── UTILITY ─────────────────────────────────────────────────────────────────
const useInView = (threshold = 0.15) => {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setVisible(true); obs.disconnect(); }
    }, { threshold });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, visible];
};

const useCounter = (target, duration = 2000, start = false) => {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start) return;
    let startTime = null;
    const step = (ts) => {
      if (!startTime) startTime = ts;
      const progress = Math.min((ts - startTime) / duration, 1);
      setCount(Math.floor(progress * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [start, target, duration]);
  return count;
};

// ─── DATA ────────────────────────────────────────────────────────────────────
const PROFESSIONALS = [
  { id:1, name:"Arif Habib", title:"Chairman", company:"Arif Habib Group", industry:"Finance", avatar:"AH", color:"#0D8B5A" },
  { id:2, name:"Seema Aziz", title:"Founder & CEO", company:"CARE Foundation", industry:"Education", avatar:"SA", color:"#D4AF37" },
  { id:3, name:"Babar Ali", title:"Chancellor", company:"University of Lahore", industry:"Academia", avatar:"BA", color:"#0B1F3A" },
  { id:4, name:"Nida Hasan", title:"Director", company:"NestledIn", industry:"Real Estate", avatar:"NH", color:"#1a6b45" },
  { id:5, name:"Zafar Iqbal", title:"CEO", company:"Mobilink Bank", industry:"FinTech", avatar:"ZI", color:"#7C3AED" },
  { id:6, name:"Sana Safinaz", title:"Co-Founder", company:"Sana Safinaz", industry:"Fashion", avatar:"SS", color:"#DB2777" },
  { id:7, name:"Faisal Edhi", title:"Chairman", company:"Edhi Foundation", industry:"Philanthropy", avatar:"FE", color:"#D97706" },
  { id:8, name:"Neha Rajput", title:"Tech Lead", company:"Netsol Technologies", industry:"Technology", avatar:"NR", color:"#059669" },
];

const STATS = [
  { label:"Professionals Featured", value:500, suffix:"+" },
  { label:"Interviews Published", value:100, suffix:"+" },
  { label:"Industries Covered", value:50, suffix:"+" },
  { label:"Community Reach", value:100, suffix:"K+" },
];

const LEADERS = [
  { id:1, name:"Ahmad Raza Khan", designation:"CEO & Founder", company:"TechVentures PK", industry:"Technology", bio:"Serial entrepreneur with 15+ years building Pakistan's digital ecosystem.", avatar:"AR", color:"#0D8B5A" },
  { id:2, name:"Sana Mirza", designation:"Managing Director", company:"Mirza Holdings", industry:"Investment", bio:"Pioneering sustainable investment practices across South Asia.", avatar:"SM", color:"#D4AF37" },
  { id:3, name:"Dr. Khalid Maqbool", designation:"Vice Chancellor", company:"LUMS", industry:"Academia", bio:"Transforming higher education policy for a knowledge-driven Pakistan.", avatar:"KM", color:"#0B1F3A" },
  { id:4, name:"Zara Hussain", designation:"Chief Product Officer", company:"Careem", industry:"Mobility", bio:"Building world-class products that serve millions across MENA & South Asia.", avatar:"ZH", color:"#7C3AED" },
  { id:5, name:"Omar Sheikh", designation:"Managing Partner", company:"TPG Capital", industry:"Private Equity", bio:"Driving economic growth through strategic investments in Pakistani startups.", avatar:"OS", color:"#D97706" },
  { id:6, name:"Ayesha Raza", designation:"Country Head", company:"Google Pakistan", industry:"Technology", bio:"Connecting Pakistan's talent to global digital opportunities.", avatar:"AR2", color:"#DB2777" },
];

const INTERVIEWS = [
  { id:1, category:"Leadership", title:"How Ahmad Khan Built a $50M Tech Empire from Lahore", name:"Ahmad Khan", role:"CEO, TechVentures", time:"12 min read", featured:true, avatar:"AK", color:"#0D8B5A" },
  { id:2, category:"Entrepreneurship", title:"From Zero to a 200-Person Team: Zara's Product Journey", name:"Zara Hussain", role:"CPO, Careem", time:"8 min read", featured:false, avatar:"ZH", color:"#7C3AED" },
  { id:3, category:"Finance", title:"Investing in Pakistan: Why Global VCs Are Paying Attention", name:"Omar Sheikh", role:"Managing Partner, TPG", time:"10 min read", featured:false, avatar:"OS", color:"#D97706" },
  { id:4, category:"Education", title:"Reimagining University Education for Pakistan's Digital Age", name:"Dr. Khalid Maqbool", role:"Vice Chancellor, LUMS", time:"15 min read", featured:false, avatar:"KM", color:"#0B1F3A" },
];

const TESTIMONIALS = [
  { name:"Fatima Sheikh", role:"Head of HR, Unilever Pakistan", text:"Being featured on Meet Pakistan opened doors I never expected. Within weeks, I had speaking invitations from three major conferences.", avatar:"FS", color:"#0D8B5A" },
  { name:"Bilal Chaudhry", role:"Founder, FinanceApp.pk", text:"The platform captures Pakistan's entrepreneurial spirit beautifully. My story reached over 50,000 professionals in the first month.", avatar:"BC", color:"#D4AF37" },
  { name:"Dr. Amina Malik", role:"Director, PIMS Hospital", text:"Meet Pakistan gave my work the visibility it deserved. A remarkable platform for professionals who are making a real difference.", avatar:"AM", color:"#0B1F3A" },
];

const CAREER_ARTICLES = [
  { icon:"📄", title:"Resume Writing That Gets You Noticed", category:"Resume Tips", read:"5 min" },
  { icon:"🎯", title:"Ace Any Interview: The STAR Method Deep Dive", category:"Interview Prep", read:"7 min" },
  { icon:"🚀", title:"Leadership in the Age of Remote Teams", category:"Leadership", read:"6 min" },
  { icon:"💼", title:"Freelancing on Upwork: Pakistan's Top Earners Share Their Secrets", category:"Freelancing", read:"9 min" },
];

const SUCCESS_STORIES = [
  { name:"Hassan Ali", from:"Factory Worker", to:"Software Engineer at Google", years:"4 years", avatar:"HA", color:"#0D8B5A", desc:"From working 12-hour shifts in a textile factory to shipping code for 2 billion users." },
  { name:"Maryam Javed", from:"School Teacher", to:"CEO of EdTech Startup", years:"3 years", avatar:"MJ", color:"#D4AF37", desc:"Turned a classroom problem into a platform educating 500,000 Pakistani children." },
  { name:"Tariq Butt", from:"Freelancer", to:"Agency Owner ($1M ARR)", years:"5 years", avatar:"TB", color:"#7C3AED", desc:"Started on Fiverr with a $5 gig, now runs Pakistan's premier digital marketing agency." },
];

const NAV_LINKS = ["Home","About","Leaders","Interviews","Career Hub","Contact"];

// ─── COMPONENTS ──────────────────────────────────────────────────────────────

const Avatar = ({ initials, color, size = 56 }) => (
  <div style={{
    width: size, height: size, borderRadius: "50%",
    background: `linear-gradient(135deg, ${color}dd, ${color})`,
    display:"flex", alignItems:"center", justifyContent:"center",
    color:"#fff", fontWeight:700, fontSize: size * 0.3,
    fontFamily:"'Poppins',sans-serif", flexShrink:0,
    boxShadow:`0 4px 12px ${color}44`,
  }}>{initials}</div>
);

const Badge = ({ children, color = C.green }) => (
  <span style={{
    background:`${color}18`, color, border:`1px solid ${color}33`,
    borderRadius:20, padding:"3px 10px", fontSize:11, fontWeight:600,
    fontFamily:"'Poppins',sans-serif", letterSpacing:0.5,
    textTransform:"uppercase",
  }}>{children}</span>
);

const GoldLine = () => (
  <div style={{ width:48, height:3, background:`linear-gradient(90deg,${C.gold},${C.goldL})`, borderRadius:2, margin:"12px 0 20px" }} />
);

const SectionLabel = ({ children }) => (
  <p style={{ color:C.green, fontWeight:700, fontSize:12, letterSpacing:2, textTransform:"uppercase", fontFamily:"'Poppins',sans-serif", marginBottom:8 }}>{children}</p>
);

const Btn = ({ children, variant="primary", onClick, style={} }) => {
  const base = {
    fontFamily:"'Poppins',sans-serif", fontWeight:600, fontSize:14,
    padding:"12px 28px", borderRadius:8, cursor:"pointer",
    border:"none", transition:"all 0.25s", letterSpacing:0.3,
    display:"inline-flex", alignItems:"center", gap:8, ...style,
  };
  const styles = {
    primary:   { background:`linear-gradient(135deg,${C.green},#15a870)`, color:"#fff", boxShadow:`0 4px 16px ${C.green}44` },
    secondary: { background:"transparent", color:C.navy, border:`2px solid ${C.navy}`, },
    gold:      { background:`linear-gradient(135deg,${C.gold},${C.goldL})`, color:C.navy, boxShadow:`0 4px 16px ${C.gold}44` },
    outline:   { background:"transparent", color:C.green, border:`2px solid ${C.green}` },
    white:     { background:"#fff", color:C.navy, boxShadow:"0 4px 16px #0002" },
  };
  return (
    <button onClick={onClick} style={{ ...base, ...styles[variant] }}
      onMouseEnter={e => { e.currentTarget.style.transform="translateY(-2px)"; e.currentTarget.style.boxShadow="0 8px 24px #0003"; }}
      onMouseLeave={e => { e.currentTarget.style.transform="translateY(0)"; e.currentTarget.style.boxShadow = styles[variant].boxShadow || "none"; }}
    >{children}</button>
  );
};

const FadeIn = ({ children, delay = 0, direction = "up", style = {} }) => {
  const [ref, visible] = useInView();
  const transforms = { up:"translateY(30px)", down:"translateY(-30px)", left:"translateX(-30px)", right:"translateX(30px)", none:"none" };
  return (
    <div ref={ref} style={{
      opacity: visible ? 1 : 0,
      transform: visible ? "none" : transforms[direction],
      transition: `opacity 0.7s ease ${delay}s, transform 0.7s ease ${delay}s`,
      ...style,
    }}>{children}</div>
  );
};

// ─── NAVIGATION ──────────────────────────────────────────────────────────────
const Navigation = ({ page, setPage }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);

  return (
    <nav style={{
      position:"fixed", top:0, left:0, right:0, zIndex:1000,
      background: scrolled ? "#fff" : "transparent",
      boxShadow: scrolled ? "0 2px 24px #0B1F3A18" : "none",
      transition:"all 0.3s", padding:"0 5%",
    }}>
      <div style={{ maxWidth:1200, margin:"0 auto", display:"flex", alignItems:"center", justifyContent:"space-between", height:72 }}>
        {/* LOGO */}
        <button onClick={() => setPage("home")} style={{ background:"none", border:"none", cursor:"pointer", display:"flex", alignItems:"center", gap:10 }}>
          <div style={{ width:40, height:40, background:`linear-gradient(135deg,${C.green},#15a870)`, borderRadius:10, display:"flex", alignItems:"center", justifyContent:"center" }}>
            <span style={{ color:"#fff", fontWeight:800, fontSize:18, fontFamily:"'Poppins',sans-serif" }}>M</span>
          </div>
          <div style={{ textAlign:"left" }}>
            <div style={{ fontFamily:"'Poppins',sans-serif", fontWeight:800, fontSize:16, color:scrolled?C.navy:"#fff", lineHeight:1 }}>Meet Pakistan</div>
            <div style={{ fontSize:9, color:scrolled?C.gold:C.goldL, fontWeight:600, letterSpacing:2, textTransform:"uppercase" }}>Professional Network</div>
          </div>
        </button>

        {/* DESKTOP NAV */}
        <div style={{ display:"flex", alignItems:"center", gap:4 }} className="desktop-nav">
          {NAV_LINKS.map(link => (
            <button key={link} onClick={() => setPage(link.toLowerCase().replace(" ","-"))}
              style={{ background:"none", border:"none", cursor:"pointer", padding:"8px 14px", fontFamily:"'Poppins',sans-serif", fontSize:13, fontWeight:500, color:scrolled?C.navy:"#ffffffdd", borderRadius:6, transition:"all 0.2s" }}
              onMouseEnter={e=>{e.currentTarget.style.color=C.green;}}
              onMouseLeave={e=>{e.currentTarget.style.color=scrolled?C.navy:"#ffffffdd";}}
            >{link}</button>
          ))}
          <div style={{ marginLeft:8 }}>
            <Btn variant="gold" onClick={() => setPage("get-featured")} style={{ padding:"9px 20px", fontSize:13 }}>✦ Get Featured</Btn>
          </div>
        </div>

        {/* MOBILE HAMBURGER */}
        <button onClick={() => setMobileOpen(!mobileOpen)} style={{ display:"none", background:"none", border:"none", cursor:"pointer", padding:8 }} className="mobile-menu-btn">
          <div style={{ width:24, height:2, background:scrolled?C.navy:"#fff", margin:"5px 0", transition:"all 0.3s" }} />
          <div style={{ width:24, height:2, background:scrolled?C.navy:"#fff", margin:"5px 0" }} />
          <div style={{ width:16, height:2, background:scrolled?C.navy:"#fff", margin:"5px 0" }} />
        </button>
      </div>

      {/* MOBILE MENU */}
      {mobileOpen && (
        <div style={{ background:"#fff", padding:"16px 5%", boxShadow:"0 8px 32px #0002", borderTop:`3px solid ${C.green}` }}>
          {NAV_LINKS.map(link => (
            <button key={link} onClick={() => { setPage(link.toLowerCase().replace(" ","-")); setMobileOpen(false); }}
              style={{ display:"block", width:"100%", background:"none", border:"none", textAlign:"left", padding:"12px 0", fontFamily:"'Poppins',sans-serif", fontSize:15, fontWeight:500, color:C.navy, cursor:"pointer", borderBottom:`1px solid ${C.gray100}` }}
            >{link}</button>
          ))}
          <div style={{ marginTop:16 }}>
            <Btn variant="gold" onClick={() => { setPage("get-featured"); setMobileOpen(false); }} style={{ width:"100%", justifyContent:"center" }}>✦ Get Featured</Btn>
          </div>
        </div>
      )}
    </nav>
  );
};

// ─── HERO ─────────────────────────────────────────────────────────────────────
const Hero = ({ setPage }) => (
  <section style={{
    minHeight:"100vh", background:`linear-gradient(135deg, ${C.navy} 0%, #1a3a6b 50%, #0f2d52 100%)`,
    display:"flex", alignItems:"center", position:"relative", overflow:"hidden",
  }}>
    {/* Geometric bg elements */}
    <div style={{ position:"absolute", inset:0, overflow:"hidden", pointerEvents:"none" }}>
      <div style={{ position:"absolute", top:-200, right:-200, width:600, height:600, borderRadius:"50%", background:`radial-gradient(circle, ${C.green}18 0%, transparent 70%)` }} />
      <div style={{ position:"absolute", bottom:-300, left:-200, width:700, height:700, borderRadius:"50%", background:`radial-gradient(circle, ${C.gold}12 0%, transparent 70%)` }} />
      {/* Grid lines */}
      {[...Array(8)].map((_,i) => (
        <div key={i} style={{ position:"absolute", left:`${i*14}%`, top:0, bottom:0, width:1, background:"#ffffff06" }} />
      ))}
      {/* Floating badges */}
      {[
        { top:"20%", right:"8%", text:"🏆 CEO of the Year" },
        { top:"45%", right:"4%", text:"💼 500+ Professionals" },
        { top:"70%", right:"10%", text:"🌍 Global Reach" },
      ].map((b,i) => (
        <div key={i} style={{
          position:"absolute", top:b.top, right:b.right,
          background:"#ffffff14", backdropFilter:"blur(12px)",
          border:"1px solid #ffffff22", borderRadius:12,
          padding:"10px 18px", color:"#fff", fontSize:13, fontFamily:"'Poppins',sans-serif", fontWeight:500,
          animation:`float ${3+i*0.7}s ease-in-out infinite alternate`,
        }}>{b.text}</div>
      ))}
      {/* Green accent line */}
      <div style={{ position:"absolute", left:0, top:"60%", width:"40%", height:2, background:`linear-gradient(90deg,${C.green}00,${C.green}88,${C.green}00)` }} />
    </div>

    <div style={{ maxWidth:1200, margin:"0 auto", padding:"120px 5% 80px", position:"relative", zIndex:1 }}>
      <div style={{ maxWidth:700 }}>
        <div style={{ display:"flex", alignItems:"center", gap:12, marginBottom:24 }}>
          <div style={{ width:40, height:2, background:`linear-gradient(90deg,${C.gold},${C.goldL})` }} />
          <span style={{ color:C.gold, fontFamily:"'Poppins',sans-serif", fontWeight:600, fontSize:13, letterSpacing:2, textTransform:"uppercase" }}>Pakistan's #1 Professional Network</span>
        </div>

        <h1 style={{ fontFamily:"'Poppins',sans-serif", fontWeight:800, fontSize:"clamp(36px,5vw,64px)", lineHeight:1.1, color:"#fff", margin:"0 0 24px" }}>
          Connecting Pakistan's{" "}
          <span style={{ background:`linear-gradient(135deg,${C.green},${C.goldL})`, WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent" }}>
            Talent
          </span>{" "}
          with Global Opportunities
        </h1>

        <p style={{ fontFamily:"'Inter',sans-serif", fontSize:"clamp(15px,2vw,19px)", color:"#ffffffbb", lineHeight:1.7, marginBottom:40 }}>
          Discover inspiring stories, industry leaders, career insights, and the professionals shaping Pakistan's future — one story at a time.
        </p>

        <div style={{ display:"flex", gap:16, flexWrap:"wrap" }}>
          <Btn variant="gold" onClick={() => setPage("leaders")} style={{ fontSize:15, padding:"14px 32px" }}>⚡ Explore Leaders</Btn>
          <Btn variant="white" onClick={() => setPage("get-featured")} style={{ fontSize:15, padding:"14px 32px" }}>✦ Get Featured</Btn>
        </div>

        {/* Quick stats */}
        <div style={{ display:"flex", gap:32, marginTop:56, flexWrap:"wrap" }}>
          {[["500+","Professionals"],["100K+","Community"],["50+","Industries"]].map(([n,l]) => (
            <div key={l}>
              <div style={{ fontFamily:"'Poppins',sans-serif", fontWeight:800, fontSize:28, color:C.gold }}>{n}</div>
              <div style={{ fontFamily:"'Inter',sans-serif", fontSize:13, color:"#ffffff88", marginTop:2 }}>{l}</div>
            </div>
          ))}
        </div>
      </div>
    </div>

    <style>{`
      @keyframes float { from{transform:translateY(0)} to{transform:translateY(-12px)} }
      @media(max-width:768px){ .desktop-nav{display:none!important} .mobile-menu-btn{display:block!important} }
    `}</style>
  </section>
);

// ─── PROFESSIONALS CAROUSEL ───────────────────────────────────────────────────
const ProfessionalsCarousel = ({ setPage }) => {
  const [current, setCurrent] = useState(0);
  const [hovering, setHovering] = useState(false);

  useEffect(() => {
    if (hovering) return;
    const t = setInterval(() => setCurrent(c => (c + 1) % PROFESSIONALS.length), 4000);
    return () => clearInterval(t);
  }, [hovering]);

  const visible = [
    PROFESSIONALS[(current) % PROFESSIONALS.length],
    PROFESSIONALS[(current + 1) % PROFESSIONALS.length],
    PROFESSIONALS[(current + 2) % PROFESSIONALS.length],
  ];

  return (
    <section style={{ background:C.navy, padding:"80px 5%", overflow:"hidden" }}>
      <div style={{ maxWidth:1200, margin:"0 auto" }}>
        <FadeIn>
          <div style={{ textAlign:"center", marginBottom:48 }}>
            <SectionLabel>Featured Professionals</SectionLabel>
            <h2 style={{ fontFamily:"'Poppins',sans-serif", fontWeight:800, fontSize:"clamp(26px,3.5vw,42px)", color:"#fff", margin:"8px 0 0" }}>
              Pakistan's Finest,{" "}
              <span style={{ color:C.gold }}>Spotlighted</span>
            </h2>
          </div>
        </FadeIn>

        <div style={{ display:"flex", gap:24, justifyContent:"center", flexWrap:"wrap" }} onMouseEnter={() => setHovering(true)} onMouseLeave={() => setHovering(false)}>
          {visible.map((pro, i) => (
            <div key={`${pro.id}-${i}`} style={{
              background:"#ffffff0e", border:"1px solid #ffffff18", borderRadius:16,
              padding:28, width:260, textAlign:"center", transition:"all 0.4s",
              backdropFilter:"blur(8px)", flex:"0 0 auto",
            }}
              onMouseEnter={e => { e.currentTarget.style.background="#ffffff1a"; e.currentTarget.style.transform="translateY(-6px)"; e.currentTarget.style.borderColor=C.green+"88"; }}
              onMouseLeave={e => { e.currentTarget.style.background="#ffffff0e"; e.currentTarget.style.transform="none"; e.currentTarget.style.borderColor="#ffffff18"; }}
            >
              <div style={{ display:"flex", justifyContent:"center", marginBottom:16 }}>
                <div style={{ position:"relative" }}>
                  <Avatar initials={pro.avatar} color={pro.color} size={72} />
                  <div style={{ position:"absolute", bottom:2, right:2, width:16, height:16, background:C.green, borderRadius:"50%", border:"2px solid "+C.navy }} />
                </div>
              </div>
              <div style={{ fontFamily:"'Poppins',sans-serif", fontWeight:700, fontSize:16, color:"#fff", marginBottom:4 }}>{pro.name}</div>
              <div style={{ fontFamily:"'Inter',sans-serif", fontSize:13, color:C.gold, marginBottom:4, fontWeight:500 }}>{pro.title}</div>
              <div style={{ fontFamily:"'Inter',sans-serif", fontSize:12, color:"#ffffff88", marginBottom:12 }}>{pro.company}</div>
              <Badge color={pro.color}>{pro.industry}</Badge>
              <div style={{ marginTop:16 }}>
                <button onClick={() => setPage("leaders")} style={{
                  background:"transparent", border:`1px solid ${C.green}88`, color:C.green,
                  borderRadius:8, padding:"7px 18px", fontFamily:"'Poppins',sans-serif", fontSize:12, fontWeight:600, cursor:"pointer",
                  transition:"all 0.2s",
                }}
                  onMouseEnter={e=>{e.currentTarget.style.background=C.green;e.currentTarget.style.color="#fff";}}
                  onMouseLeave={e=>{e.currentTarget.style.background="transparent";e.currentTarget.style.color=C.green;}}
                >View Profile →</button>
              </div>
            </div>
          ))}
        </div>

        {/* Dots */}
        <div style={{ display:"flex", justifyContent:"center", gap:8, marginTop:32 }}>
          {PROFESSIONALS.map((_,i) => (
            <button key={i} onClick={() => setCurrent(i)} style={{
              width: i === current ? 24 : 8, height:8,
              borderRadius:4, border:"none", cursor:"pointer",
              background: i === current ? C.gold : "#ffffff33",
              transition:"all 0.3s",
            }} />
          ))}
        </div>

        {/* Nav arrows */}
        <div style={{ display:"flex", justifyContent:"center", gap:12, marginTop:16 }}>
          {["←","→"].map((arrow,i) => (
            <button key={arrow} onClick={() => setCurrent(c => i===0 ? (c-1+PROFESSIONALS.length)%PROFESSIONALS.length : (c+1)%PROFESSIONALS.length)}
              style={{ width:44, height:44, borderRadius:"50%", background:"#ffffff18", border:"1px solid #ffffff33", color:"#fff", fontSize:18, cursor:"pointer", transition:"all 0.2s" }}
              onMouseEnter={e=>{e.currentTarget.style.background=C.green;}}
              onMouseLeave={e=>{e.currentTarget.style.background="#ffffff18";}}
            >{arrow}</button>
          ))}
        </div>
      </div>
    </section>
  );
};

// ─── STATS ────────────────────────────────────────────────────────────────────
const StatsSection = () => {
  const [ref, visible] = useInView();
  const counts = STATS.map(s => useCounter(s.value, 2200, visible));

  return (
    <section ref={ref} style={{ background:`linear-gradient(135deg,${C.green},#0a6e46)`, padding:"64px 5%" }}>
      <div style={{ maxWidth:1200, margin:"0 auto", display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(200px,1fr))", gap:32 }}>
        {STATS.map((stat, i) => (
          <div key={stat.label} style={{ textAlign:"center" }}>
            <div style={{ fontFamily:"'Poppins',sans-serif", fontWeight:800, fontSize:"clamp(40px,5vw,64px)", color:"#fff", lineHeight:1 }}>
              {counts[i]}{stat.suffix}
            </div>
            <div style={{ fontFamily:"'Inter',sans-serif", fontSize:15, color:"#ffffff99", marginTop:8, fontWeight:500 }}>{stat.label}</div>
            <div style={{ width:32, height:3, background:C.gold, borderRadius:2, margin:"12px auto 0" }} />
          </div>
        ))}
      </div>
    </section>
  );
};

// ─── FEATURED LEADERS ─────────────────────────────────────────────────────────
const FeaturedLeaders = ({ setPage }) => (
  <section style={{ background:C.gray50, padding:"80px 5%" }}>
    <div style={{ maxWidth:1200, margin:"0 auto" }}>
      <FadeIn>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-end", marginBottom:48, flexWrap:"wrap", gap:16 }}>
          <div>
            <SectionLabel>Featured Leaders</SectionLabel>
            <h2 style={{ fontFamily:"'Poppins',sans-serif", fontWeight:800, fontSize:"clamp(26px,3.5vw,40px)", color:C.navy, margin:"8px 0 0" }}>
              Voices That{" "}<span style={{ color:C.green }}>Shape Pakistan</span>
            </h2>
            <GoldLine />
          </div>
          <Btn variant="outline" onClick={() => setPage("leaders")}>View All Leaders →</Btn>
        </div>
      </FadeIn>

      <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(310px,1fr))", gap:24 }}>
        {LEADERS.map((leader, i) => (
          <FadeIn key={leader.id} delay={i * 0.1}>
            <div style={{
              background:"#fff", borderRadius:16, overflow:"hidden",
              boxShadow:"0 4px 24px #0B1F3A10", transition:"all 0.3s",
              border:`1px solid ${C.gray200}`,
            }}
              onMouseEnter={e=>{e.currentTarget.style.boxShadow="0 12px 40px #0B1F3A20";e.currentTarget.style.transform="translateY(-4px)";}}
              onMouseLeave={e=>{e.currentTarget.style.boxShadow="0 4px 24px #0B1F3A10";e.currentTarget.style.transform="none";}}
            >
              <div style={{ height:6, background:`linear-gradient(90deg,${leader.color},${C.gold})` }} />
              <div style={{ padding:24 }}>
                <div style={{ display:"flex", gap:16, alignItems:"flex-start", marginBottom:16 }}>
                  <Avatar initials={leader.avatar} color={leader.color} size={56} />
                  <div style={{ flex:1 }}>
                    <div style={{ fontFamily:"'Poppins',sans-serif", fontWeight:700, fontSize:16, color:C.navy }}>{leader.name}</div>
                    <div style={{ fontFamily:"'Inter',sans-serif", fontSize:13, color:leader.color, fontWeight:600 }}>{leader.designation}</div>
                    <div style={{ fontFamily:"'Inter',sans-serif", fontSize:12, color:C.gray600, marginTop:2 }}>{leader.company}</div>
                  </div>
                </div>
                <Badge color={leader.color}>{leader.industry}</Badge>
                <p style={{ fontFamily:"'Inter',sans-serif", fontSize:14, color:C.gray600, lineHeight:1.6, margin:"12px 0 20px" }}>{leader.bio}</p>
                <button onClick={() => setPage("leaders")} style={{
                  background:`${leader.color}12`, color:leader.color, border:`1px solid ${leader.color}44`,
                  borderRadius:8, padding:"8px 18px", fontFamily:"'Poppins',sans-serif", fontSize:13, fontWeight:600, cursor:"pointer", transition:"all 0.2s",
                }}
                  onMouseEnter={e=>{e.currentTarget.style.background=leader.color;e.currentTarget.style.color="#fff";}}
                  onMouseLeave={e=>{e.currentTarget.style.background=`${leader.color}12`;e.currentTarget.style.color=leader.color;}}
                >Read More →</button>
              </div>
            </div>
          </FadeIn>
        ))}
      </div>
    </div>
  </section>
);

// ─── INTERVIEWS ───────────────────────────────────────────────────────────────
const LatestInterviews = ({ setPage }) => (
  <section style={{ background:"#fff", padding:"80px 5%" }}>
    <div style={{ maxWidth:1200, margin:"0 auto" }}>
      <FadeIn>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-end", marginBottom:48, flexWrap:"wrap", gap:16 }}>
          <div>
            <SectionLabel>Latest Interviews</SectionLabel>
            <h2 style={{ fontFamily:"'Poppins',sans-serif", fontWeight:800, fontSize:"clamp(26px,3.5vw,40px)", color:C.navy, margin:"8px 0 0" }}>
              Stories That{" "}<span style={{ color:C.green }}>Inspire</span>
            </h2>
            <GoldLine />
          </div>
          <Btn variant="outline" onClick={() => setPage("interviews")}>All Interviews →</Btn>
        </div>
      </FadeIn>

      <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(280px,1fr))", gap:24 }}>
        {/* Featured */}
        {INTERVIEWS.filter(i => i.featured).map(interview => (
          <FadeIn key={interview.id} delay={0}>
            <div style={{
              background:`linear-gradient(135deg,${C.navy},#1a3a6b)`,
              borderRadius:16, padding:32, color:"#fff",
              gridColumn:"span 1", minHeight:280,
              position:"relative", overflow:"hidden",
            }}>
              <div style={{ position:"absolute", top:-40, right:-40, width:160, height:160, borderRadius:"50%", background:`${C.green}22` }} />
              <Badge color={C.gold}>{interview.category}</Badge>
              <h3 style={{ fontFamily:"'Poppins',sans-serif", fontWeight:700, fontSize:22, color:"#fff", margin:"16px 0 12px", lineHeight:1.3 }}>{interview.title}</h3>
              <div style={{ display:"flex", alignItems:"center", gap:12, marginBottom:24 }}>
                <Avatar initials={interview.avatar} color={interview.color} size={40} />
                <div>
                  <div style={{ fontFamily:"'Poppins',sans-serif", fontWeight:600, fontSize:14, color:"#fff" }}>{interview.name}</div>
                  <div style={{ fontFamily:"'Inter',sans-serif", fontSize:12, color:"#ffffff88" }}>{interview.role}</div>
                </div>
              </div>
              <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center" }}>
                <span style={{ color:C.gold, fontSize:12, fontFamily:"'Inter',sans-serif" }}>⏱ {interview.time}</span>
                <button onClick={() => setPage("interviews")} style={{ background:C.gold, color:C.navy, border:"none", borderRadius:8, padding:"8px 16px", fontFamily:"'Poppins',sans-serif", fontWeight:700, fontSize:13, cursor:"pointer" }}>Read →</button>
              </div>
            </div>
          </FadeIn>
        ))}

        {/* Regular */}
        {INTERVIEWS.filter(i => !i.featured).map((interview, i) => (
          <FadeIn key={interview.id} delay={(i+1)*0.1}>
            <div style={{
              background:C.gray50, border:`1px solid ${C.gray200}`, borderRadius:16, padding:24,
              transition:"all 0.3s",
            }}
              onMouseEnter={e=>{e.currentTarget.style.boxShadow="0 8px 32px #0B1F3A15";e.currentTarget.style.transform="translateY(-4px)";}}
              onMouseLeave={e=>{e.currentTarget.style.boxShadow="none";e.currentTarget.style.transform="none";}}
            >
              <Badge color={interview.color}>{interview.category}</Badge>
              <h3 style={{ fontFamily:"'Poppins',sans-serif", fontWeight:700, fontSize:17, color:C.navy, margin:"12px 0 16px", lineHeight:1.4 }}>{interview.title}</h3>
              <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:16 }}>
                <Avatar initials={interview.avatar} color={interview.color} size={36} />
                <div>
                  <div style={{ fontFamily:"'Poppins',sans-serif", fontWeight:600, fontSize:13, color:C.navy }}>{interview.name}</div>
                  <div style={{ fontFamily:"'Inter',sans-serif", fontSize:12, color:C.gray600 }}>{interview.role}</div>
                </div>
              </div>
              <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center" }}>
                <span style={{ color:C.gray400, fontSize:12, fontFamily:"'Inter',sans-serif" }}>⏱ {interview.time}</span>
                <button onClick={() => setPage("interviews")} style={{ background:"none", color:interview.color, border:`1px solid ${interview.color}44`, borderRadius:8, padding:"6px 14px", fontFamily:"'Poppins',sans-serif", fontWeight:600, fontSize:12, cursor:"pointer", transition:"all 0.2s" }}
                  onMouseEnter={e=>{e.currentTarget.style.background=interview.color;e.currentTarget.style.color="#fff";}}
                  onMouseLeave={e=>{e.currentTarget.style.background="none";e.currentTarget.style.color=interview.color;}}
                >Read More →</button>
              </div>
            </div>
          </FadeIn>
        ))}
      </div>
    </div>
  </section>
);

// ─── SUCCESS STORIES ──────────────────────────────────────────────────────────
const SuccessStories = () => (
  <section style={{ background:`linear-gradient(135deg,${C.gray50},#e8f5ef)`, padding:"80px 5%" }}>
    <div style={{ maxWidth:1200, margin:"0 auto" }}>
      <FadeIn>
        <div style={{ textAlign:"center", marginBottom:48 }}>
          <SectionLabel>Success Stories</SectionLabel>
          <h2 style={{ fontFamily:"'Poppins',sans-serif", fontWeight:800, fontSize:"clamp(26px,3.5vw,40px)", color:C.navy }}>
            Journeys That{" "}<span style={{ color:C.green }}>Prove It's Possible</span>
          </h2>
          <GoldLine style={{ margin:"12px auto" }} />
        </div>
      </FadeIn>

      <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(320px,1fr))", gap:24 }}>
        {SUCCESS_STORIES.map((story, i) => (
          <FadeIn key={story.name} delay={i*0.12}>
            <div style={{
              background:"#fff", borderRadius:16, padding:28, boxShadow:"0 4px 24px #0B1F3A08",
              border:`1px solid ${C.gray200}`, transition:"all 0.3s", position:"relative",
            }}
              onMouseEnter={e=>{e.currentTarget.style.transform="translateY(-4px)";e.currentTarget.style.boxShadow="0 12px 40px #0B1F3A18";}}
              onMouseLeave={e=>{e.currentTarget.style.transform="none";e.currentTarget.style.boxShadow="0 4px 24px #0B1F3A08";}}
            >
              <div style={{ position:"absolute", top:24, right:24, fontSize:28, opacity:0.15 }}>⭐</div>
              <div style={{ display:"flex", gap:14, alignItems:"center", marginBottom:16 }}>
                <Avatar initials={story.avatar} color={story.color} size={52} />
                <div>
                  <div style={{ fontFamily:"'Poppins',sans-serif", fontWeight:700, fontSize:16, color:C.navy }}>{story.name}</div>
                  <div style={{ fontSize:12, color:C.gray600, fontFamily:"'Inter',sans-serif" }}>in {story.years}</div>
                </div>
              </div>
              <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:14, flexWrap:"wrap" }}>
                <span style={{ background:C.gray100, color:C.gray600, borderRadius:6, padding:"4px 10px", fontSize:12, fontFamily:"'Inter',sans-serif", fontWeight:500 }}>{story.from}</span>
                <span style={{ color:C.gold, fontWeight:700 }}>→</span>
                <span style={{ background:`${story.color}15`, color:story.color, borderRadius:6, padding:"4px 10px", fontSize:12, fontFamily:"'Poppins',sans-serif", fontWeight:600 }}>{story.to}</span>
              </div>
              <p style={{ fontFamily:"'Inter',sans-serif", fontSize:14, color:C.gray600, lineHeight:1.65, margin:0 }}>{story.desc}</p>
            </div>
          </FadeIn>
        ))}
      </div>
    </div>
  </section>
);

// ─── CAREER HUB PREVIEW ───────────────────────────────────────────────────────
const CareerHubPreview = ({ setPage }) => (
  <section style={{ background:C.navy, padding:"80px 5%" }}>
    <div style={{ maxWidth:1200, margin:"0 auto" }}>
      <FadeIn>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-end", marginBottom:48, flexWrap:"wrap", gap:16 }}>
          <div>
            <SectionLabel>Career Hub</SectionLabel>
            <h2 style={{ fontFamily:"'Poppins',sans-serif", fontWeight:800, fontSize:"clamp(26px,3.5vw,40px)", color:"#fff", margin:"8px 0 0" }}>
              Fuel Your{" "}<span style={{ color:C.gold }}>Career Growth</span>
            </h2>
          </div>
          <Btn variant="gold" onClick={() => setPage("career-hub")}>Explore Career Hub →</Btn>
        </div>
      </FadeIn>

      <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(240px,1fr))", gap:20 }}>
        {CAREER_ARTICLES.map((a,i) => (
          <FadeIn key={a.title} delay={i*0.1}>
            <div style={{
              background:"#ffffff0d", border:"1px solid #ffffff18", borderRadius:14, padding:24,
              transition:"all 0.3s", cursor:"pointer",
            }}
              onMouseEnter={e=>{e.currentTarget.style.background="#ffffff18";e.currentTarget.style.borderColor=C.green+"88";e.currentTarget.style.transform="translateY(-4px)";}}
              onMouseLeave={e=>{e.currentTarget.style.background="#ffffff0d";e.currentTarget.style.borderColor="#ffffff18";e.currentTarget.style.transform="none";}}
            >
              <div style={{ fontSize:32, marginBottom:14 }}>{a.icon}</div>
              <Badge color={C.gold}>{a.category}</Badge>
              <h3 style={{ fontFamily:"'Poppins',sans-serif", fontWeight:700, fontSize:16, color:"#fff", margin:"12px 0 8px", lineHeight:1.4 }}>{a.title}</h3>
              <div style={{ fontFamily:"'Inter',sans-serif", fontSize:12, color:"#ffffff55" }}>⏱ {a.read} read</div>
            </div>
          </FadeIn>
        ))}
      </div>
    </div>
  </section>
);

// ─── TESTIMONIALS ─────────────────────────────────────────────────────────────
const Testimonials = () => {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setActive(a => (a+1)%TESTIMONIALS.length), 5000);
    return () => clearInterval(t);
  }, []);

  return (
    <section style={{ background:"#fff", padding:"80px 5%" }}>
      <div style={{ maxWidth:800, margin:"0 auto", textAlign:"center" }}>
        <FadeIn>
          <SectionLabel>Testimonials</SectionLabel>
          <h2 style={{ fontFamily:"'Poppins',sans-serif", fontWeight:800, fontSize:"clamp(26px,3.5vw,40px)", color:C.navy, margin:"8px 0 48px" }}>
            What Our <span style={{ color:C.green }}>Community Says</span>
          </h2>
        </FadeIn>

        <div style={{ position:"relative", minHeight:220 }}>
          {TESTIMONIALS.map((t, i) => (
            <div key={t.name} style={{
              position:"absolute", inset:0,
              opacity: i === active ? 1 : 0,
              transform: i === active ? "translateY(0)" : "translateY(20px)",
              transition:"all 0.6s", pointerEvents: i === active ? "all" : "none",
            }}>
              <div style={{ background:C.gray50, border:`1px solid ${C.gray200}`, borderRadius:20, padding:"36px 40px", position:"relative" }}>
                <div style={{ fontSize:48, color:C.gold, lineHeight:1, position:"absolute", top:16, left:28, fontFamily:"serif" }}>"</div>
                <p style={{ fontFamily:"'Inter',sans-serif", fontSize:"clamp(15px,2vw,18px)", color:C.gray800, lineHeight:1.7, marginTop:20, marginBottom:28, fontStyle:"italic" }}>{t.text}</p>
                <div style={{ display:"flex", alignItems:"center", justifyContent:"center", gap:14 }}>
                  <Avatar initials={t.avatar} color={t.color} size={48} />
                  <div style={{ textAlign:"left" }}>
                    <div style={{ fontFamily:"'Poppins',sans-serif", fontWeight:700, fontSize:15, color:C.navy }}>{t.name}</div>
                    <div style={{ fontFamily:"'Inter',sans-serif", fontSize:13, color:C.gray600 }}>{t.role}</div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div style={{ display:"flex", justifyContent:"center", gap:8, marginTop:240 }}>
          {TESTIMONIALS.map((_,i) => (
            <button key={i} onClick={() => setActive(i)} style={{
              width: i===active?24:8, height:8, borderRadius:4,
              border:"none", cursor:"pointer",
              background: i===active?C.green:C.gray200, transition:"all 0.3s",
            }} />
          ))}
        </div>
      </div>
    </section>
  );
};

// ─── NEWSLETTER ───────────────────────────────────────────────────────────────
const Newsletter = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [sent, setSent] = useState(false);

  const submit = () => { if (email) { setSent(true); setTimeout(() => setSent(false), 4000); setEmail(""); setName(""); } };

  return (
    <section style={{ background:`linear-gradient(135deg,${C.green},#0a6e46)`, padding:"72px 5%" }}>
      <div style={{ maxWidth:600, margin:"0 auto", textAlign:"center" }}>
        <FadeIn>
          <div style={{ fontSize:40, marginBottom:16 }}>📬</div>
          <h2 style={{ fontFamily:"'Poppins',sans-serif", fontWeight:800, fontSize:"clamp(22px,3vw,34px)", color:"#fff", marginBottom:12 }}>
            Stay Connected with Pakistan's Professional Community
          </h2>
          <p style={{ fontFamily:"'Inter',sans-serif", color:"#ffffffbb", fontSize:16, marginBottom:32 }}>
            Get weekly interviews, leadership insights, and career tips — directly to your inbox.
          </p>

          {sent ? (
            <div style={{ background:"#ffffff22", borderRadius:12, padding:24, color:"#fff", fontFamily:"'Poppins',sans-serif", fontSize:17, fontWeight:600 }}>
              ✅ You're subscribed! Welcome to the Meet Pakistan community.
            </div>
          ) : (
            <div style={{ display:"flex", flexDirection:"column", gap:12 }}>
              <input value={name} onChange={e=>setName(e.target.value)} placeholder="Your Name" style={{
                padding:"14px 20px", borderRadius:10, border:"1px solid #ffffff44", background:"#ffffff18",
                color:"#fff", fontFamily:"'Inter',sans-serif", fontSize:15, outline:"none",
              }} />
              <input value={email} onChange={e=>setEmail(e.target.value)} placeholder="Email Address" type="email" style={{
                padding:"14px 20px", borderRadius:10, border:"1px solid #ffffff44", background:"#ffffff18",
                color:"#fff", fontFamily:"'Inter',sans-serif", fontSize:15, outline:"none",
              }} />
              <Btn variant="gold" onClick={submit} style={{ justifyContent:"center", padding:"14px", fontSize:16 }}>
                Subscribe Now ✦
              </Btn>
            </div>
          )}
        </FadeIn>
      </div>
    </section>
  );
};

// ─── FOOTER ───────────────────────────────────────────────────────────────────
const Footer = ({ setPage }) => (
  <footer style={{ background:C.navy, color:"#ffffffbb", fontFamily:"'Inter',sans-serif" }}>
    <div style={{ maxWidth:1200, margin:"0 auto", padding:"64px 5% 32px" }}>
      <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(200px,1fr))", gap:40, marginBottom:48 }}>
        {/* Brand */}
        <div>
          <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:16 }}>
            <div style={{ width:36, height:36, background:`linear-gradient(135deg,${C.green},#15a870)`, borderRadius:9, display:"flex", alignItems:"center", justifyContent:"center" }}>
              <span style={{ color:"#fff", fontWeight:800, fontSize:16, fontFamily:"'Poppins',sans-serif" }}>M</span>
            </div>
            <div>
              <div style={{ fontFamily:"'Poppins',sans-serif", fontWeight:800, fontSize:15, color:"#fff" }}>Meet Pakistan</div>
              <div style={{ fontSize:9, color:C.gold, fontWeight:600, letterSpacing:2, textTransform:"uppercase" }}>Professional Network</div>
            </div>
          </div>
          <p style={{ fontSize:14, lineHeight:1.7, color:"#ffffff88", marginBottom:16 }}>Pakistan's most trusted platform for professional stories, leadership insights, and career growth.</p>
          <div style={{ display:"flex", gap:12 }}>
            {["in","f","t","▶"].map(icon => (
              <div key={icon} style={{ width:36, height:36, background:"#ffffff15", borderRadius:8, display:"flex", alignItems:"center", justifyContent:"center", cursor:"pointer", fontSize:14, color:"#ffffffbb", transition:"all 0.2s" }}
                onMouseEnter={e=>{e.currentTarget.style.background=C.green;e.currentTarget.style.color="#fff";}}
                onMouseLeave={e=>{e.currentTarget.style.background="#ffffff15";e.currentTarget.style.color="#ffffffbb";}}
              >{icon}</div>
            ))}
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h4 style={{ fontFamily:"'Poppins',sans-serif", fontWeight:700, fontSize:15, color:"#fff", marginBottom:16 }}>Quick Links</h4>
          {["Home","About","Leaders","Interviews","Career Hub","Get Featured","Contact"].map(link => (
            <button key={link} onClick={() => setPage(link.toLowerCase().replace(" ","-"))} style={{ display:"block", background:"none", border:"none", color:"#ffffff88", fontSize:14, cursor:"pointer", padding:"5px 0", transition:"color 0.2s", textAlign:"left", fontFamily:"'Inter',sans-serif" }}
              onMouseEnter={e=>{e.currentTarget.style.color=C.gold;}}
              onMouseLeave={e=>{e.currentTarget.style.color="#ffffff88";}}
            >→ {link}</button>
          ))}
        </div>

        {/* Categories */}
        <div>
          <h4 style={{ fontFamily:"'Poppins',sans-serif", fontWeight:700, fontSize:15, color:"#fff", marginBottom:16 }}>Featured Categories</h4>
          {["Technology","Finance","Healthcare","Education","Entrepreneurship","Corporate Leadership","Freelancing"].map(cat => (
            <div key={cat} style={{ fontSize:14, color:"#ffffff77", padding:"5px 0", cursor:"pointer", transition:"color 0.2s" }}
              onMouseEnter={e=>{e.currentTarget.style.color=C.green;}}
              onMouseLeave={e=>{e.currentTarget.style.color="#ffffff77";}}
            >· {cat}</div>
          ))}
        </div>

        {/* Contact */}
        <div>
          <h4 style={{ fontFamily:"'Poppins',sans-serif", fontWeight:700, fontSize:15, color:"#fff", marginBottom:16 }}>Contact</h4>
          {[
            ["📧","hello@meetpakistan.com"],
            ["📱","+92 300 1234567"],
            ["📍","Lahore, Pakistan"],
            ["🌐","www.meetpakistan.com"],
          ].map(([icon,val]) => (
            <div key={val} style={{ display:"flex", gap:10, fontSize:14, color:"#ffffff88", marginBottom:10 }}>
              <span>{icon}</span><span>{val}</span>
            </div>
          ))}
        </div>
      </div>

      <div style={{ borderTop:"1px solid #ffffff18", paddingTop:24, display:"flex", justifyContent:"space-between", alignItems:"center", flexWrap:"wrap", gap:12 }}>
        <div style={{ fontSize:13, color:"#ffffff55" }}>© 2025 Meet Pakistan. All rights reserved. Built with ❤️ for Pakistan.</div>
        <div style={{ display:"flex", gap:20 }}>
          {["Privacy Policy","Terms of Service","Cookie Policy"].map(l => (
            <span key={l} style={{ fontSize:12, color:"#ffffff55", cursor:"pointer", transition:"color 0.2s" }}
              onMouseEnter={e=>{e.currentTarget.style.color=C.gold;}}
              onMouseLeave={e=>{e.currentTarget.style.color="#ffffff55";}}
            >{l}</span>
          ))}
        </div>
      </div>
    </div>
  </footer>
);

// ─── INNER PAGES ──────────────────────────────────────────────────────────────

const PageHero = ({ title, subtitle, bg = C.navy }) => (
  <div style={{ background:`linear-gradient(135deg,${bg},#1a3a6b)`, padding:"130px 5% 64px", textAlign:"center" }}>
    <SectionLabel>Meet Pakistan</SectionLabel>
    <h1 style={{ fontFamily:"'Poppins',sans-serif", fontWeight:800, fontSize:"clamp(30px,5vw,52px)", color:"#fff", margin:"8px 0 16px" }}>{title}</h1>
    <p style={{ fontFamily:"'Inter',sans-serif", fontSize:17, color:"#ffffffbb", maxWidth:600, margin:"0 auto" }}>{subtitle}</p>
    <GoldLine style={{ margin:"20px auto 0" }} />
  </div>
);

// ABOUT PAGE
const AboutPage = () => (
  <div style={{ background:"#fff" }}>
    <PageHero title="About Meet Pakistan" subtitle="Our mission, vision, and the story behind Pakistan's premier professional network." />
    <div style={{ maxWidth:1100, margin:"0 auto", padding:"64px 5%" }}>
      <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(300px,1fr))", gap:40, marginBottom:60 }}>
        {[
          { icon:"🎯", title:"Our Mission", text:"To amplify Pakistan's professional voices, celebrate their achievements, and connect them with opportunities that transcend borders." },
          { icon:"🌟", title:"Our Vision", text:"To become South Asia's most trusted professional storytelling and networking platform, making every Pakistani professional's journey visible to the world." },
          { icon:"💡", title:"Why We Exist", text:"Because Pakistan's talent deserves a global stage. We bridge the gap between where Pakistani professionals are and where they deserve to be." },
        ].map(card => (
          <FadeIn key={card.title}>
            <div style={{ background:C.gray50, borderRadius:16, padding:32, border:`1px solid ${C.gray200}`, height:"100%" }}>
              <div style={{ fontSize:40, marginBottom:16 }}>{card.icon}</div>
              <h3 style={{ fontFamily:"'Poppins',sans-serif", fontWeight:700, fontSize:22, color:C.navy, marginBottom:12 }}>{card.title}</h3>
              <GoldLine />
              <p style={{ fontFamily:"'Inter',sans-serif", fontSize:15, color:C.gray600, lineHeight:1.75 }}>{card.text}</p>
            </div>
          </FadeIn>
        ))}
      </div>

      <FadeIn>
        <div style={{ background:`linear-gradient(135deg,${C.navy},#1a3a6b)`, borderRadius:20, padding:"48px 40px", marginBottom:60, textAlign:"center" }}>
          <h2 style={{ fontFamily:"'Poppins',sans-serif", fontWeight:800, fontSize:"clamp(24px,3vw,36px)", color:"#fff", marginBottom:16 }}>The Story Behind Meet Pakistan</h2>
          <p style={{ fontFamily:"'Inter',sans-serif", fontSize:16, color:"#ffffffbb", lineHeight:1.8, maxWidth:700, margin:"0 auto" }}>
            Founded in 2023, Meet Pakistan was born from a simple observation: Pakistan has world-class professionals, entrepreneurs, and leaders — but their stories weren't being told on a platform worthy of their achievements. We set out to change that, one story at a time.
          </p>
        </div>
      </FadeIn>

      <div>
        <FadeIn><h2 style={{ fontFamily:"'Poppins',sans-serif", fontWeight:800, fontSize:32, color:C.navy, textAlign:"center", marginBottom:12 }}>Our <span style={{ color:C.green }}>Growth Journey</span></h2></FadeIn>
        <FadeIn><GoldLine style={{ margin:"0 auto 40px" }} /></FadeIn>
        <div style={{ position:"relative", paddingLeft:32 }}>
          <div style={{ position:"absolute", left:12, top:0, bottom:0, width:2, background:`linear-gradient(180deg,${C.green},${C.gold})` }} />
          {[
            { year:"2023", event:"Meet Pakistan Founded — First 10 profiles published" },
            { year:"2023", event:"100th professional featured — Tech & Finance boom" },
            { year:"2024", event:"Career Hub launched — 50,000 monthly readers" },
            { year:"2024", event:"Video interview series launched — 1M+ total views" },
            { year:"2025", event:"100K community milestone — Expanding to global diaspora" },
          ].map((item,i) => (
            <FadeIn key={item.year+item.event} delay={i*0.1}>
              <div style={{ display:"flex", gap:20, marginBottom:28, alignItems:"flex-start" }}>
                <div style={{ width:24, height:24, borderRadius:"50%", background:C.green, border:`4px solid #fff`, boxShadow:`0 0 0 2px ${C.green}`, flexShrink:0, marginLeft:-22 }} />
                <div style={{ background:C.gray50, borderRadius:12, padding:"14px 20px", flex:1, border:`1px solid ${C.gray200}` }}>
                  <span style={{ color:C.gold, fontWeight:700, fontFamily:"'Poppins',sans-serif", fontSize:14 }}>{item.year}</span>
                  <span style={{ color:C.gray600, fontFamily:"'Inter',sans-serif", fontSize:15, marginLeft:12 }}>{item.event}</span>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </div>
  </div>
);

// LEADERS PAGE
const LeadersPage = () => {
  const [search, setSearch] = useState("");
  const [industry, setIndustry] = useState("All");
  const industries = ["All", ...new Set(LEADERS.map(l => l.industry))];
  const filtered = LEADERS.filter(l =>
    (industry === "All" || l.industry === industry) &&
    (l.name.toLowerCase().includes(search.toLowerCase()) || l.designation.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div style={{ background:C.gray50 }}>
      <PageHero title="Leaders Directory" subtitle="Discover Pakistan's most accomplished professionals, entrepreneurs, and visionaries." />
      <div style={{ maxWidth:1200, margin:"0 auto", padding:"48px 5%" }}>
        {/* Filters */}
        <FadeIn>
          <div style={{ display:"flex", gap:16, marginBottom:40, flexWrap:"wrap", alignItems:"center" }}>
            <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="🔍 Search leaders by name or role..." style={{
              flex:"1 1 300px", padding:"12px 20px", borderRadius:10, border:`1px solid ${C.gray200}`,
              fontFamily:"'Inter',sans-serif", fontSize:14, outline:"none", background:"#fff",
              boxShadow:"0 2px 8px #0002",
            }} />
            <div style={{ display:"flex", gap:8, flexWrap:"wrap" }}>
              {industries.map(ind => (
                <button key={ind} onClick={() => setIndustry(ind)} style={{
                  background: industry===ind ? C.green : "#fff",
                  color: industry===ind ? "#fff" : C.gray600,
                  border:`1px solid ${industry===ind?C.green:C.gray200}`,
                  borderRadius:8, padding:"10px 18px", fontFamily:"'Poppins',sans-serif", fontSize:13, fontWeight:600, cursor:"pointer", transition:"all 0.2s",
                }}>{ind}</button>
              ))}
            </div>
          </div>
        </FadeIn>

        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(310px,1fr))", gap:24 }}>
          {filtered.map((leader,i) => (
            <FadeIn key={leader.id} delay={i*0.07}>
              <div style={{ background:"#fff", borderRadius:16, overflow:"hidden", boxShadow:"0 4px 24px #0B1F3A10", border:`1px solid ${C.gray200}`, transition:"all 0.3s" }}
                onMouseEnter={e=>{e.currentTarget.style.transform="translateY(-4px)";e.currentTarget.style.boxShadow="0 12px 40px #0B1F3A20";}}
                onMouseLeave={e=>{e.currentTarget.style.transform="none";e.currentTarget.style.boxShadow="0 4px 24px #0B1F3A10";}}
              >
                <div style={{ height:6, background:`linear-gradient(90deg,${leader.color},${C.gold})` }} />
                <div style={{ padding:24 }}>
                  <div style={{ display:"flex", gap:14, alignItems:"flex-start", marginBottom:16 }}>
                    <Avatar initials={leader.avatar} color={leader.color} size={60} />
                    <div>
                      <div style={{ fontFamily:"'Poppins',sans-serif", fontWeight:700, fontSize:16, color:C.navy }}>{leader.name}</div>
                      <div style={{ fontFamily:"'Inter',sans-serif", fontSize:13, color:leader.color, fontWeight:600 }}>{leader.designation}</div>
                      <div style={{ fontFamily:"'Inter',sans-serif", fontSize:12, color:C.gray600 }}>{leader.company}</div>
                    </div>
                  </div>
                  <Badge color={leader.color}>{leader.industry}</Badge>
                  <p style={{ fontFamily:"'Inter',sans-serif", fontSize:14, color:C.gray600, lineHeight:1.65, margin:"12px 0 20px" }}>{leader.bio}</p>
                  <div style={{ display:"flex", gap:8 }}>
                    <button style={{ background:leader.color, color:"#fff", border:"none", borderRadius:8, padding:"8px 16px", fontFamily:"'Poppins',sans-serif", fontSize:13, fontWeight:600, cursor:"pointer", flex:1, transition:"all 0.2s" }}>View Profile</button>
                    <button style={{ background:C.gray50, color:C.gray600, border:`1px solid ${C.gray200}`, borderRadius:8, padding:"8px 12px", cursor:"pointer", fontSize:16 }}>in</button>
                  </div>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
        {filtered.length === 0 && (
          <div style={{ textAlign:"center", padding:"60px 20px", color:C.gray400, fontFamily:"'Inter',sans-serif" }}>
            No results found. Try a different search term or filter.
          </div>
        )}
      </div>
    </div>
  );
};

// INTERVIEWS PAGE
const InterviewsPage = () => {
  const [cat, setCat] = useState("All");
  const cats = ["All","Leadership","Entrepreneurship","Finance","Education"];

  return (
    <div style={{ background:"#fff" }}>
      <PageHero title="Interviews" subtitle="In-depth conversations with Pakistan's most influential minds." />
      <div style={{ maxWidth:1200, margin:"0 auto", padding:"48px 5%" }}>
        <FadeIn>
          <div style={{ display:"flex", gap:10, marginBottom:40, flexWrap:"wrap" }}>
            {cats.map(c => (
              <button key={c} onClick={() => setCat(c)} style={{
                background: cat===c?C.navy:"#fff", color: cat===c?"#fff":C.navy,
                border:`1px solid ${cat===c?C.navy:C.gray200}`, borderRadius:8,
                padding:"10px 20px", fontFamily:"'Poppins',sans-serif", fontSize:13, fontWeight:600, cursor:"pointer", transition:"all 0.2s",
              }}>{c}</button>
            ))}
            <input placeholder="🔍 Search interviews..." style={{ flex:"1 1 240px", padding:"10px 16px", borderRadius:8, border:`1px solid ${C.gray200}`, fontFamily:"'Inter',sans-serif", fontSize:14, outline:"none" }} />
          </div>
        </FadeIn>

        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(300px,1fr))", gap:24 }}>
          {INTERVIEWS.filter(i => cat==="All" || i.category===cat).map((interview,i) => (
            <FadeIn key={interview.id} delay={i*0.1}>
              <div style={{ background:C.gray50, border:`1px solid ${C.gray200}`, borderRadius:16, overflow:"hidden", transition:"all 0.3s" }}
                onMouseEnter={e=>{e.currentTarget.style.transform="translateY(-4px)";e.currentTarget.style.boxShadow="0 12px 32px #0B1F3A18";}}
                onMouseLeave={e=>{e.currentTarget.style.transform="none";e.currentTarget.style.boxShadow="none";}}
              >
                <div style={{ background:`linear-gradient(135deg,${interview.color}22,${interview.color}08)`, padding:"28px 24px 20px" }}>
                  <Badge color={interview.color}>{interview.category}</Badge>
                  <h3 style={{ fontFamily:"'Poppins',sans-serif", fontWeight:700, fontSize:18, color:C.navy, margin:"14px 0 0", lineHeight:1.35 }}>{interview.title}</h3>
                </div>
                <div style={{ padding:"20px 24px" }}>
                  <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:16 }}>
                    <Avatar initials={interview.avatar} color={interview.color} size={40} />
                    <div>
                      <div style={{ fontFamily:"'Poppins',sans-serif", fontWeight:600, fontSize:14, color:C.navy }}>{interview.name}</div>
                      <div style={{ fontFamily:"'Inter',sans-serif", fontSize:12, color:C.gray600 }}>{interview.role}</div>
                    </div>
                  </div>
                  <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center" }}>
                    <span style={{ fontSize:12, color:C.gray400, fontFamily:"'Inter',sans-serif" }}>⏱ {interview.time}</span>
                    <button style={{ background:interview.color, color:"#fff", border:"none", borderRadius:8, padding:"8px 16px", fontFamily:"'Poppins',sans-serif", fontSize:13, fontWeight:600, cursor:"pointer" }}>Read →</button>
                  </div>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </div>
  );
};

// CAREER HUB PAGE
const CareerHubPage = () => {
  const categories = [
    { icon:"📈", title:"Career Development", count:24, color:C.green },
    { icon:"📄", title:"Resume Writing", count:18, color:"#7C3AED" },
    { icon:"🎤", title:"Interview Tips", count:31, color:"#D97706" },
    { icon:"👑", title:"Leadership Insights", count:15, color:C.navy },
    { icon:"📊", title:"Recruitment Trends", count:12, color:"#DB2777" },
    { icon:"💻", title:"Freelancing Resources", count:28, color:"#059669" },
    { icon:"🏢", title:"Workplace Productivity", count:20, color:"#DC2626" },
  ];

  return (
    <div style={{ background:C.gray50 }}>
      <PageHero title="Career Hub" subtitle="Expert advice, actionable insights, and resources to accelerate your professional journey." />
      <div style={{ maxWidth:1200, margin:"0 auto", padding:"64px 5%" }}>
        <FadeIn>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(260px,1fr))", gap:20, marginBottom:56 }}>
            {categories.map((cat,i) => (
              <FadeIn key={cat.title} delay={i*0.07}>
                <div style={{ background:"#fff", borderRadius:14, padding:24, border:`1px solid ${C.gray200}`, cursor:"pointer", transition:"all 0.3s", boxShadow:"0 2px 12px #0001" }}
                  onMouseEnter={e=>{e.currentTarget.style.transform="translateY(-4px)";e.currentTarget.style.borderColor=cat.color;e.currentTarget.style.boxShadow=`0 8px 28px ${cat.color}22`;}}
                  onMouseLeave={e=>{e.currentTarget.style.transform="none";e.currentTarget.style.borderColor=C.gray200;e.currentTarget.style.boxShadow="0 2px 12px #0001";}}
                >
                  <div style={{ width:48, height:48, background:`${cat.color}15`, borderRadius:12, display:"flex", alignItems:"center", justifyContent:"center", fontSize:24, marginBottom:14 }}>{cat.icon}</div>
                  <div style={{ fontFamily:"'Poppins',sans-serif", fontWeight:700, fontSize:16, color:C.navy, marginBottom:6 }}>{cat.title}</div>
                  <div style={{ fontFamily:"'Inter',sans-serif", fontSize:13, color:C.gray600 }}>{cat.count} articles</div>
                  <div style={{ marginTop:14, height:3, background:C.gray100, borderRadius:2 }}>
                    <div style={{ height:"100%", width:`${(cat.count/35)*100}%`, background:`linear-gradient(90deg,${cat.color},${cat.color}aa)`, borderRadius:2 }} />
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </FadeIn>

        <FadeIn>
          <h2 style={{ fontFamily:"'Poppins',sans-serif", fontWeight:800, fontSize:28, color:C.navy, marginBottom:24 }}>Featured Articles</h2>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(300px,1fr))", gap:20 }}>
            {CAREER_ARTICLES.map(a => (
              <div key={a.title} style={{ background:"#fff", borderRadius:14, padding:24, border:`1px solid ${C.gray200}`, transition:"all 0.3s", cursor:"pointer" }}
                onMouseEnter={e=>{e.currentTarget.style.transform="translateY(-3px)";e.currentTarget.style.boxShadow="0 8px 28px #0B1F3A12";}}
                onMouseLeave={e=>{e.currentTarget.style.transform="none";e.currentTarget.style.boxShadow="none";}}
              >
                <div style={{ fontSize:32, marginBottom:12 }}>{a.icon}</div>
                <Badge color={C.green}>{a.category}</Badge>
                <h3 style={{ fontFamily:"'Poppins',sans-serif", fontWeight:700, fontSize:17, color:C.navy, margin:"12px 0 8px", lineHeight:1.4 }}>{a.title}</h3>
                <div style={{ fontFamily:"'Inter',sans-serif", fontSize:12, color:C.gray400, marginBottom:16 }}>⏱ {a.read} read</div>
                <button style={{ color:C.green, fontFamily:"'Poppins',sans-serif", fontSize:13, fontWeight:600, background:"none", border:"none", cursor:"pointer", padding:0 }}>Read Article →</button>
              </div>
            ))}
          </div>
        </FadeIn>
      </div>
    </div>
  );
};

// GET FEATURED PAGE
const GetFeaturedPage = () => {
  const [form, setForm] = useState({ name:"",designation:"",company:"",industry:"",email:"",phone:"",linkedin:"",bio:"" });
  const [submitted, setSubmitted] = useState(false);
  const set = k => e => setForm(f => ({ ...f, [k]:e.target.value }));

  const inputStyle = {
    width:"100%", padding:"13px 18px", borderRadius:10, border:`1px solid ${C.gray200}`,
    fontFamily:"'Inter',sans-serif", fontSize:14, color:C.navy, outline:"none",
    background:"#fff", boxSizing:"border-box", transition:"border 0.2s",
  };
  const labelStyle = { fontFamily:"'Poppins',sans-serif", fontSize:13, fontWeight:600, color:C.navy, display:"block", marginBottom:6 };

  const handleSubmit = () => {
    if (form.name && form.email) { setSubmitted(true); }
  };

  return (
    <div style={{ background:C.gray50 }}>
      <PageHero title="Get Featured" subtitle="Apply to share your professional story with Pakistan's most engaged professional community." />
      <div style={{ maxWidth:760, margin:"0 auto", padding:"56px 5%" }}>
        {submitted ? (
          <FadeIn>
            <div style={{ background:"#fff", borderRadius:20, padding:"56px 40px", textAlign:"center", boxShadow:"0 8px 40px #0B1F3A12", border:`2px solid ${C.green}44` }}>
              <div style={{ fontSize:64, marginBottom:20 }}>🎉</div>
              <h2 style={{ fontFamily:"'Poppins',sans-serif", fontWeight:800, fontSize:28, color:C.navy, marginBottom:12 }}>Application Submitted!</h2>
              <p style={{ fontFamily:"'Inter',sans-serif", fontSize:16, color:C.gray600, lineHeight:1.7 }}>Thank you, {form.name}! Our editorial team will review your application and reach out within 5-7 business days. Get ready to share your story with Pakistan.</p>
              <div style={{ marginTop:28 }}>
                <Btn variant="primary" onClick={() => setSubmitted(false)}>Submit Another Application</Btn>
              </div>
            </div>
          </FadeIn>
        ) : (
          <FadeIn>
            <div style={{ background:"#fff", borderRadius:20, padding:"40px", boxShadow:"0 8px 40px #0B1F3A10", border:`1px solid ${C.gray200}` }}>
              {/* Benefits */}
              <div style={{ background:`linear-gradient(135deg,${C.navy},#1a3a6b)`, borderRadius:14, padding:24, marginBottom:32 }}>
                <div style={{ fontFamily:"'Poppins',sans-serif", fontWeight:700, fontSize:17, color:"#fff", marginBottom:12 }}>✦ Why Get Featured?</div>
                <div style={{ display:"flex", flexWrap:"wrap", gap:12 }}>
                  {["🌍 Global Visibility","🤝 Professional Networking","📈 Career Growth","🏆 Brand Authority"].map(b => (
                    <span key={b} style={{ background:"#ffffff18", color:"#ffffffdd", borderRadius:8, padding:"6px 14px", fontSize:13, fontFamily:"'Inter',sans-serif" }}>{b}</span>
                  ))}
                </div>
              </div>

              <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(280px,1fr))", gap:16 }}>
                {[
                  ["Full Name *","name","text"],["Designation *","designation","text"],
                  ["Company","company","text"],["Industry","industry","text"],
                  ["Email Address *","email","email"],["Phone Number","phone","tel"],
                  ["LinkedIn Profile","linkedin","url"],
                ].map(([label, key, type]) => (
                  <div key={key}>
                    <label style={labelStyle}>{label}</label>
                    <input type={type} value={form[key]} onChange={set(key)} placeholder={`Enter your ${label.replace(" *","").toLowerCase()}`}
                      style={inputStyle}
                      onFocus={e=>{e.target.style.borderColor=C.green;e.target.style.boxShadow=`0 0 0 3px ${C.green}18`;}}
                      onBlur={e=>{e.target.style.borderColor=C.gray200;e.target.style.boxShadow="none";}}
                    />
                  </div>
                ))}
              </div>

              <div style={{ marginTop:16 }}>
                <label style={labelStyle}>Short Biography *</label>
                <textarea value={form.bio} onChange={set("bio")} placeholder="Tell us about yourself, your journey, and what makes your story inspiring..." rows={5}
                  style={{ ...inputStyle, resize:"vertical", lineHeight:1.6 }}
                  onFocus={e=>{e.target.style.borderColor=C.green;e.target.style.boxShadow=`0 0 0 3px ${C.green}18`;}}
                  onBlur={e=>{e.target.style.borderColor=C.gray200;e.target.style.boxShadow="none";}}
                />
              </div>

              <div style={{ marginTop:16, border:`2px dashed ${C.gray200}`, borderRadius:12, padding:"28px", textAlign:"center", cursor:"pointer", transition:"all 0.2s" }}
                onMouseEnter={e=>{e.currentTarget.style.borderColor=C.green;e.currentTarget.style.background=`${C.green}08`;}}
                onMouseLeave={e=>{e.currentTarget.style.borderColor=C.gray200;e.currentTarget.style.background="transparent";}}
              >
                <div style={{ fontSize:32, marginBottom:8 }}>📸</div>
                <div style={{ fontFamily:"'Poppins',sans-serif", fontWeight:600, fontSize:15, color:C.navy }}>Upload Professional Photograph</div>
                <div style={{ fontFamily:"'Inter',sans-serif", fontSize:13, color:C.gray400, marginTop:4 }}>JPG, PNG up to 10MB · High resolution recommended</div>
              </div>

              <div style={{ marginTop:28 }}>
                <Btn variant="gold" onClick={handleSubmit} style={{ width:"100%", justifyContent:"center", padding:"16px", fontSize:16 }}>
                  ✦ Submit My Application
                </Btn>
                <p style={{ fontFamily:"'Inter',sans-serif", fontSize:12, color:C.gray400, textAlign:"center", marginTop:12 }}>Your information is kept strictly confidential. We'll reach out within 5-7 business days.</p>
              </div>
            </div>
          </FadeIn>
        )}
      </div>
    </div>
  );
};

// CONTACT PAGE
const ContactPage = () => {
  const [form, setForm] = useState({ name:"", email:"", subject:"", message:"" });
  const [sent, setSent] = useState(false);
  const set = k => e => setForm(f => ({ ...f, [k]:e.target.value }));
  const inputStyle = { width:"100%", padding:"13px 18px", borderRadius:10, border:`1px solid ${C.gray200}`, fontFamily:"'Inter',sans-serif", fontSize:14, color:C.navy, outline:"none", background:"#fff", boxSizing:"border-box", transition:"border 0.2s" };

  return (
    <div style={{ background:C.gray50 }}>
      <PageHero title="Contact Us" subtitle="We'd love to hear from you. Get in touch with the Meet Pakistan team." />
      <div style={{ maxWidth:1100, margin:"0 auto", padding:"64px 5%" }}>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(300px,1fr))", gap:40 }}>
          {/* Left - Contact info */}
          <FadeIn>
            <div>
              <h2 style={{ fontFamily:"'Poppins',sans-serif", fontWeight:700, fontSize:26, color:C.navy, marginBottom:8 }}>Let's Connect</h2>
              <GoldLine />
              <p style={{ fontFamily:"'Inter',sans-serif", fontSize:15, color:C.gray600, lineHeight:1.7, marginBottom:32 }}>Whether you're interested in getting featured, exploring partnerships, or just want to say hello — we're here for you.</p>

              {[
                { icon:"📧", label:"Email", value:"hello@meetpakistan.com" },
                { icon:"📱", label:"WhatsApp", value:"+92 300 1234567" },
                { icon:"📍", label:"Location", value:"Lahore, Punjab, Pakistan" },
                { icon:"🌐", label:"Website", value:"www.meetpakistan.com" },
              ].map(item => (
                <div key={item.label} style={{ display:"flex", gap:16, alignItems:"flex-start", marginBottom:20 }}>
                  <div style={{ width:44, height:44, background:`${C.green}15`, borderRadius:12, display:"flex", alignItems:"center", justifyContent:"center", fontSize:20, flexShrink:0 }}>{item.icon}</div>
                  <div>
                    <div style={{ fontFamily:"'Poppins',sans-serif", fontWeight:600, fontSize:14, color:C.navy }}>{item.label}</div>
                    <div style={{ fontFamily:"'Inter',sans-serif", fontSize:14, color:C.gray600, marginTop:2 }}>{item.value}</div>
                  </div>
                </div>
              ))}

              {/* Social */}
              <div style={{ marginTop:28 }}>
                <div style={{ fontFamily:"'Poppins',sans-serif", fontWeight:600, fontSize:14, color:C.navy, marginBottom:14 }}>Follow Us</div>
                <div style={{ display:"flex", gap:10 }}>
                  {[{icon:"in",color:"#0077B5"},{icon:"f",color:"#1877F2"},{icon:"@",color:"#1DA1F2"},{icon:"▶",color:"#FF0000"}].map(s => (
                    <div key={s.icon} style={{ width:42, height:42, background:s.color, borderRadius:10, display:"flex", alignItems:"center", justifyContent:"center", color:"#fff", fontWeight:700, cursor:"pointer", transition:"all 0.2s" }}
                      onMouseEnter={e=>{e.currentTarget.style.transform="scale(1.1)";}}
                      onMouseLeave={e=>{e.currentTarget.style.transform="none";}}
                    >{s.icon}</div>
                  ))}
                </div>
              </div>

              {/* Map placeholder */}
              <div style={{ marginTop:28, background:`linear-gradient(135deg,${C.navy},#1a3a6b)`, borderRadius:14, padding:28, textAlign:"center", color:"#fff" }}>
                <div style={{ fontSize:32, marginBottom:8 }}>📍</div>
                <div style={{ fontFamily:"'Poppins',sans-serif", fontWeight:600, fontSize:15 }}>Lahore, Pakistan</div>
                <div style={{ fontFamily:"'Inter',sans-serif", fontSize:13, color:"#ffffff88", marginTop:4 }}>Pakistan's Cultural Capital</div>
              </div>
            </div>
          </FadeIn>

          {/* Right - Form */}
          <FadeIn delay={0.1}>
            <div style={{ background:"#fff", borderRadius:20, padding:36, boxShadow:"0 8px 40px #0B1F3A10", border:`1px solid ${C.gray200}` }}>
              {sent ? (
                <div style={{ textAlign:"center", padding:"40px 0" }}>
                  <div style={{ fontSize:56, marginBottom:16 }}>✅</div>
                  <h3 style={{ fontFamily:"'Poppins',sans-serif", fontWeight:700, fontSize:22, color:C.navy }}>Message Sent!</h3>
                  <p style={{ fontFamily:"'Inter',sans-serif", color:C.gray600, marginTop:8 }}>We'll get back to you within 24 hours.</p>
                  <div style={{ marginTop:20 }}><Btn variant="primary" onClick={() => setSent(false)}>Send Another</Btn></div>
                </div>
              ) : (
                <>
                  <h3 style={{ fontFamily:"'Poppins',sans-serif", fontWeight:700, fontSize:22, color:C.navy, marginBottom:24 }}>Send a Message</h3>
                  <div style={{ display:"flex", flexDirection:"column", gap:14 }}>
                    {[["Full Name","name","text"],["Email Address","email","email"],["Subject","subject","text"]].map(([label,key,type]) => (
                      <div key={key}>
                        <label style={{ fontFamily:"'Poppins',sans-serif", fontSize:13, fontWeight:600, color:C.navy, display:"block", marginBottom:6 }}>{label}</label>
                        <input type={type} value={form[key]} onChange={set(key)} placeholder={`Enter your ${label.toLowerCase()}`} style={inputStyle}
                          onFocus={e=>{e.target.style.borderColor=C.green;}}
                          onBlur={e=>{e.target.style.borderColor=C.gray200;}}
                        />
                      </div>
                    ))}
                    <div>
                      <label style={{ fontFamily:"'Poppins',sans-serif", fontSize:13, fontWeight:600, color:C.navy, display:"block", marginBottom:6 }}>Message</label>
                      <textarea value={form.message} onChange={set("message")} placeholder="How can we help you?" rows={5} style={{ ...inputStyle, resize:"vertical", lineHeight:1.6 }}
                        onFocus={e=>{e.target.style.borderColor=C.green;}}
                        onBlur={e=>{e.target.style.borderColor=C.gray200;}}
                      />
                    </div>
                    <Btn variant="primary" onClick={() => { if(form.name&&form.email) setSent(true); }} style={{ justifyContent:"center", padding:"14px", fontSize:15 }}>
                      Send Message →
                    </Btn>
                    <Btn variant="outline" style={{ justifyContent:"center", padding:"13px", fontSize:14 }}>
                      💬 Chat on WhatsApp
                    </Btn>
                  </div>
                </>
              )}
            </div>
          </FadeIn>
        </div>
      </div>
    </div>
  );
};

// ─── HOMEPAGE ─────────────────────────────────────────────────────────────────
const HomePage = ({ setPage }) => (
  <>
    <Hero setPage={setPage} />
    <ProfessionalsCarousel setPage={setPage} />
    <StatsSection />
    <FeaturedLeaders setPage={setPage} />
    <LatestInterviews setPage={setPage} />
    <SuccessStories />
    <CareerHubPreview setPage={setPage} />
    <Testimonials />
    <Newsletter />
  </>
);

// ─── APP ──────────────────────────────────────────────────────────────────────
export default function App() {
  const [page, setPage] = useState("home");

  const setPageAndScroll = (p) => {
    setPage(p);
    window.scrollTo({ top:0, behavior:"smooth" });
  };

  const pages = {
    "home": <HomePage setPage={setPageAndScroll} />,
    "about": <AboutPage />,
    "leaders": <LeadersPage />,
    "interviews": <InterviewsPage />,
    "career-hub": <CareerHubPage />,
    "get-featured": <GetFeaturedPage />,
    "contact": <ContactPage />,
  };

  return (
    <div style={{ fontFamily:"'Inter',sans-serif", margin:0, padding:0, minHeight:"100vh", background:"#fff" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800;900&family=Inter:wght@400;500;600;700&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        body { overflow-x: hidden; }
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: #f1f5f9; }
        ::-webkit-scrollbar-thumb { background: #0D8B5A; border-radius: 3px; }
        input::placeholder, textarea::placeholder { color: #94A3B8; }
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .mobile-menu-btn { display: block !important; }
        }
        @media (min-width: 769px) {
          .mobile-menu-btn { display: none !important; }
        }
      `}</style>

      <Navigation page={page} setPage={setPageAndScroll} />
      <main>{pages[page] || pages["home"]}</main>
      <Footer setPage={setPageAndScroll} />
    </div>
  );
}
