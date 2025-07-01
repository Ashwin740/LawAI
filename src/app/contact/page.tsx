import { LegalPageLayout } from "@/components/layout/legal-page-layout";

export default function ContactPage() {
  return (
    <LegalPageLayout title="Contact Us">
        <p>
            We're here to help! If you have any questions about our services, need technical support, or have any other inquiries, please don't hesitate to reach out.
        </p>
        <div>
            <h3 className="font-semibold text-foreground">Support Email</h3>
            <p>
                For all support and general inquiries, please email us at:
                <br />
                <a href="mailto:support@thelawai.xyz" className="text-primary underline">support@thelawai.xyz</a>
            </p>
        </div>
        <div>
            <h3 className="font-semibold text-foreground">Business Hours</h3>
            <p>
                Our support team is available from Monday to Friday, 9:00 AM to 6:00 PM (IST). We aim to respond to all inquiries within 24-48 business hours.
            </p>
        </div>
    </LegalPageLayout>
  );
}
