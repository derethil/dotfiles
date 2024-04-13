import datetime
import subprocess
import time

import click
from suntime import Sun


class BlueLightFilter:
    def __init__(self):
        process = subprocess.run(["which", "hyprshade"], stdout=subprocess.PIPE)
        if len(process.stdout) == 0:
            raise FileNotFoundError("hyprshade not found")

    def _run(self, command: str, **kwargs):
        return subprocess.run(["hyprshade", *command.split(" ")], **kwargs)

    @property
    def enabled(self) -> bool:
        out = self._run("current", stdout=subprocess.PIPE).stdout
        current = out.decode("utf-8").strip()
        return current == "blue-light-filter"

    def enable(self) -> None:
        self._run("on blue-light-filter")

    def disable(self) -> None:
        self._run("off")


@click.command()
@click.option("--latitude", "-lat", help="Latitude", required=True, type=float)
@click.option("--longitude", "-lon", help="Longitude", required=True, type=float)
@click.option("--interval", "-i", help="Interval in seconds", default=60, type=int)
def bluelightfilter(latitude: float, longitude: float, interval: int):
    sun = Sun(latitude, longitude)
    filter = BlueLightFilter()

    sunrise = sun.get_sunrise_time()
    sunset = sun.get_sunset_time()
    now = datetime.datetime.now(datetime.UTC)

    while True:
        if filter.enabled and sunrise < now < sunset:
            filter.disable()
        elif not filter.enabled and not (sunrise < now < sunset):
            filter.enable()

        time.sleep(interval)


if __name__ == "__main__":
    bluelightfilter()
