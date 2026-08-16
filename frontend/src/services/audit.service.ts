import apiRequest from "./api";

import type { AuditLog } from "../types/audit.types";


export async function getAuditLogs(): Promise<AuditLog[]> {
  return apiRequest("/audit-logs");
}


export async function getAuditLogById(
  id: number
): Promise<AuditLog> {
  return apiRequest(`/audit-logs/${id}`);
}