import React from 'react';
import { Seat } from '@coffedu/contracts';

interface LableProps extends React.ComponentProps<'div'> {
  seat: Seat;
}

export default function Label({ seat, ...divProps }: LableProps) {
  return (
    <div
      {...divProps}
      className="text-sm font-medium text-green-800 border-2 p-2"
    >
      {seat.status === 'blocked' ? (
        <span>
          ({seat.row}-{seat.column}): X
        </span>
      ) : (
        <span className="">
          {seat.student?.department}
          {seat.student?.name}
          {seat.student?.level}
          {seat.student?.studentCode}
        </span>
      )}
    </div>
  );
}
