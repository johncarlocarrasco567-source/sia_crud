import { Table, Button, Space, Popconfirm } from 'antd';
import { EditOutlined, DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import { usePosts, useDeletePost } from '../hooks/usePosts';
import usePostStore from '../stores/usePostStore';

const PostTable = () => {
  const { data: posts, isLoading, error } = usePosts();
  const deleteMutation = useDeletePost();
  const { openModal } = usePostStore();

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      width: 80,
    },
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: 'Content',
      dataIndex: 'content',
      key: 'content',
      ellipsis: true,
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Space>
          <Button 
            icon={<EditOutlined />} 
            onClick={() => openModal('edit', record)}
          >
            Edit
          </Button>
          <Popconfirm
            title="Delete Post"
            description="Are you sure you want to delete this post?"
            onConfirm={() => deleteMutation.mutate(record.id)}
            okText="Yes"
            cancelText="No"
          >
            <Button icon={<DeleteOutlined />} danger>
              Delete
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  if (error) {
    return <div>Error loading posts: {error.message}</div>;
  }

  return (
    <div>
      <Button 
        type="primary" 
        icon={<PlusOutlined />}
        onClick={() => openModal('create')}
        style={{ marginBottom: 16 }}
      >
        Create Post
      </Button>
      
      <Table
        columns={columns}
        dataSource={posts}
        rowKey="id"
        loading={isLoading}
        pagination={{ pageSize: 10 }}
      />
    </div>
  );
};

export default PostTable;