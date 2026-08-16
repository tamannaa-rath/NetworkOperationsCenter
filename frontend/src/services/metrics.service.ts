import apiRequest from "./api";

import type { Metric } from "../types/metrics.types";

export async function getMetrics(): Promise<Metric[]> {
  return apiRequest<Metric[]>("/metrics");
}