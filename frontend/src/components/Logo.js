import React from 'react';
import { HeartIcon } from '@heroicons/react/24/solid';

const Logo = ({ className = '', size = 'default' }) => {
  const sizes = {
    default: {
      icon: 'h-8 w-8',
      ping: 'h-3 w-3',
      text: 'text-xl',
      subtext: 'text-xs',
      spacing: 'ml-2',
      position: '-right-1 -top-1'
    },
    large: {
      icon: 'h-16 w-16',
      ping: 'h-6 w-6',
      text: 'text-4xl',
      subtext: 'text-lg',
      spacing: 'ml-4',
      position: '-right-2 -top-2'
    }
  };

  const currentSize = sizes[size] || sizes.default;

  return (
    <div className={`flex items-center ${className}`}>
      <div className="relative">
        <HeartIcon className={`${currentSize.icon} text-blue-600`} />
        <div className={`absolute ${currentSize.position}`}>
          <div className={`animate-ping absolute ${currentSize.ping} rounded-full bg-blue-400 opacity-75`}></div>
          <div className={`relative ${currentSize.ping} rounded-full bg-blue-500`}></div>
        </div>
      </div>
      <div className={`${currentSize.spacing} flex flex-col`}>
        <span className={`${currentSize.text} font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent`}>
          DocStraw
        </span>
        <span className={`${currentSize.subtext} text-blue-600 -mt-1`}>Healthcare System</span>
      </div>
    </div>
  );
};

export default Logo; 