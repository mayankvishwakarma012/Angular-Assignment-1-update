export interface Employee {
    id: number,
    name : String,
    email:String,
    contact: number,
    gender: String,
    skillsAndExpriences :  SkillsAndExpriences[]

}
export interface SkillsAndExpriences{
   skill: String,
   exprience :String
}
