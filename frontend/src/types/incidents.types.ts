export interface Incident {
  id: number;
  title: string;
  description: string;
  severity: "WARNING" | "CRITICAL";
  status: "OPEN" | "IN_PROGRESS" | "RESOLVED";
  device_id: number;
  hostname: string;
  assigned_to: number | null;
  created_at: string;
  assigned_at: string | null;
  resolved_at: string | null;
  resolution: string | null;
}

export interface CreateIncidentRequest {
  title: string;
  description: string;
  severity: "WARNING" | "CRITICAL";
  device_id: number;
}

export interface UpdateIncidentRequest {
  title?: string;
  description?: string;
  severity?: "WARNING" | "CRITICAL";
  device_id?: number;
}

export interface AssignIncidentRequest {
  user_id: number;
}

export interface ResolveIncidentRequest {
  resolution: string;
}

export interface AddIncidentCommentRequest {
  user_id: number;
  message: string;
}