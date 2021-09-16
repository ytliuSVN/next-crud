// PUT /api/publish/:pid

import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../lib/prisma';

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const postId = req.query.pid;
  const post = await prisma.post.update({
    where: { id: Number(postId) },
    data: { published: true },
  });
  res.json(post);
}
