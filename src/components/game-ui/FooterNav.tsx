
"use client";
import { Users, Calendar, CalendarDays } from "lucide-react";
import { motion } from "framer-motion";
import type { Translations } from "@/hooks/useTranslations";

const NavItem = ({ icon, text, subtext }: { icon: React.ReactNode; text: string; subtext: string }) => (
  <motion.button 
    className="flex items-center gap-3 bg-black/40 backdrop-blur-sm p-2 rounded-md border border-white/20 hover:bg-primary/20 transition-colors"
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
  >
    {icon}
    <div>
      <p className="font-semibold">{text}</p>
      <p className="text-xs text-muted-foreground">{subtext}</p>
    </div>
  </motion.button>
);

const FooterNav = ({ translations }: { translations: Translations | null }) => {
  if (!translations) return null;

  return (
    <motion.div 
      className="absolute bottom-24 left-4 md:bottom-28 md:left-8 flex items-center space-x-4"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.8, staggerChildren: 0.1 }}
    >
      <NavItem icon={<Users className="w-8 h-8 text-primary" />} text={translations.footer.friends.main} subtext={translations.footer.friends.sub} />
      <NavItem icon={<Calendar className="w-8 h-8 text-primary" />} text={translations.footer.schedule.main} subtext={translations.footer.schedule.sub} />
      <NavItem icon={<CalendarDays className="w-8 h-8 text-primary" />} text={translations.footer.events.main} subtext={translations.footer.events.sub} />
    </motion.div>
  );
};

export default FooterNav;
