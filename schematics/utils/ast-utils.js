"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
const ts = require("typescript");
const schematics_1 = require("@angular/cdk/schematics");
const change_1 = require("@schematics/angular/utility/change");
const ast_utils_1 = require("@schematics/angular/utility/ast-utils");
function getSourceFile(host, path) {
    const sourceFile = schematics_1.getSourceFile(host, path);
    if (sourceFile.kind === ts.SyntaxKind.UnparsedSource) {
        return ts.createSourceFile(sourceFile.fileName, sourceFile.text, ts.ScriptTarget.Latest, true);
    }
    return sourceFile;
}
exports.getSourceFile = getSourceFile;
function insertExport(source, fileToEdit, symbolName, fileName, isDefault = false) {
    // @TODO (trik) Cast as any due to incompatible typescript versions
    const rootNode = source;
    const allExports = ast_utils_1.findNodes(rootNode, ts.SyntaxKind.ExportDeclaration);
    // get nodes that map to import statements from the file fileName
    const relevantExports = allExports.filter(node => {
        // StringLiteral of the ImportDeclaration is the export file (fileName in this case).
        const exportFiles = node.getChildren()
            .filter(child => child.kind === ts.SyntaxKind.StringLiteral)
            // @TODO (trik) Cast as any due to incompatible typescript versions
            // .map(n => (n as ts.StringLiteral).text);
            .map(n => n.text);
        return exportFiles.filter(file => file === fileName).length === 1;
    });
    if (relevantExports.length > 0) {
        let exportsAsterisk = false;
        // exports from export file
        const exportNodes = [];
        relevantExports.forEach(n => {
            Array.prototype.push.apply(exportNodes, ast_utils_1.findNodes(n, ts.SyntaxKind.Identifier));
            if (ast_utils_1.findNodes(n, ts.SyntaxKind.AsteriskToken).length > 0) {
                exportsAsterisk = true;
            }
        });
        // if exports * from fileName, don't add symbolName
        if (exportsAsterisk) {
            return new change_1.NoopChange();
        }
        const exportTextNodes = exportNodes.filter((n) => n.text === symbolName);
        // insert export if it's not there
        if (exportTextNodes.length === 0) {
            const iFallbackPos = ast_utils_1.findNodes(relevantExports[0], ts.SyntaxKind.CloseBraceToken)[0].getStart() ||
                ast_utils_1.findNodes(relevantExports[0], ts.SyntaxKind.FromKeyword)[0].getStart();
            // @TODO (trik) Cast as any due to incompatible typescript versions
            return ast_utils_1.insertAfterLastOccurrence(exportNodes, `, ${symbolName}`, fileToEdit, iFallbackPos);
        }
        return new change_1.NoopChange();
    }
    // no such export declaration exists
    const useStrict = ast_utils_1.findNodes(rootNode, ts.SyntaxKind.StringLiteral)
        // @TODO (trik) Cast as any due to incompatible typescript versions
        // .filter((n: ts.StringLiteral) => n.text === 'use strict');
        .filter((n) => n.text === 'use strict');
    let fallbackPos = 0;
    if (useStrict.length > 0) {
        fallbackPos = useStrict[0].end;
    }
    const open = isDefault ? '' : '{ ';
    const close = isDefault ? '' : ' }';
    // if there are no exports or 'use strict' statement, insert export at beginning of file
    const insertAtBeginning = allExports.length === 0 && useStrict.length === 0;
    const separator = insertAtBeginning ? '' : ';\n';
    const toInsert = `${separator}export ${open}${symbolName}${close}` +
        ` from '${fileName}'${insertAtBeginning ? ';\n' : ''}`;
    if (allExports.length === 0) {
        return new change_1.InsertChange(fileToEdit, fallbackPos, toInsert);
    }
    return ast_utils_1.insertAfterLastOccurrence(allExports, toInsert, fileToEdit, fallbackPos, ts.SyntaxKind.StringLiteral);
}
exports.insertExport = insertExport;
function insertImport(source, fileToEdit, symbolName, fileName, isDefault = false) {
    // @TODO (trik) Cast as any due to incompatible typescript versions
    const rootNode = source;
    const allImports = ast_utils_1.findNodes(rootNode, ts.SyntaxKind.ImportDeclaration);
    // get nodes that map to import statements from the file fileName
    const relevantImports = allImports.filter(node => {
        // StringLiteral of the ImportDeclaration is the import file (fileName in this case).
        const importFiles = node.getChildren()
            .filter(child => child.kind === ts.SyntaxKind.StringLiteral)
            // @TODO (trik) Cast as any due to incompatible typescript versions
            // .map(n => (n as ts.StringLiteral).text);
            .map(n => n.text);
        return importFiles.filter(file => file === fileName).length === 1;
    });
    if (relevantImports.length > 0) {
        let importsAsterisk = false;
        // imports from import file
        const importNodes = [];
        relevantImports.forEach(n => {
            Array.prototype.push.apply(importNodes, ast_utils_1.findNodes(n, ts.SyntaxKind.Identifier));
            if (ast_utils_1.findNodes(n, ts.SyntaxKind.AsteriskToken).length > 0) {
                importsAsterisk = true;
            }
        });
        // if imports * from fileName, don't add symbolName
        if (importsAsterisk) {
            return new change_1.NoopChange();
        }
        const importTextNodes = importNodes.filter((n) => n.text === symbolName);
        // insert import if it's not there
        if (importTextNodes.length === 0) {
            const iFallbackPos = ast_utils_1.findNodes(relevantImports[0], ts.SyntaxKind.CloseBraceToken)[0].getStart() ||
                ast_utils_1.findNodes(relevantImports[0], ts.SyntaxKind.FromKeyword)[0].getStart();
            // @TODO (trik) Cast as any due to incompatible typescript versions
            return ast_utils_1.insertAfterLastOccurrence(importNodes, `, ${symbolName}`, fileToEdit, iFallbackPos);
        }
        return new change_1.NoopChange();
    }
    // no such import declaration exists
    const useStrict = ast_utils_1.findNodes(rootNode, ts.SyntaxKind.StringLiteral)
        // @TODO (trik) Cast as any due to incompatible typescript versions
        // .filter((n: ts.StringLiteral) => n.text === 'use strict');
        .filter((n) => n.text === 'use strict');
    let fallbackPos = 0;
    if (useStrict.length > 0) {
        fallbackPos = useStrict[0].end;
    }
    const open = isDefault ? '' : '{ ';
    const close = isDefault ? '' : ' }';
    // if there are no imports or 'use strict' statement, insert import at beginning of file
    const insertAtBeginning = allImports.length === 0 && useStrict.length === 0;
    const separator = insertAtBeginning ? '' : ';\n';
    const toInsert = `${separator}import ${open}${symbolName}${close}` +
        ` from '${fileName}'${insertAtBeginning ? ';\n' : ''}`;
    if (allImports.length === 0) {
        return new change_1.InsertChange(fileToEdit, fallbackPos, toInsert);
    }
    return ast_utils_1.insertAfterLastOccurrence(allImports, toInsert, fileToEdit, fallbackPos, ts.SyntaxKind.StringLiteral);
}
exports.insertImport = insertImport;
function getInterfaceDeclaration(node, name) {
    if (node.kind === ts.SyntaxKind.InterfaceDeclaration) {
        const interfaceDecl = node;
        if (interfaceDecl.name.getText() === name) {
            return interfaceDecl;
        }
    }
    let foundNode = null;
    ts.forEachChild(node, childNode => {
        foundNode = foundNode || getInterfaceDeclaration(childNode, name);
    });
    return foundNode;
}
exports.getInterfaceDeclaration = getInterfaceDeclaration;
function getObjectDeclaration(node, name) {
    if (node.kind === ts.SyntaxKind.VariableDeclaration &&
        node.name.getText() === name &&
        node.initializer &&
        node.initializer.kind === ts.SyntaxKind.ObjectLiteralExpression) {
        return node.initializer;
    }
    let foundNode = null;
    ts.forEachChild(node, childNode => {
        foundNode = foundNode || getObjectDeclaration(childNode, name);
    });
    return foundNode;
}
exports.getObjectDeclaration = getObjectDeclaration;
function getArrayDeclaration(node, name) {
    if (node.kind === ts.SyntaxKind.VariableDeclaration &&
        node.name.getText() === name &&
        node.initializer &&
        node.initializer.kind === ts.SyntaxKind.ArrayLiteralExpression) {
        return node.initializer;
    }
    let foundNode = null;
    ts.forEachChild(node, childNode => {
        foundNode = foundNode || getArrayDeclaration(childNode, name);
    });
    return foundNode;
}
exports.getArrayDeclaration = getArrayDeclaration;
function addPropertyToInterface(source, fileToEdit, interfaceName, property, propertyType) {
    const interfaceDef = getInterfaceDeclaration(source, interfaceName);
    let found = false;
    interfaceDef.members.forEach(m => {
        found = found || m.name.getText() === property;
    });
    if (found) {
        return new change_1.NoopChange();
    }
    const lastMember = interfaceDef.members[interfaceDef.members.length - 1];
    const toInsert = `\n  ${property}: ${propertyType};`;
    return new change_1.InsertChange(fileToEdit, lastMember.end, toInsert);
}
exports.addPropertyToInterface = addPropertyToInterface;
function addPropertyToObject(source, fileToEdit, objectName, property, propertyType) {
    const obj = getObjectDeclaration(source, objectName);
    let found = false;
    obj.properties.forEach(p => {
        found = found || p.name.getText() === property;
    });
    if (found) {
        return new change_1.NoopChange();
    }
    const lastProperty = obj.properties[obj.properties.length - 1];
    const toInsert = `,\n  ${property}: ${propertyType}`;
    return new change_1.InsertChange(fileToEdit, lastProperty.end, toInsert);
}
exports.addPropertyToObject = addPropertyToObject;
function addElementToArray(source, fileToEdit, arrayName, element) {
    const obj = getArrayDeclaration(source, arrayName);
    let found = false;
    obj.elements.forEach(p => {
        found = found || p.getText() === element;
    });
    if (found) {
        return new change_1.NoopChange();
    }
    const lastElement = obj.elements[obj.elements.length - 1];
    const toInsert = `,\n  ${element}`;
    return new change_1.InsertChange(fileToEdit, lastElement.end, toInsert);
}
exports.addElementToArray = addElementToArray;
//# sourceMappingURL=ast-utils.js.map