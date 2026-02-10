import { APP_INFO, APP_NAME, APP_VERSION } from "@/constants/app";

export { APP_NAME, APP_VERSION };

export function getFormattedVersion(): string {
  return `v${APP_VERSION}`;
}

export function getAppNameWithVersion(): string {
  return `${APP_NAME} ${getFormattedVersion()}`;
}

export function getAppInfoForFooter(includeStatus: boolean = false, status: string = "Alpha"): string {
  const base = `${APP_NAME} • ${getFormattedVersion()}`;
  if (includeStatus) {
    return `${base} • ${status}`;
  }
  return base;
}

export function getVersionNumber(): string {
  return APP_VERSION;
}
