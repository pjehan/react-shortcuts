import { useEffect, useState } from "react"
import { useAppDispatch } from './AppContext';
import Filters, { type FiltersInterface } from "./components/Filters";
import Container from "./components/Container";
import { getCollection } from "./lib/api";
import type { Software, Category, Shortcut } from "./lib/interfaces";
import ShortcutList from "./components/ShortcutList";
import ShortcutForm from "./components/ShortcutForm";

function App() {
  const dispatch = useAppDispatch();
  const [filters, setFilters] = useState<FiltersInterface>({ software: null, categories: [] });
  const [shortcuts, setShortcuts] = useState<Shortcut[]>([]);
  const [isShortcutsLoading, setIsShortcutsLoading] = useState(false);

  function refreshShortcuts() {
    setIsShortcutsLoading(true);
    let searchParams = new URLSearchParams();
    if (filters.software) {
      searchParams.append('software.id', filters.software.toString());
    }
    for (const categoryId of filters.categories) {
      searchParams.append('categories.id[]', categoryId.toString());      
    }
    getCollection<Shortcut>('shortcuts', searchParams).then(data => {
      setShortcuts(data);
      setIsShortcutsLoading(false);
    });
  }

  useEffect(() => {
    if (dispatch !== null) {
      dispatch({ type: 'SET_SOFTWARE_LOADING', payload: true });
      dispatch({ type: 'SET_CATEGORIES_LOADING', payload: true });
      getCollection<Software>('software').then(data => dispatch({ type: 'SET_SOFTWARE', payload: data }));
      getCollection<Category>('categories').then(data => dispatch({ type: 'SET_CATEGORIES', payload: data }));
    }
    refreshShortcuts();
  }, [filters]);

  return (
    <>
      <header></header>
      <main>
        <Container>
          <Filters filters={filters} onChange={filters => setFilters(filters)}/>
        </Container>
        <Container>
          <ShortcutForm onSave={() => refreshShortcuts()}/>
        </Container>
        <Container>
          <ShortcutList shortcuts={shortcuts} loading={isShortcutsLoading}/>
        </Container>
      </main>
      <footer></footer>
    </>
  )
}

export default App
