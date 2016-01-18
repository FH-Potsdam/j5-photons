mqtt-example
============

a simple example that shows the usage of the mqtt protokoll to chain some objects.  

- rename the folder "config-example" to "config"
- rename the file "default-example.json" to "default.json" and add your photon ids and your token.  
!You need node v0.12.9! install it via [github.com/creationix/nvm](https://github.com/creationix/nvm).  

!You need gulp installed globaly!  

    npm i gulp -g

Then:  

    cd j5-photons/mqtt-example/
    nvm use
    npm i
    gulp babel
    npm start

This should open [https://shiftr.io/try#terminal](https://shiftr.io/try#terminal) for you and you should see some exchange between instances.  