// Script de débogage pour mesurer le footer dans le vrai projet
// À injecter dans la console du navigateur quand JohnBibleReader est ouvert

(function() {
    console.log('🔍 DÉBOGAGE FOOTER - PROJET RÉEL');
    
    // Attendre que JohnBibleReader soit chargé
    const checkFooter = () => {
        // Chercher le footer par son contenu
        const footers = Array.from(document.querySelectorAll('div')).filter(el => 
            el.textContent && el.textContent.includes('Louis Segond') && el.textContent.includes('Ch.')
        );
        
        if (footers.length === 0) {
            console.log('❌ Footer non trouvé - JohnBibleReader pas encore ouvert?');
            return;
        }
        
        const footer = footers[0];
        const rect = footer.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        const windowWidth = window.innerWidth;
        
        console.log('=== MESURES FOOTER RÉEL ===');
        console.log('📐 Écran:', windowWidth + 'x' + windowHeight + 'px');
        console.log('📍 Footer position:');
        console.log('   • Top:', Math.round(rect.top) + 'px');
        console.log('   • Bottom:', Math.round(rect.bottom) + 'px');
        console.log('   • Height:', Math.round(rect.height) + 'px');
        console.log('   • Width:', Math.round(rect.width) + 'px');
        console.log('🎯 Distance du bas:', Math.round(windowHeight - rect.bottom) + 'px');
        
        // Classes CSS du footer
        console.log('🎨 Classes CSS:', footer.className);
        
        // Styles computed
        const styles = window.getComputedStyle(footer);
        console.log('📝 Styles calculés:');
        console.log('   • padding:', styles.padding);
        console.log('   • background:', styles.backgroundColor);
        console.log('   • border-top:', styles.borderTop);
        console.log('   • position:', styles.position);
        
        // Parent container
        const parent = footer.parentElement;
        if (parent) {
            const parentRect = parent.getBoundingClientRect();
            console.log('📦 Container parent:');
            console.log('   • Height:', Math.round(parentRect.height) + 'px');
            console.log('   • Classes:', parent.className);
        }
        
        // Vérification si collé au bas
        const isStuck = Math.abs(windowHeight - rect.bottom) < 2;
        console.log(isStuck ? '✅ Footer COLLÉ au bas' : '❌ Footer PAS collé au bas');
        
        // Highlighting visuel
        footer.style.outline = '3px solid red';
        footer.style.boxShadow = '0 0 10px rgba(255,0,0,0.5)';
        setTimeout(() => {
            footer.style.outline = '';
            footer.style.boxShadow = '';
        }, 3000);
    };
    
    // Vérifier immédiatement et après un délai
    checkFooter();
    setTimeout(checkFooter, 1000);
    setTimeout(checkFooter, 3000);
    
    // Écouter les changements de taille
    window.addEventListener('resize', checkFooter);
    
    console.log('🚀 Script de débogage installé. Ouvrez JohnBibleReader depuis le menu Jean.');
})();