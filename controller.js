/**
 * @project Web Link Provider - https://obrymec.github.io/web_link_provider
 * @fileoverview The main controller of the page.
 * @author Obrymec - https://obrymec.vercel.app
 * @supported DESKTOP, MOBILE
 * @created 2025-02-10
 * @updated 2025-02-11
 * @file controller.js
 * @version 0.0.1
 */

/**
 * @description Displays an error message inside an alert dialog.
 * @param {string} message The text to display.
 * @param {HTMLElement} tag The markup to hide.
 * @function alertError
 * @type {void}
 * @public
 * @returns {void}
 */
function alertError (message, tag) {
  // Hides the loader.
  tag.classList.add("hidden");
  // Displays the message across an alert dialog.
  window.alert(message);
  // Shows the loader.
  tag.classList.remove("hidden");
  // Goes the last loaded website.
  window.history.back();
}

// Whether the page is fully loaded.
window.addEventListener("DOMContentLoaded", async function () {
  // The main container html tag instance.
  const mainContainer = this.document.querySelector("div#main-container");
  // Whether the browser link has no hashtag character.
  if (!this.window.location.href.includes('#')) alertError(
    "The character used for spliting doesn't exist.",
    mainContainer
  );
  // Otherwise.
  else {
    // Tries to get the link wrapper.
    let wrapper = this.window.location.href.split('#')[1];
    // Removes unexpected characters.
    wrapper = (typeof wrapper === "string" ? wrapper.trim() : '');
    // Whether the wrapper is undefined.
    if (wrapper.length <= 0) alertError(
      "The wrapper of the destination link doesn't exist.",
      mainContainer
    );
    // Otherwise.
    else {
      // Loads local data from the static json file.
      const data = await (await this.window.fetch("./links.json")).json();
      // Tries to get the wrapper source link.
      let source = (
        data.hasOwnProperty(wrapper) ? data[wrapper]?.destination : null
      );
      // Corrects it whether it's possible.
      source = (typeof source === "string" ? source.trim() : '');
      // Whether the source link is not defined in data.
      if (source.length <= 0) alertError(
        "The destination link to contact from this wrapper doesn't exist.",
        mainContainer
      );
      // Otherwise.
      else this.window.location.href = source;
    }
  }
});
