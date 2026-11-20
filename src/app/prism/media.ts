/**
 * Controlled audiovisual stimulus registry for the PRISM research pilot.
 *
 * Release requirements:
 * - actor consent / usage rights documented in the private production register;
 * - nonliteral interpretation keyed by multiple independent raters;
 * - recorded delivery, context, audio mastering and captions reviewed;
 * - checksum of each final media object captured in a versioned manifest;
 * - prospective research approval where applicable.
 *
 * No media assets have yet passed these gates. Do NOT fabricate URLs or
 * substitute another study's copyrighted clinical stimuli.
 */
export type ApprovedPrismMedia =
  | {
      kind: "video";
      src: string;
      captions: string;
      poster?: string;
      sha256: string;
      version: string;
      releaseReference: string;
      adjudicationReference: string;
    }
  | {
      kind: "audio";
      src: string;
      transcript: string;
      sha256: string;
      version: string;
      releaseReference: string;
      adjudicationReference: string;
    }
  | {
      kind: "silent-video";
      src: string;
      poster?: string;
      descriptiveTranscript: string;
      sha256: string;
      version: string;
      releaseReference: string;
      adjudicationReference: string;
    };

// Future consented, independently reviewed production assets only.
// Absence of entries intentionally keeps the site in text/storyboard demo mode.
export const APPROVED_PRISM12_MEDIA: Readonly<Record<string, ApprovedPrismMedia>> = Object.freeze({});
