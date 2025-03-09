import { SignUp } from '@/components/signup/SignUp';
import { Header } from '../components/common/Header';
import { Footer } from '@/components/common/Footer';
import { WalletStatus } from '@cosmos-kit/core';
import { useChain } from '@cosmos-kit/react';
import { CHAIN_NAME } from '@/config';


export default function signup(){
    const { status } = useChain(CHAIN_NAME)

    return(
        <main>
            <Header isConnectWallet={status === WalletStatus.Connected}/>
            <SignUp isConnectWallet={status === WalletStatus.Connected} />
            <Footer />
        </main>  
    )
}