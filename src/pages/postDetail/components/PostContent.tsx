import { Link, useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { useRef, useState } from 'react';
import { Icon } from '@components/Icon';
import {
  PostContentAvatarContainer,
  PostContentBody,
  PostContentHeader,
  PostContentMenu,
  PostContentMenuIconContainer,
  PostContentSection,
  PostContentTime,
  PostContentUserInfo,
  PostContentUserName,
  PostEditConfirmButtonContainer
} from './PostContent.style';
import { Toast } from '@components/Toast';
import { User } from '@/types/User';
import { deletePost, putPost } from '@apis/posts';
import { UserId, UserName } from '@components/UserText';
import { Avatar } from '@components/Avatar';
import { Button } from '@components/Button';
import { Confirm } from '@components/Confirm';
import { appendFormData, purifyContent } from '@pages/posting/utils';

interface PostContentProps {
  author: User;
  currentUserId: string;
  channelId: string;
  postId: string;
  token: string;
  createdAt: string;
  content: string;
  meditationTime: string;
}

const PostContent = ({
  author,
  currentUserId,
  postId,
  channelId,
  token,
  createdAt,
  content,
  meditationTime
}: PostContentProps) => {
  const [menuOpened, setMenuOpened] = useState(false);
  const [showContentErrorToast, setShowContentErrorToast] = useState(false);
  const [deleteConfirmOpened, setDeleteConfirmOpened] = useState(false);
  const [contentEditMode, setContentEditMode] = useState(false);
  const contentEditRef = useRef(null);

  const handleMenuClick = () => {
    setMenuOpened(!menuOpened);
  };

  const navigate = useNavigate();
  const { mutate: mutateDeletePost, isSuccess: deletePostSuccess } =
    useMutation(deletePost);

  const { mutate: mutatePutPost } = useMutation(putPost);

  if (deletePostSuccess) {
    navigate('/posts');
  }

  const handleEditMenuClick = () => {
    setContentEditMode(true);
    setMenuOpened(false);

    contentEditRef.current?.setAttribute('contenteditable', 'true');
    contentEditRef.current?.focus();
  };

  const handleDeleteMenuClick = () => {
    setMenuOpened(false);
    setDeleteConfirmOpened(true);
  };

  const handleEditCancelClick = () => {
    setContentEditMode(false);
    contentEditRef.current.textContent = content;
    contentEditRef.current?.setAttribute('contenteditable', 'false');
  };

  const handleEditConfirmClick = () => {
    if (contentEditRef.current?.textContent === '') {
      setShowContentErrorToast(true);
    } else {
      setContentEditMode(false);
      contentEditRef.current?.setAttribute('contenteditable', 'false');
      const newCustomTitle = {
        title: purifyContent(contentEditRef.current?.textContent || ''),
        meditationTime
      };
      const newFormData = appendFormData(
        ['title', 'channelId', 'image', 'postId'],
        JSON.stringify(newCustomTitle),
        channelId,
        postId
      );
      mutatePutPost({ postData: newFormData, token });
    }
  };

  const handleConfirmCancelClick = () => {
    setDeleteConfirmOpened(false);
  };

  const handleDeleteConfirmClick = () => {
    setDeleteConfirmOpened(false);
    mutateDeletePost({ postId, token });
  };

  return (
    <>
      {showContentErrorToast && (
        <Toast
          content='게시글의 내용을 입력해주세요.'
          type='WARNING'
        />
      )}
      <PostContentSection>
        <PostContentHeader>
          <PostContentAvatarContainer>
            <Link to={`/profile/${author?._id}`}>
              <Avatar
                src={author?.image}
                alt={author?.fullName}
                size={39}
              />
            </Link>
          </PostContentAvatarContainer>
          <PostContentUserInfo>
            <PostContentUserName>
              <UserName>{author?.fullName}</UserName>
              <UserId email={author ? author.email : ''} />
            </PostContentUserName>
            <PostContentTime>
              {createdAt} / {meditationTime}분
            </PostContentTime>
          </PostContentUserInfo>
          {currentUserId === author?._id && (
            <>
              <PostContentMenuIconContainer
                opened={menuOpened}
                onClick={handleMenuClick}>
                <Icon
                  size={24}
                  name='menu'
                />
              </PostContentMenuIconContainer>
              <PostContentMenu opened={menuOpened}>
                <p onClick={handleDeleteMenuClick}>삭제하기</p>
                <p onClick={handleEditMenuClick}>수정하기</p>
              </PostContentMenu>
            </>
          )}
        </PostContentHeader>
        <PostContentBody ref={contentEditRef}>
          <p>{content}</p>
        </PostContentBody>
        <PostEditConfirmButtonContainer contentEditMode={contentEditMode}>
          <Button
            width={50}
            height={25}
            dark={true}
            fontSize={12}
            label='취소'
            handleClick={handleEditCancelClick}
          />
          <Button
            width={50}
            height={25}
            dark={true}
            fontSize={12}
            label='저장'
            handleClick={handleEditConfirmClick}
          />
        </PostEditConfirmButtonContainer>
        {deleteConfirmOpened && (
          <Confirm
            emoji='❗'
            content='정말 게시글을 삭제하시겠습니까?'
            contentFontSize={14}
            CancelButton={
              <Button
                width={120}
                height={50}
                bold={true}
                dark={false}
                label={'취소'}
                handleClick={handleConfirmCancelClick}
              />
            }
            ConfirmButton={
              <Button
                width={120}
                height={50}
                bold={true}
                dark={true}
                label={'삭제'}
                handleClick={handleDeleteConfirmClick}
              />
            }
          />
        )}
      </PostContentSection>
    </>
  );
};

export default PostContent;
