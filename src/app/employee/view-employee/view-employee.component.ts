import { EmployeeService } from 'src/app/employee-services/employee.service';
import { Employee, SkillsAndExpriences } from 'src/app/employee-services/employee';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-view-employee',
  templateUrl: './view-employee.component.html',
  styleUrls: ['./view-employee.component.scss']
})
export class ViewEmployeeComponent implements OnInit {
  constructor(public employeeService : EmployeeService){}

  ngOnInit(): void {}

  getEmployees = this.employeeService.employeeDetails;

  skill !: SkillsAndExpriences;
  employee !: Employee;


  showConfirmation = false;
  employeeIdToDelete !: number;// to store the index of employee
  employeeNameToDelete !: String;

  showSuccess = false;
  successMessage !: string;

// delete function for deleting employee from list and displaye alert
  deleteEmployee(employeeId : number, employeeName : String){
    this.employeeIdToDelete = employeeId;
    this.employeeNameToDelete = employeeName;
    this.showConfirmation = true;
  }
  confirmDelete(): void {
    this.showSuccess = true;
    this.employeeService.deleteEmployee(this.employeeIdToDelete);
    this.showConfirmation = false;
    this.successMessage = `The Employee ${this.employeeNameToDelete} is deleted successfully.`;
    setTimeout(() => {
      this.showSuccess = false;
      this.successMessage = '';
    }, 2000);


  }
  cancelDelete(): void {
    this.showConfirmation = false;
    this.employeeIdToDelete = -1;
    this.employeeNameToDelete = '';
  }

// get details to update
  editEmployee(i : number){
    const user : Employee = this.employeeService.employeeDetails[i];
    this.employeeService.editEmployeeGet(user,i);
  }

  showEmployee(){
    return (this.getEmployees)
  }

}
;
