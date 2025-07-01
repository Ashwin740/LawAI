import { LegalPageLayout } from "@/components/layout/legal-page-layout";

export default function CancellationAndRefundPage() {
  return (
    <LegalPageLayout title="Cancellation and Refund Policy">
        <h3 className="font-semibold text-foreground">1. Trial Period</h3>
        <p>
            LawAI offers a 14-day free trial for new users. You can explore the full features of our platform during this period without any charge. No cancellation is necessary if you choose not to subscribe after the trial.
        </p>

        <h3 className="font-semibold text-foreground">2. Subscription Cancellation</h3>
        <p>
            For users on a "Pro" plan, you can cancel your subscription at any time. Your subscription will remain active until the end of the current billing cycle, and you will not be charged for the next cycle. To cancel, please navigate to your account settings or contact our support team.
        </p>
        
        <h3 className="font-semibold text-foreground">3. Refund Policy</h3>
        <p>
            Due to the nature of our digital services, we generally do not offer refunds for subscription fees once a billing cycle has commenced. However, we understand that exceptional circumstances can occur.
        </p>
        <p>
            Refund requests will be considered on a case-by-case basis at our sole discretion. To request a refund, please contact our support team at support@lawai.com with your account details and the reason for your request. We will review your request and notify you of the outcome within 5-7 business days.
        </p>
    </LegalPageLayout>
  );
}
