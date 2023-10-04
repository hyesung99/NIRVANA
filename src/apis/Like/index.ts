import axios from 'axios';
import { API_BASE_URL } from '@constants/Api';
import { Like } from '@/types/Like';
import { axiosInstance } from '@apis/axiosInstanse';
import { END_POINTS } from '@constants/Api';

const postLike = async (postId: string, token: string) => {
  const response = await axios.post<Like>(
    `${API_BASE_URL}/likes/create`,
    { postId },
    {
      headers: {
        Authorization: token
      }
    }
  );
  return response.data;
};

const deleteLike = async (postId: string, token: string) => {
  const response = await axios.delete<Like>(`${API_BASE_URL}/likes/delete`, {
    data: { id: postId },
    headers: {
      Authorization: token
    }
  });
  return response.data;
};

export const advancedPostLike = async(postId: string) => {
  const {data} = await axiosInstance.post<Like>(
    END_POINTS.POST_LIKE,{ postId }
  );
  return data
}

export { postLike, deleteLike };
