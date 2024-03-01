from argparse import ArgumentParser
import re
from os import path, scandir
from enum import Enum, unique

import hyprland

BROWSER_PATH = path.expanduser("~/.mozilla/")

# NOTE:
# This script assumes that you have this extension installed:
# https://github.com/tpamula/webextension-window-titler
# And that you added the profile name to the window title with this format: profile-label-<Profile>


parser = ArgumentParser(
    description="Switch the default profile based on the active window's title."
)
parser.add_argument(
    "profiles", nargs="+", help="The profiles to switch the default between"
)
profile_values = parser.parse_args().profiles


@unique
class ProfileEnum(Enum):
    @classmethod
    def within(cls, value: str) -> bool:
        return any(p.value in value for p in Profile)

    @classmethod
    def _missing_(cls, value: str) -> "ProfileEnum":
        for member in cls:
            if member.value in value:
                return member
        raise ValueError(f"Invalid profile key: {value}")


Profile = ProfileEnum("Profile", {value.upper(): value for value in profile_values})


class Profiles:
    def __init__(self):
        self.ini_file = path.join(BROWSER_PATH, "profiles.ini")

    @property
    def directories(self) -> dict[ProfileEnum, str]:
        dirs = [entry.name for entry in scandir(BROWSER_PATH) if entry.is_dir()]
        profile_dirs = [dir for dir in dirs if Profile.within(dir)]
        return {Profile(dir): dir for dir in profile_dirs}

    @property
    def default(self) -> ProfileEnum:
        with open(self.ini_file, "r") as f:
            for line in f:
                if line.startswith("Default="):
                    return Profile(line.split("=")[1].strip())
        raise ValueError("No default profile found")

    @default.setter
    def default(self, profile: ProfileEnum) -> None:
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
        if window_class != "firefox":
            # Skip if the window isn't the browser
            return

        matched = re.search(r"profile-label-(\S+?)\]", window_title)

        if not matched:
            # Skip if the window title doesn't contain the profile label
            return

        label = matched.group(1)
        if label not in profile_values or label == self.profiles.default.value:
            # Skip if the profile label isn't in the list of profiles or if it's already the default
            return

        self.profiles.default = Profile(label)
        print(f"Switched default to {self.profiles.default} profile")


h = Handler()
h.async_connect()
