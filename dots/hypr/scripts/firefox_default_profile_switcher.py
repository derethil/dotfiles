from argparse import ArgumentParser
import re
from os import path, scandir
from enum import Enum, unique

import hyprland
from hyprland.info import Info as hyprInfo

FF_PATH = path.expanduser("~/.mozilla/firefox/")

# NOTE:
# This script assumes that you have this Firefox extension installed:
# https://github.com/tpamula/webextension-window-titler
# And that you added the profile name to the window title with this format: profile-label-<Profile>


parser = ArgumentParser(description="Switch the default Firefox profile based on the active window's title.")
parser.add_argument("profiles", nargs="+", help="The profiles to switch the default between")
profile_values = parser.parse_args().profiles

@unique
class ProfileEnum(Enum):
    @classmethod
    def within(cls, value: str) -> bool:
        return any(p.value in value for p in Profile)

    @classmethod
    def _missing_(cls, value: str) -> "Profile":
        for member in cls:
            if member.value in value:
                return member
        raise ValueError(f"Invalid profile key: {value}")

    @classmethod
    def after(cls, value: "Profile") -> "Profile":
        members = list(cls)
        index = members.index(value)
        return members[(index + 1) % len(members)]

Profile = ProfileEnum('Profile', {value.upper(): value for value in profile_values})

class Profiles:
    def __init__(self):
        self.ini_file = path.join(FF_PATH, "profiles.ini")

    @property
    def directories(self) -> dict[Profile, str]:
        dirs = [entry.name for entry in scandir(FF_PATH) if entry.is_dir()]
        profile_dirs = [dir for dir in dirs if Profile.within(dir)]
        return {Profile(dir): dir for dir in profile_dirs}

    @property
    def default(self) -> Profile:
        with open(self.ini_file, "r") as f:
            for line in f:
                if line.startswith("Default="):
                    return Profile(line.split("=")[1].strip())
        raise ValueError("No default profile found")

    @default.setter
    def default(self, profile: Profile) -> None:
        with open(self.ini_file, "r") as f:
            lines = f.readlines()

        with open(self.ini_file, "w") as f:
            for line in lines:
                if line.startswith("Default="):
                    f.write(f"Default={self.directories[profile]}\n")
                else:
                    f.write(line)

        print(f"Set default profile to {profile.value}")


class Handler(hyprland.Events):
    def __init__(self):
        self.c = hyprland.Config()
        self.profiles = Profiles()
        self.firefox_addresses = {}
        super().__init__()

    # Helper methods

    def label_from_window(self, win_class, title) -> str:
        if win_class != "firefox":
            # Skip if the window isn't Firefox
            return

        if not (matched := re.search(r"profile-label-(\S+?)\]", title)):
            # Skip if the window title doesn't contain the profile label
            return

        label = matched.group(1)
        if label not in profile_values or label == self.profiles.default.value:
            # Skip if the profile label isn't in the list of profiles or if it's already the default
            return

        return label

    # Hyprland event handlers

    async def on_activewindowv2(self, address, *_):
        active = await hyprInfo.active_window()
        label = self.label_from_window(active["class"], active["title"])
        if label:
            active_profile = Profile(label)
            self.firefox_addresses[address] = active_profile
            self.profiles.default = active_profile


    async def on_openwindow(self, address, _, win_class, title):
        label = self.label_from_window(win_class, title)
        if label:
            self.firefox_addresses[address] = Profile(label)

    async def on_closewindow(self, address):
        if address not in self.firefox_addresses.keys():
            return

        clients = await hyprInfo.clients()
        num_firefox_windows = len([c for c in clients if c["class"] == "firefox"])

        closed_profile = self.firefox_addresses[address]
        del self.firefox_addresses[address]

        if num_firefox_windows > 0:
            self.profiles.default = Profile.after(closed_profile)


h = Handler()
h.async_connect()
