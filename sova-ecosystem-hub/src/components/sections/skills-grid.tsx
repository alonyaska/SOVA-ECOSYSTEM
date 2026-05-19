interface Skill {
  name: string;
  level: number; // 1-5
  category: string;
}

const skills: Skill[] = [
  { name: "Python", level: 5, category: "language" },
  { name: "Golang", level: 4, category: "language" },
  { name: "FastAPI", level: 4, category: "backend" },
  { name: "PostgreSQL", level: 4, category: "backend" },
  { name: "Docker", level: 4, category: "devops" },
  { name: "Redis", level: 3, category: "backend" },
  { name: "Git", level: 5, category: "tooling" },
  { name: "Gemini", level: 4, category: "ai" },
  { name: "Claude", level: 4, category: "ai" },
];

const categories = ["language", "backend", "devops", "tooling", "ai"] as const;

const categoryLabels: Record<string, string> = {
  language: "// languages",
  backend: "// backend",
  devops: "// devops & infra",
  tooling: "// tooling",
  ai: "// ai & ml",
};

export function SkillsGrid() {
  return (
    <section>
      <h2 className="font-mono text-lg font-semibold text-foreground">// stack</h2>
      <div className="mt-6 space-y-6">
        {categories.map((cat) => {
          const catSkills = skills.filter((s) => s.category === cat);
          if (catSkills.length === 0) return null;
          return (
            <div key={cat}>
              <div className="mb-3 font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
                {categoryLabels[cat]}
              </div>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
                {catSkills.map((s) => (
                  <div key={s.name} className="rounded-lg border border-border bg-card px-3 py-2.5">
                    <div className="font-mono text-sm font-medium text-foreground">{s.name}</div>
                    <div className="mt-1.5 flex gap-0.5">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <span
                          key={i}
                          className={`block h-1 flex-1 rounded-sm transition-colors ${
                            i < s.level ? "bg-primary" : "bg-border"
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
