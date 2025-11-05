// Test de diagnostic Supabase - RLS et données
// Vérifie la connexion, RLS, et l'accès aux tables

import { createClient } from '@supabase/supabase-js';

// Configuration Supabase - VOS VRAIES CLÉS
const SUPABASE_URL = 'https://dmszyxowetilvsanqsxm.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRtc3p5eG93ZXRpbHZzYW5xc3htIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTk3NzM0NDUsImV4cCI6MjA3NTM0OTQ0NX0.EukDYFVt0sCrDb0_V4ZPMv5B4gkD43V8Cw7CEuvl0C8';

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

console.log('🔍 TEST DIAGNOSTIC SUPABASE\n');
console.log('=' .repeat(60));

async function testDatabase() {
    try {
        // TEST 1: Connexion Supabase
        console.log('\n📡 TEST 1: Connexion Supabase');
        console.log('-'.repeat(60));
        console.log('✅ Client Supabase initialisé');
        console.log('   URL:', SUPABASE_URL);

        // TEST 2: Table users (devrait fonctionner)
        console.log('\n👥 TEST 2: Lecture table `users`');
        console.log('-'.repeat(60));
        const { data: usersData, error: usersError } = await supabase
            .from('users')
            .select('id, email, pseudo, avatar, created_at');

        if (usersError) {
            console.error('❌ ERREUR users:', usersError.message);
            console.error('   Code:', usersError.code);
            console.error('   Détails:', usersError.details);
        } else {
            console.log('✅ Users chargés:', usersData?.length || 0);
        }

        // TEST 3: Table faithchronicles_game_progress (problème RLS)
        console.log('\n🎮 TEST 3: Lecture table `faithchronicles_game_progress`');
        console.log('-'.repeat(60));
        const { data: progressData, error: progressError } = await supabase
            .from('faithchronicles_game_progress')
            .select('*');

        if (progressError) {
            console.error('❌ ERREUR game_progress:', progressError.message);
            console.error('   Code:', progressError.code);
            console.error('   Détails:', progressError.details);
            console.error('\n💡 DIAGNOSTIC:');
            
            if (progressError.code === '42501' || progressError.message.includes('policy')) {
                console.error('   🔒 RLS BLOQUE L\'ACCÈS!');
                console.error('   → La politique RLS empêche SELECT public');
                console.error('   → Solution: Ajouter une politique permettant SELECT');
            } else if (progressError.code === '42P01') {
                console.error('   ⚠️  TABLE N\'EXISTE PAS!');
                console.error('   → Vérifier le nom de la table dans Supabase');
            } else {
                console.error('   ❓ Erreur inconnue');
            }
        } else {
            console.log('✅ Progressions chargées:', progressData?.length || 0);
            if (progressData && progressData.length > 0) {
                console.log('🔍 Première progression:');
                console.log('   ', JSON.stringify(progressData[0], null, 2));
                console.log('🎯 Nombre de scores:', progressData.length);
            } else {
                console.warn('⚠️  0 PROGRESSIONS TROUVÉES');
                console.warn('💡 Vérifications à faire:');
                console.warn('   1. La table contient-elle des données?');
                console.warn('   2. RLS bloque-t-il l\'accès?');
                console.warn('   3. Les données existent mais sont filtrées?');
            }
        }

        // TEST 4: Vérification des politiques RLS
        console.log('\n🔒 TEST 4: Diagnostic RLS');
        console.log('-'.repeat(60));
        console.log('Pour vérifier les politiques RLS, exécutez dans Supabase SQL Editor:');
        console.log('');
        console.log('-- Voir toutes les politiques RLS');
        console.log('SELECT schemaname, tablename, policyname, permissive, roles, cmd, qual');
        console.log('FROM pg_policies');
        console.log('WHERE tablename = \'faithchronicles_game_progress\';');
        console.log('');
        console.log('-- Vérifier si RLS est activé');
        console.log('SELECT relname, relrowsecurity');
        console.log('FROM pg_class');
        console.log('WHERE relname = \'faithchronicles_game_progress\';');

        // TEST 5: Solution proposée
        console.log('\n✨ SOLUTION PROPOSÉE');
        console.log('='.repeat(60));
        console.log('Si RLS bloque l\'accès, ajoutez cette politique dans Supabase:');
        console.log('');
        console.log('-- Option 1: Politique de lecture publique pour leaderboard');
        console.log('CREATE POLICY "Public read for leaderboard"');
        console.log('ON faithchronicles_game_progress');
        console.log('FOR SELECT');
        console.log('USING (true);');
        console.log('');
        console.log('-- Option 2: Modifier politique existante');
        console.log('-- Si vous avez une politique avec USING (auth.uid() = user_id)');
        console.log('-- Changez-la pour permettre SELECT public:');
        console.log('DROP POLICY "nom_politique_existante" ON faithchronicles_game_progress;');
        console.log('CREATE POLICY "Allow public select for leaderboard"');
        console.log('ON faithchronicles_game_progress');
        console.log('FOR SELECT');
        console.log('USING (true);');
        console.log('');
        console.log('💡 NOTE: Pour INSERT/UPDATE/DELETE, gardez RLS strict!');
        console.log('   Seul SELECT doit être public pour le leaderboard.');

        console.log('\n' + '='.repeat(60));
        console.log('FIN DU TEST\n');

    } catch (error) {
        console.error('\n💥 ERREUR FATALE:', error);
        console.error('Stack:', error.stack);
    }
}

// Exécuter le test
testDatabase();
