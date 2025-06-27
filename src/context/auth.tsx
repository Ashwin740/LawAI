"use client";

import React, { ReactNode } from 'react';

// Auth functionality has been removed. This is a placeholder.
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  return <>{children}</>;
};

export const useAuth = () => {
  return { currentUser: null, loading: false };
};
