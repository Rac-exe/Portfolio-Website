"use client";

import { useEffect } from "react";

const THEMES = ["draft", "paint", "coffee"] as const;
const DEFAULT_THEME = "paint";
const THEME_STORAGE_KEY = "comic-theme";

function getValidTheme(theme: string | null) {
  return THEMES.find((candidate) => candidate === theme) ?? DEFAULT_THEME;
}

export default function ComicThemePersistence() {
  useEffect(() => {
    const theme = getValidTheme(localStorage.getItem(THEME_STORAGE_KEY));

    document.documentElement.dataset.comicTheme = theme;
    localStorage.setItem(THEME_STORAGE_KEY, theme);
  }, []);

  return null;
}
