/* eslint-disable react-hooks/exhaustive-deps */
import { PayPalScriptProvider, PayPalButtons, usePayPalScriptReducer } from '@paypal/react-paypal-js';
const style = { layout: 'vertical' };

const ButtonWrapper = (props) => {
    const { showSpinner, amount, handleOrder, currency } = props;
    const [{ isPending }] = usePayPalScriptReducer();

    return (
        <>
            {showSpinner && isPending && <div className="spinner" />}
            <PayPalButtons
                style={style}
                disabled={false}
                forceReRender={[style, amount]}
                fundingSource={undefined}
                createOrder={(data, actions) =>
                    actions.order
                        .create({
                            purchase_units: [{ amount: { currency_code: currency, value: amount } }],
                        })
                        .then((orderId) => orderId)
                }
                onApprove={(data, actions) =>
                    actions.order.capture().then(async (res) => {
                        return handleOrder();
                    })
                }
            />
        </>
    );
};

export default function PayPal(props) {
    const { handleOrder, amount } = props;
    return (
        <div style={{ maxWidth: '750px', minHeight: '200px' }}>
            <PayPalScriptProvider options={{ clientId: 'test', components: 'buttons', currency: 'USD' }}>
                <ButtonWrapper showSpinner={false} handleOrder={handleOrder} currency={'USD'} amount={amount} />
            </PayPalScriptProvider>
        </div>
    );
}
