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
    return value === 'female' || value === 'male';
  }

  defaultMessage() {
    return 'The value of the Gender field must to be Female or Male';
  }
}
