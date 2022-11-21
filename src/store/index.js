import { provider, ProviderComposer } from './combine';
import { AuthProvider, UserProvider, CartProvider } from './provider';

export default function Provider({ children }) {
    return (
        <ProviderComposer
            providers={[
                provider(AuthProvider),
                provider(UserProvider),
                provider(CartProvider),
            ]}
        >
            {children}
        </ProviderComposer>
    )
}