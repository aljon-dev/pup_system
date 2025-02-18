import type { PageServerLoad,Actions } from "./$types";


export const load: PageServerLoad = async ({locals:{supabase}}) => {


    const{data:todos,error:error } = await supabase.from('todo').select("*")

    if(error){
        console.log(error.message)
    }


     return {
            todos
      }


    
};

export const actions: Actions = {


    addTodo: async ({locals:{supabase},request}) => {


        const formData = await request.formData();

        const Todo = formData.get('Todo');
        
        const {error:insertError} = await supabase.from('todo').insert({
                todo:Todo
        })

        if(insertError){
                console.log(insertError.message)
        }



    }
    
};