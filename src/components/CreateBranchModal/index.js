import React, { useState } from 'react';

import { Modal, Typography, Input, Toast, FormGroup } from 'Components/UI';

import api from 'Services/api';

const CreateBranchModal = ({
  onClose,
  repoId,
  onCreateBranch,
  fromBranchValue,
  ...restProps
}) => {
  const [branch, setBranch] = useState('');
  const [fromBranch, setFromBranch] = useState(fromBranchValue || '');
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
        onCreateBranch(branch);
        onClose();
      })
      .catch(err => {
        Toast(err.message, { type: Toast.TYPE.ERROR });
        setLoading(false);
      });
  };

  return (
    <Modal
      header={<Typography weight="bold">Create a branch</Typography>}
      footerProps={{
        okProps: {
          disabled: !branch || !fromBranch,
          loading,
          onClick: onClickOkay,
        },
      }}
      onClose={onClose}
      {...restProps}
    >
      <>
        <FormGroup label="From branch" required disabled={!!fromBranchValue}>
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
