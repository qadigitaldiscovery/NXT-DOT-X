
// Types for OpenAI API responses
export type OpenAIErrorResponse = {
  error: {
    message: string;
    type: string;
    param: string | null;
    code: string;
  };
};

export type ChatCompletionResponse = {
  id: string;
  object: string;
  created: number;
  model: string;
  choices: Array<{
    index: number;
    message: {
      role: string;
      content: string;
    };
    finish_reason: string;
  }>;
  usage: {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
  };
};

export type EmbeddingsResponse = {
  object: string;
  data: Array<{
    object: string;
    embedding: number[];
    index: number;
  }>;
  model: string;
  usage: {
    prompt_tokens: number;
    total_tokens: number;
  };
};

export type ModerationResponse = {
  id: string;
  model: string;
  results: Array<{
    categories: Record<string, boolean>;
    category_scores: Record<string, number>;
    flagged: boolean;
  }>;
};

export type OpenAIResponse = ChatCompletionResponse | EmbeddingsResponse | ModerationResponse;

// OpenAI API error types
export class OpenAIError extends Error {
  type: string;
  param: string | null;
  code: string;
  
  constructor(error: OpenAIErrorResponse['error']) {
    super(error.message);
    this.name = 'OpenAIError';
    this.type = error.type;
    this.param = error.param;
    this.code = error.code;
  }
}

export class RateLimitError extends OpenAIError {
  constructor(error: OpenAIErrorResponse['error']) {
    super(error);
    this.name = 'RateLimitError';
  }
}

export class InvalidRequestError extends OpenAIError {
  constructor(error: OpenAIErrorResponse['error']) {
    super(error);
    this.name = 'InvalidRequestError';
  }
}

export class NetworkError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'NetworkError';
  }
}

// Call options type
export type CallOptions = {
  endpoint: 'chat' | 'embeddings' | 'moderations';
  payload: any;
  apiKey?: string; 
  signal?: AbortSignal;
};
