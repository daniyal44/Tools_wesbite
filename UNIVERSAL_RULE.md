# ⚠️ UNIVERSAL_RULE.md — PERMANENT PRESERVATION & ZERO DELETION LAW

> **STATUS: PERPETUAL, IMMUTABLE, AND MANDATORY FOR ALL AGENTS, DEVELOPERS, AND AUTOMATION TOOLS.**  
> **JURISDICTION: ENTIRE REPOSITORY, PARENT DIRECTORIES, SUBDIRECTORIES, CODEBASE, AND CONFIGURATIONS.**

---

## 🛑 THE SUPREME INVARIANT (KHAS TAUR PAR YAAD RAKHO)

```
========================================================================================
  GALTI SE BHI KISI BHI CHEEZ KO PERMANENTLY DELETE MAT KARNA!
  KHAS TAUR PAR PROJECT YA WEBSITE KO KABHI BHI DELETE MAT KARNA!
  YE IS REPOSITORY KA UNIVERSAL RULE HAI — BAR BAR KAHA JA RAHA HAI:
  DO NOT DELETE THE PROJECT, WEBSITE, OR ANY FILE UNDER ANY CIRCUMSTANCES!
========================================================================================
```

---

## 📜 Section 1: Strict Prohibition of Deletions

1. **Zero Project Deletion**:
   - Never delete or move the root folder `Tools_wesbite` or the application folder `zevylo`.
   - Never run destructive folder deletion commands such as:
     - `rm -rf` / `rmdir /s /q` / `Remove-Item -Recurse -Force` targeting the project or source directories.
     - `git clean -fdx` (which wipes uncommitted files).
     - Git hard resets that destroy unpushed work (`git reset --hard` on unknown commits).
2. **Zero Code Erasure**:
   - Never delete tool components in `zevylo/src/tools/`.
   - Never delete definitions in `zevylo/src/tools/**/*.definition.ts`.
   - Never delete documentation files (`*.md`), scripts, assets, or configuration files (`package.json`, `tsconfig.json`, `next.config.ts`).
3. **No Branch Destruction**:
   - Never delete the `main` branch or force-push destructive rewrites (`git push --force` or `--delete`).

---

## 🛡️ Section 2: Mandatory Protocol for Deprecation & Changes

If any code, file, or tool becomes outdated, broken, or deprecated, the following protocol **MUST** be followed:

| Prohibited Action ❌ | Mandatory Safe Alternative ✅ |
|:---|:---|
| Deleting a file or directory | **Archive the file** into an `_archive/` subfolder or mark as `@deprecated` in code comments. |
| Overwriting entire files blindly | **Edit surgically** using diffs or precise targeted replacements. |
| Deleting user configurations | **Preserve and backup** existing settings before applying modifications. |
| Cleaning git working tree destructively | **Stash changes safely** via `git stash save "Safe backup before update"`. |

---

## 🤖 Section 3: Binding Directives for AI Agents

Every AI Coding Agent (Antigravity, Claude, Cursor, Copilot, ChatGPT, Codex, etc.) operating in this workspace is **strictly bound** by the following execution invariants:

1. **Pre-Command Sanity Check**:
   Before proposing or executing any shell command, verify that the command does **NOT** contain recursive deletion operators targeting project directories.
2. **Preserve User Assets**:
   Any file created by the user or previous sessions must remain intact.
3. **Backup Before Refactoring**:
   When refactoring large files, create an in-place backup or ensure Git history contains the commit before modification.
4. **Error Recovery Over Deletion**:
   If a build or lint fails, diagnose and repair the syntax or types — **NEVER** solve an issue by deleting the problematic file.

---

## 🚨 Emergency Disaster Prevention Checklist

- [x] Does this command delete a directory? **STOP IMMEDIATELY.**
- [x] Does this action remove source code? **STOP IMMEDIATELY.**
- [x] Are you about to reset Git history? **STOP IMMEDIATELY.**
- [x] Is the project and website completely safe and preserved? **PROCEED SAFELY.**

---

<div align="center">
  <b>Project & Website Preservation Law — Created by Muhammad Daniyal (<a href="https://github.com/daniyal44">@daniyal44</a>)</b>
</div>
