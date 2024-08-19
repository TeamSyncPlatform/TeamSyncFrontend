export interface UpdateUserDTO {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  address: string;
  phoneNumber: string;
  department: string;
  jobTitle: string;
  skills: string[];
}
