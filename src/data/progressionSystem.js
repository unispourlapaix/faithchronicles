/**
 * Système de progression Faith Chronicles
 * 8 Niveaux spirituels x 16 Grades = 128 grades totaux
 */

export const SPIRITUAL_LEVELS = [
  {
    level: 1,
    nameKey: "seeker",
    description: "Début du voyage spirituel",
    color: "#9CA3AF", // Gris
    icon: "🌱"
  },
  {
    level: 2,
    nameKey: "disciple",
    description: "Apprentissage des enseignements",
    color: "#60A5FA", // Bleu
    icon: "📖"
  },
  {
    level: 3,
    nameKey: "servant",
    description: "Service et dévotion",
    color: "#34D399", // Vert
    icon: "🙏"
  },
  {
    level: 4,
    nameKey: "witness",
    description: "Partage de la foi",
    color: "#FBBF24", // Jaune
    icon: "✨"
  },
  {
    level: 5,
    nameKey: "guardian",
    description: "Protection de la vérité",
    color: "#F97316", // Orange
    icon: "🛡️"
  },
  {
    level: 6,
    nameKey: "wise",
    description: "Sagesse et connaissance",
    color: "#A78BFA", // Violet
    icon: "📜"
  },
  {
    level: 7,
    nameKey: "prophet",
    description: "Vision spirituelle",
    color: "#EC4899", // Rose
    icon: "👁️"
  },
  {
    level: 8,
    nameKey: "apostle",
    description: "Maître spirituel",
    color: "#EF4444", // Rouge/Or
    icon: "👑"
  }
];

// 16 grades par niveau (de I à XVI en chiffres romains)
export const GRADES = [
  { grade: 1, roman: "I" },
  { grade: 2, roman: "II" },
  { grade: 3, roman: "III" },
  { grade: 4, roman: "IV" },
  { grade: 5, roman: "V" },
  { grade: 6, roman: "VI" },
  { grade: 7, roman: "VII" },
  { grade: 8, roman: "VIII" },
  { grade: 9, roman: "IX" },
  { grade: 10, roman: "X" },
  { grade: 11, roman: "XI" },
  { grade: 12, roman: "XII" },
  { grade: 13, roman: "XIII" },
  { grade: 14, roman: "XIV" },
  { grade: 15, roman: "XV" },
  { grade: 16, roman: "XVI" }
];

/**
 * Calcul de l'XP requis pour chaque grade (progression exponentielle)
 * Formule: baseXP * (1.15 ^ globalGrade)
 */
const BASE_XP = 100;
const GROWTH_RATE = 1.15;

export const calculateXPForGrade = (level, grade) => {
  const globalGrade = (level - 1) * 16 + grade;
  return Math.floor(BASE_XP * Math.pow(GROWTH_RATE, globalGrade - 1));
};

/**
 * Calcul de l'XP total requis pour atteindre un niveau/grade spécifique
 */
export const calculateTotalXPRequired = (level, grade) => {
  let totalXP = 0;
  for (let l = 1; l <= level; l++) {
    const maxGrade = l === level ? grade : 16;
    for (let g = 1; g <= maxGrade; g++) {
      totalXP += calculateXPForGrade(l, g);
    }
  }
  return totalXP;
};

/**
 * Détermine le niveau et le grade actuel en fonction de l'XP total
 */
export const getProgressionFromXP = (totalXP) => {
  let remainingXP = totalXP;

  for (let level = 1; level <= 8; level++) {
    for (let grade = 1; grade <= 16; grade++) {
      const xpNeeded = calculateXPForGrade(level, grade);

      if (remainingXP < xpNeeded) {
        // On est à ce niveau/grade
        const previousGrade = grade === 1 ? (level === 1 ? 1 : 16) : grade - 1;
        const previousLevel = grade === 1 && level > 1 ? level - 1 : level;

        return {
          level: previousLevel,
          grade: previousGrade,
          currentXP: remainingXP,
          xpToNextGrade: xpNeeded,
          progressPercent: Math.floor((remainingXP / xpNeeded) * 100),
          isMaxLevel: false
        };
      }

      remainingXP -= xpNeeded;
    }
  }

  // Niveau max atteint
  return {
    level: 8,
    grade: 16,
    currentXP: remainingXP,
    xpToNextGrade: 0,
    progressPercent: 100,
    isMaxLevel: true
  };
};

