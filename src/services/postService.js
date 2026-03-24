import api from '../api/axios';

export const postService = {
  // Get all posts
  getAll: () => api.get('/posts'),
  
  // Get single post
  getById: (id) => api.get(`/posts/${id}`),
  
  // Create post
  create: (data) => api.post('/posts', data),
  
  // Update post
  update: (id, data) => api.put(`/posts/${id}`, data),
  
  // Delete post
  delete: (id) => api.delete(`/posts/${id}`),
};