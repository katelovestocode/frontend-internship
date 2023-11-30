
import { FormikValues, FormikHelpers } from 'formik';

type UpdateFormikFieldsType = (
  values: Record<string, any>,
    formik: { values: FormikValues } & FormikHelpers<FormikValues>,
    initialValues: Record<string, any> 
) => Partial<FormikValues>;

export const updateFormikFields: UpdateFormikFieldsType = (values, formik, initialValues) =>{

    const updatedFields: Partial<typeof formik.values> = {};

      for (const key in values) {
        if (values[key] !== initialValues[key]) {
          updatedFields[key] = values[key];
        }
      }

        return updatedFields    
 }