// DELETE /api/post/:pid

import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const postId = req.query.pid;
  if (req.method === 'DELETE') {
    const post = await prisma.post.delete({
      where: { id: Number(postId) },
    });
    res.json(post);
  } else {
    throw new Error(
      `The HTTP ${req.method} method is not supported at this route`
    );
  }
}
