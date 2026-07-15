#!/usr/bin/env node
// Builds chat/<name>.md from .claude/rules, .claude/skills/*/SKILL.md, .claude/agents.
// Deterministic: same sources always produce the same chat/ output byte-for-byte.
//
// Usage:
//   node scripts/build-chat.mjs           build chat/ from current sources
//   node scripts/build-chat.mjs --check   exit 1 if chat/ is stale, without writing

import { readFileSync, writeFileSync, mkdirSync, existsSync, readdirSync, rmSync } from "node:fs";
import { join, dirname, basename } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const CLAUDE_DIR = join(ROOT, ".claude");
const CHAT_DIR = join(ROOT, "chat");

function listMdFiles(dir) {
  if (!existsSync(dir)) return [];
  return readdirSync(dir)
    .filter((f) => f.endsWith(".md"))
    .sort();
}

function findSources() {
  const sources = [];

  for (const f of listMdFiles(join(CLAUDE_DIR, "rules"))) {
    sources.push({ slug: basename(f, ".md"), path: join(CLAUDE_DIR, "rules", f) });
  }

  const skillsDir = join(CLAUDE_DIR, "skills");
  if (existsSync(skillsDir)) {
    for (const d of readdirSync(skillsDir).sort()) {
      const skillFile = join(skillsDir, d, "SKILL.md");
      if (existsSync(skillFile)) sources.push({ slug: d, path: skillFile });
    }
  }

  for (const f of listMdFiles(join(CLAUDE_DIR, "agents"))) {
    sources.push({ slug: basename(f, ".md"), path: join(CLAUDE_DIR, "agents", f) });
  }

  return sources;
}

// Splits a `---\n...\n---\n` YAML frontmatter block from the body. Only
// simple `key: value` lines are parsed (every frontmatter field in this
// repo is single-line) — no general YAML parser is needed.
function parseFrontmatter(raw) {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?/);
  if (!match) return { frontmatter: {}, body: raw };
  const frontmatter = {};
  for (const line of match[1].split(/\r?\n/)) {
    const kv = line.match(/^([A-Za-z0-9_-]+):\s*(.*)$/);
    if (kv) frontmatter[kv[1]] = kv[2].trim();
  }
  return { frontmatter, body: raw.slice(match[0].length) };
}

// Chat mode has no filesystem, so any reference to another file must become
// plain inline text instead of a path a reader can't follow.
function resolveReferences(text) {
  // [label](any-non-http-target) -> label
  text = text.replace(/\[([^\]]+)\]\((?!https?:\/\/)[^)]*\)/g, "$1");
  // `some/relative/path.ext` -> `basename` (drop directories and extension)
  text = text.replace(/`(?:\.{1,2}\/)?(?:[\w.-]+\/)*([\w-]+)\.\w+`/g, "`$1`");
  return text;
}

function deriveFallbackRole(body) {
  const heading = body.match(/^#\s+(.*)$/m);
  if (!heading) return "General guidance.";
  return heading[1].replace(/[`*_]/g, "").trim();
}

function buildOne({ path }) {
  const raw = readFileSync(path, "utf8");
  const { frontmatter, body } = parseFrontmatter(raw);
  const role = resolveReferences(frontmatter.description || deriveFallbackRole(body));
  const cleanedBody = resolveReferences(body.trim());
  return `ROLE: ${role}\n\n${cleanedBody}\n`;
}

function main() {
  const checkMode = process.argv.includes("--check");
  const sources = findSources();

  const expected = new Map();
  for (const source of sources) {
    const name = `${source.slug}.md`;
    if (expected.has(name)) {
      console.error(`build-chat: duplicate output name "${name}" (from ${source.path}) — rename one source`);
      process.exit(1);
    }
    expected.set(name, buildOne(source));
  }

  const existingMd = existsSync(CHAT_DIR)
    ? readdirSync(CHAT_DIR).filter((f) => f.endsWith(".md"))
    : [];

  if (checkMode) {
    const stale = [];
    for (const [name, content] of expected) {
      const outPath = join(CHAT_DIR, name);
      if (!existsSync(outPath) || readFileSync(outPath, "utf8") !== content) {
        stale.push(name);
      }
    }
    const orphans = existingMd.filter((f) => !expected.has(f));

    if (stale.length || orphans.length) {
      console.error("chat/ is stale relative to .claude/ sources:");
      for (const f of stale) console.error(`  needs rebuild: chat/${f}`);
      for (const f of orphans) console.error(`  orphaned (no matching source): chat/${f}`);
      process.exit(1);
    }
    console.log(`chat/ is up to date (${expected.size} file(s)).`);
    process.exit(0);
  }

  mkdirSync(CHAT_DIR, { recursive: true });
  for (const [name, content] of expected) {
    writeFileSync(join(CHAT_DIR, name), content);
  }
  for (const f of existingMd) {
    if (!expected.has(f)) {
      rmSync(join(CHAT_DIR, f));
      console.log(`removed stale chat/${f}`);
    }
  }
  console.log(`Built ${expected.size} chat file(s) into chat/.`);
}

main();
