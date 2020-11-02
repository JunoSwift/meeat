const sendHttpRequest = (method, url, data) => {
  const promise = new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open(method, url);
    xhr.responseType = "json";

    xhr.onload = () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        resolve(xhr.response);
      } else {
        reject(new Error("Something went wrong check again!"));
      }
    };
    xhr.onerror = () => {
      reject(new Error("Failed to send request"));
    };

    xhr.send(JSON.stringify(data));
  });
  return promise;
};
export default sendHttpRequest;
