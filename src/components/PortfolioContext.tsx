import { createContext, useState, useEffect } from "react";
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
}

export const PortfolioContext = createContext<PortfolioContextType | null>(null);

function PortfolioProvider({ children }: { children: ReactNode }) {
  // Start with defaultData (not localStorage) — nothing renders until Supabase responds
  const [data, setDataState] = useState<PortfolioData>(defaultData);
  const [isSyncing, setIsSyncing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isLoading, setIsLoading] = useState(true); // ← skeleton shown until this is false

  useEffect(() => {
    const timeout = new Promise<never>((_, reject) =>
      setTimeout(() => reject(new Error("timeout")), 5000)
    );

    Promise.race([loadDataAsync(), timeout])
      .then(async (latest) => {
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
        document.title = `Sanket's Portfolio`;
      })
      .catch(() => {
        console.warn("Supabase unavailable, using default data");
      })
      .finally(() => {
        setIsLoading(false); // ← skeleton hatao, real data dikhaao
        setIsSyncing(false);
      });
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
    <PortfolioContext.Provider value={{ data, setData, save, isSyncing, isSaving, isLoading }}>
      {children}
    </PortfolioContext.Provider>
  );
}

export default PortfolioProvider;