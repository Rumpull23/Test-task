export declare class UpdateFormStatus {
    payload: {
        status: string | null;
        path: string;
    };
    static get type(): string;
    constructor(payload: {
        status: string | null;
        path: string;
    });
}
export declare class UpdateFormValue {
    payload: {
        value: any;
        path: string;
        propertyPath?: string;
    };
    static get type(): string;
    constructor(payload: {
        value: any;
        path: string;
        propertyPath?: string;
    });
}
export declare class UpdateForm {
    payload: {
        value: any;
        errors: {
            [k: string]: string;
        } | null;
        dirty: boolean | null;
        status: string | null;
        path: string;
    };
    static get type(): string;
    constructor(payload: {
        value: any;
        errors: {
            [k: string]: string;
        } | null;
        dirty: boolean | null;
        status: string | null;
        path: string;
    });
}
export declare class UpdateFormDirty {
    payload: {
        dirty: boolean | null;
        path: string;
    };
    static get type(): string;
    constructor(payload: {
        dirty: boolean | null;
        path: string;
    });
}
export declare class SetFormDirty {
    payload: string;
    static get type(): string;
    constructor(payload: string);
}
export declare class SetFormPristine {
    payload: string;
    static get type(): string;
    constructor(payload: string);
}
export declare class UpdateFormErrors {
    payload: {
        errors: {
            [k: string]: string;
        } | null;
        path: string;
    };
    static get type(): string;
    constructor(payload: {
        errors: {
            [k: string]: string;
        } | null;
        path: string;
    });
}
export declare class SetFormDisabled {
    payload: string;
    static get type(): string;
    constructor(payload: string);
}
export declare class SetFormEnabled {
    payload: string;
    static get type(): string;
    constructor(payload: string);
}
export declare class ResetForm {
    payload: {
        path: string;
        value?: any;
    };
    static get type(): string;
    constructor(payload: {
        path: string;
        value?: any;
    });
}
