# Script pour corriger l'encodage UTF-8 du fichier espagnol
$filePath = "src/data/translations/es/ui.js"
$content = Get-Content -Path $filePath -Raw -Encoding UTF8

# Corrections des caractères mal encodés - COMPLET
$replacements = @{
    # Mots composés spécifiques en ordre de priorité
    'Aclaraci├│n' = 'Aclaración'
    'Crucifixi├│n' = 'Crucifixión'
    'Resurrecci├│n' = 'Resurrección'
    'Selecci├│n' = 'Selección'
    'Bonificaci├│n' = 'Bonificación'
    'Sincronizaci├│n' = 'Sincronización'
    'disposici├│n' = 'disposición'
    'revelaci├│n' = 'revelación'
    'ascensi├│n' = 'ascensión'
    'Relaci├│n' = 'Relación'
    'religi├│n' = 'religión'
    'Inclusi├│n' = 'Inclusión'
    'conexi├│n' = 'conexión'
    'sesi├│n' = 'sesión'
    'Cap├¡tulo' = 'Capítulo'
    'cap├¡tulos' = 'capítulos'
    'Vers├¡culo' = 'Versículo'
    'contrase├▒a' = 'contraseña'
    'monta├▒a' = 'montaña'
    'sue├▒os' = 'sueños'
    'sabidur├¡a' = 'sabiduría'
    'Direcci├│n' = 'Dirección'
    'coraz├│n' = 'corazón'
    'Jes├║s' = 'Jesús'
    'Hind├║es' = 'Hindúes'
    'Jud├¡os' = 'Judíos'
    'b├¡blica' = 'bíblica'
    'An├│nimo' = 'Anónimo'
    'Pr├│ximo' = 'Próximo'
    'ego├¡sta' = 'egoísta'
    'pr├¡vate' = 'prívate'
    'p├║blico' = 'público'
    'N├║meros' = 'Números'
    'contin├║a' = 'continúa'
    '├üngeles' = 'Ángeles'
    'g├®neros' = 'géneros'
    'mayor├¡a' = 'mayoría'
    'Juda├¡smo' = 'Judaísmo'
    'v├¡nculo' = 'vínculo'
    'pr├│jimo' = 'prójimo'
    'Gu├¡as' = 'Guías'
    'ëxodo' = 'Éxodo'
    'Sab├¡as' = 'Sabías'
    'Génesis' = 'Génesis'
    'F├üCIL' = 'FÁCIL'
    'DIF├ìCIL' = 'DIFÍCIL'
    'SABIDUR├ìA' = 'SABIDURÍA'
    '├Ültima' = 'Última'
    '├Ültimo' = 'Último'
    '├║nicos' = 'únicos'
    '├║nico' = 'único'
    '├Ünico' = 'Único'
    '├║ltima' = 'última'
    'raz├│n' = 'razón'
    'com├║n' = 'común'
    'd├¡a' = 'día'
    'a├║n' = 'aún'
    'S├¡' = 'Sí'
    't├║' = 'tú'
}

foreach ($key in $replacements.Keys) {
    $content = $content -replace [regex]::Escape($key), $replacements[$key]
}

# Sauvegarder avec l'encodage UTF-8 (sans BOM)
$utf8NoBom = New-Object System.Text.UTF8Encoding $false
[System.IO.File]::WriteAllText($filePath, $content, $utf8NoBom)

Write-Host "✅ Encodage espagnol corrigé!" -ForegroundColor Green
