import { ReactNode } from "react";

// DEPRECATED: React.FC includes a children prop
export interface ContextProviderProps {
  children: ReactNode;
}

export type AppAction<AT> = {
  type: AT;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  payload?: any;
};
