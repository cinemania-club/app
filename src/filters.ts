export const MOVIE_GENRES = [
  { label: "Ação", value: 28 },
  { label: "Aventura", value: 12 },
  { label: "Animação", value: 16 },
  { label: "Comédia", value: 35 },
  { label: "Policial", value: 80 },
  { label: "Documentário", value: 99, shortLabel: "Doc." },
  { label: "Drama", value: 18 },
  { label: "Família", value: 10751 },
  { label: "Fantasia", value: 14 },
  { label: "Histórico", value: 36 },
  { label: "Terror", value: 27 },
  { label: "Música", value: 10402 },
  { label: "Mistério", value: 9648 },
  { label: "Romance", value: 10749 },
  { label: "Sci-Fi", value: 878 },
  { label: "Suspense", value: 53 },
  { label: "Guerra", value: 10752 },
  { label: "Faroeste", value: 37 },
].sort((a, b) => a.label.localeCompare(b.label));

export const SERIES_GENRES = [
  { label: "Ação / Aventura", value: 10759, shortLabel: "Ação" },
  { label: "Animação", value: 16 },
  { label: "Comédia", value: 35 },
  { label: "Policial", value: 80 },
  { label: "Documentário", value: 99, shortLabel: "Doc." },
  { label: "Drama", value: 18 },
  { label: "Família", value: 10751 },
  { label: "Infantil", value: 10762 },
  { label: "Mistério", value: 9648 },
  { label: "Notícias", value: 10763 },
  { label: "Reality Show", value: 10764, shortLabel: "Reality" },
  { label: "Sci-Fi / Fantasia", value: 10765, shortLabel: "Sci-Fi" },
  { label: "Novela", value: 10766 },
  { label: "Talk show", value: 10767 },
  { label: "Guerra / Política", value: 10768, shortLabel: "Guerra" },
  { label: "Faroeste", value: 37 },
].sort((a, b) => a.label.localeCompare(b.label));
