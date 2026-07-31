"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, type CSSProperties } from "react";
import {
  CONTRACTOR_TEMPLATES,
  type ContractorTemplateId,
} from "@/content/contractor-templates";
import styles from "./Onboarding.module.css";

function TemplatePreview({ templateId }: { templateId: ContractorTemplateId }) {
  const template =
    CONTRACTOR_TEMPLATES.find((candidate) => candidate.id === templateId) ??
    CONTRACTOR_TEMPLATES[0];

  return (
    <div
      className={styles.preview}
      data-template={template.id}
      style={
        {
          "--preview-accent": template.accent,
          "--preview-ink": template.ink,
          "--preview-paper": template.paper,
        } as CSSProperties
      }
    >
      <div className={styles.previewNav}>
        <span className={styles.previewMark}>NE</span>
        <span className={styles.previewName}>Northline Electric</span>
        <span className={styles.previewLinks}>Services &nbsp; Service area</span>
        <span className={styles.previewCall}>Call now</span>
      </div>
      <div className={styles.previewHero}>
        <Image
          src="/contractor-electrician.png"
          alt=""
          fill
          sizes="(max-width: 760px) 92vw, 58vw"
          className={styles.previewImage}
        />
        <div className={styles.previewShade} />
        <div className={styles.previewCopy}>
          <span>Serving Cedar County</span>
          <h3>
            Electrical work,
            <br />
            ready when you are.
          </h3>
          <p>Clear communication. Careful work. One direct request path.</p>
          <div>
            <b>Request service</b>
            <i>(555) 010-2026</i>
          </div>
        </div>
      </div>
      <div className={styles.previewRail}>
        <span>Residential</span>
        <span>Commercial</span>
        <span>EV charging</span>
        <strong>Start a request →</strong>
      </div>
    </div>
  );
}

export default function TemplateGallery() {
  const [selectedId, setSelectedId] =
    useState<ContractorTemplateId>("heritage-craft");
  const selected =
    CONTRACTOR_TEMPLATES.find((template) => template.id === selectedId) ??
    CONTRACTOR_TEMPLATES[0];

  return (
    <div className={styles.gallery}>
      <div className={styles.templateList} aria-label="Public-site templates">
        {CONTRACTOR_TEMPLATES.map((template, index) => (
          <button
            key={template.id}
            type="button"
            aria-pressed={selectedId === template.id}
            className={selectedId === template.id ? styles.templateSelected : ""}
            onClick={() => setSelectedId(template.id)}
          >
            <span>{String(index + 1).padStart(2, "0")}</span>
            <div>
              <strong>{template.name}</strong>
              <small>{template.character}</small>
            </div>
            <i aria-hidden="true">↗</i>
          </button>
        ))}
      </div>

      <div className={styles.galleryStage}>
        <div className={styles.galleryStageHeader}>
          <div>
            <span>Live composition preview</span>
            <strong>{selected.name}</strong>
          </div>
          <p>{selected.description}</p>
        </div>
        <div className={styles.previewTransition} key={selected.id}>
          <TemplatePreview templateId={selected.id} />
        </div>
        <div className={styles.galleryDecision}>
          <p>
            <span>Best fit</span>
            {selected.idealFor}
          </p>
          <Link href={`/get-started?template=${selected.id}`}>
            Choose {selected.name} <span aria-hidden="true">→</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

export { TemplatePreview };
