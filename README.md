## IHC - Intelligent home control


#####Control all your tellstick compatible devices with your smartphone.


Visit your host machine at its ip-address. Also make sure that telldusd is running on the same machine.

1. Install `telldus-core` library and `libtelldus-core-dev`.
  * Windows, Mac: Install Telldus Center -- go [here](http://download.telldus.se/TellStick/Software/TelldusCenter/) and get the latest version of the appropriate DMG or EXE file and install
  * Linux Ubuntu/Debian: http://developer.telldus.com/wiki/TellStickInstallationUbuntu
  * Linux source install: http://developer.telldus.com/wiki/TellStickInstallationSource

2. Configure your devices in /etc/tellstick.conf

3. Set the ip-address for your host on line 10 in js/app.js. (Defaults to 192.168.0.5)

4. Start node js server with `node server.js`

5. Visit the ip-address of that runs the node js server.

---

License and Credits:

This project is licensed under the MIT license and uses telldus Node bindings from the Github user Hexagon
(https://github.com/Hexagon/node-telldus).

