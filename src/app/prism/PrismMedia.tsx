import { APPROVED_PRISM12_MEDIA } from "./media";
import type { PrismItem } from "./items";
import styles from "./prism.module.css";

type Props = { item: PrismItem };

export default function PrismMedia({ item }: Props) {
  const media = APPROVED_PRISM12_MEDIA[item.id];
  if (!media) {
    return (
      <div className={styles.poster} aria-hidden="true" data-media-status="storyboard">
        {item.illustration}
      </div>
    );
  }

  if (media.kind === "video") {
    return (
      <figure className={styles.mediaFigure}>
        <video controls playsInline preload="metadata" poster={media.poster} aria-label={"Recorded scenario: " + item.title}>
          <source src={media.src} />
          <track kind="captions" src={media.captions} srcLang="en" label="English captions" default />
          Your browser cannot play this video. Review the scenario text below.
        </video>
        <figcaption>Consented, reviewed actor performance · stimulus version {media.version}</figcaption>
      </figure>
    );
  }

  if (media.kind === "silent-video") {
    return (
      <figure className={styles.mediaFigure}>
        <video controls playsInline preload="metadata" muted poster={media.poster} aria-label={"Silent scenario: " + item.title}>
          <source src={media.src} />
          Your browser cannot play this silent video.
        </video>
        <figcaption>Silent performance · {media.descriptiveTranscript}</figcaption>
      </figure>
    );
  }

  return (
    <div className={styles.audioFigure}>
      <audio controls preload="metadata" aria-label={"Recorded speech: " + item.title}>
        <source src={media.src} />
        Your browser cannot play this audio.
      </audio>
      <details>
        <summary>Text transcript</summary>
        <p>{media.transcript}</p>
      </details>
      <p>Consented, reviewed actor recording · stimulus version {media.version}</p>
    </div>
  );
}
