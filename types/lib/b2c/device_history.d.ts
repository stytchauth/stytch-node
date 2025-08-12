export interface DeviceAttributeDetails {
    is_new: boolean;
    /**
     * When this `ip_geo_country` was first seen for this user. Values conform to the RFC 3339 standard and are
     * expressed in UTC, e.g. `2021-12-29T12:33:09Z`.
     */
    first_seen_at?: string;
    /**
     * When this `ip_geo_country` was last seen for this user. Values conform to the RFC 3339 standard and are
     * expressed in UTC, e.g. `2021-12-29T12:33:09Z`.
     */
    last_seen_at?: string;
}
export interface DeviceInfo {
    /**
     * The `visitor_id` (a unique identifier) of the user's device. See the
     * [Device Fingerprinting documentation](https://stytch.com/docs/fraud/guides/device-fingerprinting/fingerprints) for more details on the `visitor_id`.
     */
    visitor_id: string;
    visitor_id_details?: DeviceAttributeDetails;
    ip_address?: string;
    ip_address_details?: DeviceAttributeDetails;
    ip_geo_city?: string;
    ip_geo_region?: string;
    ip_geo_country?: string;
    ip_geo_country_details?: DeviceAttributeDetails;
}
