*Property 'innerText' does not exist on type EventTarget*
```javascript
  <HTMLElement>(e.target).innerText
```

*Are all google fonts free to use?*
> Yes, they are.

*Watch variable changes*
```javascript
  const observer = new MutationObserver(callback)
  observer.observe('<div></div>', observerOptions);
```

*What is innerHTML on input elements?*
```javascript
 input.value = "here is innerText's text"
```

*Set color of windows titlebar - electron.js*
> Not possible (2/2022), you have to set frame to false, and create own titlebar.

*Could not find a declaration file for module 'module-name'. '/path/to/module-name.js' implicitly has an 'any' type*
```javascript
  // import * as yourModuleName from 'module-name';
  const yourModuleName = require('module-name');
```

*Remove menubar from Electron app*
```javascript
  const mainWindow = new BrowserWindow({
    autoHideMenuBar: true,
  })
```

*Error message "error:0308010C:digital envelope routines::unsupported"*
> Try to uninstall Node.js version 17+ and reinstall the Node.js version 16+
> Or set ```set NODE_OPTIONS=--openssl-legacy-provider```

*Open window in browser from electron*
```HTML
  <base target="_blank">
```
```javascript
  mainWindow.webContents.on('new-window', function(e, url) {
    e.preventDefault();
    require('electron').shell.openExternal(url);
  });
```

*How do you clear the focus in javascript?*
```Javascript
  .blur();
```