import type { ValidationAcceptor, ValidationChecks } from 'langium';
import type { BahbitBolaAstType, Person } from './generated/ast.js';
import type { BahbitBolaServices } from './bahbit-bola-module.js';

/**
 * Register custom validation checks.
 */
export function registerValidationChecks(services: BahbitBolaServices) {
    const registry = services.validation.ValidationRegistry;
    const validator = services.validation.BahbitBolaValidator;
    const checks: ValidationChecks<BahbitBolaAstType> = {
        Person: validator.checkPersonStartsWithCapital
    };
    registry.register(checks, validator);
}

/**
 * Implementation of custom validations.
 */
export class BahbitBolaValidator {

    checkPersonStartsWithCapital(person: Person, accept: ValidationAcceptor): void {
        if (person.name) {
            const firstChar = person.name.substring(0, 1);
            if (firstChar.toUpperCase() !== firstChar) {
                accept('warning', 'Person name should start with a capital.', { node: person, property: 'name' });
            }
        }
    }

}
