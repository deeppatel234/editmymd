import React, { useState } from 'react';

import { Modal, Typography, Input } from 'Components/UI';

import Request from 'Services';

const BranchModal = ({ onClose, repo, onBranchSelect, ...restProps }) => {
  const [branch, setBranch] = useState('');
  const [loading, setLoading] = useState(false);

  const onClickOkay = () => {
    setLoading(true);
    Request.apiGet({
      url: '/branch/info',
      params: {
        repo,
        branch,
      },
    })
      .then(res => {
        console.log(res);
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
        okProps: { loading, onClick: onClickOkay },
      }}
      onClose={onClose}
      {...restProps}
    >
      <Input value={branch} onChange={onChangeMessage} />
    </Modal>
  );
};

export default BranchModal;