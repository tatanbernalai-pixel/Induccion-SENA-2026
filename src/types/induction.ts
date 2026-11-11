export type ModuleId = 'identity' | 'symbols' | 'normative' | 'digital' | 'wellness';

export interface ModuleInfo {
  id: ModuleId;
  number: number;
  title: string;
  shortDescription: string;
  iconName: string;
  durationMinutes: number;
  topicsCount: number;
  sections: ModuleSection[];
  quiz: ModuleQuiz;
}

export interface ModuleSection {
  id: string;
  title: string;
  subtitle?: string;
  content: string[];
  interactiveType?: 'hotspots' | 'anthem_player' | 'cards_grid' | 'timeline' | 'ecosystem_map' | 'wellness_grid';
  interactiveData?: any;
  keyTakeaways?: string[];
  articleRef?: string;
}

export interface Question {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  normativeRef?: string;
}

export interface ModuleQuiz {
  title: string;
  passingScore: number; // percentage, e.g. 80
  questions: Question[];
}

export interface CaseStudy {
  id: string;
  title: string;
  category: 'académica' | 'disciplinaria' | 'convivencia';
  severity: 'Leve' | 'Grave' | 'Gravísima';
  description: string;
  context: string;
  dilemma: string;
  options: {
    id: string;
    action: string;
    isCorrect: boolean;
    feedback: string;
    normativeRef: string;
  }[];
}

export interface ClassificationItem {
  id: string;
  text: string;
  category: 'Derecho' | 'Deber' | 'Prohibición';
  explanation: string;
  article: string;
}

export interface ApprenticeProgress {
  completedModules: ModuleId[];
  moduleScores: Record<ModuleId, number>; // 0 - 100
  casesCompleted: string[];
  earnedBadges: Badge[];
  classificationGameBestScore: number;
  certificateEarned: boolean;
  certificateDate?: string;
  inductionCode?: string;
}

export interface Badge {
  id: string;
  title: string;
  description: string;
  icon: string;
  category: string;
  unlockedAt?: string;
}

export interface ApprenticeUser {
  id: string;
  name: string;
  documentNumber: string;
  documentType: 'CC' | 'TI' | 'CE';
  email: string;
  phone: string;
  fichaCode: string;
  programName: string;
  regional: string;
  trainingCenter: string;
  status: 'Completado' | 'En Progreso' | 'En Riesgo' | 'Sin Iniciar';
  overallProgress: number; // 0 - 100%
  completedModulesCount: number;
  averageScore: number;
  lastAccess: string;
  avatarUrl?: string;
  notes?: string;
}

export interface CohortGroup {
  fichaCode: string;
  programName: string;
  trainingCenter: string;
  regional: string;
  startDate: string;
  instructorName: string;
  instructorEmail: string;
  totalApprentices: number;
  completedCount: number;
  inProgressCount: number;
  atRiskCount: number;
  notStartedCount: number;
}
