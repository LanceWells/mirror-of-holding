import { getServerSession } from 'next-auth';
import { NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
  const session = await getServerSession();
  console.debug(session);
  
  if (!session) {
    return new Response(
      'Unauthenticated', {
        status: 401,
      }
    );
  }

  if (!session.user) {
    return new Response(
      'Unauthenticated - no user', {
        status: 401,
      }
    );
  }

  if (!session.user.email) {
    return new Response(
      'Unauthenticated - no email', {
        status: 401,
      }
    );
  }
}
