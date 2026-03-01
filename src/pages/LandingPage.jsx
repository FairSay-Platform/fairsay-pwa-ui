import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import { APP_NAME } from '../utils/constants';
import Logo from '../components/Logo';
import Heroimage from '../images/Heroimage.svg';
import arrow from '../images/Arrow.svg';
import shield from '../images/FS_Logo.svg';
import book from '../images/Book.svg';
import report from '../images/Report.svg';
import checkmark from '../images/Checkmark.svg';
import { LANDING_FEATURES } from '../utils/constants';

// --- SUB-COMPONENTS ---

const Header = () => {
  const { user, loading } = useAppContext();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const toggleMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  }
  const navLinks = ['About', 'Features', 'How It Works', 'Contacts'];

  return (
    <header className="fixed top-0 w-full z-50 bg-[#1e3a8a] backdrop-blur-sm border-b border-white/10">
      <div className="mx-auto px-8 h-20 flex items-center justify-between">
        <div className="flex items-center cursor-pointer" onClick={() => navigate('/')}>
          <div className="rounded-lg flex items-center justify-center"><Logo variant="light" /></div>
        </div>

        {/*Desktop Navigation*/}
        <nav className="hidden md:flex items-center gap-10 text-[14px] font-light font-inter px-3">
          {navLinks.map((item) => (
            <a key={item} href={`#${item.toLowerCase().replace(/\s/g, '-')}`} className="text-gray-300 hover:text-[#2DD4BF] transition-colors">{item}</a>
          ))}

          {loading ? (
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-[#0F766E]" />
          ) : (
          <button 
            onClick={() => navigate(user ? '/dashboard' : '/sign-in')}
            className="bg-[#0F766E] hover:bg-[#134E4A] text-white px-5 py-2 rounded-md transition-all shadow-lg"
          >
            {user ? 'Dashboard' : 'Sign In'}
          </button>
            )}
        </nav>

        {/* Hamburger Menu Button (Mobile Only) */}
        <button 
          className="md:hidden text-white p-2 focus:outline-none" 
          onClick={toggleMenu}
        >
          {isMobileMenuOpen ? (
            // Close (X) Icon
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          ) : (
            // Hamburger Icon
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile Navigation Dropdown */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-20 left-0 w-full bg-[#1e3a8a] border-b border-white/10 shadow-xl py-6 flex flex-col items-center gap-6 animate-in slide-in-from-top-2">
          {navLinks.map((item) => (
            <a 
              key={item} 
              href={`#${item.toLowerCase().replace(/\s/g, '-')}`} 
              className="text-white hover:text-[#2DD4BF] text-lg font-inter transition-colors"
              onClick={() => setIsMobileMenuOpen(false)} // Close menu on click
            >
              {item}
            </a>
          ))}

          {loading ? (
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-[#0F766E]" />
          ) : (
            <button 
              onClick={() => {
                setIsMobileMenuOpen(false);
                navigate(user ? '/dashboard' : '/sign-in');
              }}
              className="bg-[#0F766E] hover:bg-[#134E4A] text-white px-8 py-3 rounded-md transition-all shadow-lg text-lg font-semibold w-3/4 max-w-xs"
            >
              {user ? 'Dashboard' : 'Sign In'}
            </button>
          )}
        </div>
        )}
    </header>
  );
};

const Hero = () => {
  const navigate = useNavigate();
  return (
    <section className="relative min-h-[90vh] flex items-center bg-slate-900 pt-20 pb-5">
        <div style={{ backgroundImage: `url(${Heroimage})` }} className="w-full h-full bg-cover bg-center bg-no-repeat absolute inset-0 z-0 blur-[5px]" />
        
      <div className="container mx-auto relative z-10 grid lg:grid-cols-2 gap-12 w-full px-2">
        <div className="text-white">
          <h1 className="text-[60px] md:text-7x1 md:mb-10 font-bold leading-tight mb-5 font-poppins">
            Your Voice <br /> <span className="text-white">Matters.</span> <br />
            <span className="text-[#2DD4BF] text-[48px]">Speak Up</span> with Confidence.
          </h1>
          <p className="text-[20px] text-gray-300 mb-8 max-w-[516px]">
            {APP_NAME} empowers employees to understand their <br />workplace rights, report violations safely, and track resolutions with complete transparency.
          </p>
          <div className="flex gap-4">
            <button onClick={() => navigate('/sign-up')} className="flex bg-gradient-to-b from-[#1E3A8A] to-[#0F766E] pl-1 pb-6 pt-5 items-center rounded-md font-bold w-[150px] h-[55px] align-middle justify-center">Get started <img className="ml-8 h-6 gap-2" src={arrow} alt="Arrow right" /></button>
            <button className="border border-white/30 px-4 py-4 rounded-md font-bold flex justify-center">Learn more <img className="ml-8 h-6 gap-2" src={arrow} alt="Arrow right" /></button>
          </div>
        </div>
        <div className="hidden lg:flex flex-col justify-center max-w-full">
            <div className="bg-white/10 backdrop-blur-md p-8 rounded-2xl border border-white/20 space-y-6 min-h-[270px]">
                <div className="flex items-center gap-4"><span className="h-[48px] w-[48px] px-[8px] pt-[14px] bg-[#0f766e] rounded-[10px]"><img className="ml-2 h-[20px] w-[20px] gap-2 text-white" src={shield} alt="Shield icon" /></span> <div><p className="text-white font-bold text-[18px] font-poppins">Protected & Confidential</p>
                <p className="text-sm text-gray-400">Your privacy is our priority</p></div>
                </div>
                <div className="flex items-center gap-4"><span className="h-[48px] w-[48px] px-[8px] pt-[14px] bg-[#0f766e] rounded-[10px]"><img className="ml-2 h-[20px] w-[20px] gap-2 text-white" src={book} alt="Book icon" /></span> <div><p className="text-white font-bold text-[18px] font-poppins">Educational Resources</p>
                <p className="text-sm text-gray-400">Learn your workplace rights</p></div></div>
                <div className="flex items-center gap-4"><span className="h-[48px] w-[48px] px-[8px] pt-[14px] bg-[#0f766e] rounded-[10px]"><img className="ml-2 h-[20px] w-[20px] gap-2 text-white" src={report} alt="Report icon" /></span> <div><p className="text-white font-bold text-[18px] font-poppins">Easy Reporting</p>
                <p className="text-sm text-gray-400">Submit complaints seamlessly</p>
                </div></div>
            </div>
        </div>
      </div>
    </section>
  );
};

const StatsBar = () => (
  <section className="py-12 bg-[#1E3A8A] text-white">
    <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-around items-center gap-8 min-h-[80px]">
        {[
            { n: '98%', t: 'Resolution Rate' },
            { n: '24/7', t: 'Support Availability' },
            { n: '100%', t: 'Confidential & Secure' },
        ].map((stat, i) => (
            <div key={i} className="text-center">
                <div className="text-[48px] w-[123px] font-bold">{stat.n}</div>
                <div className="text-[16px] opacity-70">{stat.t}</div>
            </div>
        ))}
    </div>
  </section>
);

const About = () => (
  <section id="about" className="py-24 bg-white">
    <div className="max-w-6xl mx-auto px-6 gap-16 items-center">
      <div>
        <h2 className="text-[48px] font-bold mb-6 text-slate-900 text-center pt-[8px] px-[32px] gap-64px font-poppins">About <span className="text-[#1E3A8A]">{APP_NAME}</span></h2>
        <p className="text-gray-600 text-[20px] mb-6 text-center font-inter">We believe that every employee deserves to work in a safe, respectful <br />environment. {APP_NAME} is dedicated to empowering individuals with the <br /> knowledge and tools to stand up for their rights.</p>
       
      </div>
      </div>
       <div className="max-w-[] mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
        <div>
        <p className="text-[#333333] text-[30px] mb-6 font-bold text-center md:text-left mx-2">We believe that knowledge can change the workplace.</p>
        <p className="text-[#364153] font-inter text-[16px] leading-relaxed mb-6">{APP_NAME} was created to address the gap between knowing your rights and actually exercising them. Many employees face workplace violations but don't know how to properly escalate issues, or fear retaliation.</p>
        <p className="text-[#364153] font-inter text-[16px] leading-relaxed mb-6">Our platform combines educational resources, AI-powered guidance, and secure reporting mechanisms to ensure that every voice is heard and every complaint is handled with care and confidentiality.</p>
        <ul className="space-y-3">
          {['Comprehensive rights education', 'Anonymous whistleblowing option', 'Real-time complaint tracking', 'AI-powered guidance & support'].map(item => (
            <li key={item} className="flex items-center gap-2 text-[#364153] text-[16px] font-normal font-inter"><img src={checkmark} alt="Checkmark" className="w-5 h-5 mr-2 ml-2" />{item}</li>
          ))}
        </ul>
      </div>
      <div className="bg-gradient-to-b from-[#1E3A8A] to-[#0f766e] p-10 rounded-3xl text-white shadow-2xl h-auto">
        <h3 className=" font-bold text-[24px] font-poppins mb-4">Our Mission</h3>
        <p className="mb-8 opacity-80 font-inter text-[16px]">To create a workplace culture where employees feel empowered to speak up, knows their rights, and can report violations without fear of retaliation.</p>
        <h3 className=" font-bold text-[24px] font-poppins mb-4">Our Vision</h3>
        <p className="opacity-80 font-inter text-[16px]">A world where workplace rights are rare because employees and emploers alike understand and respect fundamental workplace rights.</p>
      </div>
    </div>
  </section>
);

const Features = () => (
  <section id="features" className="py-24 bg-slate-50">
    <div className="max-w-[1940px] min-h-[290px] mx-auto px-6 text-center">
      <h2 className="text-[48px] font-poppins font-bold mb-12">
        Powerful <span className="text-[#1E3A8A]">Features</span>
      </h2>
      <h3 className="text-[20px] text-gray-500 mb-16 font-inter">
        Everything you need to understand your rights and report violations safely.
      </h3>
      <div className="grid md:grid-cols-3 gap-8">
        {LANDING_FEATURES.map((feature) => {
            const isRed = feature.color === 'red';
            return (
          <div 
            key={feature.id} 
            className="bg-white p-8 rounded-xl border border-slate-300 shadow-lg hover:translate-y-[-5px] transition-all flex flex-col text-left h-full max-w-full group"
          >
            {/* Image Icon Container */}
            <div className={`w-16 h-16 mb-6 flex items-center stroke-slate-200 justify-center overflow-hidden ${isRed ? 'bg-red-600' : 'bg-[#1E3A8A]'} rounded-lg`}>
              <img 
                src={feature.icon} 
                alt={feature.title} 
                className="w-[32px] h-[32px] object-contain group-hover:scale-110 transition-transform duration-300" 
              />
            </div>
            
            <h4 className="font-bold text-[20px] mb-2 font-poppins text-slate-800">
              {feature.title}
            </h4>
            
            <p className="text-[16px] text-gray-500 leading-relaxed font-inter">
              {feature.desc}
            </p>
          </div>
        )
        })}
      </div>
    </div>
  </section>
);

const HowItWorks = () => (
  <section id="how-it-works" className="py-24 bg-white text-center">
    <h2 className="text-[48px] font-bold font-poppins mb-6">How It <span className="text-[#1E3A8A]">Works</span></h2>
    <h3 className="text-[20px] text-gray-500 mb-12 font-inter">Simple steps to get started and make your voice heard.</h3>
    <div className="max-w-[1940px]  mx-2 px-2 grid grid-cols-1 md:grid-cols-4 gap-8">
      {[
        { n: 1, t: 'Sign Up', d: 'Create your account with email verification and complete your profile.' },
        { n: 2, t: 'Learn Your Rights', d: 'Complete the educational dashboard to understand your workplace rights.' },
        { n: 3, t: 'Submit Complaint', d: 'File your complaint with evidence and track internal escalation.' },
        { n: 4, t: 'Track & Resolve', d: 'Monitor progress, receive updates, and provide post-resolution feedback.' }
      ].map(step => (
        <div key={step.n}>
          <div className="w-[64px] h-[64px] bg-gradient-to-b from-[#1e3a8a] to-[#0F766E] text-white rounded-full flex items-center justify-center mx-auto mb-6 font-bold text-[24px]">{step.n}</div>
          <h4 className="font-bold mb-2 text-[20px]">{step.t}</h4>
          <p className="text-gray-500 text-[16px] leading-8 font-inter ">{step.d}</p>
        </div>
      ))}
    </div>
  </section>
);

const CTA = () => {
  const navigate = useNavigate();
  return (
    <section className="py-24 bg-gradient-to-br from-[#1E3A8A] via-[#1E3A8A] to-[#0F766E] text-center text-white">
      <div className=" mx-auto px-6">
        <h2 className="text-[56px] font-bold mb-6 font-poppins leading-tight">
          Ready to Make a Difference?
        </h2>
        <p className="text-[20px] opacity-90 mb-10 font-inter  mx-auto">
          Join FairSay today and be part of a movement towards safer, more respectful workplaces.
        </p>
        <button 
          onClick={() => navigate('/sign-up')}
          className="bg-white text-slate-900 px-8 py-4 rounded-lg font-bold text-lg inline-flex items-center gap-2 hover:bg-gray-100 transition-all shadow-xl"
        >
          Get started 
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="right" />
            <path d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </button>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer id="contacts" className="bg-[#1E3A8A] text-white pt-20 pb-10 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-8 grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
        {/* Brand Info */}
        <div className="space-y-6">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8"><Logo variant="light" /></div>
          </div>
          <p className="text-gray-300 text-sm leading-relaxed max-w-[240px]">
            Empowering employees to speak up with confidence.
          </p>
        </div>

        {/* Links */}
        <div>
          <h4 className="font-bold mb-6 text-lg">Explore</h4>
          <ul className="space-y-4 text-gray-400 text-sm">
            <li><a href="#about" className="hover:text-white transition-colors">About Us</a></li>
            <li><a href="#features" className="hover:text-white transition-colors">Features</a></li>
            <li><a href="#how-it-works" className="hover:text-white transition-colors">How It Works</a></li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="font-bold mb-6 text-lg">Contact</h4>
          <ul className="space-y-4 text-gray-400 text-sm">
            <li>support@fairsay.com</li>
            <li>1-800-FAIRSAY</li>
            <li>Available 24/7</li>
          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <h4 className="font-bold mb-6 text-lg">Newsletter</h4>
          <p className="text-gray-400 text-sm mb-4">Subscribe to stay informed about workplace rights.</p>
          <div className="flex gap-2">
            <input 
              type="email" 
              placeholder="Your email" 
              className="bg-white/10 border border-white/20 rounded-md px-4 py-2 w-full text-sm focus:outline-none focus:border-[#2DD4BF]" 
            />
            <button className="bg-[#0F766E] p-2 rounded-md hover:bg-[#134E4A] transition-colors">
               <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-8 pt-8 border-t border-white/10 flex flex-col md:row justify-between items-center text-xs text-gray-400 gap-4">
        <p>© {new Date().getFullYear()} {APP_NAME}. All rights reserved.</p>
        <div className="flex gap-6">
          <a href="#" className="hover:text-white">Privacy Policy</a>
          <a href="#" className="hover:text-white">Terms of Service</a>
        </div>
      </div>
    </footer>
  );
};

// --- MAIN LANDING PAGE COMPONENT ---

const LandingPage = () => {
  const { user, loading } = useAppContext();
  const navigate = useNavigate();

  // Redirect if already logged in
  useEffect(() => {
    if (!loading && user) navigate('/dashboard');
  }, [user, loading, navigate]);

  if (loading || user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50" />
    );
  }

  return (
    <div>
        <div className="max-w-full max-h-[3873px]">
      <Header />
      <main>
        <Hero />
        <StatsBar />
        <About />
        <Features />
        <HowItWorks />
        <CTA />
      </main>
      <Footer />
    </div>
    </div>
  );
};

export default LandingPage;