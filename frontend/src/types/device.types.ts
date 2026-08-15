export interface Device {
  id: number;
  hostname: string;
  ipAddress: string;
  status: "active" | "inactive" | "maintenance";
}


export interface CreateDeviceRequest {
  hostname: string;
  ipAddress: string;
  status: "active" | "inactive" | "maintenance";
}


export interface UpdateDeviceRequest {
  hostname?: string;
  ipAddress?: string;
  status?: "active" | "inactive" | "maintenance";
}