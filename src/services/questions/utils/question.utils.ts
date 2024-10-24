import { lookup } from 'fast-geoip';

export const QUESTION_REGION = {
  SINGAPORE: 'SG',
  MALAYSIA: 'MY',
  INDONESIA: 'ID',
};

export const QUESTION_REGIONS = Object.values(QUESTION_REGION);

export async function getRegionByIp(ip: string) {
  if (!ip) return QUESTION_REGION.SINGAPORE;

  try {
    const geo = await lookup(ip);

    if (!geo || !QUESTION_REGIONS.includes(geo.region))
      return QUESTION_REGION.SINGAPORE;

    return geo.region;
  } catch {
    return QUESTION_REGION.SINGAPORE;
  }
}
