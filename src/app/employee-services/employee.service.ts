import { Injectable } from '@angular/core';
import { Employee , SkillsAndExpriences} from './employee';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService  {
  public editMode : Boolean = false;
  public employeeDetails : Employee[] = [];

  public editEmployeeDetails !: Employee;
  editAtIndex !: number ;
  employee !: Employee;

  editModeToggle(value : Boolean){
    this.editMode = value
  }
  addEmployee(employee: Employee) {
    this.employeeDetails.push(employee);
  }
  deleteEmployee(employeeId : number){
    this.employeeDetails.splice(employeeId,1);
  }
  editEmployeeGet(employee: Employee , index : number){
    this.editEmployeeDetails = employee;
    this.editAtIndex = index;
  }
  UpdatedEmployee(updatedEmployee : Employee){
    this.employeeDetails[this.editAtIndex] = updatedEmployee;
    console.log('data updated successfully...')

  }
}



