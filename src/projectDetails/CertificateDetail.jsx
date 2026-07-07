import { useParams } from "react-router-dom";
import ProjectCaseLayout from "../components/projects/ProjectCaseLayout";
import { PROJECT_DETAILS_DATA } from "../data/projectDetailsData";

export default function CertificateDetail({ onClose, mode }) {
  const { slug } = useParams();
  const project = PROJECT_DETAILS_DATA[slug];

  if (!project) return null;

  return (
    <ProjectCaseLayout
      project={project}
      onClose={onClose}
      closeLabel={mode === "modal" ? "Close" : "Back to Home"}
      mode={mode}
    />
  );
}
