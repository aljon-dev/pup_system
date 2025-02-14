import { redirect } from "@sveltejs/kit";
import type { Actions } from "./$types";


export const actions: Actions = {
    

    loginUser: async ({locals:{supabase},request}) =>{

        const formData = await request.formData();
        const useremail = formData.get('') as string
        const password = formData.get('') as string

        const {data,error} = await supabase.auth.signInWithPassword({
            email:useremail,
            password:password

        })

        if(error){
            return {
                status:400,
                data:{
                    msg:error.message || 'Auth Error'
                }
            }
        }

        if(data){
            throw redirect(303,'/studentPortal')
        }
        
    
    
       



         


    }
};  