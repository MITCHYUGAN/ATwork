import NextLink from 'next/link';
import { Stack, Button, Divider } from '@interchain-ui/react';
import { Header } from '../components/common/Header';
import { Footer } from '@/components/common/Footer';
import { HeroSection } from '@/components/common/HeroSection';
import { About } from '@/components/common/about';
import { HowItWorks } from '@/components/common/HowItWorks';
import { OpenProject } from '@/components/common/OpenProjects';
import { Reviews } from '@/components/common/Reviews';
import { GetStarted } from '@/components/common/GetStarted';
import { WalletStatus } from '@cosmos-kit/core';
import { useChain } from '@cosmos-kit/react';
import { CHAIN_NAME } from '@/config';

export default function Home() {

  const { status } = useChain(CHAIN_NAME)

  return (
    <main>
      <Header isConnectWallet={status === WalletStatus.Connected}/>
      <HeroSection />
      <About />
      <HowItWorks />
      <OpenProject />
      <Reviews />
      <GetStarted />
      <Footer />
    </main>
  );
}