export interface Environment {
    API_URL: string;
    APP_NAME: string;
    APP_VERSION: string;
  }
  
  // Get environment variables with validation
  export function getEnv(): Environment {
    const API_URL = process.env.NEXT_PUBLIC_API_URL;
    if (!API_URL) {
      throw new Error("NEXT_PUBLIC_API_URL environment variable is not set");
    }
  
    return {
      API_URL,
      APP_NAME: process.env.NEXT_PUBLIC_APP_NAME || 'AI Outreach',
      APP_VERSION: process.env.NEXT_PUBLIC_APP_VERSION || '1.0.0',
    };
  }
  
  // Create a singleton instance for use throughout the app
  export const env = getEnv();
  