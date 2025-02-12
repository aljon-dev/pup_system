import type { Actions } from "./$types";


export const actions: Actions = {
    

    userSignUp :async ({locals:{supabase},request}) => {

        try{
        
            const formData = await request.formData();
            const firstname = formData.get('firstName') as string;
            const lastname = formData.get('lastName') as string;
            const studentNumber = formData.get('studentNumber') as string;
            const email = formData.get('email') as string;
            const password = formData.get('password') as string;
            const confirmPassword = formData.get('confirmPassword') as string;
            const documents = formData.get('documents') as File;
            

        const {data:authData, error:authError} = await supabase.auth.signUp({
            email,
            password,

        });

        if(authError){
            return {success:false,error:authError.message}
        }

        const userId = authData.user!.id;

        if(!userId){
            return {success:false,error:'User id not found  after sign up '}
        }

        let documentUrl :string | null = null;
        if(document){
            const {data:storageData, error:insertError} = await supabase.storage
            .from("PDFCOR")
            .upload(`users/${userId}/${documents.name}`,documents)

            if(insertError){
                console.log(insertError.message);
                return { success: false, error: insertError.message };
            }

            documentUrl = supabase.storage.from("PDFCOR").getPublicUrl(storageData.path).data.publicUrl;
     
        }

        const {data:insertUser, error:insertUserError} = await supabase 
        .from('students')
        .insert([
         {



         }
        ])
      

        




        }catch(error){
        console.log(error);
        return {success:false,error, };

        }
    }
    
};