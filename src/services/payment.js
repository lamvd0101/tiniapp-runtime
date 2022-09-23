import {graphqlRequest} from '../utils/api';

export const createPayment = async (orderId, configs, accessToken, appId) => {
  try {
    const query = `mutation make_payment($order_id: String!, $config: TransactionConfig) {
      make_payment(order_id: $order_id, config: $config) {
          redirect_url {
              web
              app
          }
      }
  }`;
    const variables = {
      order_id: orderId,
      config: configs,
    };
    const res = await graphqlRequest(
      {
        query,
        variables,
        headers: {
          'X-TiniApp-Id': appId,
        },
      },
      accessToken,
    );
    return res.data.make_payment.redirect_url.app;
  } catch (error) {
    throw error;
  }
};

export const makeFakeOrder = async accessToken => {
  try {
    const query = `mutation create_fake_order ($input: OrderFakeCreateInput) {
      create_fake_order (input: $input) {
        id
        status
        sub_total
        total
        grand_total
        shipping_address {
          name
          email
          street
          phone
        }
        billing_address {
          name
          email
          street
          phone
        }
        items {
          product_id
          sku
          price
          quantity
          sub_total
          name
        }
        created_at
        updated_at
      }
    }`;
    const variables = {
      input: {
        app_identifier: 'tiki-miniapp-demo',
        item_name: 'Test fake order',
        item_price: 5000,
        item_quantity: 10,
      },
    };
    const res = await graphqlRequest({query, variables}, accessToken);
    return res.data.create_fake_order.id;
  } catch (error) {
    throw error;
  }
};

export const notifyPaymentStatus = async ({
  orderCode = '',
  status,
  appId,
  accessToken,
  storeId = '',
}) => {
  try {
    const query = `mutation tiki_order_notify($event_name: String!, $input: NotifyInput!) {
      tiki_order_notify(event_name: $event_name, input: $input)
    }`;
    const variables = {
      event_name: status,
      input: {tiki_order_code: orderCode, store_id: storeId},
    };
    const res = await graphqlRequest(
      {
        query,
        variables,
        headers: {
          'X-TiniApp-Id': appId,
        },
      },
      accessToken,
    );
    return res;
  } catch (error) {
    throw error;
  }
};

export const checkOrderStatus = async ({
  orderCode = '',
  appId,
  accessToken,
}) => {
  try {
    const query =
      ' query order_get($id:GlobalID!){ order_get(id:$id) { status }}';
    const variables = {
      id: orderCode,
    };
    const res = await graphqlRequest(
      {
        query,
        variables,
        headers: {
          'X-TiniApp-Id': appId,
        },
      },
      accessToken,
    );
    return res.data.order_get.status;
  } catch (error) {
    throw error;
  }
};
