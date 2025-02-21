import { redirect } from "@sveltejs/kit";
import type { PageServerLoad, Actions } from "./$types";


export const load: PageServerLoad = async ({ locals: { supabase } }) => {


    const { data: todos, error: error } = await supabase.from('todo').select("*")

    if (error) {
        console.log(error.message)
    }


    const { data: students, error: errorstudent } = await supabase.from('students').select("*")

    if (error) {
        console.log(error.message)
    }


    const { data: studentsRegister, error: errorRegister } = await supabase.from('studentRegistration').select("*")

    if (error) {
        console.log(error.message)
    }




    return {
        todos,
        students,
        studentsRegister
    }



};

export const actions: Actions = {


    addTodo: async ({ locals: { supabase }, request }) => {


        const formData = await request.formData();

        const Todo = formData.get('Todo');

        const { error: insertError } = await supabase.from('todo').insert({
            todo: Todo
        })

        if (insertError) {
            console.log(insertError.message)
        }
    },

    Accepted: async ({ locals: { supabase }, request }) => {

        const formData = await request.formData();

        const userid = formData.get('userId');

        const { error: updateError } = await supabase.from("studentRegistration").update({

            status: "approved"

        }).eq('user_id', userid)


        if (updateError) {
            return {
                status: 500,
                data: {
                    msg: updateError.message,
                    status: 500
                }
            }
        }



    },

    Rejected: async ({ locals: { supabase }, request }) => {

        const formData = await request.formData();

        const userid = formData.get('userId');

        const { error: updateError } = await supabase.from("studentRegistration").update({

            status: "rejected"

        }).eq('user_id', userid)


        if (updateError) {
            return {
                status: 500,
                data: {
                    msg: updateError.message,
                    status: 500
                }
            }
        }

    },








    SignOut: async ({ locals: { supabase } }) => {

        await supabase.auth.signOut();
        redirect(303, '/')

    }



};