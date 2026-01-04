import { NextRequest, NextResponse } from 'next/server';
import mpesa from '@/lib/mpesa';
import User from '@/lib/models/User';
import dbConnect from '@/lib/mongodb';

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  await dbConnect();
  const { userId } = await req.json();

  const user = await User.findById(userId);
  if (!user || !user.phone) {
    return NextResponse.json({ error: 'User not found or no phone' }, { status: 400 });
  }

  try {
    const response = await mpesa.stkPush({
      amount: 150,
      phone: user.phone,
      accountReference: `SUB-${userId}`,
      transactionDesc: 'Marketplace Subscription',
      callbackUrl: `${process.env.NEXTAUTH_URL}/api/mpesa/callback`,
    });
    return NextResponse.json({ checkoutRequestId: response.CheckoutRequestID });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to initiate payment' }, { status: 500 });
  }
}