
import React from 'react';
import { Loader2, CheckCircle2, Clock, AlertCircle } from 'lucide-react';

type StatusBadgeProps = {
  status: 'pending' | 'processing' | 'completed' | 'cancelled';
  size?: 'sm' | 'md';
};

const StatusBadge = ({ status, size = 'md' }: StatusBadgeProps) => {
  const sizeClasses = size === 'sm' ? 'text-xs px-2 py-0.5' : 'text-xs px-2.5 py-1';
  
  let icon;
  let colorClasses;
  let label;
  
  switch (status) {
    case 'pending':
      icon = <Clock className="h-3 w-3 mr-1" />;
      colorClasses = 'bg-yellow-50 text-yellow-700 border-yellow-200';
      label = 'Pending';
      break;
    case 'processing':
      icon = <Loader2 className="h-3 w-3 mr-1 animate-spin" />;
      colorClasses = 'bg-blue-50 text-blue-700 border-blue-200';
      label = 'Processing';
      break;
    case 'completed':
      icon = <CheckCircle2 className="h-3 w-3 mr-1" />;
      colorClasses = 'bg-green-50 text-green-700 border-green-200';
      label = 'Completed';
      break;
    case 'cancelled':
      icon = <AlertCircle className="h-3 w-3 mr-1" />;
      colorClasses = 'bg-red-50 text-red-700 border-red-200';
      label = 'Cancelled';
      break;
    default:
      icon = <Clock className="h-3 w-3 mr-1" />;
      colorClasses = 'bg-gray-100 text-gray-800 border-gray-200';
      label = 'Unknown';
  }
  
  return (
    <span className={`inline-flex items-center rounded-full border ${sizeClasses} ${colorClasses} font-medium`}>
      {icon}
      {label}
    </span>
  );
};

export default StatusBadge;
