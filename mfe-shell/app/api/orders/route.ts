import { NextRequest, NextResponse } from 'next/server';
import { createOrder, getOrdersForUser } from '@/lib/orderStore';

export async function GET(req: NextRequest) {
  const userId = req.nextUrl.searchParams.get('userId');
  if (!userId) {
    return NextResponse.json({ error: 'userId required' }, { status: 400 });
  }
  const orders = await getOrdersForUser(userId);
  return NextResponse.json(orders);
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { userId, items, total } = body;
  if (!userId || !items) {
    return NextResponse.json({ error: 'bad request' }, { status: 400 });
  }
  const order = await createOrder({ userId, items, total: total || 0 });
  return NextResponse.json(order);
}
