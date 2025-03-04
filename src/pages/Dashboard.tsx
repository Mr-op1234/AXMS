
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Clock, 
  CheckCircle2, 
  AlertCircle, 
  Upload, 
  Plus, 
  FileText, 
  ChevronRight 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/Navbar';
import PrintJobCard from '@/components/PrintJobCard';
import { toast } from 'sonner';

const Dashboard = () => {
  const navigate = useNavigate();
  
  // Mock data for recent print jobs
  const [recentJobs, setRecentJobs] = useState([
    {
      id: '1',
      title: 'Assignment Report.pdf',
      files: 2,
      pages: 5,
      color: 'bw' as const,
      sides: 'double' as const,
      status: 'completed' as const,
      date: '12 Jun 2023',
      time: '10:45 AM',
      amount: 15.00
    },
    {
      id: '2',
      title: 'Project Presentation.pdf',
      files: 1,
      pages: 12,
      color: 'color' as const,
      sides: 'single' as const,
      status: 'pending' as const,
      date: '15 Jun 2023',
      time: '2:30 PM',
      amount: 96.00
    },
    {
      id: '3',
      title: 'Research Paper.pdf',
      files: 3,
      pages: 8,
      color: 'bw' as const,
      sides: 'single' as const,
      status: 'cancelled' as const,
      date: '10 Jun 2023',
      time: '9:15 AM',
      amount: 24.00
    }
  ]);
  
  // Mock stats data
  const stats = [
    {
      label: 'Pending Jobs',
      value: '1',
      icon: <Clock className="text-yellow-500" size={22} />,
      color: 'bg-yellow-50 text-yellow-700'
    },
    {
      label: 'Completed Jobs',
      value: '12',
      icon: <CheckCircle2 className="text-green-500" size={22} />,
      color: 'bg-green-50 text-green-700'
    },
    {
      label: 'Cancelled Jobs',
      value: '3',
      icon: <AlertCircle className="text-red-500" size={22} />,
      color: 'bg-red-50 text-red-700'
    }
  ];
  
  const handleViewJobDetails = (id: string) => {
    navigate(`/order-preview?id=${id}`);
  };
  
  const handleCancelJob = (id: string) => {
    // Show confirmation dialog/modal here in a real app
    toast.warning('Are you sure you want to cancel this job?', {
      action: {
        label: 'Yes, Cancel',
        onClick: () => {
          setRecentJobs(
            recentJobs.map(job => 
              job.id === id ? { ...job, status: 'cancelled' as const } : job
            )
          );
          toast.success('Print job cancelled successfully');
        }
      }
    });
  };
  
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8 pt-28">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600 mt-1">
            Manage your print jobs and track status updates
          </p>
        </header>
        
        {/* Quick Actions */}
        <section className="mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-soft flex flex-col h-full hover-effect">
              <div className="bg-xerox-50 p-3 rounded-lg w-fit mb-4">
                <Upload className="text-xerox-600" size={24} />
              </div>
              <h2 className="text-xl font-semibold mb-2">New Print Job</h2>
              <p className="text-gray-600 mb-4 flex-grow">
                Upload documents and configure print settings
              </p>
              <Button 
                className="bg-xerox hover:bg-xerox-600 w-full"
                onClick={() => navigate('/upload')}
              >
                <Plus size={16} className="mr-2" />
                Upload Files
              </Button>
            </div>
            
            <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-soft flex flex-col h-full hover-effect">
              <div className="bg-xerox-50 p-3 rounded-lg w-fit mb-4">
                <FileText className="text-xerox-600" size={24} />
              </div>
              <h2 className="text-xl font-semibold mb-2">View All Orders</h2>
              <p className="text-gray-600 mb-4 flex-grow">
                Check status and details of all your print jobs
              </p>
              <Button 
                variant="outline"
                className="border-xerox-200 text-xerox hover:bg-xerox-50 w-full"
                onClick={() => navigate('/order-preview')}
              >
                View Orders
                <ChevronRight size={16} className="ml-2" />
              </Button>
            </div>
            
            <div className="bg-gradient-to-br from-xerox-800 to-xerox-900 rounded-xl p-6 text-white shadow-soft flex flex-col h-full hover-effect">
              <div className="bg-white/20 backdrop-blur-xs p-3 rounded-lg w-fit mb-4">
                <CheckCircle2 className="text-white" size={24} />
              </div>
              <h2 className="text-xl font-semibold mb-2">Quick Status</h2>
              <div className="space-y-3 mt-2 flex-grow">
                {stats.map((stat, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center">
                      {stat.icon}
                      <span className="ml-2 text-white/90">{stat.label}</span>
                    </div>
                    <span className="font-semibold">{stat.value}</span>
                  </div>
                ))}
              </div>
              <p className="text-sm text-white/70 mt-4">
                Last updated: Today, 10:45 AM
              </p>
            </div>
          </div>
        </section>
        
        {/* Recent Print Jobs */}
        <section>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-gray-900">Recent Print Jobs</h2>
            <Button 
              variant="ghost" 
              className="text-xerox-600 hover:text-xerox-700 hover:bg-xerox-50"
              onClick={() => navigate('/order-preview')}
            >
              View All
              <ChevronRight size={16} className="ml-1" />
            </Button>
          </div>
          
          <div className="space-y-4">
            {recentJobs.length > 0 ? (
              recentJobs.map(job => (
                <PrintJobCard 
                  key={job.id} 
                  job={job} 
                  onView={handleViewJobDetails}
                  onCancel={handleCancelJob}
                />
              ))
            ) : (
              <div className="bg-white rounded-xl border border-gray-100 shadow-soft p-8 text-center">
                <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                  <FileText className="text-gray-400" size={24} />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">No print jobs yet</h3>
                <p className="text-gray-600 mb-6">
                  You haven't submitted any print jobs recently
                </p>
                <Button 
                  className="bg-xerox hover:bg-xerox-600"
                  onClick={() => navigate('/upload')}
                >
                  Create Your First Print Job
                </Button>
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Dashboard;
