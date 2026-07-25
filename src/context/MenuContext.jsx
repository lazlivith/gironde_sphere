import React, { createContext, useContext, useState, useEffect } from 'react';
import { fetchMenuFromSheets } from '../services/menuService';
import staticMenu from '../data/menu.json';

const MenuContext = createContext();

export const useMenu = () => {
  return useContext(MenuContext);
};

export const MenuProvider = ({ children }) => {
  const [menu, setMenu] = useState(staticMenu); // Start with static data to avoid breaking UI immediately
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadMenu = async () => {
      try {
        const dynamicMenu = await fetchMenuFromSheets();
        setMenu(dynamicMenu);
      } catch (err) {
        console.error("Failed to load dynamic menu", err);
        setError(err);
      }
    };

    // Initial load with loading screen
    const initialLoad = async () => {
      setLoading(true);
      await loadMenu();
      setLoading(false);
    };

    initialLoad();

    // Auto-refresh every 15 seconds in the background (no loading screen)
    const intervalId = setInterval(() => {
      loadMenu();
    }, 15000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <MenuContext.Provider value={{ menu, loading, error }}>
      {children}
    </MenuContext.Provider>
  );
};
