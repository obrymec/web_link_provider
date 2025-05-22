/**
 * @project Web Link Provider - https://obrymec.github.io/web_link_provider
 * @fileoverview The main controller of the page.
 * @author Obrymec - https://obrymec.vercel.app
 * @supported DESKTOP, MOBILE
 * @created 2025-02-10
 * @updated 2025-05-22
 * @file controller.js
 * @version 0.0.2
 */

// Global attributes.
const linkNotFound = "The wrapper of the destination link doesn't exist.";
const hashTagNotFound = "The character used for spliting doesn't exist.";
const sourceNotFound = (
  "The destination link to contact from this wrapper doesn't exist."
);
const jsonFilePaths = [
  "destroyed_cars_blender_vol1",
  "destroyed_cars_godot_vol1",
  "buildings_blender_vol1",
  "african_female_soldier",
  "buildings_godot_vol1",
  "sketchfab"
];

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
  // Gets browser search bar.
  const searchInput = this.window.location.href;
  // Whether the browser link has no hashtag character.
  if (!searchInput.includes('#')) alertError(hashTagNotFound, mainContainer);
  // Otherwise.
  else {
    // Tries to get the link wrapper.
    let wrapper = searchInput.split('#')[1];
    // Removes unexpected characters.
    wrapper = (typeof wrapper === "string" ? wrapper.trim() : '');
    // Whether the wrapper is undefined.
    if (wrapper.length <= 0) alertError(linkNotFound, mainContainer);
    // Otherwise.
    else {
      // Searches provided link.
      for (const jsonFilePath of jsonFilePaths) {
        // The json file path.
        const path = `./links/${jsonFilePath}.json`;
        // Loads local data from the static json file.
        const data = await (await this.window.fetch(path)).json();
        // Tries to get the wrapper source link.
        let source = data[wrapper]?.destination;
        // Prints the content of loaded data.
        console.log({source, data});
        // Corrects it whether it's possible.
        source = (typeof source === "string" ? source.trim() : '');
        // Whether the source link is not defined in data.
        if (source.length <= 0) alertError(sourceNotFound, mainContainer);
        // Otherwise.
        else {
          // Goes to the provided link.
          this.window.location.href = source;
          // Gets out of loop.
          break;
        }
      }
    }
  }
});
