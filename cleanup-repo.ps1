# Script de nettoyage du dépôt GitHub FaithChronicles
# Supprime les fichiers temporaires et inutiles

Write-Host "🧹 Nettoyage du dépôt GitHub FaithChronicles..." -ForegroundColor Cyan

# Fichiers batch temporaires (scripts de développement local uniquement)
$batFiles = @(
    "start.bat",
    "start-server.bat",
    "restart-server.bat",
    "kill-server.bat",
    "dev.bat"
)

# Scripts fix temporaires (déjà utilisés, plus nécessaires)
$fixScripts = @(
    "fix-blank-lines-v2.cjs",
    "fix-bom.cjs",
    "fix-bom.js",
    "fix-duplicates.cjs",
    "fix-empty-lines.cjs",
    "fix-extra-bracket.cjs",
    "fix-final.cjs",
    "complete-translations.js"
)

# Autres fichiers temporaires
$tempFiles = @(
    "temp_translations.txt",
    "update-unity-imports.cjs",
    "fix-spanish-encoding.ps1",
    "index.html"  # Doublon avec public/index.html
)

# Fichiers de documentation redondants ou obsolètes
$oldDocs = @(
    "AI_GITHUB_SECRETS_PROMPT.md",
    "GITHUB_SECRETS_SETUP.md",
    "SUPABASE_LOCALHOST_CONFIG.md",
    "README_SHOWCASE.md",
    "ASSETS_INDEX.md"
)

$totalDeleted = 0

# Supprimer les fichiers batch
Write-Host "`n📦 Suppression des scripts batch (dev local)..." -ForegroundColor Yellow
foreach ($file in $batFiles) {
    if (Test-Path $file) {
        Remove-Item $file -Force
        Write-Host "  ✅ Supprimé: $file" -ForegroundColor Green
        $totalDeleted++
    }
}

# Supprimer les scripts fix
Write-Host "`n🔧 Suppression des scripts fix temporaires..." -ForegroundColor Yellow
foreach ($file in $fixScripts) {
    if (Test-Path $file) {
        Remove-Item $file -Force
        Write-Host "  ✅ Supprimé: $file" -ForegroundColor Green
        $totalDeleted++
    }
}

# Supprimer les fichiers temporaires
Write-Host "`n🗑️  Suppression des fichiers temporaires..." -ForegroundColor Yellow
foreach ($file in $tempFiles) {
    if (Test-Path $file) {
        Remove-Item $file -Force
        Write-Host "  ✅ Supprimé: $file" -ForegroundColor Green
        $totalDeleted++
    }
}

# Supprimer les anciennes documentations
Write-Host "`n📄 Suppression des documentations obsolètes..." -ForegroundColor Yellow
foreach ($file in $oldDocs) {
    if (Test-Path $file) {
        Remove-Item $file -Force
        Write-Host "  ✅ Supprimé: $file" -ForegroundColor Green
        $totalDeleted++
    }
}

# Nettoyer les fichiers .env (ne doivent pas être dans git)
Write-Host "`n🔒 Vérification des fichiers .env..." -ForegroundColor Yellow
if (Test-Path ".env") {
    Write-Host "  ⚠️  .env existe (doit être en .gitignore)" -ForegroundColor Red
}
if (Test-Path ".env.local") {
    Remove-Item ".env.local" -Force
    Write-Host "  ✅ Supprimé: .env.local" -ForegroundColor Green
    $totalDeleted++
}

Write-Host "`n✨ Nettoyage terminé!" -ForegroundColor Cyan
Write-Host "📊 Total de fichiers supprimés: $totalDeleted" -ForegroundColor Green
Write-Host "`n💡 Prochaines étapes:" -ForegroundColor Cyan
Write-Host "   1. Vérifier avec: git status" -ForegroundColor White
Write-Host "   2. Ajouter: git add -A" -ForegroundColor White
Write-Host "   3. Committer: git commit -m 'chore: clean up repository'" -ForegroundColor White
Write-Host "   4. Pousser: git push origin main" -ForegroundColor White
