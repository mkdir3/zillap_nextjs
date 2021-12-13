import Link from 'next/link';
import Image from 'next/image';
import { Flex, Box, Text, Button } from '@chakra-ui/react';

import { baseUrl, fetchApi } from '../utils/fetchApi';

import Property from '../components/Property';

const Banner = ({ purpose, title1, title2, desc1, desc2, buttonText, imageUrl, linkName }) => (
  <Flex flexWrap="wrap" justifyContent="center" alignItems="center" m="10">
    <Image src={imageUrl} width={500} height={300} alt='banner' />
    <Box p="5">
      <Text color="gray.500" fontSize="sm" fontWeight="medium">
        {purpose}
      </Text>
      <Text color="gray.500" fontSize="3xl" fontWeight="bold">
        {title1} <br /> {title2}
      </Text>
      <Text paddingTop="3" paddingBottom="3" color="gray.700" fontSize="lg" fontWeight="medium">
        {desc1} <br /> {desc2}
      </Text>
      <Button fontSize="xl">
        <Link href={linkName}>
          {buttonText}
        </Link>
      </Button>
    </Box>
  </Flex>
)

export default function Home({propertiesForSale, propertiesForRent}) {
  return (
    <Box>
      {/* Sale Category */}
      <Banner
        purpose='Acheter votre nouveau bien'
        title1="Acheter une maison pour"
        title2="Votre famille"
        desc1="Explorer les Appartements, Villas, Maisons"
        desc2="Et plus"
        buttonText="Découvrir"
        linkName="/search?purpose-for-sale"
        imageUrl="https://bayut-production.s3.eu-central-1.amazonaws.com/image/145426814/33973352624c48628e41f2ec460faba4"
      />
      <Flex flexWrap="wrap">
      {propertiesForSale.map((property) => <Property property={property} key={property.id}/>)}
      </Flex>
      
      {/* Rent Category */}
      <Banner
        purpose='Louer votre nouveau bien'
        title1="Louer une maison pour"
        title2="Votre couple"
        desc1="Explorer les Appartements, Villas, Maisons"
        desc2="Et plus"
        buttonText="Découvrir"
        linkName="/search?purpose-for-rent"
        imageUrl="https://bayut-production.s3.eu-central-1.amazonaws.com/image/110993385/6a070e8e1bae4f7d8c1429bc303d2008"
      />
      <Flex flexWrap="wrap">
      {propertiesForRent.map((property) => <Property property={property} key={property.id}/>)}
      </Flex>
    </Box>
  )
}

export async function getStaticProps() {
  const propertyForSale = await fetchApi(`${baseUrl}/properties/list?locationExternalIDs=5002&purpose=for-sale&hitsPerPage=6`);
  const propertyForRent = await fetchApi(`${baseUrl}/properties/list?locationExternalIDs=5002&purpose=for-rent&hitsPerPage=6`);

  return {
    props: {
      propertiesForSale: propertyForSale?.hits,
      propertiesForRent: propertyForRent?.hits,
    }
  }
}
