import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Edit, FileText } from 'lucide-react';
import TableSkeletonLoader from '@/components/ui/TableSkeletonLoader';
import { ServiceRequest } from './types';
import { formatDate, formatTime, getStatusColor } from './utils';

type ServiceRequestsTabProps = {
  loading: boolean;
  serviceRequests: ServiceRequest[];
};

/**
 * Service Requests tab content for the dashboard
 */
const ServiceRequestsTab: React.FC<ServiceRequestsTabProps> = ({ loading, serviceRequests }) => {
  const navigate = useNavigate();
  
  return (
    <Card className="border-0 shadow-none">
      <CardHeader className="pb-2">
        <CardTitle className="text-xl text-blue-800 flex items-center gap-2">
          <FileText className="h-5 w-5" />
          Your Service Requests
        </CardTitle>
        <CardDescription className="text-gray-600">
          View and manage your current service requests
        </CardDescription>
      </CardHeader>
      <CardContent>
        {loading ? (
          <TableSkeletonLoader columns={5} rows={3} />
        ) : serviceRequests.length > 0 ? (
          <div className="overflow-x-auto rounded-xl border border-gray-200">
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-50">
                  <TableHead>Title</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {serviceRequests.map((request) => (
                  <TableRow key={request.id} className="hover:bg-gray-50 transition-colors">
                    <TableCell className="font-medium">{request.title}</TableCell>
                    <TableCell>{request.service_type}</TableCell>
                    <TableCell>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(request.status)}`}>
                        {request.status}
                      </span>
                    </TableCell>
                    <TableCell>
                      <div>{formatDate(request.created_at)}</div>
                      <div className="text-xs text-gray-500">{formatTime(request.created_at)}</div>
                    </TableCell>
                    <TableCell>
                      <Button variant="outline" size="sm" className="hover:bg-blue-50 hover:text-blue-600 transition-colors">
                        <Edit className="h-4 w-4 mr-1" />
                        Details
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        ) : (
          <div className="text-center py-16 px-6 border rounded-xl bg-gray-50 border-dashed border-gray-300">
            <div className="flex flex-col items-center max-w-md mx-auto">
              <div className="bg-blue-100 p-4 rounded-full mb-4">
                <FileText className="h-10 w-10 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-700 mb-2">No service requests yet</h3>
              <p className="text-gray-500 mb-6">Create your first request to get technical help from our experts</p>
              <Button 
                onClick={() => navigate('/service-request')} 
                className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-6"
              >
                Create Your First Request
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ServiceRequestsTab;
