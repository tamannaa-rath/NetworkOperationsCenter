import apiRequest from "./api";

import type {
  Incident,
} from "../types/incidents.types";


export async function getIncidents(): Promise<Incident[]> {
  return apiRequest<Incident[]>("/incidents");
}

export async function getIncidentById(
  id: number
): Promise<Incident> {
  return apiRequest<Incident>(`/incidents/${id}`);
}


export async function assignIncident(
  id: number,
  user_id: number
): Promise<Incident> {
  return apiRequest<Incident>(
    `/incidents/${id}/assign`,
    {
      method: "POST",
      body: JSON.stringify({
        user_id,
      }),
    }
  );
}


export async function resolveIncident(
  id: number,
  resolution: string
): Promise<Incident> {
  return apiRequest<Incident>(
    `/incidents/${id}/resolve`,
    {
      method: "POST",
      body: JSON.stringify({
        resolution,
      }),
    }
  );
}