import React from 'react';

export enum ActionType {
  INCREMENT = 'INCREMENT',
  DECREMENT = 'DECREMENT',
  RESET = 'RESET',
  SET = 'SET'
}

export interface HistoryItem {
  id: string;
  action: ActionType;
  value: number; // The value after the action
  timestamp: Date;
}

export interface AIFactResponse {
  fact: string;
  category: string;
}

// UI Component Props
export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost' | 'ai';
  icon?: React.ReactNode;
}