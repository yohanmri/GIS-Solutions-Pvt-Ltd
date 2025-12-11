
import Navbar from '../../components/clientComponents/Navbar';
import ProjectsComponent from '../../components/clientComponents/ProjectsComponent';
import Footer from '../../components/clientComponents/Footer';
import '@esri/calcite-components/dist/calcite/calcite.css';

export default function ProjectsPage() {
  return (
    <div className="projects-page">
      <Navbar activePage="projects" />

      <ProjectsComponent />
      <Footer />
    </div>
  );
}