export interface Metric {
  id: number;
  device_id: number;
  hostname: string;
  cpu_usage: number;
  memory_usage: number;
  disk_usage: number;
  network_throughput: number;
  latency: number;
  packet_loss: number;
  timestamp: string;
}

export interface CreateMetricRequest {
  device_id: number;
  cpu_usage: number;
  memory_usage: number;
  disk_usage: number;
  network_throughput: number;
  latency: number;
  packet_loss: number;
}