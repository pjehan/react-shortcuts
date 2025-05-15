import { useEffect, useState } from "react"
import Filters, { type FiltersInterface } from "./components/Filters";
import Container from "./components/Container";
import { getCollection } from "./lib/api";
import type { Shortcut } from "./lib/interfaces";
import ShortcutList from "./components/ShortcutList";
import ShortcutForm from "./components/ShortcutForm";

function App() {
  const [filters, setFilters] = useState<FiltersInterface>({ software: null, categories: [] });
  const [shortcuts, setShortcuts] = useState<Shortcut[]>([]);
  const [isShortcutsLoading, setIsShortcutsLoading] = useState(false);

  useEffect(() => {
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
  }, [filters]);

  return (
    <>
      <header></header>
      <main>
        <Container>
          <Filters filters={filters} onChange={filters => setFilters(filters)}/>
        </Container>
        <Container>
          <ShortcutForm/>
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
