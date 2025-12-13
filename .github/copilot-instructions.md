\# GitHub Copilot Instructions for EVA Suite



This repo is part of the EVA 2.0 workspace managed by \*\*eva-orchestrator\*\*.



\## 🔗 Primary Context



When working in this repository, always treat \*\*eva-orchestrator\*\* as the control plane:



1\. First, read (or assume as loaded) the orchestrator Copilot instructions in:  

&nbsp;  `../eva-orchestrator/.github/copilot-instructions.md`

2\. Apply the same Agile operating model, roles, and guardrails here.

3\. Use existing conventions from:

&nbsp;  - `README.md`

&nbsp;  - `docs/`

&nbsp;  - `scripts/`

&nbsp;  - `src/` (or other app folders)



\## ✅ Execution Evidence Rule



For every script, command, or workflow you generate in this repo, you MUST:



1\. Explain \*\*exactly how to run it safely\*\*  

&nbsp;  - Which directory to run from  

&nbsp;  - Any required environment variables, tools, or pre-steps

2\. Describe \*\*what successful execution looks like\*\*  

&nbsp;  - Sample console output, logs, created files, or visible UI changes

3\. Clearly flag anything that has \*\*not actually been executed\*\* as:  

&nbsp;  `NOT EXECUTED – REVIEW CAREFULLY`



> Never hand Marco code or commands without an explicit test/validation plan and expected results.



\## 🧩 Working Style



\- Prefer \*\*small, testable changes\*\* over large refactors.

\- Keep answers \*\*concise and structured\*\* (headings, bullets, code blocks).

\- When in doubt, \*\*ask for clarification\*\*, don’t assume.

\- Document non-trivial decisions in `docs/` (or the place indicated by README).





