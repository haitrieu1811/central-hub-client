import { AxiosError, HttpStatusCode, isAxiosError } from 'axios'
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const isUnprocessableEntityAxiosError = <FormFields>(error: unknown): error is AxiosError<FormFields> => {
  return isAxiosError(error) && error.status === HttpStatusCode.UnprocessableEntity
}
