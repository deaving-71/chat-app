import { createContext, useContext, useState } from "react";

type SidebarContext = {
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
  isRightinfobarOpen: boolean;
  toggleRightinfobar: () => void;
};

const SidebarContext = createContext<SidebarContext | null>(null);

const useSidebarContext = () => {
  const context = useContext(SidebarContext);
  if (!context)
    throw new Error(
      "useSidebarContext must be used with a SidebarContextProvider",
    );

  return context;
};

type Props = {
  children: React.ReactNode;
};

const SidebarContextProvider = ({ children }: Props) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(true);
  const [isRightinfobarOpen, setIsRightinfobarOpen] = useState<boolean>(true);

  const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);
  const toggleRightinfobar = () => setIsRightinfobarOpen((prev) => !prev);

  return (
    <SidebarContext.Provider
      value={{
        isSidebarOpen,
        isRightinfobarOpen,
        toggleSidebar,
        toggleRightinfobar,
      }}
    >
      {children}
    </SidebarContext.Provider>
  );
};

export { useSidebarContext, SidebarContextProvider };
