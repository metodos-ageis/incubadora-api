export interface Company {
  id: string;
  title: string;
  description: string;
  sector: string;
  goal: string;
  cnpj: number;
  project_time: number;
  challenges: string;
  team_size: number;
  project_started: string;
  website: string;
  ip: boolean;
  resources: string;
  resources_needed: string;
  mvp: boolean;
  incoming_model: string;
  created_at?: Date;
  updated_at?: Date;
  deleted_at?: Date;
}

export interface CompanyProgress {
  id: string;
  company_id: string;
  canvas?: string;
  pitch?: string;
  development_state?: string;
  solution_definition?: string;
  ecosystem?: string;
  definition_validation?: string;
  clients?: string;
  concurrency_analysis?: string;
  market_size?: string;
  incoming_method?: string;
  mvp?: string;
  feedback_cycle?: string;
  created_at?: Date;
  updated_at?: Date;
  deleted_at?: Date;
}

export interface TopicScore {
  id: string;
  progress_id: string;
  topic: string;
  score: number;
  group: string;
  created_at?: Date;
  updated_at?: Date;
  deleted_at?: Date;
}
