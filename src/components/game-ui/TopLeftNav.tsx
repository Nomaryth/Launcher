"use client";
import { Settings, Mail, FileText } from "lucide-react";
import { motion } from "framer-motion";
import { showToast } from "@/lib/toastMessages";
import Link from "next/link";
import type { Translations } from "@/hooks/useTranslations";


interface TopLeftNavProps {
  onSettingsClick: () => void;
  translations: Translations | null;
}

const NavButton = ({
  icon,
  tooltip,
  onClick,
  children,
  href,
}: {
  icon?: React.ReactNode;
  tooltip: string;
  onClick?: () => void;
  children?: ((content: React.ReactNode) => React.ReactNode) | React.ReactNode;
  href?: string;
}) => {
  const handleClick = onClick || (() => showToast("notImplemented"));

  const buttonContent = (
    <motion.button
      onClick={handleClick}
      whileHover={{ scale: 1.1, backgroundColor: "hsl(var(--primary) / 0.1)" }}
      whileTap={{ scale: 0.95 }}
      className="p-2 rounded-md bg-zinc-900/40 backdrop-blur-md border border-white/10 text-white/70 hover:text-white"
      title={tooltip}
    >
      {icon}
    </motion.button>
  );

  const content = typeof children === 'function' ? children(buttonContent) : (children || buttonContent);

  if (href) {
    return <Link href={href}>{content}</Link>;
  }

  return content;
};

const TopLeftNav = ({ onSettingsClick, translations }: TopLeftNavProps) => {
  if (!translations) return null;

  const itemVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0 },
  };

  const handleNotImplemented = () => {
    showToast("notImplemented", translations);
  };

  return (
    <motion.div
      className="flex flex-col items-start space-y-2"
      initial="hidden"
      animate="visible"
      transition={{ duration: 0.5, delay: 0.3, staggerChildren: 0.1 }}
    >
      <motion.div variants={itemVariants}>
        <NavButton icon={<Settings size={20} />} tooltip={translations.topLeftNav.settings} onClick={onSettingsClick} />
      </motion.div>
      <motion.div variants={itemVariants}>
        <NavButton icon={<Mail size={20} />} tooltip={translations.topLeftNav.email} onClick={handleNotImplemented}/>
      </motion.div>
      <motion.div variants={itemVariants}>
        <NavButton icon={<FileText size={20} />} tooltip={translations.topLeftNav.patchNotes} onClick={handleNotImplemented}/>
      </motion.div>
    </motion.div>
  );
};

export default TopLeftNav;
