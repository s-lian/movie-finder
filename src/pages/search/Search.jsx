import {Container, Flex, Grid, Input, InputLeftElement, Skeleton} from "@chakra-ui/react"
import { Heading } from "@chakra-ui/react"
import {InputGroup, SearchIcon, Spinner} from "@chakra-ui/icons";
import {Form} from "react-router-dom";
import {useEffect, useState} from "react";
import {searchData} from "../../services/api.js";
import CardComponent from "../../components/CardComponent.jsx";
import PaginationComponent from "../../components/PaginationComponent.jsx";

const Search = () => {
    const [tempSearchValue, setTempSearchValue] = useState(localStorage.getItem("searchValue") || "");
    const [searchValue, setSearchValue] = useState( localStorage.getItem("searchValue") || "")
    const [activePage, setActivePage] = useState(Number(localStorage.getItem("activePage")) || 1);
    const [loading,setLoading] = useState(false)
    const [data, setData] = useState([])
    const [totalPages, setTotalPages] = useState(1)

    useEffect(()=>{
        setLoading(true)
        searchData(searchValue,activePage)
            .then((res)=>{
                setData(res?.results)
                setActivePage ( res?.page)
                setTotalPages(res?.total_pages)
                console.log(res)
            })

            .catch((err)=> console.log(err,"error"))
            .finally(setLoading(false))

    },[searchValue,activePage])

    useEffect(() => {
        localStorage.setItem("activePage", activePage);
    }, [activePage]);

    const handelSearch = (e)=>{
        e.preventDefault();
        setSearchValue(tempSearchValue)
        localStorage.setItem("searchValue",tempSearchValue)
        setActivePage(1)
        console.log(tempSearchValue)
    }



    return (
        <Container maxW={"container.xl"}>
            <Flex alignItems={"baseline"} gap={4} my={10}>
                <Heading as='h2' fontSize={"md"} textTransform={"uppercase"}>
                    TV Shows
                </Heading>
                </Flex>

            <Form onSubmit = {handelSearch}>
                <InputGroup>
                    <InputLeftElement pointerEvents="none">
                        <SearchIcon color="gray.300" />
                    </InputLeftElement>
                    <Input placeholder="Search movies,Tv shows ..."
                           _placeholder={{color:"gray.200"}}
                           value={tempSearchValue}
                           onChange={(e)=> setTempSearchValue(e.target.value)} />
                </InputGroup>
            </Form>
            {loading && (
                <Flex mt={10} justifyContent={"center"}>
                    <Spinner size={"xl"} color={"red"}/>
                </Flex>
            )}

            {data.length === 0 && !loading &&(
                <Heading textAlign={"center"} as={'h3'} fontSize={"sm"} mt={10} >
                    No Result Found
                </Heading>
            )}

            <Flex mt={10} justifyContent={"center"} >
            <Grid templateColumns={{
                base: "1fr",
                sm: 'repeat(2, 1fr)',
                md: 'repeat(4, 1fr)',
                lg: 'repeat(5, 1fr)',
            }} gap={'3'}>
                {data.length >0 && !loading && data?.map((item, i) =>
                    loading ? (
                        <Skeleton height={300} key={i} /> // use the index of map function in case when the loading is true since we don't have the actual item yet
                    ) : <CardComponent key={item?.id} type={item.media_type} item={item} /> // A unique key = {item?.id} is set to avoid rendering issues when looping over items
                )}
            </Grid>
            </Flex>
            {data.length > 0 && !loading && (
                <PaginationComponent activePage={activePage} totalPages={totalPages} setActivePage = {setActivePage}/>
            )}


        </Container>
    )
}

export default Search