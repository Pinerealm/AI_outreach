'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import EmailGenerator from '../../components/emails/email-generator';
import EmailPreview from '../../components/emails/email-preview';
import { useEmails } from '../../hooks/use-emails';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/card';
import Button from '../../components/ui/button';
import { EmailGenerateResponse } from '../../types';

export default function EmailsPage() {
  const searchParams = useSearchParams();
  const prospectId = searchParams.get('prospectId');
  const { generatedEmail, generateEmail, sendEmail } = useEmails();
  const [activeTab, setActiveTab] = useState<'generate' | 'history'>('generate');

  // If prospectId is provided in the URL, auto-generate an email for that prospect
  useEffect(() => {
    if (prospectId) {
      generateEmail(parseInt(prospectId)).catch(error => {
        console.error('Error auto-generating email:', error);
      });
    }
  }, [prospectId, generateEmail]);

  const handleSendEmail = (email: EmailGenerateResponse) => {
    if (email.prospect_id) {
      sendEmail(email.prospect_id).catch(error => {
        console.error('Error sending email:', error);
      });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Email Personalization</h1>
      </div>

      <div className="flex space-x-2 border-b border-gray-200 mb-6">
        <Button
          variant={activeTab === 'generate' ? 'primary' : 'secondary'}
          onClick={() => setActiveTab('generate')}
        >
          Generate Email
        </Button>
        <Button
          variant={activeTab === 'history' ? 'primary' : 'secondary'}
          onClick={() => setActiveTab('history')}
        >
          Email History
        </Button>
      </div>

      {activeTab === 'generate' ? (
        <>
          <EmailGenerator />
          {generatedEmail && <EmailPreview email={generatedEmail} onSend={handleSendEmail} />}
        </>
      ) : (
        <Card>
          <CardHeader>
            <CardTitle>Email History</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center py-6 text-gray-500">
              Email history functionality will be implemented in future versions.
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
