
import React from 'react';
import { 
  Calendar, 
  Clock, 
  FileText, 
  Download, 
  Trash2, 
  MoreVertical 
} from 'lucide-react';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import StatusBadge from './StatusBadge';

type PrintJob = {
  id: string;
  title: string;
  files: number;
  pages: number;
  color: 'bw' | 'color';
  sides: 'single' | 'double';
  status: 'pending' | 'processing' | 'completed' | 'cancelled';
  date: string;
  time: string;
  amount: number;
};

type PrintJobCardProps = {
  job: PrintJob;
  onView: (id: string) => void;
  onCancel: (id: string) => void;
};

const PrintJobCard = ({ job, onView, onCancel }: PrintJobCardProps) => {
  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-soft overflow-hidden hover-effect">
      <div className="px-5 py-4 flex justify-between items-center">
        <div className="flex items-center space-x-3">
          <div className="bg-xerox-50 p-2 rounded-lg">
            <FileText 
              className={job.color === 'color' ? 'text-xerox-500' : 'text-gray-700'} 
              size={24} 
            />
          </div>
          <div>
            <h3 className="font-medium text-gray-900 text-sm">{job.title}</h3>
            <p className="text-xs text-gray-500">
              {job.files} {job.files === 1 ? 'file' : 'files'} · {job.pages} {job.pages === 1 ? 'page' : 'pages'}
            </p>
          </div>
        </div>
        <StatusBadge status={job.status} />
      </div>
      
      <div className="px-5 py-3 bg-gray-50 flex justify-between items-center">
        <div className="flex items-center space-x-4 text-sm text-gray-500">
          <div className="flex items-center">
            <Calendar className="h-4 w-4 mr-1" />
            <span className="text-xs">{job.date}</span>
          </div>
          <div className="flex items-center">
            <Clock className="h-4 w-4 mr-1" />
            <span className="text-xs">{job.time}</span>
          </div>
        </div>
        <div className="flex items-center">
          <p className="text-sm font-medium text-gray-900 mr-3">₹{job.amount.toFixed(2)}</p>
          {job.status === 'pending' && (
            <Button 
              variant="outline" 
              size="sm"
              className="mr-2 text-gray-500 bg-white border-gray-200 hover:bg-gray-100 hover:text-gray-700"
              onClick={() => onCancel(job.id)}
            >
              Cancel
            </Button>
          )}
          {job.status === 'completed' && (
            <Button 
              variant="outline" 
              size="sm"
              className="mr-2 text-gray-500 bg-white border-gray-200 hover:bg-gray-100 hover:text-gray-700"
            >
              <Download className="h-4 w-4 mr-1" />
              Receipt
            </Button>
          )}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button 
                variant="ghost" 
                size="sm"
                className="h-8 w-8 p-0 text-gray-500"
              >
                <span className="sr-only">Open menu</span>
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-40">
              <DropdownMenuItem onClick={() => onView(job.id)}>
                View details
              </DropdownMenuItem>
              {job.status === 'completed' && (
                <DropdownMenuItem>Download receipt</DropdownMenuItem>
              )}
              {job.status === 'pending' && (
                <DropdownMenuItem 
                  className="text-red-600"
                  onClick={() => onCancel(job.id)}
                >
                  Cancel order
                </DropdownMenuItem>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
};

export default PrintJobCard;
