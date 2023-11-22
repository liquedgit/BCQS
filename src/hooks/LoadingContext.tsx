import { createContext, useState, useContext } from "react";

export interface LoadingContextInterface {
  loading: boolean;
  setLoading: Function;
}

const loadingContext = createContext<LoadingContextInterface>({
  loading: true,
  setLoading: () => {},
});

export default function LoadingProvider({ children }: { children: any }) {
  const [loading, setLoading] = useState(true);

  const val = { loading, setLoading };
  return (
    <loadingContext.Provider value={val}>{children}</loadingContext.Provider>
  );
}

export function useLoading() {
  return useContext(loadingContext);
}
