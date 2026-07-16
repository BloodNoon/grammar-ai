import React from "react";
import Layout from "../components/Layout";
import Hero from "../components/Hero";
import HomeIntro from "../components/HomeIntro";
import WriteYourSentence from "../components/WriteYourSentence";
import { VStack, Divider } from "@chakra-ui/react";

export default function Home() {
  return (
    <Layout>
      <VStack spacing="5rem">
        <Divider />
        <Hero />
        <HomeIntro />
        <WriteYourSentence />
      </VStack>
    </Layout>
  );
}
