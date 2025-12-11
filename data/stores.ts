export interface StoreLocation {
  id: string;
  name: string;
  address: string;
  district: string;
  city: string;
  phone: string;
  email: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  hours: {
    weekdays: string;
    weekends: string;
  };
  features: string[];
  isMainStore: boolean;
}

export const storeLocations: StoreLocation[] = [
  {
    id: 'main-store',
    name: 'MBread Coffee & Tea số 7',
    address: '7 Đường số 7, Bình Tân, Thành phố Hồ Chí Minh',
    district: 'Phường Cát Lái',
    city: 'Thành phố Hồ Chí Minh',
    phone: '0972022074',
    email: 'mbreadcoffeetea@gmail.com',
    coordinates: {
      lat: 10.7612,
      lng: 106.6291
    },
    hours: {
      weekdays: '7:00 - 22:00',
      weekends: '8:00 - 23:00'
    },
    features: [
      'WiFi miễn phí',
      'Bãi đậu xe miễn phí',
      'Giao hàng tận nơi',
      'Không gian ấm cúng',
      'Menu đa dạng'
    ],
    isMainStore: true
  },
  {
    id: 'district-tan-phu',
    name: 'MBread Coffee & Tea số 58',
    address: '58 Đường Số 40, Phường Tân Phú, TP.HCM',
    district: 'Tân Phú',
    city: 'TP.HCM',
    phone: '0972022074',
    email: 'mbreadcoffeetea@gmail.com',
    coordinates: {
      lat: 10.7500,
      lng: 106.6300
    },
    hours: {
      weekdays: '7:00 - 22:00',
      weekends: '8:00 - 23:00'
    },
    features: [
      'WiFi miễn phí',
      'Bãi đậu xe miễn phí',
      'Giao hàng tận nơi',
      'Không gian hiện đại',
      'Menu đa dạng'
    ],
    isMainStore: false
  },
  {
    id: 'district-cat-lai',
    name: 'MBread Coffee & Tea - Cát Lái',
    address: 'B1.12.40 Đường 33CL, Phường Cát Lái, Thành phố Hồ Chí Minh',
    district: 'Cát Lái',
    city: 'TP.HCM',
    phone: '0972022074',
    email: 'mbreadcoffeetea@gmail.com',
    coordinates: {
      lat: 10.7300,
      lng: 106.7200
    },
    hours: {
      weekdays: '7:00 - 22:00',
      weekends: '8:00 - 23:00'
    },
    features: [
      'WiFi miễn phí',
      'Bãi đậu xe miễn phí',
      'Giao hàng tận nơi',
      'Không gian rộng rãi',
      'Menu đa dạng'
    ],
    isMainStore: false
  },
];

export const brandInfo = {
  name: 'M Bread Coffee & Tea',
  email: 'mbreadcoffeetea@gmail.com',
  website: 'Mbreadcoffeetea.com',
  social: {
    facebook: 'https://www.facebook.com/MBreadCoffeeTea',
    tiktok: 'https://www.tiktok.com/@mbreadcoffeetea',
    youtube: 'https://www.youtube.com/@MBreadCoffeeTea',
    instagram: 'https://www.instagram.com/mbreadcoffeetea/'
  }
};
