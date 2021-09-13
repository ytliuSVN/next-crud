import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/client';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { title, content } = req.body;

  const session = await getSession({ req });
  const result = await prisma.post.create({
    data: {
      title: title,
      content: content,
      author: {
        connect: {
          email: session?.user.email,
        },
      },
    },
  });
  res.json(result);
}
