
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/Navbar';
import AuthForm from '@/components/AuthForm';
import { ArrowDown, FileText, Zap, Clock, CreditCard } from 'lucide-react';

const Index = () => {
  const navigate = useNavigate();
  
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative pt-28 pb-20 md:pt-40 md:pb-28">
        <div className="container px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-16 items-center">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="space-y-6"
            >
              <div className="inline-block px-3 py-1 rounded-full bg-xerox-100 text-xerox-800 text-sm font-medium">
                <span>NEW</span> <span className="mx-1">•</span> <span>Automated Xerox Management System</span>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-gray-900">
                Print Documents <br className="hidden sm:inline" /> 
                <span className="text-xerox">Without the Wait</span>
              </h1>
              <p className="text-lg md:text-xl text-gray-600 max-w-lg">
                Upload your documents in advance, choose your print settings, and pick up your prints when they're ready. No more waiting in line.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  className="btn-primary text-base px-7 py-6"
                  onClick={() => navigate('/dashboard')}
                >
                  Start Printing
                </Button>
                <Button 
                  variant="outline" 
                  className="btn-secondary text-base px-7 py-6"
                  onClick={() => {
                    const scrollTarget = document.getElementById('how-it-works');
                    if (scrollTarget) {
                      scrollTarget.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                >
                  Learn More
                </Button>
              </div>
              <div className="flex items-center space-x-4 pt-2">
                <div className="flex -space-x-2">
                  {[...Array(4)].map((_, i) => (
                    <div 
                      key={i} 
                      className="w-10 h-10 rounded-full bg-gray-300 border-2 border-white overflow-hidden"
                    >
                      <img 
                        src={`https://i.pravatar.cc/150?img=${i + 10}`} 
                        alt="User" 
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                </div>
                <div className="text-sm text-gray-600">
                  <span className="font-medium">400+</span> students using AXMS
                </div>
              </div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="relative"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-xerox-50 to-transparent rounded-3xl transform rotate-1 scale-105 -z-10"></div>
              <div className="bg-white p-6 rounded-2xl shadow-soft">
                <AuthForm />
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* How It Works Section */}
      <section id="how-it-works" className="py-20 bg-white">
        <div className="container px-4 md:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">How It Works</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              The Automated Xerox Management System simplifies the printing process in just a few steps
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: <FileText className="h-10 w-10 text-xerox-500" />,
                title: 'Upload Documents',
                description: 'Upload your PDFs, Word files, or images to the system from anywhere on campus'
              },
              {
                icon: <Zap className="h-10 w-10 text-xerox-500" />,
                title: 'Configure Settings',
                description: 'Choose color mode, number of copies, single or double-sided printing'
              },
              {
                icon: <CreditCard className="h-10 w-10 text-xerox-500" />,
                title: 'Make Payment',
                description: 'Quickly pay using UPI, with instant transaction verification'
              },
              {
                icon: <Clock className="h-10 w-10 text-xerox-500" />,
                title: 'Pick It Up',
                description: 'Get notified when your prints are ready and pick them up at your convenience'
              }
            ].map((step, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white p-6 rounded-xl border border-gray-100 shadow-soft hover-effect"
              >
                <div className="h-14 w-14 bg-xerox-50 rounded-xl flex items-center justify-center mb-5">
                  {step.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </motion.div>
            ))}
          </div>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="flex justify-center mt-12"
          >
            <Button 
              variant="outline" 
              className="group"
              onClick={() => {
                const scrollTarget = document.getElementById('features');
                if (scrollTarget) {
                  scrollTarget.scrollIntoView({ behavior: 'smooth' });
                }
              }}
            >
              <span>Discover Features</span>
              <ArrowDown className="h-4 w-4 ml-2 group-hover:translate-y-1 transition-transform" />
            </Button>
          </motion.div>
        </div>
      </section>
      
      {/* Features Section */}
      <section id="features" className="py-20 bg-gray-50">
        <div className="container px-4 md:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Key Features</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              AXMS comes packed with powerful features to make document printing efficient and hassle-free
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: 'Secure Authentication',
                description: 'Domain-restricted sign up with OTP verification via .edu email addresses only'
              },
              {
                title: 'Multiple File Types',
                description: 'Support for PDF, DOCX, and image files with automatic conversion and bundling'
              },
              {
                title: 'UPI Payments',
                description: 'Seamless payment integration for a contactless experience'
              },
              {
                title: 'Print Queue Management',
                description: 'First-in, First-out queue system to ensure fair processing of all orders'
              },
              {
                title: 'Order Tracking',
                description: 'Real-time status updates for submitted print jobs'
              },
              {
                title: 'Automated Notifications',
                description: 'Get email alerts when your order is ready for pickup'
              }
            ].map((feature, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white p-6 rounded-xl border border-gray-100 shadow-soft"
              >
                <div className="h-1 w-12 bg-xerox-500 rounded-full mb-5"></div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-20 bg-white">
        <div className="container px-4 md:px-6">
          <div className="bg-xerox-800 text-white rounded-3xl overflow-hidden">
            <div className="p-8 md:p-12 lg:p-16 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
              <div className="space-y-6">
                <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Ready to simplify your printing experience?</h2>
                <p className="text-lg md:text-xl text-white/80 max-w-lg">
                  Join the hundreds of students who are already saving time with AXMS. Sign up today and experience hassle-free printing.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button 
                    className="bg-white text-xerox-800 hover:bg-gray-100 text-base px-7 py-6"
                    onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                  >
                    Get Started Now
                  </Button>
                </div>
              </div>
              <div className="hidden lg:block relative">
                <div className="absolute inset-0 bg-gradient-to-r from-xerox-700 to-transparent"></div>
                <img 
                  src="https://images.unsplash.com/photo-1520333789090-1afc82db536a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2671&q=80" 
                  alt="Students using the service" 
                  className="rounded-xl opacity-60"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="py-12 bg-gray-900 text-white">
        <div className="container px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <div>
              <div className="flex items-center space-x-2 mb-6">
                <span className="text-white font-bold text-2xl tracking-tight">AXMS</span>
                <div className="px-2 py-1 bg-white/10 rounded-md">
                  <span className="text-white/80 text-xs font-medium">Student</span>
                </div>
              </div>
              <p className="text-gray-400 max-w-xs">
                Automated Xerox Management System for a seamless printing experience on campus.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-3">
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Home</a></li>
                <li><a href="#how-it-works" className="text-gray-400 hover:text-white transition-colors">How It Works</a></li>
                <li><a href="#features" className="text-gray-400 hover:text-white transition-colors">Features</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Contact Support</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Campus Locations</h3>
              <ul className="space-y-3">
                <li className="text-gray-400">Main Campus - Block A, Ground Floor</li>
                <li className="text-gray-400">Engineering Block - C Wing, Room 105</li>
                <li className="text-gray-400">Science Department - Library Annexe</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-10 pt-6 flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-gray-500">© 2023 AXMS. All rights reserved.</p>
            <div className="mt-4 md:mt-0">
              <p className="text-sm text-gray-500">
                Made with <span className="text-red-500">❤</span> for College Students
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
