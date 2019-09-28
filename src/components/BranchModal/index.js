import React, { useState } from 'react';

import { Modal, Typography, Input } from 'Components/UI';

import api from 'Services/api';

const BranchModal = ({ onClose, repoId, onBranchSelect, ...restProps }) => {
  const [branch, setBranch] = useState('');
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
        setLoading(false);
      });
  };

  const onChangeMessage = event => {
    setBranch(event.target.value);
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
        onChange={onChangeMessage}
      />
    </Modal>
  );
};

export default BranchModal;
