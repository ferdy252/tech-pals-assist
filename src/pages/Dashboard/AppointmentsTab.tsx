import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Calendar, CalendarClock, X } from 'lucide-react';
import TableSkeletonLoader from '@/components/ui/TableSkeletonLoader';
import { Appointment } from './types';
import { formatDate, formatTime, getStatusColor } from './utils';

type AppointmentsTabProps = {
  loadingAppointments: boolean;
  appointments: Appointment[];
  handleCancelAppointment: (id: string) => Promise<void>;
};

/**
 * Appointments tab content for the dashboard
 */
const AppointmentsTab: React.FC<AppointmentsTabProps> = ({ 
  loadingAppointments, 
  appointments, 
  handleCancelAppointment 
}) => {
  return (
    <Card className="border-0 shadow-none">
      <CardHeader className="pb-2">
        <CardTitle className="text-xl text-blue-800 flex items-center gap-2">
          <CalendarClock className="h-5 w-5" />
          Your Appointments
        </CardTitle>
        <CardDescription className="text-gray-600">
          View and manage your scheduled appointments
        </CardDescription>
      </CardHeader>
      <CardContent>
        {loadingAppointments ? (
          <TableSkeletonLoader columns={5} rows={3} />
        ) : appointments.length > 0 ? (
          <div className="overflow-x-auto rounded-xl border border-gray-200">
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-50">
                  <TableHead>Service</TableHead>
                  <TableHead>Date & Time</TableHead>
                  <TableHead>Duration</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {appointments.map((appointment) => (
                  <TableRow key={appointment.id} className="hover:bg-gray-50 transition-colors">
                    <TableCell className="font-medium">{appointment.service_name}</TableCell>
                    <TableCell>
                      <div className="font-medium">{formatDate(appointment.appointment_date)}</div>
                      <div className="text-xs text-gray-500">{formatTime(appointment.appointment_date)}</div>
                    </TableCell>
                    <TableCell>{appointment.duration} minutes</TableCell>
                    <TableCell>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(appointment.status)}`}>
                        {appointment.status}
                      </span>
                    </TableCell>
                    <TableCell>
                      {appointment.status !== 'cancelled' && appointment.status !== 'completed' && (
                        <Button 
                          variant="outline" 
                          size="sm"
                          className="text-red-600 hover:bg-red-50 border-red-200 hover:border-red-300 transition-colors"
                          onClick={() => handleCancelAppointment(appointment.id)}
                        >
                          <X className="h-4 w-4 mr-1" />
                          Cancel
                        </Button>
                      )}
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
                <Calendar className="h-10 w-10 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-700 mb-2">No appointments scheduled</h3>
              <p className="text-gray-500">When you book appointments with our technicians, they will appear here</p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default AppointmentsTab;
