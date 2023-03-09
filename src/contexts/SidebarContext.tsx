import React from "react";

const initialValue = {
  isCoollapsedSidebar: false,
  toggleSidebarCollapsedHandler: () => {},
};

const SidebarContext = React.createContext(initialValue);

interface Props {
  children: React.ReactNode | React.ReactNode[];
}

const SidebarProvider = ({ children }: Props) => {
  const [isCoollapsedSidebar, SetIsCoollapsedSidebar] =
    React.useState<boolean>(false);

  const toggleSidebarCollapsedHandler = () => {
    SetIsCoollapsedSidebar(!isCoollapsedSidebar);
  };
  return (
    <SidebarContext.Provider
      value={{ isCoollapsedSidebar, toggleSidebarCollapsedHandler }}
    >
      {children}
    </SidebarContext.Provider>
  );
};

export { SidebarContext, SidebarProvider };