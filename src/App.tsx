import { useState } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HelloPage } from "@/components/HelloPage";
import { DiaryPage } from "@/components/DiaryPage";

const queryClient = new QueryClient();

const App = () => {
  const [showDiary, setShowDiary] = useState(false);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        {showDiary ? (
          <DiaryPage onNavigateBack={() => setShowDiary(false)} />
        ) : (
          <HelloPage onNavigateToDiary={() => setShowDiary(true)} />
        )}
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
