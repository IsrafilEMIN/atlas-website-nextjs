import React from 'react';

interface MinimalLayoutProps {
  children: React.ReactNode;
}

const MinimalLayout: React.FC<MinimalLayoutProps> = ({ children }) => {
  return (
    <>
      {/* This layout is intentionally minimal.
          It ensures no standard header/footer from a main site layout is rendered.
          You can add global styles, font loading, or very basic page structure here if needed. */}
      {children}
    </>
  );
};

export default MinimalLayout;