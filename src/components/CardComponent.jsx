import { Box, Flex, Image, Text } from '@chakra-ui/react'
import { Link } from 'react-router-dom'
import { imgPath } from '../services/api'
import { StarIcon } from '@chakra-ui/icons'
import propTypes from 'prop-types'


const CardComponent = ({ item, type }) => {
    return (
        //link to DetailsPage
        <Link to={`/${type}/${item?.id}`}>
            <Box position={"relative"} transform={"scale(1)"} _hover={{
                transform: { base: "scale(1)", md: "scale(1.05)" },
                transition: "transform 0.2s ease-in-out",
                "& .overlay": {
                    opacity: 1,
                    transition: "0.5s"
                }
            }}>
                <Image src={`${imgPath}/${item.poster_path}`} alt={item?.title || item?.name} height={"100%"} />

                <Box className='overlay'
                    pos={"absolute"} p="2"
                    bottom={"0"} left={"0"}
                    w={"100%"} h={"25%"}
                    bg="rgba(0,0,0,0.9)"
                    opacity={"0"}
                    transition={"opacity 0.3s ease-in-out"}
                    textAlign={"center"} fontSize={"small"} color={"green.200"}>
                    <Text > {item?.title || item?.name}</Text>
                    {new Date(item?.release_date || item?.first_air_date).getFullYear() || "N/A"}

                    <Flex alignItems={"center"} justifyContent={"center"} gap={1} mt="4">
                        <StarIcon />
                        <Text> {item?.vote_average?.toFixed(1)}</Text>
                    </Flex>
                </Box>
            </Box>
        </Link>
    )

    // getfullYear() method only gets the year and remove days and months
}
CardComponent.propTypes = {
    item: propTypes.object,
    type: propTypes.string,
}

export default CardComponent