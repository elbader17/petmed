import { ref, onMounted } from 'vue';
import { MercadoPagoSDK } from 'mercadopago';

const MP_PUBLIC_KEY = 'TEST-d5aa7b40-fe69-494a-9222-5c5c264b3fdc';

export function useMercadoPago() {
  const mp = ref(null);

  onMounted(() => {
    console.log('El composable está renderizando');
    mp.value = new MercadoPagoSDK(MP_PUBLIC_KEY, { locale: 'es-AR' });
    console.log(mp.value);
  });

  const createPreference = async (orderData) => {
    const preference = new MercadoPagoSDK.Preference();

    preference.title = orderData.title;
    preference.quantity = orderData.quantity;
    preference.amount = orderData.price;

    const response = await preference.save();

    if (response.status === 200) {
      return response.body;
    } else {
      throw new Error(response.body.message);
    }
  };


  const createCheckoutButton = async (preferenceId, containerId) => {
    const bricksBuilder = mp.value.bricks();

    const renderComponent = async () => {
      if (window.checkoutButton) window.checkoutButton.unmount();

      await bricksBuilder.create("wallet", containerId, {
        initialization: {
          preferenceId,
        },
      });
    };

    renderComponent();
  };

  return { mp, createPreference, createCheckoutButton };
};

export function useOrderData() {
  const title = ref('');
  const quantity = ref(1);
  const price = ref(0);

  return { title, quantity, price };
};

