import { NextResponse } from 'next/server';
import { getFirebaseConfig } from '@/lib/firebase/server-config';
import { rateLimit } from '@/lib/rate-limit';

export async function GET() {
  try {
    const limiter = await rateLimit.check(10, '1 m');
    
    if (!limiter.success) {
      return new NextResponse('Too Many Requests', {
        status: 429,
        headers: {
          'Retry-After': limiter.reset.toString()
        }
      });
    }

    const config = await getFirebaseConfig();
    return NextResponse.json(config);
  } catch (error: any) {
    return new NextResponse(error.message, { status: 403 });
  }
}
