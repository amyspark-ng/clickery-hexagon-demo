@REM Deletes and edits some old files
rmdir /s/q "export/assets"
rmdir /s/q "export/code"
rmdir /s/q "export/dist"
del "export\index.html"
del "export.zip"

@REM copy from project to export folder
xcopy /I /Y /E "./assets" "./export/assets" 
xcopy /I /Y /E "./code" "./export/code" 
xcopy /I /Y /E "./dist" "./export/dist" 
robocopy "./" "./export" index.html

@REM ZIPS
"C:\Program Files\7-Zip\7z.exe" a -tzip "./export.zip" "./export"