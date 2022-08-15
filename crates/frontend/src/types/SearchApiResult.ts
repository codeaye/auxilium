export interface Result {
  items: Item[];
  has_more: boolean;
  quota_max: number;
  quota_remaining: number;
}

export interface Item {
  tags: string[];
  owner: Owner;
  is_answered: boolean;
  view_count: number;
  answer_count: number;
  score: number;
  last_activity_date: number;
  creation_date: number;
  question_id: number;
  content_license?: "CC BY-SA 3.0" | "CC BY-SA 4.0";
  link: string;
  title: string;
  accepted_answer_id?: number;
  last_edit_date?: number;
  closed_date?: number;
  closed_reason?: string;
}
export interface Owner {
  account_id?: number;
  reputation?: number;
  user_id?: number;
  user_type: "registered" | "does_not_exist";
  profile_image?: string;
  display_name: string;
  link?: string;
  accept_rate?: number;
}
