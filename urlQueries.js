/** ------------------------------------
 *? Get and return url query
 * ------------------------------------
 * Get url query and return as object
 * @return formatted query
 */
export function getQuery() {
  let search = window.location.search;

  // Remove ?
  search = search.substring(1);
  // Split values
  let values = search.split("&");
  var query = {};

  // Split values and keys
  if (values.length > 1) {
    query = [];

    // Set single pair to array of objects
    query.push(
      values.map((v) => {
        let value = v.split("=");
        let newValue = {};
        newValue[value[0]] = value[1];
        return newValue;
      })
    );
  } else {
    // Set single pair
    values = search.split("=");
    query[values[0]] = values[1];
  }

  return query;
}

/** ------------------------------------
 *? Filter query results
 * ------------------------------------
 * Return one value matching filter
 * @param object query object
 * @param string filter
 * @return filtered value
 */
export function filterQuery(query, filter) {
  if (Object.prototype.toString.call(query) === "[object Array]") {
    const value = query[0].filter(
      (value) => typeof value[filter] !== undefined && value[filter]
    );
    return value[0][filter];
  } else {
    return query[filter];
  }
}
