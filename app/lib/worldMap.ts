// Server-side only: imported by the /life server component at build time.
import DottedMap, { type MapData } from "dotted-map/without-countries";

import mapJson from "./world-map.json";

export type MapPinInput = { id: string; lat: number; lng: number };
export type MapPin = { id: string; row: number; col: number };

export type WorldMapGrid = {
  cols: number;
  rows: number;
  /** One string per row: "·" for land, " " for sea. */
  lines: string[];
  pins: MapPin[];
};

/**
 * Turns the precomputed dotted-map grid (see scripts/generate-world-map.mjs)
 * into text rows, and snaps each pin to its nearest grid cell.
 */
export function buildWorldMap(pinInputs: MapPinInput[]): WorldMapGrid {
  const map = new DottedMap({ map: mapJson as unknown as MapData });
  const land = map.getPoints();

  const xs = land.map((point) => point.x);
  const ys = land.map((point) => point.y);
  const minX = Math.min(...xs);
  const minY = Math.min(...ys);
  const cols = Math.max(...xs) - minX + 1;
  const rows = Math.max(...ys) - minY + 1;

  const grid = Array.from({ length: rows }, () => Array<string>(cols).fill(" "));
  for (const point of land) {
    grid[Math.round(point.y - minY)][Math.round(point.x - minX)] = "·";
  }

  const pins = pinInputs.map(({ id, lat, lng }) => {
    const point = map.addPin({ lat, lng });
    return {
      id,
      row: Math.min(rows - 1, Math.max(0, Math.round(point.y - minY))),
      col: Math.min(cols - 1, Math.max(0, Math.round(point.x - minX))),
    };
  });

  return { cols, rows, lines: grid.map((row) => row.join("")), pins };
}
