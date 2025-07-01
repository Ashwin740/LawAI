import { LegalPageLayout } from "@/components/layout/legal-page-layout";

export default function TermsAndConditionsPage() {
  return (
    <LegalPageLayout title="Terms and Conditions">
      <p>
        Please read these Terms and Conditions ("Terms", "Terms and Conditions") carefully before using the LawAI application (the "Service") operated by us.
      </p>
      <h3 className="font-semibold text-foreground">1. Acceptance of Terms</h3>
      <p>
        By accessing and using our Service, you accept and agree to be bound by the terms and provision of this agreement. In addition, when using these particular services, you shall be subject to any posted guidelines or rules applicable to such services. Any participation in this service will constitute acceptance of this agreement.
      </p>
      <h3 className="font-semibold text-foreground">2. Description of Service</h3>
      <p>
        Our Service provides AI-powered legal assistance, including document summarization, legal research, and document creation. The information provided by the Service is for informational purposes only and does not constitute legal advice.
      </p>
      <h3 className="font-semibold text-foreground">3. User Responsibilities</h3>
      <p>
        You are responsible for your use of the Service and for any content you provide, including compliance with applicable laws, rules, and regulations. You should only provide content that you are comfortable sharing with others. You are responsible for safeguarding your account.
      </p>
      <h3 className="font-semibold text-foreground">4. Limitation of Liability</h3>
      <p>
       The Service is provided "as is," and we make no warranties, express or implied, regarding the accuracy, reliability, or completeness of the information provided. We are not liable for any decisions made based on the information provided by the Service. Always consult with a qualified legal professional for legal matters.
      </p>
       <p>
        We reserve the right to modify these terms from time to time at our sole discretion.
      </p>
    </LegalPageLayout>
  );
}
