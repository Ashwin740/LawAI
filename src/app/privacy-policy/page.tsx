import { LegalPageLayout } from "@/components/layout/legal-page-layout";

export default function PrivacyPolicyPage() {
  const currentDate = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  return (
    <LegalPageLayout title="Privacy Policy">
      <p>
        Your privacy is important to us. It is LawAI's policy to respect your privacy regarding any information we may collect from you across our website, and other sites we own and operate.
      </p>
      <h3 className="font-semibold text-foreground">1. Information We Collect</h3>
      <p>
        We only ask for personal information when we truly need it to provide a service to you. We collect it by fair and lawful means, with your knowledge and consent. We also let you know why we’re collecting it and how it will be used. This includes information you provide upon registration, such as your name and email address, and data related to your usage of our services.
      </p>
      <h3 className="font-semibold text-foreground">2. How We Use Your Information</h3>
      <p>
        We use the information we collect to operate, maintain, and provide the features and functionality of LawAI, to analyze how the service is used, diagnose service or technical problems, maintain security, and personalize content.
      </p>
       <h3 className="font-semibold text-foreground">3. Data Retention</h3>
      <p>
        We only retain collected information for as long as necessary to provide you with your requested service. What data we store, we’ll protect within commercially acceptable means to prevent loss and theft, as well as unauthorized access, disclosure, copying, use or modification.
      </p>
       <h3 className="font-semibold text-foreground">4. Security</h3>
      <p>
        The security of your personal information is important to us, but remember that no method of transmission over the Internet, or method of electronic storage, is 100% secure. While we strive to use commercially acceptable means to protect your personal information, we cannot guarantee its absolute security.
      </p>
      <p>
        This policy is effective as of {currentDate}.
      </p>
    </LegalPageLayout>
  );
}
