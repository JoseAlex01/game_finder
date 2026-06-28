@echo off
cd /d "%~dp0.."
set "PATH=C:\Users\PC\.cache\codex-runtimes\codex-primary-runtime\dependencies\node\bin;%PATH%"
"C:\Users\PC\.cache\codex-runtimes\codex-primary-runtime\dependencies\bin\pnpm.cmd" run dev -- --host 127.0.0.1
