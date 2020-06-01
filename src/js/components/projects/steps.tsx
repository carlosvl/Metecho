import i18n from 'i18next';
import React from 'react';

import Steps from '@/components/steps';
import { Project } from '@/store/projects/reducer';
import { Task } from '@/store/tasks/reducer';

interface ProjectStatusStepsProps {
  tasks: Task[] | [];
  project: Project;
}
const ProjectStatusSteps = ({ tasks, project }: ProjectStatusStepsProps) => {
  const steps = [
    {
      label: `${i18n.t('Create a Task')}`,
      visible: true,
      active: !tasks?.length,
      complete: Boolean(tasks.length), // complete if there are 1+ tasks
      assignee: null, //
    },
    {
      label: `${i18n.t('Add collaborators')}`,
      visible: true,
      active: Boolean(tasks.length),
      complete: Boolean(tasks.length && project.github_users.length), // complete if there are tasks collaborators
      assignee: null, // anyone can add collaborators
    },
    {
      label: `${i18n.t('Merge changes from a task')}`,
      visible: true,
      active: false, // if there is a task with an unmerged commit
      complete: false, // not sure, if the no unmerged commits and
      assignee: null,
    },
    {
      label: `${i18n.t('Submit project for review')}`,
      visible: true,
      active: false,
      complete: false,
      assignee: null,
    },
    {
      label: `${i18n.t('Merge pull request on Github')}`,
      visible: false,
      active: false,
      complete: false,
      assignee: null,
    },
  ];
  return (
    <>
      <Steps steps={steps} />
    </>
  );
};

export default ProjectStatusSteps;
