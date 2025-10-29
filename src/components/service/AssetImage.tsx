import React, { useState } from 'react';

interface AssetImageProps {
    src: string;
    alt: string;
    className?: string;
    priority?: boolean;
    fallbackExt?: string;
    width?: number;
    height?: number;
}

const AssetImage: React.FC<AssetImageProps> = ({
    src,
    alt,
    className = '',
    priority = false,
    fallbackExt = 'png',
    width,
    height
}) => {
    const [imgSrc, setImgSrc] = useState(src);
    const [hasError, setHasError] = useState(false);

    // Try SVG first, fallback to PNG
    const handleError = () => {
        if (!hasError && imgSrc.endsWith('.svg')) {
            const pngSrc = imgSrc.replace('.svg', `.${fallbackExt}`);
            setImgSrc(pngSrc);
            setHasError(true);
        }
    };

    return (
        <img
            src={imgSrc}
            alt={alt}
            className={className}
            onError={handleError}
            loading={priority ? 'eager' : 'lazy'}
            width={width}
            height={height}
            style={{ 
                width: width ? `${width}px` : '100%',
                height: height ? `${height}px` : 'auto',
                objectFit: 'cover'
            }}
        />
    );
};

export default AssetImage;

