'use client';

import React, { useEffect, useState } from 'react';

interface UploadResponse {
  success: boolean;
  data?: {
    key: string;
    url: string;
  };
  message?: string;
  error?: string;
  code?: number;
}

interface Image {
  id: string;
  url: string;
  key: string;
  bucket: string;
  bizType: string;
  ownerId?: string;
  createdAt: string;
}

interface ImagesResponse {
  success: boolean;
  data?: {
    items: Image[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
  message?: string;
}

const ImageUploadPage: React.FC = () => {
  const [uploading, setUploading] = useState(false);
  const [deleting, setDeleting] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [uploadedImage, setUploadedImage] = useState<{ url: string; key: string } | null>(null);
  const [imgList, setImgList] = useState<Image[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal] = useState(0);
  const [limit] = useState(12);

  // 查询数据库中的图片
  const fetchImgList = async () => {
    try {
      const response = await fetch('/api/images', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          page,
          limit,
        }),
      });
      const data: ImagesResponse = await response.json();
      if (data.success && data.data) {
        setImgList(data.data.items);
        setTotal(data.data.total);
        setTotalPages(data.data.totalPages);
      }
    } catch (err) {
      console.error('查询图片列表失败', err);
    }
  };

  useEffect(() => {
    fetchImgList();
  }, [page]);

  // 上传图片
  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget as HTMLFormElement);
   // 修改后
