import React, { useState, useEffect } from 'react';
import './MobileView.css';

/**
 * MobileView Component
 * 
 * A responsive portfolio component that displays a complete personal portfolio website
 * with dark mode support, mobile navigation menu, and multiple sections.
 * 
 * Features:
 * - Dark mode toggle with localStorage persistence and system preference detection
 * - Dynamic mobile.css stylesheet loading and cleanup
 * - Sticky navbar with scroll detection and backdrop blur effect
 * - Mobile-optimized hamburger menu with smooth transitions
 * - Hero section with profile information and call-to-action buttons
 * - About section with skills, tools, and technologies
 * - Work/Portfolio section showcasing projects and achievements
 * - Contact form with mailto integration
 * - Footer with social links and contact information
 * 
 * State:
 * @state {boolean} darkMode - Tracks dark mode status
 * @state {boolean} menuOpen - Tracks mobile menu visibility
 * @state {boolean} navbarScrolled - Tracks navbar scroll state for styling changes
 * 
 * Effects:
 * - Initializes theme preference and loads mobile.css on mount
 * - Attaches scroll listener for navbar visual feedback
 * - Cleans up stylesheet and event listeners on unmount
 * 
 * Assets:
 * All image and stylesheet assets are located in the public/mobile-assets/ directory
 * and referenced via process.env.PUBLIC_URL for proper build-time path resolution.
 * The mobile.css is dynamically injected to avoid conflicts with desktop styles.
 * 
 * @component
 * @returns {JSX.Element} The complete portfolio view
 */
