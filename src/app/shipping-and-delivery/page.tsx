import { LegalPageLayout } from "@/components/layout/legal-page-layout";

export default function ShippingAndDeliveryPage() {
  return (
    <LegalPageLayout title="Shipping and Delivery Policy">
       <h3 className="font-semibold text-foreground">Digital Service Delivery</h3>
       <p>
        LawAI is a Software-as-a-Service (SaaS) application, and all services are delivered digitally through our web platform.
       </p>
       <p>
        Upon successful registration for a free trial or completion of a Pro subscription payment, access to the LawAI platform and its features is granted immediately. You will be able to log in to your account and start using the services right away.
       </p>
        <p>
            There are no physical products to be shipped, and therefore no shipping costs, delivery times, or physical delivery processes are involved. All you need is an internet connection and a compatible web browser to access our services.
        </p>
    </LegalPageLayout>
  );
}
