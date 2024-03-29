/**
 * @author brokenedtzjs
 * @license Apache-2.0
 * @copyright brokenedtzjs
 * @file index.js
 */

'use strict';

// =================================================================

const AfkError = require("../lib/error/AfkError");
const AfkTypeError = require("../lib/error/AfkTypeError");
const boxen = require("boxen");
const chalk = require("chalk");
const semver = require("semver");
const pkgJson = require("package-json");
const semverDiff = require("semver-diff");
const { name, version } = require("../package.json");

// =================================================================
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __name = (target, value) =>
  __defProp(target, "name", { value, configurable: true });
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if ((from && typeof from === "object") || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, {
          get: () => from[key],
          enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable,
        });
    return to;
  }
};
var __toCommonJS = (mod) =>
  __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var src_exports = {};
__export(src_exports, {
  AfkClient: () => AfkClient,
});
module.exports = __toCommonJS(src_exports);
// =================================================================
class AfkClient {
  constructor() {
    this.users = new Map();
  }

  /**
   * Add a user to AFK status.
   *
   * @param {string} userId - The user's ID.
   * @param {string} afkMessage - The AFK message.
   * @throws {AfkError} if userId is not a valid string.
   * @returns {Map} The updated user map.
   */
  addUser(userId, afkMessage) {
    if (!userId || typeof userId !== "string") {
      throw new AfkError("userId must be a valid string.");
    }
    return this.users.set(userId, afkMessage);
  }

  /**
   * Remove a user from AFK status.
   *
   * @param {string} userId - The user's ID.
   * @throws {AfkError} if userId is not a valid string.
   * @returns {boolean} `true` if the user was removed, `false` otherwise.
   */
  removeUser(userId) {
    if (!userId || typeof userId !== "string") {
      throw new AfkError("userId must be a valid string.");
    }
    return this.users.delete(userId);
  }

  /**
   * Find the AFK status of a user.
   *
   * @param {string} userId - The user's ID.
   * @throws {AfkError} if userId is not a valid string.
   * @returns {boolean} `true` if the user is AFK, `false` otherwise.
   */
  findUser(userId) {
    if (!userId || typeof userId !== "string") {
      throw new AfkError("userId must be a valid string.");
    }
    return this.users.has(userId);
  }

  /**
   * Get the AFK message of a user.
   *
   * @param {string} userId - The user's ID.
   * @throws {AfkError} if userId is not a valid string.
   * @returns {string[] | undefined} The AFK message, or `undefined` if the user is not AFK.
   */
  findMessage(userId) {
    if (!userId || typeof userId !== "string") {
      throw new AfkError("userId must be a valid string.");
    }
    if (!this.users.get(userId)) {
      throw new AfkTypeError("reason must not empty");
    }
    return this.users.get(userId);
  }
}
__name(AfkClient, "AfkClient");
// =================================================================
const checkUpdate = async () => {
  try {
    const { version: latestVersion } = await pkgJson(name);
    const updateAvailable = semver.lt(version, latestVersion);

    if (updateAvailable) {
      const verDiff = semverDiff(version, latestVersion);
      if (verDiff) {
        const msg = {
          updateAvailable: `New update available ${chalk.dim.red(
            version
          )} → ${chalk.green(latestVersion)}`,
          runUpdate: `Run ${chalk.cyanBright(
            `npm i ${name}@latest`
          )} to update`,
        };
        console.log(
          boxen(`${msg.updateAvailable}\n${msg.runUpdate}`, {
            title: "Update Detected",
            borderColor: "magentaBright",
            margin: 1,
            padding: 1,
            titleAlignment: "center",
            align: "center",
          })
        );
      }
    }
  } catch (e) {
    throw new AfkError(e);
  }
};
checkUpdate();
// =================================================================
var versions = `${require("../package.json").version}`;
// =================================================================
0 &&
  (module.exports = {
    AfkClient,
    versions,
  });
// =================================================================
//# sourceMappingURL=index.js.map