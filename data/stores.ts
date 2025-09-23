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
    name: 'MBread Coffee & Tea - Chi nhánh chính',
    address: '7 Đường Số 7, An Lạc A',
    district: 'Bình Tân',
    city: 'TP.HCM',
    phone: '094 625 20 20',
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
    id: 'district-1',
    name: 'MBread Coffee & Tea - Quận 1',
    address: '123 Nguyễn Huệ, Phường Bến Nghé',
    district: 'Quận 1',
    city: 'TP.HCM',
    phone: '094 625 20 21',
    email: 'mbreadcoffeetea@gmail.com',
    coordinates: {
      lat: 10.7769,
      lng: 106.7009
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
    id: 'district-7',
    name: 'MBread Coffee & Tea - Quận 7',
    address: '456 Nguyễn Thị Thập, Phường Tân Phong',
    district: 'Quận 7',
    city: 'TP.HCM',
    phone: '094 625 20 22',
    email: 'mbreadcoffeetea@gmail.com',
    coordinates: {
      lat: 10.7374,
      lng: 106.7224
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
  {
    id: 'district-3',
    name: 'MBread Coffee & Tea - Quận 3',
    address: '789 Võ Văn Tần, Phường 6',
    district: 'Quận 3',
    city: 'TP.HCM',
    phone: '094 625 20 23',
    email: 'mbreadcoffeetea@gmail.com',
    coordinates: {
      lat: 10.7879,
      lng: 106.6898
    },
    hours: {
      weekdays: '7:00 - 22:00',
      weekends: '8:00 - 23:00'
    },
    features: [
      'WiFi miễn phí',
      'Bãi đậu xe miễn phí',
      'Giao hàng tận nơi',
      'Không gian yên tĩnh',
      'Menu đa dạng'
    ],
    isMainStore: false
  }
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
