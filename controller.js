/**
 * @organization Console Art Cybernetic - https://cacybernetic.github.io
 * @author Obrymec - https://obrymec.vercel.app
 * @fileoverview The main controller of page.
 * @supported DESKTOP, MOBILE
 * @created 2025-02-10
 * @updated 2026-03-27
 * @file controller.js
 * @version 0.0.6
 */

// Global attributes.
const linkNotFound = "The wrapper of the destination link doesn't exist.";
const hashTagNotFound = "The character used for spliting doesn't exist.";
const sourceNotFound = (
  "The destination link to contact from this wrapper doesn't exist."
);
const jsonFilePaths = [
  "african_female_soldier_blender",
  "african_female_soldier_godot",
  "destroyed_cars_blender_vol1",
  "destroyed_cars_godot_vol1",
  "buildings_blender_vol1",
  "buildings_blender_vol2",
  "buildings_godot_vol1",
  "buildings_godot_vol2",
  "assets_banks",
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
  // Hides loader.
  tag.classList.add("hidden");
  // Displays message across an alert dialog.
  window.alert(message);
  // Shows loader.
  tag.classList.remove("hidden");
  // Goes last loaded website.
  window.history.back();
}

// Whether page is fully loaded.
window.addEventListener("DOMContentLoaded", async function () {
  // The main container html tag instance.
  const mainContainer = this.document.querySelector("div#main-container");
  // Gets browser search bar.
  const searchInput = this.window.location.href;
  // Whether browser link has no hashtag character.
  if (!searchInput.includes('#')) alertError(hashTagNotFound, mainContainer);
  // Otherwise.
  else {
    // Tries to get link wrapper.
    let wrapper = searchInput.split('#')[1];
    // Removes unexpected characters.
    wrapper = (typeof wrapper === "string" ? wrapper.trim() : '');
    // Whether wrapper is undefined.
    if (wrapper.length <= 0) alertError(linkNotFound, mainContainer);
    // Otherwise.
    else {
      // The last position index.
      const lastIndex = (jsonFilePaths.length - 1);
      // Searches provided link.
      for (let i = 0; i < jsonFilePaths.length; i++) {
        // The json file path.
        const path = `./links/${jsonFilePaths[i]}.json`;
        // Loads local data from static json file.
        const data = await (await this.window.fetch(path)).json();
        // Tries to get wrapper source link.
        let source = data[wrapper]?.destination;
        // Prints content of loaded data.
        console.log({source, data});
        // Corrects it whether it's possible.
        source = (typeof source === "string" ? source.trim() : '');
        // Whether source link is not defined in data.
        if (source.length <= 0) {
          // Undefined destination link.
          if (i >= lastIndex) alertError(sourceNotFound, mainContainer);
        // Otherwise.
        } else {
          // Goes to provided link.
          this.window.location.href = source;
          // Gets out of loop.
          break;
        }
      }
    }
  }
});
