import { Request, Response } from 'express';

import { Order } from '../../models/Order';

export async function deleteOrder(req: Request, res: Response){
  const { orderId } = req.params;

  await Order.findByIdAndDelete(orderId);

  res.sendStatus(204);
}
