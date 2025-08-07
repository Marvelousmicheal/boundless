import Image from 'next/image';
import React from 'react';

interface WalletCardProps {
  disabled: boolean;
  onClick: () => void;
  icon: string;
  label: string;
}

const WalletCard = ({ disabled, onClick, icon, label }: WalletCardProps) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`
        w-full h-auto p-4 rounded-lg border-2 transition-all duration-200
        flex flex-col items-center justify-center gap-3
        bg-[#101010] border-[#2B2B2B] text-white
        hover:border-[#404040] hover:bg-[#151515]
        focus:outline-none focus:ring-2 focus:ring-[#00FF88] focus:ring-offset-2 focus:ring-offset-[#030303]
        disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:border-[#2B2B2B] disabled:hover:bg-[#101010]
        active:scale-95
      `}
    >
      <div className='relative w-8 h-8 flex items-center justify-center'>
        <Image
          src={icon}
          alt={label}
          width={32}
          height={32}
          className='w-8 h-8 pointer-events-none object-contain'
        />
      </div>
      <p className='text-white text-sm font-medium text-center leading-tight'>
        {label}
      </p>
    </button>
  );
};

export default WalletCard;
