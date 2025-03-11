import { redirect } from "@sveltejs/kit";
import type { PageServerLoad, Actions } from "./$types";


export const load: PageServerLoad = async ({ locals: { supabase } }) => {


    const { data: todos, error: error } = await supabase.from('todo').select("*")

    if (error) {
        console.log(error.message)
    }


    const { data: students, error: errorstudent } = await supabase.from('students').select("*")

    if (errorstudent) {
        console.log(errorstudent.message)
    }


    const { data: studentsRegister, error: errorRegister } = await supabase.from('studentRegistration').select("*")

    if (errorRegister) {
        console.log(errorRegister.message)
    }


    const { data: ExamList, error: ExamlistError } = await supabase.from('exams').select("*")

    if (ExamlistError) {
        console.log(ExamlistError.message)
    }


     const  {data:questionBank, error:bankError} = await supabase.from('question_bank').select("*")

     if(bankError){
        console.log(bankError.message);
     }

    

    return {
        todos,
        students,
        studentsRegister,
        ExamList,
        questionBank,
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


    CreateExam : async ({locals:{supabase},request}) =>{

            const formData = await request.formData();
            const examname =  formData.get('exam_name') as string;
            const examdescription = formData.get('exam_description') as string;
            const duration = Number(formData.get('exam_duration'))
            const examschedule  = new Date(formData.get('exam_schedule') as string)
            const studenttype = formData.get('student_type') as string;
            

            const {error:insertError} = await supabase.from('exams').insert({
                name: examname,
                description: examdescription,
                duration: duration,
                scheduled_at: examschedule,
                student_type:studenttype
            })

            if(insertError){
                console.log(insertError.message)
               
            }else{
                return {
                    status: 200,
                    data: {
                        msg: "Exam Created Successfully",
                        status: 200
                    }
                }
            }
        },

        QuestionBank: async ({ locals: { supabase }, request }) => {
            const formData = await request.formData();
        
            // Extract form data
            const question_text = formData.get('question_text') as string;
            const type = formData.get('type') as 'mcq' | 'true_false' | 'programming';
            const correct_answer = formData.get('correctAnswer') as string;
            const category = formData.get('category') as string | null;
        
            // Prepare the data object based on the question type
            let options = null;
            if (type === 'mcq') {
              options = ['A', 'B', 'C', 'D'].map((letter, index) => ({
                letter,
                value: formData.get(`answer-${index}`) as string,
              }));
            }
        
            // Insert the data into Supabase
            const { data, error } = await supabase
              .from('question_bank')
              .insert([
                {
                  question_text,
                  type,
                  options,
                  correct_answer,
                  category,
                },
              ]);
        
            if (error) {
                console.log(error.message)
              return {
                success: false,
                error: error.message,
              };
            }
        
            return {
              success: true,
            };
          },
        

    SignOut: async ({ locals: { supabase } }) => {

        await supabase.auth.signOut();
        redirect(303, '/')

    }



};