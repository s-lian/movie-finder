import { Box, Container, Flex, Heading,Skeleton } from '@chakra-ui/react'
import { useEffect, useState } from 'react'

import { fetchTrending } from '../services/api'
import { Grid } from '@chakra-ui/react'
import CardComponent from '../components/CardComponent'

const Home = () => {

    const [data, setData] = useState([]) //empty list 
    const [timeWindow, setTimeWindow] = useState("day")
    const [loading, setLoading] = useState(true)

    //fetch data from the api using useEffect
    useEffect(() => {
        setLoading(true);
        fetchTrending(timeWindow)
            .then((res) => {
                setData(res)

            })
            .catch((err) => {
                console.log(err, "error")
            })
            .finally(() => {
                setLoading(false);
            })

    }, [timeWindow])
    // timeWindow dependency mean useEffect will remount everytime the dependency is changed
    // no dependecy means we want to fetch only once when it is mounted 

    console.log(data, "data")


    return (
        <Container maxW={"container.xl"}>

            <Flex alignItems={"baseline"} gap={"2"} my={"8"}>

                <Heading as='h2' fontSize={"md"} textTransform={'uppercase'}>
                    Trending
                </Heading>
                <Flex id={'timeWindowId'} alignItems={"center"} gap={"2"} border={"1px solid teal"} borderRadius={"20px"} >
                    <Box as="button" px="3" py="1" borderRadius={"20px"} bg={`${timeWindow === 'day' ? "gray.900" : ""}`} onClick={() => setTimeWindow("day")}> Today</Box>
                    <Box as="button" px="3" py="1" borderRadius={"20px"} bg={` ${timeWindow === 'week' ? "gray.900" : ""}`} onClick={() => setTimeWindow("week")}> This Week </Box>
                </Flex>
            </Flex>

            {/* {loading && <div> loading...</div>} */}


            {/* add different screen responsive to Grid */}
            <Grid templateColumns={{
                base: "1fr",
                sm: 'repeat(2, 1fr)',
                md: 'repeat(4, 1fr)',
                lg: 'repeat(5, 1fr)',
            }} gap={'3'}>
                {data && data?.map((item, i) =>
                    loading ? (
                        <Skeleton height={300} key={i} /> // use the index of map function in case when the loading is true since we don't have the actual item yet 
                    ) : <CardComponent key={item?.id} type={item?.media_type} item={item} /> // A unique key = {item?.id} is set to avoid rendering issues when looping over items


                )}

            </Grid>

        </Container>
    )
}

export default Home