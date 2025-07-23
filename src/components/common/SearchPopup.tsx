import React, { useEffect } from 'react';

interface SearchPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

const SearchPopup: React.FC<SearchPopupProps> = ({ isOpen, onClose }) => {
  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => {
      window.removeEventListener('keydown', handleEsc);
    };
  }, [onClose]);

  if (!isOpen) return null;

  return (
    <div className={`search-wrap active`}>
      <div className="search-inner">
        <i className="fas fa-times search-close" id="search-close" onClick={onClose}></i>
        <div className="search-cell">
          <form method="get" onSubmit={(e) => e.preventDefault()}>
            <div className="search-field-holder">
              <input type="search" className="main-search-input" placeholder="Search..." />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SearchPopup;