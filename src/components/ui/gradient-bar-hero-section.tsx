import React, { useState } from 'react';
import { Github, Instagram, Linkedin } from 'lucide-react';
import { cn } from '@/lib/utils';
import { supabase } from '@/lib/supabase';



const WaitlistForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email.trim()) {
      setMessage('Please enter a valid email address');
      setIsSuccess(false);
      return;
    }

    setIsSubmitting(true);
    setMessage('');
    
    console.log('Submitting email:', email); // Debug log

    try {
      const { data, error } = await supabase
        .from('waitlist')
        .insert([{ email: email.trim().toLowerCase() }]);

      console.log('Supabase response:', { data, error }); // Debug log

      if (error) {
        if (error.code === '23505') { // Unique constraint violation
          setMessage('You\'re already on the waitlist!');
          setIsSuccess(true);
        } else {
          setMessage('Something went wrong. Please try again.');
          setIsSuccess(false);
        }
      } else {
        setMessage('Successfully joined the waitlist!');
        setIsSuccess(true);
        setEmail('');
      }
    } catch (error) {
      console.error('Error joining waitlist:', error);
      setMessage('Something went wrong. Please try again.');
      setIsSuccess(false);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="relative z-10 w-full">
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter Your Email"
          disabled={isSubmitting}
          className={cn(
            "flex-1 px-8 py-4 sm:py-5 rounded-full bg-gray-900/60 border border-gray-700 focus:border-white outline-none text-white text-base sm:text-lg shadow-[0_0_15px_rgba(0,0,0,0.3)] backdrop-blur-sm transition-all duration-300 font-space",
            isSubmitting && "opacity-50 cursor-not-allowed"
          )}
          required
        />
        <button
          type="submit"
          disabled={isSubmitting || !email.trim()}
          className={cn(
            "px-6 sm:px-8 py-3 sm:py-4 rounded-full transition-all duration-300 transform hover:scale-105 whitespace-nowrap text-sm sm:text-base",
            (isSubmitting || !email.trim())
              ? "bg-gray-600 text-gray-300 cursor-not-allowed hover:scale-100" 
              : "bg-white hover:bg-gray-100 text-black"
          )}
        >
          {isSubmitting ? 'Joining...' : 'Join The Waitlist'}
        </button>
      </form>
      
      {message && (
        <div className={cn(
          "mt-4 text-center text-sm font-medium animate-fadeIn",
          isSuccess ? "text-green-400" : "text-red-400"
        )}>
          {message}
        </div>
      )}
    </div>
  );
};

const GradientBars: React.FC = () => {
  const [numBars] = useState(15);

  const calculateHeight = (index: number, total: number) => {
    const position = index / (total - 1);
    const maxHeight = 100;
    const minHeight = 30;
    
    const center = 0.5;
    const distanceFromCenter = Math.abs(position - center);
    const heightPercentage = Math.pow(distanceFromCenter * 2, 1.2);
    
    return minHeight + (maxHeight - minHeight) * heightPercentage;
  };

  return (
    <div className="absolute inset-0 z-0 overflow-hidden">
      <div 
        className="flex h-full"
        style={{
          width: '100%',
          transform: 'translateZ(0)',
          backfaceVisibility: 'hidden',
          WebkitFontSmoothing: 'antialiased',
        }}
      >
        {Array.from({ length: numBars }).map((_, index) => {
          const height = calculateHeight(index, numBars);
          return (
            <div
              key={index}
              style={{
                flex: '1 0 calc(100% / 15)',
                maxWidth: 'calc(100% / 15)',
                height: '100%',
                background: 'linear-gradient(to top, rgb(255, 60, 0), transparent)',
                transform: `scaleY(${height / 100})`,
                transformOrigin: 'bottom',
                transition: 'transform 0.5s ease-in-out',
                animation: 'pulseBar 2s ease-in-out infinite alternate',
                animationDelay: `${index * 0.1}s`,
                outline: '1px solid rgba(0, 0, 0, 0)',
                boxSizing: 'border-box',
              }}
            />
          );
        })}
      </div>
    </div>
  );
};

const Navbar: React.FC = () => {

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-transparent py-6 px-6 md:px-12">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <span className="text-white font-bold text-xl tracking-tighter">
              Dirac
            </span>
          </div>




        </div>

        </div>
    </nav>
  );
};

export const GradientBarHeroSection: React.FC = () => {
  return (
    <section className="relative w-full h-screen flex flex-col items-center overflow-hidden">
      <div className="absolute inset-0 bg-gray-950"></div>
      <GradientBars />
      <Navbar />
      
      <div className="relative z-10 text-center w-full max-w-6xl mx-auto flex flex-col items-center justify-center h-full px-6 sm:px-8 md:px-12">
        <h1 className="w-full text-white leading-tight tracking-tight mb-8 sm:mb-12 animate-fadeIn">
          <span className="block font-inter font-bold text-[clamp(2rem,8vw,5rem)] whitespace-nowrap">
            F*ck Assignments.
          </span>
        </h1>
        
        <div className="mb-10 sm:mb-16 max-w-3xl">
          <p className="text-[clamp(1rem,3vw,1.5rem)] text-gray-400 leading-relaxed animate-fadeIn animation-delay-200">
            Meet your AI ghostwriter. Undetectable.
          </p>
        </div>
        
        <div className="w-full max-w-3xl mb-12 sm:mb-16">
          <WaitlistForm />
        </div>
        
        <div className="flex justify-center space-x-8">
          <a href="#" className="text-gray-500 hover:text-gray-300 transition-colors duration-300 transform hover:scale-110">
            <Instagram size={24} className="w-6 h-6" />
          </a>
          <a href="#" className="text-gray-500 hover:text-gray-300 transition-colors duration-300 transform hover:scale-110">
            <Linkedin size={24} className="w-6 h-6" />
          </a>
          <a href="#" className="text-gray-500 hover:text-gray-300 transition-colors duration-300 transform hover:scale-110">
            <Github size={24} className="w-6 h-6" />
          </a>
        </div>
      </div>
    </section>
  );
};