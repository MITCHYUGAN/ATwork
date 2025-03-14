import { Header } from '../components/common/Header';
import { Footer } from '@/components/common/Footer';
import { HeroSection } from '@/components/common/HeroSection';
import { About } from '@/components/common/About';
import { HowItWorks } from '@/components/common/HowItWorks';
import { GetStarted } from '@/components/common/GetStarted';
import { WalletStatus } from '@cosmos-kit/core';
import { useChain } from '@cosmos-kit/react';
import { CHAIN_NAME } from '@/config';
import Service from '@/components/common/Service';

export default function Home() {

  const { status } = useChain(CHAIN_NAME)

  return (
    <main>
      <Header isConnectWallet={status === WalletStatus.Connected}/>
      <HeroSection />
      <About />
      <Service />
      <HowItWorks />
      <GetStarted />
      <Footer />
    </main>
  );
}