import apiRequest from "./api";

import type {
  Device,
  CreateDeviceRequest,
  UpdateDeviceRequest,
} from "../types/device.types";


export async function getDevices(): Promise<Device[]> {
  return apiRequest("/devices");
}


export async function getDeviceById(
  id: number
): Promise<Device> {
  return apiRequest(`/devices/${id}`);
}


export async function createDevice(
  device: CreateDeviceRequest
): Promise<Device> {
  return apiRequest("/devices", {
    method: "POST",
    body: JSON.stringify(device),
  });
}


export async function updateDevice(
  id: number,
  device: UpdateDeviceRequest
): Promise<Device> {
  return apiRequest(`/devices/${id}`, {
    method: "PUT",
    body: JSON.stringify(device),
  });
}


export async function deleteDevice(
  id: number
): Promise<Device> {
  return apiRequest(`/devices/${id}`, {
    method: "DELETE",
  });
}