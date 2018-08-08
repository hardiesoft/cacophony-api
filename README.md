# cacophony-api

[![Status](https://api.travis-ci.org/TheCacophonyProject/cacophony-api.svg)](https://travis-ci.org/TheCacophonyProject/cacophony-api)

cacophony-api is a Node server that provides an REST API server for
uploading, processing and retrieving media collected for the Cacophony
Project. This server used to be known as "Full_Noise".

## Running the server

For development and testing purposes it is easiest to run
cacophony-api using Docker. To do this:

* Ensure your user account is set up to run commands as root using `sudo`.
* Ensure the Docker is installed (`sudo apt install docker.io` on
  Ubuntu)
* Run cacophony-api using `./run`

This will build a Docker container which includes all the services
that cacophony-api relies on and then runs the container. The end
result is a fully functioning API server. The container name is
"cacophony-api".

The first time `./run` is used will be somewhat slow as dependencies
are downloaded. Future executions are quite fast as Docker caches the
images it creates.

## Running the tests

The Cacophony API server has a comprehensive function test suite. This
requires Python 3.

To run the tests, you need to do these steps once:

* Create a virtualenv using your preferred method.
* Activate the virtualenv.
* `cd test`
* Install dependencies: `pip install -r requirements.txt`

To run the tests:

* Start the API server as described above.
* Activate the virtualenv created earlier.
* `cd test`
* Run the tests with: `pytest -s`

## Running in Virtual Box

If you want to continue using a different operating system (eg Windows/Mac OS X) then you can try running Linux in a Virtual Box.   This means you can edit the source files on your normal dev environment.  To do this:

### Install Ubuntu
* Download VirtualBox
* Download Ubuntu Server
* Install a Ubuntu server in VirtualBox (install ssh when doing this)
* Run `VBoxManage modifyvm "<vm name>" --natdnshostresolver1 on` to make the virtual box play nicely when you change wifi networks.

### SSH into Ubuntu the box
It is much better to ssh in than use the default console which is awful. To get this working:
*  Open up port 2222 to ssh into.   Go to VirtualBox console, click Ubuntu server and navigate to Settings/Network/Adaptor1(NAT)/Port Forwarding
*  Add Ubuntu-SSH, host IP `127.0.0.1`, port `2222`, guest IP `10.0.2.15`, port `22`. 
*  ssh from host using `ssh -p 2222 <username>@127.0.0.1`

### To share the source code from the host(main) computer
* Check out files on your main computer eg to `<path>/cacophony`
* On VirtualBox console go to Settings/Shared Folder and add new share called `cacophony` with path `<path>/cacophony`.   Make it permanent and auto mount.
* Install Virtual Box guest addins on Ubuntu Virtual Box server (https://www.techrepublic.com/article/how-to-install-virtualbox-guest-additions-on-a-gui-less-ubuntu-server-host/ Remember you need to mount the cdrom drive with `sudo mount /dev/cdrom /media/cdrom` so you can see it.)
* Add your username to the vbox  usergroup so you can see the share `sudo usermod -a -G vboxsf <username>` then log out and log back in.
* Go to `/media/sf_cacophony` directory.  You should now be able to see and edit your files.
* Enable symlinks on the Ubuntu Vitual Box else the application can't build. On your host(main) computer run
  - `VBoxManage setextradata "<vm name>" VBoxInternal2/SharedFoldersEnableSymlinksCreate/cacophony 1`
  - Verify it worked by running `VBoxManage getextradata "<vm name>" enumerate`\
* Follow the instructions at the top of README.md to run the API server. All instructions should be run on the Ubuntu server except the git commands that should be run on on your host (main) environment.

## Generating API Documentation

* Install apiDoc `npm install apidoc -g`
* Generate API documentation with `apidoc -i api/V1/ -o apidoc/`

## License

This project is licensed under the Affero General Public License
(https://www.gnu.org/licenses/agpl-3.0.en.html).
