 

 export type students = {
    id:number,
    user_id:string,
    first_name:string,
    last_name:string,
    student_number:string,
    email:string;

 }


 export type stuentRegistration = {

   id:number,
   user_id:string,
   first_name:string,
   last_name:string,
   midllename:string,
   emailAddress:string,
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