async function getThunderbirdVersion() {
  const info = await browser.runtime.getBrowserInfo();
  const parts = info.version.split(".");
  return {
    major: parseInt(parts[0]),
    minor: parseInt(parts[1]),
  }
}

(async () => {
  messenger.WindowListener.registerDefaultPrefs("defaults/preferences/accountcolors-prefs.js");

  messenger.WindowListener.registerChromeUrl([
    ["content", "accountcolors", "chrome/content/"],
    ["content", "accountcolors-skin", "chrome/skin/"],
    ["resource", "accountcolors", "chrome/skin/"],
    ["locale", "accountcolors", "de", "chrome/locale/de/"],
    ["locale", "accountcolors", "en-US", "chrome/locale/en-US/"],
    ["locale", "accountcolors", "es-ES", "chrome/locale/es-ES/"],
    ["locale", "accountcolors", "fi", "chrome/locale/fi/"],
    ["locale", "accountcolors", "fi-FI", "chrome/locale/fi-FI/"],
    ["locale", "accountcolors", "fr", "chrome/locale/fr/"],
    ["locale", "accountcolors", "it", "chrome/locale/it/"],
    ["locale", "accountcolors", "pt-BR", "chrome/locale/pt-BR/"],
    ["locale", "accountcolors", "sv-SE", "chrome/locale/sv-SE/"],
    ["locale", "accountcolors", "zh-CN", "chrome/locale/zh-CN/"],
  ]);

  //skin accountcolors classic/1.0 chrome/skin/
  //overlay chrome://messenger/content/messenger.xul chrome://accountcolors/content/accountcolors-3panewindow-overlay.xul
  //overlay chrome://messenger/content/messageWindow.xul chrome://accountcolors/content/accountcolors-messagewindow-overlay.xul
  //overlay chrome://messenger/content/messengercompose/messengercompose.xul chrome://accountcolors/content/accountcolors-composewindow-overlay.xul

  messenger.WindowListener.registerWindow("chrome://messenger/content/messenger.xhtml", "chrome://accountcolors/content/accountcolors-3panewindow-injector.js");

  messenger.WindowListener.registerWindow("chrome://messenger/content/messageWindow.xhtml", "chrome://accountcolors/content/accountcolors-messagewindow-injector.js");

  messenger.WindowListener.registerWindow("chrome://messenger/content/messengercompose/messengercompose.xhtml", "chrome://accountcolors/content/accountcolors-composewindow-injector.js");

  // New Mail frontend: see https://developer.thunderbird.net/thunderbird-development/codebase-overview/mail-front-end
  // and https://developer.thunderbird.net/add-ons/updating/tb115/adapt-to-changes-in-thunderbird-103-115
  if ((await getThunderbirdVersion()).major > 102) {
    messenger.WindowListener.registerWindow("about:message", "chrome://accountcolors/content/accountcolors-aboutmessage-injector.js");
  }

  messenger.WindowListener.registerOptionsPage("chrome://accountcolors/content/accountcolors-options.xhtml");

  messenger.WindowListener.startListening();
})();
