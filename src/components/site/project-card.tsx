import Link from "next/link";

import { Devices } from "@/components/site/devices";
import { ArrowUpRight } from "@/components/site/icons";
import type { Project } from "@/data/projects";

export function ProjectCard({
  project,
  wide = false,
  reveal = true,
}: {
  project: Project;
  wide?: boolean;
  reveal?: boolean;
}) {
  return (
    <Link
      href={`/work/${project.slug}`}
      className={`proj-card${wide ? " proj-card--wide" : ""}`}
      data-reveal={reveal ? "" : undefined}
    >
      <div className="proj-card__tile" style={{ background: project.tile }}>
        <div className="proj-card__tags">
          <span className="tag tag--client">{project.sector}</span>
          {project.status ? <span className="tag">{project.status.replace(" launching soon", "")}</span> : null}
        </div>
        <Devices slug={project.slug} name={project.name} />
      </div>
      <div className="proj-card__meta">
        <div>
          <h3 className="proj-card__name">{project.name}</h3>
          <p className="proj-card__sector">
            {project.sector}
            {project.location ? ` · ${project.location}` : ""}
          </p>
        </div>
        <span className="proj-card__arrow" aria-hidden>
          <ArrowUpRight />
        </span>
      </div>
      <p className="proj-card__summary">{project.summary}</p>
    </Link>
  );
}
