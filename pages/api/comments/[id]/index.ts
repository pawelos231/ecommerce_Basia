import prisma from "../../../../lib/prisma";
import type { NextApiRequest, NextApiResponse } from 'next'
import userInfo from '../../../../interfaces/interfaces'
type ResponseData = {
  comment: userInfo[]
}
export default async function handler(req: NextApiRequest, res : NextApiResponse<ResponseData>) {
  interface ID  {
    id?: string
  }
  const parsedObject: any = JSON.parse(req.body)
  const pages: number = parsedObject.pages
  const LIMIT: number = 10
  const currentPage: number = parsedObject.currentPage - 1
  console.log(pages, currentPage)
  const id: ID = req.query;
  const comment: userInfo[] = await prisma.Comments.findMany({
    where: { ProductId: id.id },
    skip: currentPage * 10,
    take: LIMIT
  });
  res.status(200).json({ comment});
}
