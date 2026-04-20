@echo off
echo ========================================
echo   M.D Electric - Auto Blog Publisher
echo   %date% %time%
echo ========================================

cd /d "c:\Users\A\Desktop\md-electric"

echo.
echo [1/2] Generating 2 new blog posts...
node generate-blogs.mjs

echo.
echo [2/2] Deploying to Netlify...
call npx netlify deploy --prod --dir=.

echo.
echo ========================================
echo   Done! Check https://moshe-electric.netlify.app/blog.html
echo ========================================
