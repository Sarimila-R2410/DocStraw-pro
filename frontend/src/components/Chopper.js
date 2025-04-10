import React from 'react';
import { motion } from 'framer-motion';

const Chopper = () => {
  return (
    <motion.div
      initial={{ x: -50, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 1, type: "spring", stiffness: 100 }}
      className="fixed left-0 bottom-0 w-48 h-48 z-10 flex items-end justify-center"
      style={{ 
        left: 'calc(50% - 400px)',
        bottom: '20%'
      }}
    >
      <img
        src="https://c.tenor.com/93ozYQrYcFEAAAAC/tenor.gif"
        alt="Tony Tony Chopper"
        className="w-full h-full object-contain drop-shadow-2xl"
      />
    </motion.div>
  );
};

export default Chopper; 