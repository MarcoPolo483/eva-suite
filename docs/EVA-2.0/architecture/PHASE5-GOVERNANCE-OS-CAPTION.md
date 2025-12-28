# Phase 5+ Governance OS — Caption (Copilot Language)

- Purpose: Executive overview of governance at scale (40+ products).
- Per-Repo: PR templates use CLAIM tokens; `.eva-memory.json` and evidence folders feed CI.
- Central Policy: One policy + schema + versioned enforcement bundle; lifecycle rules allow deprecation/migration.
- Evidence Registry: Git-native packs (WCAG, GC-DS, bilingual) with `provenance.json` to track origin/freshness.
- Telemetry: Daily aggregator produces `governance-metrics.json` for dashboards.
- Policy Evolution: Deprecation engine warns/soft-fails/hard-fails; migration PRs help teams update.
- GC Controls: Outputs for ATO packages and AIRA/EARB evidence export (continuous ATO).
- Why it scales: clear boundaries (repo vs central), provenance, telemetry, and automated migration support.
