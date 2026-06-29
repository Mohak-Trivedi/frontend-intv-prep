import { useState, useEffect } from "react";
import { useDebounce } from "../hooks/useDebounce.js";
import { searchApi } from "../api/searchApi.js";

export default function Autocomplete() {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const debouncedQuery = useDebounce(query, 300);

  useEffect(() => {
    if (!debouncedQuery.trim()) {
      setSuggestions([]);
      setError(null);
      setLoading(false);
      return;
    }

    const controller = new AbortController();

    setLoading(true);
    setError(null);
    searchApi(debouncedQuery, { signal: controller.signal })
      .then((results) => {
        setSuggestions(results);
        setLoading(false);
      })
      .catch((err) => {
        if (err.name === "AbortError") return;
        setError("Something went wrong");
        setLoading(false);
      });
  }, [debouncedQuery]);

  return (
    <div className="autocomplete">
      <input
        type="text"
        placeholder="Search for a country..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

      <ul className="autocomplete__list">
        {suggestions.map((item) => (
          <li className="autocomplete__item" key={item}>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
