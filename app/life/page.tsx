import type { Metadata } from "next";

import Photo from "../components/Photo";
import WorldMap from "../components/WorldMap";
import { notFound } from "next/navigation";

import { formatCoords, HOME, LIFE_READY, STORY, TRIPS, type StoryBlock } from "../lib/life";
import { buildWorldMap } from "../lib/worldMap";

export const metadata: Metadata = {
  title: "Life",
  description: "Prabhat Bajpai beyond work: the longer story, and places travelled.",
};

const WIDE = "(max-width: 1000px) 100vw, 960px";
const HALF = "(max-width: 1000px) 50vw, 480px";

function renderBlock(block: StoryBlock, index: number) {
  if (block.type === "text") {
    return <p key={index}>{block.text}</p>;
  }

  if (block.type === "photo") {
    return (
      <div className="breakout" key={index}>
        <Photo photo={block.photo} sizes={WIDE} />
      </div>
    );
  }

  return (
    <div className="breakout photo-pair" key={index}>
      {block.photos.map((photo, photoIndex) => (
        <Photo key={photoIndex} photo={photo} sizes={HALF} />
      ))}
    </div>
  );
}

export default function LifePage() {
  if (!LIFE_READY) notFound();

  const world = buildWorldMap([
    { id: "__home", lat: HOME.lat, lng: HOME.lng },
    ...TRIPS.map((trip) => ({ id: trip.slug, lat: trip.lat, lng: trip.lng })),
  ]);
  const homePin = world.pins.find((pin) => pin.id === "__home")!;

  return (
    <>
      <header>
        <h1 className="page-title">Life</h1>
        <p className="lede">The longer version, and the places in between.</p>
      </header>

      <div className="story section">{STORY.map(renderBlock)}</div>

      <section className="section" aria-labelledby="places-heading">
        <h2 className="section-title" id="places-heading">
          Places
        </h2>

        <div className="breakout">
          <WorldMap
            cols={world.cols}
            home={{ ...homePin, name: HOME.name }}
            lines={world.lines}
            pins={TRIPS.map((trip) => {
              const pin = world.pins.find((candidate) => candidate.id === trip.slug)!;
              return {
                id: trip.slug,
                row: pin.row,
                col: pin.col,
                name: trip.name,
                when: trip.when,
                coords: formatCoords(trip.lat, trip.lng),
                note: trip.note,
                photo: trip.photos[0],
              };
            })}
            rows={world.rows}
          />
          <p className="world-legend mono muted">
            <span className="legend-pin" aria-hidden="true" /> been there
            <span className="legend-home" aria-hidden="true" /> home
            <span className="legend-hint">hover a dot</span>
          </p>
        </div>

        <div className="trips">
          {TRIPS.map((trip) => (
            <article className="trip" id={trip.slug} key={trip.slug}>
              <div className="trip-head">
                <h3>{trip.name}</h3>
                <span className="mono muted">
                  {formatCoords(trip.lat, trip.lng)} · {trip.when}
                </span>
              </div>
              <div className="breakout trip-photos">
                {trip.photos.slice(0, 3).map((photo, photoIndex) => (
                  <Photo
                    key={photoIndex}
                    photo={photo}
                    showCaption={false}
                    sizes={photoIndex === 0 ? HALF : "(max-width: 1000px) 50vw, 320px"}
                  />
                ))}
              </div>
              <p>{trip.note}</p>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
