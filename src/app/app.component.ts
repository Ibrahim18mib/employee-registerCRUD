import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  DesignationLists: any[] = [];
  RolesLists: any[] = [];
  EmployeeLists: any[] = [];
  isCreateView: boolean = false;

  stepList: any[] = [
    { stepName: 'Basic Details', isComplete: false },
    { stepName: 'Skills', isComplete: false },
    { stepName: 'Experience', isComplete: false },
  ];

  empObject: any = {
    roleId: 0,
    userName: 'mib',
    empCode: '',
    empId: 0,
    empName: '',
    empEmailId: '',
    empDesignationId: 0,
    empContactNo: '',
    empAltContactNo: '',
    empPersonalEmailId: '',
    empExpTotalYear: 0,
    empExpTotalMonth: 0,
    empCity: '',
    empState: '',
    empPinCode: '',
    empAddress: '',
    empPerCity: '',
    empPerState: '',
    empPerPinCode: '',
    empPerAddress: '',
    password: '112233',
    erpEmployeeSkills: [],
    ermEmpExperiences: [],
  };

  empExperienceObj: any = {
    empExpId: 0,
    empId: 0,
    companyName: 'string',
    startDate: '2024-05-10T21:54:16.548Z',
    endDate: '2024-05-10T21:54:16.548Z',
    designation: 'string',
    projectsWorkedOn: 'string',
  };

  constructor(private http: HttpClient) {}
  ngOnInit(): void {
    this.loadRoles();
    this.loadDesignations();
    this.loadEmployees();
  }

  activeStep: any = this.stepList[0];

  stepperCompletionValue: number = 8;

  setActiveStep(stepActive: any) {
    this.activeStep = stepActive;
  }

  addNew() {
    this.isCreateView = true;
  }

  onEdit(id: number) {
    this.http
      .get(
        'https://freeapi.gerasim.in/api/EmployeeApp/GetEmployeeByEmployeeId?id=' +
          id
      )
      .subscribe((res: any) => {
        this.empObject = res.data;
        this.empObject.empId = id;
        console.log('getalledited emp', res.data);
        this.isCreateView = true;
      });
  }

  gotoStep2() {
    const currentStep = this.stepList.find(
      (m) => m.stepName == this.activeStep.stepName
    );
    currentStep.isComplete = true;
    console.log('currenmt', currentStep);
    this.activeStep = this.stepList[1];
    this.stepperCompletionValue = 50;
  }
  gotoStep3() {
    const currentStep = this.stepList.find(
      (m) => m.stepName == this.activeStep.stepName
    );
    currentStep.isComplete = true;
    console.log('currenmt', currentStep);
    this.activeStep = this.stepList[2];
    this.stepperCompletionValue = 100;
  }

  loadEmployees() {
    this.http
      .get('https://freeapi.gerasim.in/api/EmployeeApp/GetAllEmployee')
      .subscribe((res: any) => {
        this.EmployeeLists = res.data;
        console.log('AllEmployees.data', res.data);
      });
  }

  loadDesignations() {
    this.http
      .get('https://freeapi.gerasim.in/api/EmployeeApp/GetAllDesignation')
      .subscribe((res: any) => {
        this.DesignationLists = res.data;
        console.log('designation.data', res.data);
      });
  }

  loadRoles() {
    this.http
      .get('https://freeapi.gerasim.in/api/EmployeeApp/GetAllRoles')
      .subscribe((res: any) => {
        this.RolesLists = res.data;
        console.log('roles.data', res.data);
      });
  }

  addSkills() {
    const skillsObj = {
      empSkillId: 0,
      empId: 0,
      skill: 'string',
      totalYearExp: 0,
      lastVersionUsed: 'string',
    };

    this.empObject.erpEmployeeSkills.unshift(skillsObj);
  }

  addExperience() {
    const expObj = {
      empExpId: 0,
      empId: 0,
      companyName: 'string',
      startDate: '2024-05-10T21:54:16.548Z',
      endDate: '2024-05-10T21:54:16.548Z',
      designation: 'string',
      projectsWorkedOn: 'string',
    };

    this.empObject.ermEmpExperiences.unshift(expObj);
  }

  onDelete(id: number) {
    const isDelete = confirm('Are You sure you want to Delete?');
    if (isDelete) {
      this.http
        .delete(
          'https://freeapi.gerasim.in/api/EmployeeApp/DeleteEmployeeByEmpId?empId=' +
            id
        )
        .subscribe((res: any) => {
          if (res.result) {
            alert('Employee Deleted Successfull');
            this.loadEmployees();
          } else {
            alert(res.message);
          }
        });
    }
  }

  saveEmployee() {
    debugger;
    this.http
      .post(
        'https://freeapi.gerasim.in/api/EmployeeApp/CreateNewEmployee',
        this.empObject
      )
      .subscribe((res: any) => {
        if (res.result) {
          alert('Employee Craeted Successfull');
          this.loadEmployees();
          this.isCreateView = false;
        } else {
          alert(res.message);
        }
      });
  }

  updateEmployee() {
    debugger;
    this.http
      .put(
        'https://freeapi.gerasim.in/api/EmployeeApp/UpdateEmployee',
        this.empObject
      )
      .subscribe((res: any) => {
        if (res.result) {
          alert('Employee Craeted Successfull');
          this.loadEmployees();
          this.isCreateView = false;
        } else {
          alert(res.message);
        }
      });
  }
}
