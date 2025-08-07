"use client";
import { Lock, Bell, AlertCircle } from "lucide-react";
import { motion } from "framer-motion";
import { showToast } from "@/lib/toastMessages";
import type { Translations } from "@/hooks/useTranslations";
import { playerData } from "@/lib/playerData";


const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      delayChildren: 0.5,
      staggerChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, x: 50 },
  visible: { opacity: 1, x: 0 },
};

const MenuItem = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => (
  <motion.div variants={itemVariants} className={className}>
    {children}
  </motion.div>
);

const RightMenu = ({ translations }: { translations: Translations | null }) => {
  if (!translations) return null;

  const handleNotImplemented = () => {
    showToast("notImplemented", translations);
  };

  const handleInsufficientPlans = () => {
    showToast("insufficientPlans", translations);
  }

  return (
    <motion.div
      className="flex flex-col items-end space-y-2"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <MenuItem className="w-[480px] h-16">
        <div className="flex justify-around items-center h-full bg-black/60 backdrop-blur-sm rounded-md px-2">
           <button onClick={handleNotImplemented} className="flex-1 text-center group relative h-full flex flex-col justify-center items-center hover:bg-white/10 transition-colors rounded-l-md">
              <span className="text-xl font-semibold tracking-wider text-white -mb-1">{translations.rightMenu.eligible.main}</span>
              <span className="text-xs text-muted-foreground/80">{translations.rightMenu.eligible.sub}</span>
              <div className="absolute top-4 right-0 h-8 w-px bg-primary/40"></div>
            </button>
            <button onClick={handleNotImplemented} className="flex-1 text-center group relative h-full flex flex-col justify-center items-center hover:bg-white/10 transition-colors">
                <div className="absolute top-4 left-0 h-8 w-px bg-primary/40"></div>
                <span className="text-xl font-semibold tracking-wider text-white -mb-1">{translations.rightMenu.exceptional.main}</span>
                <span className="text-xs text-muted-foreground/80">{translations.rightMenu.exceptional.sub}</span>
                <div className="absolute top-4 right-0 h-8 w-px bg-primary/40"></div>
            </button>
            <button onClick={handleNotImplemented} className="flex-1 text-center group relative h-full flex flex-col justify-center items-center hover:bg-white/10 transition-colors rounded-r-md">
                <div className="absolute top-4 left-0 h-8 w-px bg-primary/40"></div>
                <span className="text-xl font-semibold tracking-wider text-white -mb-1">{translations.rightMenu.teamUp.main}</span>
                <span className="text-xs text-muted-foreground/80">{translations.rightMenu.teamUp.sub}</span>
            </button>
        </div>
      </MenuItem>

      <MenuItem className="w-[480px] h-16">
        <div className="flex items-center h-full space-x-1">
          <button onClick={handleNotImplemented} className="relative h-full flex-1 bg-gray-200/80 text-gray-900 rounded-l-lg flex flex-col items-center justify-center hover:bg-gray-300/80 transition-all duration-200 shadow-sm overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-gray-100/60 via-transparent to-gray-300/40 rounded-l-lg"></div>
            
            <div className="absolute top-0 left-0 w-full h-full opacity-25">
              <div className="absolute top-1 left-1 w-8 h-0.5 bg-gray-400/50 transform rotate-30"></div>
              <div className="absolute top-3 left-3 w-6 h-0.5 bg-gray-400/40 transform -rotate-60"></div>
              <div className="absolute bottom-1 right-1 w-8 h-0.5 bg-gray-400/50 transform -rotate-30"></div>
              <div className="absolute bottom-3 right-3 w-6 h-0.5 bg-gray-400/40 transform rotate-60"></div>
              
              <div className="absolute top-2 right-2 w-2 h-2 bg-gray-500/40 transform rotate-45"></div>
              <div className="absolute bottom-2 left-2 w-2 h-2 bg-gray-500/40 transform -rotate-45"></div>
              <div className="absolute top-1/2 left-1 w-1.5 h-1.5 bg-gray-400/30 transform rotate-15"></div>
              <div className="absolute top-1/2 right-1 w-1.5 h-1.5 bg-gray-400/30 transform -rotate-15"></div>
            </div>
            
            <div className="absolute top-0 right-0 w-5 h-5 bg-gray-500/35 transform rotate-45 origin-bottom-left"></div>
            <div className="absolute bottom-0 left-0 w-5 h-5 bg-gray-500/35 transform -rotate-45 origin-top-right"></div>
            <div className="absolute top-0 left-0 w-3 h-3 bg-gray-400/25 transform rotate-30 origin-bottom-right"></div>
            <div className="absolute bottom-0 right-0 w-3 h-3 bg-gray-400/25 transform -rotate-30 origin-top-left"></div>
            
            {playerData.notifications.resonance.hasNotification && (
              <div className="absolute top-1 left-1 w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
            )}
            
            <div className="relative z-10 text-center">
              <span className="text-xl font-bold tracking-wider text-gray-900 drop-shadow-sm -mb-1">{translations.rightMenu.resonance.main}</span>
              <p className="text-xs text-gray-700 drop-shadow-sm">{translations.rightMenu.resonance.sub}</p>
            </div>
            
            {playerData.notifications.resonance.hasNotification && (
              <div className="absolute bottom-1 left-1 flex items-center gap-1 bg-yellow-200/80 text-yellow-800 px-1.5 py-0.5 rounded text-xs font-semibold shadow-sm">
                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2ZM21 9V7L15 1H5C3.9 1 3 1.9 3 3V21C3 22.1 3.9 23 5 23H19C20.1 23 21 22.1 21 21V9ZM19 21H5V3H13V9H19V21Z"/>
                </svg>
                <span>{playerData.notifications.resonance.count}</span>
              </div>
            )}
          </button>
          
          <button onClick={handleNotImplemented} className="relative h-full flex-1 bg-gray-200/80 text-gray-900 rounded-r-lg flex flex-col items-center justify-center hover:bg-gray-300/80 transition-all duration-200 shadow-sm overflow-hidden">
     
            <div className="absolute inset-0 bg-gradient-to-br from-gray-100/60 via-transparent to-gray-300/40 rounded-r-lg"></div>
            
            <div className="absolute top-0 left-0 w-full h-full opacity-20">
              <div className="absolute top-1 left-1 w-6 h-6 border border-gray-400/40 transform rotate-30"></div>
              <div className="absolute top-2 right-2 w-5 h-5 border border-gray-400/35 transform -rotate-45"></div>
              <div className="absolute bottom-1 left-2 w-4 h-4 border border-gray-400/30 transform rotate-60"></div>
              <div className="absolute bottom-2 right-1 w-7 h-7 border border-gray-400/45 transform -rotate-30"></div>
              
              <div className="absolute top-1/3 left-1 w-2 h-2 bg-gray-500/35 transform rotate-20"></div>
              <div className="absolute top-2/3 right-1 w-1.5 h-1.5 bg-gray-400/30 transform -rotate-40"></div>
              <div className="absolute bottom-1/3 left-1/2 w-2.5 h-2.5 bg-gray-500/40 transform -translate-x-1/2 rotate-15"></div>
            </div>
            
            <div className="absolute top-0 left-1/2 w-4 h-4 bg-gray-500/30 transform -translate-x-1/2 rotate-45"></div>
            <div className="absolute bottom-0 left-1/2 w-4 h-4 bg-gray-500/30 transform -translate-x-1/2 rotate-45"></div>
            <div className="absolute top-1/2 left-0 w-3 h-3 bg-gray-400/25 transform -translate-y-1/2 rotate-30"></div>
            <div className="absolute top-1/2 right-0 w-3 h-3 bg-gray-400/25 transform -translate-y-1/2 -rotate-30"></div>
            
            {playerData.notifications.store.hasNotification && (
              <div className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
            )}
            
            <div className="relative z-10 text-center">
              <span className="text-xl font-bold tracking-wider text-gray-900 drop-shadow-sm -mb-1">{translations.rightMenu.store.main}</span>
              <p className="text-xs text-gray-700 drop-shadow-sm">{translations.rightMenu.store.sub}</p>
            </div>
            
            {playerData.notifications.store.hasNotification && (
              <div className="absolute bottom-1 right-1 flex items-center gap-1 bg-yellow-200/80 text-yellow-800 px-1.5 py-0.5 rounded text-xs font-semibold shadow-sm">
                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2ZM21 9V7L15 1H5C3.9 1 3 1.9 3 3V21C3 22.1 3.9 23 5 23H19C20.1 23 21 22.1 21 21V9ZM19 21H5V3H13V9H19V21Z"/>
                </svg>
                <span>{playerData.notifications.store.count}</span>
              </div>
            )}
          </button>
        </div>
      </MenuItem>
      
      <MenuItem className="w-[480px] h-16">
        <div className="flex items-center h-full space-x-1">
          <button onClick={handleNotImplemented} className="relative h-full flex-[1.5] bg-neutral-200/90 text-black p-2 rounded-l-md flex items-center justify-center hover:bg-neutral-200/100 transition-colors">
              <svg className="absolute inset-0 w-full h-full text-black/5" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path d="M227.42,64H0V0H174.32L227.42,64Z" />
                <path d="M21.14,28.69,34.88,4.2a7,7,0,0,0-6.06-10.5H17a7,7,0,0,0-6.06,3.5L-8.82,28.69" transform="translate(25.18 15.31)" fill="black" opacity="0.07"/>
              </svg>
             
             {playerData.notifications.task.hasNotification && (
               <div className="absolute top-1 left-1 w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
             )}
             
             <div className="relative text-center">
                <span className="text-xl font-bold tracking-wider -mb-1">{translations.rightMenu.task.main}</span>
                <p className="text-xs font-semibold text-black/60">{translations.rightMenu.task.sub}</p>
              </div>
              {playerData.notifications.task.hasNotification && (
                <div className="absolute bottom-1 left-2 flex items-center gap-1 bg-yellow-200/80 text-yellow-800 px-1.5 py-0.5 rounded text-xs font-semibold shadow-sm">
                  <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2ZM21 9V7L15 1H5C3.9 1 3 1.9 3 3V21C3 22.1 3.9 23 5 23H19C20.1 23 21 22.1 21 21V9ZM19 21H5V3H13V9H19V21Z"/>
                  </svg>
                  <span>{playerData.notifications.task.count}</span>
                </div>
              )}
          </button>
          <button 
            className="relative h-full flex-1 bg-black/70 backdrop-blur-sm text-white p-2 flex items-center justify-center flex-col cursor-pointer transition-colors hover:bg-red-500/20"
            onClick={handleInsufficientPlans}
          >
            <Lock className="w-6 h-6" />
            <p className="text-xs font-semibold text-white/70 mt-1">{translations.rightMenu.notActive}</p>
          </button>
          <button onClick={handleNotImplemented} className="relative h-full flex-1 bg-black/70 backdrop-blur-sm text-white p-2 rounded-r-md flex items-center justify-center hover:bg-white/10 transition-colors">
             <svg className="absolute inset-0 w-full h-full text-white/5" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path d="M0,0H119.58V64H0L53.1,0Z" />
              </svg>
            <div className="relative text-center">
                <span className="text-xl font-bold tracking-wider">{translations.rightMenu.depot.main}</span>
                <p className="text-xs font-semibold text-white/70">{translations.rightMenu.depot.sub}</p>
            </div>
          </button>
        </div>
      </MenuItem>

    </motion.div>
  );
};

export default RightMenu;
