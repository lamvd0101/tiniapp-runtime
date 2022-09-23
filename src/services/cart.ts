import {tikiServiceRequest} from '../utils/api';
import AppProps from '../app.props';
import Configs from '../configs';
import {AppError} from '../models';

const fetchData = async (accessToken, page = 1) => {
  const res = await tikiServiceRequest(
    `v2/intended_cart/items?reset=false&page=${page}&page_size=30`,
    {
      body: undefined,
    },
    accessToken,
  );
  return res;
};

export const getCartInfo = async (accessToken: any, sellerId: any) => {
  return new Promise(async (resolve, reject) => {
    try {
      let page = 1;
      let res = null;
      const arr = [];
      do {
        res = await fetchData(accessToken, page);
        if (res) {
          arr.push(...res.items);
          page = page + 1;
        }
      } while (page <= res.paging_info.total_pages);
      const newItems = arr.filter(
        item => item.seller_id === parseInt(sellerId),
      );
      const total = newItems.length;
      const data = {items: newItems, total};
      resolve(data);
    } catch (error) {
      reject(error);
    }
  });
};

export const addToCart = async (
  products: any,
  accessToken: string,
): Promise<any> => {
  return new Promise(async (resolve, reject) => {
    try {
      const res = await tikiServiceRequest(
        'v2/carts/mine/items',
        {
          method: 'POST',
          body: {
            products: products.map((product: any) => ({
              product_id: product.productId,
              qty: product.quantity,
            })),
          },
        },
        accessToken,
      );
      resolve(res);
    } catch (error) {
      reject(error);
    }
  });
};
