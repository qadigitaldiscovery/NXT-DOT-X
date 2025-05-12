
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
  response_format?: string;
}

// Add the missing types that were causing errors
export interface RequestyResponse {
  id: string;
  object: string;
  created: number;
  model: string;
  choices: Array<{
    index: number;
    message?: {
      role: string;
      content: string;
    };
    delta?: {
      content?: string;
    };
    finish_reason: string | null;
  }>;
  usage?: {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
  };
}

export class RequestyError extends Error {
  type?: string;
  param?: string;
  code?: string;
  
  constructor(message: string, details?: any) {
    super(message);
    this.name = 'RequestyError';
    if (details) {
      this.type = details.type;
      this.param = details.param;
      this.code = details.code;
    }
  }
}

export interface CallOptions {
  endpoint: string;
  payload: any;
  apiKey?: string;
  signal?: AbortSignal;
}
