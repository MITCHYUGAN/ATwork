import { Box, Stack, ClipboardCopyText, useColorModeValue } from '@interchain-ui/react';
import { WalletStatus } from 'cosmos-kit';
import { useChain } from '@cosmos-kit/react';
import { getChainLogo } from '@/utils';
import { CHAIN_NAME } from "@/config";
import { User } from './User';
import { Chain } from './Chain';
import { Warning } from './Warning';
import {
  ButtonError,
  ButtonRejected,
  ButtonConnect,
  ButtonConnected,
  ButtonConnecting,
  ButtonDisconnected,
  ButtonNotExist,
} from './Connect';

export function Wallet() {
  const { chain, status, wallet, username, address, message, connect, openView } = useChain(CHAIN_NAME);

  const ConnectButton = {
    [WalletStatus.Connected]: <ButtonConnected onClick={openView} />,
    [WalletStatus.Connecting]: <ButtonConnecting />,
    [WalletStatus.Disconnected]: <ButtonDisconnected onClick={connect} />,
    [WalletStatus.Error]: <ButtonError onClick={openView} />,
    [WalletStatus.Rejected]: <ButtonRejected onClick={connect} />,
    [WalletStatus.NotExist]: <ButtonNotExist onClick={openView} />
  }[status] || <ButtonConnect onClick={connect} />;

  return (

    <>
      {
        status !== WalletStatus.Connected ? (
          <Box py="$16">
            <Stack attributes={{ mb: '$12', justifyContent: 'center' }}>
              <Chain name={chain.chain_name} logo={getChainLogo(chain.chain_name)!} />
            </Stack >
            <Stack
              direction="vertical"
              attributes={{
                mx: 'auto',
                px: '$8',
                py: '$15',
                maxWidth: '21rem',
                borderRadius: '$lg',
                justifyContent: 'center',
              }}
            >
              {username ? <User name={username} /> : null}
              {address ? <ClipboardCopyText text={address} truncate="middle" /> : null}
              <Box
                my="$8"
                flex="1"
                width="full"
                display="flex"
                height="$16"
                overflow="hidden"
                justifyContent="center"
                px={{ mobile: '$8', tablet: '$10' }}>
                {ConnectButton}
              </Box>

              {message && [WalletStatus.Error, WalletStatus.Rejected].includes(status)
                ? <Warning  text={`${wallet?.prettyName}: ${message}`} />
                : null}
            </Stack>
          </Box >
        ) : (
          <Box py="$16">
            <Stack>
              {address ? <ClipboardCopyText text={address} truncate="middle" /> : null}
              <Box>
                {ConnectButton}
              </Box>
            </Stack>
          </Box >
        )
      }
    </>

  )
}