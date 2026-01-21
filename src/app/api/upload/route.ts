import { NextRequest, NextResponse } from 'next/server';
import { writeFile } from 'fs/promises';
import { join } from 'path';
import { mkdir } from 'fs/promises';
import { existsSync } from 'fs';
import sharp from 'sharp'; // 这是一个 Node.js 库，用于处理图片，这里用于压缩图片
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// 确保上传目录存在
const uploadDir = join(process.cwd(), 'public', 'uploads');
if (!existsSync(uploadDir)) {
  mkdir(uploadDir, { recursive: true });
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;
    
    if (!file) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
    }

    // 验证文件类型
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json({ error: 'Only image files are allowed' }, { status: 400 });
    }

    // 验证文件大小 (5MB 限制)
    const maxSize = 5 * 1024 * 1024;
    if (file.size > maxSize) {
      return NextResponse.json({ error: 'File size exceeds 5MB limit' }, { status: 400 });
    }

    // 生成唯一文件名
    const timestamp = Date.now();
    const randomString = Math.random().toString(36).substring(2, 8);
    const fileExtension = file.name.split('.').pop();
    const filename = `${timestamp}_${randomString}.${fileExtension}`;
    const filePath = join(uploadDir, filename);

    // 读取文件内容
    const buffer = Buffer.from(await file.arrayBuffer());

    // 使用 sharp 处理图片
    const image = sharp(buffer);
    const metadata = await image.metadata();

    // 保存图片
    await writeFile(filePath, buffer);

    // 构建访问 URL
    const url = `/uploads/${filename}`;

    // 保存到数据库
    const savedImage = await prisma.image.create({
      data: {
        filename,
        path: filePath,
        url,
        size: file.size,
        mimeType: file.type,
        width: metadata.width,
        height: metadata.height,
        description: formData.get('description') as string || undefined,
      },
    });

    return NextResponse.json({
      success: true,
      image: {
        id: savedImage.id,
        filename: savedImage.filename,
        url: savedImage.url,
        size: savedImage.size,
        mimeType: savedImage.mimeType,
        width: savedImage.width,
        height: savedImage.height,
        description: savedImage.description,
        createdAt: savedImage.createdAt,
      },
    });
  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json({ error: 'Failed to upload file' }, { status: 500 });
  }
}

export async function GET() {
  try {
    const images = await prisma.image.findMany({
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json({
      success: true,
      images: images.map(image => ({
        id: image.id,
        filename: image.filename,
        url: image.url,
        size: image.size,
        mimeType: image.mimeType,
        width: image.width,
        height: image.height,
        description: image.description,
        createdAt: image.createdAt,
      })),
    });
  } catch (error) {
    console.error('Get images error:', error);
    return NextResponse.json({ error: 'Failed to get images' }, { status: 500 });
  }
}
