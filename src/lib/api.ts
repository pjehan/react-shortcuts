import type { Collection } from "./apiplatform";

export async function getCollection<T>(resource: string, params?: URLSearchParams): Promise<T[]> {
  let url = 'https://shortcuts.api.pierre-jehan.com/' + resource;
  if (params) {
    url += '?' + params.toString();
  }
  const response = await fetch(url);
  const collection: Collection<T> = await response.json();
  await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate a delay
  return collection['hydra:member'];
}