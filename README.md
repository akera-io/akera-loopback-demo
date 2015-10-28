#Description
StrongLopp demo application that illustrates usage of the akera-loopback-connector together
with client frameworks like Angular, Kendo UI.

#Dependencies
An instance of Akera Application Server is needed to make the demo application 
work. If you do not have one already set-up start by installing the package:

```bash
$ npm set registry http://repository.akera.io
$ sudo npm install -g akera-server 
```

Set-up a new instance by running the configuration script:
```bash
$ akera-server new sports
```

fill in the configuration, make note of broker port number and SSL options to use later when 
updating the data source configuration on the demo application. Also ensure a `sports2000` 
database is connected for the demo application to work.

Start the application server with:
```bash
$ akera-server start sports
``` 

Since this is a StrongLoop/LoopBack demo the `strongloop` package must 
be installed on your system, check that by running:

```bash
$ slc --version
```

If not already installed you can do so by running:

```bash
$ sudo npm install -g strongloop
```

After you have ensured that `strongloop` is installed, run

```bash
$ sudo npm install akera-loopback-demo
```

#Runtime
To start the demo application, change to the application folder 
and use the `slc` command to start it.

```bash
$ slc run
```

Then point your browser to *http://localhost:3000*

#Configuration
Settings can be found in the client/config.json file. To add more demos to the application, 
you will need to update the "akera_demos" section. All files you specify will be shown as 
source code for the demo. If your demo also creates additional angular models, you need to 
add them in client/mod-dep.js . Make sure to also include any .js files in client/index.html 
*BEFORE* "js/main.js".

#Bower issues
If bower encounters errors during install, try running

```bash
    $ git config --global url."https://".insteadOf "git://"
```

then run the installation again.
