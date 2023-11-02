import { ReactNode } from "react";

export type ButtonProps = {
  title: string;
  onClick?: () => void;
}

export type ContainerProps = {
  title: string;
  children: React.ReactNode;
}

export type ModalType = {
  modal_id: string;
  title: string;
  text: string;
  children?: ReactNode;
  handleSubmit?: (event: React.FormEvent<HTMLFormElement>) => void;
};


export type WrapperProps = {
  title: string;
  children: React.ReactNode;
}