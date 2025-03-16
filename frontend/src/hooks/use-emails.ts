import { useState } from 'react';
import { EmailGenerateResponse, EmailSendResponse } from '../types';

export function useEmails() {
  const [generatedEmail, setGeneratedEmail] = useState<EmailGenerateResponse | EmailSendResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const generateEmail = async (prospectId: number): Promise<EmailGenerateResponse> => {
    setLoading(true);
    setError(null);
    
    try {
      // Replace with your actual API endpoint
      const response = await fetch(`/api/emails/generate?prospectId=${prospectId}`);
      
      if (!response.ok) {
        throw new Error('Failed to generate email');
      }
      
      const data: EmailGenerateResponse = await response.json();
      setGeneratedEmail(data);
      return data;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred';
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const sendEmail = async (prospectId: number): Promise<EmailSendResponse> => {
    setLoading(true);
    setError(null);
    
    try {
      // Replace with your actual API endpoint
      const response = await fetch(`/api/emails/send?prospectId=${prospectId}`, {
        method: 'POST',
      });
      
      if (!response.ok) {
        throw new Error('Failed to send email');
      }
      
      const data: EmailSendResponse = await response.json();
      setGeneratedEmail(data);
      return data;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred';
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    generatedEmail,
    loading,
    error,
    generateEmail,
    sendEmail
  };
}
