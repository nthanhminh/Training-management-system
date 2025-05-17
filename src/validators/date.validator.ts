import { registerDecorator, ValidationOptions } from 'class-validator';

function isValidDateFormat(dateStr: string): boolean {
    const regex = /^(0?[1-9]|[12][0-9]|3[01])\/(0?[1-9]|1[0-2])\/(\d{4})$/;
    if (!regex.test(dateStr)) return false;

    const [day, month, year] = dateStr.split('/').map(Number);
    const date = new Date(year, month - 1, day);

    return date.getFullYear() === year && date.getMonth() === month - 1 && date.getDate() === day;
}

export function IsDateFormatDDMMYYYY(validationOptions?: ValidationOptions) {
    return function (object: any, propertyName: string) {
        registerDecorator({
            name: 'isDateFormatDDMMYYYY',
            target: object.constructor,
            propertyName,
            options: validationOptions,
            validator: {
                validate(value: any) {
                    return typeof value === 'string' && isValidDateFormat(value);
                },
                defaultMessage() {
                    return 'Date must be in format dd/mm/yyyy and be a valid calendar date';
                },
            },
        });
    };
}
