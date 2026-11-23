"use client";

import Image from "next/image";
import { useState } from "react";

import type { Photo as PhotoData } from "../lib/life";

type PhotoProps = {
  photo: PhotoData;
  sizes: string;
  showCaption?: boolean;
};

export default function Photo({ photo, sizes, showCaption = true }: PhotoProps) {
  const [loaded, setLoaded] = useState(false);

  return (
    <figure className="photo">
      <div className="photo-frame" style={{ aspectRatio: photo.ratio ?? "3 / 2" }}>
        {photo.src ? (
          <Image
            alt={photo.alt}
            data-loaded={loaded}
            fill
            onLoad={() => setLoaded(true)}
            sizes={sizes}
            src={photo.src}
          />
        ) : null}
      </div>
      {showCaption ? <figcaption className="mono muted">{photo.caption}</figcaption> : null}
    </figure>
  );
}
