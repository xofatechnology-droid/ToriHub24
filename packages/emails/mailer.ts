// packages/emails/mailer.ts
import { SESClient, SendEmailCommand } from "@aws-sdk/client-ses";

// Initialize the AWS SES Client
const sesClient = new SESClient({
  region: process.env.AWS_REGION || "us-east-1",
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID as string,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY as string,
  },
});

interface SendEmailParams {
  to: string;
  subject: string;
  htmlBody: string;
}

export const sendEmail = async ({ to, subject, htmlBody }: SendEmailParams) => {
  const command = new SendEmailCommand({
    Source: process.env.AWS_SES_VERIFIED_SENDER, // Must be verified in AWS console
    Destination: {
      ToAddresses: [to],
    },
    Message: {
      Subject: { Data: subject, Charset: "UTF-8" },
      Body: {
        Html: { Data: htmlBody, Charset: "UTF-8" },
      },
    },
  });

  try {
    const response = await sesClient.send(command);
    return { success: true, messageId: response.MessageId };
  } catch (error) {
    console.error("AWS SES Error:", error);
    return { success: false, error };
  }
};