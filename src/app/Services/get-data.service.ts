import { Injectable, Signal, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class GetDataService {
  private Creddata = signal<any[]>([
    {
      Id: 1,
      awardeddate: '01-06-2025',
      certification: 'wqeqweqweqweqwe',
      city: 'daddasdsa',
      country: 'Australia',
      institution: 'eqeqwqwqwee',
    },
    {
      Id: 4,
      awardeddate: '01-06-2023',
      certification: 'Diploma',
      city: 'Jaipur',
      country: 'Canada',
      expirydate: '26-07-2032',
      institution: 'Zahira',
    },
    {
      Id: 2,
      awardeddate: '01-04-2022',
      certification: 'Dgewwd',
      city: 'Nsklo',
      country: 'Australia',
      expirydate: '26-04-2023',
      institution: 'Shrew',
    },
    {
      Id: 3,
      awardeddate: '01-07-2021',
      certification: 'Master',
      city: 'Colombo',
      country: 'Australia',
      expirydate: '26-06-2020',
      institution: 'Neslo',
    },
  ]);

  private Degdata = signal<any[]>([
    {
      Id: 1,
      completion: 'no',
      country: 'Australia',
      degreetype: 'PHD',
      institution: 'wqeqwe',
      name: 'Lucky',
      startdate: '22-06-2000',
      studymode: 'Hybrid',
      title: 'CSC',
    },
    {
      Id: 2,
      awardeddate: '26-05-2025',
      completion: 'yes',
      country: 'Canada',
      degreetype: 'Diploma',
      enddate: '24-04-2025',
      institution: 'wqeqwe',
      name: 'Karuna',
      startdate: '22-01-2023',
      studymode: 'Online',
      title: 'CSC',
    },
  ]);

  private Empdata = signal<any[]>([
    {
      Id: 1,
      contactcurrent: 'no',
      country: 'Austria',
      email: 'wqw12q@gmail.com',
      employmenttype: 'Part Time',
      iscurrent: 'yes',
      name: 'Jale',
      phone: 5684845164,
      position: 'sdasdas',
      startdate: '01-03-2025',
      enddate: '01-05-2025',
      supervisor: 'sasdasdasd',
    },
    {
      Id: 2,
      contactcurrent: 'no',
      country: 'Austria',
      email: 'asse3q@gmail.com',
      employmenttype: 'Contract',
      iscurrent: 'yes',
      name: 'Kane',
      phone: 5684845164,
      position: 'sdasdas',
      startdate: '01-06-2021',
      enddate: '01-01-2023',
      supervisor: 'sasdasdasd',
    },
    {
      Id: 3,
      contactcurrent: 'no',
      country: 'Austria',
      email: 'r4weerq@gmail.com',
      employmenttype: 'Full Time',
      iscurrent: 'no',
      name: 'Will',
      phone: 5684845164,
      position: 'sdasdas',
      startdate: '12-12-2012',
      enddate: '01-05-2017',
      supervisor: 'sasdasdasd',
    },
  ]);

  private Passdata = signal<any[]>([
    {
      Id: 1,
      agree: 'yes',
      dob: '08-02-1950',
      expiry: '03-06-2025',
      gender: 'Female',
      lastname: 'asdasdasd',
      middlename: 'dsasdasd',
      name: 'ssdasd',
      nationality: 'Austria',
      passport: 2232332323,
    },
    {
      Id: 2,
      agree: 'yes',
      dob: '',
      expiry: '01-01-2016',
      gender: 'Female',
      name: 'Kumari',
      nationality: 'Canada',
      passport: 8579641,
    },
  ]);

  private GoodStanddata = signal<any[]>([
    {
      Id: 1,
      awardeddate: '11-05-2025',
      certification: 'weqwee',
      city: 'Toronto',
      country: 'Canada',
      docnum: 'qwqwqwqw12232',
      expirydate: '',
      institute: 'wdwwqe',
    },
    {
      Id: 2,
      awardeddate: '11-05-2023',
      certification: 'Chacas',
      city: 'Toronto3',
      country: 'Austria',
      docnum: '485712',
      expirydate: '11-05-2021',
      institute: 'Unica',
    },
  ]);

  private countries = signal<Record<string, string>[]>([
    { name: 'Australia' },
    { name: 'Austria' },
    { name: 'Bangaladesh' },
    { name: 'Canada' },
    { name: 'Australia' },
    { name: 'Austria' },
    { name: 'Bangaladesh' },
    { name: 'Canada' },
    { name: 'Australia' },
    { name: 'Austria' },
    { name: 'Bangaladesh' },
    { name: 'Canada' },
    { name: 'Australia' },
    { name: 'Austria' },
    { name: 'Bangaladesh' },
    { name: 'Canada' },
    { name: 'Australia' },
    { name: 'Austria' },
    { name: 'Bangaladesh' },
    { name: 'Canada' },
    { name: 'Australia' },
    { name: 'Austria' },
    { name: 'Bangaladesh' },
    { name: 'Canada' },
    { name: 'Australia' },
    { name: 'Austria' },
    { name: 'Bangaladesh' },
    { name: 'Canada' },
    { name: 'Australia' },
    { name: 'Austria' },
    { name: 'Bangaladesh' },
    { name: 'Canada' },
    { name: 'Australia' },
    { name: 'Austria' },
    { name: 'Bangaladesh' },
    { name: 'Canada' },
    { name: 'Australia' },
    { name: 'Austria' },
    { name: 'Bangaladesh' },
    { name: 'Canada' },
    { name: 'Australia' },
    { name: 'Austria' },
    { name: 'Bangaladesh' },
    { name: 'Canada' },
    { name: 'Australia' },
    { name: 'Austria' },
    { name: 'Bangaladesh' },
    { name: 'Canada' },
  ]);

  private studyMode = signal<Record<string, string>[]>([
    { type: 'Online' },
    { type: 'Distance learning' },
    { type: 'In-Person/classroom learning' },
    { type: 'Full Time' },
    { type: 'Hybrid' },
    { type: 'Affiliation' },
    { type: 'Blended learning' },
    { type: 'Research' },
    { type: 'Open Learning' },
  ]);

  private degreeType = signal<Record<string, string>[]>([
    { type: 'Associate Degree' },
    { type: 'Bachelor' },
    { type: 'Certificate' },
    { type: 'Course' },
    { type: 'Degree type not stated in the qualification' },
    { type: 'Diploma' },
    { type: 'Fellowship' },
    { type: 'Internship' },
    { type: 'Masters' },
    { type: 'Membership' },
    { type: 'PHD' },
    { type: 'Secondary School Certificate' },
    { type: 'Training' },
    { type: 'Training Course' },
  ]);

  private completionOptions = signal<Record<string, string>[]>([
    { label: 'Yes', value: 'yes' },
    { label: 'No', value: 'no' },
  ]);
  private sliderOptions = signal<Record<string, string>[]>([
    { label: 'No', value: 'no' },
    { label: 'Yes', value: 'yes' },
  ]);

  private employmentType = signal<Record<string, string>[]>([
    { type: 'Full Time' },
    { type: 'Part Time' },
    { type: 'Contract' },
  ]);

  private gender = signal<Record<string, string>[]>([
    { type: 'Male' },
    { type: 'Female' },
  ]);

  getCountries(): Record<string, string>[] {
    return this.countries();
  }

  getStudyMode(): Record<string, string>[] {
    return this.studyMode();
  }
  getDegreeType(): Record<string, string>[] {
    return this.degreeType();
  }
  getYesOrNo(): Record<string, string>[] {
    return this.completionOptions();
  }
  getEmploymentType(): Record<string, string>[] {
    return this.employmentType();
  }
  getGender(): Record<string, string>[] {
    return this.gender();
  }
  getSlider(): Record<string, string>[] {
    return this.sliderOptions();
  }

  getCredData(): any[] {
    return this.Creddata();
  }
  getDegData(): any[] {
    return this.Degdata();
  }
  getEmpDate(): any[] {
    return this.Empdata();
  }
  getPassData(): any[] {
    return this.Passdata();
  }
  getGoodStandData(): any[] {
    return this.GoodStanddata();
  }
}
