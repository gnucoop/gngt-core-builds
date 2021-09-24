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
export function mergeQueryParams(win, loose) {
    const fields = loose.fields || win.fields ? [...(loose.fields || []), ...(win.fields || [])] : null;
    const joins = loose.joins || win.joins ?
        [
            ...(loose.joins || []),
            ...(win.joins || []),
        ] :
        null;
    const merged = Object.assign(Object.assign(Object.assign({}, loose), win), { selector: Object.assign(Object.assign({}, loose.selector), win.selector), sort: Object.assign(Object.assign({}, loose.sort), win.sort) });
    if (fields != null) {
        merged.fields = fields;
    }
    if (joins != null) {
        merged.joins = joins;
    }
    return merged;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVyZ2UtcXVlcnktcGFyYW1zLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vc3JjL2NvcmUvY29tbW9uL21lcmdlLXF1ZXJ5LXBhcmFtcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQW1CRztBQUlILE1BQU0sVUFBVSxnQkFBZ0IsQ0FDNUIsR0FBOEIsRUFDOUIsS0FBZ0M7SUFFbEMsTUFBTSxNQUFNLEdBQ1IsS0FBSyxDQUFDLE1BQU0sSUFBSSxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsTUFBTSxJQUFJLEVBQUUsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxHQUFHLENBQUMsTUFBTSxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQztJQUN6RixNQUFNLEtBQUssR0FBRyxLQUFLLENBQUMsS0FBSyxJQUFJLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUNwQztZQUNFLEdBQUcsQ0FBQyxLQUFLLENBQUMsS0FBSyxJQUFJLEVBQUUsQ0FBQztZQUN0QixHQUFHLENBQUMsR0FBRyxDQUFDLEtBQUssSUFBSSxFQUFFLENBQUM7U0FDckIsQ0FBQyxDQUFDO1FBQ0gsSUFBSSxDQUFDO0lBQ1QsTUFBTSxNQUFNLGlEQUNQLEtBQUssR0FDTCxHQUFHLEtBQ04sUUFBUSxrQ0FDSCxLQUFLLENBQUMsUUFBUSxHQUNkLEdBQUcsQ0FBQyxRQUFRLEdBRWpCLElBQUksa0NBQ0MsS0FBSyxDQUFDLElBQUksR0FDVixHQUFHLENBQUMsSUFBSSxJQUVkLENBQUM7SUFDRixJQUFJLE1BQU0sSUFBSSxJQUFJLEVBQUU7UUFDbEIsTUFBTSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUM7S0FDeEI7SUFDRCxJQUFJLEtBQUssSUFBSSxJQUFJLEVBQUU7UUFDakIsTUFBTSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7S0FDdEI7SUFDRCxPQUFPLE1BQU0sQ0FBQztBQUNoQixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IChDKSBHbnVjb29wIHNvYy4gY29vcC5cbiAqXG4gKiBUaGlzIGZpbGUgaXMgcGFydCBvZiB0aGUgR251Y29vcCBBbmd1bGFyIFRvb2xraXQgKGduZ3QpLlxuICpcbiAqIEdudWNvb3AgQW5ndWxhciBUb29sa2l0IChnbmd0KSBpcyBmcmVlIHNvZnR3YXJlOiB5b3UgY2FuIHJlZGlzdHJpYnV0ZSBpdCBhbmQvb3IgbW9kaWZ5XG4gKiBpdCB1bmRlciB0aGUgdGVybXMgb2YgdGhlIEdOVSBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGFzIHB1Ymxpc2hlZCBieVxuICogdGhlIEZyZWUgU29mdHdhcmUgRm91bmRhdGlvbiwgZWl0aGVyIHZlcnNpb24gMyBvZiB0aGUgTGljZW5zZSwgb3JcbiAqIChhdCB5b3VyIG9wdGlvbikgYW55IGxhdGVyIHZlcnNpb24uXG4gKlxuICogR251Y29vcCBBbmd1bGFyIFRvb2xraXQgKGduZ3QpIGlzIGRpc3RyaWJ1dGVkIGluIHRoZSBob3BlIHRoYXQgaXQgd2lsbCBiZSB1c2VmdWwsXG4gKiBidXQgV0lUSE9VVCBBTlkgV0FSUkFOVFk7IHdpdGhvdXQgZXZlbiB0aGUgaW1wbGllZCB3YXJyYW50eSBvZlxuICogTUVSQ0hBTlRBQklMSVRZIG9yIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFLiAgU2VlIHRoZVxuICogR05VIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgZm9yIG1vcmUgZGV0YWlscy5cbiAqXG4gKiBZb3Ugc2hvdWxkIGhhdmUgcmVjZWl2ZWQgYSBjb3B5IG9mIHRoZSBHTlUgR2VuZXJhbCBQdWJsaWMgTGljZW5zZVxuICogYWxvbmcgd2l0aCBHbnVjb29wIEFuZ3VsYXIgVG9vbGtpdCAoZ25ndCkuICBJZiBub3QsIHNlZSBodHRwOi8vd3d3LmdudS5vcmcvbGljZW5zZXMvLlxuICpcbiAqL1xuXG5pbXBvcnQge01vZGVsUXVlcnlQYXJhbXN9IGZyb20gJy4vcXVlcnktcGFyYW1zJztcblxuZXhwb3J0IGZ1bmN0aW9uIG1lcmdlUXVlcnlQYXJhbXMoXG4gICAgd2luOiBQYXJ0aWFsPE1vZGVsUXVlcnlQYXJhbXM+LFxuICAgIGxvb3NlOiBQYXJ0aWFsPE1vZGVsUXVlcnlQYXJhbXM+LFxuICAgICk6IE1vZGVsUXVlcnlQYXJhbXMge1xuICBjb25zdCBmaWVsZHMgPVxuICAgICAgbG9vc2UuZmllbGRzIHx8IHdpbi5maWVsZHMgPyBbLi4uKGxvb3NlLmZpZWxkcyB8fCBbXSksIC4uLih3aW4uZmllbGRzIHx8IFtdKV0gOiBudWxsO1xuICBjb25zdCBqb2lucyA9IGxvb3NlLmpvaW5zIHx8IHdpbi5qb2lucyA/XG4gICAgICBbXG4gICAgICAgIC4uLihsb29zZS5qb2lucyB8fCBbXSksXG4gICAgICAgIC4uLih3aW4uam9pbnMgfHwgW10pLFxuICAgICAgXSA6XG4gICAgICBudWxsO1xuICBjb25zdCBtZXJnZWQgPSB7XG4gICAgLi4ubG9vc2UsXG4gICAgLi4ud2luLFxuICAgIHNlbGVjdG9yOiB7XG4gICAgICAuLi5sb29zZS5zZWxlY3RvcixcbiAgICAgIC4uLndpbi5zZWxlY3RvcixcbiAgICB9LFxuICAgIHNvcnQ6IHtcbiAgICAgIC4uLmxvb3NlLnNvcnQsXG4gICAgICAuLi53aW4uc29ydCxcbiAgICB9LFxuICB9O1xuICBpZiAoZmllbGRzICE9IG51bGwpIHtcbiAgICBtZXJnZWQuZmllbGRzID0gZmllbGRzO1xuICB9XG4gIGlmIChqb2lucyAhPSBudWxsKSB7XG4gICAgbWVyZ2VkLmpvaW5zID0gam9pbnM7XG4gIH1cbiAgcmV0dXJuIG1lcmdlZDtcbn1cbiJdfQ==