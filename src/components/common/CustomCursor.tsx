import React, { useState, useEffect } from 'react';
import { motion, Variants } from 'framer-motion';

const CustomCursor: React.FC = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', updateMousePosition);
    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
    };
  }, []);

  useEffect(() => {
    const onMouseEnterLink = () => setIsHovering(true);
    const onMouseLeaveLink = () => setIsHovering(false);

    const interactiveElements = document.querySelectorAll(
      'a, button, .theme-btn, .search-trigger, .array-button button'
    );
    
    interactiveElements.forEach(el => {
      el.addEventListener('mouseenter', onMouseEnterLink);
      el.addEventListener('mouseleave', onMouseLeaveLink);
    });

    return () => {
      interactiveElements.forEach(el => {
        el.removeEventListener('mouseenter', onMouseEnterLink);
        el.removeEventListener('mouseleave', onMouseLeaveLink);
      });
    };
  }, []);

  const variants: Variants = {
    default: {
      x: mousePosition.x - 5,
      y: mousePosition.y - 5,
    },
    outer: {
      x: mousePosition.x - 25,
      y: mousePosition.y - 25,
      transition: { 
        type: "spring", 
        stiffness: 150, 
        damping: 20,
        mass: 0.1,
      }
    }
  };

  return (
    <div className={isHovering ? 'cursor-hover' : ''}>
      <motion.div
        className="mouse-cursor cursor-outer"
        variants={variants}
        animate="outer"
      />
      <motion.div
        className="mouse-cursor cursor-inner"
        variants={variants}
        animate="default"
      />
    </div>
  );
};

export default CustomCursor;