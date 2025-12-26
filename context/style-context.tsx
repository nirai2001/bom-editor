"use client"
import { createContext, useContext, useState, ReactNode } from 'react';

// Define the shape of our global state
export interface StyleState {
  styleId: string;
  styleName: string;
  season: string;
  fit: string;
  fabricType: string;
  construction: string;
  components: any[];
  laborCost: number;
  overhead: number;
}

interface StyleContextType {
  state: StyleState;
  updateState: (updates: Partial<StyleState>) => void;
}

const StyleContext = createContext<StyleContextType | undefined>(undefined);

export const StyleProvider = ({ children }: { children: ReactNode }) => {
  const [state, setState] = useState<StyleState>({
    styleId: '',
    styleName: '',
    season: 'SS25',
    fit: 'Regular',
    fabricType: 'Woven',
    construction: '',
    components: [],
    laborCost: 0,
    overhead: 0,
  });

  const updateState = (updates: Partial<StyleState>) => {
    setState((prev) => ({ ...prev, ...updates }));
  };

  return (
    <StyleContext.Provider value={{ state, updateState }}>
      {children}
    </StyleContext.Provider>
  );
};

export const useStyle = () => {
  const context = useContext(StyleContext);
  if (!context) throw new Error("useStyle must be used within a StyleProvider");
  return context;
};