"use client";
import { motion } from "framer-motion";

const ManpowerIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 12.25C14.0711 12.25 15.75 10.5711 15.75 8.5C15.75 6.42893 14.0711 4.75 12 4.75C9.92893 4.75 8.25 6.42893 8.25 8.5C8.25 10.5711 9.92893 12.25 12 12.25Z" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M18.6679 19.25C18.6679 16.2165 15.6582 13.75 12.0001 13.75C8.34199 13.75 5.33228 16.2165 5.33228 19.25" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
);

const AmmoIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M13.4999 15.5L15.9999 18L13.4999 20.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M10.5 12.5L13 15L10.5 17.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M7.5 9.5L10 12L7.5 14.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M13.5 6.5L16 9L13.5 11.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M10.5 3.5L13 6L10.5 8.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
);

const RationsIcon = () => (
    <div className="flex items-center justify-center w-6 h-6 rounded-sm border border-white/80">
        <span className="text-xs font-bold text-white/80">MRE</span>
    </div>
);

const PartsIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M19.636 10.364C19.636 8.95462 19.2484 7.57796 18.5218 6.38615L17.6139 4.90028C17.2281 4.25439 16.5925 3.82273 15.8781 3.73801L13.75 3.5M4.36401 13.636C4.36401 15.0454 4.75165 16.422 5.47823 17.6139L6.38612 19.0997C6.77189 19.7456 7.40748 20.1773 8.12193 20.262L10.25 20.5M10.25 3.5H13.75L12 6.5L10.25 3.5ZM10.25 20.5H13.75L12 17.5L10.25 20.5Z" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M10.364 4.36401L3.73803 8.1219C3.02359 8.20662 2.388 8.63828 2.00224 9.28417L1.09435 10.7699C1.09435 10.7699 1.09435 10.7701 1.09435 10.7701C0.367768 11.962 0 13.3385 0 14.7479" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M13.636 19.636L20.262 15.8781C20.9764 15.7934 21.612 15.3617 21.9978 14.7158L22.9057 13.2301C22.9057 13.2301 22.9057 13.2299 22.9057 13.2299C23.6322 12.038 24 10.6615 24 9.25206" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
);

const DiamondIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 1.66602L18.6667 8.33268L12 22.3327L5.33333 8.33268L12 1.66602Z" fill="#2DD4BF" stroke="#2DD4BF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M12 22.3327L5.33333 8.33268L12 8.33268L18.6667 8.33268L12 22.3327Z" fill="#14B8A6"/>
        <path d="M5.33333 8.33268L12 1.66602L12 8.33268L5.33333 8.33268Z" fill="#A7F3D0"/>
        <path d="M18.6667 8.33268L12 1.66602L12 8.33268L18.6667 8.33268Z" fill="#5EEAD4"/>
    </svg>
);

interface ResourceItemProps {
    icon: React.ReactNode;
    value: string;
    rate?: string;
    className?: string;
}

const ResourceItem = ({ icon, value, rate, className = '' }: ResourceItemProps) => {
    return (
        <div className={`flex items-center h-10 bg-black/60 backdrop-blur-sm rounded-md ${className}`}>
            <div className="w-10 h-10 flex items-center justify-center flex-shrink-0">
                {icon}
            </div>
            <div className="flex flex-col items-start justify-center pr-3">
                <span className="text-white text-lg font-semibold leading-none">{value}</span>
                {rate && <span className="text-white/60 text-xs leading-none mt-1">{rate}</span>}
            </div>
        </div>
    );
};

const ResourceSeparator = () => (
    <div className="h-6 w-px bg-white/20 self-center" />
);

const ResourceBar = () => {
  return (
    <motion.div
      className="absolute top-4 right-4 md:top-8 md:right-8 flex items-center space-x-2"
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
    >
        <div className="flex items-center space-x-0.5 bg-black/60 backdrop-blur-sm rounded-md overflow-hidden p-1">
            <ResourceItem icon={<ManpowerIcon />} value="64891" rate="+3/3MIN" className="bg-transparent backdrop-blur-none" />
            <ResourceSeparator />
            <ResourceItem icon={<AmmoIcon />} value="51181" rate="+3/3MIN" className="bg-transparent backdrop-blur-none" />
            <ResourceSeparator />
            <ResourceItem icon={<RationsIcon />} value="22584" rate="+3/3MIN" className="bg-transparent backdrop-blur-none" />
            <ResourceSeparator />
            <ResourceItem icon={<PartsIcon />} value="32350" rate="+1/3MIN" className="bg-transparent backdrop-blur-none" />
        </div>

        <div className="flex items-center h-10 bg-black/60 backdrop-blur-sm rounded-md px-3">
            <DiamondIcon />
            <span className="text-white text-lg font-semibold ml-2">325</span>
            <button className="ml-2 text-white/70 hover:text-white transition-colors text-xl font-light">+</button>
        </div>
    </motion.div>
  );
};

export default ResourceBar;