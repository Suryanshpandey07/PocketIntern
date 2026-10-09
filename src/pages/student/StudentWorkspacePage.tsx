import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';
import { DeliverableWorkspace } from '../../components/projects/DeliverableWorkspace';
import { ArrowLeft, AlertCircle } from 'lucide-react';
import { Button } from '../../components/common/Button';

export const StudentWorkspacePage: React.FC = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const { currentUser } = useAuth();
  const { getProject, getAssignmentByProject } = useData();

  const project = projectId ? getProject(projectId) : undefined;
  const assignment = projectId ? getAssignmentByProject(projectId) : undefined;

  if (!project || !assignment) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center space-y-4">
        <AlertCircle className="w-12 h-12 text-amber-500 mx-auto" />
        <h2 className="text-xl font-bold text-navy-800">Workspace Not Found</h2>
        <p className="text-xs text-slate-500 max-w-sm mx-auto">
          You might not have an active assignment for this project or it was not found.
        </p>
        <Link to="/student/projects">
          <Button variant="accent" size="sm">Back to My Projects</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6 text-left">
      <div className="flex items-center justify-between">
        <Link
          to="/student/projects"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-navy-800 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to My Projects</span>
        </Link>

        <span className="text-xs text-slate-400 font-medium">
          Student Deliverable Workspace
        </span>
      </div>

      <DeliverableWorkspace
        project={project}
        assignment={assignment}
      />
    </div>
  );
};
