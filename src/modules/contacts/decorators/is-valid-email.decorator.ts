import {
    registerDecorator,
    ValidationOptions,
    ValidatorConstraint,
    ValidatorConstraintInterface,
    ValidationArguments,
} from 'class-validator';

@ValidatorConstraint({ async: false })
export class IsValidEmailConstraint implements ValidatorConstraintInterface {
    validate(email: string, args: ValidationArguments) {
        const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (email && pattern.test(email)) {
            return true;
        }
        return false;
    }
}

export function IsValidEmail(validationOptions?: ValidationOptions) {
    return function (object: Object, propertyName: string) {
        registerDecorator({
            name: 'IsValidEmail',
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            validator: IsValidEmailConstraint,
        });
    };
}
