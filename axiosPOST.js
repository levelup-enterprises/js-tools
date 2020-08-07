/** -----------------------------------------
 *? Convert object to POSTable values (PHP)
 * ------------------------------------------
 * @param object values
 * @return URLSearchParams POST format
 */
export function postify(values) {
  let params = new URLSearchParams();
  Object.entries(values).forEach((entry) => {
    const [key, value] = entry;
    params.append(key, value);
  });
  return params;
}
