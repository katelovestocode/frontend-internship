import { ReactNode } from "react";

export type ButtonProps = {
  title: string;
  onClick?: () => void;
}

export type ContainerProps = {
  title: string;
  children: React.ReactNode;
}

export type WrapperProps = {
  title: string;
  children: React.ReactNode;
}

export type IntitalState = {
    value: Counter
}

export type Counter = {
    counter: number
}

export type HealthCheckState = {
  status_code: number;
  detail: string;
  result: string;
};

export type Children = {
  children: React.ReactNode;
};

export type LoginState = {
   email: string; password: string 
}
export type RegisterState = {
  name: string; email: string; password: string 
}

export type InitialState = {
  user: UserType;
  isLoading: boolean;
  isLoggedIn: boolean;
  isRefreshing: boolean;
}

export type UserType = {
  id?: number;
  name: string;
  email: string;
  password?: string;
  accessToken?: string,
  refreshToken?: string,
 
}

export type LoginUserType = {
    user: any;
    data: InitialState
}

export type NavLinkType = {
  hrefLink: string,
  label: string
  setIsSideBarOpen: (status: boolean) => void 
}

export interface CustomError extends Error {
  status?: number;
}

export type RefreshTokenType = {
refreshToken: string 
}

export type GetAllUsersType = {
  users: []
}

export type GetOneUserType = {
  user: {
  id?: number;
  name: string;
  email: string;
  password?: string;
  accessToken?: string,
  refreshToken?: string,
  }
}

export type UpdateUserType = {
  id: number,
  body: {
    name?: string,
    password?: string
  }
}

export type OneUserType = GetOneUserType & {
    id?: number,
}

export type ActiveFieldsType = {
    email: boolean,
    name: boolean,
    password: boolean,
    confirmPassword: boolean,
}

export type IdProps = {
  id: number;
};


export type ListOfUsersItemType =  {
  key?: number,
  user: UserType
}

export type ModalWindowType = {
  children: ReactNode;
  showModal: boolean;
  toggleModal: () => void;
};

export type UpdateFieldsCompanyType = {
  name: string; description: string
}

export type CreateCompanyType = {
  name: string; description: string
}

export type CompanyDetailsType = {
company: CompanyType
}

export type CompanyType = {
    id: number,
    name: string,
    description: string,
    owner: UserType,
    admins: [],
    members: [],
    createdAt: Date,
    updatedAt: Date
}

export type AllCompaniesType = {
  companies: []
}

export type UpdateCompanyType = CompanyDetailsType & {
  id: number,
}