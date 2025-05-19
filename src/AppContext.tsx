import { createContext, useContext, useReducer } from 'react';
import type { Category, Software } from './lib/interfaces';

const AppContext = createContext<State | null>(null);

const AppDispatchContext = createContext<React.Dispatch<Action> | null>(null);

export function useApp() {
  return useContext(AppContext);
}

export function useAppDispatch() {
  return useContext(AppDispatchContext);
}

interface State {
    software: Software[];
    categories: Category[];
    isSoftwareLoading: boolean;
    isCategoriesLoading: boolean;
}

interface Action {
    type: 'SET_SOFTWARE' | 'SET_CATEGORIES' | 'SET_SOFTWARE_LOADING' | 'SET_CATEGORIES_LOADING';
    payload: any;
}

const initialState: State = {
    software: [],
    categories: [],
    isSoftwareLoading: false,
    isCategoriesLoading: false,
};

function appReducer(state: State, action: Action) {
    switch (action.type) {
        case 'SET_SOFTWARE':
            return { ...state, software: action.payload, isSoftwareLoading: false };
        case 'SET_CATEGORIES':
            return { ...state, categories: action.payload, isCategoriesLoading: false };
        case 'SET_SOFTWARE_LOADING':
            return { ...state, isSoftwareLoading: action.payload };
        case 'SET_CATEGORIES_LOADING':
            return { ...state, isCategoriesLoading: action.payload };
        default:
            throw new Error(`Unknown action type: ${action.type}`);
    }
}

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(
    appReducer,
    initialState
  );

  return (
    <AppContext.Provider value={state}>
      <AppDispatchContext.Provider value={dispatch}>
        {children}
      </AppDispatchContext.Provider>
    </AppContext.Provider>
  );
}