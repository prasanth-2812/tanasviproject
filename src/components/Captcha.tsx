// src/components/common/Captcha.tsx
import React, { useEffect, useRef, useState } from 'react';

interface CaptchaProps {
  onChange: (value: string) => void;
}

const Captcha: React.FC<CaptchaProps> = ({ onChange }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [captchaText, setCaptchaText] = useState('');

  const generateCaptcha = () => {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
    const length = 6;
    const captcha = Array.from({ length }, () =>
      chars.charAt(Math.floor(Math.random() * chars.length))
    ).join('');
    setCaptchaText(captcha);
    onChange(captcha); // Send to parent for validation
    drawCaptcha(captcha);
  };

  const drawCaptcha = (text: string) => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      if (ctx) {
        // Clear and setup
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = '#f3f3f3';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.font = 'bold 28px monospace';
        ctx.fillStyle = '#222';

        // Draw characters with random positions
        text.split('').forEach((char, i) => {
          const x = 20 + i * 25;
          const y = 30 + Math.random() * 5;
          const angle = (Math.random() - 0.5) * 0.5;
          ctx.save();
          ctx.translate(x, y);
          ctx.rotate(angle);
          ctx.fillText(char, 0, 0);
          ctx.restore();
        });

        // Draw noise lines
        for (let i = 0; i < 4; i++) {
          ctx.beginPath();
          ctx.moveTo(Math.random() * 150, Math.random() * 50);
          ctx.lineTo(Math.random() * 150, Math.random() * 50);
          ctx.strokeStyle = '#aaa';
          ctx.stroke();
        }
      }
    }
  };

  useEffect(() => {
    generateCaptcha();
  }, []);

  return (
    <div className="flex items-center gap-4 mt-3">
      <canvas ref={canvasRef} width={180} height={50} className="rounded border shadow" />
      <button
        onClick={generateCaptcha}
        className="text-sm px-2 py-1 border border-gray-300 bg-white hover:bg-gray-100 rounded"
        type="button"
      >
        🔁 Refresh
      </button>
    </div>
  );
};

export default Captcha;
