
export interface IDeviceInfo {
  id: number
  title?: string
  description?: string
}

export interface IDevice {
  id: number
  name: string
  price: number
  rating: number
  img: string
  info?: IDeviceInfo[]
}

export interface DeviceType {
  id: number
  name: string
}

export interface DeviceBrand {
  id: number
  name: string
}

export interface DeviceSchema {
  devices: IDevice[]
  types: DeviceType[]
  brands: DeviceBrand[]
  selectedDevice?:IDevice
  selectedType?:DeviceType
  selectedBrand?:DeviceBrand
}
