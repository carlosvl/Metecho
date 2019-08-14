import Avatar from '@salesforce/design-system-react/components/avatar';
import Button from '@salesforce/design-system-react/components/button';
import Icon from '@salesforce/design-system-react/components/icon';
import Popover from '@salesforce/design-system-react/components/popover';
import Tooltip from '@salesforce/design-system-react/components/tooltip';
import i18n from 'i18next';
import React, { useCallback, useState } from 'react';
import { Trans } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

import ConnectModal from '@/components/user/connect';
import Logout from '@/components/user/logout';
import { ExternalLink } from '@/components/utils';
import { User } from '@/store/user/reducer';
import { selectUserState } from '@/store/user/selectors';

const ConnectToSalesforce = ({
  toggleModal,
}: {
  toggleModal: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const openConnectModal = () => {
    toggleModal(true);
  };

  return (
    <>
      <Button
        label={i18n.t('Connect to Salesforce')}
        className="slds-text-heading_small"
        variant="link"
        onClick={openConnectModal}
      />
      <Tooltip
        content={i18n.t(
          'Connection to a Salesforce org with Dev Hub enabled is required to create a new Dev or QA scratch org.',
        )}
        variant="learnMore"
        position="overflowBoundaryElement"
        align="top right"
        triggerClassName="slds-p-left_x-small"
      >
        <a>
          <Icon
            category="utility"
            name="info"
            assistiveText={{
              label: i18n.t('Learn More'),
            }}
            size="xx-small"
            className="slds-m-bottom_xx-small"
          />
        </a>
      </Tooltip>
    </>
  );
};

const ConnectionInfo = ({ user }: { user: User }) => {
  const dispatch = useDispatch();
  // @@@ make these work
  const doDisconnect = useCallback(() => {
    dispatch({ type: 'disconnect' });
  }, [dispatch]);
  const doRefreshConnection = useCallback(() => {
    dispatch({ type: 'refresh' });
  }, [dispatch]);

  return (
    <>
      <Icon category="utility" name="connected_apps" size="small" />
      <span className="slds-p-left_small slds-text-heading_small">
        {i18n.t('Connected to Salesforce')}
      </span>
      {!user.is_devhub_enabled && (
        <p className="slds-text-body_small slds-m-top_x-small">
          <Icon
            assistiveText={{ label: i18n.t('Error') }}
            category="utility"
            name="error"
            colorVariant="error"
            size="x-small"
            className="slds-m-bottom_xxx-small"
            containerClassName="slds-m-right_xx-small"
          />
          <Trans i18nKey="devHubNotEnabled">
            This Salesforce org does not have Dev Hub enabled. Learn how to{' '}
            <ExternalLink url="https://help.salesforce.com/articleView?id=sfdx_setup_enable_devhub.htm&type=0">
              enable Dev Hub
            </ExternalLink>
            .
          </Trans>
        </p>
      )}
      <ul className="slds-m-top_small">
        <li>
          <strong>{i18n.t('Dev Hub')}:</strong>{' '}
          {user.is_devhub_enabled ? (
            <span className="slds-text-color_success">{i18n.t('Enabled')}</span>
          ) : (
            <>
              <span className="slds-text-color_error">
                {i18n.t('Not Enabled')}
              </span>
              {' | '}
              <Button
                label={i18n.t('Check Again')}
                variant="link"
                onClick={doRefreshConnection}
              />
            </>
          )}
        </li>
        {user.username && (
          <li>
            <strong>{i18n.t('User')}:</strong> {user.username}
          </li>
        )}
        {user.org_name && (
          <li>
            <strong>{i18n.t('Org')}:</strong> {user.org_name}
          </li>
        )}
        {user.org_type && (
          <li>
            <strong>{i18n.t('Type')}:</strong> {user.org_type}
          </li>
        )}
      </ul>
      <Button
        label={i18n.t('Disconnect from Salesforce')}
        variant="link"
        className="slds-m-top_small"
        onClick={doDisconnect}
      />
    </>
  );
};

const UserInfo = () => {
  const user = useSelector(selectUserState);
  const [modalOpen, setModalOpen] = useState(false);

  return user ? (
    <>
      <Popover
        align="bottom right"
        heading={
          <div className="slds-p-around_small">
            <Icon category="utility" name="user" size="small" />
            <span className="slds-p-left_small">{user.username}</span>
            <div className="slds-m-left_large slds-p-left_small">
              <Logout className="slds-text-body_regular" />
            </div>
          </div>
        }
        body={
          <div className="slds-p-around_small">
            {user.valid_token_for ? (
              <ConnectionInfo user={user} />
            ) : (
              <ConnectToSalesforce toggleModal={setModalOpen} />
            )}
          </div>
        }
        hasNoCloseButton
      >
        <Button variant="icon">
          <Avatar />
        </Button>
      </Popover>
      <ConnectModal isOpen={modalOpen} toggleModal={setModalOpen} />
    </>
  ) : null;
};

export default UserInfo;
