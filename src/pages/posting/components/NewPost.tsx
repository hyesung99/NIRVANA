import { useRef } from 'react';
import { useRecoilValue } from 'recoil';

import postCreateNewPost from '@apis/posting';
import { Button } from '@components/Button';
import { userState } from '@/states/userState';
import { POSTING_DESCRIPTION } from '@pages/posting/constants';
import { PostContainer, StyledTextArea, ButtonContainer } from './NewPost.style';
import { makeFormData, validateContent } from '../utils';

interface NewPostProps {
  channelId: string;
  customToken: string;
}

const NewPost = ({ channelId, customToken }: NewPostProps) => {
  const contentRef = useRef(null);
  const { PLACEHOLDER, UPLOAD } = POSTING_DESCRIPTION;
  
  const handleClickButton = () => {
    if (validateContent(contentRef.current.value)) {
      const formData = makeFormData(contentRef.current.value, channelId);
      postCreateNewPost(customToken, formData);
    }
  }

  return (
    <PostContainer>
      <StyledTextArea ref={contentRef} required maxLength={500} placeholder={PLACEHOLDER} />
      <ButtonContainer>
        <Button
          width={300}
          height={50}
          dark={true}
          label={UPLOAD}
          bold={true}
          fontSize={16}
          borderRadius={10}
          handleClick={handleClickButton}
        />
      </ButtonContainer>
    </PostContainer>
  );
};

export default NewPost;
