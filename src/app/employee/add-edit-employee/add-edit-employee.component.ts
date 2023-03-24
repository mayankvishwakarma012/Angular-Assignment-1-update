import { SkillsAndExpriences } from '../../employee-services/employee';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Employee } from '../../employee-services/employee';
import { EmployeeService } from '../../employee-services/employee.service';

@Component({
  selector: 'app-add-edit-employee',
  templateUrl: './add-edit-employee.component.html',
  styleUrls: ['./add-edit-employee.component.scss']
})
export class AddEditEmployeeComponent implements OnInit {

  employee !: Employee;
  addEmployee !: FormGroup;

  editMode: Boolean = this.employeeService.editMode;
  editEmployeeGet !: Employee;
  title !: string;

  constructor(public employeeService : EmployeeService , public router : Router) {}

  ngOnInit(): void {

      this.title =" Add Employees ";
        this.addEmployee = new FormGroup({
          employeeId: new FormControl('',Validators.required),
          name: new FormControl('',Validators.required),
          email: new FormControl('',Validators.required),
          contact: new FormControl('',[Validators.required,Validators.minLength(10)]),
          gender: new FormControl('',Validators.required),
          skillsAndExprience: new FormArray([
              new FormGroup({
                  skill: new FormControl('',Validators.required),
                  exprience: new FormControl('',Validators.required)
              })])
          });

          //////////////////////////////////// EDIT - MODE - ON /////////////////////////////////////////////

          if (this.employeeService.editMode ===true ){
            this.title = "Edit Employee"
            const editEmployeeGet = this.employeeService.editEmployeeDetails;//geting details to update and set them to edit employee form
            const skillsAndExpriencesValues = editEmployeeGet.skillsAndExpriences;
            this.skillAndExprienceControls.clear();
            for (let skillsAndExpriencesValue of skillsAndExpriencesValues){
              this.createSkillsAndExpriences();
            }
            this.addEmployee.patchValue({
              employeeId: editEmployeeGet.id,
              name: editEmployeeGet.name,
              email: editEmployeeGet.email,
              contact: editEmployeeGet.contact,
              gender: editEmployeeGet.gender,
              skillsAndExprience : skillsAndExpriencesValues

              });

        }

  }

  //getter function for formcontrols
  get addEmployeeControls(){
    return this.addEmployee.controls ;
  }

  get skillAndExprienceControls(){
    return this.addEmployee.get('skillsAndExprience') as FormArray;
  }
  get skill(){
    return this.skillAndExprienceControls.get('skill');
  }
  get exprience(){
    return this.skillAndExprienceControls.get('exprience');
  }


  // add employee on submit
  onSubmit(){
    const formData = this.addEmployee.value;
    const skills = this.skillAndExprienceControls.value;

      this.employee = {
        id: formData.employeeId ,
        name: formData.name,
        email: formData.email,
        contact: formData.contact,
        gender: formData.gender,
        skillsAndExpriences: skills
      };
      this.employeeService.addEmployee(this.employee);
      this.navigateToEmployeeList()
  }

  // update employee detailes on submit
  onUpdate(){
    const formData = this.addEmployee.value;
    const skills = this.skillAndExprienceControls.value;

      this.employee = {
        id: formData.employeeId ,
        name: formData.name,
        email: formData.email,
        contact: formData.contact,
        gender: formData.gender,
        skillsAndExpriences: skills
      };
    this.employeeService.UpdatedEmployee(this.employee);
    this.navigateToEmployeeList()
  }
  // for navigating to employee list
  navigateToEmployeeList(){
    this.router.navigate(['/employee/list']);
  }

  // functions to create and delete skill fields
  deleteSkillsAndExprience(i : number){
    this.skillAndExprienceControls.removeAt(i);
  }
  createSkillsAndExpriences(){
    this.skillAndExprienceControls.push(
     new FormGroup({
       skill: new FormControl('',Validators.required),
       exprience: new FormControl('',Validators.required)
    })
    );
 }

}
