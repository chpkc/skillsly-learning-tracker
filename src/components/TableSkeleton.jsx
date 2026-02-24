
import React from 'react';

const TableSkeleton = () => {
  return (
    <div className="animate-pulse space-y-4">
      {[...Array(5)].map((_, index) => (
        <div key={index} className="flex items-center justify-between rounded-lg border border-neutral-800 bg-neutral-900/50 p-4">
          <div className="h-4 w-1/4 rounded bg-neutral-800"></div>
          <div className="h-4 w-1/4 rounded bg-neutral-800"></div>
          <div className="h-4 w-1/4 rounded bg-neutral-800"></div>
        </div>
      ))}
    </div>
  );
};

export default TableSkeleton;
