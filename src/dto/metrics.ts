export interface FieldHistory {
  date: Date;
  value: number;
}

export interface CompanyMetricsGroup {
  improved: string[];
  remained: string[];
  worsened: string[];

  overall: number;

  history: Record<string, FieldHistory[]>;
}

export interface CompanyMetrics {
  structure: CompanyMetricsGroup;
  solution: CompanyMetricsGroup;
  market: CompanyMetricsGroup;
}
