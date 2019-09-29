import React, { useState } from 'react';

import { Modal, Typography, Input } from 'Components/UI';

import { CreateModalWrapper, FileNameInputWrapper } from './styled';

const CreateFileModal = ({
  onClose,
  repository,
  onFileCreate,
  ...restProps
}) => {
  const [fileName, setFileName] = useState('');

  const onClickCreate = () => {
    onFileCreate(`${fileName}.md`);
  };

  const onChangeFileName = event => {
    setFileName(event.target.value);
  };

  return (
    <Modal
      header={<Typography weight="bold">Create a new File</Typography>}
      footerProps={{
        okText: 'Create',
        okProps: { onClick: onClickCreate },
      }}
      onClose={onClose}
      {...restProps}
    >
      <CreateModalWrapper>
        <FileNameInputWrapper>
          <Typography weight="bold">{repository.name} /</Typography>
          <Input value={fileName} onChange={onChangeFileName} />
          <Typography weight="bold">.md</Typography>
        </FileNameInputWrapper>
        <Typography className="filename" weight="bold" color="primary">
          {repository.name}/{fileName}.md
        </Typography>
      </CreateModalWrapper>
    </Modal>
  );
};

export default CreateFileModal;
