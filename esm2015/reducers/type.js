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
/**
 * This function coerces a string into a string literal type.
 * Using tagged union types in TypeScript 2.0, this enables
 * powerful typechecking of our reducers.
 *
 * Since every action label passes through this function it
 * is a good place to ensure all of our action labels
 * are unique.
 */
const typeCache = {};
export function type(label) {
    if (typeCache[label]) {
        throw new Error(`Action type "${label}" is not unqiue"`);
    }
    typeCache[label] = true;
    return label;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHlwZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9jb3JlL3JlZHVjZXJzL3R5cGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FtQkc7QUFFSDs7Ozs7Ozs7R0FRRztBQUNILE1BQU0sU0FBUyxHQUErQixFQUFFLENBQUM7QUFDakQsTUFBTSxVQUFVLElBQUksQ0FBSSxLQUFXO0lBQ2pDLElBQUksU0FBUyxDQUFTLEtBQUssQ0FBQyxFQUFFO1FBQzVCLE1BQU0sSUFBSSxLQUFLLENBQUMsZ0JBQWdCLEtBQUssa0JBQWtCLENBQUMsQ0FBQztLQUMxRDtJQUVELFNBQVMsQ0FBUyxLQUFLLENBQUMsR0FBRyxJQUFJLENBQUM7SUFFaEMsT0FBVSxLQUFLLENBQUM7QUFDbEIsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAoQykgR251Y29vcCBzb2MuIGNvb3AuXG4gKlxuICogVGhpcyBmaWxlIGlzIHBhcnQgb2YgdGhlIEdudWNvb3AgQW5ndWxhciBUb29sa2l0IChnbmd0KS5cbiAqXG4gKiBHbnVjb29wIEFuZ3VsYXIgVG9vbGtpdCAoZ25ndCkgaXMgZnJlZSBzb2Z0d2FyZTogeW91IGNhbiByZWRpc3RyaWJ1dGUgaXQgYW5kL29yIG1vZGlmeVxuICogaXQgdW5kZXIgdGhlIHRlcm1zIG9mIHRoZSBHTlUgR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBhcyBwdWJsaXNoZWQgYnlcbiAqIHRoZSBGcmVlIFNvZnR3YXJlIEZvdW5kYXRpb24sIGVpdGhlciB2ZXJzaW9uIDMgb2YgdGhlIExpY2Vuc2UsIG9yXG4gKiAoYXQgeW91ciBvcHRpb24pIGFueSBsYXRlciB2ZXJzaW9uLlxuICpcbiAqIEdudWNvb3AgQW5ndWxhciBUb29sa2l0IChnbmd0KSBpcyBkaXN0cmlidXRlZCBpbiB0aGUgaG9wZSB0aGF0IGl0IHdpbGwgYmUgdXNlZnVsLFxuICogYnV0IFdJVEhPVVQgQU5ZIFdBUlJBTlRZOyB3aXRob3V0IGV2ZW4gdGhlIGltcGxpZWQgd2FycmFudHkgb2ZcbiAqIE1FUkNIQU5UQUJJTElUWSBvciBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRS4gIFNlZSB0aGVcbiAqIEdOVSBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGZvciBtb3JlIGRldGFpbHMuXG4gKlxuICogWW91IHNob3VsZCBoYXZlIHJlY2VpdmVkIGEgY29weSBvZiB0aGUgR05VIEdlbmVyYWwgUHVibGljIExpY2Vuc2VcbiAqIGFsb25nIHdpdGggR251Y29vcCBBbmd1bGFyIFRvb2xraXQgKGduZ3QpLiAgSWYgbm90LCBzZWUgaHR0cDovL3d3dy5nbnUub3JnL2xpY2Vuc2VzLy5cbiAqXG4gKi9cblxuLyoqXG4gKiBUaGlzIGZ1bmN0aW9uIGNvZXJjZXMgYSBzdHJpbmcgaW50byBhIHN0cmluZyBsaXRlcmFsIHR5cGUuXG4gKiBVc2luZyB0YWdnZWQgdW5pb24gdHlwZXMgaW4gVHlwZVNjcmlwdCAyLjAsIHRoaXMgZW5hYmxlc1xuICogcG93ZXJmdWwgdHlwZWNoZWNraW5nIG9mIG91ciByZWR1Y2Vycy5cbiAqXG4gKiBTaW5jZSBldmVyeSBhY3Rpb24gbGFiZWwgcGFzc2VzIHRocm91Z2ggdGhpcyBmdW5jdGlvbiBpdFxuICogaXMgYSBnb29kIHBsYWNlIHRvIGVuc3VyZSBhbGwgb2Ygb3VyIGFjdGlvbiBsYWJlbHNcbiAqIGFyZSB1bmlxdWUuXG4gKi9cbmNvbnN0IHR5cGVDYWNoZToge1tsYWJlbDogc3RyaW5nXTogYm9vbGVhbn0gPSB7fTtcbmV4cG9ydCBmdW5jdGlvbiB0eXBlPFQ+KGxhYmVsOiBUfCcnKTogVCB7XG4gIGlmICh0eXBlQ2FjaGVbPHN0cmluZz5sYWJlbF0pIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoYEFjdGlvbiB0eXBlIFwiJHtsYWJlbH1cIiBpcyBub3QgdW5xaXVlXCJgKTtcbiAgfVxuXG4gIHR5cGVDYWNoZVs8c3RyaW5nPmxhYmVsXSA9IHRydWU7XG5cbiAgcmV0dXJuIDxUPmxhYmVsO1xufVxuIl19