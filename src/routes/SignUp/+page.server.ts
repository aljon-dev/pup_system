
import { redirect } from "@sveltejs/kit";
import type { Actions,PageServerLoad } from "./$types";



export const load: PageServerLoad = async ({locals:{supabase,user}}) => {

   
};

export const actions: Actions = {
    userSignUp: async ({ locals: { supabase }, request }) => {
        try {
            const formData = await request.formData();
            
            // Log form data for debugging
            console.log('Received form data:', Object.fromEntries(formData));

            const firstname = formData.get('firstName') as string;
            const lastname = formData.get('lastName') as string;
            const studentNumber = formData.get('studentNumber') as string;
            const email = formData.get('email') as string;
            const password = formData.get('password') as string;
        

           
            console.log('First Name:', firstname );
            console.log('Last Name:', lastname);
            console.log('Student Number:', studentNumber);
            console.log('Email:', email);
            console.log('Password:', password);
      

            // Validate form data
            if (!email || !password) {
                return {
                    status: 400,
                    data: {
                        msg: 'Email and password are required',
                        status: 400
                    }
                };
            }

            

            // Create auth user
            const { data: authData, error: authError } = await supabase.auth.signUp({
                email: email,
                password: password
            });

            if (authError) {
                console.error('Auth error:', authError);
                return {
                    status: 500,
                    data: {
                        msg: `Authentication failed: ${authError.message}`,
                        status: 500
                    }
                };
            }

            const userId = authData.user?.id;
            if (!userId) {
                return {
                    status: 400,
                    data: {
                        msg: 'Failed to create user account',
                        status: 400
                    }
                };
            }

            /* Handle document upload
            let documentUrl: string | null = null;
            if (documents) {
                const { data: storageData, error: uploadError } = await supabase.storage
                    .from("PDFCOR")
                    .upload(`documents/${userId}/${documents.name}`, documents, {
                        cacheControl: '3600',
                        upsert: false
                    });

                if (uploadError) {
                    console.error('Upload error:', uploadError);
                    return {
                        status: 500,
                        data: {
                            msg: `Document upload failed: ${uploadError.message}`,
                            status: 500
                        }
                    };
                }

                documentUrl = storageData?.path || null;
            } */

            // Insert into students table
            const { error: insertError } = await supabase
                .from('students')
                .insert({
                    user_id: userId,
                    first_name: firstname,
                    last_name: lastname,
                    student_number: studentNumber,
                    email: email,
                });

            if (insertError) {
                console.error('Insert error:', insertError);
                return {
                    status: 400,
                    data: {
                        msg: `Registration failed: ${insertError.message}`,
                        status: 400
                    }
                };
            }

            return {
                status: 200,
                data: {
                    msg: 'Registration successful',
                    status: 200
                }
            };

        } catch (error) {
            console.error('Server error:', error);
            return {
                status: 400,
                data: {
                    msg: 'Registration failed. Please try again.',
                    status: 400
                }
            };
        }
    }
};