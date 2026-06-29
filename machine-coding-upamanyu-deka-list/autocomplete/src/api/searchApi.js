import { countries } from "../data/countries.js";

export function searchApi(query, { signal } = {}) {
  return new Promise((resolve, reject) => {
    const trimmed = query.trim().toLowerCase();
    const delay = 300 + Math.random() * 500;

    const timer = setTimeout(() => {
      if (!trimmed) {
        resolve([]);
        return;
      }

      const results = countries.filter((country) =>
        country.toLowerCase().includes(trimmed),
      );
      resolve(results);
    }, delay);

    if (signal) {
      signal.addEventListener("abort", () => {
        clearTimeout(timer);
        reject(new DOMException("Aborted", "AbortError"));
      });
    }
  });
}
