 

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