import { GObject, property, readFile, register, writeFileAsync } from "astal";
import { CACHE } from "lib/session";
import { fetchAsync } from "utils/fetch";

const LOCATION_CACHE = `${CACHE}/location.json`;

interface LocationResponse {
  status: string;
  country: string;
  countryCode: string;
  region: string;
  regionName: string;
  city: string;
  zip: string;
  lat: number;
  lon: number;
  timezone: string;
  isp: string;
  org: string;
  as: string;
  query: string;
}

@register({ GTypeName: "Location" })
export class Location extends GObject.Object {
  static instance: Location;

  @property(Object)
  declare location: LocationResponse;

  static get_default() {
    if (!this.instance) this.instance = new Location();
    return this.instance;
  }

  constructor() {
    super();
    this.getLocation().catch(console.error);
  }

  private async getLocation() {
    const cached = this.getLocationFromCache();
    if (cached) this.location = cached;

    const location = await this.fetchLocation();
    if (!location) return;

    this.cacheLocationResponse(location);
    this.location = location;
  }

  private cacheLocationResponse(data: LocationResponse) {
    const location = JSON.stringify(data);
    writeFileAsync(LOCATION_CACHE, location).catch(console.error);
  }

  private getLocationFromCache(): LocationResponse | undefined {
    const location = readFile(LOCATION_CACHE);
    if (!location) return;
    return JSON.parse(location) as LocationResponse;
  }

  private async fetchLocation() {
    const response = await fetchAsync("http://ip-api.com/json/");
    if (response) return JSON.parse(response) as LocationResponse;
  }
}
