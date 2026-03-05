import { createContext, useState, useEffect, useCallback } from "react";
import type { ReactNode } from "react";
import { loadDataAsync, saveDataAsync, defaultData } from "@/portfolioData";
import type { PortfolioData } from "@/portfolioData";

interface PortfolioContextType {
  data: PortfolioData;
  setData: (data: PortfolioData) => void;
  save: (data: PortfolioData) => Promise<void>;
  isSyncing: boolean;
  isSaving: boolean;
  isLoading: boolean;
  networkError: boolean;
  retry: () => void;
}

export const PortfolioContext = createContext<PortfolioContextType | null>(null);

function PortfolioProvider({ children }: { children: ReactNode }) {
  const [data, setDataState] = useState<PortfolioData>(defaultData);
  const [isSyncing, setIsSyncing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [networkError, setNetworkError] = useState(false);

  const fetchData = useCallback(async (showSkeleton = false) => {
    if (showSkeleton) setIsLoading(true);
    setNetworkError(false);

    const timeout = new Promise<never>((_, reject) =>
      setTimeout(() => reject(new Error("timeout")), 10000)
    );

    try {
      const latest = await Promise.race([loadDataAsync(), timeout]);
      const d = latest as PortfolioData;

      if (d.about?.avatar) {
        await new Promise<void>((resolve) => {
          const img = new window.Image();
          img.onload = () => resolve();
          img.onerror = () => resolve();
          img.src = d.about.avatar!;
        });
      }

      setDataState(d);
      setNetworkError(false);
      document.title = `Sanket's Portfolio`;
    } catch {
      console.warn("Supabase unavailable");
      setNetworkError(true); // ← toast dikhao
    } finally {
      setIsLoading(false);
      setIsSyncing(false);
    }
  }, []);

  // Initial load
  useEffect(() => {
    fetchData(true);
  }, [fetchData]);

  // Retry function — user RETRY click kare toh call hoga
  const retry = useCallback(() => {
    window.location.reload();
  }, []);

  const setData = (d: PortfolioData) => setDataState(d);

  const save = async (d: PortfolioData) => {
    setIsSaving(true);
    setDataState(d);
    try {
      await saveDataAsync(d);
    } catch (e) {
      console.error("Failed to save to Supabase:", e);
      throw e;
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <PortfolioContext.Provider value={{ data, setData, save, isSyncing, isSaving, isLoading, networkError, retry }}>
      {children}
    </PortfolioContext.Provider>
  );
}

export default PortfolioProvider;