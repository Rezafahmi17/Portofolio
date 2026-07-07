import { lazy } from "react";
import { PROJECT_META_BY_SLUG } from "../data/projectMeta";

const CertificateDetail = lazy(() => import("./CertificateDetail"));

export function getProjectRouteConfig(slug) {
  const metadata = PROJECT_META_BY_SLUG[slug];
  if (!metadata) return null;

  return {
    ...metadata,
    Component: CertificateDetail,
  };
}
