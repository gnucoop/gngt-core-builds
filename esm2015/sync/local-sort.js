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
import { getObjectProperty } from '@gngt/core/common';
export function localSort(docs, sort) {
    const sortDirs = {};
    const sortKeys = sort.map(s => {
        if (typeof s === 'string') {
            sortDirs[s] = 'asc';
            return s;
        }
        const keys = Object.keys(s);
        if (keys.length === 1) {
            sortDirs[keys[0]] = s[keys[0]];
            return keys[0];
        }
        return null;
    })
        .filter(k => k != null);
    if (docs.length === 0 || sortKeys.length === 0) {
        return docs;
    }
    const doc = docs[0];
    const isAsc = sortDirs[0] === 'asc';
    const sortTypes = {};
    sortKeys.forEach(key => {
        sortTypes[key] = typeof getObjectProperty(doc, key);
    });
    const sortReduce = (obj) => {
        return (key, cur) => {
            const field = getObjectProperty(obj, cur);
            if (sortTypes[cur] === 'number') {
                let fieldPad = `00000000000000000000${field}`;
                return `${key}${fieldPad.substr(fieldPad.length - 20)}`;
            }
            return `${key}${field}`;
        };
    };
    return docs.sort((a, b) => {
        const first = isAsc ? a : b;
        const second = isAsc ? b : a;
        const firstKey = sortKeys.reduce(sortReduce(first), '');
        const lastKey = sortKeys.reduce(sortReduce(second), '');
        return firstKey.localeCompare(lastKey);
    });
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9jYWwtc29ydC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9jb3JlL3N5bmMvbG9jYWwtc29ydC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQW1CRztBQUVILE9BQU8sRUFBQyxpQkFBaUIsRUFBQyxNQUFNLG1CQUFtQixDQUFDO0FBRXBELE1BQU0sVUFBVSxTQUFTLENBQ3JCLElBQXdDLEVBQ3hDLElBQWdEO0lBQ2xELE1BQU0sUUFBUSxHQUFHLEVBQXFDLENBQUM7SUFDdkQsTUFBTSxRQUFRLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRTtRQUNQLElBQUksT0FBTyxDQUFDLEtBQUssUUFBUSxFQUFFO1lBQ3pCLFFBQVEsQ0FBQyxDQUFDLENBQUMsR0FBRyxLQUFLLENBQUM7WUFDcEIsT0FBTyxDQUFDLENBQUM7U0FDVjtRQUNELE1BQU0sSUFBSSxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDNUIsSUFBSSxJQUFJLENBQUMsTUFBTSxLQUFLLENBQUMsRUFBRTtZQUNyQixRQUFRLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQy9CLE9BQU8sSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO1NBQ2hCO1FBQ0QsT0FBTyxJQUFJLENBQUM7SUFDZCxDQUFDLENBQUM7U0FDRCxNQUFNLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLElBQUksSUFBSSxDQUFhLENBQUM7SUFDekQsSUFBSSxJQUFJLENBQUMsTUFBTSxLQUFLLENBQUMsSUFBSSxRQUFRLENBQUMsTUFBTSxLQUFLLENBQUMsRUFBRTtRQUM5QyxPQUFPLElBQUksQ0FBQztLQUNiO0lBQ0QsTUFBTSxHQUFHLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ3BCLE1BQU0sS0FBSyxHQUFHLFFBQVEsQ0FBQyxDQUFDLENBQUMsS0FBSyxLQUFLLENBQUM7SUFDcEMsTUFBTSxTQUFTLEdBQUcsRUFBNkIsQ0FBQztJQUNoRCxRQUFRLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxFQUFFO1FBQ3JCLFNBQVMsQ0FBQyxHQUFHLENBQUMsR0FBRyxPQUFPLGlCQUFpQixDQUFDLEdBQUcsRUFBRSxHQUFHLENBQUMsQ0FBQztJQUN0RCxDQUFDLENBQUMsQ0FBQztJQUNILE1BQU0sVUFBVSxHQUFHLENBQ2YsR0FBcUMsRUFDbkMsRUFBRTtRQUNOLE9BQU8sQ0FBQyxHQUFXLEVBQUUsR0FBVyxFQUFFLEVBQUU7WUFDbEMsTUFBTSxLQUFLLEdBQUcsaUJBQWlCLENBQUMsR0FBRyxFQUFFLEdBQUcsQ0FBQyxDQUFDO1lBQzFDLElBQUksU0FBUyxDQUFDLEdBQUcsQ0FBQyxLQUFLLFFBQVEsRUFBRTtnQkFDL0IsSUFBSSxRQUFRLEdBQUcsdUJBQXVCLEtBQUssRUFBRSxDQUFDO2dCQUM5QyxPQUFPLEdBQUcsR0FBRyxHQUFHLFFBQVEsQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLE1BQU0sR0FBRyxFQUFFLENBQUMsRUFBRSxDQUFDO2FBQ3pEO1lBQ0QsT0FBTyxHQUFHLEdBQUcsR0FBRyxLQUFLLEVBQUUsQ0FBQztRQUMxQixDQUFDLENBQUM7SUFDSixDQUFDLENBQUM7SUFFRixPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUU7UUFDeEIsTUFBTSxLQUFLLEdBQUcsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUM1QixNQUFNLE1BQU0sR0FBRyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQzdCLE1BQU0sUUFBUSxHQUFHLFFBQVEsQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDO1FBQ3hELE1BQU0sT0FBTyxHQUFHLFFBQVEsQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDO1FBQ3hELE9BQU8sUUFBUSxDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUN6QyxDQUFDLENBQUMsQ0FBQztBQUNMLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgKEMpIEdudWNvb3Agc29jLiBjb29wLlxuICpcbiAqIFRoaXMgZmlsZSBpcyBwYXJ0IG9mIHRoZSBHbnVjb29wIEFuZ3VsYXIgVG9vbGtpdCAoZ25ndCkuXG4gKlxuICogR251Y29vcCBBbmd1bGFyIFRvb2xraXQgKGduZ3QpIGlzIGZyZWUgc29mdHdhcmU6IHlvdSBjYW4gcmVkaXN0cmlidXRlIGl0IGFuZC9vciBtb2RpZnlcbiAqIGl0IHVuZGVyIHRoZSB0ZXJtcyBvZiB0aGUgR05VIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgYXMgcHVibGlzaGVkIGJ5XG4gKiB0aGUgRnJlZSBTb2Z0d2FyZSBGb3VuZGF0aW9uLCBlaXRoZXIgdmVyc2lvbiAzIG9mIHRoZSBMaWNlbnNlLCBvclxuICogKGF0IHlvdXIgb3B0aW9uKSBhbnkgbGF0ZXIgdmVyc2lvbi5cbiAqXG4gKiBHbnVjb29wIEFuZ3VsYXIgVG9vbGtpdCAoZ25ndCkgaXMgZGlzdHJpYnV0ZWQgaW4gdGhlIGhvcGUgdGhhdCBpdCB3aWxsIGJlIHVzZWZ1bCxcbiAqIGJ1dCBXSVRIT1VUIEFOWSBXQVJSQU5UWTsgd2l0aG91dCBldmVuIHRoZSBpbXBsaWVkIHdhcnJhbnR5IG9mXG4gKiBNRVJDSEFOVEFCSUxJVFkgb3IgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UuICBTZWUgdGhlXG4gKiBHTlUgR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBmb3IgbW9yZSBkZXRhaWxzLlxuICpcbiAqIFlvdSBzaG91bGQgaGF2ZSByZWNlaXZlZCBhIGNvcHkgb2YgdGhlIEdOVSBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlXG4gKiBhbG9uZyB3aXRoIEdudWNvb3AgQW5ndWxhciBUb29sa2l0IChnbmd0KS4gIElmIG5vdCwgc2VlIGh0dHA6Ly93d3cuZ251Lm9yZy9saWNlbnNlcy8uXG4gKlxuICovXG5cbmltcG9ydCB7Z2V0T2JqZWN0UHJvcGVydHl9IGZyb20gJ0Bnbmd0L2NvcmUvY29tbW9uJztcblxuZXhwb3J0IGZ1bmN0aW9uIGxvY2FsU29ydDxUPihcbiAgICBkb2NzOiBQb3VjaERCLkNvcmUuRXhpc3RpbmdEb2N1bWVudDxUPltdLFxuICAgIHNvcnQ6IChzdHJpbmd8e1trZXk6IHN0cmluZ106ICdhc2MnIHwgJ2Rlc2MnfSlbXSk6IFBvdWNoREIuQ29yZS5FeGlzdGluZ0RvY3VtZW50PFQ+W10ge1xuICBjb25zdCBzb3J0RGlycyA9IHt9IGFzIHtba2V5OiBzdHJpbmddOiAnYXNjJyB8ICdkZXNjJ307XG4gIGNvbnN0IHNvcnRLZXlzID0gc29ydC5tYXAocyA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBzID09PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgc29ydERpcnNbc10gPSAnYXNjJztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBzO1xuICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBrZXlzID0gT2JqZWN0LmtleXMocyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGtleXMubGVuZ3RoID09PSAxKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICBzb3J0RGlyc1trZXlzWzBdXSA9IHNba2V5c1swXV07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4ga2V5c1swXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgICAgIC5maWx0ZXIoayA9PiBrICE9IG51bGwpIGFzIHN0cmluZ1tdO1xuICBpZiAoZG9jcy5sZW5ndGggPT09IDAgfHwgc29ydEtleXMubGVuZ3RoID09PSAwKSB7XG4gICAgcmV0dXJuIGRvY3M7XG4gIH1cbiAgY29uc3QgZG9jID0gZG9jc1swXTtcbiAgY29uc3QgaXNBc2MgPSBzb3J0RGlyc1swXSA9PT0gJ2FzYyc7XG4gIGNvbnN0IHNvcnRUeXBlcyA9IHt9IGFzIHtba2V5OiBzdHJpbmddOiBzdHJpbmd9O1xuICBzb3J0S2V5cy5mb3JFYWNoKGtleSA9PiB7XG4gICAgc29ydFR5cGVzW2tleV0gPSB0eXBlb2YgZ2V0T2JqZWN0UHJvcGVydHkoZG9jLCBrZXkpO1xuICB9KTtcbiAgY29uc3Qgc29ydFJlZHVjZSA9IChcbiAgICAgIG9iajogUG91Y2hEQi5Db3JlLkV4aXN0aW5nRG9jdW1lbnQ8VD4sXG4gICAgICApID0+IHtcbiAgICByZXR1cm4gKGtleTogc3RyaW5nLCBjdXI6IHN0cmluZykgPT4ge1xuICAgICAgY29uc3QgZmllbGQgPSBnZXRPYmplY3RQcm9wZXJ0eShvYmosIGN1cik7XG4gICAgICBpZiAoc29ydFR5cGVzW2N1cl0gPT09ICdudW1iZXInKSB7XG4gICAgICAgIGxldCBmaWVsZFBhZCA9IGAwMDAwMDAwMDAwMDAwMDAwMDAwMCR7ZmllbGR9YDtcbiAgICAgICAgcmV0dXJuIGAke2tleX0ke2ZpZWxkUGFkLnN1YnN0cihmaWVsZFBhZC5sZW5ndGggLSAyMCl9YDtcbiAgICAgIH1cbiAgICAgIHJldHVybiBgJHtrZXl9JHtmaWVsZH1gO1xuICAgIH07XG4gIH07XG5cbiAgcmV0dXJuIGRvY3Muc29ydCgoYSwgYikgPT4ge1xuICAgIGNvbnN0IGZpcnN0ID0gaXNBc2MgPyBhIDogYjtcbiAgICBjb25zdCBzZWNvbmQgPSBpc0FzYyA/IGIgOiBhO1xuICAgIGNvbnN0IGZpcnN0S2V5ID0gc29ydEtleXMucmVkdWNlKHNvcnRSZWR1Y2UoZmlyc3QpLCAnJyk7XG4gICAgY29uc3QgbGFzdEtleSA9IHNvcnRLZXlzLnJlZHVjZShzb3J0UmVkdWNlKHNlY29uZCksICcnKTtcbiAgICByZXR1cm4gZmlyc3RLZXkubG9jYWxlQ29tcGFyZShsYXN0S2V5KTtcbiAgfSk7XG59XG4iXX0=