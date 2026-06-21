import { notFound } from "next/navigation";
import { isLocale } from "@/i18n/config";
import { pages } from "@/content/pages";
import { PageShell } from "@/components/layout/page-shell";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return <PageShell locale={locale} content={pages.home} />;
}
