import React, { useState, useEffect } from 'react';
import { BarChart3, TrendingUp, Eye, Clock } from 'lucide-react';

interface AnalysisResult {
  wordCount: number;
  characterCount: number;
  sentenceCount: number;
  paragraphCount: number;
  readingTime: number;
  sentiment: 'positive' | 'neutral' | 'negative';
  readabilityScore: number;
  keyWords: string[];
}

export default function TextAnalyzer() {
  const [text, setText] = useState('');
  const [analysis, setAnalysis] = useState<AnalysisResult | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const analyzeText = (inputText: string): AnalysisResult => {
    const words = inputText.trim().split(/\s+/).filter(word => word.length > 0);
    const sentences = inputText.split(/[.!?]+/).filter(s => s.trim().length > 0);
    const paragraphs = inputText.split(/\n\s*\n/).filter(p => p.trim().length > 0);
    
    // Simple sentiment analysis based on keywords
    const positiveWords = ['good', 'great', 'excellent', 'amazing', 'wonderful', 'fantastic', 'love', 'best', 'awesome', 'perfect'];
    const negativeWords = ['bad', 'terrible', 'awful', 'hate', 'worst', 'horrible', 'disappointing', 'poor', 'sad', 'angry'];
    
    const lowerText = inputText.toLowerCase();
    const positiveCount = positiveWords.reduce((count, word) => count + (lowerText.match(new RegExp(word, 'g')) || []).length, 0);
    const negativeCount = negativeWords.reduce((count, word) => count + (lowerText.match(new RegExp(word, 'g')) || []).length, 0);
    
    let sentiment: 'positive' | 'neutral' | 'negative' = 'neutral';
    if (positiveCount > negativeCount) sentiment = 'positive';
    else if (negativeCount > positiveCount) sentiment = 'negative';
    
    // Extract key words (simple frequency analysis)
    const wordFreq: { [key: string]: number } = {};
    words.forEach(word => {
      const cleanWord = word.toLowerCase().replace(/[^\w]/g, '');
      if (cleanWord.length > 3) {
        wordFreq[cleanWord] = (wordFreq[cleanWord] || 0) + 1;
      }
    });
    
    const keyWords = Object.entries(wordFreq)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 5)
      .map(([word]) => word);
    
    return {
      wordCount: words.length,
      characterCount: inputText.length,
      sentenceCount: sentences.length,
      paragraphCount: Math.max(paragraphs.length, 1),
      readingTime: Math.ceil(words.length / 200), // Average reading speed
      sentiment,
      readabilityScore: Math.max(0, Math.min(100, 100 - (words.length / sentences.length) * 2)), // Simplified readability
      keyWords
    };
  };

  useEffect(() => {
    if (text.trim()) {
      setIsAnalyzing(true);
      const timer = setTimeout(() => {
        setAnalysis(analyzeText(text));
        setIsAnalyzing(false);
      }, 500);
      
      return () => clearTimeout(timer);
    } else {
      setAnalysis(null);
    }
  }, [text]);

  const getSentimentColor = (sentiment: string) => {
    switch (sentiment) {
      case 'positive': return 'text-green-600 bg-green-100';
      case 'negative': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getReadabilityColor = (score: number) => {
    if (score >= 80) return 'text-green-600 bg-green-100';
    if (score >= 60) return 'text-yellow-600 bg-yellow-100';
    return 'text-red-600 bg-red-100';
  };

  return (
    <section id="analyzer" className="py-20 bg-gradient-to-br from-purple-50 to-indigo-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            AI Text Analyzer
          </h2>
          <p className="text-xl text-gray-600">
            Get detailed insights about your text with advanced AI analysis
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Input Section */}
          <div className="space-y-4">
            <label className="block text-sm font-medium text-gray-700">
              Text to Analyze
            </label>
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Paste or type your text here for analysis..."
              className="w-full h-80 px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
            />
            <div className="text-sm text-gray-500">
              {text.length} characters
            </div>
          </div>

          {/* Analysis Results */}
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">Analysis Results</h3>
              {isAnalyzing && (
                <div className="flex items-center space-x-2 text-purple-600">
                  <div className="w-4 h-4 border-2 border-purple-600 border-t-transparent rounded-full animate-spin"></div>
                  <span className="text-sm">Analyzing...</span>
                </div>
              )}
            </div>

            {analysis ? (
              <div className="space-y-4">
                {/* Basic Stats */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white p-4 rounded-xl border border-gray-200">
                    <div className="flex items-center space-x-2 mb-2">
                      <BarChart3 className="w-5 h-5 text-blue-600" />
                      <span className="text-sm font-medium text-gray-700">Words</span>
                    </div>
                    <div className="text-2xl font-bold text-gray-900">{analysis.wordCount}</div>
                  </div>

                  <div className="bg-white p-4 rounded-xl border border-gray-200">
                    <div className="flex items-center space-x-2 mb-2">
                      <Eye className="w-5 h-5 text-green-600" />
                      <span className="text-sm font-medium text-gray-700">Characters</span>
                    </div>
                    <div className="text-2xl font-bold text-gray-900">{analysis.characterCount}</div>
                  </div>

                  <div className="bg-white p-4 rounded-xl border border-gray-200">
                    <div className="flex items-center space-x-2 mb-2">
                      <TrendingUp className="w-5 h-5 text-purple-600" />
                      <span className="text-sm font-medium text-gray-700">Sentences</span>
                    </div>
                    <div className="text-2xl font-bold text-gray-900">{analysis.sentenceCount}</div>
                  </div>

                  <div className="bg-white p-4 rounded-xl border border-gray-200">
                    <div className="flex items-center space-x-2 mb-2">
                      <Clock className="w-5 h-5 text-orange-600" />
                      <span className="text-sm font-medium text-gray-700">Read Time</span>
                    </div>
                    <div className="text-2xl font-bold text-gray-900">{analysis.readingTime}m</div>
                  </div>
                </div>

                {/* Sentiment Analysis */}
                <div className="bg-white p-6 rounded-xl border border-gray-200">
                  <h4 className="font-semibold text-gray-900 mb-3">Sentiment Analysis</h4>
                  <div className="flex items-center space-x-3">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getSentimentColor(analysis.sentiment)}`}>
                      {analysis.sentiment.charAt(0).toUpperCase() + analysis.sentiment.slice(1)}
                    </span>
                    <div className="flex-1 bg-gray-200 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full ${
                          analysis.sentiment === 'positive' ? 'bg-green-500' :
                          analysis.sentiment === 'negative' ? 'bg-red-500' : 'bg-gray-500'
                        }`}
                        style={{ width: '75%' }}
                      ></div>
                    </div>
                  </div>
                </div>

                {/* Readability Score */}
                <div className="bg-white p-6 rounded-xl border border-gray-200">
                  <h4 className="font-semibold text-gray-900 mb-3">Readability Score</h4>
                  <div className="flex items-center space-x-3">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getReadabilityColor(analysis.readabilityScore)}`}>
                      {Math.round(analysis.readabilityScore)}/100
                    </span>
                    <div className="flex-1 bg-gray-200 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full ${getReadabilityColor(analysis.readabilityScore).includes('green') ? 'bg-green-500' : 
                          getReadabilityColor(analysis.readabilityScore).includes('yellow') ? 'bg-yellow-500' : 'bg-red-500'}`}
                        style={{ width: `${analysis.readabilityScore}%` }}
                      ></div>
                    </div>
                  </div>
                </div>

                {/* Key Words */}
                {analysis.keyWords.length > 0 && (
                  <div className="bg-white p-6 rounded-xl border border-gray-200">
                    <h4 className="font-semibold text-gray-900 mb-3">Key Words</h4>
                    <div className="flex flex-wrap gap-2">
                      {analysis.keyWords.map((word, index) => (
                        <span 
                          key={index}
                          className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-medium"
                        >
                          {word}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="bg-white p-12 rounded-xl border border-gray-200 text-center">
                <BarChart3 className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500">Enter some text to see detailed analysis</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}