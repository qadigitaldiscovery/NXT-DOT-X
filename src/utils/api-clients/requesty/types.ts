
export interface RequestyMessage {
  role: "system" | "user" | "assistant";
  content: string;
}

export interface RequestyConfig {
  model?: string;
  messages: RequestyMessage[];
  temperature?: number;
  max_tokens?: number;
  stream?: boolean;
}
