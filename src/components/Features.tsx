import React from 'react';
import { 
  Brain, 
  Zap, 
  Shield, 
  Globe, 
  MessageSquare, 
  FileText, 
  BarChart3, 
  Sparkles,
  Clock,
  Users,
  Cpu,
  Target
} from 'lucide-react';

export default function Features() {
  const features = [
    {
      icon: MessageSquare,
      title: 'Intelligent Chat',
      description: 'Engage in natural conversations with our advanced AI assistant that understands context and provides helpful responses.',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: FileText,
      title: 'Content Generation',
      description: 'Create high-quality content for blogs, emails, social media, and more with AI-powered writing assistance.',
      color: 'from-green-500 to-emerald-500'
    },
    {
      icon: BarChart3,
      title: 'Text Analysis',
      description: 'Get detailed insights about your text including sentiment analysis, readability scores, and key metrics.',
      color: 'from-purple-500 to-indigo-500'
    },
    {
      icon: Zap,
      title: 'Lightning Fast',
      description: 'Experience blazing-fast AI processing with response times measured in milliseconds, not seconds.',
      color: 'from-yellow-500 to-orange-500'
    },
    {
      icon: Shield,
      title: 'Enterprise Security',
      description: 'Your data is protected with enterprise-grade security, end-to-end encryption, and privacy compliance.',
      color: 'from-red-500 to-pink-500'
    },
    {
      icon: Globe,
      title: 'Global Availability',
      description: 'Access our AI services from anywhere in the world with 99.9% uptime and global CDN distribution.',
      color: 'from-teal-500 to-blue-500'
    }
  ];

  const stats = [
    { icon: Users, value: '50K+', label: 'Active Users' },
    { icon: Cpu, value: '1M+', label: 'AI Requests Daily' },
    { icon: Clock, value: '99.9%', label: 'Uptime' },
    { icon: Target, value: '95%', label: 'Accuracy Rate' }
  ];

  return (
    <section id="features" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 bg-indigo-100 rounded-full text-indigo-700 text-sm font-medium mb-4">
            <Sparkles className="w-4 h-4 mr-2" />
            Powerful Features
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Everything you need for
            <span className="block bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              AI-powered success
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Our comprehensive AI platform provides all the tools you need to harness the power of artificial intelligence for your business or personal projects.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="group p-8 bg-white rounded-2xl border border-gray-200 hover:shadow-2xl hover:shadow-indigo-500/10 transition-all duration-300 hover:-translate-y-1"
            >
              <div className={`w-12 h-12 bg-gradient-to-r ${feature.color} rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                <feature.icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* Stats Section */}
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-3xl p-12 text-white">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold mb-4">Trusted by thousands worldwide</h3>
            <p className="text-indigo-100 text-lg">
              Join the growing community of users who rely on our AI platform
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
                <div className="text-3xl font-bold mb-2">{stat.value}</div>
                <div className="text-indigo-100">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center mt-20">
          <h3 className="text-3xl font-bold text-gray-900 mb-6">
            Ready to experience the future?
          </h3>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Start using our AI platform today and discover how artificial intelligence can transform your workflow.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button className="px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-semibold text-lg hover:shadow-2xl hover:shadow-indigo-500/25 transition-all duration-300 transform hover:-translate-y-1">
              Get Started Free
            </button>
            <button className="px-8 py-4 border-2 border-gray-300 text-gray-700 rounded-xl font-semibold text-lg hover:border-indigo-300 hover:text-indigo-600 transition-all duration-300">
              Schedule Demo
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}