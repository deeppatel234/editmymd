import React, { useState } from 'react';

import { Modal, Typography, Input, Toast, Button } from 'Components/UI';
import CreateBranchModal from 'Components/CreateBranchModal';
import api from 'Services/api';

import { RightButton } from './styled';

const BranchModal = ({ onClose, repoId, onBranchSelect, ...restProps }) => {
  const [branch, setBranch] = useState('');
  const [showCreateBranchModal, setShowCreateBranchModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const onClickOkay = () => {
    setLoading(true);
    api
      .get({
        url: '/branch/info',
        params: {
          repoId,
          branch,
        },
      })
      .then(() => {
        setLoading(false);
        onBranchSelect(branch);
        onClose();
      })
      .catch(() => {
        Toast('branch not found', { type: Toast.TYPE.ERROR });
        setLoading(false);
      });
  };

  const onCreateBranch = branchName => {
    onBranchSelect(branchName);
    onClose();
  };

  return (
    <Modal
      header={<Typography weight="bold">Select a branch</Typography>}
      footerProps={{
        okProps: { disabled: !branch, loading, onClick: onClickOkay },
      }}
      onClose={onClose}
      {...restProps}
    >
      <Input
        aria-label="branch-name"
        value={branch}
        onChange={e => setBranch(e.target.value)}
      />
      <RightButton>
        <Button
          textOnly
          color="primary"
          onClick={() => setShowCreateBranchModal(true)}
        >
          Create a new branch
        </Button>
      </RightButton>
      <CreateBranchModal
        onClose={() => setShowCreateBranchModal(false)}
        visible={showCreateBranchModal}
        onCreateBranch={onCreateBranch}
        repoId={repoId}
      />
    </Modal>
  );
};

export default BranchModal;