/**
 * Calcul de l'XP gagnée selon différentes actions
 */
export const XP_REWARDS = {
  // Réponses correctes
  CORRECT_ANSWER_EASY: 10,
  CORRECT_ANSWER_MEDIUM: 20,
  CORRECT_ANSWER_HARD: 35,

  // Bonus
  COMBO_MULTIPLIER: 1.1, // +10% par combo
  PERFECT_LEVEL: 50,      // Niveau terminé sans erreur
  FIRST_TRY: 15,          // Bonne réponse du premier coup
  SPEED_BONUS: 10,        // Réponse rapide (< 5 secondes)

  // Achievements
  COMPLETE_CHAPTER: 100,
  UNLOCK_LEVEL: 25,
  COLLECT_STAR: 20,

  // Pénalités (réduites pour éviter frustration)
  WRONG_ANSWER: -2, // Réduit de -5 à -2
};

/**
 * Calcule l'XP gagnée pour une question
 */
export const calculateQuestionXP = (options = {}) => {
  const {
    difficulty = 'easy',
    isCorrect = false,
    combo = 0,
    timeSpent = 0,
    isPerfect = false,
    isFirstTry = true
  } = options;

  if (!isCorrect) {
    return XP_REWARDS.WRONG_ANSWER;
  }

  // XP de base selon difficulté
  let xp = 0;
  switch (difficulty) {
    case 'easy':
      xp = XP_REWARDS.CORRECT_ANSWER_EASY;
      break;
    case 'medium':
      xp = XP_REWARDS.CORRECT_ANSWER_MEDIUM;
      break;
    case 'hard':
      xp = XP_REWARDS.CORRECT_ANSWER_HARD;
      break;
    default:
      xp = XP_REWARDS.CORRECT_ANSWER_EASY;
  }

  // Bonus combo
  if (combo > 0) {
    xp *= Math.pow(XP_REWARDS.COMBO_MULTIPLIER, combo);
  }

  // Bonus vitesse
  if (timeSpent > 0 && timeSpent < 5) {
    xp += XP_REWARDS.SPEED_BONUS;
  }

  // Bonus premier essai
  if (isFirstTry) {
    xp += XP_REWARDS.FIRST_TRY;
  }

  return Math.floor(xp);
};

/**
 * Formate le niveau et grade pour affichage
 */
export const formatProgression = (level, grade) => {
  const levelData = SPIRITUAL_LEVELS[level - 1];
  const gradeData = GRADES[grade - 1];

  return {
    fullTitle: `${levelData.nameKey} ${gradeData.roman}`,
    shortTitle: `${levelData.icon} ${gradeData.roman}`,
    levelNameKey: levelData.nameKey,
    gradeRoman: gradeData.roman,
    color: levelData.color,
    icon: levelData.icon,
    description: levelData.description
  };
};

/**
 * Obtenir le rang suivant
 */
export const getNextRank = (currentLevel, currentGrade) => {
  if (currentLevel === 8 && currentGrade === 16) {
    return null; // Niveau max
  }

  let nextLevel = currentLevel;
  let nextGrade = currentGrade + 1;

  if (nextGrade > 16) {
    nextLevel++;
    nextGrade = 1;
  }

  return {
    level: nextLevel,
    grade: nextGrade,
    ...formatProgression(nextLevel, nextGrade)
  };
};

export default {
  SPIRITUAL_LEVELS,
  GRADES,
  XP_REWARDS,
  calculateXPForGrade,
  calculateTotalXPRequired,
  getProgressionFromXP,
  calculateQuestionXP,
  formatProgression,
  getNextRank
};