const MobileView = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [navbarScrolled, setNavbarScrolled] = useState(false);
  const [formStatus, setFormStatus] = useState('idle'); // idle, submitting, success, error

  useEffect(() => {
    // Load mobile.css dynamically
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = `${process.env.PUBLIC_URL}/mobile.css`;
    link.id = 'mobile-tailwind-css';
    document.head.appendChild(link);

    // Check for saved theme preference or system preference
    if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      setDarkMode(true);
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }

    // Cleanup function to remove mobile.css when component unmounts
    return () => {
      const mobileCss = document.getElementById('mobile-tailwind-css');
      if (mobileCss) {
        document.head.removeChild(mobileCss);
      }
    };
  }, []);

  useEffect(() => {

    // Navbar scroll effect
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setNavbarScrolled(true);
      } else {
        setNavbarScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleTheme = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    document.documentElement.classList.toggle('dark');
    localStorage.theme = newDarkMode ? 'dark' : 'light';
  };

  const openMenu = () => setMenuOpen(true);
  const closeMenu = () => setMenuOpen(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormStatus('submitting');
    
    const form = e.target;
    const formData = new FormData(form);
    
    try {
      const response = await fetch('https://formspree.io/f/mnjbvkbe', {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      });
      
      if (response.ok) {
        setFormStatus('success');
        form.reset();
        setTimeout(() => setFormStatus('idle'), 5000); // Reset after 5 seconds
      } else {
        setFormStatus('error');
        setTimeout(() => setFormStatus('idle'), 5000);
      }
    } catch (error) {
      setFormStatus('error');
      setTimeout(() => setFormStatus('idle'), 5000);
    }
  };

  return (
    <div className="font-Outfit leading-8 dark:bg-darkTheme dark:text-white">
      {/* Header Background */}
      <div className="fixed top-0 right-0 w-11/12 -z-10 translate-y-[-80%] dark:hidden">
        <img src={require('../assets/mobile/header-bg-color.png')} alt="" className="w-full" />
      </div>

      {/* Navbar */}
      <nav id="navbar" className={`w-full fixed px-5 lg:px-8 xl:px-[8%] py-4 flex items-center justify-between z-50 ${navbarScrolled ? 'bg-white bg-opacity-50 backdrop-blur-lg shadow-sm dark:bg-darkTheme dark:shadow-white/20' : ''}`}>
        <p className="bg-white bg-opacity-50 backdrop-blur-lg shadow-sm dark:bg-darkTheme dark:shadow-white/20 sr-only">Hidden</p>
        <a href="#top" className="cursor-pointer mr-14 flex items-baseline font-bold text-xl sm:text-2xl lg:text-[1.75rem] uppercase text-gray-900 dark:text-white tracking-tight font-['Montserrat']">
          NK
        </a>

        <ul id="navLink" className={`hidden md:flex items-center gap-6 lg:gap-8 rounded-full px-12 py-3 shadow-sm bg-opacity-50 font-Ovo dark:border dark:border-white/30 dark:bg-transparent ${navbarScrolled ? '' : 'bg-white'}`}>
          <li><a className='hover:text-gray-500 dark:hover:text-gray-300 transition' href="#top">Home</a></li>
          <li><a className='hover:text-gray-500 dark:hover:text-gray-300 transition' href="#about">About me</a></li>
          <li><a className='hover:text-gray-500 dark:hover:text-gray-300 transition' href="#services">Services</a></li>
          <li><a className='hover:text-gray-500 dark:hover:text-gray-300 transition' href="#work">My Work</a></li>
          <li><a className='hover:text-gray-500 dark:hover:text-gray-300 transition' href="#contact">Contact me</a></li>
        </ul>

        <div className="flex items-center gap-4">
          <button onClick={toggleTheme}>
            <img src={require('../assets/mobile/moon_icon.png')} alt="" className="w-5 dark:hidden" />
            <img src={require('../assets/mobile/sun_icon.png')} alt="" className="w-5 hidden dark:block" />
          </button>

          <a href="#contact" className="hidden lg:flex items-center gap-3 px-8 py-1.5 border border-gray-300 hover:bg-slate-100/70 dark:hover:bg-darkHover rounded-full ml-4 font-Ovo dark:border-white/30">
            Contact
            <img src={require('../assets/mobile/arrow-icon.png')} alt="" className="w-3 dark:hidden" />
            <img src={require('../assets/mobile/arrow-icon-dark.png')} alt="" className="w-3 hidden dark:block" />
          </a>

          <button className="block md:hidden ml-3" onClick={openMenu}>
            <img src={require('../assets/mobile/menu-black.png')} alt="" className="w-6 dark:hidden" />
            <img src={require('../assets/mobile/menu-white.png')} alt="" className="w-6 hidden dark:block" />
          </button>
        </div>

        {/* Mobile menu */}
        <ul id="mobileMenu" className={`flex md:hidden flex-col gap-4 py-20 px-10 fixed ${menuOpen ? 'right-0' : '-right-64'} top-0 bottom-0 w-64 z-50 h-screen bg-rose-50 transition duration-500 font-Ovo dark:bg-darkHover dark:text-white`}>
          <div className="absolute right-6 top-6" onClick={closeMenu}>
            <img src={require('../assets/mobile/close-black.png')} alt="" className="w-5 cursor-pointer dark:hidden" />
            <img src={require('../assets/mobile/close-white.png')} alt="" className="w-5 cursor-pointer hidden dark:block" />
          </div>

          <li><a href="#top" onClick={closeMenu}>Home</a></li>
          <li><a href="#about" onClick={closeMenu}>About me</a></li>
          <li><a href="#services" onClick={closeMenu}>Services</a></li>
          <li><a href="#work" onClick={closeMenu}>My Work</a></li>
          <li><a href="#contact" onClick={closeMenu}>Contact me</a></li>
        </ul>
      </nav>

      {/* Hero section */}
      <div id="top" className="w-11/12 max-w-3xl text-center mx-auto h-screen flex flex-col items-center justify-center gap-4">
        <img src={require('../assets/mobile/hero-profile.png')} alt="Naveen Kumar S" className="rounded-full w-32 aspect-square object-cover" />
        <h3 className="flex items-end gap-2 text-xl md:text-2xl mb-3 font-Ovo">
          Hi! I'm Naveen Kumar S
          <img src={require('../assets/mobile/hand-icon.png')} alt="" className="w-6 mb-1" />
        </h3>
        <h1 className="text-3xl sm:text-6xl lg:text-[66px] font-Ovo">Software Engineer — Full Stack & AI Systems Development</h1>
        <p className="max-w-2xl mx-auto font-Ovo text-xl sm:text-2xl">Building production-ready applications powered by AI/ML technologies. Delivering intelligent systems that solve real-world challenges and drive impactful results.</p>

        <div className="flex flex-col sm:flex-row items-center gap-4 mt-4">
          <a href="#contact" className="px-10 py-2.5 border rounded-full bg-gradient-to-r from-[#b820e6] to-[#da7d20] text-white flex items-center gap-2 dark:border-transparent">
            contact me <img src={require('../assets/mobile/right-arrow-white.png')} alt="" className="w-4" />
          </a>

          <a href={`${process.env.PUBLIC_URL}/Naveen-Kumar-S.pdf`} download className="px-10 py-2.5 rounded-full border border-gray-300 dark:border-white/25 hover:bg-slate-100/70 dark:hover:bg-darkHover flex items-center gap-2 bg-white dark:bg-transparent dark:text-white">
            my resume <img src={require('../assets/mobile/download-icon.png')} alt="" className="w-4 dark:invert" />
          </a>
        </div>
      </div>

      {/* About me section */}
      <div id="about" className="w-full px-[12%] py-10 scroll-mt-20 bg-slate-50 dark:bg-slate-900/20">
        <h4 className="text-center mb-2 text-lg font-Ovo text-gray-500 dark:text-gray-400">Introduction</h4>
        <h2 className="text-center text-5xl font-Ovo mb-4">About Naveen</h2>
        <div className="w-20 h-1 bg-gradient-to-r from-[#b820e6] to-[#da7d20] mx-auto mb-16"></div>
        <div className="flex w-full flex-col lg:flex-row items-center gap-20 my-10">
          <div className="max-w-max mx-auto relative">
            <img src={require('../assets/mobile/about.png')} alt="Naveen Kumar" className="w-64 sm:w-80 rounded-3xl max-w-none" />
          
          </div>
          <div className="flex-1">
            <p className="mb-10 max-w-2xl font-Ovo leading-relaxed">Software Engineer (M.Tech Software Engineering) with extensive experience in building AI-powered full-stack applications. Specialized in developing production-ready solutions using RAG pipelines, LLMs, and modern frameworks including React, Next.js, Flutter, Express.js, and FastAPI.</p>
            <ul className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-2xl">
              <li className="border border-gray-300 dark:border-white/30 rounded-xl p-6 cursor-pointer hover:bg-lightHover hover:-translate-y-1 duration-500 hover:shadow-black dark:hover:shadow-white/80 dark:hover:bg-darkHover/50">
                <img src={require('../assets/mobile/code-icon.png')} alt="" className="w-7 mt-3 dark:hidden" />
                <img src={require('../assets/mobile/code-icon-dark.png')} alt="" className="w-7 mt-3 hidden dark:block" />
                <h3 className="my-4 font-semibold text-gray-700 dark:text-white">Full Stack Development</h3>
                <p className="text-gray-600 text-sm dark:text-white/80">Building complete web applications with React, Express.js, and modern frameworks.</p>
              </li>
              <li className="border border-gray-300 dark:border-white/30 rounded-xl p-6 cursor-pointer hover:bg-lightHover hover:-translate-y-1 duration-500 hover:shadow-black dark:hover:shadow-white/80 dark:hover:bg-darkHover/50">
                <img src={require('../assets/mobile/edu-icon.png')} alt="" className="w-7 mt-3 dark:hidden" />
                <img src={require('../assets/mobile/edu-icon-dark.png')} alt="" className="w-7 mt-3 hidden dark:block" />
                <h3 className="my-4 font-semibold text-gray-700 dark:text-white">AI/ML Enthusiast</h3>
                <p className="text-gray-600 text-sm dark:text-white/80">Creating intelligent systems with TensorFlow, Scikit-learn, and Google Vertex AI.</p>
              </li>
              <li className="border border-gray-300 dark:border-white/30 rounded-xl p-6 cursor-pointer hover:bg-lightHover hover:-translate-y-1 duration-500 hover:shadow-black dark:hover:shadow-white/80 dark:hover:bg-darkHover/50">
                <img src={require('../assets/mobile/project-icon.png')} alt="" className="w-7 mt-3 dark:hidden" />
                <img src={require('../assets/mobile/project-icon-dark.png')} alt="" className="w-7 mt-3 hidden dark:block" />
                <h3 className="my-4 font-semibold text-gray-700 dark:text-white">Growth & Learning</h3>
                <p className="text-gray-600 text-sm dark:text-white/80">I value personal and professional growth, thus I enjoy taking on projects that help me learn and explore new technologies.</p>
              </li>
            </ul>
            <h4 className="my-6 text-gray-700 font-Ovo dark:text-white/80">Tools & technologies</h4>
            <ul className="flex items-center gap-3 sm:gap-5">
              <li className="flex items-center justify-center w-12 sm:w-14 aspect-square border border-gray-300 dark:border-white/30 rounded-lg cursor-pointer hover:-translate-y-1 duration-500">
                <img src={require('../assets/mobile/vscode.png')} alt="vscode" className="w-5 sm:w-7" />
              </li>
              <li className="flex items-center justify-center w-12 sm:w-14 aspect-square border border-gray-300 dark:border-white/30 rounded-lg cursor-pointer hover:-translate-y-1 duration-500">
                <img src={require('../assets/mobile/firebase.png')} alt="firebase" className="w-5 sm:w-7" />
              </li>
              <li className="flex items-center justify-center w-12 sm:w-14 aspect-square border border-gray-300 dark:border-white/30 rounded-lg cursor-pointer hover:-translate-y-1 duration-500">
                <img src={require('../assets/mobile/mongodb.png')} alt="mongodb" className="w-5 sm:w-7" />
              </li>
              <li className="flex items-center justify-center w-12 sm:w-14 aspect-square border border-gray-300 dark:border-white/30 rounded-lg cursor-pointer hover:-translate-y-1 duration-500">
                <img src={require('../assets/mobile/figma.png')} alt="figma" className="w-5 sm:w-7" />
              </li>
              <li className="flex items-center justify-center w-12 sm:w-14 aspect-square border border-gray-300 dark:border-white/30 rounded-lg cursor-pointer hover:-translate-y-1 duration-500">
                <img src={require('../assets/mobile/git.png')} alt="git" className="w-5 sm:w-7" />
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* My Work Section */}
      <div id="work" className="w-full px-[12%] py-10 scroll-mt-20">
        <h4 className="text-center mb-2 text-lg font-Ovo">My portfolio</h4>
        <h2 className="text-center text-5xl font-Ovo">My latest work</h2>
        <p className="text-center max-w-2xl mx-auto mt-5 mb-12 font-Ovo">Projects in full-stack development, machine learning, and AI-powered applications.</p>
        <div className="grid grid-cols-auto my-10 gap-5 dark:text-black">
          {[
            { img: 'work-1.png', title: 'Happiness Predictor', desc: 'ML website for global happiness analysis & predictions', link: 'https://happinesspredictor.pythonanywhere.com/' },
            { img: 'work-2.png', title: 'Inquisitive AI', desc: 'Multi-language question generator with Google Generative AI', link: 'https://inquisitive.streamlit.app' },
            { img: 'work-3.png', title: 'Inventory Management', desc: 'Full-stack MERN app with sales tracking & billing', link: 'https://inventory-management-mern.vercel.app' },
            { img: 'work-4.png', title: 'ChatGenie', desc: 'AI-powered chatbot with GPT-3 integration', link: 'https://github.com/naveenkumarsekar-dev/chatbot-project' }
          ].map((work, idx) => (
            <a key={idx} href={work.link} target="_blank" rel="noopener noreferrer" className="aspect-square bg-no-repeat bg-cover bg-center rounded-lg relative cursor-pointer group" style={{ backgroundImage: `url(${require('../assets/mobile/' + work.img)})` }}>
              <div className="bg-white w-10/12 rounded-md absolute bottom-5 left-1/2 -translate-x-1/2 py-3 px-5 flex items-center justify-between duration-500 group-hover:bottom-7">
                <div>
                  <h2 className="font-semibold">{work.title}</h2>
                  <p className="text-sm text-gray-700">{work.desc}</p>
                </div>
                <div className="border rounded-full border-black w-9 aspect-square flex items-center justify-center shadow-[2px_2px_0_#000] group-hover:bg-lime-300 transition">
                  <img src={require('../assets/mobile/send-icon.png')} alt="" className="w-5" />
                </div>
              </div>
            </a>
          ))}
        </div>
        <a href="#top" className="w-max flex items-center justify-center gap-2 text-gray-700 border border-gray-300 dark:border-white/25 hover:bg-slate-100/70 dark:hover:bg-darkHover rounded-full py-2 px-8 mx-auto my-20 duration-300 dark:text-white">
          Download resume
          <img src={require('../assets/mobile/right-arrow-bold.png')} alt="" className="w-4 dark:hidden" />
          <img src={require('../assets/mobile/right-arrow-bold-dark.png')} alt="" className="w-4 hidden dark:block" />
        </a>
      </div>

      {/* Contact me section */}
      <div id="contact" className="w-full px-[12%] py-10 scroll-mt-20 dark:bg-none" style={{ backgroundImage: darkMode ? 'none' : `url(${require('../assets/mobile/footer-bg-color.png')})`, backgroundRepeat: 'no-repeat', backgroundSize: '90% auto', backgroundPosition: 'center' }}>
        <h4 className="text-center mb-2 text-lg font-Ovo">Connect with me</h4>
        <h2 className="text-center text-5xl font-Ovo">Get in touch</h2>
        <p className="text-center max-w-2xl mx-auto mt-5 mb-12 font-Ovo">Questions or opportunities? Drop a message below.</p>
        
        {formStatus === 'success' && (
          <div className="max-w-2xl mx-auto mb-8 p-4 rounded-lg bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/30 dark:to-emerald-900/30 border border-green-200 dark:border-green-700 animate-fade-in">
            <div className="flex items-center gap-3">
              <div className="flex-shrink-0 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-green-800 dark:text-green-200">Message sent successfully!</h3>
                <p className="text-sm text-green-700 dark:text-green-300">Thank you for reaching out. I'll get back to you soon.</p>
              </div>
            </div>
          </div>
        )}
        
        {formStatus === 'error' && (
          <div className="max-w-2xl mx-auto mb-8 p-4 rounded-lg bg-gradient-to-r from-red-50 to-rose-50 dark:from-red-900/30 dark:to-rose-900/30 border border-red-200 dark:border-red-700 animate-fade-in">
            <div className="flex items-center gap-3">
              <div className="flex-shrink-0 w-8 h-8 bg-red-500 rounded-full flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-red-800 dark:text-red-200">Something went wrong</h3>
                <p className="text-sm text-red-700 dark:text-red-300">Please try again or email me directly.</p>
              </div>
            </div>
          </div>
        )}
        
        <form id="contactForm" className="max-w-2xl mx-auto" onSubmit={handleSubmit}>
          <div className="grid grid-cols-auto gap-6 mt-10 mb-8">
            <input type="text" placeholder="Your name" className="flex-1 px-3 py-2 focus:ring-1 outline-none border border-gray-300 dark:border-white/30 rounded-md bg-white dark:bg-darkHover/30" required name="fullname" />
            <input type="email" placeholder="Your email" className="flex-1 px-3 py-2 focus:ring-1 outline-none border border-gray-300 dark:border-white/30 rounded-md bg-white dark:bg-darkHover/30" required name="email" />
          </div>
          <textarea rows="6" placeholder="Your message" className="w-full px-4 py-2 focus:ring-1 outline-none border border-gray-300 dark:border-white/30 rounded-md bg-white mb-6 dark:bg-darkHover/30" required name="message_content"></textarea>
          <button type="submit" disabled={formStatus === 'submitting'} className="py-2 px-8 w-max flex items-center justify-between gap-2 bg-black/80 text-white rounded-full mx-auto hover:bg-black duration-500 dark:bg-transparent dark:border dark:border-white/30 dark:hover:bg-darkHover disabled:opacity-50 disabled:cursor-not-allowed">
            {formStatus === 'submitting' ? 'Sending...' : 'Send message'}
            <img src={require('../assets/mobile/right-arrow-white.png')} alt="" className="w-4" />
          </button>
        </form>
      </div>

      {/* Footer */}
      <div className="mt-20">
        <div className="text-center">
          <a href="#top" className="inline-flex items-baseline font-bold text-3xl uppercase text-gray-900 dark:text-white mb-2 font-['Montserrat']">
            Naveen Kumar S
          </a>  
          <div className="w-max flex items-center gap-2 mx-auto">
            <img src={require('../assets/mobile/mail_icon.png')} alt="" className="w-5 dark:hidden" />
            <img src={require('../assets/mobile/mail_icon_dark.png')} alt="" className="w-5 hidden dark:block" />
            <a href="mailto:naveenkumar.s2020a@gmail.com">naveenkumar.s2020a@gmail.com</a>
          </div>
        </div>
        <div className="text-center sm:flex sm:flex-row sm:items-center sm:justify-between border-t border-gray-400 mx-[10%] mt-12 py-6">
          <p className="text-sm sm:text-base">© 2026 Naveen Kumar S. All rights reserved.</p> 
          <ul className="flex items-center gap-6 sm:gap-10 justify-center mt-4 sm:mt-0">
            <li><a target="_blank" rel="noopener noreferrer" href="https://github.com/naveenkumarsekar-dev" className="hover:text-[#b820e6] transition">GitHub</a></li>
            <li><a target="_blank" rel="noopener noreferrer" href="https://www.linkedin.com/in/naveen-kumar-s-42a8b0314/" className="hover:text-[#b820e6] transition">LinkedIn</a></li>
            <li><a target="_blank" rel="noopener noreferrer" href="https://leetcode.com/u/naveenkumar____/" className="hover:text-[#b820e6] transition">LeetCode</a></li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default MobileView;
