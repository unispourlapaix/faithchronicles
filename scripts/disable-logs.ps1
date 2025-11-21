# Script pour désactiver tous les console.log/warn/error

$rootPath = "c:\Users\dream\Documents\GitHub\faithchronicles"
$count = 0

# Traiter les fichiers src/
Write-Host "`n🔧 Traitement des fichiers src/..." -ForegroundColor Cyan
Get-ChildItem -Path "$rootPath\src" -Include "*.jsx","*.js","*.tsx" -Recurse | ForEach-Object {
    $file = $_
    $content = Get-Content $file.FullName -Raw -ErrorAction SilentlyContinue
    
    if ($content -and $content -match "(?<!// )console\.(log|warn|error)\(") {
        $newContent = $content -replace "(\s+)console\.(log|warn|error)\(", "`$1// console.`$2("
        Set-Content -Path $file.FullName -Value $newContent -NoNewline
        Write-Host "  ✅ $($file.Name)" -ForegroundColor Green
        $count++
    }
}

# Traiter les fichiers public/ (JS seulement, pas HTML car trop gros)
Write-Host "`n🔧 Traitement des fichiers public/*.js..." -ForegroundColor Cyan
Get-ChildItem -Path "$rootPath\public" -Filter "*.js" -Recurse | ForEach-Object {
    $file = $_
    
    # Ignorer les fichiers trop gros
    if ($file.Length -gt 500KB) {
        Write-Host "  ⏭️  $($file.Name) (trop gros, ignoré)" -ForegroundColor Yellow
        return
    }
    
    $content = Get-Content $file.FullName -Raw -ErrorAction SilentlyContinue
    
    if ($content -and $content -match "(?<!// )console\.(log|warn|error)\(") {
        $newContent = $content -replace "(\s+)console\.(log|warn|error)\(", "`$1// console.`$2("
        Set-Content -Path $file.FullName -Value $newContent -NoNewline
        Write-Host "  ✅ $($file.Name)" -ForegroundColor Green
        $count++
    }
}

Write-Host "`n✨ Terminé ! $count fichiers modifiés`n" -ForegroundColor Green
