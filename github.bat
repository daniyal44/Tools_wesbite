@echo off
setlocal enabledelayedexpansion
title Tools Website Direct Push to GitHub

echo ==============================================================
echo        TOOLS WEBSITE 1-CLICK GIT DIRECT PUSH TO GITHUB
echo ==============================================================
echo.

:: 1. Non-interactive Git environment
set "GIT_EDITOR=true"
set "GIT_MERGE_AUTOEDIT=no"

:: 2. Verify Git availability
where git >nul 2>nul
if !ERRORLEVEL! neq 0 (
    echo [ERROR] Git is not installed or not in system PATH.
    echo.
    pause
    exit /b 1
)

:: 3. Verify git repository
git rev-parse --is-inside-work-tree >nul 2>nul
if !ERRORLEVEL! neq 0 (
    echo [ERROR] Current folder is not a Git repository.
    echo.
    pause
    exit /b 1
)

:: 4. Remove stale lock files if any exist
if exist ".git\index.lock" del /f /q ".git\index.lock" >nul 2>nul
if exist ".git\HEAD.lock" del /f /q ".git\HEAD.lock" >nul 2>nul
if exist ".git\refs\heads\main.lock" del /f /q ".git\refs\heads\main.lock" >nul 2>nul
if exist ".git\refs\remotes\origin\main.lock" del /f /q ".git\refs\remotes\origin\main.lock" >nul 2>nul
if exist ".git\config.lock" del /f /q ".git\config.lock" >nul 2>nul

:: 5. Auto-recover from any stuck rebase or merge from earlier interruptions
if exist ".git\rebase-merge" (
    echo [!] Incomplete rebase detected from previous session. Attempting recovery...
    git rebase --continue >nul 2>&1
    if exist ".git\rebase-merge" git rebase --abort >nul 2>&1
)
if exist ".git\rebase-apply" (
    echo [!] Incomplete rebase-apply detected from previous session. Attempting recovery...
    git rebase --continue >nul 2>&1
    if exist ".git\rebase-apply" git rebase --abort >nul 2>&1
)
if exist ".git\MERGE_HEAD" (
    echo [!] Incomplete merge detected from previous session. Aborting safely...
    git merge --abort >nul 2>&1
)

:: 6. Detect current active branch
set "CURRENT_BRANCH="
for /f "delims=" %%i in ('git branch --show-current 2^>nul') do set "CURRENT_BRANCH=%%i"
if "%CURRENT_BRANCH%"=="" (
    for /f "delims=" %%i in ('git rev-parse --abbrev-ref HEAD 2^>nul') do set "CURRENT_BRANCH=%%i"
)
if /i "%CURRENT_BRANCH%"=="HEAD" set "CURRENT_BRANCH=main"
if "%CURRENT_BRANCH%"=="" set "CURRENT_BRANCH=main"

:: If detached HEAD, switch back to the target branch
git rev-parse --abbrev-ref HEAD 2>nul | findstr /i "^HEAD$" >nul
if !ERRORLEVEL! equ 0 (
    echo [i] HEAD was detached. Switching back to %CURRENT_BRANCH%...
    git checkout %CURRENT_BRANCH% >nul 2>&1
)

echo [i] Repository    : %CD%
echo [i] Target Branch : %CURRENT_BRANCH%
echo.

:: 7. Fetch remote updates first
echo [1/4] Checking remote status (fetching origin/%CURRENT_BRANCH%)...
git fetch origin %CURRENT_BRANCH% >nul 2>&1

:: 8. Stage all modified and new files
echo [2/4] Staging all files (git add -A)...
git add -A

:: 9. Commit changes if any exist
echo [3/4] Checking for changes to commit...
git diff --staged --quiet
if !ERRORLEVEL! neq 0 (
    set "CUSTOM_MSG=%~1"
    if not "!CUSTOM_MSG!"=="" (
        set "COMMIT_MSG=!CUSTOM_MSG!"
    ) else (
        set "COMMIT_MSG=feat(update): automated 1-click push on %DATE% at %TIME%"
    )
    git commit -m "!COMMIT_MSG!"
    echo [OK] Changes committed successfully.
) else (
    echo [i] No new uncommitted changes detected.
)
echo.

:: 10. Push to GitHub
echo [4/4] Pushing to GitHub (origin/%CURRENT_BRANCH%)...
git push -u origin %CURRENT_BRANCH%

if !ERRORLEVEL! equ 0 goto :push_success

echo.
echo [!] Remote branch has newer commits.
echo [!] Syncing safely with origin/%CURRENT_BRANCH%...
git pull --rebase --autostash origin %CURRENT_BRANCH%
if !ERRORLEVEL! neq 0 (
    echo [!] Rebase encountered an issue. Falling back to clean merge sync...
    git rebase --abort >nul 2>&1
    git pull --no-rebase --no-edit origin %CURRENT_BRANCH%
    if !ERRORLEVEL! neq 0 (
        echo.
        echo ==============================================================
        echo  [ERROR] Sync failed due to conflicting files.
        echo  Please resolve conflicts manually or run 'git status'.
        echo ==============================================================
        goto :push_end
    )
)

echo.
echo [i] Retrying push to GitHub...
git push -u origin %CURRENT_BRANCH%
if !ERRORLEVEL! equ 0 goto :push_success_synced

echo.
echo ==============================================================
echo  [ERROR] Push failed. Please check your internet or GitHub access.
echo ==============================================================
goto :push_end

:push_success
echo.
echo ==============================================================
echo  [SUCCESS] Code successfully pushed to GitHub!
echo ==============================================================
echo Commit SHA :
git rev-parse --short HEAD
goto :push_end

:push_success_synced
echo.
echo ==============================================================
echo  [SUCCESS] Code successfully synced and pushed to GitHub!
echo ==============================================================
echo Commit SHA :
git rev-parse --short HEAD
goto :push_end

:push_end
echo.
pause
