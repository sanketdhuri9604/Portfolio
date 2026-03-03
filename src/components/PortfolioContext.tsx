import { createContext, useState, useEffect } from "react";
import type { ReactNode } from "react";
import { loadData, loadDataAsync, saveDataAsync } from "@/portfolioData";
import type { PortfolioData } from "@/portfolioData";

interface PortfolioContextType {
  data: PortfolioData;
  setData: (data: PortfolioData) => void;
  save: (data: PortfolioData) => Promise<void>;
  isSyncing: boolean;
  isSaving: boolean;
}

export const PortfolioContext = createContext<PortfolioContextType | null>(null);

function PortfolioProvider({ children }: { children: ReactNode }) {
  // Instantly load from localStorage — no blocking
  const [data, setDataState] = useState<PortfolioData>(loadData);
  const [isSyncing, setIsSyncing] = useState(false); // ← no skeleton on start
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    // Background sync from Supabase — silently updates data when ready
    loadDataAsync()
      .then((latest) => {
        setDataState(latest);
        document.title = `Sanket's Portfolio`;
      })
      .catch(console.warn)
      .finally(() => setIsSyncing(false));
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
    <PortfolioContext.Provider value={{ data, setData, save, isSyncing, isSaving }}>
      {children}
    </PortfolioContext.Provider>
  );
}

export default PortfolioProvider;
