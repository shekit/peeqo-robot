# Peeqo
Thank you for making this the **~highest~ second highest voted DIY project** everr on Reddit! 
https://www.reddit.com/r/DIY/comments/5h15f4/i_built_a_desktop_robot_that_responds_entirely_in/

Check out the **video** here: https://youtu.be/ApAzIJ3jQtw

# Hardware

I have separated out the hardware elements into a seperate repo. You can find that here https://github.com/shekit/peeqo-robot-hardware

# Setting up the Pi:

This is a detailed guide on getting your Pi up and running:

### Setup up SD Card on Pi:

1. Download Raspbian Jessie with Pixel (https://www.raspberrypi.org/downloads/raspbian/)
- Kernel Version - 4.4
- Release Date - 11 - 01 - 2017 or latest version
- Version - January 2017  or latest version
2. Unzip File
- Mac OSX has problems unzipping files which unzip to more than 4gb
- Go to Terminal and unzip file with command
- tar xzvf /path/to/zip/file
3. Download Etcher from resin.io (https://etcher.io/)
4. Download SDFormatter and clean format SD card(not quick clean) -(https://www.sdcard.org/downloads/formatter_4/)
- Sometimes SD cards larger than 32GB may not work on pi
- If Pi RED LED is on, no green LED blinking, it means it cannot read the SD card
5. Transfer unzipped .img file to SD card using Etcher (etcher.io)
6. Plug SD card into Pi and boot up
7. Connect to wifi or plug in ethernet cable

### Initial Setup:

1. Go to Menu > Preferences > Raspberry Pi Config
- Set Keyboard to US
- Set Locale to your Locale
- Expand Filesystem
2. Reboot
3. Run commands in terminal to update Raspbian for recent bug fixes:
 - `sudo apt-get update` OR `sudo apt update`
 - `sudo apt-get dist-upgrade` OR `sudo apt full-upgrade`
4. Enable SSH and i2C
- `sudo raspi-config`
- Interfacing Options > SSH > Enabled
- Interfacing Options > i2c > Enabled
5. Enable overclocking or uncomment in /boot/config.txt `arm_freq=800`
6. `sudo apt install apt-transport-https`
7. Install python pillow
- `pip install pillow`
- Make sure you are using python 2.7 not 3.0+

### Update Node:

1. Raspbian ships with node v0.10.29 which will not work, have to update it
2. Remove Old Version of Node
- `sudo apt-get remove nodered -y`  (-y flag just says yes instead of requiring user input)
- `sudo apt-get remove nodejs nodejs-legacy -y`
- `sudo apt-get remove npm -y`
3. Install Latest Node Version (install version 6)
- `sudo curl -sL https://deb.nodesource.com/setup_6.x | sudo -E bash -`
- `sudo apt-get install nodejs -y`
4. Check node and npm version
- `node -v`
- Output should be v6.10.10 or higher
- `npm -v`
- Output should be 3.10.10 or higher

### Install Electron:

1. Install Electron globally (currently have v1.6.2)
- `sudo npm install -g electron`
2. If this doesn’t work
```
rm -rf ~/.electron
mkdir ~/.electron
chmod 777 ~/.electron
sudo rm /usr/bin/electron
sudo npm -g install electron
```
### Clone this repo:

```
cd ~
git clone https://github.com/shekit/peeqo-robot
```

### Start App on Boot/Startup:

1. Change into directory
 - `~/.config/autostart`
 - You may need to create this directory if it doesn't exist
2. Add and edit .desktop file with any name inside this directory
- `sudo nano peeqo.desktop`
3. Edit this file
``` 
[Desktop Entry]
	Type=Application
	Exec=./launch.sh
```
4. Create launcher script at root directory
```sudo nano launch.sh
sudo chmod +x launch.sh
```
5. Edit launch script
```
#!/bin/bash
cd /path/to/electron/app // this should be where the directory exists on your pi
sudo electron main.js
```

### Setup Mic:

1. Plug Sound Card into USB
2. Plug speaker and mic into soundcard
3. Do `arecord -l` and `aplay -l` to see the number of your device - whether it’s 0,1,2
4. Edit alsa.conf (might have to change to 1 or 2 depending on whether you have a camera plugged in)
```
sudo nano /usr/share/alsa/alsa.conf
defaults.ctl.card 0 > defaults.ctl.card 1
defaults.pcm.card 0 > defaults.pcm.card 1
defaults.pcm.device 0 > defaults.pcm.device 1
```
5. Edit aliases.conf

`sudo nano /lib/modprobe.d/aliases.conf`
- Comment out below option or it will override previous changes on startup
```
options snd-usb-audio index=-2 (comment this out with a # before)
```
- THIS MAY BE CAUSING AN ERROR, dont do this and see if it helps
- Check order modules load in
`cat /proc/asound/modules`

6. Edit .asoundrc
```
nano .asoundrc
pcm.!default{
	type asym
	playback.pcm {
		type plug
		slave.pcm “hw:1,0”  
#this first number is the number of the usb device
	}

	capture.pcm {
		type plug
		slave.pcm “hw:1,0”
 #this is the mic usb number, maybe 2 if camera is included
}
}
```
7. Check if this works instead ( this worked on one pi not running pixel)
`pcm.!default { type plug slave { pcm "hw:1,0" } } ctl.!default { type hw card 1 }`
8. If you don’t use plugs you will get following error with arecord
`arecord: set_params:1233: Sample format non available Available formats: - S16_LE`

### Setup Bluetooth:

1. `hcitool | grep ver` -- make sure it’s higher than 5.x.x
2. Stop Bluetooth Daemon bluetoothd
```
sudo systemctl stop bluetooth
sudo systemctl status bluetooth #should show status ‘quitting’
sudo systemctl disable bluetooth #for it to persist after reboot
```
3. Power up bluetooth adapter
`sudo hciconfig hci0 up`
4. Install necessary libraries
`sudo apt-get install bluetooth bluez libbluetooth-dev libudev-dev`
5. Allow to run without root/sudo
```
sudo apt-get install libcap2-bin
sudo setcap cap_net_raw+eip $(eval readlink -f `which electron`)
```
- This grants electron cap_net_raw priveleges to start/stop ble advertising
(this is not working right now)
6. Do all this before installing an app with bleno


### Remove Mouse Cursor and prevent screen from going off:

`sudo nano /etc/lightdm/lightdm.conf`
- Uncomment any line saying xserver-command=X
- Write command
`xserver-command=X -nocursor -s 0 -dpms`

### Manga Screen Settings:

```
sudo nano /boot/config.txt
hdmi_force_hotplug=1 (if not already there)
config_hdmi_boost=4
overscan_left=0
overscan_right=0
overscan_top=0
overscan_bottom=0
disable_overscan=1
display_rotate=1
	
hdmi_cvt=480 800 60 6
#hdmi_group=2
#hdmi_mode=87
#hdmi_drive=2
```

### Increase USB Current:

```
sudo nano /boot/config.txt
max_usb_current=1
```
### Run app:

```
cd /path/to/folder/electron
sudo electron main.js
```



# Steps Ahead

Yes, I have some work to do to get this repo in order so it becomes more usable. I'll be doing that, including adding config files, more comments and everything! So please bear with me

Let's make Peeqo the best community built robot ever!
