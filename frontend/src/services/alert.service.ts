import apiRequest from "./api";

import type { 
    Alert,
    AcknowledgeAlertRequest,
    UpdateAlertRequest,
 } from "../types/alert.types";


export async function getAlerts(): Promise<Alert[]> {
  return apiRequest<Alert[]>("/alerts");
}

export async function acknowledgeAlert(
  id: number,
  user_id: number
): Promise<Alert> {
  return apiRequest<Alert>(
    `/alerts/${id}/acknowledge`,
    {
      method: "POST",
      body: JSON.stringify({
        user_id,
      }),
    }
  );
}


export async function updateAlert(
        id: number,
        update: UpdateAlertRequest
        ): Promise<Alert> {
        return apiRequest<Alert>(`/alerts/${id}`, {
            method: "PUT",
            body: JSON.stringify(update),
        });
}
