import React, { useState } from 'react';
import { FileText, Wand2, Copy, Check } from 'lucide-react';

export default function ContentGenerator() {
  const [prompt, setPrompt] = useState('');
  const [generatedContent, setGeneratedContent] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [contentType, setContentType] = useState('blog');
  const [copied, setCopied] = useState(false);

  const contentTypes = [
    { id: 'blog', name: 'Blog Post', description: 'Engaging blog content' },
    { id: 'email', name: 'Email', description: 'Professional emails' },
    { id: 'social', name: 'Social Media', description: 'Social media posts' },
    { id: 'product', name: 'Product Description', description: 'Product details' }
  ];

  const sampleContent = {
    blog: `# The Future of Artificial Intelligence

Artificial Intelligence is revolutionizing the way we work, live, and interact with technology. From machine learning algorithms that can predict market trends to natural language processing systems that understand human speech, AI is becoming an integral part of our daily lives.

## Key Benefits of AI Integration

1. **Increased Efficiency**: AI can automate repetitive tasks, allowing humans to focus on more creative and strategic work.

2. **Better Decision Making**: With access to vast amounts of data, AI can provide insights that help make more informed decisions.

3. **Personalized Experiences**: AI can tailor experiences to individual preferences and behaviors.

## Looking Ahead

As we continue to advance in AI technology, we can expect to see even more innovative applications that will transform industries and improve quality of life for people around the world.`,
    
    email: `Subject: Exciting Partnership Opportunity

Dear [Name],

I hope this email finds you well. I'm reaching out to discuss a potential partnership opportunity that could be mutually beneficial for both our organizations.

Our AI-powered platform has been helping businesses increase their efficiency by up to 40%, and I believe your company could see similar results. We've worked with companies in your industry and have consistently delivered exceptional outcomes.

Would you be available for a brief 15-minute call next week to discuss how we might collaborate? I'm confident we can create significant value together.

Best regards,
[Your Name]`,
    
    social: `🚀 Just discovered the power of AI integration in business! 

The results are mind-blowing:
✅ 40% increase in productivity
✅ 60% reduction in manual tasks  
✅ 90% improvement in accuracy

The future is here, and it's powered by artificial intelligence! 

#AI #Technology #Innovation #BusinessGrowth #FutureOfWork`,
    
    product: `## Premium AI-Powered Analytics Dashboard

Transform your data into actionable insights with our cutting-edge analytics platform.

**Key Features:**
- Real-time data visualization
- Predictive analytics powered by machine learning
- Customizable dashboards and reports
- Seamless integration with existing tools
- Enterprise-grade security

**Perfect for:**
- Data analysts and scientists
- Business intelligence teams
- C-level executives
- Marketing professionals

**Pricing:** Starting at $99/month

Experience the power of AI-driven analytics. Start your free trial today!`
  };

  const generateContent = async () => {
    if (!prompt.trim()) return;

    setIsGenerating(true);
    
    // Simulate AI generation with realistic delay
    setTimeout(() => {
      const baseContent = sampleContent[contentType as keyof typeof sampleContent];
      const customizedContent = baseContent.replace(/AI/g, prompt.includes('AI') ? 'AI' : 'Technology');
      setGeneratedContent(customizedContent);
      setIsGenerating(false);
    }, 2000 + Math.random() * 3000);
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(generatedContent);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  return (
    <section id="generator" className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            AI Content Generator
          </h2>
          <p className="text-xl text-gray-600">
            Generate high-quality content for any purpose with the power of AI
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Input Section */}
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Content Type
              </label>
              <div className="grid grid-cols-2 gap-3">
                {contentTypes.map((type) => (
                  <button
                    key={type.id}
                    onClick={() => setContentType(type.id)}
                    className={`p-4 rounded-xl border-2 text-left transition-all duration-200 ${
                      contentType === type.id
                        ? 'border-indigo-500 bg-indigo-50 text-indigo-700'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="font-medium">{type.name}</div>
                    <div className="text-sm text-gray-500">{type.description}</div>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Content Prompt
              </label>
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Describe what you want to generate... (e.g., 'Write about the benefits of AI in healthcare')"
                className="w-full h-32 px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none"
              />
            </div>

            <button
              onClick={generateContent}
              disabled={!prompt.trim() || isGenerating}
              className="w-full px-6 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
            >
              {isGenerating ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Generating...</span>
                </>
              ) : (
                <>
                  <Wand2 className="w-5 h-5" />
                  <span>Generate Content</span>
                </>
              )}
            </button>
          </div>

          {/* Output Section */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <label className="block text-sm font-medium text-gray-700">
                Generated Content
              </label>
              {generatedContent && (
                <button
                  onClick={copyToClipboard}
                  className="flex items-center space-x-2 px-3 py-1 text-sm text-indigo-600 hover:text-indigo-700 transition-colors"
                >
                  {copied ? (
                    <>
                      <Check className="w-4 h-4" />
                      <span>Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              )}
            </div>

            <div className="h-96 bg-gray-50 border border-gray-200 rounded-xl p-6 overflow-y-auto">
              {generatedContent ? (
                <div className="prose prose-sm max-w-none">
                  <pre className="whitespace-pre-wrap font-sans text-gray-800 leading-relaxed">
                    {generatedContent}
                  </pre>
                </div>
              ) : (
                <div className="flex items-center justify-center h-full text-gray-400">
                  <div className="text-center">
                    <FileText className="w-12 h-12 mx-auto mb-4" />
                    <p>Generated content will appear here</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}