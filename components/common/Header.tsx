import { Link, Box, Button, Icon, Text, useTheme, useColorModeValue } from '@interchain-ui/react';
import NextLink from 'next/link';
import logo from "../../assets/ATwork.svg"
import styles from "../../styles/header.module.css"

export function Header() {
  const { theme, setTheme } = useTheme();

  const toggleColorMode = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <header className={styles.header}>
      <NextLink href="/">
        <img src={logo.src} alt="logo" />
      </NextLink>
      <ul className={styles.ul}>
        <li>About</li>
        <li>Services</li>
      </ul>
      <NextLink href="signup">
        <Button className={styles.headerBtn} rightIcon="arrowRightLine">
          Get Started
        </Button>
      </NextLink>
    </header>
  );
}