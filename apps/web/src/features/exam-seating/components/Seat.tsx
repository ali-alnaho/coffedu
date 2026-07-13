import { Seat as SeatType } from '@coffedu/contracts';
import { CSSProperties, ButtonHTMLAttributes } from 'react';

interface SeatProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  seat: SeatType;
  onToggle: () => void;
  style: CSSProperties;
}

export default function Seat({
  seat,
  onToggle,
  style,
  ...buttonProps
}: SeatProps) {
  return (
    <button
      // {...buttonProps} => It can be added proparty without definition
      {...buttonProps}
      onClick={onToggle}
      style={style}
      className={`group relative flex items-center justify-center rounded border transition-all duration-200
                            ${
                              seat.status === 'blocked'
                                ? 'bg-red-500 border-red-700 text-white'
                                : 'bg-green-100 border-green-300 hover:bg-red-100'
                            }`}
    >
      {seat.status === 'blocked' ? (
        <span className="font-bold text-lg">X</span>
      ) : (
        <>
          <span className="text-sm font-medium text-green-800 group-hover:opacity-0 transition-opacity">
            ({seat.row}-{seat.column})
          </span>
          <span className="absolute inset-0 flex items-center justify-center text-white font-bold text-xl opacity-0 group-hover:opacity-100 transition-opacity">
            X
          </span>
        </>
      )}
    </button>
  );
}
