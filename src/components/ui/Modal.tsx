import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  subtitle?: string;
  children: React.ReactNode;
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl';
  className?: string;
  bodyClassName?: string;
  hideCloseButton?: boolean;
  noPadding?: boolean;
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  subtitle,
  children,
  maxWidth = '2xl',
  className,
  bodyClassName,
  hideCloseButton = false,
  noPadding = false,
}) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Lock body & html scroll when modal is open
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    }
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    };
  }, [isOpen, onClose]);

  const maxWidthClasses = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl',
    '2xl': 'max-w-2xl',
    '3xl': 'max-w-3xl',
    '4xl': 'max-w-4xl',
  };

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
          {/* Full Screen Dimmed Backdrop with silky blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            onClick={onClose}
            className="fixed inset-0 bg-obsidian-950/85 backdrop-blur-md cursor-pointer"
          />

          {/* Modal Content Box */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 10 }}
            transition={{
              type: 'spring',
              damping: 28,
              stiffness: 350,
              mass: 0.8,
            }}
            className={cn(
              'relative w-full bg-charcoal-900 border border-gold-500/30 rounded-3xl shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9)] overflow-hidden z-10 my-auto transform-gpu will-change-transform',
              maxWidthClasses[maxWidth],
              className
            )}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header if title exists */}
            {(title || (!hideCloseButton && !noPadding)) && (
              <div className="flex items-start justify-between p-6 sm:p-7 border-b border-white/5 bg-charcoal-800/40">
                {title && (
                  <div>
                    <h3 className="text-xl sm:text-2xl font-display font-bold text-white tracking-wide">
                      {title}
                    </h3>
                    {subtitle && (
                      <p className="text-sm text-slate-400 mt-1">{subtitle}</p>
                    )}
                  </div>
                )}
                {!hideCloseButton && (
                  <button
                    onClick={onClose}
                    className="p-2 rounded-full text-slate-400 hover:text-white hover:bg-white/10 transition-colors ml-auto -mr-2 -mt-2 focus:outline-none"
                    aria-label="Close modal"
                  >
                    <X className="h-5 w-5" />
                  </button>
                )}
              </div>
            )}

            {/* If noPadding with close button, show floating close button */}
            {noPadding && !hideCloseButton && (
              <button
                onClick={onClose}
                className="absolute top-4 right-4 z-20 p-2 rounded-full bg-obsidian-950/70 hover:bg-obsidian-950 text-slate-300 hover:text-white border border-white/15 backdrop-blur-md transition-all shadow-lg focus:outline-none"
                aria-label="Close modal"
              >
                <X className="h-4 w-4" />
              </button>
            )}

            {/* Body */}
            {noPadding ? (
              <div className={cn('max-h-[88vh] overflow-y-auto custom-scrollbar', bodyClassName)}>
                {children}
              </div>
            ) : (
              <div className={cn('p-6 sm:p-7 max-h-[82vh] overflow-y-auto custom-scrollbar', bodyClassName)}>
                {children}
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body
  );
};
