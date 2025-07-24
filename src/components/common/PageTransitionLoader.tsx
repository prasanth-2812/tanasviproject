// src/components/common/PageTransitionLoader.tsx

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface PageTransitionLoaderProps {
  isLoading: boolean;
}

const PageTransitionLoader: React.FC<PageTransitionLoaderProps> = ({ isLoading }) => {
  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          className="page-transition-loader"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="loader-logo">TANASVI</div>
          <div className="loader-spinner"></div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default PageTransitionLoader;