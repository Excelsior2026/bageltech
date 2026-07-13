export interface DashboardReview {
  review_id: string;
  status: "pending" | "resolved" | string;
  user_info?: {
    id?: string | number;
    username?: string;
    first_name?: string;
  };
  chat_info?: {
    id?: string | number;
    title?: string;
  };
  threat_categories?: string[];
  risk_factors?: string[];
  action?: {
    confidence?: number;
    action?: string;
  };
  message_text?: string;
  created_at?: string;
  admin_decision?: string;
  admin_notes?: string;
  resolved_at?: string;
}

export interface ReviewsResponse {
  pending_reviews?: DashboardReview[];
}

export interface HealthResponse {
  status?: string;
}

export interface DashboardUser {
  id: string | number;
  name: string;
  email: string;
  role: string;
  tenant_id: string;
  last_login?: string;
  active: boolean;
}
