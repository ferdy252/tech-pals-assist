import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

interface TableSkeletonLoaderProps {
  rows?: number;
  columns?: number;
}

const TableSkeletonLoader: React.FC<TableSkeletonLoaderProps> = ({ rows = 5, columns = 5 }) => {
  return (
    <div className="overflow-x-auto rounded-xl border border-gray-200">
      <Table>
        <TableHeader>
          <TableRow className="bg-gray-50">
            {[...Array(columns)].map((_, i) => (
              <TableHead key={i} className="py-3 px-4">
                <div className="h-4 bg-gray-200 rounded w-3/4 animate-pulse"></div>
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {[...Array(rows)].map((_, i) => (
            <TableRow key={i} className="hover:bg-gray-50 transition-colors">
              {[...Array(columns)].map((_, j) => (
                <TableCell key={j} className="py-3 px-4">
                  <div className="h-4 bg-gray-200 rounded w-full animate-pulse"></div>
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default TableSkeletonLoader;
