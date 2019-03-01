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
import { ValidatorFn } from '@angular/forms';
import { Observable } from 'rxjs';
import { AdminEditFieldChoice } from './edit-field-choice';
import { AdminEditFieldType } from './edit-field-type';
import { AdminEditFieldSubtype } from './edit-field-subtype';
export interface AdminEditField {
    name: string;
    label: string;
    type: AdminEditFieldType;
    subtype?: AdminEditFieldSubtype;
    validators?: ValidatorFn[];
    readonly?: boolean;
    hidden?: boolean;
    choices?: AdminEditFieldChoice[] | Observable<AdminEditFieldChoice[]>;
}
