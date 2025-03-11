 

 export type students = {
    id:number,
    user_id:string,
    first_name:string,
    last_name:string,
    student_number:string,
    email:string;

 }


 export type studentRegistration = {

   id:number,
   user_id:string,
   firstname:string,
   lastname:string,
   middlename:string,
   emailAddress:string,
   address:string,
   gender:string,
   status:string,
   Details:{
      COR:string,
      schoolId:string,
      residency:string,
      applyingTo:string,
      studentType:string,
      universities:string,
      contactnumber:string,
      previousProgram:string,
   }
  
 }


 export interface Result {
   output:string
 }

 export interface CodeData {
      action:string,
      result?:Result;
 }

 export interface Question {
   id: number;
   questionText: string;
   type: 'mcq' | 'true_false' | 'programming';
   options: string[];
   selectedAnswer: string;
   category: string;
   language?: string;
   code?: string;
 }
