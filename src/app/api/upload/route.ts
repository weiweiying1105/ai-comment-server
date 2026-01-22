import { NextRequest, NextResponse } from 'next/server';
import sharp from 'sharp'; // 这是一个 Node.js 库，用于处理图片，这里用于压缩图片
import { PrismaClient } from '@prisma/client';
import cos from '@/lib/cos';
import { createJsonResponse, ResponseUtil } from '@/lib/response';

// COD 只能在Node 环境跑
export const runtime = 'nodejs';
const BUCKET_NAME = process.env.COS_BUCKET;
const REGION = process.env.COS_REGION;

const prisma = new PrismaClient();


function putObjectToCOS (key:string,body:Buffer){
  return new Promise((resolve, reject) => {
    cos.putObject({
      Bucket: BUCKET_NAME,
      Region: REGION,
      Key: key,
      Body: body,
    }, (err:any, data:any) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
}

export async function POST(req: NextRequest) {
  try {
  const formData = await req.formData();
  const file = formData.get('file') as File;
  if (!file || !(file instanceof File)) {
    return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
  }

  // 读取内容
  const arrayBuffer = await file.arrayBuffer();// 转换为 ArrayBuffer
  const buffer = Buffer.from(arrayBuffer); // 转换为 Buffer
  // 检查图片是否有透明度
  const metadata = await sharp(buffer).metadata();
  const hasAlpha = metadata.hasAlpha || false;

  // 根据是否有透明度选择输出格式
  let compressedBuffer: Buffer;
  let outputExt = file.name.split('.').pop() || 'png';
  
  if (hasAlpha) {
    // 有透明度，保持为 PNG
    compressedBuffer = await sharp(buffer)
      .resize(800, 600) // 调整大小
      .png({ quality: 80 }) // 压缩为 PNG 格式
      .toBuffer();
    outputExt = 'png';
  } else {
    // 无透明度，转为 JPEG 以获得更好的压缩
    compressedBuffer = await sharp(buffer)
      .resize(800, 600) // 调整大小
      .jpeg({ quality: 80 }) // 压缩为 JPEG 格式，质量为 80
      .toBuffer();
    outputExt = 'jpg';
  }

   // 你想存到 COS 里的路径，按你习惯来
    const key = `uploads/${Date.now()}-${Math.random()
      .toString(16)
      .slice(2)}.${outputExt}`;

    const result = await putObjectToCOS(key, compressedBuffer);

    // 你后面小程序 / 前端可以直接用这个 URL
    const url = `https://${BUCKET_NAME}.cos.${REGION}.myqcloud.com/${key}`;

    // 把图片存到数据库
    await prisma.image.create({
      data: {
        key,
        url,
        bucket: BUCKET_NAME || '',
        bizType: 'comment',
      }
    })
    return createJsonResponse(ResponseUtil.success({ url, key }, '上传成功'))
    // return NextResponse.json({data:{
    //   key,
    //   cosLocation: result?.Location || '',
    //   url, 
    // }});

    }catch (error) {
      return NextResponse.json({ error: error?.message || '上传失败' }, { status: 500 });
    }
}