"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import { DEFAULT_DEVICE_MODE, type DeviceMode } from "@/lib/config/device-mode";

interface DeviceModeContextValue {
  deviceMode: DeviceMode;
  setDeviceMode: (mode: DeviceMode) => void;
}

const DeviceModeContext = createContext<DeviceModeContextValue>({
  deviceMode: DEFAULT_DEVICE_MODE,
  setDeviceMode: () => {},
});

export function DeviceModeProvider({ children }: { children: ReactNode }) {
  const [deviceMode, setDeviceMode] = useState<DeviceMode>(DEFAULT_DEVICE_MODE);
  return (
    <DeviceModeContext.Provider value={{ deviceMode, setDeviceMode }}>
      {children}
    </DeviceModeContext.Provider>
  );
}

export function useDeviceMode() {
  return useContext(DeviceModeContext);
}
