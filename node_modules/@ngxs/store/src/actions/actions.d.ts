import { PlainObject } from '@ngxs/store/internals';
/**
 * Init action
 */
export declare class InitState {
    static get type(): string;
}
/**
 * Update action
 */
export declare class UpdateState {
    addedStates?: PlainObject | undefined;
    static get type(): string;
    constructor(addedStates?: PlainObject | undefined);
}
