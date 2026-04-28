import React, { createContext, useContext, useEffect, useState } from 'react';
import { 
  fetchProjects as fetchProjectsService, 
  createProject as createProjectService, 
  updateProject as updateProjectService, 
  deleteProject as deleteProjectService 
} from '../services/projectsApi';
import { useUser } from './userContext';

const ResourceContext = createContext(null);

export function ResourceProvider({ children }) {
  const { user } = useUser();
  const [projects, setProjects] = useState([]);
  const [projectsLoading, setProjectsLoading] = useState(false);
  const [projectsError, setProjectsError] = useState(null);

  useEffect(() => {
    if (user) {
      loadProjects();
    } else {
      setProjects([]);
    }
  }, [user]);

  async function loadProjects() {
    setProjectsLoading(true);
    setProjectsError(null);
    try {
      console.log('📦 Fetching projects from API...');
      const data = await fetchProjectsService();
      console.log(`✅ Successfully fetched ${data?.length ?? 0} projects:`, data);
      setProjects(data);
    } catch (err) {
      console.error('❌ Failed to load projects from API:', err);
      console.error('   Status:', err?.code, 'Message:', err?.message || err);
      setProjectsError(typeof err === 'string' ? err : (err?.message || JSON.stringify(err)));
    } finally {
      setProjectsLoading(false);
    }
  }

  async function createProject(payload) {
    const newProject = await createProjectService(payload);
    setProjects(prev => [newProject, ...prev]);
    return newProject;
  }

  async function updateProject(id, payload) {
    const updatedProject = await updateProjectService(id, payload);
    setProjects(prev => prev.map(proj => proj.id === id ? updatedProject : proj));
    return updatedProject;
  }

  async function deleteProject(id) {
    await deleteProjectService(id);
    setProjects(prev => prev.filter(proj => proj.id !== id));
  }

  return (
    <ResourceContext.Provider value={{
      projects,
      projectsLoading,
      projectsError,
      loadProjects,
      createProject,
      updateProject,
      deleteProject,
      setProjects
    }}>
      {children}
    </ResourceContext.Provider>
  );
}

export function useResources() {
  const ctx = useContext(ResourceContext);
  if (!ctx) throw new Error('useResources must be used within ResourceProvider');
  return ctx;
}
