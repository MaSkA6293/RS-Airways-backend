import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint({ name: 'IsGenderCorrect', async: false })
export class CustomGenderValidator implements ValidatorConstraintInterface {
  validate(text: string) {
    if (!text) {
      return false;
    }
    const value = text.toLocaleLowerCase();
    return value === 'female' || value === 'male'; // for async validations you must return a Promise<boolean> here
  }

  defaultMessage() {
    // here you can provide default error message if validation failed
    return 'The value of the Gender field must to be Female or Male';
  }
}
