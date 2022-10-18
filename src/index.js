function getStyle(id) {
    const attr = 'data-design';
    const found = document.querySelectorAll(`[${attr}="${id}"]`);
    if (found.length > 0) {
        return found[0];
    } else {
        const style = document.createElement('style');
        style.setAttribute(attr, id);
        document.head.append(style);
        return style;
    }
}

/**
 * Utility function to add replaceable CSS.
 * @param {string} styleID
 * @param {string} styleString
 */
function addStyle(id, styleString) {
    const style = getStyle(id);
    style.textContent = styleString;
}

export default addStyle;