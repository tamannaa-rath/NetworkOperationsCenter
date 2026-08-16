export interface AuditLog {
  id: number;
  user_id: number | null;
  action: string;
  resource_type: string;
  resource_id: number | null;
  description: string;
  ip_address: string | null;
  created_at: string;
}