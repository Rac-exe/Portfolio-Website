// Content for /life. Everything here is placeholder until Prabhat sends the
// real story, photos (Cloudinary URLs) and trips. A photo with no `src`
// renders as an empty frame with its caption. Trip coordinates are
// placeholders too: replace them with the real places.

/**
 * Flip to true once the story, photos and trips below are real. While false,
 * /life returns 404 and every link to it is hidden, so no placeholder ships.
 */
export const LIFE_READY = false;

export type Photo = {
  src?: string;
  alt: string;
  caption: string;
  /** CSS aspect-ratio, e.g. "3 / 2". Defaults to "3 / 2". */
  ratio?: string;
};

export type StoryBlock =
  | { type: "text"; text: string }
  | { type: "photo"; photo: Photo }
  | { type: "pair"; photos: [Photo, Photo] };

export type Trip = {
  slug: string;
  name: string;
  when: string;
  lat: number;
  lng: number;
  note: string;
  photos: Photo[];
};

/** Home base, drawn as a ring on the map. */
export const HOME = { name: "Bengaluru", lat: 12.97, lng: 77.59 };

export function formatCoords(lat: number, lng: number) {
  const ns = lat >= 0 ? "N" : "S";
  const ew = lng >= 0 ? "E" : "W";
  return `${Math.abs(lat).toFixed(2)}°${ns} ${Math.abs(lng).toFixed(2)}°${ew}`;
}

export const STORY: StoryBlock[] = [
  {
    type: "text",
    text: "Draft: chapter one. Where you grew up, and the first time a computer made you curious.",
  },
  {
    type: "photo",
    photo: { alt: "Placeholder", caption: "first computer · year", ratio: "16 / 7" },
  },
  {
    type: "text",
    text: "Draft: chapter two. College, the first things you built, and how Prmpt started.",
  },
  {
    type: "pair",
    photos: [
      { alt: "Placeholder", caption: "a hackathon · year", ratio: "4 / 3" },
      { alt: "Placeholder", caption: "the ecu bench · 2026", ratio: "4 / 3" },
    ],
  },
  {
    type: "text",
    text: "Draft: chapter three. ThinkSeed, getting pulled towards hardware, and what you want to build next.",
  },
];

export const TRIPS: Trip[] = [
  {
    slug: "trip-one",
    lat: 34.15,
    lng: 77.58,
    name: "Trip one",
    when: "Month 2026",
    note: "Draft: two or three lines about this trip.",
    photos: [
      { alt: "Placeholder", caption: "trip one", ratio: "3 / 4" },
      { alt: "Placeholder", caption: "trip one", ratio: "3 / 2" },
      { alt: "Placeholder", caption: "trip one", ratio: "3 / 2" },
    ],
  },
  {
    slug: "trip-two",
    lat: 15.3,
    lng: 74.12,
    name: "Trip two",
    when: "Month 2026",
    note: "Draft: two or three lines about this trip.",
    photos: [
      { alt: "Placeholder", caption: "trip two", ratio: "3 / 4" },
      { alt: "Placeholder", caption: "trip two", ratio: "3 / 2" },
      { alt: "Placeholder", caption: "trip two", ratio: "3 / 2" },
    ],
  },
  {
    slug: "trip-three",
    lat: 1.35,
    lng: 103.82,
    name: "Trip three",
    when: "Month 2025",
    note: "Draft: two or three lines about this trip.",
    photos: [
      { alt: "Placeholder", caption: "trip three", ratio: "3 / 4" },
      { alt: "Placeholder", caption: "trip three", ratio: "3 / 2" },
      { alt: "Placeholder", caption: "trip three", ratio: "3 / 2" },
    ],
  },
  {
    slug: "trip-four",
    lat: 27.17,
    lng: 78.04,
    name: "Trip four",
    when: "Month 2025",
    note: "Draft: two or three lines about this trip.",
    photos: [
      { alt: "Placeholder", caption: "trip four", ratio: "3 / 4" },
      { alt: "Placeholder", caption: "trip four", ratio: "3 / 2" },
      { alt: "Placeholder", caption: "trip four", ratio: "3 / 2" },
    ],
  },
];
