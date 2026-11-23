// Precomputes the dotted world-map grid used on /life.
// Run with `node scripts/generate-world-map.mjs` after changing the size.
import { writeFileSync } from "node:fs";
import { getMapJSON } from "dotted-map";

const json = getMapJSON({ height: 50, grid: "vertical" });
writeFileSync(new URL("../app/lib/world-map.json", import.meta.url), json);
console.log(`wrote app/lib/world-map.json (${json.length} bytes)`);
