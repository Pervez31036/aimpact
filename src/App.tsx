import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import AIChat from './components/AIChat';
import ContentGenerator from './components/ContentGenerator';
import TextAnalyzer from './components/TextAnalyzer';
import Features from './components/Features';
import Footer from './components/Footer';

function App() {
  return (
    <div className="min-h-screen">
      <Header />
      <Hero />
      <AIChat />
      <ContentGenerator />
      <TextAnalyzer />
      <Features />
      <Footer />
    </div>
  );
}

export default App;