import { redirect } from "@sveltejs/kit";
import type { Actions, PageServerLoad } from "./$types";
import type { PostgrestSingleResponse } from "@supabase/supabase-js";
import type { students } from "$lib/types";




export const load: PageServerLoad = async ({locals:{supabase,user},request}) => {

    if(user!.id == null){
        throw redirect(303,'/')
    }
       
    const { data:student, error:studentError} = await supabase
        .from('students')
        .select("*")
        .eq('user_id', user!.id) 
        .single() as PostgrestSingleResponse<students>
     

        console.log(student?.first_name)

        return {
            student
        }
    
};

export const actions: Actions = {


    
};