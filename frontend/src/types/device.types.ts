export interface Device {
  id: number;
  hostname: string;
  ip_address: string;
  status: "active" | "inactive" | "maintenance";
}


export interface CreateDeviceRequest {
  hostname: string;
  ip_address: string;
  status: "active" | "inactive" | "maintenance";
}


export interface UpdateDeviceRequest {
  hostname?: string;
  ip_address?: string;
  status?: "active" | "inactive" | "maintenance";
}