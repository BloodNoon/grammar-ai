import React from "react";
import { useHistory } from "react-router-dom";
//import publishArticleImg from '../images/undraw_publish_article.svg';
import { Box, Heading, Text, Button, VStack, Center } from "@chakra-ui/react";
import { ChevronRightIcon } from "@chakra-ui/icons";
import { motion } from "framer-motion";
import Typical from "react-typical";

export default function Hero() {
  const history = useHistory();
  const MotionBox = motion(Box);

  function handleClick() {
    history.push("/practice-menu");
  }

  return (
    <>
      <MotionBox
        minW="95vw"
        mt="3rem"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <Center w="100%">
          <VStack
            p="1rem"
            align="center"
            spacing={["1rem", "1rem", "1rem", "1.5rem"]}
          >
            <Heading
              fontSize={["xl", "4xl", "5xl", "6xl"]}
              bgGradient="linear(to-r, red.500, yellow.400)"
              bgClip="text"
            >
              <Typical steps={["Welcome to Students Writing!", 1000]} />
            </Heading>
            <Text fontSize={["lg", "xl", "2xl"]} color="gray.500">
              Sentences, Paragraphs, Essays - <strong>All become easy</strong>{" "}
              with <strong>STRUCTURE!</strong>
            </Text>
            <Text fontSize={["lg", "xl", "2xl"]} color="gray.500">
              Learn the structure, view the edits, master writing
            </Text>
            <Text
              fontSize={["lg", "xl", "2xl"]}
              color="gray.500"
              textAlign="center"
            >
              Write a sentence here and see where your grammar is wrong in the
              sentence. A Short - Medium - Long sentence, try your best!"
            </Text>
            <Button
              onClick={handleClick}
              px="3rem"
              py="2rem"
              fontSize="2xl"
              // bgGradient="linear(to-r, red.400, yellow.300)"
              rightIcon={<ChevronRightIcon />}
            >
              Start Practice
            </Button>
          </VStack>
        </Center>
      </MotionBox>
      {/* <MotionGrid
				templateColumns={{ lg: '55vw 40vw' }}
				templateRows={{ sm: 'repeat(2, 1fr)', lg: 'repeat(1, 1fr)' }}
				minH={['20vh', '40vh', '60vh']}
				w="95vw"
				p="2rem"
				m="0"
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.5, delay: 0.2 }}
			>
				<GridItem order={['2', '2', '2', '1']}>
					<VStack
						p="1rem"
						align={['center', 'center', 'center', 'start']}
						spacing={['1rem', '1rem', '1rem', '1.5rem']}
					>
						<Heading
							fontSize={['xl', '4xl', '5xl', '6xl']}
							bgGradient="linear(to-r, red.500, yellow.400)"
							bgClip="text"
						>
							<Typical steps={['Welcome to Students Writing!', 1000]} />
						</Heading>
						<Text fontSize={['md', 'lg', 'xl']} color="gray.500">
							Sentences, Paragraphs, Essays -{' '}
							<strong>All become easy</strong> with structure
						</Text>
						<Text fontSize={['md', 'lg', 'xl']} color="gray.500">
							Learn the structure, view the edits, master writing
						</Text>
						<Button
							onClick={handleClick}
							mt="1rem"
							rightIcon={<ArrowForwardIcon />}
						>
							Start here
						</Button>
					</VStack>
				</GridItem>
				<GridItem order={['1', '1', '1', '2']}>
					<Center>
						<Image
							src={publishArticleImg}
							w={['200px', '250px', '300px']}
							h={['200px', '250px', '300px']}
						/>
					</Center>
				</GridItem>
			</MotionGrid> */}
    </>
  );
}
