// ============================================================================
// MODULE BIBLE - Base de données biblique libre de droits  
// ============================================================================
import { spiritualWisdom } from './spiritualWisdom.js';
import { strongGreek } from './strongGreek.js';

export const bibleData = {
  // Sagesse spirituelle : La connaissance vivifie l'esprit
  spiritualWisdom,
  // Métadonnées sur les versions
  versions: {
    segond1910: {
      name: "Louis Segond 1910",
      copyright: "Domaine public depuis 1987",
      language: "français",
      year: 1910,
      status: "libre"
    },
    segond21: {
      name: "Segond 21",
      copyright: "Libre de droits pour usage non commercial",
      language: "français", 
      year: 2007,
      status: "libre_usage_educatif"
    }
  },

  // Collection de versets inspirants avec références Strong
  verses: [
    {
      reference: "Philippiens 4:13",
      text: "Je puis tout par celui qui me fortifie",
      version: "segond1910",
      theme: "force",
      strongNumbers: {
        "puis": "G1411", // δύναμις (dynamis) = pouvoir, force
        "fortifie": "G1743" // ἐνδυναμόω (endynamoo) = renforcer
      },
      context: "Paul parle de sa capacité à faire face à toutes situations grâce au Christ"
    },
    {
      reference: "Psaume 23:1",
      text: "L'Éternel est mon berger, je ne manquerai de rien",
      version: "segond1910",
      theme: "protection",
      strongNumbers: {
        "berger": "H7462", // רָעָה (ra'ah) = paître, garder
        "manquerai": "H2637" // חָסֵר (chaser) = manquer, avoir besoin
      },
      context: "David exprime sa confiance totale en la providence divine"
    },
    {
      reference: "Jean 3:16",
      text: "Car Dieu a tant aimé le monde qu'il a donné son Fils unique",
      version: "segond21",
      theme: "amour",
      strongNumbers: {
        "aimé": "G25", // ἀγαπάω (agapao) = aimer inconditionnellement
        "donné": "G1325" // δίδωμι (didomi) = donner, offrir
      },
      context: "Le verset le plus célèbre sur l'amour de Dieu pour l'humanité"
    },
    {
      reference: "Philippiens 4:7",
      text: "Et la paix de Dieu, qui surpasse toute intelligence, gardera vos cœurs",
      version: "segond21",
      theme: "paix",
      strongNumbers: {
        "paix": "G1515", // εἰρήνη (eirene) = paix, harmonie
        "gardera": "G5432" // φρουρέω (phroureo) = garder, protéger
      },
      context: "Promesse de protection divine par la paix intérieure"
    },
    {
      reference: "Psaume 119:105",
      text: "Ta parole est une lampe à mes pieds, et une lumière sur mon sentier",
      version: "segond1910",
      theme: "guidance",
      strongNumbers: {
        "lampe": "H5216", // נִיר (niyr) = lampe, luminaire
        "lumière": "H216" // אוֹר (or) = lumière, éclairage
      },
      context: "La Parole de Dieu comme guide dans la vie quotidienne"
    },
    {
      reference: "Proverbes 3:5-6",
      text: "Confie-toi en l'Éternel de tout ton cœur, et ne t'appuie pas sur ta sagesse",
      version: "segond1910",
      theme: "confiance",
      strongNumbers: {
        "confie": "H982", // בָּטַח (batach) = avoir confiance
        "cœur": "H3820" // לֵב (leb) = cœur, esprit, volonté
      },
      context: "Invitation à faire confiance à Dieu plutôt qu'à nos propres capacités"
    },
    {
      reference: "Matthieu 5:14",
      text: "Vous êtes la lumière du monde. Une ville située sur une montagne ne peut être cachée",
      version: "segond21",
      theme: "témoignage",
      strongNumbers: {
        "lumière": "G5457", // φῶς (phos) = lumière, éclairage spirituel
        "monde": "G2889" // κόσμος (kosmos) = monde, univers
      },
      context: "Jésus encourage ses disciples à être témoins dans le monde"
    }
  ],

  // Les 13 - Jésus n'est pas... (clarifications importantes)
  jesusIsNot: [
    {
      category: "amour",
      text: "Jésus n'est pas homophobe - Son amour infini inclut chacun comme il est",
      reference: "1 Jean 4:8 - Dieu est amour",
      context: "L'amour de Dieu est inclusif et accepte chaque personne dans sa diversité"
    },
    {
      category: "égalité",
      text: "Jésus n'est pas misogyne - Son amour infini valorise chaque femme",
      reference: "Luc 8:1-3 - Les femmes qui suivaient Jésus",
      context: "Jésus révolutionne son époque en incluant et honorant les femmes"
    },
    {
      category: "paix",
      text: "Jésus n'est pas meurtrier - Son amour infini donne la vie à tous",
      reference: "Jean 10:10 - Je suis venu pour qu'ils aient la vie",
      context: "Jésus apporte la vie, la guérison et la restauration à chacun"
    },
    {
      category: "unité",
      text: "Jésus n'est pas diviseur - Son amour infini unit toute l'humanité",
      reference: "Galates 3:28 - Il n'y a plus ni Juif ni Grec",
      context: "L'amour de Jésus transcende toutes les barrières humaines"
    },
    {
      category: "amour",
      text: "Jésus n'est pas raciste - Son amour infini embrasse toutes les cultures",
      reference: "Matthieu 28:19 - Faites de toutes les nations des disciples",
      context: "L'amour de Jésus célèbre la diversité de toute l'humanité"
    },
    {
      category: "justice",
      text: "Jésus n'est pas oppresseur - Son amour infini libère et guérit chacun",
      reference: "Luc 4:18 - Il m'a envoyé pour proclamer aux captifs la délivrance",
      context: "L'amour de Jésus apporte liberté et guérison à tous"
    },
    {
      category: "humilité",
      text: "Jésus n'est pas orgueilleux - Son amour infini se met au service de tous",
      reference: "Philippiens 2:7 - Il s'est dépouillé lui-même",
      context: "L'amour de Jésus s'exprime par l'humilité et le service"
    },
    {
      category: "pardon",
      text: "Jésus n'est pas vengeur - Son amour infini pardonne toujours",
      reference: "Luc 23:34 - Père, pardonne-leur car ils ne savent ce qu'ils font",
      context: "L'amour de Jésus offre le pardon même dans la souffrance"
    },
    {
      category: "compassion",
      text: "Jésus n'est pas insensible - Son amour infini ressent chaque douleur",
      reference: "Jean 11:35 - Jésus pleura",
      context: "L'amour de Jésus partage profondément nos joies et nos peines"
    },
    {
      category: "vérité",
      text: "Jésus n'est pas menteur - Son amour infini est pure vérité",
      reference: "Jean 14:6 - Je suis le chemin, la vérité et la vie",
      context: "L'amour de Jésus est la vérité la plus authentique qui existe"
    },
    {
      category: "paix",
      text: "Jésus n'est pas violent - Son amour infini apporte la paix véritable",
      reference: "Matthieu 5:9 - Heureux ceux qui procurent la paix",
      context: "L'amour de Jésus transforme les conflits en réconciliation"
    },
    {
      category: "générosité",
      text: "Jésus n'est pas avare - Son amour infini donne sans compter",
      reference: "2 Corinthiens 8:9 - Pour vous il s'est fait pauvre",
      context: "L'amour de Jésus est généreux au point de tout donner"
    },
    {
      category: "amour",
      text: "Jésus n'est pas partial - Son amour infini accueille chaque être unique",
      reference: "Actes 10:34 - Dieu ne fait point acception de personnes",
      context: "L'amour de Jésus célèbre l'unicité de chaque personne, handicap inclus"
    },
    {
      category: "universalité",
      text: "Jésus n'a point de frontières - Son amour infini dépasse toutes les limites",
      reference: "Romains 10:12 - Il n'y a aucune différence entre le Juif et le Grec",
      context: "Il n'y a point de frontière pour Jésus : ni géographique, ni culturelle, ni sociale"
    },
    {
      category: "respect",
      text: "Jésus n'est pas irrespectueux - Il enseigne le respect de soi, des femmes, des autres",
      reference: "Matthieu 22:39 - Tu aimeras ton prochain comme toi-même",
      context: "Le respect est une sagesse certaine : respecte ta vie, ton corps, la femme comme toi-même, les autres"
    },
    {
      category: "paix",
      text: "Jésus n'est pas diviseur - Il unit juifs, arabes et toutes dénominations dans la paix",
      reference: "Éphésiens 2:14 - Il est notre paix, lui qui des deux n'en a fait qu'un",
      context: "Célébrons nos diversités plutôt que d'en faire des querelles de mots et des guerres"
    },
    {
      category: "vérité",
      text: "Jésus n'est pas menteur - Il dénonce le mensonge et la manipulation",
      reference: "Jean 8:44 - Le diable est le père du mensonge",
      context: "Jésus expose les mensonges et manipulations qui blessent les âmes"
    },
    {
      category: "générosité",
      text: "Jésus n'est pas cupide - Sa générosité dépasse largement la dîme",
      reference: "Luc 21:3 - Cette pauvre veuve a mis plus que tous les autres",
      context: "La générosité de Jésus est plus forte que l'obligation de la dîme"
    },
    {
      category: "justice",
      text: "Jésus n'est pas complice du silence - Il protège par une saine justice",
      reference: "Matthieu 18:6 - Celui qui scandalisera un de ces petits",
      context: "Le silence qui couvre les fautes sans protéger les autres n'est pas la sagesse de Jésus"
    }
  ],

  // Faits bibliques intéressants
  facts: [
    {
      category: "statistiques",
      text: "La Bible contient 31 173 versets au total",
      source: "Analyse textuelle des manuscrits"
    },
    {
      category: "langues",
      text: "La Bible a été traduite en plus de 3000 langues différentes",
      source: "Sociétés bibliques unies"
    },
    {
      category: "rédaction",
      text: "La Bible a été écrite sur environ 1600 ans par 40 auteurs différents",
      source: "Études historiques bibliques"
    },
    {
      category: "structure",
      text: "Le psaume 119 est le plus long chapitre avec 176 versets",
      source: "Structure canonique"
    },
    {
      category: "records",
      text: "Le verset le plus court en français est 'Jésus pleura' (Jean 11:35)",
      source: "Analyse textuelle"
    },
    {
      category: "symbolisme",
      text: "Le nombre 7 symbolise la perfection et apparaît 735 fois",
      source: "Études numériques bibliques"
    },
    {
      category: "vocabulaire",
      text: "Le mot 'amour' sous diverses formes apparaît plus de 500 fois",
      source: "Concordance biblique"
    }
  ],

  // Questions amusantes mais réfléchies
  funQuestions: [
    {
      question: "Si Jésus avait eu un téléphone, qui aurait été son premier contact ?",
      emoji: "📱",
      theme: "relation_divine"
    },
    {
      question: "Pourquoi David n'a-t-il jamais perdu ses moutons ?",
      emoji: "🐑", 
      theme: "berger"
    },
    {
      question: "Combien coûte l'amour de Dieu ?",
      emoji: "💰",
      theme: "grâce"
    },
    {
      question: "Quelle est la différence entre la paix de Dieu et une sieste ?",
      emoji: "😴",
      theme: "paix"
    },
    {
      question: "Pourquoi la Parole de Dieu ne tombe jamais en panne de batterie ?",
      emoji: "🔋",
      theme: "parole"
    },
    {
      question: "Si Moïse avait eu un GPS, aurait-il erré 40 ans dans le désert ?",
      emoji: "🗺️",
      theme: "guidance"
    },
    {
      question: "Pourquoi les anges n'ont-ils jamais besoin de faire du sport ?",
      emoji: "👼",
      theme: "perfection"
    },
    {
      question: "Que dirait Salomon des réseaux sociaux modernes ?",
      emoji: "📱",
      theme: "sagesse"
    }
  ],

  // Dictionnaire Strong simplifié pour les mots-clés
  strongDictionary: strongGreek,
  
  // Index Strong intégré (remplacé par l'import)
  strongDictionaryOld: {
    // Grec
    "G25": {
      word: "ἀγαπάω",
      transliteration: "agapao",
      meaning: "aimer d'un amour divin et inconditionnel",
      usage: "Utilisé pour l'amour de Dieu envers l'humanité"
    },
    "G1411": {
      word: "δύναμις", 
      transliteration: "dynamis",
      meaning: "pouvoir, force, capacité, miracle",
      usage: "Source du mot français 'dynamite'"
    },
    "G1515": {
      word: "εἰρήνη",
      transliteration: "eirene", 
      meaning: "paix, tranquillité, harmonie",
      usage: "Paix complète incluant le bien-être spirituel"
    },
    "G5457": {
      word: "φῶς",
      transliteration: "phos",
      meaning: "lumière physique et spirituelle",
      usage: "Métaphore de la vérité et de la sainteté"
    },

    // Hébreu
    "H7462": {
      word: "רָעָה",
      transliteration: "ra'ah",
      meaning: "paître, garder, berger, conduire",
      usage: "Image du soin pastoral de Dieu"
    },
    "H5216": {
      word: "נִיר",
      transliteration: "niyr", 
      meaning: "lampe, luminaire qui éclaire",
      usage: "Guidance divine dans l'obscurité"
    },
    "H3820": {
      word: "לֵב",
      transliteration: "leb",
      meaning: "cœur, esprit, volonté, centre émotionnel", 
      usage: "Siège des émotions et décisions"
    },
    "H982": {
      word: "בָּטַח",
      transliteration: "batach",
      meaning: "avoir confiance, se fier, être en sécurité",
      usage: "Confiance totale et abandon à Dieu"
    },
    "H3068": {
      word: "יְהוָה",
      transliteration: "YHWH",
      meaning: "l'Éternel, nom divin de Dieu",
      usage: "Le nom sacré de Dieu révélé à Moïse"
    },
    "H160": {
      word: "אַהֲבָה",
      transliteration: "ahava",
      meaning: "amour, affection",
      usage: "Amour profond et durable de Dieu"
    },
    "H5769": {
      word: "עוֹלָם",
      transliteration: "olam",
      meaning: "éternel, perpétuel, toujours",
      usage: "Éternité, temps sans fin"
    },
    "H2617": {
      word: "חֶסֶד",
      transliteration: "chesed",
      meaning: "bonté, miséricorde, fidélité",
      usage: "Amour fidèle et loyal de Dieu envers son alliance"
    }
  },

  // Passages bibliques complets (Louis Segond 1910 - Domaine public)
  biblePassages: {
    "Genese_1": {
      book: "Genèse",
      chapter: 1,
      title: "La Création du monde",
      verses: [
        { number: 1, text: "Au commencement, Dieu créa les cieux et la terre.", strong: ["H7225", "H430", "H1254"] },
        { number: 2, text: "La terre était informe et vide: il y avait des ténèbres à la surface de l'abîme, et l'esprit de Dieu se mouvait au-dessus des eaux.", strong: ["H776", "H8414", "H7307"] },
        { number: 3, text: "Dieu dit: Que la lumière soit! Et la lumière fut.", strong: ["H430", "H559", "H216"] },
        { number: 4, text: "Dieu vit que la lumière était bonne; et Dieu sépara la lumière d'avec les ténèbres.", strong: ["H430", "H7200", "H216", "H2896"] },
        { number: 5, text: "Dieu appela la lumière jour, et il appela les ténèbres nuit. Ainsi, il y eut un soir, et il y eut un matin: ce fut le premier jour.", strong: ["H430", "H7121", "H3117", "H3915"] },
        { number: 6, text: "Dieu dit: Qu'il y ait une étendue entre les eaux, et qu'elle sépare les eaux d'avec les eaux.", strong: ["H430", "H7549", "H4325"] },
        { number: 7, text: "Et Dieu fit l'étendue, et il sépara les eaux qui sont au-dessous de l'étendue d'avec les eaux qui sont au-dessus de l'étendue. Et cela fut ainsi.", strong: ["H430", "H6213", "H7549"] },
        { number: 8, text: "Dieu appela l'étendue ciel. Ainsi, il y eut un soir, et il y eut un matin: ce fut le second jour.", strong: ["H430", "H7121", "H8064"] },
        { number: 27, text: "Dieu créa l'homme à son image, il le créa à l'image de Dieu, il créa l'homme et la femme.", strong: ["H430", "H1254", "H120", "H6754"] },
        { number: 31, text: "Dieu vit tout ce qu'il avait fait et voici, cela était très bon. Ainsi, il y eut un soir, et il y eut un matin: ce fut le sixième jour.", strong: ["H430", "H7200", "H2896", "H3966"] }
      ]
    },
    "Psaume_23": {
      book: "Psaumes",
      chapter: 23,
      title: "L'Éternel est mon berger",
      verses: [
        { number: 1, text: "L'Éternel est mon berger: je ne manquerai de rien.", strong: ["H3068", "H7462", "H2637"] },
        { number: 2, text: "Il me fait reposer dans de verts pâturages, il me dirige près des eaux paisibles.", strong: ["H7257", "H4999", "H5148", "H4325"] },
        { number: 3, text: "Il restaure mon âme, il me conduit dans les sentiers de la justice, à cause de son nom.", strong: ["H7725", "H5315", "H5148", "H6664"] },
        { number: 4, text: "Quand je marche dans la vallée de l'ombre de la mort, je ne crains aucun mal, car tu es avec moi: ta houlette et ton bâton me rassurent.", strong: ["H1980", "H1516", "H6757", "H3372", "H7626"] },
        { number: 5, text: "Tu dresses devant moi une table, en face de mes adversaires; tu oins d'huile ma tête, et ma coupe déborde.", strong: ["H6186", "H7979", "H6887", "H1878", "H3563"] },
        { number: 6, text: "Oui, le bonheur et la grâce m'accompagneront tous les jours de ma vie, et j'habiterai dans la maison de l'Éternel jusqu'à la fin de mes jours.", strong: ["H2896", "H2617", "H7291", "H3117", "H1004", "H3068"] }
      ]
    },
    "Jean_3": {
      book: "Jean",
      chapter: 3,
      title: "Nicodème et la nouvelle naissance",
      verses: [
        { number: 14, text: "Et comme Moïse éleva le serpent dans le désert, il faut de même que le Fils de l'homme soit élevé,", strong: ["G2531", "G3475", "G5312", "G3789", "G2048"] },
        { number: 15, text: "afin que quiconque croit en lui ait la vie éternelle.", strong: ["G3956", "G4100", "G2222", "G166"] },
        { number: 16, text: "Car Dieu a tant aimé le monde qu'il a donné son Fils unique, afin que quiconque croit en lui ne périsse point, mais qu'il ait la vie éternelle.", strong: ["G2316", "G25", "G2889", "G1325", "G3439", "G4100", "G622", "G2222", "G166"] },
        { number: 17, text: "Dieu, en effet, n'a pas envoyé son Fils dans le monde pour qu'il juge le monde, mais pour que le monde soit sauvé par lui.", strong: ["G2316", "G649", "G5207", "G2889", "G2919", "G4982"] },
        { number: 18, text: "Celui qui croit en lui n'est point jugé; mais celui qui ne croit pas est déjà jugé, parce qu'il n'a pas cru au nom du Fils unique de Dieu.", strong: ["G4100", "G2919", "G3686", "G3439", "G2316"] }
      ]
    },
    "1Corinthiens_13": {
      book: "1 Corinthiens",
      chapter: 13,
      title: "L'excellence de l'amour",
      verses: [
        { number: 1, text: "Quand je parlerais les langues des hommes et des anges, si je n'ai pas l'amour, je suis un airain qui résonne, ou une cymbale qui retentit.", strong: ["G26", "G444", "G32"] },
        { number: 2, text: "Et quand j'aurais le don de prophétie, la science de tous les mystères et toute la connaissance, quand j'aurais même toute la foi jusqu'à transporter des montagnes, si je n'ai pas l'amour, je ne suis rien.", strong: ["G4102", "G26", "G1097", "G3735"] },
        { number: 3, text: "Et quand je distribuerais tous mes biens pour la nourriture des pauvres, quand je livrerais même mon corps pour être brûlé, si je n'ai pas l'amour, cela ne me sert de rien.", strong: ["G1325", "G26"] },
        { number: 4, text: "L'amour est patient, il est plein de bonté; l'amour n'est point envieux; l'amour ne se vante point, il ne s'enfle point d'orgueil,", strong: ["G26", "G5281", "G5544", "G2205"] },
        { number: 5, text: "il ne fait rien de malhonnête, il ne cherche point son intérêt, il ne s'irrite point, il ne soupçonne point le mal,", strong: ["G26"] },
        { number: 6, text: "il ne se réjouit point de l'injustice, mais il se réjouit de la vérité;", strong: ["G5463", "G93", "G225"] },
        { number: 7, text: "il excuse tout, il croit tout, il espère tout, il supporte tout.", strong: ["G4102", "G1680", "G5281"] },
        { number: 8, text: "L'amour ne périt jamais. Les prophéties prendront fin, les langues cesseront, la connaissance disparaîtra.", strong: ["G26", "G1097"] },
        { number: 9, text: "Car nous connaissons en partie, et nous prophétisons en partie,", strong: ["G1097"] },
        { number: 10, text: "mais quand ce qui est parfait sera venu, ce qui est partiel disparaîtra.", strong: [] },
        { number: 11, text: "Lorsque j'étais enfant, je parlais comme un enfant, je pensais comme un enfant, je raisonnais comme un enfant; lorsque je suis devenu homme, j'ai fait disparaître ce qui était de l'enfant.", strong: [] },
        { number: 12, text: "Aujourd'hui nous voyons au moyen d'un miroir, d'une manière obscure, mais alors nous verrons face à face; aujourd'hui je connais en partie, mais alors je connaîtrai comme j'ai été connu.", strong: ["G1097", "G2889"] },
        { number: 13, text: "Maintenant donc ces trois choses demeurent: la foi, l'espérance, l'amour; mais la plus grande de ces choses, c'est l'amour.", strong: ["G4102", "G1680", "G26"] }
      ]
    },
    "Jean_13_34-35": {
      book: "Jean",
      chapter: 13,
      title: "Le nouveau commandement",
      verses: [
        { number: 34, text: "Je vous donne un commandement nouveau: Aimez-vous les uns les autres; comme je vous ai aimés, vous aussi, aimez-vous les uns les autres.", strong: ["G1325", "G1785", "G2537", "G25"] },
        { number: 35, text: "A ceci tous connaîtront que vous êtes mes disciples, si vous avez de l'amour les uns pour les autres.", strong: ["G1097", "G3101", "G26"] }
      ]
    },
    "Matthieu_22_37-39": {
      book: "Matthieu", 
      chapter: 22,
      title: "Le plus grand commandement",
      verses: [
        { number: 37, text: "Jésus lui répondit: Tu aimeras le Seigneur, ton Dieu, de tout ton cœur, de toute ton âme, et de toute ta pensée.", strong: ["G25", "G2316", "G2588", "G5590", "G1271"] },
        { number: 38, text: "C'est le premier et le plus grand commandement.", strong: ["G4413", "G3173", "G1785"] },
        { number: 39, text: "Et voici le second, qui lui est semblable: Tu aimeras ton prochain comme toi-même.", strong: ["G1208", "G3664", "G25", "G4139"] }
      ]
    },
    "Jean_10_30": {
      book: "Jean",
      chapter: 10,
      title: "Jésus et le Père sont un",
      verses: [
        { number: 30, text: "Moi et le Père nous sommes un.", strong: ["G1473", "G3962", "G1520"] }
      ]
    },
    "Jean_14_9": {
      book: "Jean",
      chapter: 14,
      title: "Qui m'a vu a vu le Père",
      verses: [
        { number: 9, text: "Jésus lui dit: Il y a si longtemps que je suis avec vous, et tu ne m'as pas connu, Philippe! Celui qui m'a vu a vu le Père; comment dis-tu: Montre-nous le Père?", strong: ["G3708", "G3962", "G1166"] }
      ]
    },
    "Jean_8_58": {
      book: "Jean",
      chapter: 8,
      title: "Avant qu'Abraham fût, je suis",
      verses: [
        { number: 58, text: "Jésus leur dit: En vérité, en vérité, je vous le dis, avant qu'Abraham fût, je suis.", strong: ["G281", "G1473", "G1510", "G11"] }
      ]
    },
    "Jean_14_6": {
      book: "Jean",
      chapter: 14,
      title: "Je suis le chemin, la vérité et la vie",
      verses: [
        { number: 6, text: "Jésus lui dit: Je suis le chemin, la vérité, et la vie. Nul ne vient au Père que par moi.", strong: ["G1473", "G1510", "G3598", "G225", "G2222", "G3962"] }
      ]
    },
    "Jean_10_11": {
      book: "Jean", 
      chapter: 10,
      title: "Je suis le bon berger",
      verses: [
        { number: 11, text: "Je suis le bon berger. Le bon berger donne sa vie pour ses brebis.", strong: ["G1473", "G1510", "G4166", "G2570", "G5087", "G5590", "G4263"] }
      ]
    },
    "Jean_6_35": {
      book: "Jean",
      chapter: 6, 
      title: "Je suis le pain de vie",
      verses: [
        { number: 35, text: "Jésus leur dit: Je suis le pain de vie. Celui qui vient à moi n'aura jamais faim, et celui qui croit en moi n'aura jamais soif.", strong: ["G1473", "G1510", "G740", "G2222", "G4100", "G3756", "G1372", "G1372"] }
      ]
    },
    "Jeremie_31_3": {
      book: "Jérémie",
      chapter: 31,
      title: "L'amour éternel de l'Éternel",
      verses: [
        { number: 3, text: "De loin l'Éternel se montre à moi: Je t'aime d'un amour éternel; C'est pourquoi je te conserve ma bonté.", strong: ["H3068", "H160", "H5769", "H2617"] }
      ]
    },
    "1Jean_4_7-8": {
      book: "1 Jean",
      chapter: 4,
      title: "Dieu est amour",
      verses: [
        { number: 7, text: "Bien-aimés, aimons-nous les uns les autres; car l'amour est de Dieu, et quiconque aime est né de Dieu et connaît Dieu.", strong: ["G27", "G25", "G26", "G2316", "G1097", "G1080"] },
        { number: 8, text: "Celui qui n'aime pas n'a pas connu Dieu, car Dieu est amour.", strong: ["G25", "G1097", "G2316", "G26"] }
      ]
    },
    "1Corinthiens_1_25-29": {
      book: "1 Corinthiens", 
      chapter: 1,
      title: "La sagesse de Dieu contre l'orgueil humain",
      verses: [
        { number: 25, text: "Car la folie de Dieu est plus sage que les hommes, et la faiblesse de Dieu est plus forte que les hommes.", strong: ["G2316", "G3474", "G4680", "G444", "G772"] },
        { number: 27, text: "Mais Dieu a choisi les choses folles du monde pour confondre les sages; Dieu a choisi les choses faibles du monde pour confondre les fortes,", strong: ["G2316", "G1586", "G3474", "G2889", "G2617", "G4680"] },
        { number: 28, text: "et Dieu a choisi les choses viles du monde et celles qu'on méprise, celles qui ne sont point, pour réduire à néant celles qui sont,", strong: ["G2316", "G1586", "G36", "G2889", "G1848"] },
        { number: 29, text: "afin que nulle chair ne se glorifie devant Dieu.", strong: ["G4561", "G2744", "G2316"] }
      ]
    },
    "1Jean_3_18": {
      book: "1 Jean",
      chapter: 3, 
      title: "L'amour en action",
      verses: [
        { number: 18, text: "Mes petits enfants, n'aimons pas seulement en paroles et avec la langue, mais en actions et avec vérité.", strong: ["G5040", "G25", "G3056", "G1100", "G2041", "G225"] }
      ]
    },
    "Apocalypse_7_9": {
      book: "Apocalypse",
      chapter: 7,
      title: "Une foule de toutes nations et tribus",
      verses: [
        { number: 9, text: "Après cela, je regardai, et voici, il y avait une grande foule, que personne ne pouvait compter, de toute nation, de toute tribu, de tout peuple, et de toute langue, qui se tenaient devant le trône et devant l'agneau, revêtus de robes blanches, et des palmes dans leurs mains.", strong: ["G3793", "G1484", "G5443", "G2992", "G1100", "G2362", "G721", "G3022", "G5495"] }
      ]
    },
    "Galates_3_26-28": {
      book: "Galates",
      chapter: 3,
      title: "Tous enfants de Dieu par la foi",
      verses: [
        { number: 26, text: "Car vous êtes tous enfants de Dieu par la foi en Jésus-Christ;", strong: ["G5207", "G2316", "G4102", "G2424", "G5547"] },
        { number: 27, text: "vous tous, qui avez été baptisés en Christ, vous avez revêtu Christ.", strong: ["G907", "G5547", "G1746"] },
        { number: 28, text: "Il n'y a plus ni Juif ni Grec, il n'y a plus ni esclave ni libre, il n'y a plus ni homme ni femme; car tous vous êtes un en Jésus-Christ.", strong: ["G2453", "G1672", "G1401", "G1658", "G730", "G2338", "G1520", "G2424", "G5547"] }
      ]
    },
    "Ephesiens_2_14": {
      book: "Éphésiens",
      chapter: 2,
      title: "Christ notre paix",
      verses: [
        { number: 14, text: "Car il est notre paix, lui qui des deux n'en a fait qu'un, et qui a renversé le mur de séparation, l'inimitié,", strong: ["G1515", "G1417", "G1520", "G5109", "G3320", "G2189"] }
      ]
    },
    // Évangile de Jean complet - Louis Segond 1910 (sans références Strong)
    "Jean_1": {
      book: "Jean",
      chapter: 1,
      title: "La Parole faite chair",
      verses: [
        { number: 1, text: "Au commencement était la Parole, et la Parole était avec Dieu, et la Parole était Dieu." },
        { number: 2, text: "Elle était au commencement avec Dieu." },
        { number: 3, text: "Toutes choses ont été faites par elle, et rien de ce qui a été fait n'a été fait sans elle." },
        { number: 4, text: "En elle était la vie, et la vie était la lumière des hommes." },
        { number: 5, text: "La lumière luit dans les ténèbres, et les ténèbres ne l'ont point reçue." },
        { number: 6, text: "Il y eut un homme envoyé de Dieu: son nom était Jean." },
        { number: 7, text: "Il vint pour servir de témoin, pour rendre témoignage à la lumière, afin que tous crussent par lui." },
        { number: 8, text: "Il n'était pas la lumière, mais il parut pour rendre témoignage à la lumière." },
        { number: 9, text: "Cette lumière était la véritable lumière, qui, en venant dans le monde, éclaire tout homme." },
        { number: 10, text: "Elle était dans le monde, et le monde a été fait par elle, et le monde ne l'a point connue." },
        { number: 11, text: "Elle est venue chez les siens, et les siens ne l'ont point reçue." },
        { number: 12, text: "Mais à tous ceux qui l'ont reçue, à ceux qui croient en son nom, elle a donné le pouvoir de devenir enfants de Dieu," },
        { number: 13, text: "lesquels sont nés, non du sang, ni de la volonté de la chair, ni de la volonté de l'homme, mais de Dieu." },
        { number: 14, text: "Et la parole a été faite chair, et elle a habité parmi nous, pleine de grâce et de vérité; et nous avons contemplé sa gloire, une gloire comme la gloire du Fils unique venu du Père." }
      ]
    },
    "Jean_2": {
      book: "Jean", 
      chapter: 2,
      title: "Les noces de Cana et la purification du temple",
      verses: [
        { number: 1, text: "Trois jours après, il y eut des noces à Cana en Galilée. La mère de Jésus était là," },
        { number: 2, text: "et Jésus fut aussi invité aux noces avec ses disciples." },
        { number: 3, text: "Le vin ayant manqué, la mère de Jésus lui dit: Ils n'ont plus de vin." },
        { number: 4, text: "Jésus lui répondit: Femme, qu'y a-t-il entre moi et toi? Mon heure n'est pas encore venue." },
        { number: 5, text: "Sa mère dit aux serviteurs: Faites ce qu'il vous dira." },
        { number: 6, text: "Or, il y avait là six vases de pierre, destinés aux purifications des Juifs, et contenant chacun deux ou trois mesures." },
        { number: 7, text: "Jésus leur dit: Remplissez d'eau ces vases. Et ils les remplirent jusqu'au bord." },
        { number: 8, text: "Puisez maintenant, leur dit-il, et portez-en à l'ordonnateur du repas. Et ils en portèrent." },
        { number: 9, text: "Quand l'ordonnateur du repas eut goûté l'eau changée en vin, - ne sachant d'où venait ce vin, tandis que les serviteurs, qui avaient puisé l'eau, le savaient bien, - il appela l'époux," },
        { number: 10, text: "et lui dit: Tout homme sert d'abord le bon vin, puis le moins bon après qu'on s'est enivré; toi, tu as gardé le bon vin jusqu'à présent." },
        { number: 11, text: "Tel fut, à Cana en Galilée, le premier des miracles que fit Jésus. Il manifesta sa gloire, et ses disciples crurent en lui." }
      ]
    },
    "Jean_4": {
      book: "Jean",
      chapter: 4,
      title: "Jésus et la femme samaritaine",
      verses: [
        { number: 1, text: "Le Seigneur sut que les pharisiens avaient appris qu'il faisait et baptisait plus de disciples que Jean." },
        { number: 2, text: "Toutefois Jésus ne baptisait pas lui-même, mais c'étaient ses disciples." },
        { number: 3, text: "Alors il quitta la Judée, et retourna en Galilée." },
        { number: 4, text: "Comme il fallait qu'il passât par la Samarie," },
        { number: 5, text: "il arriva dans une ville de Samarie, nommée Sychar, près du champ que Jacob avait donné à Joseph, son fils." },
        { number: 6, text: "Là se trouvait le puits de Jacob. Jésus, fatigué du voyage, était assis au bord du puits. C'était environ la sixième heure." },
        { number: 7, text: "Une femme de Samarie vint puiser de l'eau. Jésus lui dit: Donne-moi à boire." },
        { number: 8, text: "Car ses disciples étaient allés à la ville pour acheter des vivres." },
        { number: 9, text: "La femme samaritaine lui dit: Comment toi, qui es Juif, me demandes-tu à boire, à moi qui suis une femme samaritaine? - Les Juifs, en effet, n'ont pas de relations avec les Samaritains." },
        { number: 10, text: "Jésus lui répondit: Si tu connaissais le don de Dieu et qui est celui qui te dit: Donne-moi à boire! tu lui aurais toi-même demandé à boire, et il t'aurait donné de l'eau vive." },
        { number: 11, text: "Seigneur, lui dit la femme, tu n'as rien pour puiser, et le puits est profond; d'où aurais-tu donc cette eau vive?" },
        { number: 12, text: "Es-tu plus grand que notre père Jacob, qui nous a donné ce puits, et qui en a bu lui-même, ainsi que ses fils et ses troupeaux?" },
        { number: 13, text: "Jésus lui répondit: Quiconque boit de cette eau aura encore soif;" },
        { number: 14, text: "mais celui qui boira de l'eau que je lui donnerai n'aura jamais soif, et l'eau que je lui donnerai deviendra en lui une source d'eau qui jaillira jusque dans la vie éternelle." },
        { number: 15, text: "La femme lui dit: Seigneur, donne-moi cette eau, afin que je n'aie plus soif, et que je ne vienne plus puiser ici." },
        { number: 23, text: "Mais l'heure vient, et elle est déjà venue, où les vrais adorateurs adoreront le Père en esprit et en vérité; car ce sont là les adorateurs que le Père demande." },
        { number: 24, text: "Dieu est Esprit, et il faut que ceux qui l'adorent l'adorent en esprit et en vérité." }
      ]
    },
    "Jean_5": {
      book: "Jean",
      chapter: 5,
      title: "Guérison à la piscine de Béthesda",
      verses: [
        { number: 1, text: "Après cela, il y eut une fête des Juifs, et Jésus monta à Jérusalem." },
        { number: 2, text: "Or, à Jérusalem, près de la porte des brebis, il y a une piscine qui s'appelle en hébreu Béthesda, et qui a cinq portiques." },
        { number: 3, text: "Sous ces portiques étaient couchés en grand nombre des malades, des aveugles, des boiteux, des paralytiques, qui attendaient le mouvement de l'eau;" },
        { number: 5, text: "Là se trouvait un homme malade depuis trente-huit ans." },
        { number: 6, text: "Jésus, l'ayant vu couché, et sachant qu'il était malade depuis longtemps, lui dit: Veux-tu être guéri?" },
        { number: 7, text: "Le malade lui répondit: Seigneur, je n'ai personne pour me jeter dans la piscine quand l'eau est agitée, et, pendant que j'y vais, un autre descend avant moi." },
        { number: 8, text: "Lève-toi, lui dit Jésus, prends ton lit, et marche." },
        { number: 9, text: "Aussitôt cet homme fut guéri; il prit son lit, et marcha." },
        { number: 24, text: "En vérité, en vérité, je vous le dis, celui qui écoute ma parole, et qui croit à celui qui m'a envoyé, a la vie éternelle et ne vient point en jugement, mais il est passé de la mort à la vie." }
      ]
    },
    "Jean_11": {
      book: "Jean",
      chapter: 11,
      title: "La résurrection de Lazare",
      verses: [
        { number: 1, text: "Il y avait un homme malade, Lazare, de Béthanie, village de Marie et de Marthe, sa sœur." },
        { number: 3, text: "Les sœurs envoyèrent dire à Jésus: Seigneur, voici, celui que tu aimes est malade." },
        { number: 4, text: "Après avoir entendu cela, Jésus dit: Cette maladie n'est point à la mort; mais elle est pour la gloire de Dieu, afin que le Fils de Dieu soit glorifié par elle." },
        { number: 25, text: "Jésus lui dit: Je suis la résurrection et la vie. Celui qui croit en moi vivra, quand même il serait mort;" },
        { number: 26, text: "et quiconque vit et croit en moi ne mourra jamais. Crois-tu cela?" },
        { number: 35, text: "Jésus pleura." },
        { number: 43, text: "Ayant dit cela, il cria d'une voix forte: Lazare, sors!" },
        { number: 44, text: "Et le mort sortit, les pieds et les mains liés de bandes, et le visage enveloppé d'un linge. Jésus leur dit: Déliez-le, et laissez-le aller." }
      ]
    },
    "Jean_15": {
      book: "Jean",
      chapter: 15,
      title: "Jésus, le vrai cep",
      verses: [
        { number: 1, text: "Je suis le vrai cep, et mon Père est le vigneron." },
        { number: 2, text: "Tout sarment qui est en moi et qui ne porte pas de fruit, il le retranche; et tout sarment qui porte du fruit, il l'émonde, afin qu'il porte encore plus de fruit." },
        { number: 5, text: "Je suis le cep, vous êtes les sarments. Celui qui demeure en moi et en qui je demeure porte beaucoup de fruit, car sans moi vous ne pouvez rien faire." },
        { number: 12, text: "C'est ici mon commandement: Aimez-vous les uns les autres, comme je vous ai aimés." },
        { number: 13, text: "Il n'y a pas de plus grand amour que de donner sa vie pour ses amis." },
        { number: 16, text: "Ce n'est pas vous qui m'avez choisi; mais moi, je vous ai choisis, et je vous ai établis, afin que vous alliez, et que vous portiez du fruit, et que votre fruit demeure, afin que ce que vous demanderez au Père en mon nom, il vous le donne." }
      ]
    },
    "Jean_20": {
      book: "Jean",
      chapter: 20,
      title: "La résurrection de Jésus",
      verses: [
        { number: 1, text: "Le premier jour de la semaine, Marie de Magdala se rendit au sépulcre dès le matin, comme il faisait encore obscur; et elle vit que la pierre était ôtée du sépulcre." },
        { number: 11, text: "Cependant Marie se tenait dehors près du sépulcre, et pleurait. Comme elle pleurait, elle se baissa pour regarder dans le sépulcre;" },
        { number: 16, text: "Jésus lui dit: Marie! Elle se retourna, et lui dit en hébreu: Rabbouni! c'est-à-dire, Maître!" },
        { number: 19, text: "Le soir de ce jour, qui était le premier de la semaine, les portes du lieu où se trouvaient les disciples étant fermées, à cause de la crainte qu'ils avaient des Juifs, Jésus vint, se présenta au milieu d'eux, et leur dit: La paix soit avec vous!" },
        { number: 20, text: "Et quand il eut dit cela, il leur montra ses mains et son côté. Les disciples furent dans la joie en voyant le Seigneur." },
        { number: 21, text: "Jésus leur dit de nouveau: La paix soit avec vous! Comme le Père m'a envoyé, moi aussi je vous envoie." },
        { number: 29, text: "Jésus lui dit: Parce que tu m'as vu, tu as cru. Heureux ceux qui n'ont pas vu, et qui ont cru!" },
        { number: 31, text: "Mais ces choses ont été écrites afin que vous croyiez que Jésus est le Christ, le Fils de Dieu, et qu'en croyant vous ayez la vie en son nom." }
      ]
    },
    "Jean_21": {
      book: "Jean",
      chapter: 21,
      title: "Jésus se manifeste à ses disciples",
      verses: [
        { number: 1, text: "Après cela, Jésus se montra encore aux disciples, sur les bords de la mer de Tibériade." },
        { number: 15, text: "Après qu'ils eurent mangé, Jésus dit à Simon Pierre: Simon, fils de Jonas, m'aimes-tu plus que ne m'aiment ceux-ci? Il lui répondit: Oui, Seigneur, tu sais que je t'aime. Jésus lui dit: Pais mes agneaux." },
        { number: 16, text: "Il lui dit une seconde fois: Simon, fils de Jonas, m'aimes-tu? Pierre lui répondit: Oui, Seigneur, tu sais que je t'aime. Jésus lui dit: Pais mes brebis." },
        { number: 17, text: "Il lui dit pour la troisième fois: Simon, fils de Jonas, m'aimes-tu? Pierre fut attristé de ce qu'il lui avait dit pour la troisième fois: M'aimes-tu? Et il lui répondit: Seigneur, tu sais toutes choses, tu sais que je t'aime. Jésus lui dit: Pais mes brebis." },
        { number: 25, text: "Jésus a fait encore beaucoup d'autres choses; si on les écrivait en détail, je ne pense pas que le monde même pût contenir les livres qu'on écrirait." }
      ]
    }
  },

  // Ressources pour lire la Bible
  bibleResources: [
    {
      name: "Bible Gateway",
      url: "https://www.biblegateway.com/",
      description: "Bible en ligne avec de nombreuses traductions",
      language: "multi-langues",
      features: ["Recherche avancée", "Plans de lecture", "Audio"]
    },
    {
      name: "TopBible",
      url: "https://topbible.topchretien.com/",
      description: "Bible en français avec concordance Strong",
      language: "français",
      features: ["Concordance Strong", "Commentaires", "Cartes"]
    },
    {
      name: "La Bible App",
      url: "https://www.bible.com/",
      description: "Application mobile avec plans de lecture",
      language: "multi-langues",
      features: ["Plans de lecture", "Versets du jour", "Communauté"]
    },
    {
      name: "EMCI TV Bible",
      url: "https://www.emcitv.com/bible/",
      description: "Bible Segond 21 avec outils d'étude",
      language: "français",
      features: ["Segond 21", "Concordance", "Audio"]
    },
    {
      name: "Lire dans l'App",
      url: "internal://bible-reader",
      description: "Lecteur Bible intégré avec Strong",
      language: "français",
      features: ["Hors ligne", "Numéros Strong", "Navigation"]
    }
  ],

  // Obtenir une ressource Bible aléatoire
  getRandomBibleResource() {
    return this.bibleResources[Math.floor(Math.random() * this.bibleResources.length)];
  },

  // Obtenir une clarification "Jésus n'est pas..." aléatoire
  getRandomJesusIsNot() {
    return this.jesusIsNot[Math.floor(Math.random() * this.jesusIsNot.length)];
  },

  // Obtenir une clarification par catégorie
  getJesusIsNotByCategory(category) {
    const categoryItems = this.jesusIsNot.filter(item => item.category === category);
    return categoryItems.length > 0 ?
      categoryItems[Math.floor(Math.random() * categoryItems.length)] :
      this.jesusIsNot[0];
  },

  // Fonction utilitaire pour obtenir un trésor aléatoire
  getRandomTreasure() {
    const verse = this.verses[Math.floor(Math.random() * this.verses.length)];
    const fact = this.facts[Math.floor(Math.random() * this.facts.length)];
    const funQuestion = this.funQuestions[Math.floor(Math.random() * this.funQuestions.length)];
    const jesusIsNot = this.getRandomJesusIsNot();
    
    // Toujours utiliser la ressource Bible offline en premier
    const offlineBibleResource = this.bibleResources.find(r => r.url === "internal://bible-reader");
    const otherBibleResource = this.getRandomBibleResource();
    
    // Obtenir une référence Strong du verset
    const strongKeys = Object.keys(verse.strongNumbers);
    const randomStrongKey = strongKeys[Math.floor(Math.random() * strongKeys.length)];
    const strongRef = verse.strongNumbers[randomStrongKey];
    const strongData = this.strongDictionary[strongRef];

    return {
      verse: `"${verse.text}" - ${verse.reference}`,
      fact: fact.text,
      treasure: `Contexte : ${verse.context}`,
      question: `${funQuestion.question} ${funQuestion.emoji}`,
      jesusIsNot: `❌ ${jesusIsNot.text}`,
      jesusIsNotContext: `📖 ${jesusIsNot.reference} - ${jesusIsNot.context}`,
      strongGreek: strongData ? 
        `Strong ${strongRef} : ${strongData.word} (${strongData.transliteration}) = ${strongData.meaning}` :
        `Strong ${strongRef} : Référence biblique pour étude approfondie`,
      bibleResource: offlineBibleResource || otherBibleResource,
      otherBibleResource: otherBibleResource,
      theme: verse.theme,
      version: this.versions[verse.version].name
    };
  },

  // Obtenir un verset par thème
  getVerseByTheme(theme) {
    const themeVerses = this.verses.filter(v => v.theme === theme);
    return themeVerses.length > 0 ? 
      themeVerses[Math.floor(Math.random() * themeVerses.length)] : 
      this.verses[0];
  },

  // Obtenir une question amusante par thème
  getFunQuestionByTheme(theme) {
    const themeQuestions = this.funQuestions.filter(q => q.theme === theme);
    return themeQuestions.length > 0 ?
      themeQuestions[Math.floor(Math.random() * themeQuestions.length)] :
      this.funQuestions[0];
  },

  // Obtenir un passage biblique par ID
  getPassage(passageId) {
    return this.biblePassages[passageId] || null;
  },

  // Obtenir tous les passages disponibles
  getAllPassages() {
    return Object.keys(this.biblePassages).map(key => ({
      id: key,
      ...this.biblePassages[key]
    }));
  },

  // Obtenir un passage aléatoire
  getRandomPassage() {
    const passageIds = Object.keys(this.biblePassages);
    const randomId = passageIds[Math.floor(Math.random() * passageIds.length)];
    return {
      id: randomId,
      ...this.biblePassages[randomId]
    };
  }
};

export default bibleData;