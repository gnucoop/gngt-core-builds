/**
 * @license
 * Copyright (C) 2018 Gnucoop soc. coop.
 *
 * This file is part of the Gnucoop Angular Toolkit (gngt).
 *
 * Gnucoop Angular Toolkit (gngt) is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * Gnucoop Angular Toolkit (gngt) is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with Gnucoop Angular Toolkit (gngt).  If not, see http://www.gnu.org/licenses/.
 *
 */
import { Action } from '@ngrx/store';
import { Model, ModelListParams, ModelListResult } from '@gngt/core/common';
export interface ModelActionTypes {
    GET: string;
    GET_FAILURE: string;
    GET_SUCCESS: string;
    LIST: string;
    LIST_SUCCESS: string;
    LIST_FAILURE: string;
    CREATE: string;
    CREATE_SUCCESS: string;
    CREATE_FAILURE: string;
    UPDATE: string;
    UPDATE_SUCCESS: string;
    UPDATE_FAILURE: string;
    PATCH: string;
    PATCH_SUCCESS: string;
    PATCH_FAILURE: string;
    DELETE: string;
    DELETE_SUCCESS: string;
    DELETE_FAILURE: string;
    DELETE_ALL: string;
    DELETE_ALL_SUCCESS: string;
    DELETE_ALL_FAILURE: string;
}
export declare function generateModelActionTypes(typeName: string): ModelActionTypes;
export declare abstract class ModelGetAction implements Action {
    payload: {
        id: number;
    };
    abstract type: string;
    constructor(payload: {
        id: number;
    });
}
export declare abstract class ModelGetSuccessAction<T extends Model> implements Action {
    payload: {
        item: T;
    };
    abstract type: string;
    constructor(payload: {
        item: T;
    });
}
export declare abstract class ModelGetFailureAction implements Action {
    payload: {
        error: any;
    };
    abstract type: string;
    constructor(payload: {
        error: any;
    });
}
export declare abstract class ModelListAction implements Action {
    payload: {
        params: ModelListParams;
    };
    abstract type: string;
    constructor(payload: {
        params: ModelListParams;
    });
}
export declare abstract class ModelListSuccessAction<T extends Model> implements Action {
    payload: {
        result: ModelListResult<T>;
    };
    abstract type: string;
    constructor(payload: {
        result: ModelListResult<T>;
    });
}
export declare abstract class ModelListFailureAction implements Action {
    payload: {
        error: any;
    };
    abstract type: string;
    constructor(payload: {
        error: any;
    });
}
export declare abstract class ModelCreateAction<T extends Model> implements Action {
    payload: {
        item: T;
    };
    abstract type: string;
    constructor(payload: {
        item: T;
    });
}
export declare abstract class ModelCreateSuccessAction<T extends Model> implements Action {
    payload: {
        item: T;
    };
    abstract type: string;
    constructor(payload: {
        item: T;
    });
}
export declare abstract class ModelCreateFailureAction implements Action {
    payload: {
        error: any;
    };
    abstract type: string;
    constructor(payload: {
        error: any;
    });
}
export declare abstract class ModelUpdateAction<T extends Model> implements Action {
    payload: {
        item: T;
    };
    abstract type: string;
    constructor(payload: {
        item: T;
    });
}
export declare abstract class ModelUpdateSuccessAction<T extends Model> implements Action {
    payload: {
        item: T;
    };
    abstract type: string;
    constructor(payload: {
        item: T;
    });
}
export declare abstract class ModelUpdateFailureAction implements Action {
    payload: {
        error: any;
    };
    abstract type: string;
    constructor(payload: {
        error: any;
    });
}
export declare abstract class ModelPatchAction<T extends Model> implements Action {
    payload: {
        item: T;
    };
    abstract type: string;
    constructor(payload: {
        item: T;
    });
}
export declare abstract class ModelPatchSuccessAction<T extends Model> implements Action {
    payload: {
        item: T;
    };
    abstract type: string;
    constructor(payload: {
        item: T;
    });
}
export declare abstract class ModelPatchFailureAction implements Action {
    payload: {
        error: any;
    };
    abstract type: string;
    constructor(payload: {
        error: any;
    });
}
export declare abstract class ModelDeleteAction<T extends Model> implements Action {
    payload: {
        item: T;
    };
    abstract type: string;
    constructor(payload: {
        item: T;
    });
}
export declare abstract class ModelDeleteSuccessAction<T extends Model> implements Action {
    payload: {
        item: T;
    };
    abstract type: string;
    constructor(payload: {
        item: T;
    });
}
export declare abstract class ModelDeleteFailureAction implements Action {
    payload: {
        error: any;
    };
    abstract type: string;
    constructor(payload: {
        error: any;
    });
}
export declare abstract class ModelDeleteAllAction<T extends Model> implements Action {
    payload: {
        items: T[];
    };
    abstract type: string;
    constructor(payload: {
        items: T[];
    });
}
export declare abstract class ModelDeleteAllSuccessAction<T extends Model> implements Action {
    payload: {
        items: T[];
    };
    abstract type: string;
    constructor(payload: {
        items: T[];
    });
}
export declare abstract class ModelDeleteAllFailureAction implements Action {
    payload: {
        error: any;
    };
    abstract type: string;
    constructor(payload: {
        error: any;
    });
}
