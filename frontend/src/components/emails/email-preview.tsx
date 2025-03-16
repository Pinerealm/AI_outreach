import { EmailGenerateResponse, EmailSendResponse } from '../../types';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '../ui/card';
import Button from '../ui/button';

interface EmailPreviewProps {
  email: EmailGenerateResponse | EmailSendResponse;
  onSend?: (email: EmailGenerateResponse) => void;
}

export default function EmailPreview({ email, onSend }: EmailPreviewProps) {
  const isSent = 'engagement_id' in email && 'sent_at' in email;

  // Format the email body for display
  const formatEmailBody = (body: string) => {
    return body.replace(/\n/g, '<br>');
  };

  return (
    <Card className="mt-6">
      <CardHeader>
        <CardTitle>Email Preview</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <p className="font-semibold">To: {email.company_name}</p>
            <p className="font-semibold">Subject: {email.email_subject}</p>
          </div>
          <div className="p-4 border rounded bg-white">
            <div dangerouslySetInnerHTML={{ __html: formatEmailBody(email.email_body) }} />
          </div>
          <div>
            <p className="font-semibold mt-4">Engagement Advice:</p>
            <p>{email.engagement_advice}</p>
          </div>
          {isSent && (
            <div className="text-sm text-gray-500">
              <p>Sent at: {new Date((email as EmailSendResponse).sent_at).toLocaleString()}</p>
              <p>Engagement ID: {(email as EmailSendResponse).engagement_id}</p>
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter className="flex justify-end">
        {!isSent && onSend && (
          <Button onClick={() => onSend(email)}>Send Email</Button>
        )}
      </CardFooter>
    </Card>
  );
}
