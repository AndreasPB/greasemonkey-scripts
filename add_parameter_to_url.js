//@ts-check

// ==UserScript==
// @name     ?no-cache=1
// @include  https://test01.ku.localhost.magenta.dk/*
// @include  https://test01.cmsvalidate.ku.dk/*
// @include  https://test01.ku.dk/*
// @include  http://example.com/*
// @version  1
// @grant    none
// ==/UserScript==

/**
 * Assigns the parameter to the URL
 * @param {string} parameterName
 * @param {string|number} parameterValue
 */
function addParameterToURL(parameterName, parameterValue) {
  const url = document.location.toString();
  const updatedURL = updateQueryStringParameter(
    url,
    parameterName,
    parameterValue,
  );

  if (url !== updatedURL) {
    location.assign(updatedURL);
  }
}

/**
 * Returns an updated version of the URL with the parameter
 * @param {string} uri
 * @param {string} key
 * @param {string|number} value
 */
function updateQueryStringParameter(uri, key, value) {
  const re = new RegExp("([?&])" + key + "=.*?(&|$)", "i");
  const separator = uri.indexOf("?") !== -1 ? "&" : "?";

  if (uri.match(re)) {
    return uri.replace(re, "$1" + key + "=" + value + "$2");
  } else {
    return uri + separator + key + "=" + value;
  }
}

addParameterToURL("no-cache", 1);
