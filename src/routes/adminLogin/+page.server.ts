import { redirect } from '@sveltejs/kit';
import type { Actions } from './$types';

export const actions: Actions = {
  loginAdminUser: async ({ locals: { supabase }, request }) => {
    const formData = await request.formData();

    const emailAdmin = formData.get('email') as string;
    const passwordAdmin = formData.get('password') as string;

    if (!emailAdmin || !passwordAdmin) {
      return {
        status: 400,
        data: { msg: 'Email and password are required' },
      };
    }

    const { data, error } = await supabase.auth.signInWithPassword({
      email: emailAdmin,
      password: passwordAdmin,
    });

    console.log("Supabase Response:", { data, error }); // Debugging

    if (error) {
      return {
        status: 400,
        data: { msg: error.message || 'Invalid email or password' },
      };
    }else{
     
    throw redirect(303, '../admin');
    }



   
  },
};