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
export interface JwtOptions {
    tokenGetter?: () => string | null;
    tokenSetter?: (token: string | null) => void;
    refreshTokenGetter?: () => string | null;
    refreshTokenSetter?: (refreshToken: string | null) => void;
    headerName?: string;
    authScheme?: string;
    whitelistedDomains?: string[];
    blacklistedRoutes?: string[];
    throwNoTokenError?: boolean;
    skipWhenExpired?: boolean;
}
