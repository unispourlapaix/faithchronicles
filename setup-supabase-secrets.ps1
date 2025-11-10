# Script rapide pour configurer les secrets GitHub Supabase
# Ouvre automatiquement toutes les pages nécessaires

Write-Host "🔐 Configuration des Secrets GitHub pour Supabase" -ForegroundColor Cyan
Write-Host "================================================`n" -ForegroundColor Cyan

Write-Host "📖 Étape 1: Ouvrir le guide complet..." -ForegroundColor Yellow
Start-Process "SUPABASE_GITHUB_SECRETS.md"
Start-Sleep -Seconds 1

Write-Host "🔑 Étape 2: Ouvrir Supabase Dashboard (pour copier vos clés)..." -ForegroundColor Yellow
Start-Process "https://supabase.com/dashboard"
Start-Sleep -Seconds 2

Write-Host "⚙️  Étape 3: Ouvrir GitHub Secrets (pour coller les clés)..." -ForegroundColor Yellow
Start-Process "https://github.com/unispourlapaix/unityquest-chronicles-of-love/settings/secrets/actions"
Start-Sleep -Seconds 2

Write-Host "🚀 Étape 4: Ouvrir GitHub Actions (pour surveiller le déploiement)..." -ForegroundColor Yellow
Start-Process "https://github.com/unispourlapaix/unityquest-chronicles-of-love/actions"
Start-Sleep -Seconds 2

Write-Host "`n✅ Toutes les pages sont ouvertes!" -ForegroundColor Green
Write-Host "`n📋 Instructions:" -ForegroundColor Cyan
Write-Host "   1. Sur Supabase Dashboard: Copiez URL et Anon Key" -ForegroundColor White
Write-Host "   2. Sur GitHub Secrets: Ajoutez les 2 secrets" -ForegroundColor White
Write-Host "      - REACT_APP_SUPABASE_URL" -ForegroundColor Gray
Write-Host "      - REACT_APP_SUPABASE_ANON_KEY" -ForegroundColor Gray
Write-Host "   3. Redéployez:" -ForegroundColor White
Write-Host "      git commit --allow-empty -m 'chore: trigger deployment'" -ForegroundColor Gray
Write-Host "      git push origin main" -ForegroundColor Gray
Write-Host "   4. Surveillez le déploiement dans Actions (doit être vert ✅)" -ForegroundColor White
Write-Host "`n💡 Consultez SUPABASE_GITHUB_SECRETS.md pour les détails complets`n" -ForegroundColor Yellow

# Attendre une touche avant de fermer
Write-Host "Appuyez sur une touche pour fermer..." -ForegroundColor DarkGray
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
