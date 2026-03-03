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
  const [data, setDataState] = useState<PortfolioData>(loadData);
  const [isSyncing, setIsSyncing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    // 5 second timeout — agar Supabase slow ho toh wait nahi karta
    const timeout = new Promise<never>((_, reject) =>
      setTimeout(() => reject(new Error("timeout")), 5000)
    );

    Promise.race([loadDataAsync(), timeout])
      .then((latest) => {
        setDataState(latest as PortfolioData);
        document.title = `Sanket's Portfolio`;
      })
      .catch(() => {
        // Supabase failed ya timeout — localStorage/default data already show ho raha hai
        console.warn("Supabase unavailable, using cached data");
      })
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