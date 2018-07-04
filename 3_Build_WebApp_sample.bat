setlocal

@rem --------------------------------------------------
@rem Turn off the echo function.
@rem --------------------------------------------------
@echo off

@rem --------------------------------------------------
@rem Get the path to the executable file.
@rem --------------------------------------------------
set CURRENT_DIR="%~dp0"

@rem --------------------------------------------------
@rem Execution of the common processing.
@rem --------------------------------------------------
call %CURRENT_DIR%z_Common.bat

rem --------------------------------------------------
rem Batch build of SPA_Sample.
rem --------------------------------------------------
nuget.exe restore "SPA\Legacy\SPA_Sample\SPA_Sample.sln"
%BUILDFILEPATH% %COMMANDLINE% "SPA\Legacy\SPA_Sample\SPA_Sample.sln"

pause

rem -------------------------------------------------------
endlocal
