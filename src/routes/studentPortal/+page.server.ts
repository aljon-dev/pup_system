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

     
      const {data:registrationStatus, error:registrationError} = await supabase
         .from('studentRegistration')
         .select("*")
         .eq('user_id', user!.id)
         .single();


   

        return {
            registrationStatus,
            student
        }
    
};

export const actions: Actions = {
    RegisterExam: async ({ locals: { supabase, user }, request }) => {
      if (!user) {
        return {
          status: 401,
          data: { msg: "User not authenticated" },
        };
      }
  
      try {
        const formData = await request.formData();
  
        // Get form data safely
        const selectedType = formData.get("selectedTypes") as string ?? "";
        const firstname = formData.get("firstName") as string ?? "";
        const lastname = formData.get("lastName") as string ?? "";
        const midname = formData.get("middleName") as string ?? "";
        const gender = formData.get("gender") as string ?? "";
        const emailAddress = formData.get("email") as string ?? "";
        const contactnumber = Number(formData.get("contact") ?? 0);
        const address = formData.get("address") as string ?? "";
        const residency = Number(formData.get("residency") ?? 0);
        const universities = formData.get("univerisities") as string ?? "";
        const previousProgram = formData.get("previousprogram") as string ?? "";
        const applying = formData.get("desiredprogram") as string ?? "";
        const COR = formData.get("documents") as File;
        const idpic = formData.get("idpic") as File;
  
        if (!COR || !idpic) {
          return {
            status: 400,
            data: { msg: "Missing required files (COR or ID picture)" },
          };
        }
  
        // Upload COR document
        const { data: storageData, error: uploadError } = await supabase.storage
          .from("PDFCOR")
          .upload(`documents/COR/${COR.name}`, COR, {
            cacheControl: "3600",
            upsert: false,
          });
  
        if (uploadError) {
          console.log("Upload Error:", uploadError.message);
          return {
            status: 500,
            data: { msg: "Failed to upload COR", status: 500 },
          };
        }
  
        // Upload ID picture
        const { data: storageSchoolId, error: errorUpload } = await supabase.storage
          .from("PDFCOR")
          .upload(`schoolId/idpic/${idpic.name}`, idpic, {
            cacheControl: "3600",
            upsert: false,
          });
  
        if (errorUpload) {
          console.log("Upload Error:", errorUpload.message);
          return {
            status: 500,
            data: { msg: "Failed to upload school ID", status: 500 },
          };
        }
  

        const { data: publicUrlData } = supabase.storage
          .from("PDFCOR")
          .getPublicUrl(storageData?.path ?? "");
          
        const publicUrl = publicUrlData.publicUrl;
  
        const { data: publicUrlData1 } = supabase.storage
          .from("PDFCOR")
          .getPublicUrl(storageSchoolId?.path ?? "");

          const publicUrl1 = publicUrlData1.publicUrl;
  
        // Insert into database
        const { error: insertError } = await supabase
          .from("studentRegistration")
          .insert({
            user_id: user.id,
            firstname:firstname,
            lastname:lastname,
            midllename: midname, 
            gender:gender,
            address:address,
            emailAddress:emailAddress,
            status:'pending',
            Details: {
              studentType: selectedType,
              residency,
              universities,
              previousProgram,
              applyingTo: applying,
              contactnumber,
              COR: publicUrl,
              schoolId: publicUrl1, // Fixed incorrect path reference
            },
          });
  
        if (insertError) {
          console.log("Insert Error:", insertError.message);
          return {
            status: 400,
            data: { msg: "Error inserting data" },
          };
        }
  
        return {
          status: 200,
          data: { msg: "Registration successful" },
        };
      } catch (error) {
        console.error("Unexpected Error:", error);
        return {
          status: 500,
          data: { msg: "Internal Server Error" },
        };
      }
    },


    SignOut: async ({ locals: { supabase } }) => {

        await supabase.auth.signOut(); 
        redirect(303,'/')
     
    }


  };
  

    
