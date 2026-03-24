import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { postService } from '../services/postService';
import { message } from 'antd';

// Query keys
export const postKeys = {
  all: ['posts'],
  detail: (id) => ['posts', id],
};

// Get all posts
// Get all posts
export const usePosts = () => {
  return useQuery({
    queryKey: postKeys.all,
    queryFn: () => postService.getAll().then(res => res.data.data), // Access the nested data
    staleTime: 5 * 60 * 1000,
  });
};


// Create post mutation
export const useCreatePost = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (data) => postService.create(data),
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: postKeys.all });
      message.success(response.data.message || 'Post created successfully!');
    },
    onError: (error) => {
      message.error(error.response?.data?.message || 'Failed to create post');
    },
  });
};

// Update post mutation
export const useUpdatePost = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ id, data }) => postService.update(id, data),
    onSuccess: (response, variables) => {
      queryClient.invalidateQueries({ queryKey: postKeys.all });
      queryClient.invalidateQueries({ queryKey: postKeys.detail(variables.id) });
      message.success(response.data.message || 'Post updated successfully!');
    },
    onError: (error) => {
      message.error(error.response?.data?.message || 'Failed to update post');
    },
  });
};

// Delete post mutation
export const useDeletePost = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (id) => postService.delete(id),
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: postKeys.all });
      message.success(response.data.message || 'Post deleted successfully!');
    },
    onError: (error) => {
      message.error(error.response?.data?.message || 'Failed to delete post');
    },
  });
};