import { ReportForm } from "@/components/report-form";

export default function ReportPage() {
  return (
    <div className="mx-auto max-w-4xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold font-headline md:text-4xl">Community Health Report</h1>
        <p className="mt-2 text-muted-foreground">
          Submit a new report to help monitor the health of our communities. Your contribution is vital.
        </p>
      </div>
      <ReportForm />
    </div>
  );
}
