import prisma from "../../../lib/prisma";
import type { NextApiRequest, NextApiResponse } from 'next'
type ResponseData = {
  text: string
}
export default async function handler(req: NextApiRequest, res : NextApiResponse<ResponseData>) {
  const data: any = req.body;
  const postMessageCom = async () => {
     await prisma.Comments.create({
      data: JSON.parse(data),
    });
  };
  const init = async () => {
    await postMessageCom();
  };
  await init();
  res.status(200).json({ text: "success !!" });
}
