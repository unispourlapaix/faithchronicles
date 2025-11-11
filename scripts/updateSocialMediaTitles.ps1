# Script pour mettre à jour les titres dans social-media-kit.html
# FaithChronicles → UNITYQUEST
# Chronicles of Love → Chroniques de l'Amour

$filePath = "social-media-kit.html"

Write-Host "🔄 Mise à jour des titres dans $filePath..." -ForegroundColor Cyan

# Lire le contenu
$content = Get-Content $filePath -Raw -Encoding UTF8

# Remplacer dans toutes les langues
$replacements = @{
    # Français
    'title: "FaithChronicles",' = 'title: "UNITYQUEST",'
    'subtitle: "Chronicles of Love",' = 'subtitle: "Chroniques de l''Amour",'
    
    # Hashtags
    '#FaithChronicles' = '#UNITYQUEST'
    'FaithChronicles,' = 'UNITYQUEST,'
    'FaithChronicles:' = 'UNITYQUEST:'
    'FaithChronicles – ' = 'UNITYQUEST – '
    'FaithChronicles, ' = 'UNITYQUEST, '
    
    # Section hashtags
    '<h3>💜 FaithChronicles</h3>' = '<h3>💜 UNITYQUEST</h3>'
}

# Appliquer les remplacements
foreach ($old in $replacements.Keys) {
    $new = $replacements[$old]
    $content = $content.Replace($old, $new)
    Write-Host "  ✓ $old → $new" -ForegroundColor Green
}

# Sauvegarder
$content | Out-File $filePath -Encoding UTF8 -NoNewline

Write-Host "`n✅ Mise à jour terminée!" -ForegroundColor Green
Write-Host "📝 Vérifiez les changements avec: git diff $filePath" -ForegroundColor Yellow
