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
import * as ts from 'typescript';
import { Tree } from '@angular-devkit/schematics';
import { Change } from '@schematics/angular/utility/change';
export declare function getSourceFile(host: Tree, path: string): ts.SourceFile;
export declare function insertExport(source: ts.SourceFile, fileToEdit: string, symbolName: string, fileName: string, isDefault?: boolean): Change;
export declare function insertImport(source: ts.SourceFile, fileToEdit: string, symbolName: string, fileName: string, isDefault?: boolean): Change;
export declare function getInterfaceDeclaration(node: ts.Node, name: string): ts.InterfaceDeclaration | null;
export declare function getObjectDeclaration(node: ts.Node, name: string): ts.ObjectLiteralExpression | null;
export declare function getArrayDeclaration(node: ts.Node, name: string): ts.ArrayLiteralExpression | null;
export declare function addPropertyToInterface(source: ts.SourceFile, fileToEdit: string, interfaceName: string, property: string, propertyType: string): Change;
export declare function addPropertyToObject(source: ts.SourceFile, fileToEdit: string, objectName: string, property: string, propertyType: string): Change;
export declare function addElementToArray(source: ts.SourceFile, fileToEdit: string, arrayName: string, element: string): Change;
