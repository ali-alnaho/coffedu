import React from 'react';
import { CSSProperties } from 'react';

interface VerticalAisleType extends React.ComponentProps<'div'> {
  children: React.ReactNode;
  style: CSSProperties;
  ToggleVertical: () => void;
}
export default function VerticalAisle({
  children,
  style,
  ToggleVertical,
  ...divProps
}: VerticalAisleType) {
  return (
    <div
      {...divProps}
      onClick={ToggleVertical}
      style={style}
      className="cursor-pointer flex items-center justify-center"
    >
      {children}
    </div>
  );
}
