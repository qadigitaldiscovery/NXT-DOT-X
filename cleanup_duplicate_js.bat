@echo off
echo 🔍 Cleaning duplicate .js files...

for /r %%f in (*.js) do (
    set "js=%%~dpf%%~nf"
    setlocal enabledelayedexpansion
    if exist "!js!.tsx" (
        echo 🗑️  Removing duplicate: %%f
        del "%%f"
    )
    endlocal
)

echo ✅ Cleanup complete.
pause