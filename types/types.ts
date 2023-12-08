import { ReactNode } from "react";
export type ChildrenProps = {
  children: React.ReactNode;
}

export type IdChildrenProps = {
  id: number;
  children: React.ReactNode;
};

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

export type SubNavLinkType = {
  hrefLink: string,
  label: string
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
export type UpdateCompanyIdType = {
  id: number;
  name: string;
  description: string
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

export type UpdateCompanyProps = {
  id: number,
  company: CompanyType | undefined,
  showModal: boolean,
  toggleModal: () => void,
  disabledFields: boolean,
  setDisabledFields: (status: boolean)=> void,
}

export type IdParamsProps = {
  params: { id: number };
};

export type InvitationType = {
invitations: []
}

export type CompIdsType = {
  companyId: number;
  inviteeId: number | null;
}

export type CompInviteIdsType = {
  companyId: number;
  invitationId: number | null;
}

export type InviteType = {
  invitation: {
    id: number,
    status: string,
    inviter: UserType,
    invitee: UserType
    }
}

export type OneInviteType = {
  invite: {
    id: number,
    status: string,
    inviter: UserType,
    company: CompanyType
  }
}
export type UserInviteIdsType = {
  userId: number | undefined;
  invitationId: number;
}

export type InviteAndIdType = {
  id: number,
  invite: {
    id: number,
    inviter: UserType,
    status: string,
    invitee: UserType
  }
}

export type RequestType = {
requests: []
}

export type UserReqIdsType = {
  companyId: number | null;
  userId: number | undefined;
}

export type ReqIdsType = {
  requestId: number;
  userId: number;
}

export type CompReqIdsType = {
  companyId: number;
  requestId: number | null;
}

export type OneRequestType = {
  request: {
    id: number,
    status: string,
    company: CompanyType
    requester: UserType
  }
}

export type CancelRequestType = {
  request: {
    id: number,
    requester: UserType,
    status: string 
    }
}

export type RequestAndIdType = {
  companyId: number,
  request: {
    id: number,
    status: string,
    company: CompanyType
    requester: UserType
  }
}

export type RemoveMemberProps = {
  id: number,
  showModal: boolean,
  toggleModal: () => void,
  selectedMember: number | null,
}

export type UserLeavesProps = {
  id: number,
  showModal: boolean,
  toggleModal: () => void,
}

export type UserIdsType = {
  companyId: number | null;
  userId: number | undefined;
}

export type DeleteCompanyType = {
  id: number,
  showModal: boolean,
  toggleModal: () => void,
}

export type IdTypes = {
  companyId: number;
  userId: number ;
}

export type CommonModalType = {
  ids: any[],
  showModal: boolean,
  toggleModal: () => void,
  titleText: string,
  handleOnClick: (ids: number[]) => void,
  yesText: string,
  noText: string,
  error: {} | undefined,
}


export type IdTypesAndBody = {
  companyId: number;
  userId: number;
  isAdmin: boolean
}


export type AddAdminType = {
  id: number,
  company: CompanyType | undefined,
  showModal: boolean,
  toggleModal: () => void,
}

export type MemberOrAdminItemType = {
  company: CompanyType,
  memberOrAdmin: UserType,
  selectedUser: number | null | undefined,
  userId: number | undefined,
  deleteMemberOrAdmin: (id: number | null | undefined) => void,
}