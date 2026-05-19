import React from 'react';

interface SliderProps {
  value: number[];
  max?: number;
  min?: number;
  step?: number;
  onValueChange?: (value: number[]) => void;
  className?: string;
}

export function Slider({
  value,
  max = 100,
  min = 0,
  step = 1,
  onValueChange,
  className = "",
}: SliderProps) {
  const currentValue = value[0] ?? min;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onValueChange?.([Number(e.target.value)]);
  };

  const percentage = ((currentValue - min) / (max - min)) * 100;

  return (
    <div className={`relative flex items-center w-full select-none touch-none ${className}`}>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={currentValue}
        onChange={handleChange}
        className="w-full h-1.5 rounded-full appearance-none cursor-pointer bg-slate-200 dark:bg-slate-800 outline-none focus:outline-none transition-all accent-emerald-500"
        style={{
          background: `linear-gradient(to right, #10b981 0%, #10b981 ${percentage}%, var(--border) ${percentage}%, var(--border) 100%)`
        }}
      />
      <style jsx>{`
        input[type="range"]::-webkit-slider-thumb {
          appearance: none;
          width: 14px;
          height: 14px;
          border-radius: 50%;
          background: #ffffff;
          border: 2px solid #10b981;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
          transition: transform 0.1s ease, background-color 0.1s ease;
        }
        input[type="range"]::-webkit-slider-thumb:hover {
          transform: scale(1.2);
          background: #10b981;
        }
        input[type="range"]::-webkit-slider-thumb:active {
          transform: scale(0.95);
        }
        input[type="range"]::-moz-range-thumb {
          width: 14px;
          height: 14px;
          border-radius: 50%;
          background: #ffffff;
          border: 2px solid #10b981;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
          transition: transform 0.1s ease, background-color 0.1s ease;
        }
        input[type="range"]::-moz-range-thumb:hover {
          transform: scale(1.2);
          background: #10b981;
        }
        input[type="range"]::-moz-range-thumb:active {
          transform: scale(0.95);
        }
      `}</style>
    </div>
  );
}
