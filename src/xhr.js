function makeXHRRequest(
  method,
  url,
  data,
  withCredentials = false,
  middleware = null
) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open(method, url, true);
    if (withCredentials) {
      xhr.withCredentials = true;
    }
    xhr.setRequestHeader("Content-Type", "application/json");
    if (middleware) {
      middleware(xhr);
    }
    xhr.onreadystatechange = function () {
      if (xhr.readyState === XMLHttpRequest.DONE) {
        if (xhr.status === 200) {
          resolve(JSON.parse(xhr.responseText));
        } else {
          reject(xhr.statusText);
        }
      }
    };
    xhr.send(data ? JSON.stringify(data) : null);
  });
}

export default function XHR(args = {}) {
  return makeXHRRequest(
    args.method.toUpperCase(),
    args.url,
    args.data || null,
    args.withCredentials,
    args.middleware || null
  );
}
