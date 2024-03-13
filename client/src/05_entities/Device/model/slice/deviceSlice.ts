import type { PayloadAction } from '@reduxjs/toolkit'
import { createSlice } from '@reduxjs/toolkit'
import type { DeviceBrand, DeviceSchema, DeviceType, IDevice } from '../types/device'


const initialState: DeviceSchema = {
  devices: [
    {
      id: 1,
      name: 'iPhone 15 pro',
      price: 1000,
      rating: 0,
      img: 'https://gadgetstore.kz/wa-data/public/shop/products/91/07/791/images/2395/2395.970.png',
      info: [
        { id: 1, title: 'RAM', description: '8GB' },
        { id: 2, title: 'Camera', description: '48MP Main, 12MP Ultra Wide, 12MP 3x Telephoto' },
        {
          id: 3, title: 'Chip',
          description: 'A17 Pro, 6‑core CPU with 2 performance and 4 efficiency' +
            ' cores,6‑core GPU, 16‑core Neural Engine'
        },
        {
          id: 4,
          title: 'Display',
          description: '6.1‑inch (diagonal) all‑screen OLED display, 2556‑by‑1179-pixel resolution at 460 ppi'
        },
      ]
    },
    {
      id: 2,
      name: 'Galaxy S23',
      price: 800,
      rating: 0,
      img: 'https://object.pscloud.io/cms/cms/Photo/img_0_77_4234_4_1.jpg'
    },
    {
      id: 3,
      name: 'Bespoke 4-Door Flex',
      price: 800,
      rating: 0,
      img:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQiSw9cOilJ45EOck8WKDzgEdFXVvbLAD7UVA&usqp=CAU'
    },
    {
      id: 4,
      name: 'ROG Strix G16',
      price: 1150,
      rating: 0,
      img: 'https://shop.kz/upload/iblock/ebb/j87k2i9finnhyij1c7ip6ejxwdqf5lw2/168913_02.jpg'
    },
    {
      id: 5,
      name: 'OLED C3 65-Inch',
      price: 1400,
      rating: 0,
      img: 'https://m.media-amazon.com/images/I/71ReKg-3YrL._AC_UF1000,1000_QL80_.jpg'
    }

  ],
  brands: [
    {
      id: 1,
      name: 'Samsung'
    },
    {
      id: 2,
      name: 'Apple'
    },
    {
      id: 3,
      name: 'Asus'
    },
    {
      id: 4,
      name: 'Microsoft'
    },
    {
      id: 5,
      name: 'Sony'
    },
    {
      id: 6,
      name: 'LG'
    }
  ],
  types: [
    {
      id: 1,
      name: 'Fridges'
    },
    {
      id: 2,
      name: 'Smartphones'
    },
    {
      id: 3,
      name: 'Laptops'
    },
    {
      id: 4,
      name: 'TV'
    },
    {
      id: 5,
      name: 'Game consoles'
    }
  ]
}

export const deviceSlice = createSlice({
  name: 'device',
  initialState,
  reducers: {
    addDevice: (state, action: PayloadAction<IDevice>) => {
      state.devices.push(action.payload)
    },
    addBrand: (state, action: PayloadAction<DeviceBrand>) => {
      state.brands.push(action.payload)
    },
    addType: (state, action: PayloadAction<DeviceType>) => {
      state.types.push(action.payload)
    },
    // setSelectedDevice: (state, action: PayloadAction<IDevice>) => {
    //   state.selectedDevice = action.payload
    // },
    setSelectedBrand: (state, action: PayloadAction<DeviceBrand | undefined>) => {
      state.selectedBrand = action.payload
    },
    setSelectedType: (state, action: PayloadAction<DeviceType | undefined>) => {
      state.selectedType = action.payload
    }

  }


})

export const { actions: deviceActions } = deviceSlice
export const { reducer: deviceReducer } = deviceSlice

