/**
 * API Creator.
 *
 * @param {string} baseURL - Base URL.
 * @param {any} options - Fetch Options.
 *
 * @example
 * const baseURL = "https://example.com";
 * const options = {
 *   headers: {
 *     Authorization: "Bearer YOUR_ACCESS_TOKEN",
 *   },
 * };
 *
 * const api = xtyle.api(baseURL, options);
 *
 * // GET request
 * api
 *   .get("path", { param1: "value1", param2: "value2" })
 *   .then((data) => console.log("GET response:", data))
 *   .catch((error) => console.error("GET error:", error));
 *
 * // POST request
 * api
 *   .post("path", { key1: "value1", key2: "value2" })
 *   .then((data) => console.log("POST response:", data))
 *   .catch((error) => console.error("POST error:", error));
 *
 * // File(s) Demo
 * const fileInput = document.getElementById('fileInput') as HTMLInputElement;

 * // UPLOAD a single file
 * api
 *   .upload("upload", fileInput.files[0])
 *   .then((data) => console.log("File Upload response:", data))
 *   .catch((error) => console.error("File Upload error:", error));
 *
 * // UPLOAD multiple files
 * const multipleFiles = [fileInput.files[0], fileInput.files[1]];
 * api
 *   .upload("upload", multipleFiles)
 *   .then((data) => console.log("Files Upload response:", data))
 *   .catch((error) => console.error("Files Upload error:", error));
 */
