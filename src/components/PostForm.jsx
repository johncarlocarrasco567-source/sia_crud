import { Form, Input, Button, Modal, Space } from 'antd'; // Added Space
import { useEffect } from 'react';
import { useCreatePost, useUpdatePost } from '../hooks/usePosts';
import usePostStore from '../stores/usePostStore';

const PostForm = () => {
  const [form] = Form.useForm();
  const { isModalVisible, modalMode, selectedPost, closeModal } = usePostStore();
  const createMutation = useCreatePost();
  const updateMutation = useUpdatePost();

  useEffect(() => {
    if (modalMode === 'edit' && selectedPost) {
      form.setFieldsValue({
        title: selectedPost.title,
        content: selectedPost.content,
      });
    } else {
      form.resetFields();
    }
  }, [modalMode, selectedPost, form]);

  const handleSubmit = async (values) => {
    if (modalMode === 'create') {
      await createMutation.mutateAsync(values);
    } else {
      await updateMutation.mutateAsync({
        id: selectedPost.id,
        data: values,
      });
    }
    closeModal();
    form.resetFields();
  };

  const isLoading = createMutation.isPending || updateMutation.isPending;

  return (
    <Modal
      title={modalMode === 'create' ? 'Create New Post' : 'Edit Post'}
      open={isModalVisible}
      onCancel={closeModal}
      footer={null}
      confirmLoading={isLoading}
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
      >
        <Form.Item
          name="title"
          label="Title"
          rules={[
            { required: true, message: 'Please enter title' },
            { min: 3, message: 'Title must be at least 3 characters' },
          ]}
        >
          <Input placeholder="Enter post title" />
        </Form.Item>

        <Form.Item
          name="content"
          label="Content"
          rules={[
            { required: true, message: 'Please enter content' },
            { min: 10, message: 'Content must be at least 10 characters' },
          ]}
        >
          <Input.TextArea 
            rows={6} 
            placeholder="Enter post content" 
          />
        </Form.Item>

        <Form.Item>
          <Space>
            <Button type="primary" htmlType="submit" loading={isLoading}>
              {modalMode === 'create' ? 'Create' : 'Update'}
            </Button>
            <Button onClick={closeModal}>
              Cancel
            </Button>
          </Space>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default PostForm;