// Step 2: Basic Zustand Store Creation
// This will replace your useIplData hook

import { create } from 'zustand';
import type { IScraped } from '../types/Match';

// 1. Define the shape of our store (what data and functions it will have)
interface IplStore {
  // State properties
  data: IScraped | null;
  loading: boolean;
  error: Error | null;
  
  // Actions (functions that can modify the state)
  fetchData: () => Promise<void>;
}

// 2. Create the store using Zustand's create function
export const useIplStore = create<IplStore>((set, get) => ({
  // 3. Initial state
  data: null,
  loading: false,
  error: null,
  
  // 4. Simple fetch - only fetches if we don't already have data
  fetchData: async () => {
   
    const state = get();
    
    // ✅ Check if we already have data
    if (state.data) {
      return; // Don't fetch again!
    }
    
    // ✅ Check if already loading 
    if (state.loading) {
      return;
    }
    
    try {
    //   console.log('🌐 Fetching fresh data from API...');
      set({ loading: true, error: null });
      
      // Same API call as your useIplData hook
      const res = await fetch('/api/scrape');
      if (!res.ok) {
        throw new Error(`Failed to fetch data: ${res.statusText}`);
      }
      const result: IScraped = await res.json();
      
      // Update state with fetched data
      set({ 
        data: result, 
        loading: false, 
        error: null 
      });
      
    //   console.log('✅ Data fetched and cached!');
      
    } catch (err) {
      // Handle error
      console.error('❌ Error fetching data:', err);
      set({ 
        error: err as Error, 
        loading: false 
      });
    }
  },
}));
