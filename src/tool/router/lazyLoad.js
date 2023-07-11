let loadedScripts = {};

function lazyLoadScript(url) {
  return new Promise((resolve, reject) => {
    if (loadedScripts[url]) {
      resolve(loadedScripts[url]);
      return;
    }

    const script = document.createElement("script");
    script.src = url;
    script.async = true;
    script.onload = () => {
      loadedScripts[url] = __LazyView__;
      resolve(loadedScripts[url]);
    };
    script.onerror = reject;
    document.head.appendChild(script);
  });
}

lazyLoadScript.key = "__LazyView__";

export default lazyLoadScript;
