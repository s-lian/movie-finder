import {Container, Flex, Grid, Heading, Select, Skeleton} from "@chakra-ui/react"
import {useEffect, useState} from "react";
import {fetchMovies} from "../../services/api.js";
import CardComponent from "../../components/CardComponent.jsx";
import PaginationComponent from "../../components/PaginationComponent.jsx";

const Movies = () => {
    const [movies, setMovies] = useState([])
    const [loading, setLoading] = useState(true)
    const [activePage, setActivePage] = useState(1)
    const [totalPages,setTotalPages] = useState(1)
    const [sortBy, setSortBy] = useState("popularity.desc")

    useEffect(()=>{
        fetchMovies(activePage,sortBy).then((res)=>{
            setMovies(res?.results)
            setActivePage(res?.page)
            setTotalPages(res?.total_pages)
            console.log(res, "movies")
        })
            .catch(err=>{
            console.log(err)
        })
            .finally( ()=>{
            setLoading(false)})
    },[activePage,sortBy])

    return (
        <Container maxW={"container.xl"}>
            <Flex alignItems={"baseline"} gap={4} my={10}>
            <Heading as='h2' fontSize={"md"} textTransform={"uppercase"}>
                Movies
            </Heading>
                <Select maxW={"140px"} onChange={(e)=>setSortBy(e.target.value)}>
                <option value={"popularity.desc"}> Popular </option>
                    <option value={"vote_average.desc&vote_count.gte=1000 "}>  Top Rate</option>
                </Select>
            </Flex>
            <Grid templateColumns={{
                base: "1fr",
                sm: 'repeat(2, 1fr)',
                md: 'repeat(4, 1fr)',
                lg: 'repeat(5, 1fr)',
            }} gap={'3'}>
                {movies && movies?.map((item, i) =>
                    loading ? (
                        <Skeleton height={300} key={i} /> // use the index of map function in case when the loading is true since we don't have the actual item yet
                    ) : <CardComponent key={item?.id} type={"movie"} item={item} /> // A unique key = {item?.id} is set to avoid rendering issues when looping over items
                )}
            </Grid>

            <PaginationComponent activePage={activePage} totalPages={totalPages} setActivePage = {setActivePage}/>
        </Container>
    )
}

export default Movies