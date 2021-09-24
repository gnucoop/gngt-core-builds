/**
 * @license
 * Copyright (C) Gnucoop soc. coop.
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
import { Model, ModelListParams, ModelListResult, ModelQueryParams } from '@gngt/core/common';
import { ModelError } from './model-error';
import { ModelGenericAction } from './model-generic-action';
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
    QUERY: string;
    QUERY_SUCCESS: string;
    QUERY_FAILURE: string;
}
export declare function generateModelActionTypes(typeName: string): ModelActionTypes;
export declare abstract class ModelBaseAction implements ModelGenericAction {
    payload: any;
    abstract type: string;
    uuid: string;
    constructor(payload: any);
}
export declare abstract class ModelGetAction extends ModelBaseAction {
    payload: {
        id: number;
    };
    constructor(payload: {
        id: number;
    });
}
export declare abstract class ModelGetSuccessAction<T extends Model> extends ModelBaseAction {
    payload: {
        item: T;
    };
    constructor(payload: {
        item: T;
    });
}
export declare abstract class ModelGetFailureAction extends ModelBaseAction {
    payload: {
        error: ModelError;
    };
    constructor(payload: {
        error: ModelError;
    });
}
export declare abstract class ModelListAction extends ModelBaseAction {
    payload: {
        params: ModelListParams;
    };
    constructor(payload: {
        params: ModelListParams;
    });
}
export declare abstract class ModelListSuccessAction<T extends Model> extends ModelBaseAction {
    payload: {
        result: ModelListResult<T>;
    };
    constructor(payload: {
        result: ModelListResult<T>;
    });
}
export declare abstract class ModelListFailureAction extends ModelBaseAction {
    payload: {
        error: ModelError;
    };
    constructor(payload: {
        error: ModelError;
    });
}
export declare abstract class ModelCreateAction<T extends Model> extends ModelBaseAction {
    payload: {
        item: T;
    };
    constructor(payload: {
        item: T;
    });
}
export declare abstract class ModelCreateSuccessAction<T extends Model> extends ModelBaseAction {
    payload: {
        item: T;
    };
    constructor(payload: {
        item: T;
    });
}
export declare abstract class ModelCreateFailureAction extends ModelBaseAction {
    payload: {
        error: ModelError;
    };
    constructor(payload: {
        error: ModelError;
    });
}
export declare abstract class ModelUpdateAction<T extends Model> extends ModelBaseAction {
    payload: {
        item: T;
    };
    constructor(payload: {
        item: T;
    });
}
export declare abstract class ModelUpdateSuccessAction<T extends Model> extends ModelBaseAction {
    payload: {
        item: T;
    };
    constructor(payload: {
        item: T;
    });
}
export declare abstract class ModelUpdateFailureAction extends ModelBaseAction {
    payload: {
        error: ModelError;
    };
    constructor(payload: {
        error: ModelError;
    });
}
export declare abstract class ModelPatchAction<T extends Model> extends ModelBaseAction {
    payload: {
        item: T;
    };
    constructor(payload: {
        item: T;
    });
}
export declare abstract class ModelPatchSuccessAction<T extends Model> extends ModelBaseAction {
    payload: {
        item: T;
    };
    constructor(payload: {
        item: T;
    });
}
export declare abstract class ModelPatchFailureAction extends ModelBaseAction {
    payload: {
        error: ModelError;
    };
    constructor(payload: {
        error: ModelError;
    });
}
export declare abstract class ModelDeleteAction<T extends Model> extends ModelBaseAction {
    payload: {
        item: T;
    };
    constructor(payload: {
        item: T;
    });
}
export declare abstract class ModelDeleteSuccessAction<T extends Model> extends ModelBaseAction {
    payload: {
        item: T;
    };
    constructor(payload: {
        item: T;
    });
}
export declare abstract class ModelDeleteFailureAction extends ModelBaseAction {
    payload: {
        error: ModelError;
    };
    constructor(payload: {
        error: ModelError;
    });
}
export declare abstract class ModelDeleteAllAction<T extends Model> extends ModelBaseAction {
    payload: {
        items: T[];
    };
    constructor(payload: {
        items: T[];
    });
}
export declare abstract class ModelDeleteAllSuccessAction<T extends Model> extends ModelBaseAction {
    payload: {
        items: T[];
    };
    constructor(payload: {
        items: T[];
    });
}
export declare abstract class ModelDeleteAllFailureAction extends ModelBaseAction {
    payload: {
        error: ModelError;
    };
    constructor(payload: {
        error: ModelError;
    });
}
export declare abstract class ModelQueryAction extends ModelBaseAction {
    payload: {
        params: ModelQueryParams;
    };
    constructor(payload: {
        params: ModelQueryParams;
    });
}
export declare abstract class ModelQuerySuccessAction<T extends Model> extends ModelBaseAction {
    payload: {
        result: ModelListResult<T>;
    };
    constructor(payload: {
        result: ModelListResult<T>;
    });
}
export declare abstract class ModelQueryFailureAction extends ModelBaseAction {
    payload: {
        error: ModelError;
    };
    constructor(payload: {
        error: ModelError;
    });
}
