"use client";

import { SidebarContextProvider } from "@/context";
import { ThemeProvider } from "./ThemeProvider";
import AuthProvider from "./auth-provider";
import { RecoilRoot } from "recoil";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

type Props = { children: React.ReactNode };

export default function Providers({ children }: Props) {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
      },
    },
  });

  return (
    <RecoilRoot>
      <QueryClientProvider client={queryClient}>
        <AuthProvider interval={1000 * 60 * 14}>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <SidebarContextProvider>{children}</SidebarContextProvider>
          </ThemeProvider>
        </AuthProvider>
      </QueryClientProvider>
    </RecoilRoot>
  );
}
