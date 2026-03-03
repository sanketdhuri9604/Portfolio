Promise.race([loadDataAsync(), timeout])
  .then(async (latest) => {
    const d = latest as PortfolioData;
    
    // Pehle avatar image preload karo
    if (d.about?.avatar) {
      await new Promise((resolve) => {
        const img = new Image();
        img.onload = resolve;
        img.onerror = resolve; // error pe bhi proceed karo
        img.src = d.about.avatar!;
      });
    }
    
    // Image load hone ke baad hi state update karo
    setDataState(d);
    document.title = `Sanket's Portfolio`;
  })
  .catch(() => {
    console.warn("Supabase unavailable, using cached data");
  })
  .finally(() => setIsSyncing(false));