import { provider, ProviderComposer } from './combine';
import { AuthProvider, UserProvider, CartProvider, 
    GoodsProvider, ScheduleProvider, ReceiveProvider } from './provider';

export default function Provider({ children }) {
    return (
        <ProviderComposer
            providers={[
                provider(AuthProvider),
                provider(UserProvider),
                provider(CartProvider),
                provider(GoodsProvider),
                provider(ScheduleProvider),
                provider(ReceiveProvider),
            ]}
        >
            {children}
        </ProviderComposer>
    )
}