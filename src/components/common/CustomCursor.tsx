// src/components/common/CustomCursor.tsx

import React, { useEffect, useRef } from 'react';

const CustomCursor: React.FC = () => {
  const innerCursorRef = useRef<HTMLDivElement>(null);
  const outerCursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      if (innerCursorRef.current && outerCursorRef.current) {
        // Make cursors visible
        innerCursorRef.current.style.visibility = 'visible';
        outerCursorRef.current.style.visibility = 'visible';

        // Update positions
        innerCursorRef.current.style.left = `${clientX}px`;
        innerCursorRef.current.style.top = `${clientY}px`;
        outerCursorRef.current.style.left = `${clientX}px`;
        outerCursorRef.current.style.top = `${clientY}px`;
      }
    };

    const onMouseEnterLink = () => {
        if(innerCursorRef.current && outerCursorRef.current) {
            innerCursorRef.current.classList.add('cursor-hover');
            outerCursorRef.current.classList.add('cursor-hover');
        }
    };
    const onMouseLeaveLink = () => {
        if(innerCursorRef.current && outerCursorRef.current) {
            innerCursorRef.current.classList.remove('cursor-hover');
            outerCursorRef.current.classList.remove('cursor-hover');
        }
    };

    document.addEventListener('mousemove', onMouseMove);
    
    const interactiveElements = document.querySelectorAll(
      'a, button, .theme-btn, .search-trigger, .array-button button'
    );
    
    interactiveElements.forEach(el => {
      el.addEventListener('mouseenter', onMouseEnterLink);
      el.addEventListener('mouseleave', onMouseLeaveLink);
    });

    return () => {
      document.removeEventListener('mousemove', onMouseMove);
      interactiveElements.forEach(el => {
        el.removeEventListener('mouseenter', onMouseEnterLink);
        el.removeEventListener('mouseleave', onMouseLeaveLink);
      });
    };
  }, []);

  return (
    <>
      <div ref={innerCursorRef} className="mouse-cursor cursor-inner" />
      <div ref={outerCursorRef} className="mouse-cursor cursor-outer" />
    </>
  );
};

export default CustomCursor;