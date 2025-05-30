import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Clock, FileText } from 'lucide-react';
import TableSkeletonLoader from '@/components/ui/TableSkeletonLoader';
import { ServiceRequest } from './types';
import { formatDate, formatTime, getStatusColor } from './utils';

type ServiceHistoryTabProps = {
  loading: boolean;
  serviceHistory: ServiceRequest[];
};

/**
 * Service History tab content for the dashboard
 */
const ServiceHistoryTab: React.FC<ServiceHistoryTabProps> = ({ loading, serviceHistory }) => {
  return (
    <Card className="border-0 shadow-none">
      <CardHeader className="pb-2">
        <CardTitle className="text-xl text-blue-800 flex items-center gap-2">
          <Clock className="h-5 w-5" />
          Service History
        </CardTitle>
        <CardDescription className="text-gray-600">
          View your past service history and completed requests
        </CardDescription>
      </CardHeader>
      <CardContent>
        {loading ? (
          <TableSkeletonLoader columns={5} rows={3} />
        ) : serviceHistory.length > 0 ? (
          <div className="overflow-x-auto rounded-xl border border-gray-200">
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-50">
                  <TableHead>Title</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Completed Date</TableHead>
                  <TableHead>Details</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {serviceHistory.map((request) => (
                  <TableRow key={request.id} className="hover:bg-gray-50 transition-colors">
                    <TableCell className="font-medium">{request.title}</TableCell>
                    <TableCell>{request.service_type}</TableCell>
                    <TableCell>
                      <div>{formatDate(request.updated_at || request.created_at)}</div>
                      <div className="text-xs text-gray-500">{formatTime(request.updated_at || request.created_at)}</div>
                    </TableCell>
                    <TableCell>
                      <Button variant="outline" size="sm" className="hover:bg-blue-50 hover:text-blue-600 transition-colors">
                        <FileText className="h-4 w-4 mr-1" />
                        View Details
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
                <Clock className="h-10 w-10 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-700 mb-2">No service history yet</h3>
              <p className="text-gray-500">
                Your completed service requests will appear here when you have service history
              </p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ServiceHistoryTab;
