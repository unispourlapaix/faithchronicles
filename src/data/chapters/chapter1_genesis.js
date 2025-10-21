// ============================================================================
// CHAPITRE 1 : LA GENÈSE - Niveaux 1 à 13 COMPLET
// ============================================================================

export const chapter1Genesis = {
  id: 1,
  name: "La Genèse",
  description: "Au commencement... La connaissance permet à l'esprit de se vivifier",
  icon: "🌍",
  levelRange: { start: 1, end: 13 },
  
  // Sagesse spirituelle : La connaissance vivifie l'esprit
  spiritualWisdom: {
    principle: "La connaissance permet à l'esprit de se vivifier",
    scripture: "Mon peuple est détruit, parce qu'il lui manque la connaissance (Osée 4:6)",
    application: "Chaque verset étudié, chaque vérité découverte nourrit notre âme et fortifie notre foi"
  },
  
  levels: {
    1: {
      name: "La Création",
      challenge: "Au commencement, Dieu créa les cieux et la terre...",
      questions: {
        easy: {
          question: "En combien de jours Dieu a-t-il créé le monde ?",
          options: ["5 jours", "6 jours", "7 jours", "8 jours"],
          correct: 1,
          hint: "Pensez au jour de repos dans la semaine",
          funFact: "💡 Le 7ème jour, Dieu se reposa. C'est l'origine du Sabbat, jour de repos hebdomadaire!"
        },
        medium: {
          question: "Qu'est-ce que Dieu a créé le quatrième jour ?",
          options: ["Les animaux", "L'homme", "Le soleil, la lune et les étoiles", "Les plantes"],
          correct: 2,
          hint: "Ces créations éclairent la terre et marquent le temps",
          funFact: "🌟 Les luminaires furent créés pour marquer les saisons et les fêtes religieuses!"
        },
        hard: {
          question: "Que signifie le fait que l'homme soit créé 'à l'image de Dieu' ?",
          options: [
            "Apparence physique identique",
            "Capacité de créer et aimer",
            "Immortalité naturelle",
            "Pouvoir divin"
          ],
          correct: 1,
          hint: "Il s'agit des qualités spirituelles et intellectuelles",
          funFact: "✨ L'image de Dieu en nous inclut la créativité, la conscience morale et la capacité d'aimer!"
        }
      }
    },
    
    2: {
      name: "La Tentation du Jardin",
      challenge: "Le serpent était le plus rusé de tous les animaux...",
      questions: {
        easy: {
          question: "Quel animal a tenté Eve dans le jardin ?",
          options: ["Le lion", "Le serpent", "L'aigle", "Le dragon"],
          correct: 1,
          hint: "Cet animal rampe sur le ventre",
          funFact: "🐍 Le serpent représente la tentation et la ruse dans toute la Bible!"
        },
        medium: {
          question: "Quelle promesse mensongère le serpent fait-il à Eve ?",
          options: [
            "Vous serez immortels",
            "Vous serez riches", 
            "Vous serez comme des dieux",
            "Vous serez heureux"
          ],
          correct: 2,
          hint: "Le serpent promet une élévation au niveau divin",
          funFact: "🎭 Le mensonge du serpent mélange vérité et tromperie - technique de tentation classique!"
        },
        hard: {
          question: "Comment cette chute éclaire notre lutte entre bien et mal ?",
          options: [
            "Le mal est plus fort",
            "Le libre arbitre implique la responsabilité",
            "Dieu nous abandonne",
            "La tentation est invincible"
          ],
          correct: 1,
          hint: "Il s'agit de notre capacité à choisir et d'en assumer les conséquences",
          funFact: "🌳 L'arbre de la connaissance symbolise le choix moral qui définit l'humanité!"
        }
      }
    },
    
    3: {
      name: "Caïn et Abel",
      challenge: "Deux frères, deux offrandes, un drame éternel...",
      questions: {
        easy: {
          question: "Qui était le premier meurtrier de l'histoire biblique ?",
          options: ["Abel", "Seth", "Caïn", "Adam"],
          correct: 2,
          funFact: "⚡ Caïn devient le symbole de la jalousie fraternelle destructrice!"
        },
        medium: {
          question: "Pourquoi Dieu a-t-il préféré l'offrande d'Abel ?",
          options: [
            "Plus grande quantité",
            "Abel était plus beau",
            "Offerte avec un cœur sincère",
            "C'était de la viande"
          ],
          correct: 2,
          funFact: "❤️ Dieu regarde le cœur, pas seulement l'apparence de nos actions!"
        },
        hard: {
          question: "Que nous enseigne cette histoire sur la jalousie ?",
          options: [
            "La jalousie est naturelle",
            "La jalousie non maîtrisée mène à la destruction",
            "Dieu favorise certains",
            "La compétition est saine"
          ],
          correct: 1,
          funFact: "🔥 'Le péché est tapi à ta porte' - Dieu nous avertit avant la chute!"
        }
      }
    },

    4: {
      name: "Le Déluge de Noé",
      challenge: "La pluie tomba sur la terre quarante jours et quarante nuits...",
      questions: {
        easy: {
          question: "Combien de jours et nuits a duré la pluie du déluge ?",
          options: ["30 jours", "40 jours", "50 jours", "100 jours"],
          correct: 1,
          funFact: "☔ Le nombre 40 symbolise l'épreuve et la transformation dans la Bible!"
        },
        medium: {
          question: "Combien d'animaux purs Noé devait-il prendre dans l'arche ?",
          options: [
            "1 couple",
            "2 couples", 
            "7 couples",
            "10 couples"
          ],
          correct: 2,
          funFact: "🦁 Les animaux purs étaient destinés aux sacrifices après le déluge!"
        },
        hard: {
          question: "Que symbolise l'arche dans notre parcours spirituel ?",
          options: [
            "La fuite devant les problèmes",
            "Le salut par la foi et l'obéissance",
            "L'isolement nécessaire",
            "La supériorité des croyants"
          ],
          correct: 1,
          funFact: "🚢 L'arche préfigure le salut : un seul chemin pour échapper au jugement!"
        }
      }
    },

    5: {
      name: "La Tour de Babel",
      challenge: "Bâtissons-nous une tour dont le sommet touche au ciel...",
      questions: {
        easy: {
          question: "Qu'est-ce que Dieu a confondu à Babel ?",
          options: ["Les plans", "Les langues", "Les outils", "Les pensées"],
          correct: 1,
          funFact: "🗣️ Babel est l'origine mythique de la diversité linguistique mondiale!"
        },
        medium: {
          question: "Pourquoi les hommes voulaient-ils construire cette tour ?",
          options: [
            "Pour se protéger",
            "Pour vivre ensemble",
            "Pour se faire un nom et atteindre le ciel",
            "Pour honorer Dieu"
          ],
          correct: 2,
          funFact: "🏗️ L'orgueil de vouloir égaler Dieu mène toujours à la confusion!"
        },
        hard: {
          question: "Comment l'orgueil de Babel se manifeste aujourd'hui ?",
          options: [
            "Dans la technologie uniquement",
            "Dans la volonté humaine d'autonomie absolue sans Dieu",
            "Dans les gratte-ciels",
            "Dans les langues différentes"
          ],
          correct: 1,
          funFact: "💭 Babel nous rappelle que l'unité sans Dieu devient orgueil destructeur!"
        }
      }
    },

    6: {
      name: "L'Appel d'Abraham",
      challenge: "Quitte ton pays, ta patrie et la maison de ton père...",
      questions: {
        easy: {
          question: "Quel âge avait Abraham quand il quitta son pays ?",
          options: ["50 ans", "65 ans", "75 ans", "100 ans"],
          correct: 2,
          funFact: "🚶 À 75 ans, Abraham commence une nouvelle vie - il n'est jamais trop tard!"
        },
        medium: {
          question: "Quelle triple promesse Dieu fait-il à Abraham ?",
          options: [
            "Richesse, pouvoir, sagesse",
            "Terre, descendance, bénédiction universelle",
            "Longue vie, paix, prospérité",
            "Foi, espérance, amour"
          ],
          correct: 1,
          funFact: "🌟 La promesse à Abraham concerne toute l'humanité, pas seulement lui!"
        },
        hard: {
          question: "Que nous apprend le 'saut de foi' d'Abraham ?",
          options: [
            "La foi aveugle est dangereuse",
            "Suivre Dieu exige de lâcher nos sécurités",
            "Dieu favorise certains peuples",
            "La foi garantit le succès"
          ],
          correct: 1,
          funFact: "✨ Abraham est appelé 'père de la foi' car il a cru sans voir!"
        }
      }
    },

    7: {
      name: "Le Sacrifice d'Isaac",
      challenge: "Prends ton fils, ton unique, celui que tu aimes...",
      questions: {
        easy: {
          question: "Sur quelle montagne Abraham devait sacrifier Isaac ?",
          options: ["Sinaï", "Morija", "Carmel", "Sion"],
          correct: 1,
          funFact: "🏔️ Le mont Morija deviendra le lieu du Temple de Jérusalem!"
        },
        medium: {
          question: "Qu'a fourni Dieu à la place d'Isaac ?",
          options: [
            "Un agneau",
            "Un bélier retenu par les cornes",
            "Une chèvre",
            "Un taureau"
          ],
          correct: 1,
          funFact: "🐏 Le bélier substitué préfigure le sacrifice substitutif ultime!"
        },
        hard: {
          question: "Comment cette épreuve illustre la foi absolue ?",
          options: [
            "Dieu teste cruellement",
            "La foi transcende même l'amour paternel",
            "Les sacrifices humains plaisent à Dieu",
            "Abraham n'aimait pas vraiment Isaac"
          ],
          correct: 1,
          funFact: "💝 Dieu pourvoit toujours une issue quand nous lui faisons confiance!"
        }
      }
    },

    8: {
      name: "Jacob et Esaü",
      challenge: "Le plus jeune servira l'aîné...",
      questions: {
        easy: {
          question: "Contre quoi Esaü a-t-il vendu son droit d'aînesse ?",
          options: ["De l'or", "Un plat de lentilles", "Des vêtements", "Du vin"],
          correct: 1,
          funFact: "🍲 Un moment de faim a coûté à Esaü sa bénédiction éternelle!"
        },
        medium: {
          question: "Comment Jacob a-t-il trompé son père Isaac ?",
          options: [
            "En changeant sa voix",
            "En se déguisant",
            "En se couvrant de peau de chèvre",
            "En mentant sur son nom"
          ],
          correct: 2,
          funFact: "🎭 Isaac, aveugle, reconnut l'odeur et le toucher mais pas la supercherie!"
        },
        hard: {
          question: "Que révèle cette histoire sur nos choix ?",
          options: [
            "La tromperie est parfois nécessaire",
            "Les désirs immédiats peuvent coûter notre destinée",
            "Dieu approuve la ruse",
            "Le cadet est toujours favorisé"
          ],
          correct: 1,
          funFact: "⚖️ Nos choix impulsifs peuvent avoir des conséquences éternelles!"
        }
      }
    },

    9: {
      name: "Le Rêve de Jacob",
      challenge: "Il vit une échelle dressée sur la terre, dont le sommet touchait le ciel...",
      questions: {
        easy: {
          question: "Qu'a vu Jacob dans son rêve ?",
          options: [
            "Un arbre géant",
            "Une échelle vers le ciel avec des anges",
            "Un temple",
            "Des étoiles"
          ],
          correct: 1,
          funFact: "👼 L'échelle de Jacob symbolise la connexion entre le Ciel et la Terre!"
        },
        medium: {
          question: "Qu'a fait Jacob avec la pierre qui lui servait d'oreiller ?",
          options: [
            "Il l'a cassée",
            "Il l'a enterrée",
            "Il l'a dressée et ointe d'huile",
            "Il l'a emportée"
          ],
          correct: 2,
          funFact: "🪨 Cette pierre devient 'Béthel' - la maison de Dieu!"
        },
        hard: {
          question: "Comment cette vision connecte ciel et terre dans notre vie ?",
          options: [
            "Par les rêves seulement",
            "Par la prière qui établit le pont avec le divin",
            "Par les anges gardiens",
            "Par les lieux sacrés"
          ],
          correct: 1,
          funFact: "🌉 La prière est notre échelle personnelle vers le Ciel!"
        }
      }
    },

    10: {
      name: "Joseph Vendu par ses Frères",
      challenge: "Voici le rêveur qui arrive...",
      questions: {
        easy: {
          question: "Combien de frères avait Joseph ?",
          options: ["7 frères", "10 frères", "11 frères", "12 frères"],
          correct: 2,
          funFact: "👨‍👨‍👦‍👦 Les 12 fils de Jacob deviendront les 12 tribus d'Israël!"
        },
        medium: {
          question: "Pour combien de pièces d'argent Joseph fut-il vendu ?",
          options: [
            "10 pièces",
            "20 pièces",
            "30 pièces",
            "50 pièces"
          ],
          correct: 1,
          funFact: "💰 20 pièces d'argent, le prix d'un esclave à l'époque!"
        },
        hard: {
          question: "Comment la jalousie devient instrument du plan divin ?",
          options: [
            "Dieu approuve la jalousie",
            "Le mal commis est transformé en bien par Dieu",
            "La jalousie est nécessaire",
            "Les frères avaient raison"
          ],
          correct: 1,
          funFact: "🎨 Dieu transforme même nos pires actions en chef-d'œuvre de grâce!"
        }
      }
    },

    11: {
      name: "Joseph en Prison",
      challenge: "L'Éternel fut avec Joseph et étendit sur lui sa bonté...",
      questions: {
        easy: {
          question: "Quel don spécial Joseph avait-il ?",
          options: [
            "Prophétiser",
            "Interpréter les rêves",
            "Guérir les malades",
            "Parler aux animaux"
          ],
          correct: 1,
          funFact: "💭 Les rêves étaient considérés comme messages divins dans l'Antiquité!"
        },
        medium: {
          question: "Quels serviteurs de Pharaon étaient en prison avec Joseph ?",
          options: [
            "Le vizir et le scribe",
            "L'échanson et le panetier",
            "Le médecin et le garde",
            "Le cuisinier et le jardinier"
          ],
          correct: 1,
          funFact: "🍷 L'échanson goûtait le vin du roi pour éviter l'empoisonnement!"
        },
        hard: {
          question: "Que nous enseigne Joseph sur la fidélité dans l'adversité ?",
          options: [
            "L'injustice est acceptable",
            "La fidélité à Dieu transcende les circonstances",
            "La prison change les gens",
            "Il faut se venger"
          ],
          correct: 1,
          funFact: "⭐ Même en prison, Joseph resta intègre et Dieu l'éleva!"
        }
      }
    },

    12: {
      name: "Les Rêves de Pharaon",
      challenge: "Sept vaches grasses... sept vaches maigres...",
      questions: {
        easy: {
          question: "Combien de vaches maigres dévorèrent les vaches grasses ?",
          options: ["5", "6", "7", "8"],
          correct: 2,
          funFact: "🐄 Le chiffre 7 symbolise la perfection et la complétude dans la Bible!"
        },
        medium: {
          question: "Que signifiaient les 7 années dans le rêve ?",
          options: [
            "7 ans de guerre puis de paix",
            "7 ans d'abondance puis 7 ans de famine",
            "7 ans de maladie puis de santé",
            "7 ans de pluie puis de sécheresse"
          ],
          correct: 1,
          funFact: "🌾 Joseph sauva l'Égypte et sa famille grâce à cette interprétation!"
        },
        hard: {
          question: "Comment la sagesse divine transforme les crises ?",
          options: [
            "En évitant toute crise",
            "En donnant la prévoyance pour s'y préparer",
            "En punissant les méchants",
            "En enrichissant les croyants"
          ],
          correct: 1,
          funFact: "💡 La sagesse divine transforme les crises en opportunités de salut!"
        }
      }
    },

    13: {
      name: "La Réconciliation des Frères",
      challenge: "Je suis Joseph, votre frère, que vous avez vendu...",
      questions: {
        easy: {
          question: "Que mit Joseph dans le sac de Benjamin ?",
          options: [
            "De l'or",
            "Sa bague",
            "Sa coupe d'argent",
            "Une lettre"
          ],
          correct: 2,
          funFact: "🏆 La coupe servait aussi à 'lire' l'avenir dans l'eau!"
        },
        medium: {
          question: "Quelle phrase célèbre Joseph dit-il sur le mal transformé ?",
          options: [
            "Je vous pardonne",
            "Vous aviez médité de me faire du mal, Dieu l'a changé en bien",
            "Oublions le passé",
            "La vengeance est à Dieu"
          ],
          correct: 1,
          funFact: "✨ Cette phrase résume toute la providence divine dans nos vies!"
        },
        hard: {
          question: "Comment le pardon brise les cycles de vengeance ?",
          options: [
            "En oubliant le mal",
            "En libérant l'offenseur et l'offensé pour un nouveau départ",
            "En punissant d'abord",
            "En gardant ses distances"
          ],
          correct: 1,
          funFact: "🕊️ Le pardon de Joseph préfigure le pardon divin universel!"
        }
      }
    }
  }
};