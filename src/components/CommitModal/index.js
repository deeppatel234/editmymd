import React, { useState } from 'react';
import { connect } from 'react-redux';

import { Modal, Typography, TextArea, Avatar } from 'Components/UI';

import Request from 'Services';

import { CommitMessage, CommitTable, CommitMessageWrapper } from './styled';

const CommitModal = ({
  onClose,
  content,
  user,
  branch,
  path,
  repo,
  sha,
  id,
  isNewFile,
  onCommit,
  ...restProps
}) => {
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const onClickCommit = () => {
    setLoading(true);
    debugger
    Request.apiPut({
      url: '/file/commit',
      data: {
        branch,
        path,
        repo,
        message,
        sha,
        content,
        id,
        isNewFile,
      },
    }).then(res => {
      setLoading(false);
      onCommit(res);
      onClose();
      setMessage('');
    });
  };

  const onChangeMessage = event => {
    setMessage(event.target.value);
  };

  return (
    <Modal
      header={<Typography weight="bold">Commit a File</Typography>}
      footerProps={{
        okText: 'Commit',
        okProps: { loading, onClick: onClickCommit },
      }}
      onClose={onClose}
      {...restProps}
    >
      <CommitTable>
        <tbody>
          <tr>
            <td>
              <Typography weight="bold">Repository</Typography>
            </td>
            <td>{repo}</td>
          </tr>
          <tr>
            <td>
              <Typography weight="bold">Branch</Typography>
            </td>
            <td>{branch}</td>
          </tr>
          <tr>
            <td>
              <Typography weight="bold">File</Typography>
            </td>
            <td>{path}</td>
          </tr>
        </tbody>
      </CommitTable>
      <CommitMessageWrapper>
        <Typography weight="bold">Commit Message</Typography>
        <CommitMessage>
          <Avatar alt="profile-picture" size={35} image={user.profilePicture} />
          <TextArea rows="5" value={message} onChange={onChangeMessage} />
        </CommitMessage>
      </CommitMessageWrapper>
    </Modal>
  );
};

const mapStateToProps = state => ({
  user: state.user,
});

export default connect(mapStateToProps)(CommitModal);
