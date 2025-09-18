import React from 'react';
import { Brain, Sparkles } from 'lucide-react';

export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-3">
            <div className="relative">
              <Brain className="w-8 h-8 text-indigo-600" />
              <Sparkles className="w-4 h-4 text-yellow-400 absolute -top-1 -right-1 animate-pulse" />
            </div>
            <div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                AIMPACT
              </h1>
              <p className="text-xs text-gray-500">Intelligent Solutions</p>
            </div>
          </div>
          
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#chat" className="text-gray-700 hover:text-indigo-600 transition-colors font-medium">
              AI Chat
            </a>
            <a href="#generator" className="text-gray-700 hover:text-indigo-600 transition-colors font-medium">
              Content Generator
            </a>
            <a href="#analyzer" className="text-gray-700 hover:text-indigo-600 transition-colors font-medium">
              Text Analyzer
            </a>
            <a href="#features" className="text-gray-700 hover:text-indigo-600 transition-colors font-medium">
              Features
            </a>
          </nav>
        </div>
      </div>
    </header>
  );
}