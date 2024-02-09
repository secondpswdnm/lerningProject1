import type { StateSchema } from '01_app/providers/StoreProvider/config/StateSchema'


export const getDevices = (state: StateSchema) => state.device?.devices
export const getDeviceTypes = (state: StateSchema) => state.device?.types
export const getDeviceBrands = (state: StateSchema) => state.device?.brands
export const getSelectedDevice = (state: StateSchema) => state.device?.selectedDevice
export const getSelectedDeviceType = (state: StateSchema) => state.device?.selectedType
export const getSelectedDeviceBrand = (state: StateSchema) => state.device?.selectedBrand

