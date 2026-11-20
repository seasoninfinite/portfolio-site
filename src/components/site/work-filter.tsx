"use client";

import { useState } from "react";

import { ProjectCard } from "@/components/site/project-card";
import { CATEGORY_LABELS, type Category, type Project } from "@/data/projects";

type F = "all" | Category;

export function WorkFilter({ projects }: { projects: Project[] }) {
  const [f, setF] = useState<F>("all");
  const list = f === "all" ? projects : projects.filter((p) => p.category === f);
  const count = (k: F) => (k === "all" ? projects.length : projects.filter((p) => p.category === k).length);
  const keys: F[] = ["all", ...(Object.keys(CATEGORY_LABELS) as Category[])];

  return (
    <>
      <div className="filter" role="group" aria-label="Filter projects by industry">
        {keys.map((k) => (
          <button key={k} type="button" aria-pressed={f === k} onClick={() => setF(k)}>
            {k === "all" ? "All work" : CATEGORY_LABELS[k]}
            <span>{count(k)}</span>
          </button>
        ))}
      </div>
      <div className="work-grid">
        {list.map((p) => (
          <ProjectCard key={p.slug} project={p} reveal={false} />
        ))}
      </div>
    </>
  );
}
