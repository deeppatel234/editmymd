import React, { useState } from 'react';

import { Modal, Typography, Input, Toast, FormGroup } from 'Components/UI';

import api from 'Services/api';

const CreateBranchModal = ({
  onClose,
  repoId,
  onBranchSelect,
  ...restProps
}) => {
  const [branch, setBranch] = useState('');
  const [fromBranch, setFromBranch] = useState('');
  const [loading, setLoading] = useState(false);

  const onClickOkay = () => {
    setLoading(true);
    api
      .post({
        url: '/branch/create',
        data: {
          repoId: repoId.toString(),
          branch,
          fromBranch,
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

  return (
    <Modal
      header={<Typography weight="bold">Create a branch</Typography>}
      footerProps={{
        okProps: { disabled: !branch, loading, onClick: onClickOkay },
      }}
      onClose={onClose}
      {...restProps}
    >
      <>
        <FormGroup label="From branch" required>
          {props => (
            <Input
              aria-label="from-branch-name"
              value={fromBranch}
              onChange={e => setFromBranch(e.target.value)}
              {...props}
            />
          )}
        </FormGroup>
        <FormGroup label="Branch Name" required>
          {props => (
            <Input
              aria-label="branch-name"
              value={branch}
              onChange={e => setBranch(e.target.value)}
              {...props}
            />
          )}
        </FormGroup>
      </>
    </Modal>
  );
};

export default CreateBranchModal;
