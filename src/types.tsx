export interface Payload {
    name: string;
    price: string | number;
    value?: string | number;
    discount?: string | number;
}

export interface ItemList {
    type: string
    payload: {
      name: string;
      price: number;
      value?: string | number;
      discount?: number;
    }
  };

export interface StateTypeItem {
    id: number | string;//nanoid возвращает какую-то хрень
    name: string;
    price: number;
    discount?: number;
    picture: JSX.Element;
    priceWIthDisc?: number;
    vehicle: string;
};

export interface StateTypeList {
    [index: number]: StateTypeItem;
}