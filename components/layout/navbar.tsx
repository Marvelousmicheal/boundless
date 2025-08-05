'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { fadeInUp, slideInFromLeft, slideInFromRight } from '@/lib/motion';
import { Search, Bell, User } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const Navbar = () => {
  return (
    <motion.nav
      className='bg-[#1C1C1C] border-b border-[#2A2A2A] px-4 py-3'
      initial='hidden'
      animate='visible'
      variants={fadeInUp}
    >
      <div className='flex items-center justify-between'>
        {/* Left side - Search */}
        <motion.div className='flex-1 max-w-md' variants={slideInFromLeft}>
          <div className='relative'>
            <Search className='absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400' />
            <Input
              placeholder='Search...'
              className='pl-10 bg-[#2A2A2A] border-[#2A2A2A] text-white placeholder:text-gray-400'
            />
          </div>
        </motion.div>

        {/* Right side - Actions */}
        <motion.div
          className='flex items-center space-x-4'
          variants={slideInFromRight}
        >
          {/* Notifications */}
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              variant='ghost'
              size='icon'
              className='text-gray-400 hover:text-white hover:bg-[#2A2A2A]'
            >
              <Bell className='w-5 h-5' />
            </Button>
          </motion.div>

          {/* User Avatar */}
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Avatar className='w-8 h-8 cursor-pointer'>
              <AvatarImage src='/api/placeholder/32/32' />
              <AvatarFallback className='bg-blue-500'>
                <User className='w-4 h-4 text-white' />
              </AvatarFallback>
            </Avatar>
          </motion.div>
        </motion.div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
