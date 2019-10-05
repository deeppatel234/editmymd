import React, { useState } from 'react';
import { connect } from 'react-redux';

import {
  Modal,
  Typography,
  TextArea,
  Avatar,
  Toast,
  Button,
} from 'Components/UI';
import CreateBranchModal from 'Components/CreateBranchModal';

import api from 'Services/api';

import { CommitMessage, CommitTable, CommitMessageWrapper } from './styled';

const CommitModal = ({
  onClose,
  content,
  onCommit,
  repository,
  user,
  sha,
  isNewFile,
  onChangeBranch,
  ...restProps
}) => {
  const { path, repoId, name } = repository;
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [showCreateBranchModal, setShowCreateBranchModal] = useState(false);
  const [branch, setBranch] = useState(repository.branch);

  const onClickCommit = () => {
    setLoading(true);
    api
      .put({
        url: '/file/commit',
        data: {
          branch,
          path,
          message,
          sha,
          content,
          repoId: repoId.toString(),
          isNewFile,
        },
      })
      .then(res => {
        setLoading(false);
        Toast('File committed successfully.');
        onCommit(res);
        onClose();
        setMessage('');
      })
      .catch(() => {
        setLoading(false);
        Toast('error in committing a file', { type: Toast.TYPE.ERROR });
      });
  };

  const onCreateBranch = branchName => {
    setBranch(branchName);
    onChangeBranch(branchName);
  };

  return (
    <Modal
      header={<Typography weight="bold">Commit a File</Typography>}
      footerProps={{
        okText: 'Commit',
        okProps: { disabled: !message, loading, onClick: onClickCommit },
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
            <td>{name}</td>
          </tr>
          <tr>
            <td>
              <Typography weight="bold">Branch</Typography>
            </td>
            <td>
              {branch}
              <Button
                textOnly
                color="primary"
                onClick={() => setShowCreateBranchModal(true)}
              >
                Create a new branch
              </Button>
            </td>
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
          <TextArea
            rows="5"
            value={message}
            onChange={e => setMessage(e.target.value)}
          />
        </CommitMessage>
      </CommitMessageWrapper>
      <CreateBranchModal
        onClose={() => setShowCreateBranchModal(false)}
        visible={showCreateBranchModal}
        onCreateBranch={onCreateBranch}
        repoId={repoId}
        fromBranchValue={branch}
      />
    </Modal>
  );
};

const mapStateToProps = state => ({
  user: state.user,
});

export default connect(mapStateToProps)(CommitModal);
