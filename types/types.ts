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
  isError: boolean
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

export type IdAndCompanyProps = {
  id: number;
  company: CompanyType
};

export type ListOfUsersItemType =  {
  key?: number,
  user: UserType
}

export type ModalWindowType = {
  children: ReactNode;
  showModal: boolean;
  toggleModal: () => void;
  minWidth?: string;
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
  selectedUser: number | null,
  userId: number | undefined,
  deleteMemberOrAdmin: (id: number) => void,
}

export type UpdateFieldsQuizType = {
  title: string; description: string; frequencyInDays: number
}

export type MyFormValues = {
  title: string;
  description: string;
  frequencyInDays: number | null;
  questions: {
    question: string;
    answers: string[];
    correctAnswer: string;
  }[];
}

export type AddQuestionType = {
  quizId: number,
  companyId: number,
  addedQuestion: boolean,
  setAddedQuestion: (state: boolean) => void,
  showModal: boolean,
}

export type AddQuestionReqProps = {
  quizId: number,
  companyId: number,
  question?: string,
  answers?: string[],
  correctAnswer?: string,
}

export type QuestionsType = {
  id: number;
  question: string;
  answers: string[];
  correctAnswer: string;
}

export type QuestionsWithNoIDType = {
  question: string;
  answers: string[];
  correctAnswer: string;
}

export type CreateQuizType = {
  companyId: number,
  title: string,
  description: string,
  frequencyInDays: number | null,
  questions: QuestionsWithNoIDType[],
}

export type QuizType = {
  id: number
  title: string,
  description: string,
  frequencyInDays: number | null,
  questions: QuestionsType[],
}

export type QuizAndCompIdType = {
  companyId: number,
  quiz: QuizType
}

export type UpdateQuizType = {
  id: number,
  quiz: QuizType,
  showModal: boolean,
  toggleModal: () => void,
  disabledFields: boolean,
  setDisabledFields: (state: boolean) => void,
}

export type UpdateQuizBodyType = {
  quizId: number,
  companyId: number,
  title?: string,
  description?: string,
  frequencyInDays?: number | null,
}

export type UpdateFormikType = {
  title: string,
  description: string,
  frequencyInDays: number | null,
}

export type DeleteQuestReqType = {
  questionId: number,
  quizId: number,
  companyId: number,
}
export type AllQuestionsType = {
  id: number,
  question: string;
  answers: string[];
  correctAnswer: string;
  index: number
}

export type GetAllQuizzesType = {
  quizzes: []
}

export type QuizIdAndCompIdType = {
  companyId: number,
  quizId: number
}

export type GetOneQuizType = {
   quiz: QuizType
}

export type DeleteQuizResType = {
  quiz: number
}

export type AddQuestionResType = {
  question: QuizType
}

export type DeleteQuestResType = {
  question: number
}

export type UpdateQuestResponse = {
  question: {
  question: string;
  answers: string[];
  correctAnswer: string;}
}
export type UpdateQuestReqType = {
  questionId: number,
  quizId: number,
  companyId: number,
  question?: string;
  answers?: string[];
  correctAnswer?: string;
}

export type UpdateQuestType = {
  id: number,
  quizId: number,
  questionId: number,
  question: {question: string;
  answers: string[];
  correctAnswer: string;},
  setQuestionDisabledFields: (state: boolean) => void,
  questionDisabledFields: boolean,
  handleEditClick: (index: number) => void,
  index:number
}

export type EditButtonType = {
  toggleActiveState: (state: string | null) => void;
  field: string | null;
  isActive: boolean;
};

export type ChildComponentProps = {
  company: CompanyType | null;
};

export type QuizAttemptType = {
  userId: number,
  quizId: number,
  questions: {
        answer: string,
        id: number | null,
      }[] | undefined
}

export type QuizAttemptResType = {
quiz: {company: CompanyType,
quiz: QuizType,
user: UserType
id: number,
questionResponses: [],
timestamp: Date,
overallRatingAcrossSystem: number,
averageScoreWithinCompany: number,
totalCorrect: number,
totalQuestions: number,}
}

export type GetUserRatingType = {
averageRating: number,
userId: number,
userName: string
}

export type UserAllQuizAttemptsType = {
  analytics: {
    quizAttemptId: number,
    quizAvarage: number,
    quizTime: Date,
    userId: number,
    userName: string
  }[]
}

export type UserAndQuizIdsTypes = {
  quizId: number;
  userId: number ;
}

export type LineChartType = {
  data: { analytics: {
    quizAttemptId: number,
    quizAvarage: number,
    quizTime: Date,
    userId: number,
    userName: string
  }[]}
  name: string;
}

export type FilterQuizAttemptsType = {
quizAttempts: {averageScoreWithinCompany: number, 
id: number,
overallRatingAcrossSystem: number,
questionResponses: QuestionsType,
quiz: QuizType,
totalCorrect: number}[]
}

export type AttemptType = {
 quizAttemptId: number;
 quizAvarage: number;
 quizTime: Date;
 userId: number;
 userName: string;     
}