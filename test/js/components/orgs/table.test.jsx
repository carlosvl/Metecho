import { fireEvent } from '@testing-library/react';
import React from 'react';
import { MemoryRouter } from 'react-router-dom';

import OrgsTable from '@/components/orgs/table';
import { createObject } from '@/store/actions';

import { renderWithRedux, storeWithThunk } from './../../utils';

jest.mock('@/store/actions');

createObject.mockReturnValue(() =>
  Promise.resolve({ type: 'TEST', payload: {} }),
);

afterEach(() => {
  createObject.mockClear();
});

const defaultOrgs = {
  Dev: {
    id: 'org-id',
    task: 'task-id',
    org_type: 'Dev',
    owner: 'user-id',
    last_modified_at: '2019-08-16T12:58:53.721Z',
    expires_at: '2019-09-16T12:58:53.721Z',
    latest_commit: '617a51',
    latest_commit_url: '/test/commit/url/',
    url: '/test/org/url/',
    has_changes: true,
  },
  QA: null,
};
const defaultState = {
  user: {
    id: 'user-id',
    valid_token_for: 'sf-org',
    is_devhub_enabled: true,
  },
};

describe('<OrgsTable/>', () => {
  const setup = options => {
    const defaults = {
      initialState: defaultState,
      orgs: defaultOrgs,
    };
    const opts = Object.assign({}, defaults, options);
    const { initialState, orgs } = opts;
    return renderWithRedux(
      <MemoryRouter>
        <OrgsTable orgs={orgs} task="task-id" />
      </MemoryRouter>,
      initialState,
      storeWithThunk,
    );
  };

  describe('owned by current user', () => {
    test('renders table with orgs', () => {
      const { getByText, getByTitle } = setup();

      expect(getByText('View Org')).toBeVisible();
      expect(getByTitle('Has uncaptured changes')).toBeVisible();
      expect(getByTitle('Create New Org')).toBeVisible();
    });
  });

  describe('not owned by current user', () => {
    test('renders table with orgs', () => {
      const orgs = {
        ...defaultOrgs,
        Dev: null,
        QA: {
          ...defaultOrgs.dev,
          org_type: 'QA',
          owner: 'other-user',
          has_changes: false,
        },
      };
      const { queryByText, getByTitle } = setup({ orgs });

      expect(queryByText('View Org')).toBeNull();
      expect(getByTitle('All changes captured')).toBeVisible();
      expect(getByTitle('Create New Org')).toBeVisible();
    });
  });

  describe('create org click', () => {
    test('creates a new org', () => {
      const { getByTitle } = setup();
      fireEvent.click(getByTitle('Create New Org'));

      expect(createObject).toHaveBeenCalledWith({
        objectType: 'scratch_org',
        data: {
          org_type: 'QA',
          task: 'task-id',
        },
      });
    });

    describe('not connected to sf org', () => {
      test('opens connect modal', () => {
        const { getByTitle, getByText } = setup({ initialState: { user: {} } });
        fireEvent.click(getByTitle('Create New Org'));

        expect(createObject).not.toHaveBeenCalled();
        expect(getByText('Use Custom Domain')).toBeVisible();
      });
    });

    describe('dev hub not enabled', () => {
      test('opens warning modal', () => {
        const { getByTitle, getByText } = setup({
          initialState: {
            user: { ...defaultState.user, is_devhub_enabled: false },
          },
        });
        fireEvent.click(getByTitle('Create New Org'));

        expect(createObject).not.toHaveBeenCalled();
        expect(getByText('Enable Dev Hub')).toBeVisible();
      });
    });
  });
});
