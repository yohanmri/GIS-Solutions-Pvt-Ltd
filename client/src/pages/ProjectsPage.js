
import Navbar from '../components/Navbar';
import ProjectsComponent from '../components/ProjectsComponent';
import Footer from '../components/Footer';
import '@esri/calcite-components/dist/calcite/calcite.css';

export default function ProjectsPage({ setPage }) {
  return (
    <div className="projects-page">
      <Navbar setPage={setPage} activePage="projects" />
      
      <ProjectsComponent />
    <Footer />
    </div>
  );
}