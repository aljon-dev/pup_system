import type { LayoutServerLoad } from './$types';
import type { Session } from '@supabase/supabase-js'; // Adjust this import based on your auth library

export const load: LayoutServerLoad = async ({ locals: { safeGetSession }, cookies }) => {
  const { session } = await safeGetSession();
  return {
    session,
    cookies: cookies.getAll(),
  };
};