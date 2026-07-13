import React from 'react';
import { CSSProperties } from 'react';

interface HorizontalAisleType extends React.ComponentProps<'div'> {
  children: React.ReactNode;
  style: CSSProperties;
  ToggleHorizontal: () => void;
}

export default function HorizontalAisle({
  children,
  style,
  ToggleHorizontal,
  ...divProps
}: HorizontalAisleType) {
  return (
    <div
      {...divProps}
      onClick={ToggleHorizontal}
      style={style}
      className="cursor-pointer flex items-center justify-center"
    >
      {children}
    </div>
  );
}
