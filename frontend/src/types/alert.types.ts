export interface Alert {
  id: number;
  device_id: number;
  severity: "WARNING" | "CRITICAL";
  status: "ACTIVE" | "ACKNOWLEDGED" | "RESOLVED";
  message: string;
  created_at: string;
  acknowledged_at: string | null;
  acknowledged_by: number | null;
}

export interface CreateAlertRequest {
  device_id: number;
  severity: "WARNING" | "CRITICAL";
  message: string;
}

export interface UpdateAlertRequest {
  device_id?: number;
  severity?: "WARNING" | "CRITICAL";
  message?: string;
  status?: "ACTIVE" | "ACKNOWLEDGED" | "RESOLVED";
}

export interface AcknowledgeAlertRequest {
  user_id: number;
}