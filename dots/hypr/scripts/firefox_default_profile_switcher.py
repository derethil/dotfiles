import re
from os import path, scandir
from enum import Enum

import hyprland

FF_PATH = path.expanduser("~/.mozilla/firefox/")

# NOTE:
# This script assumes that you have this Firefox extension installed:
# https://github.com/tpamula/webextension-window-titler
# And that you added the profile name to the window title with this format: profile-label-<Profile>


class Profile(Enum):
    WORK = "Work"
    PERSONAL = "Personal"

    @classmethod
    def within(cls, value: str) -> bool:
        return any(p.value in value for p in Profile)

    @classmethod
    def _missing_(cls, value: str) -> "Profile":
        for member in cls:
            if member.value in value:
                return member
        raise ValueError(f"Invalid profile key: {value}")


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

    def set_default(self, profile: Profile) -> None:
        with open(self.ini_file, "r") as f:
            lines = f.readlines()

        with open(self.ini_file, "w") as f:
            for line in lines:
                if line.startswith("Default="):
                    f.write(f"Default={self.directories[profile]}\n")
                else:
                    f.write(line)


class Handler(hyprland.Events):
    def __init__(self):
        self.c = hyprland.Config()
        self.profiles = Profiles()
        super().__init__()

    async def on_activewindow(self, window_class, window_title, *_):
        # Don't do anything if the window is not firefox
        if window_class != "firefox":
            return

        matched = re.search(r"profile-label-(\S+?)\]", window_title)

        # Don't do anything if the window doesn't have a profile label or if the profile is already the default
        if not matched or Profile(matched.group(1)) == self.profiles.default:
            return

        self.profiles.set_default(Profile(matched.group(1)))
        print(f"Switched default to {self.profiles.default} profile")


h = Handler()
h.async_connect()
