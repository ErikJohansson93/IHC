var gui = global.window.nwDispatcher.requireNwGui();
var win = gui.Window.get();

var tray = new gui.Tray({title: 'IHC'});
var menu = new gui.Menu();
menu.append(new gui.MenuItem({ label: 'Show' }));
menu.append(new gui.MenuItem({ label: 'Hide' }));
menu.append(new gui.MenuItem({ label: 'Quit' }));

menu.items[0].click = function() {
  window.moveTo(9999,0);
  win.show();
};

menu.items[1].click = function() {
  win.hide();
};

menu.items[2].click = function() {
  gui.App.quit();
};

// Hide app when focus is lost.
win.on('blur', function() {
  win.hide();
});

// Set menu.
tray.menu = menu;
