import DataTable from '@salesforce/design-system-react/components/data-table';
import DataTableColumn from '@salesforce/design-system-react/components/data-table/column';
import Icon from '@salesforce/design-system-react/components/icon';
import i18n from 'i18next';
import React from 'react';

import CollaboratorTableCell from '@/components/projects/table/collaboratorCell';
import DetailTableCell from '@/components/projects/table/detailCell';
import StatusTableCell from '@/components/projects/table/statusCell';
import { Project } from '@/store/projects/reducer';

export interface TableCellProps {
  [key: string]: any;
  item?: Project;
  className?: string;
}

const ProjectTable = ({
  projects,
  repositorySlug,
}: {
  projects: Project[];
  repositorySlug: string;
}) => {
  const items = projects.map((project) => ({
    ...project,
    numCollaborators: project.github_users?.length || 0,
  }));

  return (
    <DataTable items={items} id="repo-projects-table" noRowHover>
      <DataTableColumn
        key="details"
        label={i18n.t('Project')}
        property="name"
        width="100%"
        primaryColumn
      >
        <DetailTableCell repositorySlug={repositorySlug} />
      </DataTableColumn>
      <DataTableColumn
        key="status"
        label={i18n.t('Status')}
        property="status"
        width="0"
      >
        <StatusTableCell />
      </DataTableColumn>
      <DataTableColumn
        key="numCollaborators"
        label={
          <Icon
            category="utility"
            name="user"
            size="xx-small"
            className="slds-m-bottom_xx-small"
            containerClassName="slds-current-color"
            title={i18n.t('Collaborators')}
          />
        }
        property="numCollaborators"
        width="0"
      >
        <CollaboratorTableCell />
      </DataTableColumn>
    </DataTable>
  );
};

export default ProjectTable;
