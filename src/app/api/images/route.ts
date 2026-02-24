import { PrismaClient } from '@prisma/client';
import { createJsonResponse } from '@/lib/response';


const prisma = new PrismaClient();

export async function POST(req: Request) {
    try {
        const { page, limit } = await req.json();
        const images = await prisma.image.findMany({
            skip: (page - 1) * limit,
            take: limit,
            orderBy: { createdAt: 'desc' },
        });
        const total = await prisma.image.count();
        return createJsonResponse({
            success: true,
            data: {
                items: images,
                total,
                page,
                limit,
                totalPages: Math.ceil(total / limit),
            },
        });
    } catch (error) {
        return createJsonResponse({
            success: false,
            message: '参数错误',
        });
    }
  }

export async function DELETE(req: Request) {
    try {
        const { id } = await req.json();
        if (!id) {
            return createJsonResponse({
                success: false,
                message: '缺少图片ID',
            });
        }
        await prisma.image.delete({
            where: { id },
        });
        return createJsonResponse({
            success: true,
            message: '删除成功',
        });
    } catch (error) {
        return createJsonResponse({
            success: false,
            message: '删除失败',
        });
    }
  }