const fileInput = (e.currentTarget as HTMLFormElement).elements.namedItem('file') as HTMLInputElement;
    
    if (!fileInput?.files?.[0]) {
      setError('请选择文件');
      return;
    }

    try {
      setUploading(true);
      setError(null);
      setSuccess(null);
      setUploadedImage(null);

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      const data: UploadResponse = await response.json();
      console.log(data);
      if (data.code===200 && data.data) {
        setSuccess(data.message || '图片上传成功');
        setUploadedImage({
          url: data.data.url,
          key: data.data.key
        });
        // 重新加载图片列表
        fetchImgList();
        // 重置表单
        (e.currentTarget as HTMLFormElement).reset();
      } else {
        setError(data.error || '上传失败');
      }
    } catch (err) {
      setError('上传失败，请重试');
      console.error(err);
    } finally {
      setUploading(false);
    }
  };

  // 删除图片
  const handleDelete = async (id: string) => {
    if (!confirm('确定要删除这张图片吗？')) {
      return;
    }

    try {
      setDeleting(id);
      setError(null);
      setSuccess(null);

      const response = await fetch('/api/images', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id }),
      });

      const data: UploadResponse = await response.json();
      if (data.success) {
        setSuccess(data.message || '删除成功');
        // 重新加载图片列表
        fetchImgList();
      } else {
        setError(data.error || '删除失败');
      }
    } catch (err) {
      setError('删除失败，请重试');
      console.error(err);
    } finally {
      setDeleting(null);
    }
  };

  // 复制图片地址
  const copyImageUrl = async (url: string) => {
    try {
      await navigator.clipboard.writeText(url);
      setSuccess('图片地址已复制到剪贴板');
      // 3秒后清除成功提示
      setTimeout(() => setSuccess(null), 3000);
    } catch (err) {
      setError('复制失败，请手动复制');
      console.error(err);
    }
  };

  // 格式化日期
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString('zh-CN', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-center text-gray-800">图片管理</h1>

        {/* 消息提示 */}
        {error && (
          <div className="mb-6 p-4 bg-red-100 text-red-700 rounded-lg">
            {error}
          </div>
        )}
        {success && (
          <div className="mb-6 p-4 bg-green-100 text-green-700 rounded-lg">
            {success}
          </div>
        )}

        {/* 上传表单 */}
        <div className="mb-12 bg-white p-6 rounded-xl shadow-md">
          <h2 className="text-xl font-semibold mb-4 text-gray-700">上传图片</h2>
          <form onSubmit={handleUpload} className="space-y-4">
            <div>
              <label htmlFor="file" className="block text-sm font-medium text-gray-700 mb-1">
                选择图片
              </label>
              <input
                type="file"
                id="file"
                name="file"
                accept="image/*"
                className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                required
              />
              <p className="mt-1 text-xs text-gray-500">
                支持 JPEG、PNG、GIF、WebP 格式，最大 5MB
              </p>
            </div>
            <button
              type="submit"
              disabled={uploading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {uploading ? '上传中...' : '上传图片'}
            </button>
          </form>
        </div>

        {/* 上传结果 */}
        {uploadedImage && (
          <div className="mb-12 bg-white p-6 rounded-xl shadow-md">
            <h2 className="text-xl font-semibold mb-4 text-gray-700">上传结果</h2>
            <div className="border border-gray-200 rounded-lg p-4">
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">图片预览</label>
                <div className="bg-gray-100 rounded-lg overflow-hidden">
                  <img
                    src={uploadedImage.url}
                    alt="Uploaded image"
                    className="w-full max-h-64 object-contain"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <div>
                  <label className="block text-sm font-medium text-gray-700">图片链接</label>
                  <div className="relative">
                    <input
                      type="text"
                      value={uploadedImage.url}
                      readOnly
                      className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50 pr-28"
                    />
                    <button
                      onClick={() => copyImageUrl(uploadedImage.url)}
                      className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gray-200 hover:bg-gray-300 text-gray-700 px-3 py-1 rounded-md text-sm"
                    >
                      复制
                    </button>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">文件路径</label>
                  <input
                    type="text"
                    value={uploadedImage.key}
                    readOnly
                    className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 图片列表 */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="flex justify-between items-center px-6 py-4 bg-gray-50 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-700">图片列表</h2>
            <div className="text-sm text-gray-500">
              共 {total} 张图片
            </div>
          </div>
          
          {/* 图片网格 */}
          {imgList.length === 0 ? (
            <div className="px-6 py-16 text-center text-gray-500">
              <p>暂无图片</p>
            </div>
          ) : (
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {imgList.map((image) => (
                  <div key={image.id} className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow">
                    <div className="relative aspect-video bg-gray-100">
                      <img
                        src={image.url}
                        alt={image.key}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-2 right-2 flex space-x-2">
                        <button
                          onClick={() => copyImageUrl(image.url)}
                          className="bg-white/80 hover:bg-white text-gray-700 p-2 rounded-full transition-colors"
                          title="复制图片地址"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                          </svg>
                        </button>
                        <button
                          onClick={() => handleDelete(image.id)}
                          disabled={deleting === image.id}
                          className="bg-red-500/80 hover:bg-red-500 text-white p-2 rounded-full transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                          title="删除图片"
                        >
                          {deleting === image.id ? (
                            <svg className="h-4 w-4 animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                          ) : (
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                          )}
                        </button>
                      </div>
                    </div>
                    <div className="p-4">
                      <div className="mb-2">
                        <div className="text-sm font-medium text-gray-800 truncate">
                          {image.key}
                        </div>
                        <div className="text-xs text-gray-500 mt-1">
                          {formatDate(image.createdAt)}
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="text-xs text-gray-500">
                          {image.bizType}
                        </div>
                        <button
                          onClick={() => copyImageUrl(image.url)}
                          className="text-xs text-blue-600 hover:text-blue-800"
                        >
                          复制链接
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 分页 */}
          {totalPages > 1 && (
            <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex justify-center">
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setPage(Math.max(1, page - 1))}
                  disabled={page === 1}
                  className="px-3 py-1 border border-gray-300 rounded-md text-sm text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  上一页
                </button>
                
                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  const pageNum = i + 1;
                  return (
                    <button
                      key={pageNum}
                      onClick={() => setPage(pageNum)}
                      className={`px-3 py-1 border rounded-md text-sm ${page === pageNum ? 'bg-blue-100 border-blue-300 text-blue-700' : 'border-gray-300 text-gray-700 hover:bg-gray-50'}`}
                    >
                      {pageNum}
                    </button>
                  );
                })}
                
                {totalPages > 5 && (
                  <span className="px-2 text-gray-500">...</span>
                )}
                
                {totalPages > 5 && (
                  <button
                    onClick={() => setPage(totalPages)}
                    className={`px-3 py-1 border rounded-md text-sm ${page === totalPages ? 'bg-blue-100 border-blue-300 text-blue-700' : 'border-gray-300 text-gray-700 hover:bg-gray-50'}`}
                  >
                    {totalPages}
                  </button>
                )}
                
                <button
                  onClick={() => setPage(Math.min(totalPages, page + 1))}
                  disabled={page === totalPages}
                  className="px-3 py-1 border border-gray-300 rounded-md text-sm text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  下一页
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ImageUploadPage;
