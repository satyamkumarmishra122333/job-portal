import React from 'react';
import { Facebook, Twitter, Linkedin, Instagram } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-100 border-t border-gray-300 py-6 mt-10">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 md:flex-row">
        <div className="text-xl font-semibold">
          Job<span className="text-green-500">Sphere</span>
        </div>
        
        <div className="flex space-x-4 mt-4 md:mt-0">
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
            <Facebook className="text-gray-600 hover:text-green-500 transition-all" />
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
            <Twitter className="text-gray-600 hover:text-green-500 transition-all" />
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
            <Linkedin className="text-gray-600 hover:text-green-500 transition-all" />
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
            <Instagram className="text-gray-600 hover:text-green-500 transition-all" />
          </a>
        </div>
      </div>
        <p className='text-center text-xs italic  font-sans'>2024 || All Right Reserved || &copy;  </p>
    </footer>
  );
};

export default Footer;
